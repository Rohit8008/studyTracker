# DSA Pattern Notes
> One page per pattern. Write the template + the insight. This is your cheat sheet for revision.

---

## How to Use
- Add notes here as you learn each pattern
- Before each mock, read only the patterns relevant to that day
- If you can write the template from memory without looking → you're ready

---

## Pattern 1 — HashMap / HashSet

**When to use:** Lookup in O(1), frequency counting, detecting duplicates, mapping one thing to another.

**Core idea:** Trade space for time. Instead of O(n) search, use O(1) lookup.

**Template — Frequency Count:**
```java
Map<Character, Integer> freq = new HashMap<>();
for (char c : s.toCharArray()) {
    freq.put(c, freq.getOrDefault(c, 0) + 1);
}
```

**Template — Two Sum pattern (complement lookup):**
```java
Map<Integer, Integer> map = new HashMap<>(); // val → index
for (int i = 0; i < nums.length; i++) {
    int complement = target - nums[i];
    if (map.containsKey(complement)) return new int[]{map.get(complement), i};
    map.put(nums[i], i);
}
```

**Problems using this:**
- [1] Two Sum — complement lookup
- [217] Contains Duplicate — HashSet membership
- [242] Valid Anagram — frequency map
- [387] First Unique Character — freq map, two-pass
- [383] Ransom Note — freq map subtraction
- [205] Isomorphic Strings — two maps (s→t and t→s) for bijection
- [290] Word Pattern — bijection between words and pattern chars
- [13] Roman to Integer — value lookup map

**Key insight:** For bijection (isomorphic / word pattern), you need TWO maps — one for each direction. One map only catches one direction of the mapping.

---

## Pattern 2 — Two Pointers

**When to use:** Sorted array, palindrome check, find pair with target sum, remove duplicates in-place, squeeze from both ends.

**Template — Opposite ends:**
```java
int left = 0, right = arr.length - 1;
while (left < right) {
    if (condition) {
        // do something
        left++; right--;
    } else if (arr[left] + arr[right] < target) {
        left++;
    } else {
        right--;
    }
}
```

**Template — Fast/Slow (in-place write):**
```java
int slow = 0;
for (int fast = 0; fast < nums.length; fast++) {
    if (nums[fast] != 0) { // or whatever condition
        nums[slow++] = nums[fast];
    }
}
```

**Problems using this:**
- [125] Valid Palindrome — squeeze from both ends
- [167] Two Sum II — sorted array, squeeze
- [15] 3Sum — sort + outer loop + inner two-pointer
- [283] Move Zeroes — fast/slow write pointer
- [88] Merge Sorted Array — two pointers from the END (avoid overwrite)
- [977] Squares of Sorted Array — two pointers from ends, fill from back
- [26] Remove Duplicates — slow/fast write

**Key insight for 88 (Merge Sorted Array):** Go from the end, not the beginning, so you don't overwrite values you haven't read yet.

**Key insight for 3Sum:** Sort first, then for each element `nums[i]`, run two pointers on the rest. Skip duplicates at both the outer and inner level.

---

## Pattern 3 — Sliding Window

**When to use:** Subarray/substring of fixed or variable size, "longest/shortest subarray with property X".

**Template — Variable window (expandable):**
```java
int left = 0;
Map<Character, Integer> window = new HashMap<>();
int result = 0;
for (int right = 0; right < s.length(); right++) {
    // 1. Expand: add s[right] to window
    window.put(s.charAt(right), window.getOrDefault(s.charAt(right), 0) + 1);
    // 2. Shrink: while window is invalid
    while (/* window invalid condition */) {
        window.put(s.charAt(left), window.get(s.charAt(left)) - 1);
        if (window.get(s.charAt(left)) == 0) window.remove(s.charAt(left));
        left++;
    }
    // 3. Update answer
    result = Math.max(result, right - left + 1);
}
```

**Template — Fixed window:**
```java
// window size = k
for (int i = 0; i < k; i++) windowSum += nums[i]; // init
for (int i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k]; // slide
    result = Math.max(result, windowSum);
}
```

**Problems using this:**
- [3] Longest Substring Without Repeating Characters — variable window, no repeats
- [209] Minimum Size Subarray Sum — variable window, shrink when sum >= target
- [424] Longest Repeating Character Replacement — variable window, track max freq
- [567] Permutation in String — fixed window size |p|, compare freq maps
- [438] Find All Anagrams — same as 567 but collect all start indices
- [643] Maximum Average Subarray — fixed window

**Key insight for 424:** You don't need to recount `maxFreq` when shrinking — it can only go up, never down. This is the subtle optimization.

**Fixed vs Variable:** If the problem says "exactly size K" → fixed. If it says "at most / at least / longest / shortest" → variable.

---

## Pattern 4 — Binary Search

