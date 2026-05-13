// ============================================================
// checklist-data.js — All 56 days of interview prep data
// Extracted from DAILY_CHECKLIST.md
// ============================================================

const CHECKLIST_DATA = [
  // ─── WEEK 1 ─────────────────────────────────────────────
  {
    day: 1,
    title: "Arrays + HashMap Intro",
    week: 1,
    theme: "Build speed on Easy. Every Medium is a combination of Easy patterns. This week is about instinct, not difficulty.",
    dsa: [
      { id: "d1-1", number: 1,   title: "Two Sum",                          url: "https://leetcode.com/problems/two-sum/",                                       difficulty: "Easy",   note: "brute force first, then HashMap" },
      { id: "d1-2", number: 121, title: "Best Time to Buy and Sell Stock",  url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",              difficulty: "Easy",   note: "" },
      { id: "d1-3", number: 217, title: "Contains Duplicate",               url: "https://leetcode.com/problems/contains-duplicate/",                            difficulty: "Easy",   note: "" },
      { id: "d1-4", number: 242, title: "Valid Anagram",                    url: "https://leetcode.com/problems/valid-anagram/",                                 difficulty: "Easy",   note: "sort approach, then HashMap approach" },
      { id: "d1-5", number: 387, title: "First Unique Character in a String", url: "https://leetcode.com/problems/first-unique-character-in-a-string/",        difficulty: "Easy",   note: "" },
    ],
    theory: [
      { id: "t1-1", text: "Read: How Java HashMap works internally (hashing, buckets, chaining)" },
      { id: "t1-2", text: "Read: What happens when load factor exceeds 0.75" },
      { id: "t1-3", text: "Write down: What is the difference between HashMap, LinkedHashMap, TreeMap" },
    ],
    review: [
      { id: "r1-1", text: "Re-read your solutions from today — could you make any cleaner?" },
      { id: "r1-2", text: "Note: which problem felt hardest and why" },
    ],
  },
  {
    day: 2,
    title: "Arrays Continued",
    week: 1,
    theme: "Build speed on Easy. Every Medium is a combination of Easy patterns. This week is about instinct, not difficulty.",
    dsa: [
      { id: "d2-1", number: 53,  title: "Maximum Subarray",      url: "https://leetcode.com/problems/maximum-subarray/",       difficulty: "Medium", note: "learn Kadane's Algorithm" },
      { id: "d2-2", number: 283, title: "Move Zeroes",           url: "https://leetcode.com/problems/move-zeroes/",            difficulty: "Easy",   note: "" },
      { id: "d2-3", number: 88,  title: "Merge Sorted Array",    url: "https://leetcode.com/problems/merge-sorted-array/",     difficulty: "Easy",   note: "" },
      { id: "d2-4", number: 66,  title: "Plus One",              url: "https://leetcode.com/problems/plus-one/",               difficulty: "Easy",   note: "" },
      { id: "d2-5", number: 344, title: "Reverse String",        url: "https://leetcode.com/problems/reverse-string/",         difficulty: "Easy",   note: "" },
    ],
    theory: [
      { id: "t2-1", text: "Read: Big O notation — O(1), O(n), O(n²), O(log n), O(n log n)" },
      { id: "t2-2", text: "Practice: Calculate time and space complexity for all 5 problems you solved today" },
      { id: "t2-3", text: "Read: ArrayList vs LinkedList — when to use which in Java" },
    ],
    review: [
      { id: "r2-1", text: "Kadane's Algorithm — write it from memory on paper" },
      { id: "r2-2", text: "Can you explain it without looking at notes?" },
    ],
  },
  {
    day: 3,
    title: "Strings + HashMap Patterns",
    week: 1,
    theme: "Build speed on Easy. Every Medium is a combination of Easy patterns. This week is about instinct, not difficulty.",
    dsa: [
      { id: "d3-1", number: 383, title: "Ransom Note",             url: "https://leetcode.com/problems/ransom-note/",              difficulty: "Easy",   note: "" },
      { id: "d3-2", number: 205, title: "Isomorphic Strings",      url: "https://leetcode.com/problems/isomorphic-strings/",       difficulty: "Easy",   note: "" },
      { id: "d3-3", number: 290, title: "Word Pattern",            url: "https://leetcode.com/problems/word-pattern/",             difficulty: "Easy",   note: "" },
      { id: "d3-4", number: 9,   title: "Palindrome Number",       url: "https://leetcode.com/problems/palindrome-number/",        difficulty: "Easy",   note: "no string conversion" },
      { id: "d3-5", number: 14,  title: "Longest Common Prefix",   url: "https://leetcode.com/problems/longest-common-prefix/",    difficulty: "Easy",   note: "" },
    ],
    theory: [
      { id: "t3-1", text: "Read: Java String immutability — why Strings are immutable, StringBuffer vs StringBuilder" },
      { id: "t3-2", text: "Read: char vs Character in Java, ASCII values of 'a'–'z' (97–122)" },
      { id: "t3-3", text: "Practice: Write a method to check if two strings are anagrams — 3 different ways" },
    ],
    review: [
      { id: "r3-1", text: "Isomorphic Strings — can you explain the bijection concept clearly?" },
    ],
  },
  {
    day: 4,
    title: "Array Tricks",
    week: 1,
    theme: "Build speed on Easy. Every Medium is a combination of Easy patterns. This week is about instinct, not difficulty.",
    dsa: [
      { id: "d4-1", number: 125, title: "Valid Palindrome",                      url: "https://leetcode.com/problems/valid-palindrome/",                           difficulty: "Easy",   note: "" },
      { id: "d4-2", number: 13,  title: "Roman to Integer",                      url: "https://leetcode.com/problems/roman-to-integer/",                           difficulty: "Easy",   note: "" },
      { id: "d4-3", number: 448, title: "Find All Numbers Disappeared in an Array", url: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/", difficulty: "Easy",   note: "index marking trick" },
      { id: "d4-4", number: 136, title: "Single Number",                          url: "https://leetcode.com/problems/single-number/",                              difficulty: "Easy",   note: "XOR trick" },
      { id: "d4-5", number: 350, title: "Intersection of Two Arrays II",          url: "https://leetcode.com/problems/intersection-of-two-arrays-ii/",              difficulty: "Easy",   note: "" },
    ],
    theory: [
      { id: "t4-1", text: "Read: Java Arrays.sort() — what algorithm does it use (Dual-Pivot QuickSort for primitives, TimSort for objects)" },
      { id: "t4-2", text: "Read: When to use int[] vs Integer[] vs ArrayList<Integer> — memory implications" },
      { id: "t4-3", text: "SQL: Write 5 GROUP BY queries with HAVING clause" },
    ],
    review: [
      { id: "r4-1", text: "XOR trick — explain why a XOR a = 0 and a XOR 0 = a" },
      { id: "r4-2", text: "Index marking trick from problem 448 — write it from memory" },
    ],
  },
  {
    day: 5,
    title: "First Mediums",
    week: 1,
    theme: "Build speed on Easy. Every Medium is a combination of Easy patterns. This week is about instinct, not difficulty.",
    dsa: [
      { id: "d5-1", number: 49,  title: "Group Anagrams",         url: "https://leetcode.com/problems/group-anagrams/",          difficulty: "Medium", note: "First real Medium — take 25 min, then look if stuck" },
      { id: "d5-2", number: 347, title: "Top K Frequent Elements", url: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "Medium", note: "HashMap + sort approach" },
      { id: "d5-3", number: 70,  title: "Climbing Stairs",         url: "https://leetcode.com/problems/climbing-stairs/",         difficulty: "Easy",   note: "notice it's Fibonacci" },
      { id: "d5-4", number: 169, title: "Majority Element",        url: "https://leetcode.com/problems/majority-element/",        difficulty: "Easy",   note: "Boyer-Moore voting" },
      { id: "d5-5", number: 268, title: "Missing Number",          url: "https://leetcode.com/problems/missing-number/",          difficulty: "Easy",   note: "Gauss formula OR XOR" },
    ],
    theory: [
      { id: "t5-1", text: "Read: Java PriorityQueue (Min-Heap) — how to use it, how to reverse for Max-Heap" },
      { id: "t5-2", text: "Read: Comparable vs Comparator in Java" },
      { id: "t5-3", text: "Read: lambda expressions for custom sorting: list.sort((a, b) -> a - b)" },
    ],
    review: [
      { id: "r5-1", text: "Group Anagrams — could you solve it in one pass?" },
      { id: "r5-2", text: "Top K Frequent — note: can also solve with bucket sort in O(n)" },
    ],
  },
  {
    day: 6,
    title: "Consolidation + Extra Problems",
    week: 1,
    theme: "Build speed on Easy. Every Medium is a combination of Easy patterns. This week is about instinct, not difficulty.",
    dsa: [
      { id: "d6-1", number: 167, title: "Two Sum II — Sorted Array",              url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",       difficulty: "Medium", note: "preview next week's two-pointer" },
      { id: "d6-2", number: 26,  title: "Remove Duplicates from Sorted Array",    url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",    difficulty: "Easy",   note: "" },
      { id: "d6-3", number: 118, title: "Pascal's Triangle",                      url: "https://leetcode.com/problems/pascals-triangle/",                       difficulty: "Easy",   note: "" },
      { id: "d6-4", number: 121, title: "Best Time to Buy/Sell Stock",            url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",        difficulty: "Easy",   note: "solve again from memory (no peeking)" },
      { id: "d6-5", number: 438, title: "Find All Anagrams in a String",          url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",          difficulty: "Medium", note: "sliding window preview" },
      { id: "d6-6", number: 567, title: "Permutation in String",                  url: "https://leetcode.com/problems/permutation-in-string/",                  difficulty: "Medium", note: "sliding window preview" },
    ],
    theory: [
      { id: "t6-1", text: "Watch: Gaurav Sen — 'Introduction to System Design' (YouTube)" },
      { id: "t6-2", text: "Read: What is a Load Balancer — L4 vs L7, round robin vs least connections" },
      { id: "t6-3", text: "Write: 5 things you'd consider when designing any system" },
    ],
    review: [
      { id: "r6-1", text: "Week 1 problem count: ___ (target: 35+)" },
      { id: "r6-2", text: "List every pattern you learned this week" },
      { id: "r6-3", text: "Which 2 problems will you re-solve next week as warm-up?" },
    ],
  },
  {
    day: 7,
    title: "Review + Behavioral",
    week: 1,
    theme: "Build speed on Easy. Every Medium is a combination of Easy patterns. This week is about instinct, not difficulty.",
    dsa: [
      { id: "d7-1", number: 1,   title: "Two Sum (timed re-solve)",                url: "https://leetcode.com/problems/two-sum/",               difficulty: "Easy",   note: "timed, 5 minutes, from scratch, no hints" },
      { id: "d7-2", number: 53,  title: "Maximum Subarray (timed re-solve)",        url: "https://leetcode.com/problems/maximum-subarray/",      difficulty: "Medium", note: "timed, 8 minutes" },
      { id: "d7-3", number: 242, title: "Valid Anagram (timed re-solve)",           url: "https://leetcode.com/problems/valid-anagram/",         difficulty: "Easy",   note: "explain approach out loud as you code" },
      { id: "d7-4", number: 49,  title: "Group Anagrams (timed re-solve)",          url: "https://leetcode.com/problems/group-anagrams/",        difficulty: "Medium", note: "explain time/space complexity at the end" },
    ],
    theory: [
      { id: "t7-1", text: "Write out your 'Tell me about yourself' (2–3 min version) — include your projects" },
      { id: "t7-2", text: "Prepare STAR story: 'Describe a challenging technical problem you solved'" },
      { id: "t7-3", text: "Practice saying it out loud once (record yourself on phone)" },
    ],
    review: [
      { id: "r7-1", text: "Flashcard drill: HashMap internal working — can you explain it in 90 seconds?" },
      { id: "r7-2", text: "Write from memory: How to detect duplicates in an array using 3 different approaches" },
      { id: "r7-3", text: "Problems solved this week: ___ | Confidence on Easy problems (1–10): ___" },
    ],
  },

  // ─── WEEK 2 ─────────────────────────────────────────────
  {
    day: 8,
    title: "Two Pointers",
    week: 2,
    theme: "Two Pointers, Sliding Window, and Binary Search appear in ~30% of all Medium problems. After this week, a large chunk of Medium becomes approachable.",
    dsa: [
      { id: "d8-1", number: 125, title: "Valid Palindrome",    url: "https://leetcode.com/problems/valid-palindrome/",                    difficulty: "Easy",   note: "re-solve using two pointers from memory (warm-up)" },
      { id: "d8-2", number: 167, title: "Two Sum II",          url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",    difficulty: "Medium", note: "" },
      { id: "d8-3", number: 15,  title: "3Sum",                url: "https://leetcode.com/problems/3sum/",                                difficulty: "Medium", note: "Important Medium — take full 25 min, understand sort + skip duplicates logic" },
    ],
    theory: [
      { id: "t8-1", text: "Read: DBMS — What is an index? B-Tree index structure, why B-Tree not Binary Tree" },
      { id: "t8-2", text: "Read: Clustered vs Non-clustered index, composite indexes, when index hurts performance" },
      { id: "t8-3", text: "SQL: Write a query using JOIN + WHERE + ORDER BY + LIMIT" },
    ],
    review: [
      { id: "r8-1", text: "3Sum — trace through the algorithm with input [-1, 0, 1, 2, -1, -4] on paper" },
    ],
  },
  {
    day: 9,
    title: "Two Pointers Continued",
    week: 2,
    theme: "Two Pointers, Sliding Window, and Binary Search appear in ~30% of all Medium problems. After this week, a large chunk of Medium becomes approachable.",
    dsa: [
      { id: "d9-1", number: 11,  title: "Container With Most Water",    url: "https://leetcode.com/problems/container-with-most-water/",    difficulty: "Medium", note: "why does greedy two-pointer work here?" },
      { id: "d9-2", number: 42,  title: "Trapping Rain Water",          url: "https://leetcode.com/problems/trapping-rain-water/",          difficulty: "Hard",   note: "understand the two-pointer approach conceptually even if you can't code it fully" },
      { id: "d9-3", number: 977, title: "Squares of a Sorted Array",    url: "https://leetcode.com/problems/squares-of-a-sorted-array/",    difficulty: "Easy",   note: "two pointers from both ends" },
    ],
    theory: [
      { id: "t9-1", text: "Read: SQL — Transactions, ACID properties (Atomicity, Consistency, Isolation, Durability)" },
      { id: "t9-2", text: "Read: Isolation levels — READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE" },
      { id: "t9-3", text: "Read: What is a dirty read? phantom read? non-repeatable read?" },
    ],
    review: [
      { id: "r9-1", text: "Container With Most Water — why do we move the shorter pointer, not the taller one?" },
    ],
  },
  {
    day: 10,
    title: "Sliding Window",
    week: 2,
    theme: "Two Pointers, Sliding Window, and Binary Search appear in ~30% of all Medium problems. After this week, a large chunk of Medium becomes approachable.",
    dsa: [
      { id: "d10-1", number: 643, title: "Maximum Average Subarray I",                    url: "https://leetcode.com/problems/maximum-average-subarray-i/",                  difficulty: "Easy",   note: "fixed window warm-up" },
      { id: "d10-2", number: 3,   title: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium", note: "Classic Medium — must know" },
      { id: "d10-3", number: 209, title: "Minimum Size Subarray Sum",                     url: "https://leetcode.com/problems/minimum-size-subarray-sum/",                   difficulty: "Medium", note: "" },
    ],
    theory: [
      { id: "t10-1", text: "Read: SQL — N+1 query problem (critical — asked often given Spring/JPA background)" },
      { id: "t10-2", text: "Read: How to fix N+1 in Spring JPA: @EntityGraph, JOIN FETCH, @BatchSize" },
      { id: "t10-3", text: "Write: An example of N+1 happening and how you'd detect it (check Hibernate SQL logs)" },
    ],
    review: [
      { id: "r10-1", text: "Sliding window template: write the generic expandable window template from memory" },
    ],
  },
  {
    day: 11,
    title: "Sliding Window Continued",
    week: 2,
    theme: "Two Pointers, Sliding Window, and Binary Search appear in ~30% of all Medium problems. After this week, a large chunk of Medium becomes approachable.",
    dsa: [
      { id: "d11-1", number: 424, title: "Longest Repeating Character Replacement", url: "https://leetcode.com/problems/longest-repeating-character-replacement/",  difficulty: "Medium", note: "tricky, trace through carefully" },
      { id: "d11-2", number: 567, title: "Permutation in String",                   url: "https://leetcode.com/problems/permutation-in-string/",                    difficulty: "Medium", note: "fixed window with frequency count" },
      { id: "d11-3", number: 438, title: "Find All Anagrams in a String",           url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",            difficulty: "Medium", note: "" },
    ],
    theory: [
      { id: "t11-1", text: "Read: Java @Transactional — what it does at the Spring AOP level" },
      { id: "t11-2", text: "Read: @Transactional propagation — REQUIRED vs REQUIRES_NEW vs NESTED" },
      { id: "t11-3", text: "Read: What happens if a @Transactional method calls another @Transactional method in the same class? (proxy bypass problem)" },
    ],
    review: [
      { id: "r11-1", text: "Sliding window for character frequency — when is a fixed window better than a dynamic window?" },
    ],
  },
  {
    day: 12,
    title: "Binary Search",
    week: 2,
    theme: "Two Pointers, Sliding Window, and Binary Search appear in ~30% of all Medium problems. After this week, a large chunk of Medium becomes approachable.",
    dsa: [
      { id: "d12-1", number: 704, title: "Binary Search",                        url: "https://leetcode.com/problems/binary-search/",                          difficulty: "Easy",   note: "implement both iterative and recursive" },
      { id: "d12-2", number: 35,  title: "Search Insert Position",               url: "https://leetcode.com/problems/search-insert-position/",                 difficulty: "Easy",   note: "" },
      { id: "d12-3", number: 278, title: "First Bad Version",                    url: "https://leetcode.com/problems/first-bad-version/",                      difficulty: "Easy",   note: "" },
      { id: "d12-4", number: 153, title: "Find Minimum in Rotated Sorted Array", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",   difficulty: "Medium", note: "" },
    ],
    theory: [
      { id: "t12-1", text: "Read: OS — Process vs Thread, context switching overhead" },
      { id: "t12-2", text: "Read: Java thread lifecycle — NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED" },
      { id: "t12-3", text: "Read: synchronized keyword — object lock vs class lock" },
    ],
    review: [
      { id: "r12-1", text: "Binary search template — write from memory with 'left <= right' vs 'left < right' variants" },
    ],
  },
  {
    day: 13,
    title: "Binary Search on Answer Space + Review",
    week: 2,
    theme: "Two Pointers, Sliding Window, and Binary Search appear in ~30% of all Medium problems. After this week, a large chunk of Medium becomes approachable.",
    dsa: [
      { id: "d13-1", number: 33,   title: "Search in Rotated Sorted Array",         url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",          difficulty: "Medium", note: "Must-know Medium — 2 binary searches or 1?" },
      { id: "d13-2", number: 74,   title: "Search a 2D Matrix",                     url: "https://leetcode.com/problems/search-a-2d-matrix/",                      difficulty: "Medium", note: "treat 2D as 1D" },
      { id: "d13-3", number: 875,  title: "Koko Eating Bananas",                    url: "https://leetcode.com/problems/koko-eating-bananas/",                     difficulty: "Medium", note: "binary search on answer space" },
      { id: "d13-4", number: 1011, title: "Capacity to Ship Packages Within D Days", url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", difficulty: "Medium", note: "same pattern as Koko" },
      { id: "d13-5", number: 3,    title: "Longest Substring Without Repeating Chars (re-solve)", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium", note: "from memory, timed: 15 min" },
    ],
    theory: [
      { id: "t13-1", text: "Study: What is a Cache? Cache-aside vs Write-through vs Write-back vs Write-around" },
      { id: "t13-2", text: "Study: Redis data structures — String, List, Set, Sorted Set, Hash — when to use which" },
      { id: "t13-3", text: "Write out: How you used EHCache + Redis in your reports project (practice explaining it)" },
    ],
    review: [
      { id: "r13-1", text: "Week 2 problem count: ___ (target: 55+)" },
      { id: "r13-2", text: "Can you identify a sliding window problem vs a two-pointer problem by reading it?" },
    ],
  },
  {
    day: 14,
    title: "Review + Mock",
    week: 2,
    theme: "Two Pointers, Sliding Window, and Binary Search appear in ~30% of all Medium problems. After this week, a large chunk of Medium becomes approachable.",
    dsa: [
      { id: "d14-1", number: 15,  title: "3Sum (timed)",                               url: "https://leetcode.com/problems/3sum/",                                                difficulty: "Medium", note: "25 min, no hints" },
      { id: "d14-2", number: 3,   title: "Longest Substring (timed)",                  url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",     difficulty: "Medium", note: "15 min, no hints" },
      { id: "d14-3", number: 33,  title: "Search in Rotated Array (timed)",            url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",                     difficulty: "Medium", note: "25 min, no hints" },
    ],
    theory: [
      { id: "t14-1", text: "Prepare STAR story: 'Tell me about a time you improved system performance' → Lambda PDF offloading OR Kafka async pipeline" },
      { id: "t14-2", text: "Practice out loud once" },
      { id: "t14-3", text: "volatile vs synchronized vs AtomicInteger — write one-line difference between each" },
    ],
    review: [
      { id: "r14-1", text: "What is a race condition? Give an example from your own code (LOB cache race condition)" },
      { id: "r14-2", text: "Problems solved this week: ___ | Can I identify: two-pointer / sliding window / binary search on sight? (Y/N)" },
    ],
  },

  // ─── WEEK 3 ─────────────────────────────────────────────
  {
    day: 15,
    title: "Linked Lists Basics",
    week: 3,
    theme: "Pointer manipulation and stack-based parsing. LRU Cache this week is the single most important problem of Month 1.",
    dsa: [
      { id: "d15-1", number: 206, title: "Reverse Linked List",    url: "https://leetcode.com/problems/reverse-linked-list/",    difficulty: "Easy",   note: "iterative AND recursive (both)" },
      { id: "d15-2", number: 21,  title: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "Easy",   note: "" },
      { id: "d15-3", number: 141, title: "Linked List Cycle",      url: "https://leetcode.com/problems/linked-list-cycle/",      difficulty: "Easy",   note: "Floyd's tortoise and hare algorithm" },
    ],
    theory: [
      { id: "t15-1", text: "Read: Java volatile keyword — what it guarantees (visibility, not atomicity)" },
      { id: "t15-2", text: "Read: Java Memory Model — happens-before relationship" },
      { id: "t15-3", text: "Read: ThreadLocal in Java — you use this for LOB routing in your project. Articulate it precisely." },
    ],
    review: [
      { id: "r15-1", text: "Floyd's algorithm — WHY does slow + fast pointer meeting prove a cycle? Write the proof in 3 sentences." },
    ],
  },
  {
    day: 16,
    title: "Linked Lists Intermediate",
    week: 3,
    theme: "Pointer manipulation and stack-based parsing. LRU Cache this week is the single most important problem of Month 1.",
    dsa: [
      { id: "d16-1", number: 142, title: "Linked List Cycle II",           url: "https://leetcode.com/problems/linked-list-cycle-ii/",             difficulty: "Medium", note: "find the cycle start, understand the math" },
      { id: "d16-2", number: 19,  title: "Remove Nth Node From End of List", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", difficulty: "Medium", note: "two-pointer gap technique" },
      { id: "d16-3", number: 876, title: "Middle of the Linked List",      url: "https://leetcode.com/problems/middle-of-the-linked-list/",         difficulty: "Easy",   note: "fast/slow pointer" },
    ],
    theory: [
      { id: "t16-1", text: "Read: Networking — TCP vs UDP, 3-way handshake" },
      { id: "t16-2", text: "Read: HTTP/1.1 vs HTTP/2 vs HTTP/3 — key differences (multiplexing, header compression)" },
      { id: "t16-3", text: "Read: What happens when you type a URL in a browser — full DNS + TCP + HTTP flow" },
    ],
    review: [
      { id: "r16-1", text: "Cycle II — trace through the math: if cycle start is k steps from head, why does re-starting one pointer from head find the cycle start?" },
    ],
  },
  {
    day: 17,
    title: "Linked Lists Hard + LRU Cache",
    week: 3,
    theme: "Pointer manipulation and stack-based parsing. LRU Cache this week is the single most important problem of Month 1.",
    dsa: [
      { id: "d17-1", number: 143, title: "Reorder List", url: "https://leetcode.com/problems/reorder-list/", difficulty: "Medium", note: "split + reverse + merge (3 linked list operations in one)" },
      { id: "d17-2", number: 146, title: "LRU Cache",    url: "https://leetcode.com/problems/lru-cache/",    difficulty: "Medium", note: "most important problem this week — HashMap + Doubly Linked List. Do NOT look at solutions for 35 min." },
    ],
    theory: [
      { id: "t17-1", text: "Read: REST vs GraphQL — when to use each" },
      { id: "t17-2", text: "Read: HTTP status codes — 200, 201, 204, 301, 400, 401, 403, 404, 409, 422, 500, 503" },
      { id: "t17-3", text: "Read: Idempotency — what makes an HTTP method idempotent? (GET, PUT, DELETE = yes; POST = no)" },
    ],
    review: [
      { id: "r17-1", text: "LRU Cache — can you explain why you need BOTH a HashMap AND a doubly linked list?" },
    ],
  },
  {
    day: 18,
    title: "Stacks",
    week: 3,
    theme: "Pointer manipulation and stack-based parsing. LRU Cache this week is the single most important problem of Month 1.",
    dsa: [
      { id: "d18-1", number: 20,  title: "Valid Parentheses",              url: "https://leetcode.com/problems/valid-parentheses/",              difficulty: "Easy",   note: "stack warm-up" },
      { id: "d18-2", number: 155, title: "Min Stack",                      url: "https://leetcode.com/problems/min-stack/",                      difficulty: "Medium", note: "extra stack for tracking minimums" },
      { id: "d18-3", number: 150, title: "Evaluate Reverse Polish Notation", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", difficulty: "Medium", note: "stack-based evaluation" },
      { id: "d18-4", number: 496, title: "Next Greater Element I",         url: "https://leetcode.com/problems/next-greater-element-i/",         difficulty: "Easy",   note: "" },
    ],
    theory: [
      { id: "t18-1", text: "Read: Java GC — Young Generation (Eden + Survivor), Old Generation, Metaspace" },
      { id: "t18-2", text: "Read: GC types — Serial, Parallel, G1GC (default since Java 9), ZGC" },
      { id: "t18-3", text: "Read: When does a StackOverflowError happen? When does OutOfMemoryError happen?" },
    ],
    review: [
      { id: "r18-1", text: "Min Stack — what's the time complexity of getMin()? Why is it O(1)?" },
    ],
  },
  {
    day: 19,
    title: "Monotonic Stack",
    week: 3,
    theme: "Pointer manipulation and stack-based parsing. LRU Cache this week is the single most important problem of Month 1.",
    dsa: [
      { id: "d19-1", number: 739, title: "Daily Temperatures",    url: "https://leetcode.com/problems/daily-temperatures/",    difficulty: "Medium", note: "monotonic decreasing stack pattern" },
      { id: "d19-2", number: 853, title: "Car Fleet",             url: "https://leetcode.com/problems/car-fleet/",             difficulty: "Medium", note: "stack with logic" },
      { id: "d19-3", number: 503, title: "Next Greater Element II", url: "https://leetcode.com/problems/next-greater-element-ii/", difficulty: "Medium", note: "circular array with stack" },
    ],
    theory: [
      { id: "t19-1", text: "Read: Networking — HTTPS, TLS handshake, SSL certificate validation" },
      { id: "t19-2", text: "Read: CORS — how it works, preflight request, allowed headers/origins" },
      { id: "t19-3", text: "Write: How does your CustomizedCorsFilter work — explain it as you would in an interview" },
    ],
    review: [
      { id: "r19-1", text: "Monotonic stack pattern: 'I use a stack that stays decreasing/increasing and pop when I find a larger/smaller element' — memorize this sentence" },
    ],
  },
  {
    day: 20,
    title: "Hard Stack Problems + Queue",
    week: 3,
    theme: "Pointer manipulation and stack-based parsing. LRU Cache this week is the single most important problem of Month 1.",
    dsa: [
      { id: "d20-1", number: 84,  title: "Largest Rectangle in Histogram", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/",   difficulty: "Hard",   note: "monotonic stack, trace through carefully" },
      { id: "d20-2", number: 239, title: "Sliding Window Maximum",         url: "https://leetcode.com/problems/sliding-window-maximum/",           difficulty: "Hard",   note: "deque (monotonic queue) pattern" },
      { id: "d20-3", number: 23,  title: "Merge k Sorted Lists",           url: "https://leetcode.com/problems/merge-k-sorted-lists/",             difficulty: "Hard",   note: "Min-Heap / PriorityQueue approach" },
      { id: "d20-4", number: 232, title: "Implement Queue using Stacks",   url: "https://leetcode.com/problems/implement-queue-using-stacks/",     difficulty: "Easy",   note: "understand amortized O(1)" },
      { id: "d20-5", number: 146, title: "LRU Cache (re-solve)",           url: "https://leetcode.com/problems/lru-cache/",                        difficulty: "Medium", note: "can you do it in 20 minutes now?" },
    ],
    theory: [
      { id: "t20-1", text: "Study: Message Queue architecture — producer, consumer, broker, topic, partition" },
      { id: "t20-2", text: "Study: Kafka specifically — how partitions work, consumer groups, offset management, at-least-once vs exactly-once" },
      { id: "t20-3", text: "Write: How your Kafka setup in the reports service works — explain it as a system design answer" },
    ],
    review: [
      { id: "r20-1", text: "Week 3 count: ___ (target: 85+)" },
      { id: "r20-2", text: "LRU Cache — write the full implementation from memory on paper" },
    ],
  },
  {
    day: 21,
    title: "Review + Behavioral",
    week: 3,
    theme: "Pointer manipulation and stack-based parsing. LRU Cache this week is the single most important problem of Month 1.",
    dsa: [
      { id: "d21-1", number: 206, title: "Reverse Linked List (timed)",   url: "https://leetcode.com/problems/reverse-linked-list/",  difficulty: "Easy",   note: "8 min, iterative + recursive" },
      { id: "d21-2", number: 155, title: "Min Stack (timed)",             url: "https://leetcode.com/problems/min-stack/",            difficulty: "Medium", note: "15 min" },
      { id: "d21-3", number: 739, title: "Daily Temperatures (timed)",    url: "https://leetcode.com/problems/daily-temperatures/",   difficulty: "Medium", note: "20 min" },
      { id: "d21-4", number: 146, title: "LRU Cache (timed)",             url: "https://leetcode.com/problems/lru-cache/",            difficulty: "Medium", note: "25 min (target: no hints needed now)" },
    ],
    theory: [
      { id: "t21-1", text: "Prepare STAR story: 'Tell me about a time you took ownership of something'" },
      { id: "t21-2", text: "Practice: 'What is your biggest technical weakness?' — be honest, prepare a growth-oriented answer" },
    ],
    review: [
      { id: "r21-1", text: "HashMap internal working — say it out loud in 90 seconds" },
      { id: "r21-2", text: "ThreadLocal — what it does, when to use it, memory leak risk if not cleaned up" },
      { id: "r21-3", text: "LRU Cache — can I implement it from scratch without hints? (Y/N) | Monotonic stack pattern — understood? (Y/N)" },
    ],
  },

  // ─── WEEK 4 ─────────────────────────────────────────────
  {
    day: 22,
    title: "Tree DFS Basics",
    week: 4,
    theme: "Trees are the single most-tested topic at MNCs. Every problem here has a 30–50% chance of appearing in your actual interviews.",
    dsa: [
      { id: "d22-1", number: 226, title: "Invert Binary Tree",          url: "https://leetcode.com/problems/invert-binary-tree/",         difficulty: "Easy",   note: "recursive and iterative" },
      { id: "d22-2", number: 104, title: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "Easy",   note: "recursive and iterative (BFS)" },
      { id: "d22-3", number: 543, title: "Diameter of Binary Tree",     url: "https://leetcode.com/problems/diameter-of-binary-tree/",    difficulty: "Easy",   note: "how do you pass info up recursively?" },
    ],
    theory: [
      { id: "t22-1", text: "Read: Spring IoC container — what is Inversion of Control, what is Dependency Injection" },
      { id: "t22-2", text: "Read: Spring bean lifecycle — @PostConstruct, @PreDestroy, InitializingBean" },
      { id: "t22-3", text: "Read: @Component vs @Service vs @Repository vs @Controller — real differences" },
    ],
    review: [
      { id: "r22-1", text: "Diameter — write the recursive helper that returns height and updates max diameter as a side effect" },
    ],
  },
  {
    day: 23,
    title: "Tree DFS Continued",
    week: 4,
    theme: "Trees are the single most-tested topic at MNCs. Every problem here has a 30–50% chance of appearing in your actual interviews.",
    dsa: [
      { id: "d23-1", number: 110, title: "Balanced Binary Tree",    url: "https://leetcode.com/problems/balanced-binary-tree/",    difficulty: "Easy",   note: "return -1 as sentinel for unbalanced" },
      { id: "d23-2", number: 100, title: "Same Tree",               url: "https://leetcode.com/problems/same-tree/",               difficulty: "Easy",   note: "" },
      { id: "d23-3", number: 572, title: "Subtree of Another Tree", url: "https://leetcode.com/problems/subtree-of-another-tree/", difficulty: "Easy",   note: "how is this different from Same Tree?" },
      { id: "d23-4", number: 112, title: "Path Sum",                url: "https://leetcode.com/problems/path-sum/",                difficulty: "Easy",   note: "" },
    ],
    theory: [
      { id: "t23-1", text: "Read: Spring Data JPA — how @Repository works, how Spring generates implementation at runtime" },
      { id: "t23-2", text: "Read: Lazy vs Eager loading — FetchType.LAZY vs FetchType.EAGER, LazyInitializationException" },
      { id: "t23-3", text: "Read: @OneToMany, @ManyToOne, @ManyToMany — which side owns the relationship?" },
    ],
    review: [
      { id: "r23-1", text: "Subtree of another tree — what's the time complexity? O(m×n)? Can you do better?" },
    ],
  },
  {
    day: 24,
    title: "Tree Hard Problems",
    week: 4,
    theme: "Trees are the single most-tested topic at MNCs. Every problem here has a 30–50% chance of appearing in your actual interviews.",
    dsa: [
      { id: "d24-1", number: 113, title: "Path Sum II",                    url: "https://leetcode.com/problems/path-sum-ii/",                    difficulty: "Medium", note: "backtracking intro (add to path, recurse, remove from path)" },
      { id: "d24-2", number: 124, title: "Binary Tree Maximum Path Sum",   url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",   difficulty: "Hard",   note: "most important hard tree problem — Spend 30 minutes. If stuck, study the approach. Re-implement." },
      { id: "d24-3", number: 437, title: "Path Sum III",                   url: "https://leetcode.com/problems/path-sum-iii/",                   difficulty: "Medium", note: "prefix sum in trees" },
    ],
    theory: [
      { id: "t24-1", text: "Read: CAP Theorem — Consistency, Availability, Partition tolerance — why you can only choose 2" },
      { id: "t24-2", text: "Read: Eventual consistency — what does it mean? What systems use it? (DNS, Amazon S3)" },
      { id: "t24-3", text: "Read: Strong consistency — what does it mean? (Traditional RDBMS)" },
    ],
    review: [
      { id: "r24-1", text: "Path Sum maximum — the key insight: at each node, you can extend a path OR start a new path. Write this in one sentence." },
    ],
  },
  {
    day: 25,
    title: "BST",
    week: 4,
    theme: "Trees are the single most-tested topic at MNCs. Every problem here has a 30–50% chance of appearing in your actual interviews.",
    dsa: [
      { id: "d25-1", number: 235, title: "Lowest Common Ancestor of BST",          url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", difficulty: "Medium", note: "use BST property" },
      { id: "d25-2", number: 236, title: "Lowest Common Ancestor of Binary Tree",  url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",        difficulty: "Medium", note: "harder, no BST property" },
      { id: "d25-3", number: 98,  title: "Validate BST",                           url: "https://leetcode.com/problems/validate-binary-search-tree/",                    difficulty: "Medium", note: "pass min/max bounds down recursively" },
      { id: "d25-4", number: 230, title: "Kth Smallest Element in BST",            url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",                  difficulty: "Medium", note: "in-order traversal is sorted!" },
    ],
    theory: [
      { id: "t25-1", text: "Read: Database sharding — horizontal vs vertical sharding, choosing a shard key, hotspot problem" },
      { id: "t25-2", text: "Read: Read replicas — how they work, replication lag, eventual consistency implication" },
      { id: "t25-3", text: "Write: How CustomRoutingDataSource in your project achieves multi-tenancy at the DB level" },
    ],
    review: [
      { id: "r25-1", text: "LCA of Binary Tree — the 3 cases: node is in left subtree, right subtree, or current node IS one of the targets" },
    ],
  },
  {
    day: 26,
    title: "BFS on Trees",
    week: 4,
    theme: "Trees are the single most-tested topic at MNCs. Every problem here has a 30–50% chance of appearing in your actual interviews.",
    dsa: [
      { id: "d26-1", number: 102, title: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",  difficulty: "Medium", note: "the BFS queue template" },
      { id: "d26-2", number: 199, title: "Binary Tree Right Side View",       url: "https://leetcode.com/problems/binary-tree-right-side-view/",         difficulty: "Medium", note: "last node at each level" },
      { id: "d26-3", number: 637, title: "Average of Levels in Binary Tree",  url: "https://leetcode.com/problems/average-of-levels-in-binary-tree/",    difficulty: "Easy",   note: "" },
      { id: "d26-4", number: 116, title: "Populating Next Right Pointers",    url: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/", difficulty: "Medium", note: "" },
    ],
    theory: [
      { id: "t26-1", text: "Read: Microservices — what is service discovery? (Eureka, Consul)" },
      { id: "t26-2", text: "Read: API Gateway pattern — what problems does it solve?" },
      { id: "t26-3", text: "Read: Circuit breaker pattern — states: CLOSED → OPEN → HALF_OPEN" },
    ],
    review: [
      { id: "r26-1", text: "BFS template — differences between level-by-level and simple BFS" },
      { id: "r26-2", text: "Write the BFS tree traversal template from memory" },
    ],
  },
  {
    day: 27,
    title: "BFS on Graphs + Trie",
    week: 4,
    theme: "Trees are the single most-tested topic at MNCs. Every problem here has a 30–50% chance of appearing in your actual interviews.",
    dsa: [
      { id: "d27-1", number: 994,  title: "Rotting Oranges",          url: "https://leetcode.com/problems/rotting-oranges/",           difficulty: "Medium", note: "BFS from multiple sources simultaneously" },
      { id: "d27-2", number: 542,  title: "01 Matrix",                url: "https://leetcode.com/problems/01-matrix/",                 difficulty: "Medium", note: "multi-source BFS" },
      { id: "d27-3", number: 127,  title: "Word Ladder",              url: "https://leetcode.com/problems/word-ladder/",               difficulty: "Hard",   note: "BFS on implicit graph — very important, appears in real interviews" },
      { id: "d27-4", number: 208,  title: "Implement Trie",           url: "https://leetcode.com/problems/implement-trie-prefix-tree/", difficulty: "Medium", note: "build from scratch, must know" },
      { id: "d27-5", number: 1268, title: "Search Suggestions System", url: "https://leetcode.com/problems/search-suggestions-system/", difficulty: "Medium", note: "Trie application" },
    ],
    theory: [
      { id: "t27-1", text: "Study: Design a URL Shortener (TinyURL) — Requirements, Components, DB schema, hash collision handling, scale to 1B URLs" },
      { id: "t27-2", text: "Write it out on paper as if in an interview" },
    ],
    review: [
      { id: "r27-1", text: "Week 4 count: ___ (target: 130+)" },
      { id: "r27-2", text: "End of Month 1 Milestone: Easy < 10 min? ~50% Mediums independently? Trees — can traverse any variant? LRU Cache from scratch?" },
    ],
  },
  {
    day: 28,
    title: "Month 1 Review + Full Behavioral Session",
    week: 4,
    theme: "Trees are the single most-tested topic at MNCs. Every problem here has a 30–50% chance of appearing in your actual interviews.",
    dsa: [
      { id: "d28-1", number: 102, title: "Level Order Traversal (timed)",  url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Medium", note: "15 min" },
      { id: "d28-2", number: 236, title: "LCA Binary Tree (timed)",        url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", difficulty: "Medium", note: "25 min" },
      { id: "d28-3", number: 127, title: "Word Ladder (timed)",            url: "https://leetcode.com/problems/word-ladder/",                        difficulty: "Hard",   note: "35 min (hard, it's okay to struggle)" },
      { id: "d28-4", number: 146, title: "LRU Cache (timed)",              url: "https://leetcode.com/problems/lru-cache/",                          difficulty: "Medium", note: "20 min (should be fast by now)" },
    ],
    theory: [
      { id: "t28-1", text: "Full practice: 'Tell me about yourself' — 2 min version" },
      { id: "t28-2", text: "Story 1: Challenging technical problem (LRU OOM bug or cache race condition)" },
      { id: "t28-3", text: "Story 2: System you designed from scratch (Reports service)" },
      { id: "t28-4", text: "Story 3: Performance improvement (Lambda PDF offload)" },
      { id: "t28-5", text: "Story 4: Production incident (cache race condition / tenant data leak)" },
    ],
    review: [
      { id: "r28-1", text: "Can you explain @Transactional propagation in 2 minutes? Practice it." },
      { id: "r28-2", text: "What is Spring AOP? How does @Transactional use it? (Proxy-based)" },
      { id: "r28-3", text: "Month 1 total problems: ___ (target: 130+) | Confidence on Medium (1–10): ___ | System design comfort (1–10): ___" },
    ],
  },

  // ─── WEEK 5 ─────────────────────────────────────────────
  {
    day: 29,
    title: "Heap Basics",
    week: 5,
    theme: "Heaps (PriorityQueue in Java) power the top-K, scheduling, and median problems. System design is now a daily commitment.",
    dsa: [
      { id: "d29-1", number: 215, title: "Kth Largest Element in Array",  url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",  difficulty: "Medium", note: "Min-Heap of size K" },
      { id: "d29-2", number: 973, title: "K Closest Points to Origin",    url: "https://leetcode.com/problems/k-closest-points-to-origin/",        difficulty: "Medium", note: "Max-Heap or sort" },
      { id: "d29-3", number: 347, title: "Top K Frequent Elements (revisit)", url: "https://leetcode.com/problems/top-k-frequent-elements/",        difficulty: "Medium", note: "revisit with heap approach" },
    ],
    theory: [
      { id: "t29-1", text: "System Design: Load Balancing — round robin, least connections, IP hash, weighted" },
      { id: "t29-2", text: "System Design: What is horizontal scaling vs vertical scaling?" },
      { id: "t29-3", text: "System Design: Stateless vs stateful services — why stateless is better for scaling" },
    ],
    review: [
      { id: "r29-1", text: "Heap pattern: 'Use Min-Heap of size K to find K largest elements' — why Min-Heap and not Max-Heap?" },
      { id: "r29-2", text: "Write all three PriorityQueue forms from memory (min-heap, max-heap, custom comparator)" },
    ],
  },
  {
    day: 30,
    title: "Two-Heaps Pattern",
    week: 5,
    theme: "Heaps (PriorityQueue in Java) power the top-K, scheduling, and median problems. System design is now a daily commitment.",
    dsa: [
      { id: "d30-1", number: 295, title: "Find Median from Data Stream", url: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "Hard",   note: "two heaps (Max-Heap for lower half, Min-Heap for upper half) — most important pattern, spend 40 min" },
      { id: "d30-2", number: 621, title: "Task Scheduler",               url: "https://leetcode.com/problems/task-scheduler/",              difficulty: "Medium", note: "heap + greedy" },
    ],
    theory: [
      { id: "t30-1", text: "System Design: CDN — what it is, edge servers, cache invalidation at CDN level" },
      { id: "t30-2", text: "System Design: Database indexing — B-Tree index, covering index, partial index" },
      { id: "t30-3", text: "System Design: When NOT to use an index (high write volume, small tables)" },
    ],
    review: [
      { id: "r30-1", text: "Find Median — the invariant: maxHeap.size() == minHeap.size() OR maxHeap.size() == minHeap.size() + 1. Write this." },
    ],
  },
  {
    day: 31,
    title: "Heap Applications",
    week: 5,
    theme: "Heaps (PriorityQueue in Java) power the top-K, scheduling, and median problems. System design is now a daily commitment.",
    dsa: [
      { id: "d31-1", number: 767, title: "Reorganize String", url: "https://leetcode.com/problems/reorganize-string/",  difficulty: "Medium", note: "Max-Heap by frequency" },
      { id: "d31-2", number: 355, title: "Design Twitter",    url: "https://leetcode.com/problems/design-twitter/",     difficulty: "Medium", note: "merge K sorted streams with heap" },
      { id: "d31-3", number: 502, title: "IPO",               url: "https://leetcode.com/problems/ipo/",                difficulty: "Hard",   note: "two heaps, greedy" },
    ],
    theory: [
      { id: "t31-1", text: "System Design: SQL vs NoSQL — when to choose each, ACID vs BASE" },
      { id: "t31-2", text: "System Design: Types of NoSQL — document (MongoDB), key-value (Redis), column-family (Cassandra), graph (Neo4j)" },
      { id: "t31-3", text: "System Design: When does Cassandra make sense? (high write throughput, time-series data)" },
    ],
    review: [
      { id: "r31-1", text: "Design Twitter — what's the time complexity of fetching a user's timeline?" },
    ],
  },
  {
    day: 32,
    title: "Greedy",
    week: 5,
    theme: "Heaps (PriorityQueue in Java) power the top-K, scheduling, and median problems. System design is now a daily commitment.",
    dsa: [
      { id: "d32-1", number: 55,  title: "Jump Game",    url: "https://leetcode.com/problems/jump-game/",    difficulty: "Medium", note: "greedy with max reach" },
      { id: "d32-2", number: 45,  title: "Jump Game II",  url: "https://leetcode.com/problems/jump-game-ii/", difficulty: "Medium", note: "greedy, count minimum jumps" },
      { id: "d32-3", number: 134, title: "Gas Station",   url: "https://leetcode.com/problems/gas-station/",  difficulty: "Medium", note: "total gas >= total cost must hold" },
    ],
    theory: [
      { id: "t32-1", text: "System Design: Consistent Hashing — what problem does it solve? Virtual nodes." },
      { id: "t32-2", text: "System Design: How Kafka uses partitioning (formalize from your project experience)" },
      { id: "t32-3", text: "System Design: Kafka consumer groups — one consumer per partition max, what happens if more consumers than partitions?" },
    ],
    review: [
      { id: "r32-1", text: "Jump Game II — the key insight: every time you must jump, choose the jump that extends your reach the farthest" },
    ],
  },
  {
    day: 33,
    title: "Intervals (Greedy)",
    week: 5,
    theme: "Heaps (PriorityQueue in Java) power the top-K, scheduling, and median problems. System design is now a daily commitment.",
    dsa: [
      { id: "d33-1", number: 56,  title: "Merge Intervals",         url: "https://leetcode.com/problems/merge-intervals/",          difficulty: "Medium", note: "sort by start, merge overlapping" },
      { id: "d33-2", number: 57,  title: "Insert Interval",         url: "https://leetcode.com/problems/insert-interval/",          difficulty: "Medium", note: "3 phases: before, overlap, after" },
      { id: "d33-3", number: 435, title: "Non-overlapping Intervals", url: "https://leetcode.com/problems/non-overlapping-intervals/", difficulty: "Medium", note: "greedy, keep interval with earliest end" },
    ],
    theory: [
      { id: "t33-1", text: "System Design: Rate limiting — Token Bucket vs Leaky Bucket vs Sliding Window Counter" },
      { id: "t33-2", text: "System Design: Where to implement rate limiting? (API Gateway, middleware, per-user, per-IP)" },
      { id: "t33-3", text: "Write: How IntegrationThrottler in your project works — is it proper rate limiting or flow control?" },
    ],
    review: [
      { id: "r33-1", text: "Intervals pattern: always sort by start time. When to sort by end time instead?" },
    ],
  },
  {
    day: 34,
    title: "Interval Hard + System Design Deep Dive",
    week: 5,
    theme: "Heaps (PriorityQueue in Java) power the top-K, scheduling, and median problems. System design is now a daily commitment.",
    dsa: [
      { id: "d34-1", number: 253,  title: "Meeting Rooms II",                      url: "https://leetcode.com/problems/meeting-rooms-ii/",                       difficulty: "Medium", note: "Min-Heap to track room end times" },
      { id: "d34-2", number: 763,  title: "Partition Labels",                      url: "https://leetcode.com/problems/partition-labels/",                       difficulty: "Medium", note: "" },
      { id: "d34-3", number: 846,  title: "Hand of Straights",                     url: "https://leetcode.com/problems/hand-of-straights/",                      difficulty: "Medium", note: "greedy + sorted map" },
      { id: "d34-4", number: 1851, title: "Minimum Interval to Include Each Query", url: "https://leetcode.com/problems/minimum-interval-to-include-each-query/", difficulty: "Hard",   note: "events + heap" },
      { id: "d34-5", number: 56,   title: "Merge Intervals (re-solve)",            url: "https://leetcode.com/problems/merge-intervals/",                        difficulty: "Medium", note: "from memory, timed: 15 min" },
    ],
    theory: [
      { id: "t34-1", text: "Design URL Shortener — present it fully out loud as if to an interviewer (set a 45-min timer)" },
      { id: "t34-2", text: "Study: Designing a notification system — Requirements: push, email, SMS. Components, retry logic, deduplication." },
    ],
    review: [
      { id: "r34-1", text: "Week 5 count: ___ (target: 150+)" },
      { id: "r34-2", text: "System design comfort after URL Shortener exercise (1–10): ___" },
    ],
  },
  {
    day: 35,
    title: "System Design Focus + Review",
    week: 5,
    theme: "Heaps (PriorityQueue in Java) power the top-K, scheduling, and median problems. System design is now a daily commitment.",
    dsa: [
      { id: "d35-1", number: 295, title: "Find Median from Data Stream (timed)", url: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "Hard",   note: "30 min" },
      { id: "d35-2", number: 253, title: "Meeting Rooms II (timed)",            url: "https://leetcode.com/problems/meeting-rooms-ii/",             difficulty: "Medium", note: "20 min" },
    ],
    theory: [
      { id: "t35-1", text: "Design WhatsApp / Chat System — message delivery, online/offline detection, Cassandra for storage, group chats, read receipts" },
      { id: "t35-2", text: "Present WhatsApp design out loud, 45 min timer" },
      { id: "t35-3", text: "Prepare story: 'Tell me about a time you had to make a trade-off'" },
    ],
    review: [
      { id: "r35-1", text: "Problems solved this week: ___ | Can explain two-heaps pattern? (Y/N) | System design: URL shortener and chat system? (Y/N)" },
    ],
  },

  // ─── WEEK 6 ─────────────────────────────────────────────
  {
    day: 36,
    title: "1D DP — The Foundation",
    week: 6,
    theme: "DP is feared by most candidates. Even learning 1D DP properly will set you apart. Go slow, trace every example on paper.",
    dsa: [
      { id: "d36-1", number: 70,  title: "Climbing Stairs",      url: "https://leetcode.com/problems/climbing-stairs/",       difficulty: "Easy",   note: "tabulation AND memoization both" },
      { id: "d36-2", number: 198, title: "House Robber",          url: "https://leetcode.com/problems/house-robber/",           difficulty: "Medium", note: "" },
      { id: "d36-3", number: 213, title: "House Robber II",       url: "https://leetcode.com/problems/house-robber-ii/",        difficulty: "Medium", note: "circular array, two passes" },
    ],
    theory: [
      { id: "t36-1", text: "System Design: Database replication — synchronous vs asynchronous, replication lag" },
      { id: "t36-2", text: "System Design: Leader election — what happens when the master DB goes down?" },
      { id: "t36-3", text: "System Design: Failover strategies — active-passive vs active-active" },
    ],
    review: [
      { id: "r36-1", text: "House Robber II — why split into two sub-problems (0 to n-2) and (1 to n-1)?" },
      { id: "r36-2", text: "Apply the DP framework to Climbing Stairs on paper: state, transition, base case, answer" },
    ],
  },
  {
    day: 37,
    title: "1D DP — Strings",
    week: 6,
    theme: "DP is feared by most candidates. Even learning 1D DP properly will set you apart. Go slow, trace every example on paper.",
    dsa: [
      { id: "d37-1", number: 5,   title: "Longest Palindromic Substring", url: "https://leetcode.com/problems/longest-palindromic-substring/", difficulty: "Medium", note: "expand around center (O(n²)) or DP" },
      { id: "d37-2", number: 647, title: "Palindromic Substrings",        url: "https://leetcode.com/problems/palindromic-substrings/",        difficulty: "Medium", note: "same expand approach" },
      { id: "d37-3", number: 91,  title: "Decode Ways",                   url: "https://leetcode.com/problems/decode-ways/",                   difficulty: "Medium", note: "DP, be careful with edge cases (leading zeros)" },
    ],
    theory: [
      { id: "t37-1", text: "System Design: Search system — inverted index, how Elasticsearch works" },
      { id: "t37-2", text: "System Design: Full-text search vs exact-match search" },
      { id: "t37-3", text: "Write: How your reports service uses Elasticsearch for logging — explain it as system design" },
    ],
    review: [
      { id: "r37-1", text: "Decode Ways — trace through '226' → dp[0]=1, dp[1]=1, dp[2]=2, dp[3]=3 on paper" },
    ],
  },
  {
    day: 38,
    title: "Classic 1D DP",
    week: 6,
    theme: "DP is feared by most candidates. Even learning 1D DP properly will set you apart. Go slow, trace every example on paper.",
    dsa: [
      { id: "d38-1", number: 322, title: "Coin Change",                      url: "https://leetcode.com/problems/coin-change/",                          difficulty: "Medium", note: "classic DP, also do BFS approach" },
      { id: "d38-2", number: 139, title: "Word Break",                       url: "https://leetcode.com/problems/word-break/",                           difficulty: "Medium", note: "dp[i] = can we form s[0..i]?" },
      { id: "d38-3", number: 300, title: "Longest Increasing Subsequence",   url: "https://leetcode.com/problems/longest-increasing-subsequence/",       difficulty: "Medium", note: "O(n²) DP, then O(n log n) patience sort" },
    ],
    theory: [
      { id: "t38-1", text: "System Design: Data pipeline — batch vs streaming, Lambda architecture, Kappa architecture" },
      { id: "t38-2", text: "System Design: What is ETL? How does your slake-reporting project relate to ETL?" },
      { id: "t38-3", text: "System Design: Apache Kafka vs Apache Flink — what's the difference in use case?" },
    ],
    review: [
      { id: "r38-1", text: "Coin Change — trace dp array for coins=[1,2,5], amount=5 on paper" },
    ],
  },
  {
    day: 39,
    title: "2D DP",
    week: 6,
    theme: "DP is feared by most candidates. Even learning 1D DP properly will set you apart. Go slow, trace every example on paper.",
    dsa: [
      { id: "d39-1", number: 62,   title: "Unique Paths",               url: "https://leetcode.com/problems/unique-paths/",                   difficulty: "Medium", note: "2D DP table" },
      { id: "d39-2", number: 1143, title: "Longest Common Subsequence", url: "https://leetcode.com/problems/longest-common-subsequence/",     difficulty: "Medium", note: "foundation of many string DPs" },
      { id: "d39-3", number: 518,  title: "Coin Change II",             url: "https://leetcode.com/problems/coin-change-ii/",                 difficulty: "Medium", note: "unbounded knapsack" },
    ],
    theory: [
      { id: "t39-1", text: "System Design: Distributed transactions — Two-Phase Commit (2PC), what are its downsides?" },
      { id: "t39-2", text: "System Design: Saga pattern — choreography vs orchestration" },
      { id: "t39-3", text: "System Design: How to handle distributed transactions in a microservices architecture?" },
    ],
    review: [
      { id: "r39-1", text: "LCS — build the 2D table for 'ABCDE' and 'ACE' on paper" },
    ],
  },
  {
    day: 40,
    title: "2D DP Continued",
    week: 6,
    theme: "DP is feared by most candidates. Even learning 1D DP properly will set you apart. Go slow, trace every example on paper.",
    dsa: [
      { id: "d40-1", number: 72,  title: "Edit Distance",                              url: "https://leetcode.com/problems/edit-distance/",                              difficulty: "Hard",   note: "very important, trace the table on paper first" },
      { id: "d40-2", number: 309, title: "Best Time to Buy/Sell Stock with Cooldown",  url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/", difficulty: "Medium", note: "state machine DP" },
      { id: "d40-3", number: 494, title: "Target Sum",                                 url: "https://leetcode.com/problems/target-sum/",                                 difficulty: "Medium", note: "DP or DFS with memoization" },
    ],
    theory: [
      { id: "t40-1", text: "Java Concurrency: ExecutorService, ThreadPoolExecutor, core vs max pool size, queue types" },
      { id: "t40-2", text: "Java Concurrency: CompletableFuture — thenApply, thenCompose, thenCombine, exceptionally" },
      { id: "t40-3", text: "Java 21: Virtual threads — how they differ from OS threads, why they're good for blocking I/O" },
    ],
    review: [
      { id: "r40-1", text: "Edit Distance — why is the transition dp[i][j] = 1 + min(insert, delete, replace)?" },
    ],
  },
  {
    day: 41,
    title: "DP Hard + System Design WhatsApp",
    week: 6,
    theme: "DP is feared by most candidates. Even learning 1D DP properly will set you apart. Go slow, trace every example on paper.",
    dsa: [
      { id: "d41-1", number: 416, title: "Partition Equal Subset Sum",  url: "https://leetcode.com/problems/partition-equal-subset-sum/",  difficulty: "Medium", note: "0/1 knapsack variant" },
      { id: "d41-2", number: 97,  title: "Interleaving String",         url: "https://leetcode.com/problems/interleaving-string/",          difficulty: "Hard",   note: "" },
      { id: "d41-3", number: 312, title: "Burst Balloons",              url: "https://leetcode.com/problems/burst-balloons/",              difficulty: "Hard",   note: "interval DP, trace the base case carefully" },
      { id: "d41-4", number: 10,  title: "Regular Expression Matching", url: "https://leetcode.com/problems/regular-expression-matching/",  difficulty: "Hard",   note: "DP on string patterns" },
      { id: "d41-5", number: 322, title: "Coin Change (re-solve)",      url: "https://leetcode.com/problems/coin-change/",                 difficulty: "Medium", note: "from memory, timed: 15 min" },
    ],
    theory: [
      { id: "t41-1", text: "Design WhatsApp — present out loud, 45-min timer. Focus on: message delivery guarantees, online/offline, WebSocket vs polling" },
      { id: "t41-2", text: "Study: Service mesh — what is Istio? What problem does it solve?" },
    ],
    review: [
      { id: "r41-1", text: "Week 6 count: ___ (target: 165+)" },
      { id: "r41-2", text: "DP: can I identify which DP pattern a problem uses by reading it? (1D? 2D? Interval?)" },
    ],
  },
  {
    day: 42,
    title: "DP Review + Mock",
    week: 6,
    theme: "DP is feared by most candidates. Even learning 1D DP properly will set you apart. Go slow, trace every example on paper.",
    dsa: [
      { id: "d42-1", number: 198,  title: "House Robber (timed)",   url: "https://leetcode.com/problems/house-robber/",                   difficulty: "Medium", note: "15 min" },
      { id: "d42-2", number: 322,  title: "Coin Change (timed)",    url: "https://leetcode.com/problems/coin-change/",                    difficulty: "Medium", note: "20 min" },
      { id: "d42-3", number: 1143, title: "LCS (timed)",            url: "https://leetcode.com/problems/longest-common-subsequence/",     difficulty: "Medium", note: "25 min" },
      { id: "d42-4", number: 72,   title: "Edit Distance (timed)",  url: "https://leetcode.com/problems/edit-distance/",                  difficulty: "Hard",   note: "35 min (it's hard, it's okay to need the hint)" },
    ],
    theory: [
      { id: "t42-1", text: "New story: 'Describe a time you disagreed with a technical decision' — prepare one" },
      { id: "t42-2", text: "New story: 'Tell me about a time you had to learn something quickly' — how you picked up Quarkus for slake-reporting" },
    ],
    review: [
      { id: "r42-1", text: "Spring Security filter chain — draw it on paper: SecurityContextPersistenceFilter → JWTTokenFilter → ..." },
      { id: "r42-2", text: "Problems solved this week: ___ | DP confidence (1–10): ___ | Designed WhatsApp correctly? (Y/N)" },
    ],
  },

  // ─── WEEK 7 ─────────────────────────────────────────────
  {
    day: 43,
    title: "Graph BFS/DFS Basics",
    week: 7,
    theme: "Graphs appear in ~20% of real interviews. Backtracking is the pattern for all permutation/combination/constraint problems.",
    dsa: [
      { id: "d43-1", number: 200, title: "Number of Islands",  url: "https://leetcode.com/problems/number-of-islands/",  difficulty: "Medium", note: "classic, must know — start here" },
      { id: "d43-2", number: 695, title: "Max Area of Island", url: "https://leetcode.com/problems/max-area-of-island/", difficulty: "Medium", note: "variation of islands" },
      { id: "d43-3", number: 133, title: "Clone Graph",        url: "https://leetcode.com/problems/clone-graph/",        difficulty: "Medium", note: "BFS/DFS with visited HashMap" },
    ],
    theory: [
      { id: "t43-1", text: "System Design: Content delivery for large files — chunking, resumable uploads" },
      { id: "t43-2", text: "System Design: S3 multipart upload — how it works (you implemented this in slake-reporting!)" },
      { id: "t43-3", text: "Write: How ExportService in slake-reporting uploads to S3 — explain it as a system design answer" },
    ],
    review: [
      { id: "r43-1", text: "Number of Islands — why mark as visited when adding to queue (not when popping)?" },
      { id: "r43-2", text: "Write the Graph DFS template from memory" },
    ],
  },
  {
    day: 44,
    title: "Graph DFS Applications",
    week: 7,
    theme: "Graphs appear in ~20% of real interviews. Backtracking is the pattern for all permutation/combination/constraint problems.",
    dsa: [
      { id: "d44-1", number: 417, title: "Pacific Atlantic Water Flow", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/", difficulty: "Medium", note: "DFS from both oceans, find intersection" },
      { id: "d44-2", number: 130, title: "Surrounded Regions",          url: "https://leetcode.com/problems/surrounded-regions/",          difficulty: "Medium", note: "DFS from border, mark safe cells" },
      { id: "d44-3", number: 261, title: "Graph Valid Tree",             url: "https://leetcode.com/problems/graph-valid-tree/",             difficulty: "Medium", note: "no cycle + connected" },
    ],
    theory: [
      { id: "t44-1", text: "System Design: Designing for high availability — 99.9% vs 99.99% vs 99.999% uptime" },
      { id: "t44-2", text: "System Design: Redundancy — active-active vs active-passive, data center regions" },
      { id: "t44-3", text: "System Design: Health checks — how load balancers detect unhealthy instances" },
    ],
    review: [
      { id: "r44-1", text: "Pacific Atlantic — why start DFS from the borders (ocean cells) instead of the interior?" },
    ],
  },
  {
    day: 45,
    title: "Topological Sort",
    week: 7,
    theme: "Graphs appear in ~20% of real interviews. Backtracking is the pattern for all permutation/combination/constraint problems.",
    dsa: [
      { id: "d45-1", number: 207, title: "Course Schedule",              url: "https://leetcode.com/problems/course-schedule/",              difficulty: "Medium", note: "cycle detection in directed graph (DFS OR BFS/Kahn's)" },
      { id: "d45-2", number: 210, title: "Course Schedule II",           url: "https://leetcode.com/problems/course-schedule-ii/",           difficulty: "Medium", note: "return topological order" },
      { id: "d45-3", number: 323, title: "Number of Connected Components", url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", difficulty: "Medium", note: "Union-Find OR DFS" },
    ],
    theory: [
      { id: "t45-1", text: "System Design: Designing a job scheduler — priority queues, distributed execution" },
      { id: "t45-2", text: "System Design: How your SchedulerService in slake-reporting works — cron parsing, state file idempotency" },
      { id: "t45-3", text: "System Design: What would you change if the scheduler needed to run across multiple instances?" },
    ],
    review: [
      { id: "r45-1", text: "Topological sort — what does it mean if a topological sort is impossible? (cycle in directed graph)" },
      { id: "r45-2", text: "Write the Union-Find template from memory" },
    ],
  },
  {
    day: 46,
    title: "Shortest Path Algorithms",
    week: 7,
    theme: "Graphs appear in ~20% of real interviews. Backtracking is the pattern for all permutation/combination/constraint problems.",
    dsa: [
      { id: "d46-1", number: 743, title: "Network Delay Time",                  url: "https://leetcode.com/problems/network-delay-time/",                   difficulty: "Medium", note: "Dijkstra's algorithm (Min-Heap + dist array)" },
      { id: "d46-2", number: 787, title: "Cheapest Flights Within K Stops",     url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",      difficulty: "Medium", note: "modified Bellman-Ford" },
      { id: "d46-3", number: 684, title: "Redundant Connection",                 url: "https://leetcode.com/problems/redundant-connection/",                  difficulty: "Medium", note: "Union-Find" },
    ],
    theory: [
      { id: "t46-1", text: "System Design: Designing a recommendation system — collaborative filtering, content-based" },
      { id: "t46-2", text: "System Design: Feature store — what it is, why Netflix/Uber use it" },
      { id: "t46-3", text: "Java: ConcurrentHashMap internal — why it's faster than Hashtable (segment locking in Java 7, CAS in Java 8+)" },
    ],
    review: [
      { id: "r46-1", text: "Dijkstra — why doesn't it work with negative weights? What algorithm handles negative weights? (Bellman-Ford)" },
      { id: "r46-2", text: "Write the Dijkstra template from memory" },
    ],
  },
  {
    day: 47,
    title: "Backtracking Basics",
    week: 7,
    theme: "Graphs appear in ~20% of real interviews. Backtracking is the pattern for all permutation/combination/constraint problems.",
    dsa: [
      { id: "d47-1", number: 78, title: "Subsets",         url: "https://leetcode.com/problems/subsets/",          difficulty: "Medium", note: "backtracking OR bit manipulation" },
      { id: "d47-2", number: 46, title: "Permutations",    url: "https://leetcode.com/problems/permutations/",     difficulty: "Medium", note: "backtracking with swap" },
      { id: "d47-3", number: 39, title: "Combination Sum", url: "https://leetcode.com/problems/combination-sum/",  difficulty: "Medium", note: "backtracking with repetition allowed" },
    ],
    theory: [
      { id: "t47-1", text: "System Design: OAuth 2.0 flow — authorization code flow, access token vs refresh token" },
      { id: "t47-2", text: "System Design: JWT vs session tokens — stateless vs stateful, token revocation problem" },
      { id: "t47-3", text: "Write: How JWT in your reports service handles token versioning for zero-downtime rotation" },
    ],
    review: [
      { id: "r47-1", text: "Subsets vs Permutations — what changes in the backtracking call? (i+1 vs swap + full range)" },
      { id: "r47-2", text: "Write the backtracking template from memory" },
    ],
  },
  {
    day: 48,
    title: "Backtracking Hard + System Design Uber",
    week: 7,
    theme: "Graphs appear in ~20% of real interviews. Backtracking is the pattern for all permutation/combination/constraint problems.",
    dsa: [
      { id: "d48-1", number: 90,  title: "Subsets II",              url: "https://leetcode.com/problems/subsets-ii/",              difficulty: "Medium", note: "skip duplicates in backtracking" },
      { id: "d48-2", number: 47,  title: "Permutations II",         url: "https://leetcode.com/problems/permutations-ii/",         difficulty: "Medium", note: "skip duplicates" },
      { id: "d48-3", number: 40,  title: "Combination Sum II",      url: "https://leetcode.com/problems/combination-sum-ii/",      difficulty: "Medium", note: "pick each element at most once" },
      { id: "d48-4", number: 79,  title: "Word Search",             url: "https://leetcode.com/problems/word-search/",             difficulty: "Medium", note: "backtracking on 2D grid" },
      { id: "d48-5", number: 51,  title: "N-Queens",                url: "https://leetcode.com/problems/n-queens/",                difficulty: "Hard",   note: "classic, constraint backtracking" },
      { id: "d48-6", number: 131, title: "Palindrome Partitioning", url: "https://leetcode.com/problems/palindrome-partitioning/", difficulty: "Medium", note: "backtracking + palindrome check" },
    ],
    theory: [
      { id: "t48-1", text: "Design Uber / Ride-sharing — driver location updates, matching algorithm (geohash, QuadTree), surge pricing, trip lifecycle" },
      { id: "t48-2", text: "Present Uber design out loud, 45-min timer" },
    ],
    review: [
      { id: "r48-1", text: "Week 7 count: ___ (target: 185+)" },
      { id: "r48-2", text: "Can I identify backtracking problems by pattern? (Y/N) | Graphs: confident on DFS, BFS, topological sort, Dijkstra? (Y/N)" },
    ],
  },
  {
    day: 49,
    title: "System Design Notification + Full Graph Review",
    week: 7,
    theme: "Graphs appear in ~20% of real interviews. Backtracking is the pattern for all permutation/combination/constraint problems.",
    dsa: [
      { id: "d49-1", number: 200, title: "Number of Islands (timed)",  url: "https://leetcode.com/problems/number-of-islands/",  difficulty: "Medium", note: "15 min" },
      { id: "d49-2", number: 207, title: "Course Schedule (timed)",    url: "https://leetcode.com/problems/course-schedule/",    difficulty: "Medium", note: "25 min" },
      { id: "d49-3", number: 51,  title: "N-Queens (timed)",           url: "https://leetcode.com/problems/n-queens/",           difficulty: "Hard",   note: "35 min (it's okay to take the full time)" },
    ],
    theory: [
      { id: "t49-1", text: "Design a Notification System — Channels: push, email, SMS. Components, retry with exponential backoff, deduplication with idempotency key" },
      { id: "t49-2", text: "Present Notification System design out loud, 30-min timer" },
      { id: "t49-3", text: "New story: 'Where do you see yourself in 3 years?' — growth-focused" },
    ],
    review: [
      { id: "r49-1", text: "Problems solved this week: ___ | Graph + backtracking confidence (1–10): ___" },
      { id: "r49-2", text: "Can design 4 systems (URL shortener, WhatsApp, Uber, Notification) without notes? (Y/N)" },
    ],
  },

  // ─── WEEK 8 ─────────────────────────────────────────────
  {
    day: 50,
    title: "Mock Set A + Twitter Design",
    week: 8,
    theme: "Simulate real conditions. Speed, communication, and confidence under pressure. This week you practice being evaluated, not just solving problems.",
    dsa: [
      { id: "d50-1", number: 15,  title: "3Sum (mock)",                                url: "https://leetcode.com/problems/3sum/",                                                difficulty: "Medium", note: "25 min timer — speak approach BEFORE coding" },
      { id: "d50-2", number: 3,   title: "Longest Substring Without Repeating (mock)", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",     difficulty: "Medium", note: "15 min timer" },
      { id: "d50-3", number: 102, title: "Binary Tree Level Order Traversal (mock)",   url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",                  difficulty: "Medium", note: "15 min timer" },
    ],
    theory: [
      { id: "t50-1", text: "Design Twitter / News Feed — fan-out on write vs fan-out on read, newsfeed for 100M users, tweet storage, CDN, trending topics" },
      { id: "t50-2", text: "Present Twitter design out loud, 45-min timer" },
    ],
    review: [
      { id: "r50-1", text: "What did you struggle with today? Write it. Focus on it tomorrow." },
    ],
  },
  {
    day: 51,
    title: "Mock Set A Continued + Netflix Design",
    week: 8,
    theme: "Simulate real conditions. Speed, communication, and confidence under pressure. This week you practice being evaluated, not just solving problems.",
    dsa: [
      { id: "d51-1", number: 200, title: "Number of Islands (mock)",  url: "https://leetcode.com/problems/number-of-islands/",  difficulty: "Medium", note: "15 min timer — speak approach + complexity" },
      { id: "d51-2", number: 322, title: "Coin Change (mock)",        url: "https://leetcode.com/problems/coin-change/",        difficulty: "Medium", note: "20 min timer" },
      { id: "d51-3", number: 56,  title: "Merge Intervals (mock)",   url: "https://leetcode.com/problems/merge-intervals/",    difficulty: "Medium", note: "20 min timer" },
    ],
    theory: [
      { id: "t51-1", text: "Design Netflix / Video Streaming — video upload → encoding → storage pipeline, CDN, adaptive bitrate, recommendation, watch history" },
      { id: "t51-2", text: "Present Netflix design out loud, 45-min timer" },
      { id: "t51-3", text: "Explain @Transactional propagation and Spring Security filter chain out loud" },
    ],
    review: [
      { id: "r51-1", text: "What improvement did you make since yesterday's mock?" },
    ],
  },
  {
    day: 52,
    title: "Mock Set B + Amazon Design",
    week: 8,
    theme: "Simulate real conditions. Speed, communication, and confidence under pressure. This week you practice being evaluated, not just solving problems.",
    dsa: [
      { id: "d52-1", number: 33,  title: "Search in Rotated Sorted Array (mock)", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", difficulty: "Medium", note: "20 min timer — speak approach before coding" },
      { id: "d52-2", number: 146, title: "LRU Cache (mock)",                      url: "https://leetcode.com/problems/lru-cache/",                      difficulty: "Medium", note: "25 min timer (you should be fast now)" },
      { id: "d52-3", number: 127, title: "Word Ladder (mock)",                    url: "https://leetcode.com/problems/word-ladder/",                    difficulty: "Hard",   note: "35 min timer" },
    ],
    theory: [
      { id: "t52-1", text: "Design Amazon (E-commerce) — product catalog (Elasticsearch), shopping cart (Redis), order service (idempotency), inventory (distributed locks)" },
      { id: "t52-2", text: "Present Amazon design out loud, 45-min timer" },
    ],
    review: [
      { id: "r52-1", text: "LRU Cache — how long did it take? Target: under 20 min now." },
    ],
  },
  {
    day: 53,
    title: "Mock Set B Continued + Rate Limiter Design",
    week: 8,
    theme: "Simulate real conditions. Speed, communication, and confidence under pressure. This week you practice being evaluated, not just solving problems.",
    dsa: [
      { id: "d53-1", number: 207,  title: "Course Schedule (mock)",                   url: "https://leetcode.com/problems/course-schedule/",              difficulty: "Medium", note: "20 min timer" },
      { id: "d53-2", number: 295,  title: "Find Median from Data Stream (mock)",      url: "https://leetcode.com/problems/find-median-from-data-stream/",  difficulty: "Hard",   note: "30 min timer" },
      { id: "d53-3", number: 1143, title: "Longest Common Subsequence (mock)",        url: "https://leetcode.com/problems/longest-common-subsequence/",    difficulty: "Medium", note: "25 min timer" },
    ],
    theory: [
      { id: "t53-1", text: "Design a Rate Limiter — Token bucket algorithm, Redis with Lua scripts for atomicity, distributed rate limiting" },
      { id: "t53-2", text: "Present Rate Limiter design out loud, 45-min timer" },
      { id: "t53-3", text: "Explain virtual threads (Java 21) and HikariCP pool settings out loud" },
    ],
    review: [
      { id: "r53-1", text: "What were the most challenging problems in this mock set? Write weak spots." },
    ],
  },
  {
    day: 54,
    title: "Hard Problems + Distributed Cache Design",
    week: 8,
    theme: "Simulate real conditions. Speed, communication, and confidence under pressure. This week you practice being evaluated, not just solving problems.",
    dsa: [
      { id: "d54-1", number: 42,  title: "Trapping Rain Water",            url: "https://leetcode.com/problems/trapping-rain-water/",            difficulty: "Hard", note: "No hints for 35 min. After 35 min: read approach, implement, understand." },
      { id: "d54-2", number: 124, title: "Binary Tree Maximum Path Sum",   url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",   difficulty: "Hard", note: "No hints for 35 min." },
      { id: "d54-3", number: 72,  title: "Edit Distance",                  url: "https://leetcode.com/problems/edit-distance/",                  difficulty: "Hard", note: "No hints for 35 min." },
    ],
    theory: [
      { id: "t54-1", text: "Design a Distributed Cache (like Redis) — consistent hashing, eviction policies (LRU, LFU, TTL), replication, cache stampede prevention" },
      { id: "t54-2", text: "Present Distributed Cache design out loud, 45-min timer" },
    ],
    review: [
      { id: "r54-1", text: "Which of the 3 hard problems could you solve cleanly? Write your weak spots." },
    ],
  },
  {
    day: 55,
    title: "Full Mock Interview Simulation",
    week: 8,
    theme: "Simulate real conditions. Speed, communication, and confidence under pressure. This week you practice being evaluated, not just solving problems.",
    dsa: [
      { id: "d55-1", number: 739, title: "Daily Temperatures (Round 1)",  url: "https://leetcode.com/problems/daily-temperatures/",   difficulty: "Medium", note: "Full mock Round 1 — explain approach first, then code" },
      { id: "d55-2", number: 46,  title: "Permutations (Round 1)",        url: "https://leetcode.com/problems/permutations/",          difficulty: "Medium", note: "Full mock Round 1" },
      { id: "d55-3", number: 143, title: "Reorder List (Round 2)",        url: "https://leetcode.com/problems/reorder-list/",          difficulty: "Medium", note: "Full mock Round 2" },
      { id: "d55-4", number: 23,  title: "Merge k Sorted Lists (Round 2)", url: "https://leetcode.com/problems/merge-k-sorted-lists/",  difficulty: "Hard",   note: "Full mock Round 2" },
    ],
    theory: [
      { id: "t55-1", text: "Round 3 — System Design (45 min timer): Design a system you haven't prepared specifically" },
      { id: "t55-2", text: "Round 4 — Behavioral (30 min): 'Tell me about yourself' + 2 random behavioral questions + 3 smart questions for interviewer" },
    ],
    review: [
      { id: "r55-1", text: "What went well in the mock?" },
      { id: "r55-2", text: "What would an interviewer have marked me down for?" },
      { id: "r55-3", text: "What's the one thing to fix before applications start?" },
    ],
  },
  {
    day: 56,
    title: "Final Day — Ready to Apply",
    week: 8,
    theme: "Simulate real conditions. Speed, communication, and confidence under pressure. This week you practice being evaluated, not just solving problems.",
    dsa: [
      { id: "d56-1", number: 0, title: "Re-solve your 3 weakest problems from this week", url: "https://leetcode.com/", difficulty: "Mixed", note: "From memory, no hints" },
    ],
    theory: [
      { id: "t56-1", text: "Read through all 6 behavioral stories — are they sharp and specific?" },
      { id: "t56-2", text: "Review the systems you designed — URL shortener, WhatsApp, Uber, Twitter, Netflix, Amazon, Rate Limiter, Distributed Cache" },
      { id: "t56-3", text: "Review your resume — do you understand every line well enough to be asked about it for 20 minutes?" },
      { id: "t56-4", text: "Review INTERVIEW_PREP.md and INTERVIEW_PREP_2.md and INTERVIEW_PREP_SLAKE.md — skim the answers" },
    ],
    review: [
      { id: "r56-1", text: "Update LinkedIn — headline, about section, projects" },
      { id: "r56-2", text: "Prepare company research template for each company you apply to" },
      { id: "r56-3", text: "Target list: write down 15–20 companies to apply to in Week 1 of applying" },
      { id: "r56-4", text: "Final Check: Easy < 10 min? 65-70% Mediums < 25 min? 8+ systems without notes? 6+ behavioral stories? Java internals confident?" },
    ],
  },
];

// ─── DSA Pattern Cards ───────────────────────────────────────────────────────

const PATTERNS = [
  {
    name: "HashMap",
    insight: "Trade O(n) time for O(n) space. When you need O(1) lookup, counting, or grouping — reach for a HashMap first.",
    template: `Map<K,V> map = new HashMap<>();
// Count frequencies
map.put(key, map.getOrDefault(key, 0) + 1);
// Check existence + get in one step
map.computeIfAbsent(key, k -> new ArrayList<>()).add(val);`,
    problems: ["Two Sum", "Group Anagrams", "Top K Frequent Elements", "LRU Cache"],
  },
  {
    name: "Two Pointer",
    insight: "Works on sorted arrays or when you have a left/right boundary. Move the pointer that helps you progress toward the goal.",
    template: `int left = 0, right = arr.length - 1;
while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) { /* found */ break; }
    else if (sum < target) left++;
    else right--;
}`,
    problems: ["Two Sum II", "3Sum", "Container With Most Water", "Trapping Rain Water"],
  },
  {
    name: "Sliding Window",
    insight: "Use when you need a contiguous subarray/substring. Expand right unconditionally; shrink left when constraint is violated.",
    template: `int left = 0, maxLen = 0;
Map<Character,Integer> window = new HashMap<>();
for (int right = 0; right < s.length(); right++) {
    window.merge(s.charAt(right), 1, Integer::sum);
    while (/* window invalid */) {
        window.merge(s.charAt(left), -1, Integer::sum);
        if (window.get(s.charAt(left)) == 0) window.remove(s.charAt(left));
        left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
}`,
    problems: ["Longest Substring Without Repeating Chars", "Minimum Size Subarray Sum", "Longest Repeating Character Replacement"],
  },
  {
    name: "Binary Search",
    insight: "Works on sorted or monotonic functions. When you see 'find minimum/maximum value that satisfies condition' — binary search on the answer space.",
    template: `// Standard
int left = 0, right = arr.length - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}
// Answer space (e.g. Koko, Ship)
while (left < right) {
    int mid = left + (right - left) / 2;
    if (feasible(mid)) right = mid;
    else left = mid + 1;
}`,
    problems: ["Binary Search", "Koko Eating Bananas", "Capacity to Ship", "Find Minimum in Rotated Array"],
  },
  {
    name: "Kadane's (Max Subarray)",
    insight: "At each index: either extend the previous subarray OR start fresh. dp[i] = max(nums[i], dp[i-1] + nums[i]).",
    template: `int maxSum = nums[0], curSum = nums[0];
for (int i = 1; i < nums.length; i++) {
    curSum = Math.max(nums[i], curSum + nums[i]);
    maxSum = Math.max(maxSum, curSum);
}`,
    problems: ["Maximum Subarray", "Best Time to Buy and Sell Stock"],
  },
  {
    name: "XOR",
    insight: "a XOR a = 0, a XOR 0 = a, XOR is commutative and associative. Use to find the unique element or missing number.",
    template: `// Single Number
int result = 0;
for (int n : nums) result ^= n;
// Missing Number
int xor = 0;
for (int i = 0; i <= n; i++) xor ^= i;
for (int n : nums) xor ^= n;`,
    problems: ["Single Number", "Missing Number"],
  },
  {
    name: "Stack",
    insight: "Use a stack when you need LIFO ordering, matching pairs (parentheses), or when processing depends on previous unresolved elements.",
    template: `Deque<Integer> stack = new ArrayDeque<>();
for (int i = 0; i < n; i++) {
    while (!stack.isEmpty() && /* condition */) {
        int top = stack.pop();
        // process
    }
    stack.push(i); // or push value
}`,
    problems: ["Valid Parentheses", "Min Stack", "Evaluate Reverse Polish Notation"],
  },
  {
    name: "Monotonic Stack",
    insight: "Maintain a stack that is strictly increasing or decreasing. Pop when the invariant is violated — that pop IS the answer for those elements.",
    template: `// Next Greater Element (monotonic decreasing stack)
Deque<Integer> stack = new ArrayDeque<>(); // stores indices
int[] result = new int[n];
Arrays.fill(result, -1);
for (int i = 0; i < n; i++) {
    while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
        result[stack.pop()] = nums[i];
    }
    stack.push(i);
}`,
    problems: ["Daily Temperatures", "Next Greater Element I/II", "Largest Rectangle in Histogram", "Car Fleet"],
  },
  {
    name: "BFS Tree",
    insight: "Process level by level. Capture queue.size() at the start of each level — that's the number of nodes at THIS level.",
    template: `Queue<TreeNode> q = new LinkedList<>();
q.offer(root);
while (!q.isEmpty()) {
    int size = q.size(); // snapshot — critical!
    for (int i = 0; i < size; i++) {
        TreeNode node = q.poll();
        // process node
        if (node.left != null)  q.offer(node.left);
        if (node.right != null) q.offer(node.right);
    }
    // end of one level
}`,
    problems: ["Binary Tree Level Order Traversal", "Right Side View", "Rotting Oranges", "Word Ladder"],
  },
  {
    name: "DFS Tree",
    insight: "Think about WHAT you return from each node and WHAT you update as a side effect. For path problems: return height, update maxPath as global.",
    template: `// Returns something useful; updates global state as side effect
int maxPath = Integer.MIN_VALUE;
int dfs(TreeNode node) {
    if (node == null) return 0;
    int left  = Math.max(0, dfs(node.left));
    int right = Math.max(0, dfs(node.right));
    maxPath = Math.max(maxPath, node.val + left + right); // side effect
    return node.val + Math.max(left, right); // what we return up
}`,
    problems: ["Maximum Depth", "Diameter", "Binary Tree Maximum Path Sum", "LCA"],
  },
  {
    name: "Graph DFS",
    insight: "Mark visited BEFORE exploring neighbors (prevents infinite loops). For grid problems: mark cell as visited in-place or use a visited array.",
    template: `boolean[] visited = new boolean[n];
void dfs(int node, List<List<Integer>> adj) {
    visited[node] = true;
    for (int neighbor : adj.get(node)) {
        if (!visited[neighbor]) dfs(neighbor, adj);
    }
}
// Grid version
void dfs(int[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length
        || grid[r][c] != 1) return;
    grid[r][c] = 0; // mark visited in-place
    dfs(grid, r+1, c); dfs(grid, r-1, c);
    dfs(grid, r, c+1); dfs(grid, r, c-1);
}`,
    problems: ["Number of Islands", "Max Area of Island", "Pacific Atlantic", "Course Schedule"],
  },
  {
    name: "Union-Find",
    insight: "O(α(n)) ≈ O(1) per operation with path compression + union by rank. Use for connectivity, cycle detection in undirected graphs.",
    template: `int[] parent, rank;
UnionFind(int n) {
    parent = new int[n]; rank = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
}
int find(int x) {
    if (parent[x] != x) parent[x] = find(parent[x]); // path compression
    return parent[x];
}
boolean union(int x, int y) {
    int px = find(x), py = find(y);
    if (px == py) return false; // already connected → cycle!
    if (rank[px] < rank[py]) { int tmp=px; px=py; py=tmp; }
    parent[py] = px;
    if (rank[px] == rank[py]) rank[px]++;
    return true;
}`,
    problems: ["Number of Connected Components", "Redundant Connection", "Graph Valid Tree"],
  },
  {
    name: "Backtracking",
    insight: "Choose → Explore → Unchoose. The key question: what is the decision at each step, and how do you prune invalid paths?",
    template: `void backtrack(List<List<Integer>> res, List<Integer> cur, int start, int[] nums) {
    res.add(new ArrayList<>(cur)); // snapshot current state
    for (int i = start; i < nums.length; i++) {
        if (i > start && nums[i] == nums[i-1]) continue; // skip duplicates
        cur.add(nums[i]);
        backtrack(res, cur, i + 1, nums);
        cur.remove(cur.size() - 1); // unchoose
    }
}`,
    problems: ["Subsets", "Permutations", "Combination Sum", "N-Queens", "Word Search"],
  },
  {
    name: "DP (1D)",
    insight: "Define dp[i] clearly. Write transition: dp[i] = f(dp[i-1], dp[i-2], ...). Always trace a small example on paper BEFORE coding.",
    template: `// House Robber pattern
int[] dp = new int[n];
dp[0] = nums[0];
dp[1] = Math.max(nums[0], nums[1]);
for (int i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
}
// Coin Change (unbounded knapsack)
int[] dp = new int[amount + 1];
Arrays.fill(dp, amount + 1); dp[0] = 0;
for (int i = 1; i <= amount; i++)
    for (int c : coins)
        if (c <= i) dp[i] = Math.min(dp[i], dp[i-c] + 1);`,
    problems: ["Climbing Stairs", "House Robber", "Coin Change", "Longest Increasing Subsequence", "Decode Ways"],
  },
  {
    name: "Heap (Priority Queue)",
    insight: "Min-Heap of size K gives you the K largest elements (counterintuitive but correct). Two-heap pattern splits data into lower/upper halves for O(1) median.",
    template: `// K Largest with Min-Heap
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
for (int n : nums) {
    minHeap.offer(n);
    if (minHeap.size() > k) minHeap.poll();
}
// Two-Heap Median
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
// invariant: maxHeap.size() == minHeap.size() OR maxHeap.size() == minHeap.size() + 1`,
    problems: ["Kth Largest Element", "K Closest Points", "Find Median from Data Stream", "Meeting Rooms II"],
  },
  {
    name: "Dijkstra",
    insight: "Shortest path in weighted graph with NON-NEGATIVE weights. Greedy: always process the node with the smallest known distance first.",
    template: `PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[1]-b[1]); // [node, dist]
int[] dist = new int[n]; Arrays.fill(dist, Integer.MAX_VALUE);
dist[src] = 0; pq.offer(new int[]{src, 0});
while (!pq.isEmpty()) {
    int[] cur = pq.poll();
    int node = cur[0], d = cur[1];
    if (d > dist[node]) continue; // stale entry
    for (int[] nei : adj.get(node)) {
        int next = nei[0], w = nei[1];
        if (dist[node] + w < dist[next]) {
            dist[next] = dist[node] + w;
            pq.offer(new int[]{next, dist[next]});
        }
    }
}`,
    problems: ["Network Delay Time", "Cheapest Flights Within K Stops"],
  },
];
