# VectorShift - Visual Flow Architecture & Pipeline Studio

A modern, full-stack visual pipeline builder built with **React**, **React Flow**, **Zustand**, and **FastAPI**. Includes a modular node abstraction system, real-time dynamic text variable handle parsing, and directed acyclic graph (DAG) cycle detection.

Repository: [git@github.com:robink2404/VectorTask.git](https://github.com/robink2404/VectorTask)

---

## 🟢 Happy Path Flow Examples (Valid DAGs)

### Happy Case 1: Standard Linear Flow
- **Visual Flow**:
  `Input Node` $\rightarrow$ `Text Node` $\rightarrow$ `LLM Node` $\rightarrow$ `Output Node`

- **Edge List**:
  `[ ("Input", "Text"), ("Text", "LLM"), ("LLM", "Output") ]`

- **Adjacency Matrix**:
  | From \ To | Input | Text | LLM | Output |
  |---|:---:|:---:|:---:|:---:|
  | **Input** | 0 | 1 | 0 | 0 |
  | **Text** | 0 | 0 | 1 | 0 |
  | **LLM** | 0 | 0 | 0 | 1 |
  | **Output** | 0 | 0 | 0 | 0 |

- **In-Degree Calculation**:
  - `Input`: 0 (Queue)
  - `Text`: 1 $\rightarrow$ 0
  - `LLM`: 1 $\rightarrow$ 0
  - `Output`: 1 $\rightarrow$ 0
  - **Result**: `is_dag = true` ✅

---

### Happy Case 2: Diamond Multi-Branch Split & Merge Flow
- **Visual Flow**:
  ```
                 ↗ Transform Node ↘
  Input Node $\rightarrow$                   $\rightarrow$ LLM Node $\rightarrow$ Output Node
                 ↘ API Request Node ↗
  ```

- **Edge List**:
  `[ ("Input", "Transform"), ("Input", "API"), ("Transform", "LLM"), ("API", "LLM"), ("LLM", "Output") ]`

- **Adjacency Matrix**:
  | From \ To | Input | Transform | API | LLM | Output |
  |---|:---:|:---:|:---:|:---:|:---:|
  | **Input** | 0 | 1 | 1 | 0 | 0 |
  | **Transform** | 0 | 0 | 0 | 1 | 0 |
  | **API** | 0 | 0 | 0 | 1 | 0 |
  | **LLM** | 0 | 0 | 0 | 0 | 1 |
  | **Output** | 0 | 0 | 0 | 0 | 0 |

- **Result**: `is_dag = true` ✅

---

### Happy Case 3: Conditional Branching Flow
- **Visual Flow**:
  ```
                             ↗ [True]  $\rightarrow$ LLM Node $\rightarrow$ Output Node
  Input Node $\rightarrow$ Conditional Node
                             ↘ [False] $\rightarrow$ Note Node
  ```

- **Edge List**:
  `[ ("Input", "Conditional"), ("Conditional", "LLM"), ("Conditional", "Note"), ("LLM", "Output") ]`

- **Result**: `is_dag = true` ✅

---

## 🔴 Failed Path Flow Examples (Cycles / Non-DAGs)

### Failed Case 1: Feedback Loop Cycle
- **Visual Flow**:
  `Input Node` $\rightarrow$ `Text Node` $\rightarrow$ `LLM Node` $\rightarrow$ `Filter Node` $\rightarrow$ `Text Node` *(Feedback Loop!)*

- **Edge List**:
  `[ ("Input", "Text"), ("Text", "LLM"), ("LLM", "Filter"), ("Filter", "Text") ]`

- **Adjacency Matrix**:
  | From \ To | Input | Text | LLM | Filter |
  |---|:---:|:---:|:---:|:---:|
  | **Input** | 0 | 1 | 0 | 0 |
  | **Text** | 0 | 0 | 1 | 0 |
  | **LLM** | 0 | 0 | 0 | 1 |
  | **Filter** | 0 | **1** | 0 | 0 |

- **In-Degree Calculation**:
  - `Input`: 0 (Processed)
  - `Text`: In-degree = 2 (`Input` and `Filter`). After processing `Input`, `Text` in-degree = 1.
  - `LLM`: In-degree = 1.
  - `Filter`: In-degree = 1.
  - Queue becomes empty while 3 nodes remain unvisited!
  - **Result**: `is_dag = false` ❌ *(Cycle Detected!)*

---

### Failed Case 2: Self-Referential Loop
- **Visual Flow**:
  `Input Node` $\rightarrow$ `LLM Node` $\circlearrowleft$ *(Self Loop)* $\rightarrow$ `Output Node`

- **Edge List**:
  `[ ("Input", "LLM"), ("LLM", "LLM"), ("LLM", "Output") ]`

- **Adjacency Matrix**:
  | From \ To | Input | LLM | Output |
  |---|:---:|:---:|:---:|
  | **Input** | 0 | 1 | 0 |
  | **LLM** | 0 | **1** | 1 |
  | **Output** | 0 | 0 | 0 |

- **Result**: `is_dag = false` ❌ *(Self Loop Cycle Detected!)*

---

### Failed Case 3: Disconnected Graph with Hidden Cycle
- **Visual Flow**:
  - Subgraph A: `Input Node` $\rightarrow$ `Output Node` *(Valid DAG)*
  - Subgraph B: `Transform Node` $\rightarrow$ `Filter Node` $\rightarrow$ `API Node` $\rightarrow$ `Transform Node` *(Cycle!)*

- **Edge List**:
  `[ ("Input", "Output"), ("Transform", "Filter"), ("Filter", "API"), ("API", "Transform") ]`

- **Adjacency Matrix**:
  | From \ To | Input | Output | Transform | Filter | API |
  |---|:---:|:---:|:---:|:---:|:---:|
  | **Input** | 0 | 1 | 0 | 0 | 0 |
  | **Output** | 0 | 0 | 0 | 0 | 0 |
  | **Transform** | 0 | 0 | 0 | 1 | 0 |
  | **Filter** | 0 | 0 | 0 | 0 | 1 |
  | **API** | 0 | 0 | **1** | 0 | 0 |

- **Result**: `is_dag = false` ❌ *(Cycle in Subgraph B!)*

---

## 🛠️ Key Features Implementation

### 1. Node Abstraction Engine (`BaseNode.js`)
- Standardizes container cards, header actions, delete controls, form controls, and custom handle positioning across all nodes.
- **Original Refactored Nodes**: `InputNode`, `OutputNode`, `LLMNode`, `TextNode`.
- **5 New Custom Nodes**: `FilterNode`, `TransformNode`, `APIRequestNode`, `NoteNode`, `ConditionalNode`.

### 2. Dynamic Text Node Logic
- **Real-Time Auto-Resizing**: Dynamically calculates container width and tracks `scrollHeight` height as text is entered.
- **Variable Handle Extraction**: Scans text using regex `/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g`. Automatically creates dynamic target handles on the left side of the `TextNode` for valid JavaScript variable names.

### 3. FastAPI Backend & Graph Topology Validation
- Endpoint: `POST /pipelines/parse`
- Calculates `num_nodes`, `num_edges`, and checks if graph is a DAG using Kahn's Algorithm (BFS).