**When to use:** Sorted array, "find minimum/maximum value that satisfies a condition", rotated sorted array.

**Template — Standard (left ≤ right):**
```java
int left = 0, right = nums.length - 1;
while (left <= right) {
    int mid = left + (right - left) / 2; // avoids overflow
    if (nums[mid] == target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
}
return -1;
```

**Template — Binary search on answer space:**
```java
int left = minPossible, right = maxPossible;
while (left < right) {
    int mid = left + (right - left) / 2;
    if (canAchieve(mid)) right = mid;  // or left = mid + 1 depending on direction
    else left = mid + 1;
}
return left;
```

**Problems using this:**
- [704] Binary Search — standard
- [35] Search Insert Position — standard, return left
- [278] First Bad Version — binary search on answer
- [153] Find Minimum in Rotated Sorted Array — compare mid to right
- [33] Search in Rotated Sorted Array — determine which half is sorted
- [875] Koko Eating Bananas — binary search on speed (answer space)
- [1011] Capacity to Ship — binary search on capacity (answer space)

**Key insight for rotated arrays:** One half is always sorted. Check which half, then decide where target could be.

**Overflow note:** Always use `mid = left + (right - left) / 2`, never `(left + right) / 2`.

---

## Pattern 5 — Kadane's Algorithm (Max Subarray)

**When to use:** Maximum/minimum sum contiguous subarray.

**Template:**
```java
int maxSum = nums[0];
int currentSum = nums[0];
for (int i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
}
```

**Key insight:** At each element, decide: "is it better to start fresh here, or extend the previous subarray?" If `currentSum + nums[i] < nums[i]`, the previous subarray is dragging you down — restart.

---

## Pattern 6 — XOR Tricks

**When to use:** Find single element, find missing number, swap without temp variable.

**Properties:**
```
a XOR a = 0      (same number cancels out)
a XOR 0 = a      (XOR with zero is identity)
XOR is commutative and associative
```

**Template — Single number:**
```java
int result = 0;
for (int n : nums) result ^= n; // all pairs cancel, lone number remains
```

**Template — Missing number:**
```java
int result = nums.length; // start with n
for (int i = 0; i < nums.length; i++) result ^= i ^ nums[i];
// each index and value pair cancels except missing
```

**Problems using this:**
- [136] Single Number — XOR all elements
- [268] Missing Number — XOR with indices 0..n

---

## Pattern 7 — Index Marking (In-place Array)

**When to use:** Find missing/duplicate numbers in range [1..n] without extra space.

**Template:**
```java
for (int i = 0; i < nums.length; i++) {
    int idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) nums[idx] = -nums[idx]; // mark as seen
}
for (int i = 0; i < nums.length; i++) {
    if (nums[i] > 0) result.add(i + 1); // not marked = disappeared
}
```

**Key insight:** Use the sign of `nums[index]` as a boolean flag. The index encodes "which number" has been seen.

**Problems using this:**
- [448] Find All Numbers Disappeared in an Array

---

## Pattern 8 — Monotonic Stack

**When to use:** "Next greater/smaller element", "largest rectangle", "stock span".

**Template — Next Greater Element:**
```java
Deque<Integer> stack = new ArrayDeque<>(); // stores indices
int[] result = new int[nums.length];
Arrays.fill(result, -1);
for (int i = 0; i < nums.length; i++) {
    while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
        result[stack.pop()] = nums[i]; // nums[i] is the next greater
    }
    stack.push(i);
}
```

**Key insight:** Maintain a stack of "waiting" elements. When you find a larger element, it's the answer for everything it's larger than. Pop and record.

**Problems using this:**
- [496] Next Greater Element I
- [739] Daily Temperatures
- [503] Next Greater Element II (circular — iterate 2×)
- [84] Largest Rectangle in Histogram (monotonic increasing)

---

## Pattern 9 — Stack (General)

**Template — Valid Parentheses:**
```java
Deque<Character> stack = new ArrayDeque<>();
Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');
for (char c : s.toCharArray()) {
    if ("([{".indexOf(c) >= 0) stack.push(c);
    else if (stack.isEmpty() || stack.pop() != pairs.get(c)) return false;
}
return stack.isEmpty();
```

**Problems using this:**
- [20] Valid Parentheses
- [155] Min Stack — maintain a parallel min-stack
- [150] Evaluate Reverse Polish Notation — operand stack

---

## Pattern 10 — BFS on Trees (Level Order)

**Template:**
```java
Queue<TreeNode> queue = new LinkedList<>();
if (root != null) queue.offer(root);
while (!queue.isEmpty()) {
    int size = queue.size(); // snapshot of this level's size
    for (int i = 0; i < size; i++) {
        TreeNode node = queue.poll();
        // process node
        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
    }
}
```

**Key insight:** Capture `queue.size()` at the start of each level iteration — this is how you process level-by-level without mixing levels.

