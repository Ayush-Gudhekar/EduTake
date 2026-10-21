// src/data/coursesData.js

export const initialCourses = [
  {
    id: "cs-fundamentals",
    title: "Programming Fundamentals & Problem Solving",
    category: "Programming",
    level: "Beginner",
    rating: 4.9,
    students: "14.2k",
    duration: "12 Hours",
    description: "Master modern programming concepts from the ground up: variables, control flow, functions, memory, algorithmic thinking, and clean code principles.",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=60",
    modules: [
      {
        id: "m1",
        title: "Module 1: Computational Thinking & Basics",
        lessons: [
          {
            id: "pf-101",
            title: "How Computers Execute Code",
            duration: "18m",
            videoId: "AkFi90lZmXA", // Fireship / CS basics
            objectives: [
              "Understand compilation vs interpretation",
              "How CPU and memory interact with program instructions",
              "Basics of binary, bytes, and memory addresses"
            ],
            description: "Explore what really happens under the hood when you write source code and press run."
          },
          {
            id: "pf-102",
            title: "Variables, Types, and Memory Allocation",
            duration: "24m",
            videoId: "zOjov-2OZ0E", // Harvard CS50 preview
            objectives: [
              "Static vs Dynamic typing",
              "Primitive types vs Reference types",
              "Stack vs Heap memory fundamentals"
            ],
            description: "Deep dive into variable scopes, lifetimes, and how values are stored in system memory."
          }
        ]
      },
      {
        id: "m2",
        title: "Module 2: Logic, Functions & Modularity",
        lessons: [
          {
            id: "pf-103",
            title: "Control Flow & Decision Trees",
            duration: "22m",
            videoId: "eWRfhZUzrAc", // Harvard CS50 Lecture
            objectives: [
              "Conditional branching patterns",
              "Loops, recursion, and termination invariants",
              "Avoiding deeply nested logic"
            ],
            description: "Master branching and looping constructs to express complex logic cleanly."
          },
          {
            id: "pf-104",
            title: "Functions, Recursion & Call Stacks",
            duration: "30m",
            videoId: "IJDJ0kBx2LM", // Recursion explanation
            objectives: [
              "Function frames on the execution stack",
              "Pure functions, side effects, and reentrancy",
              "Recursive base cases vs recursive steps"
            ],
            description: "Understand the function call lifecycle and how recursion solves divide-and-conquer problems."
          }
        ]
      }
    ]
  },
  {
    id: "dsa-mastery",
    title: "Data Structures & Algorithms in Depth",
    category: "DSA",
    level: "Intermediate",
    rating: 4.95,
    students: "28.5k",
    duration: "24 Hours",
    description: "Comprehensive guide to Arrays, Linked Lists, Trees, Graphs, Sorting, Dynamic Programming, and Big-O asymptotic analysis.",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=60",
    modules: [
      {
        id: "dsa-m1",
        title: "Module 1: Asymptotics & Linear Structures",
        lessons: [
          {
            id: "dsa-101",
            title: "Big-O Notation & Complexity Analysis",
            duration: "25m",
            videoId: "v4cd1O4zkGw", // CS Dojo Big-O
            objectives: [
              "Time and Space complexity trade-offs",
              "Worst-case O(n), Average Θ(n), Best-case Ω(n)",
              "Common complexity curves from O(1) to O(2^n)"
            ],
            description: "Learn to systematically evaluate computational efficiency using asymptotic notation."
          },
          {
            id: "dsa-102",
            title: "Arrays, Dynamic Arrays & Two-Pointer Technique",
            duration: "32m",
            videoId: "KLlXCFG5TnA", // NeetCode Arrays
            objectives: [
              "Contiguous memory layout & cache locality",
              "Amortized O(1) dynamic array resizing",
              "Two-pointer and sliding window algorithms"
            ],
            description: "Harness sequential memory structures and solve high-frequency interview patterns."
          }
        ]
      },
      {
        id: "dsa-m2",
        title: "Module 2: Non-Linear Structures & Graphs",
        lessons: [
          {
            id: "dsa-103",
            title: "Binary Trees & Binary Search Trees (BST)",
            duration: "35m",
            videoId: "fAAZixBzIAI", // FreeCodeCamp Trees
            objectives: [
              "Pre-order, In-order, Post-order traversals",
              "Balanced trees vs degenerate trees",
              "Search, insertion, and deletion invariants"
            ],
            description: "Understand hierarchical data representation and logarithmic search properties."
          },
          {
            id: "dsa-104",
            title: "Graph Traversal: BFS & DFS Algorithms",
            duration: "40m",
            videoId: "tWVWeAqZ0WU", // Graph algorithms
            objectives: [
              "Adjacency lists vs Adjacency matrices",
              "Breadth-First Search (Queue) for shortest paths",
              "Depth-First Search (Stack/Recursion) for cycle detection"
            ],
            description: "Model complex networks, dependencies, and topological orders with graph algorithms."
          }
        ]
      }
    ]
  },
  {
    id: "dbms-internals",
    title: "Database Management Systems & SQL Internals",
    category: "DBMS",
    level: "Intermediate",
    rating: 4.88,
    students: "19.1k",
    duration: "18 Hours",
    description: "Demystify relational databases, B+ Tree indexing, query planning, ACID transactions, WAL logging, and normalization.",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60",
    modules: [
      {
        id: "db-m1",
        title: "Module 1: Relational Architecture & SQL",
        lessons: [
          {
            id: "db-101",
            title: "Relational Algebra & SQL Execution Order",
            duration: "28m",
            videoId: "HXV3zeRR3h4", // SQL execution
            objectives: [
              "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY",
              "Joins: Nested Loop, Hash Join, Merge Join",
              "Database schema constraints & normalization up to BCNF"
            ],
            description: "Understand how declarative SQL queries are transformed into relational algebra plans."
          },
          {
            id: "db-102",
            title: "B-Trees & B+ Tree Indexing Architecture",
            duration: "34m",
            videoId: "aZjYr87r1b8", // B+ tree explanation
            objectives: [
              "Why databases use B+ trees instead of binary trees",
              "Clustered vs Non-clustered secondary indexes",
              "Range scans and sequential disk I/O optimization"
            ],
            description: "Learn how modern database engines retrieve records in logarithmic time with minimal disk seeks."
          }
        ]
      },
      {
        id: "db-m2",
        title: "Module 2: Concurrency & Transactions",
        lessons: [
          {
            id: "db-103",
            title: "ACID Properties & Isolation Levels",
            duration: "30m",
            videoId: "pomxJOFVcNk", // ACID explanation
            objectives: [
              "Atomicity, Consistency, Isolation, and Durability",
              "Dirty reads, non-repeatable reads, phantom reads",
              "Read Committed, Repeatable Read, and Serializable"
            ],
            description: "Master concurrency control mechanisms and multi-version concurrency control (MVCC)."
          }
        ]
      }
    ]
  },
  {
    id: "os-architecture",
    title: "Operating Systems: Concurrency & Virtual Memory",
    category: "Operating Systems",
    level: "Advanced",
    rating: 4.92,
    students: "16.8k",
    duration: "20 Hours",
    description: "Explore the core bridge between hardware and software: process scheduling, threads, virtual memory, paging, locks, and system calls.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
    modules: [
      {
        id: "os-m1",
        title: "Module 1: Processes, Threads & CPU Scheduling",
        lessons: [
          {
            id: "os-101",
            title: "Processes, Threads & Context Switching",
            duration: "26m",
            videoId: "26QPDBe-NB8", // OS process & thread
            objectives: [
              "Process Control Block (PCB) structure",
              "Kernel threads vs user-space green threads",
              "Context switch overhead and CPU register saving"
            ],
            description: "Understand the lifecycle of processes and how operating systems multiplex CPU cores."
          },
          {
            id: "os-102",
            title: "CPU Scheduling: Round Robin, CFS, & Priority",
            duration: "30m",
            videoId: "ewflkio_W04", // Scheduling algorithms
            objectives: [
              "Preemptive vs non-preemptive scheduling",
              "Linux Completely Fair Scheduler (CFS) red-black tree",
              "Throughput vs turnaround time vs response latency"
            ],
            description: "How modern operating systems balance fairness, interactive response, and batch throughput."
          }
        ]
      },
      {
        id: "os-m2",
        title: "Module 2: Virtual Memory & Synchronization",
        lessons: [
          {
            id: "os-103",
            title: "Virtual Memory, Paging & Translation Lookaside Buffers (TLB)",
            duration: "38m",
            videoId: "qcBIvnQt0Bw", // Virtual memory paging
            objectives: [
              "Virtual address space to physical RAM mapping",
              "Multi-level page tables and Page Fault handling",
              "TLB hardware caching and Least Recently Used (LRU) eviction"
            ],
            description: "Learn how the MMU provides isolated address spaces and memory protection to every program."
          }
        ]
      }
    ]
  },
  {
    id: "computer-networks",
    title: "Computer Networks & The Modern Web Stack",
    category: "Computer Networks",
    level: "Intermediate",
    rating: 4.9,
    students: "22.4k",
    duration: "16 Hours",
    description: "Understand packet routing, TCP three-way handshake, flow control, DNS resolution, TLS/HTTPS encryption, and HTTP/3 QUIC.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    modules: [
      {
        id: "net-m1",
        title: "Module 1: The Internet Protocol Suite",
        lessons: [
          {
            id: "net-101",
            title: "OSI Model vs TCP/IP Stack Explained",
            duration: "25m",
            videoId: "IPvYjXCsTg8", // OSI Model
            objectives: [
              "The 7 layers of OSI and the 4 layers of TCP/IP",
              "Data encapsulation, headers, and trailers",
              "Routers vs switches vs gateways"
            ],
            description: "Walk through the journey of a network packet from physical Ethernet cables to application sockets."
          },
          {
            id: "net-102",
            title: "TCP vs UDP: Handshakes, Reliability & Congestion Control",
            duration: "32m",
            videoId: "uwoD5YsGACg", // TCP UDP Handshake
            objectives: [
              "SYN, SYN-ACK, ACK 3-way handshake",
              "Sliding window protocol and cumulative acknowledgments",
              "TCP Reno/Cubic congestion avoidance algorithms"
            ],
            description: "Deep dive into reliable byte streams versus connectionless low-latency datagrams."
          }
        ]
      },
      {
        id: "net-m2",
        title: "Module 2: Application Layer & Security",
        lessons: [
          {
            id: "net-103",
            title: "DNS Resolution, HTTPS/TLS & HTTP/3 QUIC",
            duration: "35m",
            videoId: "mpQZVYPuDGU", // DNS and HTTPS
            objectives: [
              "Hierarchical DNS caching and recursive resolvers",
              "Diffie-Hellman key exchange and TLS 1.3 certificate chains",
              "HTTP/2 multiplexing vs HTTP/3 QUIC over UDP"
            ],
            description: "How modern web browsers securely and efficiently fetch web resources across the globe."
          }
        ]
      }
    ]
  }
];
