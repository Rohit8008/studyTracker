# Interview Preparation — Slake Reporting Engine

**Project:** `slake-reporting`
**Stack:** Java 21, Quarkus 3.29.4, HikariCP, DuckDB, Apache POI, LangChain4j, AWS S3/Secrets Manager, Redis, Docker/GraalVM, OpenTelemetry
**Role:** Owner, built from scratch to production

---

## Architecture & Design

---

### Q1. Why did you choose Quarkus over Spring Boot for this project, given you already had Spring Boot experience?

**Answer:**

The decision was driven by three factors specific to slake-reporting's use case.

First, **startup time and container density.** slake-reporting is deployed as a Docker container on GraalVM JDK 24. Quarkus with GraalVM native compilation starts in milliseconds compared to Spring Boot's several-second startup. For a data export engine that may be scaled up and down based on job volume, fast startup directly translates to cost savings — you're not paying for 10 seconds of idle compute every time a container spins up.

Second, **reactive and imperative flexibility.** Quarkus supports both reactive (Mutiny) and imperative programming in the same application. The REST layer uses reactive endpoints for non-blocking request handling, while the export engine's core (`ExportService`) is deliberately imperative — streaming row by row through result sets is inherently sequential and doesn't benefit from reactive patterns. Quarkus lets both coexist cleanly, whereas Spring WebFlux pushes you toward a fully reactive model that's awkward for blocking JDBC operations.

Third, **the CLI requirement.** We needed the same JAR to work as both a REST service and a command-line batch tool (via Picocli). Quarkus has first-class Picocli integration — the `@QuarkusMain` annotation lets you route to either the CLI command or the HTTP server based on how the process is launched. Replicating this cleanly in Spring Boot requires more ceremony.

The trade-off was ecosystem maturity — Spring Boot has more community resources and library integrations. Wherever Quarkus had gaps (some AWS SDK integrations, for instance), I fell back to the AWS SDK directly rather than relying on framework-level abstractions.

---

### Q2. The project is both a REST service and a CLI tool from the same JAR. How does that work, and when would you use each?

**Answer:**

Quarkus's `@QuarkusMain` annotation lets you specify an entry point class that decides how the application behaves at launch. `App.java` is the Picocli-based CLI entry point; `Main.java` starts the Quarkus HTTP server.

**How it works:** When the JAR is launched with CLI flags (`-c config.yaml -r sales_invoice_report --since 2024-01-01`), Picocli intercepts the arguments and runs the export synchronously in the same process — no HTTP server starts. When launched without CLI flags (or via Docker with `QUARKUS_HTTP_PORT` set), the Quarkus HTTP server starts and the REST API is available.

**When to use each:**

- **CLI mode** is for scheduled or one-off batch exports triggered by external schedulers (Jenkins, cron, Airflow). The invoker gets a clear exit code (0 = success, non-zero = failure) and structured output to stdout, which CI/CD pipelines can capture. It's also useful for backfills — re-running a specific date range with `--since` and `--until` flags without going through the API.

- **REST mode** is for interactive use, multi-tenant SaaS deployments, and integrations where a caller needs async status tracking. The `/reports/run` endpoint kicks off an export and returns a `runId`; the caller polls `/reports/run?runId=...` for a timeline of status updates.

The shared core — `ExportService`, `TenantRegistry`, all database drivers — is identical in both modes. The entry point is the only difference. This means a bug fixed in the CLI mode is automatically fixed in the REST mode, and performance tuning benefits both.

---

### Q3. Walk me through the architecture of `ExportService` — the 129KB core class. How does a multi-query join export actually work?

**Answer:**

`ExportService` is the heart of the system. A "report" is defined in YAML as one or more SQL queries that need to be joined and streamed as a single output. Here's the execution flow for a multi-query report:

**Step 1 — Query planning.** The config defines a primary query (the "left side") and one or more subqueries (the "right sides"). The join key — a column that appears in both the primary and subquery results — is specified in config.

**Step 2 — Subquery materialization with caching.** Each subquery is executed first. Because subqueries are often reference data (product master, outlet master) that doesn't change row-by-row, their results are cached to disk with a configurable TTL (default 7 days, date-sharded by day/month/range depending on the data type). On cache hit, the subquery isn't re-executed — the cached result is deserialized directly. Cache keys are derived from the SQL hash + date parameters.