---

## Pattern 11 — DFS on Trees (Recursive)

**Template — Return value up the tree:**
```java
int dfs(TreeNode node) {
    if (node == null) return 0; // base case
    int left = dfs(node.left);
    int right = dfs(node.right);
    // use left, right, node.val to compute something
    // optionally update a global result here
    return /* value to pass up */;
}
```

**Key insight for hard tree problems (like max path sum, diameter):** The function returns something useful to the PARENT, but the global answer is updated as a side effect inside the function.

---

## Pattern 12 — Graph DFS

**Template:**
```java
boolean[] visited = new boolean[n];
void dfs(int node, List<List<Integer>> adj) {
    visited[node] = true;
    for (int neighbor : adj.get(node)) {
        if (!visited[neighbor]) dfs(neighbor, adj);
    }
}
```

**Template — Grid DFS (islands):**
```java
void dfs(char[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
    grid[r][c] = '0'; // mark visited by mutating
    dfs(grid, r+1, c); dfs(grid, r-1, c);
    dfs(grid, r, c+1); dfs(grid, r, c-1);
}
```

---

## Pattern 13 — Union-Find (Disjoint Set Union)

**Template:**
```java
int[] parent;
int find(int x) {
    return parent[x] == x ? x : (parent[x] = find(parent[x])); // path compression
}
void union(int x, int y) {
    parent[find(x)] = find(y);
}
```

---

## Pattern 14 — Backtracking

**Template:**
```java
void backtrack(List<List<Integer>> result, List<Integer> current, int start, int[] nums) {
    result.add(new ArrayList<>(current)); // snapshot current state
    for (int i = start; i < nums.length; i++) {
        if (i > start && nums[i] == nums[i-1]) continue; // skip duplicates
        current.add(nums[i]);              // choose
        backtrack(result, current, i + 1, nums); // explore
        current.remove(current.size() - 1); // unchoose
    }
}
```

---

## Pattern 15 — Dynamic Programming Framework

**4-step framework for any DP problem:**
1. **State:** What does `dp[i]` (or `dp[i][j]`) represent?
2. **Transition:** How does `dp[i]` depend on smaller subproblems?
3. **Base case:** What is `dp[0]`? `dp[1]`? Edge values?
4. **Answer:** Is it `dp[n]`? `max(dp)`? Something else?

**1D DP template:**
```java
int[] dp = new int[n + 1];
dp[0] = baseCase;
for (int i = 1; i <= n; i++) {
    dp[i] = f(dp[i-1], dp[i-2], ...);
}
```

**2D DP template:**
```java
int[][] dp = new int[m + 1][n + 1];
// fill base cases (row 0, col 0)
for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        dp[i][j] = f(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    }
}
```

---

## Pattern 16 — Heap / PriorityQueue

**Java templates:**
```java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();                    // min at top
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder()); // max at top
PriorityQueue<int[]> custom = new PriorityQueue<>((a, b) -> a[0] - b[0]); // sort by first element
```

**Top-K pattern:** Use a Min-Heap of size K to find K largest elements.
- If new element > heap.peek() → pop + push new element
- At end, heap contains K largest
- Why Min-Heap for K largest? Because you want to evict the SMALLEST of the K largest when heap is full.

---

## Pattern 17 — Dijkstra's Algorithm

**Template:**
```java
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]); // [node, dist]
int[] dist = new int[n]; Arrays.fill(dist, Integer.MAX_VALUE);
dist[src] = 0;
pq.offer(new int[]{src, 0});
while (!pq.isEmpty()) {
    int[] cur = pq.poll();
    if (cur[1] > dist[cur[0]]) continue; // stale entry, skip
    for (int[] neighbor : adj.get(cur[0])) {
        int newDist = dist[cur[0]] + neighbor[1];
        if (newDist < dist[neighbor[0]]) {
            dist[neighbor[0]] = newDist;
            pq.offer(new int[]{neighbor[0], newDist});
        }
    }
}
```

**Why not with negative weights?** Dijkstra assumes once a node is popped from the heap its distance is final. Negative weights can violate this — use Bellman-Ford instead.

---

## Java Quick Reference

### HashMap operations:
```java
map.getOrDefault(key, 0)     // get with fallback
map.putIfAbsent(key, value)  // put only if not present
map.containsKey(key)
map.entrySet() / map.keySet() / map.values()
```

### String operations:
```java
s.toCharArray()
s.charAt(i)
s.substring(i, j)            // [i, j)
String.valueOf(charArray)
s.equals(other)              // NOT ==
```

### Array tricks:
```java
Arrays.sort(arr)
Arrays.fill(arr, value)
int[] copy = Arrays.copyOf(arr, arr.length)
```

### Collections:
```java
Collections.sort(list)
Collections.reverseOrder()
Collections.frequency(list, element)
```
