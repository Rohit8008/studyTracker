# Daily Interview Prep Checklist — 56 Days
**Target:** MNCs + Indian Product Companies | **Start DSA Level:** Beginner
**Weekdays:** 4–5 hrs | **Saturdays:** 7–8 hrs | **Sundays:** 5–6 hrs

> **How to use this:** Check off each box as you complete it. Never move to the next day without finishing the DSA problems — but it's okay to look at the approach after 25 min of genuine struggle, then code it yourself.

**Companion files:**
- [SOLVED_PROBLEMS.md](SOLVED_PROBLEMS.md) — log every problem you solve (date, pattern, time, notes)
- [DSA_NOTES.md](DSA_NOTES.md) — pattern templates and key insights for revision

---

## Daily Progress Log

| Day | Date | DSA Done | Theory | Review | Problems Solved | Notes |
|-----|------|----------|--------|--------|-----------------|-------|
| Day 1 | 2026-05-13 | ✅ 5/5 | ⬜ | ⬜ | 5 | Two Sum, Buy/Sell Stock, Contains Duplicate, Valid Anagram, First Unique Char |
| Day 2 | | ⬜ | ⬜ | ⬜ | | |
| Day 3 | | ⬜ | ⬜ | ⬜ | | |
| Day 4 | | ⬜ | ⬜ | ⬜ | | |
| Day 5 | | ⬜ | ⬜ | ⬜ | | |
| Day 6 | | ⬜ | ⬜ | ⬜ | | |
| Day 7 | | ⬜ | ⬜ | ⬜ | | |

> Update this table each day. Fill the date, check DSA/Theory/Review, count problems, add a quick note.

---

## WEEK 1 — Pattern Recognition + Arrays + HashMaps
**Theme:** Build speed on Easy. Every Medium is a combination of Easy patterns. This week is about instinct, not difficulty.

---

### Day 1 — Monday | Arrays + HashMap Intro
**DSA (2.5 hrs)**
- [x] [1] Two Sum — solve with brute force first, then HashMap
- [x] [121] Best Time to Buy and Sell Stock
- [x] [217] Contains Duplicate
- [x] [242] Valid Anagram — sort approach, then HashMap approach
- [x] [387] First Unique Character in a String

**After each problem, write:**
- [ ] Time complexity
- [ ] Space complexity
- [ ] One-line pattern summary

**Theory (1.5 hrs)**
- [ ] Read: How Java HashMap works internally (hashing, buckets, chaining)
- [ ] Read: What happens when load factor exceeds 0.75
- [ ] Write down: What is the difference between HashMap, LinkedHashMap, TreeMap

**Review (0.5 hr)**
- [ ] Re-read your solutions from today — could you make any cleaner?
- [ ] Note: which problem felt hardest and why

---

### Day 2 — Tuesday | Arrays Continued
**DSA (2.5 hrs)**
- [ ] [53] Maximum Subarray — learn Kadane's Algorithm
- [ ] [283] Move Zeroes
- [ ] [88] Merge Sorted Array
- [ ] [66] Plus One
- [ ] [344] Reverse String

**Theory (1.5 hrs)**
- [ ] Read: Big O notation — O(1), O(n), O(n²), O(log n), O(n log n)
- [ ] Practice: Calculate time and space complexity for all 5 problems you solved today
- [ ] Read: ArrayList vs LinkedList — when to use which in Java

**Review (0.5 hr)**
- [ ] Kadane's Algorithm — write it from memory on paper
- [ ] Can you explain it without looking at notes?

---

### Day 3 — Wednesday | Strings + HashMap Patterns
**DSA (2.5 hrs)**
- [ ] [383] Ransom Note
- [ ] [205] Isomorphic Strings
- [ ] [290] Word Pattern
- [ ] [9] Palindrome Number (no string conversion)
- [ ] [14] Longest Common Prefix

**Theory (1.5 hrs)**
- [ ] Read: Java String immutability — why Strings are immutable, StringBuffer vs StringBuilder
- [ ] Read: char vs Character in Java, ASCII values of 'a'–'z' (97–122)
- [ ] Practice: Write a method to check if two strings are anagrams — 3 different ways

**Review (0.5 hr)**
- [ ] Isomorphic Strings — can you explain the bijection concept clearly?

---

### Day 4 — Thursday | Array Tricks
**DSA (2.5 hrs)**
- [ ] [125] Valid Palindrome
- [ ] [13] Roman to Integer
- [ ] [448] Find All Numbers Disappeared in an Array — index marking trick
- [ ] [136] Single Number — XOR trick
- [ ] [350] Intersection of Two Arrays II

**Theory (1.5 hrs)**
- [ ] Read: Java Arrays.sort() — what algorithm does it use (Dual-Pivot QuickSort for primitives, TimSort for objects)
- [ ] Read: When to use int[] vs Integer[] vs ArrayList<Integer> — memory implications
- [ ] SQL: Write 5 GROUP BY queries with HAVING clause

**Review (0.5 hr)**
- [ ] XOR trick — explain why a XOR a = 0 and a XOR 0 = a
- [ ] Index marking trick from problem 448 — write it from memory

---

### Day 5 — Friday | First Mediums
**DSA (2.5 hrs)**
- [ ] [49] Group Anagrams ← First real Medium — take 25 min, then look if stuck
- [ ] [347] Top K Frequent Elements ← Medium — HashMap + sort approach
- [ ] [70] Climbing Stairs — notice it's Fibonacci
- [ ] [169] Majority Element — Boyer-Moore voting
- [ ] [268] Missing Number — Gauss formula OR XOR

**Theory (1.5 hrs)**
- [ ] Read: Java PriorityQueue (Min-Heap) — how to use it, how to reverse for Max-Heap
- [ ] Read: Comparable vs Comparator in Java
- [ ] Read: lambda expressions for custom sorting: `list.sort((a, b) -> a - b)`

**Review (0.5 hr)**
- [ ] Group Anagrams — could you solve it in one pass?
- [ ] Top K Frequent — note: can also solve with bucket sort in O(n)

---

