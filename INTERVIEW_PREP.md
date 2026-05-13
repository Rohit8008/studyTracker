# Interview Preparation — Reports & Reports-JAR Projects

**Projects:** `reports` (Spring Boot REST service) · `reports-jar` (shared library)  
**Role:** Owner, built from scratch to production  
**Stack:** Java 11, Spring Boot 2.5, MySQL, Kafka, Redis, EHCache, AWS (S3, Lambda, Secrets Manager, CodeArtifact), Elasticsearch, Clickhouse, Redshift

---

## Architecture & Design

---

### Q1. Why did you choose a monolithic architecture over microservices? What trade-offs did you consciously make?

**Answer:**

The decision came down to team size, delivery speed, and the nature of the domain. We were a small team building a platform that needed to go live fast and evolve quickly — microservices would have added significant operational overhead (service discovery, distributed tracing, network latency, independent deployments) before we even had a stable domain model.

The reports domain is inherently data-heavy and query-driven. Breaking it into microservices early would have meant either accepting a lot of distributed joins across service boundaries or duplicating data, both of which hurt correctness and performance. A monolith let us share the JPA entity model, the multi-tenant routing layer, and the caching infrastructure without network hops.

The trade-offs I consciously accepted were:
- **Deployment coupling** — any change requires redeploying the whole service. We mitigated this with a robust CI/CD pipeline through Jenkins and thorough pre-deploy testing.
- **Scaling granularity** — you can't scale just the report-generation workload independently. We handled this by offloading heavy PDF generation to an AWS Lambda function, so compute-intensive work didn't compete with API threads.
- **Organizational coupling risk** — as team grows, multiple people working in one codebase creates merge conflicts. We addressed this partly by extracting `reports-jar` as a separate shared library consumed via AWS CodeArtifact, which gave us a clear boundary between core report logic and the host service.

If I were starting today with a larger team, I'd extract the async report execution as a separate worker service since that's the workload with the most independent scaling needs.

---

### Q2. Explain the multi-tenant data source routing. How does `CustomRoutingDataSource` decide which database to connect to? What happens if the routing key is missing?

**Answer:**

`CustomRoutingDataSource` extends Spring's `AbstractRoutingDataSource`. The core method is `determineCurrentLookupKey()`, which returns the routing key that Spring uses to select the active `DataSource` from a map of pre-configured connections.

The routing key is the **LOB (Line of Business)** identifier — extracted from the security context via `SecurityContextUtils.getLob()`. Every authenticated request carries the LOB in the JWT claims, so by the time a request reaches the data layer, the LOB is already set in the thread-local security context.

There's an additional override: if `SecurityContextUtils.getDBPrivilege()` returns a value, the key becomes `DatabaseProfileRegistry.getDBPrivilegeName(lob, dbPrivilege)` instead of the plain LOB. This lets certain users or roles connect to read replicas or reporting-specific databases without changing any business logic.

**If the routing key is missing:** the system falls back to `AbstractDataSourceConstants.DEFAULT`. There's also a dynamic load path — if the LOB key isn't already registered in `DatabaseProfileRegistry.getDataSourceHashMap()`, it calls `StartupBooster.loadLobOnExternal(lob)` to bootstrap that tenant's connection on demand. This handles scenarios where a new tenant is provisioned without a service restart.

The beauty of this approach is that all the multi-tenancy is handled at the infrastructure layer. Services and repositories are completely unaware of which database they're talking to — they just run queries and the routing happens transparently underneath.

---

### Q3. `reports-jar` is a shared library on AWS CodeArtifact. How do you version and release it without breaking consumers? What was your strategy for breaking changes?

**Answer:**

The library is published to our CodeArtifact repository at `salescode-008136251604.d.codeartifact.ap-south-1.amazonaws.com/maven/reportsjar/`. Consumers pull it via a standard Maven dependency declaration, with the CodeArtifact token injected by the CI environment.

Our versioning strategy was pragmatic — for stable releases we used explicit version tags in the pom, and consumer services pinned to a specific version, not `LATEST`. This gave us isolation: a breaking change in the library wouldn't silently break a production service on next build.

