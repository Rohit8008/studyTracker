# Interview Preparation — Part 2

**Projects:** `reports` · `reports-jar`  
**Covers:** Async task system · Error handling · File downloads · DB pooling · API design · Hierarchy model · SQS vs Kafka · Media/encryption · CORS · Environment config · Observability · JasperReports

---

## Async Task System

---

### Q1. Walk me through the full lifecycle of an async report request — from the API call to the user downloading the file.

**Answer:**

The flow has four distinct phases:

**Phase 1 — Task creation.**
The client sends `POST /tasks/types/{taskType}/execute` with a `Task` JSON body specifying report parameters, filters, output format, and target LOB. The `GenericTaskController` delegates to `TaskService`, which persists the task in the `ck_task` table with status `PENDING`. The API returns immediately with the created task object and its `id`. The client is not blocked.

**Phase 2 — Async execution.**
The task is published to the Kafka topic `{env}-reports-stream` via `KafkaTaskPublisher`. The `KafkaReportConsumer` picks it up, updates the task status to `INPROGRESS`, and calls the appropriate `TaskExecutor` implementation looked up via `ServiceLocator` by task type. Inside the executor, the right `AbstractReport.run()` is called from `reports-jar`, which streams data through the `StreamingProvider` pagination loop and passes it to the generator (Excel, PDF, CSV, etc.).

**Phase 3 — Polling.**
The client polls `GET /tasks/{taskId}` at an interval. The response includes the current `TaskStatus` — `PENDING`, `STARTED`, `INPROGRESS`, `SUCCESS`, or `FAILURE`. On `SUCCESS`, the task's `attributes` JSON contains `fileKeys` — the identifiers for the generated files stored in the media layer.

**Phase 4 — Download.**
The client calls `GET /v1/reports/{taskId}` (or the batch endpoint for multiple files). `ReportDownloadController` checks that the task status is `SUCCESS`, verifies the requester is the task creator via `permissionEvaluator.assertResourceAccess()`, fetches the decrypted input stream from the media service, and streams it back as an `InputStreamResource` with `Content-Disposition: attachment`.

There is no WebSocket or server-sent event push — the design is deliberately simple polling. The trade-off is extra requests from clients, but it keeps the server stateless and avoids a persistent connection management problem.

---

### Q2. Why did you choose polling over WebSockets or Server-Sent Events for task status updates?

**Answer:**

Polling was a deliberate choice based on three constraints at the time.

First, **client diversity.** The API is consumed by a web frontend, mobile apps, and other backend services. WebSockets add complexity on every client — reconnection logic, fallback handling, proxy configuration. A polling endpoint (`GET /tasks/{id}`) works identically for all clients with zero extra infrastructure.

Second, **server statelessness.** Spring Boot runs as a stateless service behind a load balancer. WebSocket connections are sticky — a client connected to instance A can't receive pushes from instance B when the load balancer routes differently. Making WebSockets work correctly in a multi-instance deployment requires a shared message broker (like Redis pub/sub), which adds operational complexity. Polling requires nothing — any instance can answer the status query from the database.

Third, **report jobs are long-running.** A report that takes 90 seconds doesn't benefit much from SSE over polling every 3 seconds — the UX difference is negligible. For short-lived operations (under 5 seconds), polling is awkward; for multi-minute jobs, it's perfectly fine.

The honest limitation is that polling puts load on the API from clients checking frequently. We mitigated this by designing the `Task` model with a `parentTaskId` field so batch operations return one parent task ID — clients only poll one endpoint regardless of how many sub-tasks are running. If I were to add push today, I'd use Server-Sent Events rather than WebSockets because SSE is unidirectional, works over standard HTTP/2, and doesn't need sticky routing.

---

### Q3. How does the `ServiceLocator` pattern work for task type dispatch, and why use it instead of a simple `switch` statement or `@Autowired` map?

**Answer:**