**Step 3 — Join index construction.** The subquery result is loaded into an **LRU bucket index** keyed by the join column. This is a disk-backed structure, not an in-memory HashMap — for subqueries with millions of rows, loading everything into JVM heap would OOM the process. The LRU evicts cold buckets to disk when memory pressure builds, fetching them back on demand.

**Step 4 — Primary query streaming.** The primary query runs against the source database with `FETCH_SIZE = 5000–10,000` rows per batch (set on the JDBC `Statement`), so the driver streams rather than loading the full result set. For each primary row, the join column value is used to look up the right-side bucket in the LRU index. The merged row is immediately written to the output sink (CSV writer, Excel sheet, S3 stream) — it's never accumulated in memory.

**Step 5 — Column transforms and output.** Before writing, each column passes through `ColumnTransformer` — applying SQL-style expressions like `DATE_FORMAT`, `ROUND`, header remapping, and column hiding. The output is streamed continuously rather than buffered.

The result: a report joining a 2M-row sales table against a 500K-row product master produces output that fits in a few hundred MB of heap regardless of total result size.

---

### Q4. How does multi-tenancy work in slake-reporting? How is tenant isolation enforced?

**Answer:**

Multi-tenancy is built on three layers.

**Layer 1 — Request routing.** Every REST API call carries an `X-Tenant-Id` header. The Quarkus resource layer reads this header and sets the active tenant in `TenantContext` (a request-scoped CDI bean). Every downstream operation — config loading, DB connection selection, output path resolution — reads from `TenantContext` to scope itself to the right tenant.

**Layer 2 — Path isolation.** `TenantPaths` generates filesystem paths prefixed by tenant ID:
- Config: `./config/{tenantId}/`
- Status records: `./.status/{tenantId}/`
- Export output: `./exports/{tenantId}/`
- Schedule state: `./schedules/{tenantId}/`

A bug that corrupts one tenant's status files cannot affect another tenant's because their paths are completely separate.

**Layer 3 — Credential isolation via `TenantRegistry`.** Each tenant has its own YAML config with JDBC profiles (connection strings, credentials). `TenantSecretsLoader` reads these from **AWS Secrets Manager** rather than plain config files — the secret name is tenant-scoped, so Tenant A's DB password is stored under a different secret ARN than Tenant B's. `DataSourcePoolRegistry` maintains a separate HikariCP pool per tenant per JDBC profile — Tenant A's connections never intermix with Tenant B's.

**What happens if the X-Tenant-Id header is missing?** The request is rejected at the Quarkus resource layer with a 400 before any business logic runs — a missing tenant header is treated as a malformed request, not a fallback to a default tenant. This prevents accidental cross-tenant data access from a misconfigured client.

---

## Performance & Scalability

---

### Q5. You support parallel partitioned exports. How does partitioning work, and what problems does it solve?

**Answer:**

Partitioned exports split a single large report into multiple independent chunks that run concurrently, each processing a subset of the data.

**How it works:** The partition strategy is defined in config — typically by a column that has natural range distribution (order ID ranges, date ranges, or an explicit partition key). Given `--parallel 4`, `ExportService` divides the dataset into 4 non-overlapping ranges and dispatches each to a separate worker thread via a `ScheduledExecutorService`. Each worker runs its own primary query with an appended `WHERE partition_key BETWEEN ? AND ?` clause, maintains its own JDBC connection from the tenant's HikariCP pool, and writes to a separate output file. `CsvCombiner` then merges the output files in partition order into the final report.

**Problems it solves:**

First, **wall-clock time.** A 4M-row export that takes 20 minutes sequentially takes ~6 minutes with 4 parallel workers (accounting for some overhead and merge time). For time-sensitive scheduled reports, this is the difference between a report being ready at 6 AM vs 7 AM.

Second, **database-side parallelism.** Modern analytical databases (Redshift, Clickhouse) are internally parallel — a single large query may not fully utilize the database's compute. Running 4 medium queries in parallel often results in higher total throughput than one massive sequential query.

Third, **fault isolation.** If one partition fails (network blip, lock contention), only that partition needs to be retried — not the entire report. The other three partitions' output is preserved.

**The risk** is connection pool exhaustion: 4 parallel workers × N concurrent reports can saturate the HikariCP pool. We set `maximumPoolSize` per tenant per JDBC profile to account for expected parallelism, and the partition count is bounded by config (`maxParallel`) to prevent runaway resource usage.