For breaking changes specifically — say, adding a required method to `AbstractReport` or changing `StreamingProvider`'s `nextStream` signature — the protocol was:
1. Add the new method with a default implementation first (backward-compatible), deploy the library.
2. Migrate all consumers to the new method on their own schedule.
3. Only then remove the old method in a subsequent version once no consumer references it.

For purely additive changes (new report types, new utility methods), we bumped a minor version and consumers could upgrade at will. The fact that report types are isolated by tenant package (e.g., `com.applicate...papa`, `com.applicate...ckcoe`) meant adding a new tenant's reports never touched existing code paths — zero risk of regression for other consumers.

The honest limitation is that we didn't have automated consumer-compatibility tests in the pipeline. That's something I'd add now — publishing the library artifact and then running each consumer's test suite against it before marking a release green.

---

### Q4. You have 75 services in this application. How did you prevent service-to-service coupling from becoming a mess?

**Answer:**

A few structural decisions kept this manageable.

First, we enforced a strict **layering discipline**: Controllers only call Services, Services call Repositories or other Services — never the reverse, and never a Controller calling a Repository directly. Spring's component model makes this easy to enforce visually in code review.

Second, we separated **cross-cutting concerns** into dedicated infrastructure classes. Logging goes through `LoggingInterceptor` and `LoggingUtil`. Caching is abstracted behind `AppCacheManager`. AWS interactions go through dedicated wrappers like `AwsSecretsManager`. No service should be importing AWS SDK classes directly — they import the wrapper. This means if we swap an AWS service, we change one class.

Third, the **`reports-jar` extraction** was the most impactful structural decision. All report generation logic — the 88-plus report types, the `StreamingProvider` implementations, the generator framework — lives in a separate library with its own release cycle. The host `reports` service is primarily orchestration: receive the request, load config, call the right `AbstractReport.run()`, persist the result. This boundary prevented report-specific business logic from bleeding into infrastructure code.

Where coupling did creep in was in the `QueryExecuter` service, which ended up knowing too much about too many data sources (MySQL, Clickhouse, Redshift). If I were doing it again, I'd build a cleaner query-router abstraction there earlier.

---

## Performance & Scalability

---

### Q5. You use both EHCache and Redis. What's cached in each and why two layers? How do you handle cache invalidation?

**Answer:**

The layering was driven by access patterns and data lifetime.

**EHCache (local in-process)** is managed through our `AppCacheManager` singleton. It maintains per-LOB cache instances with a **10-minute TTL** based on creation time (`CreatedExpiryPolicy`). This layer holds frequently-read metadata that doesn't change often — things like report configurations, registry data, and user hierarchy lookups. The key insight is that this data is read on virtually every request, so a local in-process cache eliminates a network round-trip to Redis entirely for the hot path. Cache keys follow the format `cacheDomain:key`, and null values are stored as a sentinel `NULL_OBJECT` to prevent cache-miss stampedes on genuinely null data.

**Redis via Redisson** handles data that needs to be shared across instances — session-level state, distributed locks, and data that one instance might write and another instance needs to read. The EHCache is per-JVM, so it can't serve cross-instance coordination.

**Invalidation** is the hard part. For EHCache, we have a `DistributedCache.publishChangeEvent()` mechanism — when data changes in one instance, it publishes an invalidation signal that other instances can subscribe to and flush their local cache entries. For Redis, TTL-based expiry handles most cases; for critical data we do explicit key deletion on write. We also expose a cache-clear endpoint protected behind `SUPER_ADMIN` role for operational needs when something goes stale in production.

---

### Q6. How does the `StreamingProvider` pattern in `reports-jar` handle memory pressure? What happens when a downstream API is slow mid-stream?

**Answer:**

`StreamingProvider` is an interface with the key method `nextStream(long offset, int count)` — it fetches data in pages rather than loading an entire dataset into memory. The `StreamingCollection` wrapper drives pagination: it calls `nextStream` repeatedly, processes each page, and releases it before fetching the next. The dataset at any point in memory is bounded by the page size, not the total report size. This is critical for reports that can span hundreds of thousands of rows.