The `ServiceLocator` is a Spring-backed registry. Each `TaskExecutor` implementation declares its supported task type — typically via a constant or annotation — and registers itself in the locator at startup. When `GenericTaskController` receives `POST /tasks/types/{taskType}/execute`, it calls `ServiceLocator.getExecutor(taskType)` to get the right implementation.

The reason not to use a `switch` statement: every new report type would require modifying the controller. In a system with dozens of report types spread across 19 LOBs, that central `switch` becomes a liability — it's a merge conflict hotspot and it couples unrelated report types together.

The reason not to use a plain `@Autowired Map<String, TaskExecutor>`: that works for simple cases, but the `ServiceLocator` gives us the `hasPermission(Task)` check before dispatch. Different task types have different permission requirements — some are available to all authenticated users, others require specific roles or LOB membership. The locator encapsulates this: it calls `executor.hasPermission(task)` before calling `executor.execute(task)`, so the controller doesn't need to know anything about permissions per task type.

The endpoint `GET /tasks/types/all` lists all registered task types, which is how the frontend knows what report types are available for the current user's LOB — the registry is self-describing.

---

## Error Handling & API Design

---

### Q4. Describe your API error handling strategy. How does a validation error look different from a system error in the response?

**Answer:**

All errors are returned as an `ApiError` object with a consistent structure:

```json
{
  "timestamp": "2025-11-01T10:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed for report request",
  "traceId": "a3f9b2c1-...",
  "errorCode": "VALIDATION_ERROR",
  "subErrors": [
    { "field": "dateRange", "rejectedValue": null, "message": "Date range is required" }
  ]
}
```

**Validation errors (4xx):** The `subErrors` list is populated. Each `ApiSubError` carries the field name, the rejected value, and the human-readable reason. This gives clients exactly what they need to surface per-field errors in a UI without parsing a message string.

**System errors (5xx):** `subErrors` is empty. The `message` field has a safe, user-facing description. The `exception` field (the Java class name) is annotated `@JsonIgnore` in production — we never expose stack traces or exception class names to the client. The `traceId` ties back to Elasticsearch so we can find the full exception server-side without leaking it to the client.

**Exception hierarchy:** `ResourceNotFoundException` is annotated `@ResponseStatus(HttpStatus.NOT_FOUND)` so Spring maps it to 404 automatically. `ResourceNotAccessibleException` maps to 401. `CustomRuntimeException` (the catch-all) maps to 500. `ReportStoppedException` (no data) maps to a business-level 204 or 422 depending on context.

The `@ControllerAdvice` (`ApiDebuggerAdvice`) sits above all controllers — it intercepts every unhandled exception, wraps it in `ApiError`, sets the right HTTP status, and ensures no raw exception ever escapes to the client. This single point of exception handling means individual controllers never write try-catch blocks for HTTP error formatting.

---

### Q5. Your API uses `/v1/` versioning. How would you handle introducing a `/v2/` endpoint when the response contract changes, without breaking existing clients?

**Answer:**

The `/v1/` prefix gives us the URL namespace to do this cleanly. When a breaking change is needed — say, the report status response restructures `attributes` into typed fields — the approach is:

1. **Add `/v2/` endpoint alongside `/v1/`** — both backed by the same service layer, but the v2 controller method returns a new DTO class with the updated contract. The service doesn't change; only the serialization does.

2. **Deprecation header on v1.** The v1 endpoint starts returning `Deprecation: true` and `Sunset: <date>` headers. Clients can detect this without breaking.

3. **Version the DTO, not the service.** Business logic is in the service layer. The controller is just a thin adapter that maps service output to the right response DTO for the requested API version. This means v1 and v2 share all caching, security, and business logic — we don't fork the entire stack.

4. **Never change a field in-place.** If `status` needs a new type, add `statusV2` first (additive), give clients time to migrate, then remove the old field in v2 when v1 is sunset. Additive changes are always backward-compatible within the same version.

