// src/data/notesData.js

export const initialNotes = [
  {
    id: "note-dsa-cheatsheet",
    title: "DSA High-Yield Cheat Sheet & Time Complexities",
    subject: "DSA",
    readTime: "8 min read",
    updatedAt: "2026-10-15",
    tags: ["Big-O", "Arrays", "Trees", "Sorting"],
    summary: "Instant lookup table of time & space complexities for fundamental data structures and sorting algorithms.",
    content: `
# Data Structures & Algorithms High-Yield Cheat Sheet

### 1. Operations Complexity Matrix

| Data Structure | Access (Avg / Worst) | Search (Avg / Worst) | Insertion (Avg / Worst) | Deletion (Avg / Worst) | Space |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Array** | O(1) / O(1) | O(n) / O(n) | O(n) / O(n) | O(n) / O(n) | O(n) |
| **Dynamic Array** | O(1) / O(1) | O(n) / O(n) | O(1)* / O(n) | O(n) / O(n) | O(n) |
| **Singly Linked List**| O(n) / O(n) | O(n) / O(n) | O(1) / O(1) | O(1) / O(1) | O(n) |
| **Hash Table** | N/A | O(1) / O(n) | O(1) / O(n) | O(1) / O(n) | O(n) |
| **Binary Search Tree**| O(log n) / O(n) | O(log n) / O(n) | O(log n) / O(n) | O(log n) / O(n) | O(n) |
| **Red-Black / AVL Tree** | O(log n) / O(log n) | O(log n) / O(log n) | O(log n) / O(log n) | O(log n) / O(log n) | O(n) |

*\*Amortized constant time.*

### 2. Common Algorithm Patterns

1. **Two Pointers**: Used when searching pairs in a sorted array or reversing structures.
2. **Sliding Window**: Ideal for subarray/substring problems with contiguous bounds.
3. **Fast & Slow Pointer (Floyd's Tortoise and Hare)**: Detect cycles in linked lists or find the midpoint in one pass.
4. **Binary Search**: Divide search space by half at each step; requires monotonicity.
5. **Breadth-First Search (BFS)**: Uses a Queue; optimal for unweighted shortest paths.
6. **Depth-First Search (DFS)**: Uses Recursion / Stack; ideal for backtracking, component counting, topological sort.
`
  },
  {
    id: "note-dbms-acid",
    title: "DBMS: ACID Invariants, Isolation Levels & MVCC",
    subject: "DBMS",
    readTime: "10 min read",
    updatedAt: "2026-10-18",
    tags: ["Transactions", "ACID", "Concurrency", "SQL"],
    summary: "Deep dive into transaction guarantees, concurrency anomalies, and how modern engines implement MVCC.",
    content: `
# ACID Invariants & Concurrency Control

### 1. The Four Pillars of ACID

- **Atomicity**: All changes within a transaction are committed, or none are. Achieved via Undo Logs / Write-Ahead Logs (WAL).
- **Consistency**: Transactions take the database from one valid state satisfying all schema constraints, checks, and foreign keys to another.
- **Isolation**: Concurrent transactions execute without interfering with one another's intermediate state.
- **Durability**: Once committed, changes survive system crashes or power failures. Achieved via Redo Logs flushed to non-volatile storage.

### 2. SQL Isolation Levels & Concurrency Anomalies

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| :--- | :---: | :---: | :---: |
| **Read Uncommitted** | ⚠️ Allowed | ⚠️ Allowed | ⚠️ Allowed |
| **Read Committed** | 🛡️ Prevented | ⚠️ Allowed | ⚠️ Allowed |
| **Repeatable Read** | 🛡️ Prevented | 🛡️ Prevented | ⚠️ Allowed (Prevented in Postgres) |
| **Serializable** | 🛡️ Prevented | 🛡️ Prevented | 🛡️ Prevented |

### 3. Multi-Version Concurrency Control (MVCC)
Instead of locking rows for reading, engines like PostgreSQL and MySQL InnoDB keep multiple snapshots of rows tagged with transaction IDs (xmin/xmax).
- **Readers never block Writers.**
- **Writers never block Readers.**
`
  },
  {
    id: "note-os-virtual-memory",
    title: "Operating Systems: Virtual Memory & Page Tables",
    subject: "Operating Systems",
    readTime: "12 min read",
    updatedAt: "2026-10-20",
    tags: ["Paging", "TLB", "Kernel", "Memory"],
    summary: "How the hardware MMU and OS kernel translate virtual addresses to physical frames with zero memory corruption.",
    content: `
# Virtual Memory Architecture & Paging

### 1. Why Virtual Memory?
1. **Memory Isolation**: A process cannot corrupt or inspect memory belonging to another process or kernel space.
2. **Illusion of Abundant RAM**: Physical RAM can be multiplexed using swap space / disk backing.
3. **Contiguous Virtual Space**: Compilers and linkers can assume a flat, contiguous address space starting at a predictable base.

### 2. Paging Mechanism
Virtual address space is segmented into fixed-size chunks called **Pages** (typically 4 KB). Physical memory is segmented into matching **Page Frames**.

\`\`\`
Virtual Address:
[ Directory Index | Page Table Index | Offset within 4KB Page ]
\`\`\`

### 3. Translation Lookaside Buffer (TLB)
Because multi-level page table lookups would require 3 to 4 RAM memory fetches per memory access, the CPU hardware caches recent translations in the **TLB**.
- **TLB Hit**: Address translated in < 1 clock cycle.
- **TLB Miss**: Hardware page table walker fetches entries from RAM, incurring latency.
`
  },
  {
    id: "note-networking-tcp-udp",
    title: "Computer Networks: TCP vs UDP & The 3-Way Handshake",
    subject: "Computer Networks",
    readTime: "7 min read",
    updatedAt: "2026-10-12",
    tags: ["TCP", "UDP", "Handshake", "Sockets"],
    summary: "Understanding the transport layer: connection states, byte streams, datagrams, and flow control.",
    content: `
# TCP vs UDP Transport Layer Protocols

### 1. TCP 3-Way Handshake
Before any data payload is sent, a TCP connection is established:
1. **Client -> Server: SYN** (Sequence Number = X)
2. **Server -> Client: SYN-ACK** (Ack Number = X + 1, Sequence Number = Y)
3. **Client -> Server: ACK** (Ack Number = Y + 1, Sequence Number = X + 1)

### 2. Tear-down: 4-Way Handshake
1. Client sends **FIN**
2. Server returns **ACK**
3. Server sends **FIN**
4. Client returns **ACK** and enters **TIME_WAIT** state (typically 2x Maximum Segment Lifetime).

### 3. Comparison
- **TCP**: Connection-oriented, guarantees packet order and delivery via checksums and retransmissions, incorporates Congestion Control (Cubic, BBR).
- **UDP**: Connectionless, header size is only 8 bytes (vs TCP 20-60 bytes), zero handshake latency, suitable for real-time voice, video streaming, gaming, and HTTP/3 QUIC.
`
  }
];
