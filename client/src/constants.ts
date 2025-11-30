import type { Subject } from './types';

export const INITIAL_SYLLABUS: Subject[] = [
  {
    id: 'em',
    name: 'Engineering Mathematics',
    chapters: [
      { id: 'em-1', name: 'Discrete Mathematics', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'em-2', name: 'Linear Algebra', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'em-3', name: 'Calculus', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'em-4', name: 'Probability & Statistics', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
    ]
  },
  {
    id: 'dl',
    name: 'Digital Logic',
    chapters: [
      { id: 'dl-1', name: 'Boolean Algebra', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'dl-2', name: 'Combinational Circuits', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'dl-3', name: 'Sequential Circuits', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'dl-4', name: 'Number Representations', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
    ]
  },
  {
    id: 'coa',
    name: 'Computer Organization & Architecture',
    chapters: [
      { id: 'coa-1', name: 'Machine Instructions & Addressing Modes', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'coa-2', name: 'ALU, Data Path & Control Unit', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'coa-3', name: 'Instruction Pipelining', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'coa-4', name: 'Memory Hierarchy (Cache, Main, Secondary)', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'coa-5', name: 'I/O Interface', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
    ]
  },
  {
    id: 'pds',
    name: 'Programming & Data Structures',
    chapters: [
      { id: 'pds-1', name: 'C Programming', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'pds-2', name: 'Recursion', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'pds-3', name: 'Arrays, Stacks, Queues', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'pds-4', name: 'Linked Lists', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'pds-5', name: 'Trees', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'pds-6', name: 'Binary Search Trees', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'pds-7', name: 'Binary Heaps', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'pds-8', name: 'Graphs', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
    ]
  },
  {
    id: 'algo',
    name: 'Algorithms',
    chapters: [
      { id: 'algo-1', name: 'Asymptotic Analysis', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'algo-2', name: 'Divide & Conquer', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'algo-3', name: 'Greedy Algorithms', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'algo-4', name: 'Dynamic Programming', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'algo-5', name: 'Graph Algorithms (BFS/DFS/Shortest Path/MST)', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'algo-6', name: 'Hashing', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
    ]
  },
  {
    id: 'toc',
    name: 'Theory of Computation',
    chapters: [
      { id: 'toc-1', name: 'Regular Languages & Finite Automata', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'toc-2', name: 'Context-Free Languages & Pushdown Automata', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'toc-3', name: 'Recursive & Recursively Enumerable Languages', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'toc-4', name: 'Turing Machines & Undecidability', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
    ]
  },
  {
    id: 'cd',
    name: 'Compiler Design',
    chapters: [
      { id: 'cd-1', name: 'Lexical Analysis', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'cd-2', name: 'Parsing (Top-down & Bottom-up)', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'cd-3', name: 'Syntax Directed Translation', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'cd-4', name: 'Intermediate Code Generation', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'cd-5', name: 'Code Optimization', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
    ]
  },
  {
    id: 'os',
    name: 'Operating Systems',
    chapters: [
      { id: 'os-1', name: 'Processes & Threads', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'os-2', name: 'CPU Scheduling', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'os-3', name: 'Synchronization & Deadlocks', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'os-4', name: 'Memory Management & Virtual Memory', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'os-5', name: 'File Systems', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
    ]
  },
  {
    id: 'dbms',
    name: 'Database Management Systems',
    chapters: [
      { id: 'dbms-1', name: 'ER Model', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'dbms-2', name: 'Relational Model & Algebra', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'dbms-3', name: 'SQL', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'dbms-4', name: 'Normalization', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'dbms-5', name: 'Transactions & Concurrency Control', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'dbms-6', name: 'File Organization & Indexing (B/B+ Trees)', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
    ]
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    chapters: [
      { id: 'cn-1', name: 'OSI & TCP/IP Stack', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'cn-2', name: 'Data Link Layer (Flow/Error Control, MAC)', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'cn-3', name: 'Network Layer (IP, Routing)', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'cn-4', name: 'Transport Layer (TCP/UDP, Congestion)', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'cn-5', name: 'Application Layer (HTTP, DNS, SMTP)', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
    ]
  },
  {
    id: 'ga',
    name: 'General Aptitude',
    chapters: [
      { id: 'ga-1', name: 'Quantitative Aptitude', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'ga-2', name: 'Analytical Aptitude', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'ga-3', name: 'Spatial Aptitude', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
      { id: 'ga-4', name: 'Verbal Aptitude', isCompleted: false, revision1: false, revision2: false, pyqSolved: false },
    ]
  },
];