---

### Q6. Explain the two-level caching strategy — subquery cache and join index cache. What's the TTL logic?

**Answer:**

The two caches serve different purposes in the join pipeline.

**Subquery cache (7-day TTL, disk-based):** After a subquery executes, its full result set is serialized to disk in the tenant's cache directory. The cache key combines the SQL hash and the date parameters used in the query. On subsequent exports, before executing the subquery, the cache is checked — if a valid (non-expired) cache file exists, it's deserialized directly. This is particularly valuable for reference data (product catalog, outlet master, user hierarchy) that changes infrequently. A product master subquery that takes 30 seconds to execute from Redshift becomes a 200ms disk read on the second run.

**TTL and shard modes:** The 7-day default is overridable per report. The shard mode (`day`, `month`, `range`, `auto`) controls how cache files are named relative to the query's date parameters. In `day` mode, a cache file is valid only for the same calendar day it was created — useful for data that's updated daily. In `month` mode, one cache covers the entire month. `auto` mode infers the right shard from the query's date range size.

**Join index cache (14-day TTL, LRU disk-backed):** This caches the *index structure* built from the subquery result — the bucketed lookup table used for row-by-row joins. Building this index from a 500K-row dataset takes time even if the subquery data is already cached. The LRU index cache skips that construction step. The 14-day TTL is longer than the subquery TTL because index structures are derived data — they're still valid as long as the underlying subquery data is valid.

**Cache invalidation:** There's no active invalidation — we rely on TTL expiry. For cases where source data changes unexpectedly, the `--no-cache` CLI flag forces full re-execution, bypassing both caches and deleting stale cache files for the affected report.

---

### Q7. How does incremental export work? What is pointer tracking and how do you avoid re-processing already-exported rows?

**Answer:**

Incremental exports solve the problem of large tables that grow continuously — you don't want to re-export 50M historical rows every night just to get the 100K new rows added today.

**Pointer tracking:** After a successful export, `ExportService` writes a pointer file to `./.pointers/{tenantId}/{reportName}.json`. The pointer records the last processed value of the increment column — typically a monotonically increasing ID or a `createdAt` timestamp. On the next run, the report's SQL query has a named parameter `:since_pointer` that gets substituted with the value from the pointer file. The query effectively becomes `WHERE id > {last_exported_id}`.

**The pointer file structure:**
```json
{
  "reportName": "sales_invoice",
  "lastPointer": "9842731",
  "pointerColumn": "order_id",
  "lastRunAt": "2025-11-01T02:30:00Z"
}
```

**Safety design:** The pointer is only updated *after* a successful export and successful sink write (S3 upload confirmed, Redshift COPY completed). If the export fails mid-run, the pointer stays at the previous value and the next run re-processes from the last safe point. This gives at-least-once semantics — some rows may be processed twice on failure recovery, but no rows are skipped.