The `forceFetchNextStream` flag on `AbstractStreamingProvider` gives the generator control — if processing of a page fails partway through, it can signal the collection to retry the same offset rather than advancing. `updateStatus()` and `clearStatus()` hooks allow progress tracking, which feeds into the task management layer so users can see percentage completion in the UI.

**For a slow downstream API:** the max poll interval on the Kafka consumer is set to 10 minutes (`MAX_POLL_INTERVAL_MS = 600000`), which gives long-running report generations time to complete without being evicted from the consumer group. At the HTTP level, we rely on API-specific timeouts in the `RestTemplate` configuration. If the upstream API times out mid-stream, the `StreamingProvider` throws an exception, which gets wrapped in a `CustomRuntimeException` by the `AbstractReport.run()` method, the task is marked failed, and the user gets an error notification. We don't do partial report delivery — it's all-or-nothing to avoid confusing users with incomplete data.

---

### Q7. Tomcat is configured for 800 max threads. How did you arrive at that number? Have you ever hit thread exhaustion?

**Answer:**

The 800 number came from load testing and capacity modeling. The formula we used was roughly: `max_threads = (expected_concurrent_users × avg_request_duration_ms) / 1000`. Our peak concurrent users were in the hundreds, and most API requests complete in under 200ms, but report generation tasks can take 30–60 seconds. The async task model (reports run as background tasks, not blocking HTTP threads) meant most threads are freed quickly — the long-running work is handed off to the Kafka consumer layer.

We did hit thread exhaustion once in production during a batch where multiple LOBs triggered large report generations simultaneously. The symptom was requests queuing up and eventually timing out at the load balancer. The diagnosis was straightforward — thread pool metrics via Spring Actuator showed the pool saturated. The fix was two-pronged: we added a concurrency limit at the report scheduling layer so only N reports per LOB can run simultaneously, and we bumped the thread pool to 800 from the previous value to give more headroom.

Going forward, the right fix is exposing Tomcat thread pool metrics via OpenTelemetry to alert before saturation rather than discovering it from user complaints.

---

### Q8. You have Clickhouse, Redshift, MySQL, and Elasticsearch all in the same app. How do you decide which store to query for a given report?

**Answer:**

Each store has a distinct role based on data characteristics and query type:

- **MySQL** is the operational store — transactional data, entity relationships, user and configuration records. Any report that needs consistent, real-time transactional data queries MySQL.
- **Clickhouse** is for high-volume analytical aggregations. When a report needs to scan millions of order rows and compute aggregates fast, Clickhouse handles it orders of magnitude faster than MySQL for that pattern.
- **Redshift** handles historical warehouse queries — longer time horizons, cross-LOB aggregations, data that's been ETL'd and transformed. Reports that look back 6–12 months typically hit Redshift.
- **Elasticsearch** is used for log-based and event-based reports — anything that's derived from structured log data or needs full-text search patterns.

The `ReportInfo` configuration (loaded from the database per report type) specifies which data source the `StreamingProvider` should use. So the selection logic isn't hardcoded in business logic — it's metadata-driven. Adding a new report that queries Clickhouse means configuring the right provider class in `ReportInfo`, not changing application code. The `CustomRoutingDataSource` handles the MySQL multi-tenancy, while the other stores have their own connection configurations per LOB.

---

## Security

---

### Q9. Walk me through the authentication flow — JWT, SAML2, and BCrypt. Which endpoints use which?

**Answer:**

The primary authentication mechanism is **JWT via `JWTTokenFilter`**, which extends `OncePerRequestFilter` and sits before `UsernamePasswordAuthenticationFilter` in the Spring Security chain.