In this codebase specifically, the `ApiFilterResponse` pagination envelope (`features`, `currentPage`, `totalPage`, `totalElements`) is stable across all list endpoints. Any breaking change to the shape of items within `features` would be the trigger for a version bump, while envelope changes would affect all endpoints simultaneously and require more care.

---

### Q6. Tell me about your pagination implementation. What are the tradeoffs of offset-based pagination for large report datasets?

**Answer:**

The `ApiFilterResponse` uses **offset-based (page-number) pagination**: the client sends `page` and `pageSize`, the service calls Spring Data's `Pageable`, and the response includes `currentPage`, `totalPage`, and `totalElements`.

This works well for the registry and list endpoints where datasets are bounded (hundreds to low thousands of records). The response envelope is clean and the frontend can build page controls directly from `totalPage`.

The honest trade-offs for large datasets:

**Deep-page performance degradation.** Offset pagination translates to `OFFSET N LIMIT M` in SQL. At page 500 with 100 items per page, MySQL scans and discards 50,000 rows before returning 100. For analytical queries hitting Clickhouse or Redshift, this gets expensive fast.

**Inconsistency under concurrent writes.** If rows are inserted between page 1 and page 2 fetches, items shift — the client sees duplicates or skips rows. For report data that's mostly read-only, this is acceptable. For live transactional data it would be a real problem.

**For report generation specifically**, we avoid this problem entirely by using the `StreamingProvider` pattern in `reports-jar` rather than offset pagination. `nextStream(offset, count)` is implemented per data source — for database sources it uses cursor-based iteration or keyset pagination (filtering on the last seen primary key) rather than SQL OFFSET. For API-based sources it uses the upstream API's native page parameter. This means large reports stream correctly regardless of size, while the public-facing list endpoints use the simpler offset approach where dataset sizes are manageable.

---

## Data Model & Domain

---

### Q7. Explain the Division → Outlet → HierarchyMetaData model. How does it map to a real distribution network?

**Answer:**

This models a **Fast-Moving Consumer Goods (FMCG) distribution hierarchy**, which is the actual domain our clients operate in. Let me map it to the real world:

**Division** (`ck_division`) represents organizational units in the company — "North Region", "South Zone", "Modern Trade". Divisions are self-referential (`parent` field), so they form a tree. A national sales head owns the root division; regional managers own sub-divisions. Each division has `permissionGroups` (roles) attached, which controls who can see division-level reports.

