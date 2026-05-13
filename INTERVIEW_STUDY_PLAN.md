# 2-Month Interview Preparation Plan
**Target:** MNCs (Amazon, Microsoft, Goldman Sachs) + Indian Product Companies (Razorpay, Zepto, PhonePe, Swiggy, CRED)
**Timeline:** 8 weeks | Weekdays: 4–5 hrs | Weekends: 7–8 hrs
**Starting DSA Level:** Beginner (Easy-comfortable, Medium-struggle)

---

## The Honest Reality Check

For MNCs and top Indian product companies, the interview has 3 pillars:

| Pillar | Weight | Your Current State |
|---|---|---|
| DSA (LeetCode Medium/Hard) | 50% | Biggest gap — must fix first |
| System Design | 30% | Strong project base, needs theory |
| Java / CS Fundamentals + Behavioral | 20% | Already strong from projects |

**The plan is front-loaded on DSA** because it takes the most time to build. System design and Java prep are woven in from Week 3 onwards so you're not cramming at the end.

---

## Weekly Time Budget

| Day | Hours | Focus |
|---|---|---|
| Mon – Fri | 4.5 hrs avg | DSA (2.5 hrs) + Theory/System Design (1.5 hrs) + Review (0.5 hr) |
| Saturday | 7–8 hrs | Heavy DSA + System Design deep dive |
| Sunday | 5–6 hrs | Mock interview + weak spot review + behavioral prep |

---

## Month 1 — DSA Foundation + Core CS

### Week 1: Pattern Recognition + Speed on Easy
**Goal:** Build pattern instincts. Most Medium problems are combinations of Easy patterns. You need to solve Easy problems in under 10 minutes before touching Medium.

**Daily DSA (2.5 hrs):**
- Solve 5 Easy problems per day — timed (10 min each)
- If you can't solve in 10 min: read approach, code it, then re-solve from scratch after 30 min

**Topics:**
- Arrays: prefix sum, two-pointer setup, frequency counting
- Strings: reversal, palindrome, anagram detection
- HashMaps: counting, grouping, two-sum variants

**Problems to do (35 Easy this week):**
```
Arrays/Strings:
- Two Sum (1)
- Best Time to Buy and Sell Stock (121)
- Contains Duplicate (217)
- Maximum Subarray (53) — Kadane's algorithm
- Move Zeroes (283)
- Merge Sorted Array (88)
- Plus One (66)
- Valid Anagram (242)
- Reverse String (344)
- First Unique Character (387)

HashMap:
- Two Sum (1) — revisit with HashMap
- Ransom Note (383)
- Isomorphic Strings (205)
- Word Pattern (290)
- Group Anagrams (49) — first Medium, attempt it
- Top K Frequent Elements (347) — attempt
```

