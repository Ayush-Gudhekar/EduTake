// src/data/quizzesData.js

export const initialQuizzes = [
  {
    id: "quiz-programming-core",
    title: "Programming Fundamentals & Memory Diagnostics",
    category: "Programming",
    difficulty: "Beginner",
    timeLimitMinutes: 10,
    questions: [
      {
        id: "q1",
        question: "Which memory segment stores local variables and tracks active function call execution frames?",
        options: [
          "The Heap",
          "The Call Stack",
          "The BSS Segment",
          "The Data Segment"
        ],
        correctIndex: 1,
        explanation: "The Call Stack automatically allocates and deallocates stack frames for local variables when functions are entered and exited."
      },
      {
        id: "q2",
        question: "What is the primary difference between a compiled language (e.g., C++) and an interpreted language (e.g., standard Python)?",
        options: [
          "Interpreted languages do not use machine CPU registers",
          "Compiled languages transform source code directly into target machine code prior to execution",
          "Compiled languages cannot run loops",
          "Interpreted code is always faster than compiled code"
        ],
        correctIndex: 1,
        explanation: "Compilers convert code into target machine binaries ahead-of-time (AOT), whereas interpreters execute instructions line-by-line via a runtime virtual machine."
      },
      {
        id: "q3",
        question: "What fatal runtime condition occurs when a recursive function lacks a valid terminating base case?",
        options: [
          "Segmentation Fault / Stack Overflow",
          "Deadlock",
          "Memory Fragmentation",
          "Priority Inversion"
        ],
        correctIndex: 0,
        explanation: "Unbounded recursion continuously pushes new stack frames onto the call stack until all allocated stack memory is exhausted, throwing a Stack Overflow error."
      }
    ]
  },
  {
    id: "quiz-dsa-mastery",
    title: "DSA: Asymptotics, Trees & Graph Invariants",
    category: "DSA",
    difficulty: "Intermediate",
    timeLimitMinutes: 15,
    questions: [
      {
        id: "q4",
        question: "What is the worst-case time complexity of searching for an element in an unbalanced (degenerate) Binary Search Tree with N nodes?",
        options: [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        correctIndex: 2,
        explanation: "If inserted in strictly ascending or descending order, an unbalanced BST degenerates into a linear linked list where search takes O(N) comparisons."
      },
      {
        id: "q5",
        question: "Which data structure is primarily utilized to perform Breadth-First Search (BFS) on an unweighted graph?",
        options: [
          "Queue (FIFO)",
          "Stack (LIFO)",
          "Priority Queue / Heap",
          "Disjoint Set Union (DSU)"
        ],
        correctIndex: 0,
        explanation: "BFS explores nodes layer by layer in level-order, necessitating a First-In-First-Out Queue."
      },
      {
        id: "q6",
        question: "What is the amortized time complexity of inserting an element into a dynamic array (e.g., std::vector or Python list)?",
        options: [
          "O(N)",
          "O(log N)",
          "O(1)",
          "O(N^2)"
        ],
        correctIndex: 2,
        explanation: "Although resizing and copying takes O(N) when capacity doubles, the cost distributed over all preceding insertions is amortized O(1)."
      }
    ]
  },
  {
    id: "quiz-dbms-internals",
    title: "DBMS: ACID, Normalization & Indexing",
    category: "DBMS",
    difficulty: "Intermediate",
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q7",
        question: "Why do relational database engines employ B+ Trees instead of standard binary trees for disk-based table indexes?",
        options: [
          "B+ trees avoid disk caching entirely",
          "B+ trees have a high branching factor (fanout), reducing expensive disk I/O seeks, and leaf nodes form a linked list for range queries",
          "Binary trees require non-relational JSON schemas",
          "B+ trees store all data records inside root nodes"
        ],
        correctIndex: 1,
        explanation: "High fanout keeps the tree height small (usually 3-4 levels for millions of records), requiring minimal disk seeks, while linked leaves optimize range scans."
      },
      {
        id: "q8",
        question: "Which SQL isolation level allows a transaction to read uncommitted changes made by concurrent transactions (Dirty Reads)?",
        options: [
          "Serializable",
          "Repeatable Read",
          "Read Committed",
          "Read Uncommitted"
        ],
        correctIndex: 3,
        explanation: "Read Uncommitted is the lowest isolation level and permits dirty reads, where uncommitted and potentially rolled-back data is read."
      }
    ]
  },
  {
    id: "quiz-os-internals",
    title: "OS: Scheduling, Virtual Memory & Concurrency",
    category: "Operating Systems",
    difficulty: "Advanced",
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q9",
        question: "What hardware cache inside the CPU MMU stores recent virtual-to-physical address translations to accelerate memory access?",
        options: [
          "Translation Lookaside Buffer (TLB)",
          "Instruction Cache (L1i)",
          "Direct Memory Access (DMA) controller",
          "Branch Target Buffer"
        ],
        correctIndex: 0,
        explanation: "The TLB caches page table entries so that virtual memory translation happens in sub-nanosecond hardware cycles without repeated RAM lookups."
      },
      {
        id: "q10",
        question: "Which of the following is NOT one of Coffman's four conditions required for a Deadlock to occur?",
        options: [
          "Mutual Exclusion",
          "Hold and Wait",
          "Preemption by Priority",
          "Circular Wait"
        ],
        correctIndex: 2,
        explanation: "The fourth condition is 'No Preemption' (resources cannot be forcibly reclaimed). Preemption by priority actually prevents deadlocks."
      }
    ]
  },
  {
    id: "quiz-networks-core",
    title: "Computer Networks: Protocols, Packets & Security",
    category: "Computer Networks",
    difficulty: "Intermediate",
    timeLimitMinutes: 10,
    questions: [
      {
        id: "q11",
        question: "What is the sequence of packet flags exchanged during a standard TCP connection establishment?",
        options: [
          "SYN -> SYN-ACK -> ACK",
          "ACK -> SYN -> ACK-SYN",
          "FIN -> ACK -> FIN-ACK",
          "SYN -> ACK -> DATA"
        ],
        correctIndex: 0,
        explanation: "The TCP 3-way handshake begins with client SYN, followed by server SYN-ACK, and finalized by client ACK."
      },
      {
        id: "q12",
        question: "Which transport protocol underpins HTTP/3 (QUIC) to eradicate head-of-line blocking associated with TCP?",
        options: [
          "UDP",
          "SCTP",
          "ICMP",
          "IPsec"
        ],
        correctIndex: 0,
        explanation: "HTTP/3 uses QUIC over UDP, managing encryption and multiplexing independently per stream so packet loss on one stream does not stall others."
      }
    ]
  }
];