**OutletDetails** represents a physical store or retailer — a Kirana shop, a supermarket, a petrol pump that stocks the product. Each outlet has an `outletCode` (unique identifier), beat (the sales route it's on), channel (modern trade vs general trade), and is linked to a `userName` — the sales representative responsible for that outlet.

**HierarchyMetaData** is the reporting line. The `hierarchy` field is a tilde-separated path like `"Retailer~Distributor~ASM~RSM~NSM"` — reading bottom-up, this says the retailer reports to a distributor, who reports to an Area Sales Manager, then Regional Sales Manager, then National Sales Manager. Similarly, `locationHierarchy` = `"Mumbai~Maharashtra~West~India"` encodes the geographic rollup.

Why tilde-separated strings instead of a proper adjacency list? Performance. When a report needs to aggregate sales for "everything in Maharashtra," it can do a SQL `LIKE '%~Maharashtra~%'` on the `locationHierarchy` column. It's denormalized, but it avoids recursive CTEs on a table with millions of rows. The trade-off is that hierarchy changes require updating every `HierarchyMetaData` row in the subtree — we handle this with a background task that rebuilds hierarchy paths when the org structure changes.

---

### Q8. How does report access control work across the hierarchy? Can a Regional Manager see data for the whole region but not other regions?

**Answer:**

Yes, and this is enforced at the data-fetch layer, not just the UI layer.

Every authenticated user has their `loginId` and the hierarchy path associated with their account stored in `HierarchyMetaData`. When a `StreamingProvider` fetches data for a report, the `addDefaultContext()` method merges the current user's hierarchy context into the query parameters. For a Regional Sales Manager, this context includes their position in the hierarchy — say `"RSM~NSM"` — which the downstream data API uses to filter results to only the outlets and orders in their reporting subtree.

For the `UserCacheDataProvider` calls like `getUsers(loginId, "all", true, false)` — the `loginId` is the RSM's ID, and the method returns all users *below* that loginId in the hierarchy. Report generators then scope their queries to that user set.

The `Division` model adds a coarser-grained control: `permissionGroups` on a division restricts who can even *access* reports tagged to that division. A user without the right `Role` in the division's `permissionGroups` gets a 401 from `ResourceNotAccessibleException` before any data is fetched.

The key design decision was: don't rely solely on row-level SQL filtering, because different data sources (Clickhouse, Redshift, external APIs) have different query capabilities. Instead, scope the *user set* at the application layer and pass it as a filter to all data sources uniformly. The hierarchy tree becomes the universal access control mechanism regardless of which database the report hits.

---

## Storage, Media & Encryption

---

### Q9. How does file encryption work for stored reports? How is a file encrypted at write and decrypted at download?

**Answer:**

Files are encrypted at the media service layer before hitting any storage backend (S3, Azure Blob, or local). This is transparent to the report generators — they write bytes; the media service handles encryption.

The encryption uses **AWS KMS** for key management (KMS is in the dependency list). The media service generates a data encryption key (DEK) per file or per LOB, encrypts the file content with AES, and stores the encrypted ciphertext in the storage backend. The DEK itself is encrypted by a KMS Customer Master Key (CMK) and stored alongside the file metadata in `MediaMetaData`.

At download time, `MediaOperationController` calls `mediaMetaDataService.getDecryptedInputStream()`. This method:
1. Fetches the encrypted DEK from `MediaMetaData`.
2. Calls KMS `decrypt()` to recover the plaintext DEK (requires IAM permissions — an attacker with raw S3 access but no KMS access gets only ciphertext).
3. Wraps the S3/Azure input stream in a decrypting stream using the plaintext DEK.
4. Returns the decrypting `InputStream` to the controller, which pipes it to the HTTP response.

The client receives plaintext bytes over HTTPS — encryption is purely at rest. No temporary decrypted files are written to disk; the decryption is fully streaming, so even a 100MB Excel report never fully materializes in memory.

For the batch download endpoint, `ReportDownloadController` additionally offers **password-protected ZIP** using zip4j with AES-256 and DEFLATE compression. The password is generated by `ReportPasswordGenerator` and communicated to the user out-of-band (typically via a notification after the report is ready). This adds a second layer beyond transport security for sensitive financial reports.

---

### Q10. The download endpoint returns an `InputStreamResource`. How does this scale for large files — say a 500MB Excel report?

**Answer:**

`InputStreamResource` is exactly the right choice for large files because Spring MVC streams the response without buffering the entire file in memory. The flow:

1. `ReportDownloadController` gets a decrypting `InputStream` from the media service.
2. It wraps it in `InputStreamResource` and returns a `ResponseEntity<InputStreamResource>`.
3. Spring's `ResourceHttpMessageConverter` reads from the stream and writes directly to the servlet output stream in chunks. The default transfer buffer is 8KB.
4. The decrypting stream layer feeds from S3/Azure in its own chunks.

At no point is the entire 500MB file held in the JVM heap. The memory footprint is proportional to the buffer size (kilobytes), not the file size.

**Backpressure** is handled naturally by the servlet container — Tomcat writes to the socket only as fast as the client reads, and the `InputStream` blocks until more data is needed. If a client disconnects mid-download, Tomcat closes the connection and the stream chain unwinds cleanly.

**The one risk** is Tomcat thread occupancy. A 500MB file over a slow connection could hold a Tomcat thread for minutes. The mitigation is to use **presigned S3 URLs** for very large files — the client downloads directly from S3 with no application server in the path. We didn't implement that for the initial version (it requires the client to handle S3 auth), but it's the right long-term answer for files over ~50MB. The current approach is acceptable because most reports in practice are under 10MB and the 800-thread pool provides enough headroom.

---

## Messaging Architecture

---

### Q11. You have both SQS and Kafka. What does each handle, and why not consolidate to one?

**Answer:**

They solve fundamentally different problems.

**Kafka** is the event streaming backbone. It handles:
- `{lob}-event-streams` — real-time business events (order placed, payment received) for multiple consumers
- `{lob}-smart-trigger-events` — triggers for automated workflows
- `{lob}-integration-streams` — third-party integration data flow
- `{env}-reports-stream` — async report tasks

Kafka's strength here is **fan-out** — a single event can be consumed by multiple consumer groups independently, with each group maintaining its own offset. One event triggers report generation *and* analytics *and* notifications without the producer knowing about any of them.

**SQS** handles **fire-and-forget task dispatch** where exactly-one-consumer semantics and AWS-native reliability matter more than fan-out. SQS with visibility timeout guarantees a message is processed by exactly one consumer in a given window — if the consumer crashes, the message becomes visible again after the timeout and is retried. We use SQS for integrations with AWS services (Lambda triggers, SNS fan-out) where the SQS-to-Lambda event source mapping is built-in and requires no consumer process management.

**Why not consolidate?** Kafka requires a running consumer process — infrastructure you manage. SQS is fully managed — no brokers, no partitions, no consumer group coordination. For low-volume, reliability-critical operations where you're already in AWS, SQS is operationally simpler. For high-throughput event streaming with replay capability (Kafka retains messages for a configurable period, SQS does not), Kafka is irreplaceable.

The application properties show Kafka publish/subscribe disabled by default (`channelkart.integration.kafka.events.publish=false`) — it's opt-in per LOB, which reflects that not every tenant needs real-time streaming. SQS is always available as the baseline.

---

### Q12. If a Kafka consumer fails mid-processing, what happens? Is there a dead-letter queue?

**Answer:**

The current consumer configuration is `ENABLE_AUTO_COMMIT = false` with `AUTO_OFFSET_RESET = earliest`. This means:

- Offsets are committed with `commitAsync()` *after* the record is processed.
- If the consumer crashes before committing, on restart it re-reads from the last committed offset and reprocesses the record.
- This gives **at-least-once** delivery — the same record may be processed more than once.

For report tasks this is safe because tasks are idempotent: the `taskId` is checked before generating — if a report already exists for that task, the execution is a no-op.

**Dead-letter queue:** We don't have a formal DLQ implemented. When a record fails (exception caught in `KafkaReportConsumer`), we call `ReportLogger.logReportFailed()`, log the error to Elasticsearch, update the task status to `FAILURE`, and commit the offset anyway — intentionally moving past the failed record rather than retrying it forever. This is a pragmatic choice: a poison message (malformed task JSON, missing config) would block the entire partition if we kept retrying. The task's `FAILURE` status with the logged error gives the operator the information needed to manually retry or investigate.

The proper improvement would be a DLQ topic (`{env}-reports-dlq`) where failed records are published after N attempts, allowing async investigation and replay without blocking the main consumer. That's the gap I'd close next.

---

## Security & Infrastructure

---

### Q13. How is CORS configured, and what happens when a request from an unauthorized origin hits the API?

**Answer:**

CORS is handled by `CustomizedCorsFilter`, which extends Spring's `CorsFilter`. The filter uses `DefaultCorsProcessor` to evaluate incoming requests against a `CorsConfigurationSource` — typically configured in `WebSecurityConfiguration` with a whitelist of allowed origins.

When an unauthorized origin makes a preflight `OPTIONS` request, `DefaultCorsProcessor` rejects it — the filter does not add `Access-Control-Allow-Origin` to the response, so the browser blocks the actual request. The rejection doesn't return a 4xx error to the browser; the browser simply sees no CORS headers and enforces the same-origin policy on its own.

What makes our implementation notable: **every CORS rejection is instrumented.** `CustomizedCorsFilter` logs the rejected origin, client host, HTTP method, and endpoint to `RemoteMetricStream` via `EventMetrics`. This means every attempt by an unauthorized origin to call our API is visible in the metrics dashboard. We've used this data to identify:
- Misconfigured frontend deployments pointing to the wrong backend URL.
- Attempts from third-party tools trying to scrape the API.
- Legitimate new origins we forgot to whitelist after a deployment.

In production, the allowed origins are specific domain patterns tied to our deployed frontends. We don't use wildcard `*` because the API carries authentication tokens — CORS with `*` and `credentials: true` is rejected by browsers anyway, so it's both insecure and non-functional.

---

### Q14. How do you manage configuration across dev, UAT, and production environments? What changes between them?

**Answer:**

Configuration is managed through environment-specific `application.properties` files — not Spring profiles in the `@Profile` sense, but externalized properties that differ per deployment. The application reads properties from the standard Spring location, and the deployment pipeline substitutes the right file per environment.

What differs between environments:

| Property | Dev | UAT | Production |
|---|---|---|---|
| `channelkart.environment` | `dev` | `uat` | `prod` |
| Kafka broker addresses | Local/dev cluster | UAT cluster | Production cluster |
| Lambda ARN | UAT account (`240754906059`) | UAT account | Prod account (`008136251604`) |
| Elasticsearch endpoint | Dev ES | UAT ES | Prod AWS ES |
| `channelkart.base.url` | `dev.sellina.io` | `uat.sellina.io` | `prod.sellina.io` |
| Swagger UI | Enabled | Enabled | Disabled (`api-docs.enabled=false`) |
| DB URLs | Dev MySQL | UAT MySQL | Prod MySQL (via Secrets Manager) |

**Secrets** don't live in properties files. Database passwords and API keys are fetched from AWS Secrets Manager at startup, keyed by LOB and environment. This means even if a properties file were leaked, it contains no credentials — only pointers (secret names) to Secrets Manager.

The `channelkart.environment` value is critical — it determines which Lambda ARN the PDF converter uses, which Kafka topics the consumer subscribes to (topics are prefixed with `{env}-`), and which AWS account resources like S3 buckets live in. Getting this value wrong in a deployment would point prod to UAT resources, so we treat it as the most important config value to validate in the deployment pipeline smoke tests.

---

## Observability & Quality

---

### Q15. How do you monitor the health of the system in production? What would tell you a report job is stuck?

**Answer:**

Monitoring happens at three layers:

**Application layer — Spring Actuator.** The `/actuator/health` endpoint aggregates health indicators for the database connections, Kafka consumer group, and Elasticsearch client. This is what the load balancer checks for instance health. The actuator endpoints are locked to `SUPER_ADMIN` role, so they're not publicly accessible — they're polled by internal monitoring only.

**Log layer — Elasticsearch + Kibana.** Every request goes through `LoggingInterceptor`, which logs method, URI, status code, duration, and request ID. A Kibana dashboard with a query for `status >= 500` over a rolling 5-minute window gives us error rate. For report jobs specifically, `ReportLogger.logReportFailed()` writes a structured log entry with `taskId`, `lob`, `reportType`, and the exception message — searchable by any of these dimensions.

**Metric layer — `RemoteMetricStream`.** CORS rejections, API call events, and key business metrics are shipped to a remote metrics stream. This is where we'd put SLA-level alerting: if report completion rate drops below a threshold, or if the average task duration exceeds a bound.

**Detecting a stuck job:** A task that stays in `INPROGRESS` status beyond a time threshold is the signal. We have the `createdTime` on the `Task` entity — a Kibana alert querying for tasks with `status = INPROGRESS AND (now - createdTime) > 30 minutes` fires an alert. Operationally, the response is to check: (1) is the Kafka consumer still alive (consumer group lag metric), (2) is the specific `taskId` logged in the consumer's last activity, (3) is the data source the report queries responsive. This narrows root cause to consumer death, data source timeout, or an infinite loop in the streaming provider — each with a distinct remediation.

---

### Q16. How do you handle report generation when the underlying data source (Clickhouse, Redshift) is temporarily unavailable?

**Answer:**

The current posture is **fail fast and surface the error clearly**, rather than masking unavailability with retries that could cause cascading load.

When a `StreamingProvider` fails to fetch the first page — because the database is down or times out — the exception propagates up through `AbstractReport.run()`, gets wrapped in `CustomRuntimeException`, and the Kafka consumer catches it in `KafkaReportConsumer`. The task status is set to `FAILURE`, `ReportLogger.logReportFailed()` records the reason, and the offset is committed. The user sees a failed task with an error message like "Data source unavailable, please retry."

**Why not retry automatically?** Analytical databases under load are a classic retry thundering-herd scenario. If Clickhouse is struggling and 20 report tasks all retry simultaneously, we make it worse. The task model gives users a manual retry path (re-submit the task), which is throttled by human action.

**What I would add for production robustness:** A circuit breaker around each data source client. When Clickhouse fails N times in a window, open the circuit and reject new tasks for that data source immediately with a clear "data source temporarily unavailable" message, rather than letting each task spend its timeout on a connection that won't succeed. Resilience4j `@CircuitBreaker` is the natural fit here — it integrates with Spring Boot and doesn't require infrastructure changes. This is the gap between current state and production-hardened state that I'd close in the next iteration.

---

## Design Decisions & Trade-offs

---

### Q17. Your `reports-jar` has 88+ report types across 19 tenants. How do you prevent a bug in one tenant's report from affecting others?

**Answer:**

**Package isolation** is the first line of defense. Each tenant's report implementations live in a dedicated sub-package — `com.applicate...papa`, `com.applicate...ckcoe`, `com.applicate...niine`. A bug in `PapaOrdersReport` is contained to that class. It cannot affect `CKCOEOrdersReport` because they don't share state — each `AbstractReport` implementation is a stateless, single-method class.

**`StreamingProvider` isolation.** Each report type has its own provider that fetches data independently. Provider A hitting a slow API doesn't block Provider B — they run in separate task executions, separate Kafka consumer poll cycles, separate threads.

**No shared mutable state.** The `AbstractReport` interface has a single method `run()` with no instance fields — you can't accidentally share state between tenant invocations. The `StreamingCollection` and all generators are created fresh per execution.

**Failure containment in the consumer.** `KafkaReportConsumer` wraps each record in try-catch. A `RuntimeException` in Tenant A's report processing is caught, logged, and the consumer moves to the next record. Tenant B's queued report is not affected.

**The weaker point:** shared library classes like `DuckDBImpl` (used as a cache) and `AppCacheManager` are shared across LOBs. A bug in `DuckDBImpl` that corrupts the cache — like the concurrent LOB cache issue I described earlier — could affect multiple tenants. The mitigation is strict LOB-keyed namespace isolation in cache keys and synchronized write paths. But the honest answer is that shared infrastructure code has higher blast radius than tenant-specific report code, and we test it more carefully.

---

### Q18. JasperReports is in the stack. Where do you use it versus generating Excel with Apache POI? How do you decide which to use?

**Answer:**

**JasperReports** is used for **invoice and document-style PDF reports** — output that has a precise visual layout: logos, address blocks, line items in a table, totals, barcodes. The `JasperManagerUtils` class manipulates `JasperReport` template objects programmatically — adjusting column widths, aligning cells, and configuring `TableComponent` and `StandardColumn` objects at runtime to accommodate dynamic column counts per tenant. The output is pixel-precise, printable PDF.

**Apache POI** is used for **data export Excel files** — flat grids of rows and columns that users will open in Excel and analyze. The report generators (`SimpleXLSXReportGenerator`, multi-sheet variants) use POI's streaming API (`SXSSFWorkbook`) for large datasets, which writes to a temp file incrementally rather than building the whole workbook in memory. POI gives no control over print layout but is trivially flexible for adding/removing columns.

**Decision rule:**
- If the output is going to a printer or is a formal document (invoice, delivery confirmation, compliance report) → JasperReports with a `.jrxml` template.
- If the output is going into Excel for analysis or will be imported into another system → Apache POI.
- If the output is a large analytical dataset (100K+ rows) → POI with `SXSSFWorkbook` streaming, since JasperReports would exhaust memory at that scale.

`JnjXmlReport` (J&J) is an example where neither applies — the output is XML for a specific ERP integration format. That uses plain `DocumentBuilder` / DOM serialization, not a report library at all.

---

### Q19. How do you handle a report that queries multiple data sources — say, MySQL for user data and Clickhouse for transaction data?

**Answer:**

The `AbstractReport.run()` pattern is composable. A report that needs data from two sources instantiates two `StreamingProvider` instances and coordinates between them in the `run()` implementation.

The pattern we use most often is **enrichment**: the primary provider streams transaction records from Clickhouse page by page, and a secondary "lookup" provider fetches user/product metadata from MySQL. The secondary fetch is done via `UserCacheDataProvider` or similar cached services — the MySQL data is loaded into the `AppCacheManager` (10-minute TTL) on first access, so subsequent pages of transactions don't re-query MySQL for the same user records.

For the DuckDB cache layer in `reports-jar`: when both data sources are large and need to be joined, we load one dataset (typically the smaller dimension table from MySQL) into a DuckDB in-memory table, then stream the fact data from Clickhouse and execute the join inside DuckDB using SQL. DuckDB is extremely fast for this pattern — it's an in-process analytical database that supports full SQL joins on in-memory data. This avoids pulling the entire fact table into JVM heap for an application-level join.

The honest limitation: we do this join at the application layer rather than at the database layer. For very large joins, the network cost of streaming data out of Clickhouse into the application is significant. The right long-term answer for complex multi-source reports is a data lakehouse query engine (Trino, Athena) that federates across sources natively. But for our scale, the DuckDB approach is effective and keeps infrastructure simple.

---

### Q20. If a new client (LOB) is onboarded and needs a custom report that doesn't exist yet, what does the end-to-end development and deployment process look like?

**Answer:**

New LOB onboarding follows a deliberate path that keeps the blast radius small.

**Step 1 — Configuration, not code, first.** Before writing any Java, we check if the new report's data requirements can be served by `ApiBasedReport` — the generic report type that pulls from a configurable `DATA_SEARCH_API_URL` with a configurable schema definition (`TABLE_DEFS_API_URL`). A large fraction of new reports fit this pattern: different LOB, different API endpoint, same generation logic. In that case, the "development" is entirely configuration — a new `ReportInfo` record in the database with the right extended attributes. No code, no library release, no deployment.

**Step 2 — New report type if needed.** If the data shape or transformation logic is genuinely unique (like `JnjXmlReport` producing XML for an ERP), we add a new class in `reports-jar` under the LOB's package. The class implements `AbstractReport`, wires a new `StreamingProvider`, and delegates to the appropriate generator.

**Step 3 — Library release.** `mvn deploy` publishes the new version of `reports-jar` to AWS CodeArtifact. The `reports` service's pom is updated to the new version and a new build is triggered via Jenkins. This is a standard deployment — same pipeline, same approval gate.

**Step 4 — LOB-specific database bootstrapping.** `StartupBooster.loadLobOnExternal(lob)` handles dynamic datasource registration, so the new LOB's database connection is provisioned on first request without restarting the service.

**Step 5 — Smoke test per LOB.** We run a test report generation end-to-end in UAT for the new LOB, verify the output file, confirm the task reaches `SUCCESS` status, and download the result. Only then does it go to production.

The design goal was: adding a new LOB should require zero changes to existing code. New tenant = new package in reports-jar, new configuration records, new database credentials in Secrets Manager. Everything else — the task framework, the Kafka pipeline, the download endpoint, the error handling — is shared infrastructure that the new LOB inherits automatically.

---

*Last updated: May 2026 — based on production codebase state*