**Theory (1.5 hrs/day):**
- Java Collections deep dive: HashMap internals (hashing, collision, load factor, rehashing), ArrayList vs LinkedList, TreeMap vs HashMap
- Big O notation — practice calculating time/space for everything you write
- Resource: [Java Collections framework — Baeldung](https://www.baeldung.com)

**Weekend:**
- Saturday: Solve 8–10 problems, focus on patterns. Review every problem you couldn't solve.
- Sunday: Write down every pattern you learned this week. Try explaining "Two Sum" solution 3 different ways (brute force, sort+two pointer, HashMap). This is interview explanation practice.

**Target by end of Week 1:** 35 Easy solved, pattern vocabulary built, Big O fluent.

---

### Week 2: Two Pointers + Sliding Window + Binary Search
**Goal:** These three patterns appear in ~30% of all Medium problems. Mastering them unlocks a huge chunk of the Medium list.

**Two Pointers (Mon–Tue):**
```
- Valid Palindrome (125)
- Two Sum II — Sorted Array (167)
- 3Sum (15) ← First real Medium — take time, understand it
- Container With Most Water (11)
- Trapping Rain Water (42) ← Hard but important, understand approach
- Remove Duplicates from Sorted Array (26)
- Squares of a Sorted Array (977)
```

**Sliding Window (Wed–Thu):**
```
- Maximum Average Subarray I (643)
- Longest Substring Without Repeating Characters (3) ← Classic Medium
- Minimum Size Subarray Sum (209)
- Longest Repeating Character Replacement (424)
- Permutation in String (567)
- Find All Anagrams in a String (438)
```

**Binary Search (Fri–Weekend):**
```
- Binary Search (704)
- Search Insert Position (35)
- First Bad Version (278)
- Search a 2D Matrix (74)
- Find Minimum in Rotated Sorted Array (153)
- Search in Rotated Sorted Array (33) ← Must-know Medium
- Koko Eating Bananas (875)
```

**Theory (1.5 hrs/day):**
- DBMS: Indexes (B-Tree, Hash), transactions (ACID), isolation levels, N+1 problem, joins
- SQL: Write 10 medium-complexity queries daily — GROUP BY, subqueries, window functions
- Resource: [SQLZoo](https://sqlzoo.net), [W3Schools SQL](https://w3schools.com/sql)

**Target by end of Week 2:** 50+ problems total, can identify and apply these 3 patterns independently.

---

### Week 3: Linked Lists + Stacks + Queues
**Goal:** These are guaranteed to appear in at least one interview round at almost every company.

**Linked Lists (Mon–Wed):**
```
- Reverse Linked List (206) ← Do iteratively AND recursively
- Merge Two Sorted Lists (21)
- Linked List Cycle (141) — Floyd's algorithm, understand WHY it works
- Linked List Cycle II (142) — find cycle start
- Remove Nth Node From End (19)
- Reorder List (143)
- Find the Duplicate Number (287)
- LRU Cache (146) ← Crucial — HashMap + Doubly Linked List
- Merge k Sorted Lists (23) ← Hard, understand heap approach
```

**Stacks (Thu–Fri):**
```
- Valid Parentheses (20)
- Min Stack (155)
- Evaluate Reverse Polish Notation (150)
- Daily Temperatures (739)
- Car Fleet (853)
- Largest Rectangle in Histogram (84) ← Hard, important
- Next Greater Element I & II (496, 503)
```

**Queues / Deque (Weekend):**
```
- Implement Queue using Stacks (232)
- Sliding Window Maximum (239) ← Deque pattern
- Number of Recent Calls (933)
```

**Theory (1.5 hrs/day):**
- Operating Systems: Processes vs Threads, context switching, deadlocks, mutex vs semaphore, virtual memory
- This maps directly to Java concurrency questions they'll ask about your Kafka multi-threading setup

**Target by end of Week 3:** 85+ problems total. LRU Cache implementation memorized — it comes up constantly.

---

### Week 4: Trees — BFS and DFS
**Goal:** Trees are the most tested data structure in MNC interviews. Binary trees, BSTs, N-ary trees — all variants. Do NOT skip or rush this week.

**Tree Basics + DFS (Mon–Tue):**
```
- Invert Binary Tree (226)
- Maximum Depth of Binary Tree (104)
- Diameter of Binary Tree (543)
- Balanced Binary Tree (110)
- Same Tree (100)
- Subtree of Another Tree (572)
- Path Sum (112)
- Path Sum II (113) — backtracking intro
- Binary Tree Maximum Path Sum (124) ← Hard, must know
- Lowest Common Ancestor of BST (235)
- Lowest Common Ancestor of Binary Tree (236)
```

**BST (Wed):**
```
- Validate Binary Search Tree (98)
- Kth Smallest Element in BST (230)
- Insert into BST (701)
- Delete Node in BST (450)
- Convert Sorted Array to BST (108)
```

**BFS / Level Order (Thu–Fri):**
```
- Binary Tree Level Order Traversal (102) ← Template for all BFS tree problems
- Binary Tree Right Side View (199)
- Average of Levels in Binary Tree (637)
- Maximum Width of Binary Tree (662)
- Word Ladder (127) ← BFS on implicit graph — very important
- Rotting Oranges (994)
- 01 Matrix (542)
```

**Weekend — Trie (prefix tree):**
```
- Implement Trie (208) ← Build from scratch
- Search Suggestions System (1268)
- Word Search II (212)
```

**Theory (1.5 hrs/day):**
- Networking: TCP vs UDP, HTTP vs HTTPS, DNS, REST vs GraphQL, WebSockets
- HTTP status codes, headers, CORS — you already know CORS from your project, now formalize it

**Target by end of Week 4:** 130+ problems total. Can traverse any tree variant and identify when to use BFS vs DFS.

---

## Month 2 — Advanced DSA + System Design + Mock Interviews

### Week 5: Heaps + Greedy
**Goal:** Heaps (Priority Queue in Java) are the backbone of scheduling, top-K, and median problems.

**Heaps (Mon–Wed):**
```
- Kth Largest Element in Array (215)
- K Closest Points to Origin (973)
- Top K Frequent Elements (347) — revisit with heap
- Find Median from Data Stream (295) ← Two heaps pattern — must know
- Task Scheduler (621)
- Design Twitter (355)
- Merge k Sorted Lists (23) — revisit with heap approach
- IPO (502)
- Reorganize String (767)
```

**Greedy (Thu–Weekend):**
```
- Jump Game (55)
- Jump Game II (45)
- Gas Station (134)
- Hand of Straights (846)
- Merge Intervals (56) ← Very frequent in interviews
- Insert Interval (57)
- Non-overlapping Intervals (435)
- Meeting Rooms (252)
- Meeting Rooms II (253) ← Priority queue + greedy
- Partition Labels (763)
```

**System Design — Start NOW (1.5 hrs/day):**
- Watch: Gaurav Sen YouTube — consistent hashing, load balancing, caching
- Read: ByteByteGo newsletter (free tier)
- Study: CAP theorem, eventual consistency, database sharding, read replicas
- **Week 5 Design Practice:** Design a URL Shortener (TinyURL) — write it out fully

---

### Week 6: Dynamic Programming
**Goal:** DP is the hardest topic and the one most candidates skip. Even partial DP knowledge separates you from most candidates at Indian product companies. Start with 1D DP and work up.

**1D DP (Mon–Tue):**
```
- Climbing Stairs (70) ← Start here
- House Robber (198)
- House Robber II (213)
- Longest Palindromic Substring (5)
- Palindromic Substrings (647)
- Decode Ways (91)
- Coin Change (322) ← Classic BFS/DP, very frequent
- Maximum Product Subarray (152)
- Word Break (139)
- Longest Increasing Subsequence (300)
```

**2D DP (Wed–Thu):**
```
- Unique Paths (62)
- Longest Common Subsequence (1143) ← Foundation of edit distance
- Edit Distance (72) ← Hard but very important
- Best Time to Buy/Sell Stock with Cooldown (309)
- Coin Change II (518)
- Target Sum (494)
- Interleaving String (97)
```

**DP on strings / advanced (Fri–Weekend):**
```
- Regular Expression Matching (10) ← Hard
- Burst Balloons (312) ← Hard, interval DP
- Partition Equal Subset Sum (416)
- 0/1 Knapsack — implement from scratch (classic problem, not on LC)
```

**System Design (1.5 hrs/day):**
- Study: Message queues (Kafka, RabbitMQ), pub-sub vs queue
- You built Kafka — now formalize: when to use Kafka vs SQS, partitioning strategy, consumer groups
- **Week 6 Design Practice:** Design WhatsApp / Chat System — write it out fully

---

### Week 7: Graphs + Backtracking
**Goal:** Graphs appear in ~20% of coding rounds. Backtracking is the pattern behind permutations, combinations, and constraint satisfaction problems.

**Graphs — BFS/DFS (Mon–Tue):**
```
- Number of Islands (200) ← Start here — classic
- Clone Graph (133)
- Max Area of Island (695)
- Pacific Atlantic Water Flow (417)
- Surrounded Regions (130)
- Course Schedule (207) ← Topological sort
- Course Schedule II (210)
- Number of Connected Components in Undirected Graph (323)
- Graph Valid Tree (261)
- Redundant Connection (684)
```

**Graphs — Advanced (Wed):**
```
- Network Delay Time (743) ← Dijkstra's algorithm
- Swim in Rising Water (778)
- Alien Dictionary (269) ← Hard, topological sort
- Cheapest Flights Within K Stops (787) ← Bellman-Ford variant
- Word Ladder (127) — revisit if needed
```

**Backtracking (Thu–Weekend):**
```
- Subsets (78)
- Subsets II (90)
- Permutations (46)
- Permutations II (47)
- Combination Sum (39)
- Combination Sum II (40)
- Word Search (79)
- N-Queens (51) ← Classic Hard backtracking
- Sudoku Solver (37)
- Palindrome Partitioning (131)
```

**System Design (1.5 hrs/day):**
- Study: Consistent hashing, CDN, database indexing, NoSQL vs SQL decision
- Study: Rate limiting algorithms (token bucket, leaky bucket, sliding window counter)
- **Week 7 Design Practice:** Design Uber / Ride-sharing — write it out fully
- **Week 7 Design Practice 2:** Design a notification system (you built parts of this!)

---

### Week 8: Mock Interviews + Consolidation
**Goal:** Simulate real interview conditions. Speed, communication, and correctness under pressure.

**Daily Structure:**
- **Morning (2 hrs):** Timed mock — pick 2 random Mediums, set 45-min timer each, no hints, write code on paper first then on screen
- **Afternoon (1.5 hrs):** System design practice — design a new system every day, explain it out loud as if to an interviewer
- **Evening (1 hr):** Java/Spring internals review + behavioral stories

**Mock Problem Sets (do these timed, no looking up):**
```
Week 8 Mock Set A (Medium):
- 3Sum (15), Longest Substring Without Repeating Characters (3),
  Binary Tree Level Order Traversal (102), Number of Islands (200),
  Coin Change (322), Merge Intervals (56)

Week 8 Mock Set B (Medium/Hard):
- Search in Rotated Sorted Array (33), LRU Cache (146),
  Word Ladder (127), Course Schedule (207),
  Longest Increasing Subsequence (300), Find Median from Data Stream (295)

Week 8 Mock Set C (Hard practice):
- Trapping Rain Water (42), Binary Tree Maximum Path Sum (124),
  Merge k Sorted Lists (23), Word Search II (212), N-Queens (51)
```

**System Design Designs to practice (one per day):**
1. Design Twitter feed (newsfeed generation, fan-out)
2. Design Netflix (video streaming, CDN)
3. Design Amazon (search, product catalog, cart, orders)
4. Design a rate limiter (token bucket implementation)
5. Design a distributed cache (you built this — now formalize)

---

## Java & Spring Internals — Weekly Reading (30 min/day every day)

Do this every day, rotating topics. This is your biggest edge over fresh graduates.

### Core Java (Week 1–2)
- HashMap internals: hashing, buckets, collision with chaining, load factor 0.75, resize to 2× — WHY these numbers
- ConcurrentHashMap vs HashMap vs Hashtable — when to use which
- Java Memory Model: heap vs stack, young/old generation, GC types (G1, ZGC)
- `volatile`, `synchronized`, `AtomicInteger` — what each guarantees
- ThreadLocal — you use this in your project for LOB routing, articulate it perfectly
- CompletableFuture vs Future — non-blocking async patterns
- Java 21 virtual threads (Project Loom) — you use this in slake-reporting

### Spring Boot (Week 3–4)
- Spring IoC container — bean lifecycle, `@PostConstruct`, `@PreDestroy`
- `@Transactional` — propagation levels (REQUIRED, REQUIRES_NEW, NESTED), what happens on exception
- Spring Security filter chain — you built JWT filter, explain it at the Spring internals level
- `@Async` and thread pool configuration — `ThreadPoolTaskExecutor`
- Spring Data JPA: N+1 problem (`@EntityGraph`, `JOIN FETCH`), lazy vs eager loading
- `@Cacheable`, `@CacheEvict` — Spring cache abstraction vs your custom `AppCacheManager`

### Distributed Systems Concepts (Week 5–6)
- CAP theorem — which of your systems sacrifices what (reports service is AP)
- Eventual consistency vs strong consistency — when each is acceptable
- Idempotency — you designed this for Kafka task deduplication, articulate it
- Database transactions: 2PC (two-phase commit), saga pattern
- Circuit breaker pattern — you identified this as a gap, explain how you'd add it

### System Design Components (Week 7–8)
- Load balancers: L4 vs L7, sticky sessions, health checks
- Caching strategies: write-through vs write-back vs write-around, cache-aside
- Database sharding: horizontal vs vertical, shard keys, hotspot problem
- Message queues: at-least-once vs exactly-once, dead letter queues
- CDN: edge caching, cache invalidation strategies

---

## Behavioral Preparation — Your Stories (1 hr every Sunday)

Use the STAR method (Situation → Task → Action → Result) for every story. You have better stories than most candidates.

### Stories to prepare (map to your projects):

**"Tell me about a challenging technical problem you solved"**
→ The LRU cache skew OOM bug in slake-reporting (multi-query join memory issue, heap dump analysis, two-part fix)

**"Tell me about a system you designed from scratch"**
→ ChannelKart Reports Service — multi-tenant routing, Kafka async pipeline, 19 LOBs, 88+ report types

**"Tell me about a time you improved system performance"**
→ Offloading PDF generation to Lambda, eliminating Tomcat thread contention, Provisioned Concurrency for cold starts

**"Tell me about a production incident"**
→ LOB cache race condition causing data leak between tenants — diagnosis, root cause, fix

**"Tell me about working with ambiguity / ownership"**
→ Built both projects from scratch with no existing codebase — all architectural decisions were yours

**"Why do you want to leave your current company?"**
→ Prepare a positive, growth-focused answer about wanting to work at a larger scale with more diverse engineering challenges

**"Where do you see yourself in 3 years?"**
→ Deep distributed systems / backend infrastructure work, growing into a senior engineer role

---

## LeetCode Targets Summary

| Week | Easy | Medium | Hard | Total |
|---|---|---|---|---|
| 1 | 35 | 2 | 0 | 37 |
| 2 | 5 | 15 | 1 | 21 |
| 3 | 5 | 14 | 2 | 21 |
| 4 | 3 | 16 | 2 | 21 |
| 5 | 2 | 15 | 2 | 19 |
| 6 | 0 | 12 | 5 | 17 |
| 7 | 0 | 12 | 5 | 17 |
| 8 | 0 | 10 | 5 | 15 |
| **Total** | **50** | **96** | **22** | **~168** |

**Total after 2 months: ~670 problems (500 existing + 168 new), with real Medium/Hard depth**

---

## Resources

### DSA
- **Primary:** [NeetCode 150](https://neetcode.io/practice) — organized by pattern, has video explanations
- **Sheet:** [Striver's A2Z DSA Sheet](https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/) — comprehensive
- **YouTube:** NeetCode channel (best explanations for patterns), Striver (for Indian company context)
- **Practice:** LeetCode — filter by topic, do "Explore" cards for Trees and Dynamic Programming

### System Design
- **Book:** *Designing Data-Intensive Applications* by Martin Kleppmann — read Ch 1–6 at minimum
- **YouTube:** Gaurav Sen (system design playlist), ByteByteGo channel
- **Course:** Grokking the System Design Interview (Educative.io) — worth the cost
- **Free:** [System Design Primer](https://github.com/donnemartin/system-design-primer) on GitHub

### Java/Spring
- **Baeldung.com** — gold standard for Java/Spring deep dives
- **Java Concurrency in Practice** (book) — read Ch 1–5
- **Spring documentation** — official docs for `@Transactional` propagation, Security filter chain

### Mock Interviews
- **Pramp** — free peer-to-peer mock interviews
- **interviewing.io** — anonymous mock interviews with real engineers
- **LeetCode Contest** — every weekend, builds timed problem-solving muscle

---

## Weekly Check-in Template (fill every Sunday night)

```
Week ___ Review:
- Problems solved this week: ___
- Patterns I now understand well: ___
- Patterns I'm still shaky on: ___
- System design topic covered: ___
- Java concept reviewed: ___
- Hardest problem this week: ___
- Confidence level (1–10): ___
- Adjustment for next week: ___
```

---

## Red Flags to Avoid

- **Don't memorize solutions.** If you can't explain why an approach works, an interviewer will expose it in 30 seconds with a follow-up question.
- **Don't skip the "explain your approach first" step.** Always say your approach out loud before coding. Companies care as much about communication as correctness.
- **Don't neglect system design.** Most candidates at MNCs fail on system design, not DSA. Your project experience is a huge advantage — use it.
- **Don't grind random problems.** Follow the topic order in this plan. Pattern recognition beats volume.
- **Don't code on paper at the end.** Practice on a blank editor (no autocomplete) from Week 3 — simulate interview conditions.

---

## End-of-Month-1 Milestone Check

By end of Week 4 you should be able to:
- [ ] Solve any Easy problem in under 10 minutes
- [ ] Solve ~60% of Mediums independently (with time)
- [ ] Implement: two-pointer, sliding window, binary search, BFS, DFS from memory
- [ ] Build a linked list with cycle detection from scratch
- [ ] Explain HashMap internals, Java GC, ThreadLocal in an interview

If you're not here, extend Month 1 patterns into Week 5 before moving to DP and Graphs.

## End-of-Month-2 Milestone Check

By end of Week 8 you should be able to:
- [ ] Solve 70–75% of Mediums within 25–30 minutes
- [ ] Attempt and partially solve most Hard problems
- [ ] Design any standard system (Twitter, WhatsApp, Uber, Rate Limiter) in 45 minutes
- [ ] Explain your own projects in technical depth for 20+ minutes
- [ ] Tell 6 behavioral stories with STAR structure fluently
- [ ] Pass a timed mock interview (2 Medium problems, 45 min each)

---

*Start applying after Week 8. Apply in batches — 10–15 companies per week, not all at once. Target companies where your backend + distributed systems background is a direct fit (fintech, logistics, e-commerce platforms). Your projects are production-grade — that's rare for someone at your experience level.*