The flow:
1. Client sends a request with the JWT in the `Authorization` header (or as an `access_token` query param).
2. `JWTTokenFilter` strips the "Bearer " prefix and extracts the raw token.
3. The token is validated by calling an external validation endpoint: `https://{baseUrl}/token?access_token={token}&api-key={apiKey}`. This is intentional — token validation is delegated to the auth service rather than done locally, which means revoking a token takes effect immediately without waiting for expiry.
4. The token claims — including `lob`, `outletCode`, `deviceId`, `source` — are extracted and stored in the `SecurityContext`.
5. If token validation fails, the request is rejected with 401.

The JWT secret itself is stored in **AWS Secrets Manager** and is versioned. The token embeds the secret version in its claims. On validation, the service fetches the specific secret version used to sign the token, which allows secret rotation without invalidating all existing tokens — old tokens are verified with the old key version until they naturally expire.

**BCrypt** is used for password hashing in the credential store — it's used when a user authenticates to get the JWT in the first place, not on subsequent API calls.

Regarding SAML2 — it's in the dependency list as a capability but the primary deployed flow is JWT. The architecture supports SAML for enterprise SSO integration, but I won't overstate its current usage.

Sessions are **stateless** (`SessionCreationPolicy.STATELESS`) — no server-side session state at all. The JWT carries all context.

---

### Q10. How do you prevent one tenant's data from leaking to another? Where is enforcement — application layer, DB layer, or both?

**Answer:**

Defense in depth — enforcement at multiple layers.

**At the DB layer:** `CustomRoutingDataSource` ensures that every query executes against the correct tenant's database connection. Tenants are physically separated into different database schemas or instances depending on their tier. A request for LOB "kbpl" literally cannot reach the "moon" schema because the JDBC connection it gets is scoped to kbpl's database.

**At the application layer:** `SecurityContextUtils.getLob()` is the single source of truth for which tenant the current request belongs to. This is set from validated JWT claims — a user cannot claim a different LOB by manipulating the request because the LOB comes from the signed, server-validated token. Every service method that fetches data passes the LOB implicitly through the routing context.

**At the API layer:** for the shared `reports-jar` library's API-based providers, the `x-tenant-id` header is explicitly set on every downstream HTTP call using the LOB from `ReportInfo`. So even when calling shared microservices, the tenant boundary is re-asserted at the HTTP level.

The weakest link is always the application layer — a bug where you accidentally use the wrong LOB variable. We mitigated this by making LOB a thread-local concern managed by the framework (security context), not something passed as a parameter through every method call. This means you can't "forget" to pass the tenant ID — it's always there implicitly.

---

### Q11. AWS Secrets Manager is in the stack. What do you store there, and how do you rotate secrets without restarting the service?

**Answer:**

We store three categories of secrets in Secrets Manager:

1. **JWT signing secret** — the HMAC-SHA512 key used to sign tokens.
2. **Database credentials** — per-LOB DB passwords, so they're not in application properties.
3. **Third-party API keys** — integration credentials for external services.

The rotation-without-restart design is the interesting part. For JWT specifically: the `JWTUtil` class stores the secret version ID in the JWT claims under a `"version"` key. When validating a token, it calls `AwsSecretsManager.getSecretByVersion(secretName, versionId)` — so it retrieves the *specific version* of the secret that was used to sign the token, not necessarily the latest. This means:

- Old tokens issued with version V1 are still valid while they exist — verified with V1.
- New tokens are issued with V2 (the rotated key).
- No user is logged out, no service restart needed.
- V1 becomes invalid only when all tokens signed with it have naturally expired.

The `AwsSecretsManager` class caches secrets in-memory with expiration (`SecretCache` with a cache domain `"aws_secret"`). The cache key is `{lob}_{secretName}`. When the cache entry expires, the next access fetches the latest version from Secrets Manager automatically — so credential rotations propagate within the cache TTL window with zero manual intervention.

---

## Reliability & Observability

---

### Q12. Walk me through what happens when a report request fails in production — how do you trace it?

**Answer:**

Every request gets a UUID assigned by `LoggingInterceptor` at entry — stored as `requestId` in the request attributes and included in every log line for that request's thread. This is the anchor for any investigation.

When a report task fails:

1. **The `LoggingInterceptor`** logs the incoming request with method, URI, client IP, user agent, and the `requestId`. Sensitive headers (Authorization, token, password) are masked as `***MASKED***`.
2. **The service layer** uses `LoggingUtil.logServiceCall()` and `logDbOperation()` for structured log entries at each key step.
3. **Kafka consumer failure** in `KafkaReportConsumer` catches the exception, calls `ReportLogger.logReportFailed()` with the error message, and commits the offset to avoid replaying a known-bad message.
4. **`LoggingInterceptor.afterCompletion()`** records the HTTP status code and total duration in milliseconds.

All these logs are shipped to **Elasticsearch**. In production, I go to Kibana, filter by `requestId` or `taskId`, and get the full execution trace in chronological order — which LOB was involved, which report type, what query was executed, and at what point the exception occurred.

For distributed tracing, `JWTTokenFilter.doFilterInternal()` is instrumented with `@WithSpan` (OpenTelemetry) to create a root span for each request. The gap in our observability is that internal service calls aren't all instrumented with child spans — that's an area I'd expand if the system needed deeper performance profiling.

---

### Q13. Spring Retry is in your stack. What do you retry, and how do you avoid retrying non-idempotent calls?

**Answer:**

Honest answer: Spring Retry is declared as a dependency, and the infrastructure to use it is in place, but we haven't applied `@Retryable` annotations broadly across the codebase. The retry logic that exists is manual — in the Kafka consumer, failed record processing is caught, logged, and the offset is committed so we don't reattempt the same message indefinitely and block the consumer.

The one place where retry semantics matter most is outbound HTTP calls to third-party integrations. For those, we handle it through the `IntegrationThrottler` — a queue-based mechanism using `ArrayBlockingQueue` — which controls the rate at which integration calls are dispatched, reducing failure probability from rate-limiting on the downstream side.

If I were to add `@Retryable` going forward, the rule I'd apply is: only retry idempotent operations — GET requests, read-only DB queries, S3 object fetches. For write operations (creating an order, posting a payment), I would never retry automatically without verifying idempotency guarantees from the downstream API. We already tag our internal report generation as idempotent (given the same `taskId`, re-running produces the same output file) so that's a safe candidate for retry with exponential backoff.

---

### Q14. Kafka is used for messaging. What delivery guarantees do you rely on, and how do you handle duplicate messages?

**Answer:**

Our Kafka consumer uses **at-least-once delivery**. The configuration is: `ENABLE_AUTO_COMMIT = false` (manual offset commit), `AUTO_OFFSET_RESET = earliest`. Offsets are committed via `consumer.commitAsync()` *after* processing the record — so if the process dies mid-processing, the message will be redelivered on restart.

This means duplicates are possible. Our handling:

1. **Report tasks are idempotent by design.** Each task carries a unique `taskId`. If `KafkaReportConsumer` receives the same task twice, the second run checks whether a report file already exists for that `taskId` before regenerating. If the file is there, it updates the task status to completed and skips generation. This is the primary duplicate defense.

2. **Producer-side deduplication** is limited — `ACKS = "1"` (leader acknowledgment only) means we don't guarantee exactly-once at the producer level. For idempotent producers, we'd need `enable.idempotence=true` and `ACKS=all`, which we didn't enable because the throughput trade-off wasn't worth it for async report tasks.

3. **Max poll interval** is 10 minutes. This is deliberately generous because report generation can be slow. A consumer that looks "hung" because it's generating a large report shouldn't be kicked out of the consumer group and cause a rebalance.

For truly critical financial operations where duplicate processing would cause real harm, I'd recommend exactly-once semantics with Kafka transactions. For report generation, idempotent task processing is the right trade-off.

---

## Cloud & Infra

---

### Q15. PDF generation delegates to AWS Lambda. Why offload to Lambda instead of in-process? What are the cold-start implications?

**Answer:**

PDF generation using iText (HTML-to-PDF conversion) is CPU and memory intensive. Running it in-process inside the main Spring Boot service would mean a handful of simultaneous PDF requests could saturate the JVM heap and compete with API threads for CPU. Offloading to Lambda gives us:

- **Elastic compute:** Lambda scales to handle N concurrent PDF jobs without affecting the report API's response time.
- **Memory isolation:** A memory-hungry PDF job can't OOM-kill the main service.
- **Cost model:** We pay per invocation rather than running large instances 24/7.

The Lambda ARN is environment-specific — UAT hits `arn:aws:lambda:ap-south-1:240754906059:function:PDFGenerator`, production hits the `008136251604` account. The payload is simple: `{"html": "<full html content>"}`. Lambda returns a JSON response with a base64-encoded PDF body. `HtmlToPdfConverter` decodes it and either streams it to the caller or writes it to S3.

**Cold starts:** this is the real trade-off. Lambda cold starts in Java can be 2–5 seconds, which is painful for user-facing synchronous requests. We mitigated this in two ways: PDF reports are almost always triggered asynchronously (the user requests a report, gets a task ID, and polls for completion), so a cold-start adds latency to a background job, not a foreground interaction. For production, we use Provisioned Concurrency on the Lambda to keep instances warm during business hours, which eliminates the cold-start problem for peak usage.

---

### Q16. You support both AWS S3 and Azure Blob Storage. How did you abstract the two?

**Answer:**

The abstraction lives in the `cloud-provider` library (version 1.0.5 in the pom), which we built as a separate dependency. It exposes a `CloudStorageProvider` interface with methods like `upload(String path, byte[] data)`, `download(String path)`, and `generatePresignedUrl(String path, Duration expiry)`. The `reports` service and `reports-jar` only import and call this interface.

Underneath, there are two implementations: `S3StorageProvider` (AWS SDK v2) and `AzureBlobStorageProvider` (Azure Storage SDK v12). The active implementation is selected at startup based on the `channelkart.cloud.provider` configuration property, injected via Spring's `@ConditionalOnProperty`. The `ProfileRegistry` carries the per-LOB cloud configuration, so theoretically different LOBs can use different cloud providers — which matters because some of our international tenants (like the Bepensa LOB in Mexico) have data residency requirements that steer them toward Azure.

The practical result is that when we added Azure support, we wrote the new `AzureBlobStorageProvider`, registered it in the configuration, and zero lines of business logic changed. The report generators just call `cloudProvider.upload(...)` — they don't know or care which cloud it lands on.

---

### Q17. How is the application deployed to production? What does the Jenkins pipeline look like?

**Answer:**

The deployment pipeline goes through Jenkins. At a high level:

1. **Build stage:** `mvn clean package` compiles the application and runs unit tests. The artifact is a fat JAR (Spring Boot executable).
2. **Static analysis:** Sonar scan (we have Sonar fix commits in the history). Any new critical issues block the pipeline.
3. **Artifact upload:** The JAR is pushed to a deployment store (S3 bucket or Nexus depending on environment).
4. **Deploy to staging/UAT:** The JAR is deployed to the UAT environment. This uses environment-specific `application.properties` with UAT database connections, the UAT Lambda ARN, and UAT Kafka brokers.
5. **Smoke tests:** A set of integration tests hit the deployed UAT service to verify critical paths — auth, basic report generation, Kafka consumer health.
6. **Manual approval gate:** Before production deploy, there's a manual approval step in Jenkins. A human reviews the staging test results before promoting.
7. **Production deploy:** Same artifact promoted to production with prod configuration. No code changes between UAT and prod — only configuration differs.

For `reports-jar`, the pipeline is separate: `mvn deploy` publishes the JAR to AWS CodeArtifact, and consumer services pick up the new version on their next build when the pom version is bumped.

Post-deploy, we monitor the Elasticsearch dashboard and Spring Actuator health endpoints (`/actuator/health`). The Actuator endpoints are locked to `SUPER_ADMIN` role so they're not exposed publicly.

---

## Ownership & Judgment

---

### Q18. You built this from scratch. What's the one architectural decision you'd make differently today?

**Answer:**