**For date-range based increments** (when there's no monotonic ID), the pointer stores the last `createdAt` timestamp. The query uses `WHERE created_at > :since_pointer AND created_at <= :run_at` — the upper bound is the current run's start time, not `NOW()`, to avoid the race condition where rows inserted after the export starts but before it finishes would be missed permanently.

---

## Database & Integration

---

### Q8. You support 6 different database types as sources. How did you abstract JDBC differences across MySQL, PostgreSQL, Redshift, MS SQL Server, and IBM DB2?

**Answer:**

The abstraction lives in `JDBCProfile` — a config object that captures everything database-specific:

- **Driver class name** (`com.mysql.cj.jdbc.Driver`, `org.postgresql.Driver`, `com.amazon.redshift.jdbc.Driver`, etc.)
- **Connection URL template** (syntax differs per vendor — MySQL uses `jdbc:mysql://`, MSSQL uses `jdbc:sqlserver://`)
- **Fetch size behavior** — MySQL requires `useCursorFetch=true` and a statement-level fetch size to stream results; PostgreSQL requires `autoCommit=false` and a fetch size; Redshift behaves like PostgreSQL; MSSQL has its own cursor semantics. `JDBCProfile` includes database-type-aware fetch configuration.
- **SQL dialect hints** — some databases don't support `LIMIT/OFFSET`, some use `TOP N`, some use `ROWNUM`. Named parameters in the query template are resolved before execution, including dialect-specific pagination clauses when partitioning.

**HikariCP** handles the actual connection pooling above this abstraction — it accepts a JDBC URL and driver class, so `DataSourcePoolRegistry` creates one `HikariDataSource` per `JDBCProfile` per tenant and stores them in a registry map keyed by `{tenantId}:{profileName}`. Callers never interact with JDBC directly — they ask the registry for a `DataSource` by profile name and run queries through it.

**IBM DB2 / IBM i (JT400)** was the most unusual integration. JT400 uses a non-standard JDBC URL format and has specific connection properties for library list and job description. We handled this with a `JT400ProfileBuilder` that knows how to construct the URL and set the extra connection properties before handing off to HikariCP.

**datasource-proxy** wraps every `DataSource` with SQL logging — every query that executes is logged with its parameters and execution time. This gives us full SQL audit trails in production without touching any application code.

---

### Q9. How does SSH tunneling work for database connections? When is it needed?

**Answer:**

SSH tunneling is needed when the source database is not publicly accessible — for example, a client's on-premise MySQL server behind a firewall, or a Redshift cluster in a private VPC subnet that doesn't have a direct internet route.

The implementation uses **JSch** (Java Secure Channel). When a `JDBCProfile` has SSH tunnel config set, `DataSourcePoolRegistry` creates an SSH tunnel before constructing the `HikariDataSource`:

1. JSch opens an SSH session to the bastion host using key-based authentication (private key loaded from AWS Secrets Manager or a local path).
2. A local port forward is established: traffic sent to `localhost:{localPort}` is forwarded through the SSH tunnel to `{dbHost}:{dbPort}` on the remote network.
3. The JDBC URL in the `JDBCProfile` is rewritten to point to `localhost:{localPort}` instead of the real database host.
4. HikariCP connects to `localhost:{localPort}` — it has no idea there's an SSH tunnel; it just sees a local socket.

**Lifecycle management:** The SSH session is kept alive for the duration of the application process (or the export job in CLI mode). JSch's `setServerAliveInterval` sends keepalive packets to prevent the bastion from terminating idle sessions. If the SSH session drops mid-export, HikariCP will see connection failures and attempt to reconnect — but since the tunnel is gone, reconnection fails. We log this as a tunnel failure and surface it in the status record so the operator knows the root cause rather than seeing a generic JDBC error.

**Security:** The bastion private key is never stored in config files — it's fetched from AWS Secrets Manager at startup using the tenant's IAM credentials. This means rotating the SSH key requires updating Secrets Manager, not redeploying the application.

---

### Q10. You have 6 sink destinations — S3, Redshift, MySQL, MSSQL, DB2, local filesystem. How is the sink abstraction designed?

**Answer:**

The sink layer uses a **pluggable connector registry pattern**. `SinkConfig` is a YAML-defined object that specifies the destination type and its parameters (bucket name, table name, COPY command, merge strategy, etc.). `ConfigToSinkConverter` maps a `SinkConfig` to a concrete sink implementation at runtime.

Each sink implements a common interface with three responsibilities:
- **`open()`** — initialise the connection/stream (open S3 multipart upload, get JDBC connection, open file handle)
- **`write(row)`** — accept a transformed row and write it to the destination
- **`close(success)`** — finalise on success (commit S3 multipart, execute COPY/MERGE, flush file) or clean up on failure (abort multipart upload, rollback transaction)

**S3 sink** uses AWS SDK v2 multipart upload. Rows are buffered into a 5MB in-memory chunk, then flushed as a part. On `close(success)`, `CompleteMultipartUpload` is called. On failure, `AbortMultipartUpload` cleans up partial parts so you're not charged for orphaned S3 parts.

**Redshift sink** uses the COPY command pattern: data is first written to a staging S3 path, then `COPY {table} FROM 's3://...' CREDENTIALS '...' CSV` is executed. COPY is the fastest way to bulk-load into Redshift — direct row-by-row JDBC inserts would be orders of magnitude slower.

**MySQL/MSSQL/DB2 sinks** use `INSERT ... ON DUPLICATE KEY UPDATE` (MySQL) or `MERGE` statements (MSSQL, DB2) for upsert semantics. Rows are batched (JDBC batch size configurable per profile) to minimize round trips.

**`SinkFromConfigLlMGenerator`** is the LangChain4j integration — if a user describes a sink in natural language ("write to the S3 bucket called reports-prod in ap-south-1, partitioned by date"), the LLM generates the `SinkConfig` YAML. This is useful for onboarding new tenants who aren't familiar with the config schema.

---

## Scheduling & Reliability

---

### Q11. How does the cron-based scheduler work? How do you prevent duplicate runs if the scheduler fires twice?

**Answer:**

The scheduler is built on `ScheduledExecutorService` rather than a Quartz-style framework — simpler to operate, no external scheduler database needed.

`SchedulerService` loads schedule definitions from `./schedules/{tenantId}/*.yaml` at startup and on a file-watch interval. Each schedule has a cron expression, a report name, and optional parameter overrides. On every tick (every minute), the scheduler evaluates which schedules are due — comparing the current time against the cron expression using a standard cron parser.

**Duplicate run prevention via state file.** The key mechanism is `./schedule-state.json`, which records the last *successful* run time for each `{tenantId}:{scheduleName}`. Before executing a scheduled export, the scheduler reads this file and checks: `lastRunAt + schedule.minimumInterval > now`. If the last run was too recent, the current tick is skipped. After a successful export, the state file is updated atomically (write to a temp file, then rename — rename is atomic on POSIX filesystems).

**Why not rely solely on the cron expression?** Because cron expressions say "when to run" but not "whether it already ran." If the service restarts mid-second, the cron expression would fire again on the next tick for a schedule that just completed. The state file provides idempotency — the export won't run twice in the same window regardless of restarts.

**`MultiTenantSchedulerService`** manages schedulers across all registered tenants in the same process. Each tenant's schedules run on an independent thread pool, so a slow export for Tenant A doesn't delay Tenant B's scheduled jobs. The thread pool size per tenant is configurable to match that tenant's concurrency expectations.

---

### Q12. How do you track report execution status, and why offer both file-based and JDBC-based status storage?

**Answer:**

Every status update during an export — start, each partition completing, data counts, final success/failure — is recorded as a `ReportStatusRecord` and written to a `ReportStatusSink`.

**File-based sink (`FileReportStatusSink`):** Records are appended as NDJSON (newline-delimited JSON) to `./.status/{tenantId}/{runId}.ndjson`. Each line is one status event with a timestamp, event type, and metadata. The file grows as the export progresses; on completion the final record marks success or failure with the output file path.

**JDBC-based sink (`JdbcReportStatusSink`):** Records are inserted into a `report_status` table in a configured database. Callers query this table for timelines and aggregated summaries.

**Why both?**

File-based is the zero-dependency default — it works with no additional infrastructure. For a new tenant onboarding or a CLI batch run, you don't want to require a database just to track status. The NDJSON files are also easy to parse with `jq` for debugging.

JDBC-based is needed when multiple service instances need to share status — in a horizontally scaled deployment, each instance writes exports independently, but status needs to be queryable from a single place. A shared database is the obvious solution. It also enables SQL-powered analytics: "how many reports failed this week per tenant", "which report type has the highest average duration" — queries that are trivial in SQL but painful against thousands of NDJSON files.

The mode is controlled by `EXPORTER_STATUS_MODE=file|db`. Switching between them requires only an environment variable change and a restart — no code change, no data migration needed since both modes start fresh from the current run.

---

## AI/LLM Integration

---

### Q13. You integrated LangChain4j with local embeddings. What problem does this solve, and how does it work?

**Answer:**

The integration solves **report config onboarding friction**. The slake-reporting YAML config schema is powerful but non-trivial — describing a multi-query join report with 250+ column mappings, transforms, sink configuration, and schedule is not something a non-engineer can do easily. The LLM integration lets a user describe what they want in plain English and generates a starter config.

**How it works:**

1. **Document parsing:** When a client provides existing report specifications (Word docs, PDFs, spreadsheet column definitions), Apache Tika extracts the text. LangChain4j chunks this text and embeds each chunk using the **all-MiniLM-L6-v2** model running locally (384-dimensional embeddings) — no data leaves the server, which matters for clients with data residency requirements.

2. **Vector storage:** Embeddings are stored in a **Chroma** vector database instance. When a user asks "generate a config for a daily sales invoice report with these columns," the query is embedded with the same model, and the top-K most relevant chunks from the client's documentation are retrieved via cosine similarity.

3. **Config generation:** The retrieved context + the user's request are assembled into a prompt for the LLM (OpenAI API or a local model). `SinkFromConfigLlMGenerator` instructs the LLM to produce a `SinkConfig` YAML that conforms to the schema. The output is validated against the schema before being returned to the user — invalid configs are rejected with an explanation rather than silently passed to the engine.

**Why local embeddings?** Embedding 250-column report specifications through an external API would cost money per call and send client data externally. The MiniLM model is small enough to run on CPU in the application container without a GPU, and its 384-dimensional embeddings are sufficient for document similarity at this scale.

**The honest limitation:** LLM-generated configs need human review before production use. The generator produces a valid-schema config, but it may hallucinate column names or join keys that don't exist in the actual database. We present it as a draft that the engineer reviews and corrects, not a one-click solution.

---

### Q14. You chose local embeddings (MiniLM) over calling the OpenAI embedding API. What were the trade-offs?

**Answer:**

The trade-off is **quality vs. cost/privacy**.

**OpenAI embeddings (text-embedding-3-small or -large)** produce higher-dimensional, higher-quality embeddings trained on far more data. For nuanced semantic search — distinguishing between "sales return" and "sales invoice" in a domain with overlapping terminology — they outperform MiniLM meaningfully.

**MiniLM-L6-v2** is a 22MB model that runs on CPU in about 10–50ms per embedding. It was fine-tuned on sentence similarity tasks and performs well for document retrieval even if not at OpenAI's level. For our use case — retrieving relevant config sections from a corpus of 20–50 report specification documents per tenant — the quality difference is acceptable. The retrieval doesn't need to be perfect; it just needs to surface relevant context that the LLM can then reason over.

The decisive factors for local embeddings were:

1. **Data privacy.** Client report specifications contain proprietary business logic and column names that reflect internal operations (SKU codes, distributor IDs, pricing tiers). Sending these to an external API is a data governance risk that several enterprise clients explicitly prohibit in their contracts.

2. **Latency predictability.** OpenAI API latency varies under load. Local inference is consistent — ~30ms regardless of OpenAI's server state. For a tool that's used interactively during config setup, consistent latency matters more than marginal quality improvement.

3. **Cost at scale.** Embedding a 250-column report spec multiple times per tenant onboarding, across dozens of tenants, adds up. At zero marginal cost per embedding locally, this concern disappears.

The architecture is designed to swap the embedding model — `EmbeddingModel` is an interface in LangChain4j. Moving to OpenAI embeddings requires changing one line of configuration, not rewriting code. So the local choice is not a permanent constraint.

---

## Observability & Deployment

---

### Q15. How is the service deployed, and what does running on GraalVM JDK 24 give you over a standard JVM?

**Answer:**

The deployment is Docker-based with a multi-stage build. Stage 1 uses a Maven image to compile the application and run tests. Stage 2 uses a **GraalVM JDK 24** base image to run the compiled bytecode.

An important distinction: we're running on **GraalVM JDK** (not native image). This means we get GraalVM's JIT compiler (which is more aggressive than HotSpot's C2 in certain scenarios) and the platform's memory management improvements, but we're still running bytecode — not a statically compiled native binary. The choice against full native compilation was pragmatic: native image compilation with Quarkus requires reflection configuration for every class that uses reflection (Jackson, JDBC drivers, Hibernate types), and our codebase has enough dynamic behavior (runtime class loading for JDBC drivers, LangChain4j reflection) that the native image build was fragile and added significant build time.

**What GraalVM JDK gives us over standard JVM:**
- Better peak throughput on certain workloads through GraalVM's Graal JIT compiler
- **Java 21 virtual threads (Project Loom)** — Quarkus on Java 21 can use virtual threads for blocking JDBC operations. Each export query runs on a virtual thread, which is cheap to create (they're not OS threads). This means we can have hundreds of concurrent export jobs with JDBC blocking operations without exhausting an OS thread pool. Traditional threads at this concurrency level would require a large thread pool and significant memory.

**Health checking:** The container defines `HEALTHCHECK` calling `/q/health/ready` every 30 seconds. The ready probe checks that the `TenantRegistry` has loaded and that database connection pools are healthy. An instance is only sent traffic by the load balancer once this probe passes.

**`Main.java` watchdog:** Beyond the container health check, `Main.java` runs an internal HTTP monitoring loop that calls `/status` every 10 seconds. If the internal status endpoint stops responding (deadlock, OOM), the watchdog logs a critical alert and exits the process — triggering container restart.

---

### Q16. How is OpenTelemetry set up, and what can you observe in production?

**Answer:**

OpenTelemetry is configured via the **Logback OTLP appender** — log events from SLF4J flow through Logback, which ships them to an OTLP-compatible collector endpoint (configurable via environment variable). This means structured log records — with trace IDs, span IDs, tenant context, report names — are exported to whatever backend the OTLP collector points to (Jaeger, Grafana Tempo, Honeycomb, Datadog).

**datasource-proxy** adds SQL-level observability without code changes. Every JDBC query executed through any `DataSource` in the registry is intercepted by the proxy, which logs the SQL, bind parameters, and execution time as a structured log event. In production this gives us:
- Slow query detection (queries over a configurable threshold are logged at WARN level)
- Full SQL audit trail per `runId` and tenant
- Bind parameter logging (configurable to mask sensitive values)

**What's observable in production:**

- **Export timeline per `runId`:** Start time, per-partition completion, cache hit/miss events, sink write confirmation, final status. By filtering OTLP logs by `runId`, you get a complete trace of an export without needing a distributed tracing backend.
- **Cache effectiveness:** Cache hit events log the cache key and TTL remaining. Monitoring cache hit rate per report name identifies which reports would benefit from longer TTLs.
- **Database performance:** datasource-proxy events expose per-query latency broken down by JDBC profile, so you can see if Redshift queries are consistently slower than MySQL queries for the same report.
- **Tenant activity:** Filtering by tenant ID shows which tenants are generating the most export volume, which helps capacity planning.

**The gap:** We don't have custom metrics (counters, histograms) emitted via the OpenTelemetry Metrics API — only log-derived observability. Adding `UpDownCounter` for active exports and `Histogram` for export duration would make alerting more precise than parsing log events.

---

## Design Decisions & Trade-offs

---

### Q17. Your named-parameter SQL supports `LIST_*` expansion for `IN` clauses. Why is this non-trivial and how did you implement it?

**Answer:**

JDBC's `PreparedStatement` doesn't support collections natively. If a report filter is "show only these 50 outlet codes," you cannot write `WHERE outlet_code IN (?)` and pass a list — you'd need to expand it to `WHERE outlet_code IN (?, ?, ?, ... ?, ?)` with exactly 50 placeholders, or use a different approach.

`LIST_*` parameters solve this. In the report config SQL, you write:

```sql
WHERE outlet_code IN (:LIST_outletCodes)
```

At runtime, the named parameter resolver sees `:LIST_outletCodes`, checks the parameter map for `outletCodes`, and expands the SQL to:

```sql
WHERE outlet_code IN (?, ?, ?, ...)
```

with the right number of `?` placeholders matching the list size, then binds each value in order.

**Why it's non-trivial:**

1. The SQL string must be rewritten before being passed to `PreparedStatement.prepareStatement()` — you can't change the number of `?` after preparation.
2. The parameter index mapping must be recalculated. If the SQL has other named parameters before the list, their bind indices shift by `list.size() - 1` after expansion.
3. Very large lists (1000+ values) hit `IN` clause limits on some databases — Oracle limits to 1000 items, DB2 has similar restrictions. We handle this by splitting large lists into multiple `IN` clauses connected with `OR`, which the SQL rewriter handles transparently.
4. Empty lists require special handling — `IN ()` is a SQL syntax error. An empty list is rewritten to `IN (NULL)` which safely matches nothing.

The resolver processes the SQL string once per execution, not per row — the rewritten SQL is cached for the duration of the export job so repeated partition queries don't pay the rewrite cost each time.

---

### Q18. You use row hashing (SHA-256) for data integrity. What problem does this solve?

**Answer:**

Row hashing is a data integrity feature for exports that land in data warehouses (Redshift, MSSQL). The problem it solves: how do you know the data in the warehouse exactly matches what was exported from the source, row for row?

When `Config.Report.Hash` is enabled, `ExportService` computes a SHA-256 hash of each output row's column values (concatenated in a defined order) and writes it as an additional column in the output. The hash is computed after all column transforms are applied — so it reflects the final exported value, not the raw database value.

**Use cases:**

1. **Reconciliation audits.** The client's data team can re-hash the same columns from the warehouse data and compare against the hash column. Any row where the hashes diverge has been modified after export — a sign of either a warehouse bug, an ETL transformation that shouldn't have occurred, or data tampering.

2. **Incremental deduplication.** When running incremental exports with upsert sinks, the hash lets the sink implementation skip rows that haven't changed — `MERGE ... WHEN MATCHED AND source.hash <> target.hash THEN UPDATE`. Without the hash, every incremental run would re-update all matching rows even if the data is identical, creating unnecessary write amplification on the warehouse.

3. **Export verification.** The status record for the export logs the total row count and aggregate hash (XOR of all row hashes). After the sink write confirms, the sink-side can report its own row count and aggregate hash. A mismatch between source and sink aggregate hashes flags a partial write — the export result file arrived at S3 but the Redshift COPY silently dropped rows (which can happen due to format errors in individual rows).

The hash is fast relative to the I/O cost of the export — SHA-256 on a 100-column row takes microseconds, negligible against JDBC fetch and disk/network write latency.

---

### Q19. What was the hardest technical problem you solved building slake-reporting?

**Answer:**

The hardest problem was **memory stability under large multi-query joins with skewed join key distribution**.

The symptom: exports that joined a 3M-row primary table against a 1M-row subquery were randomly OOM-killing the process in production. The heap dump showed that the LRU join index was growing unboundedly despite our LRU eviction logic.

The root cause was join key skew. The LRU index bucketed subquery rows by their join key (e.g., product ID). Our LRU logic evicted the *bucket* with the lowest access count. But in a real dataset, a handful of "universal" products appeared in nearly every primary row — their bucket was always the hottest, so it never got evicted. Meanwhile, thousands of "tail" product buckets each had only 1–2 rows but collectively occupied most of the heap because the hot bucket retained their memory too (they were loaded together in the same index shard).

The fix had two parts:

First, we changed the LRU granularity from bucket-level to **row-level within a bucket**. Individual rows within the hot bucket that hadn't been accessed recently were evicted to disk first, freeing memory incrementally rather than waiting to evict an entire bucket.

Second, we added **memory pressure monitoring** via `Runtime.getRuntime().maxMemory()` and `freeMemory()`. When available heap drops below 20% of max, the index triggers an emergency flush of its coldest resident rows to disk regardless of the LRU access count. This acts as a pressure relief valve for skewed distributions that the normal LRU can't handle gracefully.

After this fix, the same 3M×1M join runs with stable 600MB heap usage regardless of join key distribution. Finding the root cause took two days of heap dump analysis and adding detailed LRU telemetry. The fix itself was a few hundred lines of changes to the index eviction policy.

---

### Q20. If you were to rebuild slake-reporting today, what would you do differently?

**Answer:**

Three things.

**First, native Quarkus image from day one.** I avoided GraalVM native compilation because of the reflection configuration overhead, but the long-term benefits — sub-second startup, drastically lower memory footprint per container, better cold-start cost in a scaled deployment — outweigh the initial setup effort. I'd invest the time upfront to get native image working with all the JDBC drivers and LangChain4j dependencies properly configured. The tooling has also improved significantly since I started the project.

**Second, a proper observability layer instead of log-derived metrics.** Right now, operational insights (export duration histograms, cache hit rates, per-tenant volume trends) are derived from parsing log events. This works but is fragile — a log format change breaks dashboards. I'd instrument `ExportService` with OpenTelemetry Metrics API directly: `LongCounter` for row counts, `DoubleHistogram` for export duration, `UpDownCounter` for active jobs. These would emit as proper metrics to Prometheus/Grafana and support alerting with configurable thresholds rather than log-pattern regex rules.

**Third, a declarative pipeline DSL instead of monolithic YAML.** The current config schema mixes concerns: source query, join logic, column transforms, output format, sink config, and schedule are all in one YAML file. For simple reports this is fine, but for a 250-column invoice report the file is unwieldy and hard to diff in code review. A pipeline DSL — where each stage (extract, join, transform, load) is a separate composable unit — would make reports more readable, reusable (share the same transform step across reports), and testable in isolation. The `SinkConfig` is already close to this model; extending it to the full pipeline is the natural evolution.

---

*Last updated: May 2026 — based on production codebase state*