### Day 6 — Saturday | Consolidation + Extra Problems
**DSA (4 hrs)**
- [ ] [167] Two Sum II — Sorted Array (preview next week's two-pointer)
- [ ] [26] Remove Duplicates from Sorted Array
- [ ] [118] Pascal's Triangle
- [ ] [121] Best Time to Buy/Sell Stock — solve again from memory (no peeking)
- [ ] [438] Find All Anagrams in a String ← Medium — sliding window preview
- [ ] [567] Permutation in String ← Medium — sliding window preview
- [ ] Revisit any problem from this week you found hard — re-solve it

**System Design Intro (2 hrs)**
- [ ] Watch: Gaurav Sen — "Introduction to System Design" (YouTube)
- [ ] Read: What is a Load Balancer — L4 vs L7, round robin vs least connections
- [ ] Write: 5 things you'd consider when designing any system

**Review (1 hr)**
- [ ] Week 1 problem count: ___ (target: 35+)
- [ ] List every pattern you learned this week
- [ ] Which 2 problems will you re-solve next week as warm-up?

---

### Day 7 — Sunday | Review + Behavioral
**Mock Practice (2 hrs)**
- [ ] Solve [1] Two Sum — timed, 5 minutes, from scratch, no hints
- [ ] Solve [53] Maximum Subarray — timed, 8 minutes
- [ ] Solve [242] Valid Anagram — explain your approach out loud as you code
- [ ] Solve [49] Group Anagrams — explain time/space complexity at the end

**Behavioral (1.5 hrs)**
- [ ] Write out your "Tell me about yourself" (2–3 min version) — include your projects
- [ ] Prepare STAR story: "Describe a challenging technical problem you solved" → LRU OOM bug in slake-reporting OR cache race condition in reports service
- [ ] Practice saying it out loud once (record yourself on phone)

**Java Review (1 hr)**
- [ ] Flashcard drill: HashMap internal working — can you explain it in 90 seconds?
- [ ] Write from memory: How to detect duplicates in an array using 3 different approaches

**Weekly Check-in**
- [ ] Problems solved this week: ___
- [ ] Confidence on Easy problems (1–10): ___
- [ ] One thing I understand better now than Day 1: ___

---

## WEEK 2 — Two Pointers + Sliding Window + Binary Search
**Theme:** These 3 patterns appear in ~30% of all Medium problems. After this week, a large chunk of Medium becomes approachable.

---

### Day 8 — Monday | Two Pointers
**DSA (2.5 hrs)**
- [ ] [125] Valid Palindrome — re-solve using two pointers from memory (warm-up)
- [ ] [167] Two Sum II — Sorted Array
- [ ] [15] 3Sum ← Important Medium — take full 25 min, understand the sort + skip duplicates logic

**Theory (1.5 hrs)**
- [ ] Read: DBMS — What is an index? B-Tree index structure, why B-Tree not Binary Tree
- [ ] Read: Clustered vs Non-clustered index, composite indexes, when index hurts performance
- [ ] SQL: Write a query using JOIN + WHERE + ORDER BY + LIMIT

**Review (0.5 hr)**
- [ ] 3Sum — trace through the algorithm with input `[-1, 0, 1, 2, -1, -4]` on paper

---

### Day 9 — Tuesday | Two Pointers Continued
**DSA (2.5 hrs)**
- [ ] [11] Container With Most Water ← Medium — why does greedy two-pointer work here?
- [ ] [42] Trapping Rain Water ← Hard — understand the two-pointer approach conceptually even if you can't code it fully
- [ ] [977] Squares of a Sorted Array — two pointers from both ends

**Theory (1.5 hrs)**
- [ ] Read: SQL — Transactions, ACID properties (Atomicity, Consistency, Isolation, Durability)
- [ ] Read: Isolation levels — READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE
- [ ] Read: What is a dirty read? phantom read? non-repeatable read?

**Review (0.5 hr)**
- [ ] Container With Most Water — why do we move the shorter pointer, not the taller one?

---

### Day 10 — Wednesday | Sliding Window
**DSA (2.5 hrs)**
- [ ] [643] Maximum Average Subarray I — fixed window warm-up
- [ ] [3] Longest Substring Without Repeating Characters ← Classic Medium — must know
- [ ] [209] Minimum Size Subarray Sum ← Medium

**Theory (1.5 hrs)**
- [ ] Read: SQL — N+1 query problem (critical — you'll be asked about this given your Spring/JPA background)
- [ ] Read: How to fix N+1 in Spring JPA: `@EntityGraph`, `JOIN FETCH`, `@BatchSize`
- [ ] Write: An example of N+1 happening and how you'd detect it (check Hibernate SQL logs)

**Review (0.5 hr)**
- [ ] Sliding window template: write the generic expandable window template from memory
```java
int left = 0;
Map<Character, Integer> window = new HashMap<>();
for (int right = 0; right < s.length(); right++) {
    // add s[right] to window
    while (/* window invalid */) {
        // remove s[left] from window
        left++;
    }
    // update answer
}
```

---

### Day 11 — Thursday | Sliding Window Continued
**DSA (2.5 hrs)**
- [ ] [424] Longest Repeating Character Replacement ← Medium — tricky, trace through carefully
- [ ] [567] Permutation in String ← Medium — fixed window with frequency count
- [ ] [438] Find All Anagrams in a String ← Medium

**Theory (1.5 hrs)**
- [ ] Read: Java `@Transactional` — what it does at the Spring AOP level
- [ ] Read: `@Transactional` propagation — REQUIRED vs REQUIRES_NEW vs NESTED
- [ ] Read: What happens if a `@Transactional` method calls another `@Transactional` method in the same class? (proxy bypass problem)

**Review (0.5 hr)**
- [ ] Sliding window for character frequency — when is a fixed window better than a dynamic window?

---

### Day 12 — Friday | Binary Search
**DSA (2.5 hrs)**
- [ ] [704] Binary Search — implement both iterative and recursive
- [ ] [35] Search Insert Position
- [ ] [278] First Bad Version
- [ ] [153] Find Minimum in Rotated Sorted Array ← Medium

**Theory (1.5 hrs)**
- [ ] Read: OS — Process vs Thread, context switching overhead
- [ ] Read: Java thread lifecycle — NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED
- [ ] Read: `synchronized` keyword — object lock vs class lock

**Review (0.5 hr)**
- [ ] Binary search template — write from memory with `left <= right` vs `left < right` variants

---

### Day 13 — Saturday | Binary Search on Answer Space + Review
**DSA (4 hrs)**
- [ ] [33] Search in Rotated Sorted Array ← Must-know Medium — 2 binary searches or 1?
- [ ] [74] Search a 2D Matrix ← Medium — treat 2D as 1D
- [ ] [875] Koko Eating Bananas ← Medium — binary search on answer space
- [ ] [1011] Capacity to Ship Packages Within D Days ← Medium — same pattern as Koko
- [ ] Re-solve [3] Longest Substring Without Repeating Chars from memory (timed: 15 min)

**System Design (2 hrs)**
- [ ] Study: What is a Cache? Cache-aside vs Write-through vs Write-back vs Write-around
- [ ] Study: Redis data structures — String, List, Set, Sorted Set, Hash — when to use which
- [ ] Write out: How you used EHCache + Redis in your reports project (practice explaining it)

**Review (1 hr)**
- [ ] Week 2 problem count: ___ (target: 55+)
- [ ] Can you identify a sliding window problem vs a two-pointer problem by reading it?

---

### Day 14 — Sunday | Review + Mock
**Mock (2 hrs)**
- [ ] Timed: [15] 3Sum — 25 min, no hints
- [ ] Timed: [3] Longest Substring — 15 min, no hints
- [ ] Timed: [33] Search in Rotated Array — 25 min, no hints
- [ ] After each: explain time/space complexity out loud

**Behavioral (1 hr)**
- [ ] Prepare STAR story: "Tell me about a time you improved system performance" → Lambda PDF offloading OR Kafka async pipeline
- [ ] Practice out loud once

**Java Review (1 hr)**
- [ ] `volatile` vs `synchronized` vs `AtomicInteger` — write one-line difference between each
- [ ] What is a race condition? Give an example from your own code (LOB cache race condition)

**Weekly Check-in**
- [ ] Problems solved this week: ___
- [ ] Can I identify: two-pointer / sliding window / binary search on sight? (Y/N)
- [ ] Hardest problem this week: ___

---

## WEEK 3 — Linked Lists + Stacks + Queues
**Theme:** Pointer manipulation and stack-based parsing. LRU Cache this week is the single most important problem of Month 1.

---

### Day 15 — Monday | Linked Lists Basics
**DSA (2.5 hrs)**
- [ ] [206] Reverse Linked List — iterative AND recursive (both)
- [ ] [21] Merge Two Sorted Lists
- [ ] [141] Linked List Cycle — Floyd's tortoise and hare algorithm

**Theory (1.5 hrs)**
- [ ] Read: Java `volatile` keyword — what it guarantees (visibility, not atomicity)
- [ ] Read: Java Memory Model — happens-before relationship
- [ ] Read: `ThreadLocal` in Java — you use this for LOB routing in your project. Articulate it precisely.

**Review (0.5 hr)**
- [ ] Floyd's algorithm — WHY does slow + fast pointer meeting prove a cycle? Write the proof in 3 sentences.

---

### Day 16 — Tuesday | Linked Lists Intermediate
**DSA (2.5 hrs)**
- [ ] [142] Linked List Cycle II ← Medium — find the cycle start, understand the math
- [ ] [19] Remove Nth Node From End of List ← Medium — two-pointer gap technique
- [ ] [876] Middle of the Linked List — fast/slow pointer

**Theory (1.5 hrs)**
- [ ] Read: Networking — TCP vs UDP, 3-way handshake
- [ ] Read: HTTP/1.1 vs HTTP/2 vs HTTP/3 — key differences (multiplexing, header compression)
- [ ] Read: What happens when you type a URL in a browser — full DNS + TCP + HTTP flow

**Review (0.5 hr)**
- [ ] Cycle II — trace through the math: if cycle start is k steps from head, why does re-starting one pointer from head find the cycle start?

---

### Day 17 — Wednesday | Linked Lists Hard + LRU Cache
**DSA (2.5 hrs)**
- [ ] [143] Reorder List ← Medium — split + reverse + merge (3 linked list operations in one)
- [ ] [146] LRU Cache ← Medium/Hard — **most important problem this week** — HashMap + Doubly Linked List
  - Do NOT look at solutions. Spend 35 minutes. Then check approach.
  - Re-implement from scratch after 1 hour.

**Theory (1.5 hrs)**
- [ ] Read: REST vs GraphQL — when to use each
- [ ] Read: HTTP status codes — 200, 201, 204, 301, 400, 401, 403, 404, 409, 422, 500, 503
- [ ] Read: Idempotency — what makes an HTTP method idempotent? (GET, PUT, DELETE = yes; POST = no)

**Review (0.5 hr)**
- [ ] LRU Cache — can you explain why you need BOTH a HashMap AND a doubly linked list?

---

### Day 18 — Thursday | Stacks
**DSA (2.5 hrs)**
- [ ] [20] Valid Parentheses — stack warm-up
- [ ] [155] Min Stack ← Medium — extra stack for tracking minimums
- [ ] [150] Evaluate Reverse Polish Notation ← Medium — stack-based evaluation
- [ ] [496] Next Greater Element I

**Theory (1.5 hrs)**
- [ ] Read: Java GC — Young Generation (Eden + Survivor), Old Generation, Metaspace
- [ ] Read: GC types — Serial, Parallel, G1GC (default since Java 9), ZGC
- [ ] Read: When does a `StackOverflowError` happen? When does `OutOfMemoryError` happen?

**Review (0.5 hr)**
- [ ] Min Stack — what's the time complexity of `getMin()`? Why is it O(1)?

---

### Day 19 — Friday | Monotonic Stack
**DSA (2.5 hrs)**
- [ ] [739] Daily Temperatures ← Medium — monotonic decreasing stack pattern
- [ ] [853] Car Fleet ← Medium — stack with logic
- [ ] [503] Next Greater Element II — circular array with stack

**Theory (1.5 hrs)**
- [ ] Read: Networking — HTTPS, TLS handshake, SSL certificate validation
- [ ] Read: CORS — how it works, preflight request, allowed headers/origins (you implemented this!)
- [ ] Write: How does your `CustomizedCorsFilter` work — explain it as you would in an interview

**Review (0.5 hr)**
- [ ] Monotonic stack pattern: "I use a stack that stays decreasing/increasing and pop when I find a larger/smaller element" — memorize this sentence

---

### Day 20 — Saturday | Hard Stack Problems + Queue
**DSA (4 hrs)**
- [ ] [84] Largest Rectangle in Histogram ← Hard — monotonic stack, trace through carefully
- [ ] [239] Sliding Window Maximum ← Hard — deque (monotonic queue) pattern
- [ ] [23] Merge k Sorted Lists ← Hard — Min-Heap / PriorityQueue approach
- [ ] [232] Implement Queue using Stacks ← Easy — understand amortized O(1)
- [ ] Re-solve [146] LRU Cache from memory — can you do it in 20 minutes now?

**System Design (2 hrs)**
- [ ] Study: Message Queue architecture — producer, consumer, broker, topic, partition
- [ ] Study: Kafka specifically — how partitions work, consumer groups, offset management, at-least-once vs exactly-once
- [ ] Write: How your Kafka setup in the reports service works — explain it as a system design answer

**Review (1 hr)**
- [ ] Week 3 count: ___ (target: 85+)
- [ ] LRU Cache — write the full implementation from memory on paper

---

### Day 21 — Sunday | Review + Behavioral
**Mock (2 hrs)**
- [ ] Timed: [206] Reverse Linked List — 8 min, iterative + recursive
- [ ] Timed: [155] Min Stack — 15 min
- [ ] Timed: [739] Daily Temperatures — 20 min
- [ ] Timed: [146] LRU Cache — 25 min (target: no hints needed now)

**Behavioral (1 hr)**
- [ ] Prepare STAR story: "Tell me about a time you took ownership of something" → Built ChannelKart Reports + slake-reporting from scratch
- [ ] Practice: "What is your biggest technical weakness?" — be honest, prepare a growth-oriented answer

**Java Review (1 hr)**
- [ ] `HashMap` internal working — say it out loud in 90 seconds
- [ ] `ThreadLocal` — what it does, when to use it, memory leak risk if not cleaned up

**Weekly Check-in**
- [ ] Problems solved this week: ___
- [ ] LRU Cache — can I implement it from scratch without hints? (Y/N)
- [ ] Monotonic stack pattern — understood? (Y/N)

---

## WEEK 4 — Trees (BFS + DFS)
**Theme:** Trees are the single most-tested topic at MNCs. Take this week seriously. Every problem here has a 30–50% chance of appearing in your actual interviews.

---

### Day 22 — Monday | Tree DFS Basics
**DSA (2.5 hrs)**
- [ ] [226] Invert Binary Tree — recursive and iterative
- [ ] [104] Maximum Depth of Binary Tree — recursive and iterative (BFS)
- [ ] [543] Diameter of Binary Tree ← how do you pass info up recursively?

**Theory (1.5 hrs)**
- [ ] Read: Spring IoC container — what is Inversion of Control, what is Dependency Injection
- [ ] Read: Spring bean lifecycle — `@PostConstruct`, `@PreDestroy`, `InitializingBean`
- [ ] Read: `@Component` vs `@Service` vs `@Repository` vs `@Controller` — real differences

**Review (0.5 hr)**
- [ ] Diameter — write the recursive helper that returns height and updates max diameter as a side effect

---

### Day 23 — Tuesday | Tree DFS Continued
**DSA (2.5 hrs)**
- [ ] [110] Balanced Binary Tree — return -1 as sentinel for unbalanced
- [ ] [100] Same Tree
- [ ] [572] Subtree of Another Tree — how is this different from Same Tree?
- [ ] [112] Path Sum

**Theory (1.5 hrs)**
- [ ] Read: Spring Data JPA — how `@Repository` works, how Spring generates implementation at runtime
- [ ] Read: Lazy vs Eager loading — `FetchType.LAZY` vs `FetchType.EAGER`, `LazyInitializationException`
- [ ] Read: `@OneToMany`, `@ManyToOne`, `@ManyToMany` — which side owns the relationship?

**Review (0.5 hr)**
- [ ] Subtree of another tree — what's the time complexity? O(m×n)? Can you do better?

---

### Day 24 — Wednesday | Tree Hard Problems
**DSA (2.5 hrs)**
- [ ] [113] Path Sum II — backtracking intro (add to path, recurse, remove from path)
- [ ] [124] Binary Tree Maximum Path Sum ← Hard — most important hard tree problem
  - Spend 30 minutes. If stuck, study the approach. Re-implement.
- [ ] [437] Path Sum III — prefix sum in trees

**Theory (1.5 hrs)**
- [ ] Read: CAP Theorem — Consistency, Availability, Partition tolerance — why you can only choose 2
- [ ] Read: Eventual consistency — what does it mean? What systems use it? (DNS, Amazon S3)
- [ ] Read: Strong consistency — what does it mean? (Traditional RDBMS)

**Review (0.5 hr)**
- [ ] Path Sum maximum — the key insight: at each node, you can extend a path OR start a new path. Write this in one sentence.

---

### Day 25 — Thursday | BST
**DSA (2.5 hrs)**
- [ ] [235] Lowest Common Ancestor of BST ← Medium — use BST property
- [ ] [236] Lowest Common Ancestor of Binary Tree ← Medium — harder, no BST property
- [ ] [98] Validate BST ← Medium — pass min/max bounds down recursively
- [ ] [230] Kth Smallest Element in BST — in-order traversal is sorted!

**Theory (1.5 hrs)**
- [ ] Read: Database sharding — horizontal vs vertical sharding, choosing a shard key, hotspot problem
- [ ] Read: Read replicas — how they work, replication lag, eventual consistency implication
- [ ] Write: How `CustomRoutingDataSource` in your project achieves multi-tenancy at the DB level

**Review (0.5 hr)**
- [ ] LCA of Binary Tree — the 3 cases: node is in left subtree, right subtree, or current node IS one of the targets

---

### Day 26 — Friday | BFS on Trees
**DSA (2.5 hrs)**
- [ ] [102] Binary Tree Level Order Traversal ← Medium — the BFS queue template
- [ ] [199] Binary Tree Right Side View ← Medium — last node at each level
- [ ] [637] Average of Levels in Binary Tree
- [ ] [116] Populating Next Right Pointers ← Medium

**BFS Queue Template to memorize:**
```java
Queue<TreeNode> queue = new LinkedList<>();
queue.offer(root);
while (!queue.isEmpty()) {
    int size = queue.size(); // process level by level
    for (int i = 0; i < size; i++) {
        TreeNode node = queue.poll();
        // process node
        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
    }
}
```
- [ ] Write this template from memory

**Theory (1.5 hrs)**
- [ ] Read: Microservices — what is service discovery? (Eureka, Consul)
- [ ] Read: API Gateway pattern — what problems does it solve?
- [ ] Read: Circuit breaker pattern — states: CLOSED → OPEN → HALF_OPEN (you identified this gap in your project!)

**Review (0.5 hr)**
- [ ] BFS template — differences between level-by-level and simple BFS

---

### Day 27 — Saturday | BFS on Graphs + Trie
**DSA (4 hrs)**
- [ ] [994] Rotting Oranges ← Medium — BFS from multiple sources simultaneously
- [ ] [542] 01 Matrix ← Medium — multi-source BFS
- [ ] [127] Word Ladder ← Hard — BFS on implicit graph (very important, appears in real interviews)
- [ ] [208] Implement Trie ← Medium — build from scratch, must know
- [ ] [1268] Search Suggestions System ← Medium — Trie application

**System Design (2 hrs)**
- [ ] Study: Design a URL Shortener (TinyURL) — write full design:
  - [ ] Requirements: functional (shorten URL, redirect) + non-functional (scale, latency)
  - [ ] Components: API servers, DB (which one?), cache, hash generation
  - [ ] DB schema, hash collision handling
  - [ ] How to scale to 1B URLs
- [ ] Write it out on paper as if in an interview

**Review (1 hr)**
- [ ] Week 4 count: ___ (target: 130+)
- [ ] End of Month 1 Milestone Check:
  - [ ] Can solve any Easy in < 10 min
  - [ ] Can solve ~50% of Mediums independently
  - [ ] Two-pointer, sliding window, binary search — confident?
  - [ ] Trees — can traverse any variant?
  - [ ] LRU Cache — can implement from scratch?

---

### Day 28 — Sunday | Month 1 Review + Full Behavioral Session
**Mock (2.5 hrs)**
- [ ] Timed: [102] Level Order Traversal — 15 min
- [ ] Timed: [236] LCA Binary Tree — 25 min
- [ ] Timed: [127] Word Ladder — 35 min (hard, it's okay to struggle)
- [ ] Timed: [146] LRU Cache — 20 min (should be fast by now)

**Behavioral (2 hrs)**
- [ ] Full practice: "Tell me about yourself" — 2 min version
- [ ] Story 1: Challenging technical problem (LRU OOM bug or cache race condition)
- [ ] Story 2: System you designed from scratch (Reports service)
- [ ] Story 3: Performance improvement (Lambda PDF offload)
- [ ] Story 4: Production incident (cache race condition / tenant data leak)
- [ ] Record yourself on phone — listen back, fix filler words ("umm", "like")

**Java Review (1 hr)**
- [ ] Can you explain `@Transactional` propagation in 2 minutes? Practice it.
- [ ] What is Spring AOP? How does `@Transactional` use it? (Proxy-based)

**Weekly Check-in**
- [ ] Month 1 total problems: ___ (target: 130+)
- [ ] Confidence on Medium problems (1–10): ___
- [ ] System design comfort (1–10): ___

---

## WEEK 5 — Heaps + Greedy + System Design Starts
**Theme:** Heaps (PriorityQueue in Java) power the top-K, scheduling, and median problems. System design is now a daily commitment.

---

### Day 29 — Monday | Heap Basics
**DSA (2.5 hrs)**
- [ ] [215] Kth Largest Element in Array ← Medium — Min-Heap of size K
- [ ] [973] K Closest Points to Origin ← Medium — Max-Heap or sort
- [ ] [347] Top K Frequent Elements ← revisit with heap approach

**Java PriorityQueue note:**
```java
// Min-Heap (default)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

// Max-Heap
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

// Custom comparator
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
```
- [ ] Write all three from memory

**Theory (1.5 hrs)**
- [ ] System Design: Load Balancing — round robin, least connections, IP hash, weighted
- [ ] System Design: What is horizontal scaling vs vertical scaling?
- [ ] System Design: Stateless vs stateful services — why stateless is better for scaling

**Review (0.5 hr)**
- [ ] Heap pattern: "Use Min-Heap of size K to find K largest elements" — why Min-Heap and not Max-Heap?

---

### Day 30 — Tuesday | Two-Heaps Pattern
**DSA (2.5 hrs)**
- [ ] [295] Find Median from Data Stream ← Hard — two heaps (Max-Heap for lower half, Min-Heap for upper half)
  - This is one of the most important patterns. Spend 40 min on it.
- [ ] [621] Task Scheduler ← Medium — heap + greedy

**Theory (1.5 hrs)**
- [ ] System Design: CDN — what it is, edge servers, cache invalidation at CDN level
- [ ] System Design: Database indexing — B-Tree index, covering index, partial index
- [ ] System Design: When NOT to use an index (high write volume, small tables)

**Review (0.5 hr)**
- [ ] Find Median — the invariant: maxHeap.size() == minHeap.size() OR maxHeap.size() == minHeap.size() + 1. Write this.

---

### Day 31 — Wednesday | Heap Applications
**DSA (2.5 hrs)**
- [ ] [767] Reorganize String ← Medium — Max-Heap by frequency
- [ ] [355] Design Twitter ← Medium — merge K sorted streams with heap
- [ ] [502] IPO ← Hard — two heaps, greedy

**Theory (1.5 hrs)**
- [ ] System Design: SQL vs NoSQL — when to choose each, ACID vs BASE
- [ ] System Design: Types of NoSQL — document (MongoDB), key-value (Redis), column-family (Cassandra), graph (Neo4j)
- [ ] System Design: When does Cassandra make sense? (high write throughput, time-series data)

**Review (0.5 hr)**
- [ ] Design Twitter — what's the time complexity of fetching a user's timeline?

---

### Day 32 — Thursday | Greedy
**DSA (2.5 hrs)**
- [ ] [55] Jump Game ← Medium — greedy with max reach
- [ ] [45] Jump Game II ← Medium — greedy, count minimum jumps
- [ ] [134] Gas Station ← Medium — total gas >= total cost must hold

**Theory (1.5 hrs)**
- [ ] System Design: Consistent Hashing — what problem does it solve? Virtual nodes.
- [ ] System Design: How Kafka uses partitioning (you know this from your project — formalize it)
- [ ] System Design: Kafka consumer groups — one consumer per partition max, what happens if more consumers than partitions?

**Review (0.5 hr)**
- [ ] Jump Game II — the key insight: every time you must jump, choose the jump that extends your reach the farthest

---

### Day 33 — Friday | Intervals (Greedy)
**DSA (2.5 hrs)**
- [ ] [56] Merge Intervals ← Medium — sort by start, merge overlapping
- [ ] [57] Insert Interval ← Medium — 3 phases: before, overlap, after
- [ ] [435] Non-overlapping Intervals ← Medium — greedy, keep interval with earliest end

**Theory (1.5 hrs)**
- [ ] System Design: Rate limiting — Token Bucket vs Leaky Bucket vs Sliding Window Counter
- [ ] System Design: Where to implement rate limiting? (API Gateway, middleware, per-user, per-IP)
- [ ] Write: How `IntegrationThrottler` in your project works — is it proper rate limiting or flow control?

**Review (0.5 hr)**
- [ ] Intervals pattern: always sort by start time. When to sort by end time instead?

---

### Day 34 — Saturday | Interval Hard + System Design Deep Dive
**DSA (3.5 hrs)**
- [ ] [253] Meeting Rooms II ← Medium — Min-Heap to track room end times
- [ ] [763] Partition Labels ← Medium
- [ ] [846] Hand of Straights ← Medium — greedy + sorted map
- [ ] [1851] Minimum Interval to Include Each Query ← Hard — events + heap
- [ ] Re-solve [56] Merge Intervals from memory (timed: 15 min)

**System Design (3 hrs)**
- [ ] Design URL Shortener — present it fully out loud as if to an interviewer (set a 45-min timer)
- [ ] Study: Designing a notification system
  - [ ] Requirements: push, email, SMS
  - [ ] Components: notification service, message queue, workers per channel
  - [ ] Retry logic, deduplication
  - [ ] You built parts of this — use your real knowledge

**Review (1 hr)**
- [ ] Week 5 count: ___ (target: 150+)
- [ ] System design comfort after URL Shortener exercise (1–10): ___

---

### Day 35 — Sunday | System Design Focus + Review
**System Design (3 hrs)**
- [ ] Design WhatsApp / Chat System — write full design:
  - [ ] How does a message get from sender to receiver?
  - [ ] Online/offline detection, last seen
  - [ ] Message storage — SQL or NoSQL? (Cassandra is common choice)
  - [ ] Group chats
  - [ ] Read receipts (single tick, double tick, blue tick)
  - [ ] How does your Kafka knowledge apply here?
- [ ] Present it out loud, 45 min timer

**Mock DSA (1.5 hrs)**
- [ ] Timed: [295] Find Median from Data Stream — 30 min
- [ ] Timed: [253] Meeting Rooms II — 20 min

**Behavioral (1 hr)**
- [ ] Prepare story: "Tell me about a time you had to make a trade-off" → Monolith choice for reports service, polling over WebSocket for task status, at-least-once Kafka vs exactly-once
- [ ] Practice your "Tell me about yourself" again — is it sharp and confident?

**Weekly Check-in**
- [ ] Problems solved this week: ___
- [ ] Can explain two-heaps pattern? (Y/N)
- [ ] System design: can design URL shortener and chat system? (Y/N)

---

## WEEK 6 — Dynamic Programming
**Theme:** DP is feared by most candidates. Even learning 1D DP properly will set you apart. Go slow, trace every example on paper.

---

### Day 36 — Monday | 1D DP — The Foundation
**DSA (2.5 hrs)**
- [ ] [70] Climbing Stairs — tabulation AND memoization both
- [ ] [198] House Robber ← Medium
- [ ] [213] House Robber II ← Medium — circular array, two passes

**DP Framework to internalize:**
1. Define the state: what does `dp[i]` mean?
2. Define the transition: how does `dp[i]` relate to `dp[i-1]`?
3. Define the base case
4. Define the answer
- [ ] Apply this framework to Climbing Stairs on paper before coding

**Theory (1.5 hrs)**
- [ ] System Design: Database replication — synchronous vs asynchronous, replication lag
- [ ] System Design: Leader election — what happens when the master DB goes down?
- [ ] System Design: Failover strategies — active-passive vs active-active

**Review (0.5 hr)**
- [ ] House Robber II — why split into two sub-problems (0 to n-2) and (1 to n-1)?

---

### Day 37 — Tuesday | 1D DP — Strings
**DSA (2.5 hrs)**
- [ ] [5] Longest Palindromic Substring ← Medium — expand around center (O(n²)) or DP
- [ ] [647] Palindromic Substrings ← Medium — same expand approach
- [ ] [91] Decode Ways ← Medium — DP, be careful with edge cases (leading zeros)

**Theory (1.5 hrs)**
- [ ] System Design: Search system — inverted index, how Elasticsearch works
- [ ] System Design: Full-text search vs exact-match search
- [ ] Write: How your reports service uses Elasticsearch for logging — explain it as system design

**Review (0.5 hr)**
- [ ] Decode Ways — trace through "226" → dp[0]=1, dp[1]=1, dp[2]=2, dp[3]=3 on paper

---

### Day 38 — Wednesday | Classic 1D DP
**DSA (2.5 hrs)**
- [ ] [322] Coin Change ← Medium — classic DP, also do BFS approach
- [ ] [139] Word Break ← Medium — `dp[i]` = can we form s[0..i]?
- [ ] [300] Longest Increasing Subsequence ← Medium — O(n²) DP, then O(n log n) patience sort

**Theory (1.5 hrs)**
- [ ] System Design: Data pipeline — batch vs streaming, Lambda architecture, Kappa architecture
- [ ] System Design: What is ETL? How does your slake-reporting project relate to ETL?
- [ ] System Design: Apache Kafka vs Apache Flink — what's the difference in use case?

**Review (0.5 hr)**
- [ ] Coin Change — trace dp array for `coins=[1,2,5], amount=5` on paper

---

### Day 39 — Thursday | 2D DP
**DSA (2.5 hrs)**
- [ ] [62] Unique Paths ← Medium — 2D DP table
- [ ] [1143] Longest Common Subsequence ← Medium — foundation of many string DPs
- [ ] [518] Coin Change II ← Medium — unbounded knapsack

**Theory (1.5 hrs)**
- [ ] System Design: Distributed transactions — Two-Phase Commit (2PC), what are its downsides?
- [ ] System Design: Saga pattern — choreography vs orchestration
- [ ] System Design: How to handle distributed transactions in a microservices architecture?

**Review (0.5 hr)**
- [ ] LCS — build the 2D table for "ABCDE" and "ACE" on paper

---

### Day 40 — Friday | 2D DP Continued
**DSA (2.5 hrs)**
- [ ] [72] Edit Distance ← Hard — very important, trace the table on paper first
- [ ] [309] Best Time to Buy/Sell Stock with Cooldown ← Medium — state machine DP
- [ ] [494] Target Sum ← Medium — DP or DFS with memoization

**Theory (1.5 hrs)**
- [ ] Java Concurrency: `ExecutorService`, `ThreadPoolExecutor`, core vs max pool size, queue types
- [ ] Java Concurrency: `CompletableFuture` — `thenApply`, `thenCompose`, `thenCombine`, `exceptionally`
- [ ] Java 21: Virtual threads — how they differ from OS threads, why they're good for blocking I/O

**Review (0.5 hr)**
- [ ] Edit Distance — why is the transition `dp[i][j] = 1 + min(insert, delete, replace)`?

---

### Day 41 — Saturday | DP Hard + System Design WhatsApp
**DSA (3.5 hrs)**
- [ ] [416] Partition Equal Subset Sum ← Medium — 0/1 knapsack variant
- [ ] [97] Interleaving String ← Hard
- [ ] [312] Burst Balloons ← Hard — interval DP, trace the base case carefully
- [ ] [10] Regular Expression Matching ← Hard — DP on string patterns
- [ ] Re-solve [322] Coin Change from memory (timed: 15 min)

**System Design (3 hrs)**
- [ ] Design WhatsApp — present out loud, 45-min timer
  - Focus on: message delivery guarantees, online/offline, WebSocket vs polling
  - Compare to your own task polling design — why did you choose polling?
- [ ] Study: Service mesh — what is Istio? What problem does it solve?

**Review (1 hr)**
- [ ] Week 6 count: ___ (target: 165+)
- [ ] DP: can I identify which DP pattern a problem uses by reading it? (1D? 2D? Interval?)

---

### Day 42 — Sunday | DP Review + Mock
**Mock (2 hrs)**
- [ ] Timed: [198] House Robber — 15 min
- [ ] Timed: [322] Coin Change — 20 min
- [ ] Timed: [1143] LCS — 25 min
- [ ] Timed: [72] Edit Distance — 35 min (it's hard, it's okay to need the hint)

**Behavioral (1 hr)**
- [ ] New story: "Describe a time you disagreed with a technical decision" — prepare one
- [ ] New story: "Tell me about a time you had to learn something quickly" — how you picked up Quarkus for slake-reporting

**Java Review (1 hr)**
- [ ] Spring Security filter chain — draw it on paper: `SecurityContextPersistenceFilter → UsernamePasswordAuthenticationFilter → JWTTokenFilter → ...`
- [ ] How does your JWT filter fit into this chain?

**Weekly Check-in**
- [ ] Problems solved this week: ___
- [ ] DP confidence (1–10): ___
- [ ] System design: designed WhatsApp correctly? (Y/N)

---

## WEEK 7 — Graphs + Backtracking
**Theme:** Graphs appear in ~20% of real interviews. Backtracking is the pattern for all permutation/combination/constraint problems.

---

### Day 43 — Monday | Graph BFS/DFS Basics
**DSA (2.5 hrs)**
- [ ] [200] Number of Islands ← Medium — start here, classic, must know
- [ ] [695] Max Area of Island ← Medium — variation of islands
- [ ] [133] Clone Graph ← Medium — BFS/DFS with visited HashMap

**Graph template — DFS:**
```java
boolean[] visited = new boolean[n];
void dfs(int node, List<List<Integer>> adj) {
    visited[node] = true;
    for (int neighbor : adj.get(node)) {
        if (!visited[neighbor]) dfs(neighbor, adj);
    }
}
```
- [ ] Write this from memory

**Theory (1.5 hrs)**
- [ ] System Design: Content delivery for large files — chunking, resumable uploads
- [ ] System Design: S3 multipart upload — how it works (you implemented this in slake-reporting!)
- [ ] Write: How `ExportService` in slake-reporting uploads to S3 — explain it as a system design answer

**Review (0.5 hr)**
- [ ] Number of Islands — why mark as visited when adding to queue (not when popping)?

---

### Day 44 — Tuesday | Graph DFS Applications
**DSA (2.5 hrs)**
- [ ] [417] Pacific Atlantic Water Flow ← Medium — DFS from both oceans, find intersection
- [ ] [130] Surrounded Regions ← Medium — DFS from border, mark safe cells
- [ ] [261] Graph Valid Tree ← Medium — no cycle + connected

**Theory (1.5 hrs)**
- [ ] System Design: Designing for high availability — 99.9% vs 99.99% vs 99.999% uptime
- [ ] System Design: Redundancy — active-active vs active-passive, data center regions
- [ ] System Design: Health checks — how load balancers detect unhealthy instances (you have `/q/health/ready` in slake-reporting)

**Review (0.5 hr)**
- [ ] Pacific Atlantic — why start DFS from the borders (ocean cells) instead of the interior?

---

### Day 45 — Wednesday | Topological Sort
**DSA (2.5 hrs)**
- [ ] [207] Course Schedule ← Medium — cycle detection in directed graph (DFS OR BFS/Kahn's)
- [ ] [210] Course Schedule II ← Medium — return topological order
- [ ] [323] Number of Connected Components ← Medium — Union-Find OR DFS

**Union-Find (Disjoint Set Union) template:**
```java
int[] parent;
int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }
void union(int x, int y) { parent[find(x)] = find(y); }
```
- [ ] Write this from memory

**Theory (1.5 hrs)**
- [ ] System Design: Designing a job scheduler — priority queues, distributed execution
- [ ] System Design: How your `SchedulerService` in slake-reporting works — cron parsing, state file idempotency
- [ ] System Design: What would you change if the scheduler needed to run across multiple instances?

**Review (0.5 hr)**
- [ ] Topological sort — what does it mean if a topological sort is impossible? (cycle in directed graph)

---

### Day 46 — Thursday | Shortest Path Algorithms
**DSA (2.5 hrs)**
- [ ] [743] Network Delay Time ← Medium — Dijkstra's algorithm (Min-Heap + dist array)
- [ ] [787] Cheapest Flights Within K Stops ← Medium — modified Bellman-Ford
- [ ] [684] Redundant Connection ← Medium — Union-Find

**Dijkstra template:**
```java
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]); // [node, dist]
pq.offer(new int[]{src, 0});
int[] dist = new int[n]; Arrays.fill(dist, Integer.MAX_VALUE); dist[src] = 0;
while (!pq.isEmpty()) {
    int[] cur = pq.poll();
    for (int[] neighbor : adj.get(cur[0])) {
        if (dist[cur[0]] + neighbor[1] < dist[neighbor[0]]) {
            dist[neighbor[0]] = dist[cur[0]] + neighbor[1];
            pq.offer(new int[]{neighbor[0], dist[neighbor[0]]});
        }
    }
}
```
- [ ] Write from memory

**Theory (1.5 hrs)**
- [ ] System Design: Designing a recommendation system — collaborative filtering, content-based
- [ ] System Design: Feature store — what it is, why Netflix/Uber use it
- [ ] Java: `ConcurrentHashMap` internal — why it's faster than `Hashtable` (segment locking in Java 7, CAS in Java 8+)

**Review (0.5 hr)**
- [ ] Dijkstra — why doesn't it work with negative weights? What algorithm handles negative weights? (Bellman-Ford)

---

### Day 47 — Friday | Backtracking Basics
**DSA (2.5 hrs)**
- [ ] [78] Subsets ← Medium — backtracking OR bit manipulation
- [ ] [46] Permutations ← Medium — backtracking with swap
- [ ] [39] Combination Sum ← Medium — backtracking with repetition allowed

**Backtracking template:**
```java
void backtrack(List<List<Integer>> result, List<Integer> current, int start, int[] nums) {
    result.add(new ArrayList<>(current)); // add current state
    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);           // choose
        backtrack(result, current, i + 1, nums); // explore
        current.remove(current.size() - 1); // unchoose
    }
}
```
- [ ] Write this from memory

**Theory (1.5 hrs)**
- [ ] System Design: OAuth 2.0 flow — authorization code flow, access token vs refresh token
- [ ] System Design: JWT vs session tokens — stateless vs stateful, token revocation problem
- [ ] Write: How JWT in your reports service handles token versioning for zero-downtime rotation

**Review (0.5 hr)**
- [ ] Subsets vs Permutations — what changes in the backtracking call? (`i+1` vs swap + full range)

---

### Day 48 — Saturday | Backtracking Hard + System Design Uber
**DSA (3.5 hrs)**
- [ ] [90] Subsets II ← Medium — skip duplicates in backtracking
- [ ] [47] Permutations II ← Medium — skip duplicates
- [ ] [40] Combination Sum II ← Medium — pick each element at most once
- [ ] [79] Word Search ← Medium — backtracking on 2D grid
- [ ] [51] N-Queens ← Hard — classic, constraint backtracking
- [ ] [131] Palindrome Partitioning ← Medium — backtracking + palindrome check

**System Design (3 hrs)**
- [ ] Design Uber / Ride-sharing — write full design:
  - [ ] Driver location updates — how often? WebSocket or polling?
  - [ ] Matching algorithm — how to find nearest driver (geohash, QuadTree)
  - [ ] Surge pricing — what triggers it?
  - [ ] Trip lifecycle — REQUESTED → ACCEPTED → IN_PROGRESS → COMPLETED
  - [ ] Which databases? (MySQL for trips, Redis for driver locations)
- [ ] Present out loud, 45-min timer

**Review (1 hr)**
- [ ] Week 7 count: ___ (target: 185+)
- [ ] Can I identify backtracking problems by pattern? (Y/N)
- [ ] Graphs: confident on DFS, BFS, topological sort, Dijkstra? (Y/N)

---

### Day 49 — Sunday | System Design Notification + Full Graph Review
**System Design (2.5 hrs)**
- [ ] Design a Notification System — write full design:
  - [ ] Channels: push notification, email, SMS
  - [ ] Components: notification service → queue per channel → workers
  - [ ] Retry logic with exponential backoff
  - [ ] Deduplication — idempotency key per notification
  - [ ] You built parts of this in your reports service — use that knowledge!
- [ ] Present out loud, 30-min timer

**Mock DSA (2 hrs)**
- [ ] Timed: [200] Number of Islands — 15 min
- [ ] Timed: [207] Course Schedule — 25 min
- [ ] Timed: [51] N-Queens — 35 min (it's okay to take the full time)

**Behavioral (1 hr)**
- [ ] New story: "Where do you see yourself in 3 years?" — prepare a growth-focused answer
- [ ] New story: "Why do you want to leave SalesCode.ai?" — positive, growth-focused only
- [ ] Practice all 6 behavioral stories end-to-end (set 30-min timer)

**Weekly Check-in**
- [ ] Problems solved this week: ___
- [ ] Graph + backtracking confidence (1–10): ___
- [ ] System design: can design 4 systems (URL shortener, WhatsApp, Uber, Notification) without notes? (Y/N)

---

## WEEK 8 — Mock Interviews + Final Polish
**Theme:** Simulate real conditions. Speed, communication, and confidence under pressure. This week you practice being evaluated, not just solving problems.

---

### Day 50 — Monday | Mock Set A + Twitter Design
**Mock DSA (2.5 hrs) — No hints, timed**
- [ ] [15] 3Sum — 25 min timer
- [ ] [3] Longest Substring Without Repeating Characters — 15 min timer
- [ ] [102] Binary Tree Level Order Traversal — 15 min timer
- After each: speak out loud what your approach is BEFORE coding

**System Design (1.5 hrs)**
- [ ] Design Twitter / News Feed:
  - [ ] Fan-out on write vs fan-out on read — trade-offs
  - [ ] Newsfeed generation for 100M users
  - [ ] Tweet storage, media storage (S3), CDN
  - [ ] Trending topics — sliding window counter
- [ ] 45-min timer, speak out loud

**Review (0.5 hr)**
- [ ] What did you struggle with today? Write it. Focus on it tomorrow.

---

### Day 51 — Tuesday | Mock Set A Continued + Netflix Design
**Mock DSA (2.5 hrs) — No hints, timed**
- [ ] [200] Number of Islands — 15 min timer
- [ ] [322] Coin Change — 20 min timer
- [ ] [56] Merge Intervals — 20 min timer
- Speak the approach + complexity before and after each problem

**System Design (1.5 hrs)**
- [ ] Design Netflix / Video Streaming:
  - [ ] Video upload → encoding → storage pipeline
  - [ ] CDN for video delivery, adaptive bitrate streaming
  - [ ] Recommendation system (high level)
  - [ ] Watch history, resume position
- [ ] 45-min timer, speak out loud

**Java (0.5 hr)**
- [ ] Explain `@Transactional` propagation — say it out loud, 2 min version
- [ ] Explain Spring Security filter chain — draw it, then narrate it

---

### Day 52 — Wednesday | Mock Set B + Amazon Design
**Mock DSA (2.5 hrs) — No hints, timed**
- [ ] [33] Search in Rotated Sorted Array — 20 min timer
- [ ] [146] LRU Cache — 25 min timer (you should be fast now)
- [ ] [127] Word Ladder — 35 min timer
- Speak the approach out loud before writing a single line of code

**System Design (1.5 hrs)**
- [ ] Design Amazon (E-commerce):
  - [ ] Product catalog — search, filters (Elasticsearch)
  - [ ] Shopping cart — consistency requirements (Redis)
  - [ ] Order service — idempotency, payment integration
  - [ ] Inventory management — overselling problem, distributed locks
- [ ] 45-min timer

**Review (0.5 hr)**
- [ ] LRU Cache — how long did it take? Target: under 20 min now.

---

### Day 53 — Thursday | Mock Set B Continued + Rate Limiter Design
**Mock DSA (2.5 hrs) — No hints, timed**
- [ ] [207] Course Schedule — 20 min timer
- [ ] [295] Find Median from Data Stream — 30 min timer
- [ ] [1143] Longest Common Subsequence — 25 min timer

**System Design (1.5 hrs)**
- [ ] Design a Rate Limiter:
  - [ ] Token bucket algorithm — implementation
  - [ ] Where to store the bucket (Redis with Lua scripts for atomicity)
  - [ ] Distributed rate limiting across multiple API servers
  - [ ] You have `IntegrationThrottler` — compare it to proper rate limiting
- [ ] 45-min timer

**Java (0.5 hr)**
- [ ] Explain virtual threads (Java 21) — why they're good for I/O-bound work like JDBC
- [ ] Explain HikariCP pool settings — why min-idle=5, max-idle=8 in your project

---

### Day 54 — Friday | Hard Problems + Distributed Cache Design
**Mock DSA (2.5 hrs) — Hard problems, no hints for 35 min each**
- [ ] [42] Trapping Rain Water ← Hard
- [ ] [124] Binary Tree Maximum Path Sum ← Hard
- [ ] [72] Edit Distance ← Hard
- No hints for 35 min. After 35 min: read approach, implement, understand.

**System Design (1.5 hrs)**
- [ ] Design a Distributed Cache (like Redis):
  - [ ] Data partitioning — consistent hashing
  - [ ] Eviction policies — LRU, LFU, TTL-based
  - [ ] Replication for high availability
  - [ ] Cache stampede problem — how to prevent it (mutex lock, probabilistic early expiry)
  - [ ] You built caching in your project — use that knowledge!
- [ ] 45-min timer

**Review (0.5 hr)**
- [ ] Which of the 3 hard problems could you solve cleanly? Write your weak spots.

---

### Day 55 — Saturday | Full Mock Interview Simulation
**This is as close to a real interview as you can get. Set up properly:**
- Use a blank code editor (no autocomplete, no hints)
- Set a timer
- Speak everything out loud (approach, trade-offs, code narration, complexity)
- Do NOT pause to look anything up

**Round 1 — DSA (45 min timer):**
- [ ] Problem 1 (Medium): [739] Daily Temperatures — explain approach first, then code
- [ ] Problem 2 (Medium): [46] Permutations — explain approach first, then code
- After: critique yourself — did you communicate well? Did you get stuck silently?

**Round 2 — DSA (45 min timer):**
- [ ] Problem 1 (Medium): [143] Reorder List
- [ ] Problem 2 (Hard): [23] Merge k Sorted Lists
- After: what would you do differently?

**Round 3 — System Design (45 min timer):**
- [ ] Design a system you haven't prepared specifically (ask a friend/family to name any app)
- Apply the framework: Requirements → High-level design → Deep dive → Bottlenecks

**Round 4 — Behavioral (30 min):**
- [ ] "Tell me about yourself"
- [ ] Pick 2 random behavioral questions from your list and answer them
- [ ] "Do you have any questions for us?" — prepare 3 smart questions about engineering culture, tech stack, scaling challenges

**End of Day Review:**
- [ ] What went well in the mock?
- [ ] What would an interviewer have marked me down for?
- [ ] What's the one thing to fix before applications start?

---

### Day 56 — Sunday | Final Day — Ready to Apply
**Final Review (2 hrs)**
- [ ] Read through all 6 behavioral stories — are they sharp and specific?
- [ ] Review the systems you designed — URL shortener, WhatsApp, Uber, Twitter, Netflix, Amazon, Rate Limiter, Distributed Cache
- [ ] Review your resume — do you understand every line well enough to be asked about it for 20 minutes?
- [ ] Review INTERVIEW_PREP.md and INTERVIEW_PREP_2.md and INTERVIEW_PREP_SLAKE.md — skim the answers

**Weak Spot Polish (2 hrs)**
- [ ] Re-solve your 3 weakest problems from this week — one more time, from memory
- [ ] Re-read the Java concept you felt least confident about

**Application Prep (1 hr)**
- [ ] Update LinkedIn — headline, about section, projects
- [ ] Prepare company research template: for each company you apply to, research: tech stack, scale, engineering blog, recent news
- [ ] Target list: write down 15–20 companies to apply to in Week 1 of applying

**Final Check — You're Ready When:**
- [ ] Can solve any Easy in < 10 min
- [ ] Can solve 65–70% of Mediums in < 25 min
- [ ] Can attempt Hard problems and get partial credit
- [ ] Can design 8+ systems without notes
- [ ] Can talk about your projects for 20+ min in technical depth
- [ ] Have 6+ behavioral stories ready in STAR format
- [ ] Java internals: HashMap, GC, `@Transactional`, threading — confident

---

## Problem Count Tracker

| Week | Target | Actual | Check |
|---|---|---|---|
| Week 1 | 35+ | ___ | [ ] |
| Week 2 | 55+ | ___ | [ ] |
| Week 3 | 85+ | ___ | [ ] |
| Week 4 | 130+ | ___ | [ ] |
| Week 5 | 150+ | ___ | [ ] |
| Week 6 | 165+ | ___ | [ ] |
| Week 7 | 185+ | ___ | [ ] |
| Week 8 | 200+ | ___ | [ ] |

---

## System Designs Completed

- [ ] URL Shortener (Day 27)
- [ ] Notification System (Day 34 + Day 49)
- [ ] WhatsApp / Chat System (Day 35 + Day 41)
- [ ] Uber / Ride-sharing (Day 48)
- [ ] Twitter / News Feed (Day 50)
- [ ] Netflix / Video Streaming (Day 51)
- [ ] Amazon / E-commerce (Day 52)
- [ ] Rate Limiter (Day 53)
- [ ] Distributed Cache (Day 54)
- [ ] Wild card (Day 55 mock)

---

## Behavioral Stories Ready

- [ ] Tell me about yourself (2-min version)
- [ ] Challenging technical problem → LRU OOM bug / cache race condition
- [ ] System designed from scratch → ChannelKart Reports Service / slake-reporting
- [ ] Performance improvement → Lambda PDF offload / streaming exports
- [ ] Production incident → tenant data leak from cache race
- [ ] Trade-off decision → monolith vs microservices / polling vs WebSocket
- [ ] Taking ownership → built both projects with no prior codebase
- [ ] Learning quickly → picked up Quarkus + Java 21 for slake-reporting
- [ ] Disagreement with decision → prepare one honest story
- [ ] Where do you see yourself in 3 years → prepared and confident

---

*Good luck. Your projects are genuinely impressive — most candidates don't have production systems of this complexity. The DSA is learnable. The system design you already understand from experience. Go get it.*