Separating async report execution into an independent worker service from day one.

Right now, the Kafka consumer that processes report tasks runs inside the same Spring Boot application as the REST API. This means a surge in report generation work — CPU-intensive Clickhouse queries, large Excel file generation, Lambda PDF calls — can affect API response times even though they're on different threads. The Tomcat thread pool exhaustion incident we had was a direct symptom of this.

The right architecture would be: the API service accepts report requests, validates them, writes to Kafka, and returns immediately. A separate worker service consumes from Kafka, runs the report, and writes the result to S3. The two services scale independently — the API scales based on request rate, the worker scales based on queue depth.

This also would have made `reports-jar` integration cleaner — the library would be a dependency of the worker only, not mixed into the same deployment as the API surface. The reason I didn't do it initially was team size and infrastructure simplicity: one service to deploy and monitor is genuinely easier when you're a small team proving the concept. But at production scale with multiple LOBs running reports simultaneously, the coupling has become a real constraint.

---

### Q19. What was the hardest production bug you've had to debug on this system?

**Answer:**

The hardest one was a data leak that wasn't a security vulnerability — it was a cache isolation bug between LOBs.

The symptom: users from LOB "kbpl" were occasionally seeing report configurations meant for LOB "ckcoe". The error was intermittent and couldn't be reproduced on demand, which made it maddening.

Root cause: the `AppCacheManager` uses a `Map<String, Cache<String, Object>>` keyed by LOB. In one code path, when a cache miss occurred and the LOB was being looked up, there was a race condition between two threads from different LOBs. Thread A (LOB kbpl) would call `withCache(cacheDomain, key, computeFunction)` — check the map, not find kbpl's cache, start creating it. Thread B (LOB ckcoe) would do the same simultaneously. Due to non-atomic check-then-act, one thread would store its result under the wrong key in the map.

The fix was making the cache map creation synchronized at the LOB level — using `computeIfAbsent` on a `ConcurrentHashMap` with an atomic compute function, ensuring the cache for a given LOB is created exactly once even under concurrent access.

Finding it required: correlating request IDs in Elasticsearch across LOBs in the same time window, comparing the LOB in the JWT claims against the LOB in the cached data being returned, and then adding thread-state logging to reproduce it under artificial concurrent load in staging. Total time from symptom to fix was about two days. It reinforced for me that multi-tenancy bugs are the most critical class of bug in a shared-infrastructure system.

---

### Q20. The codebase has Groovy for dynamic scripting. What problem does it solve, and what risks did you take on?

**Answer:**

Groovy is included as a dependency to support **dynamic query and transformation scripts** — configuration-driven business logic that can be changed without redeploying the application. The use case is: a report's data transformation rules (how raw rows are mapped to output columns, what calculations are applied) can be expressed as a Groovy script stored in the database or configuration, evaluated at runtime by the `QueryExecuter` service.

This is genuinely powerful for a platform serving 19-plus LOBs with diverse reporting requirements. Rather than writing a Java class for every variation of "calculate incentive based on custom formula," a business analyst can update a script in the admin UI.

The risks I consciously accepted:

1. **Security:** Groovy script execution is essentially `eval()`. If untrusted input reaches the script engine, it's remote code execution. We mitigate this by restricting who can modify scripts (admin role only), and by using Groovy's `CompilerConfiguration` with a `SecureASTCustomizer` to whitelist allowable operations — no file I/O, no reflection, no `System.exit()`.

2. **Performance:** Groovy script compilation has overhead. We cache compiled `Script` objects by their content hash so recompilation only happens when the script actually changes.

3. **Debuggability:** When a Groovy script has a bug, the stack trace is less intuitive than Java. We wrapped script execution with structured logging that captures the script content and input context on failure, so production errors are diagnosable without needing to reproduce them locally.

The honest maintenance risk is that Groovy scripting logic lives outside version control if scripts are stored in the database. I'd recommend — and have started pushing for — storing scripts in a Git-backed configuration repository so changes are auditable and reversible.

---

*Last updated: May 2026 — based on production codebase state*
