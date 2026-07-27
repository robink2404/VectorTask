# VectorShift - Visual Flow Architecture & Pipeline Studio

A modern, full-stack visual pipeline builder built with **React**, **React Flow**, **Zustand**, and **FastAPI**. Includes a modular node abstraction system, real-time dynamic text variable handle parsing, and directed acyclic graph (DAG) cycle detection.

Repository: [git@github.com:robink2404/VectorTask.git](https://github.com/robink2404/VectorTask)

---

## 🚀 Quick Start Guide: Installation & Execution Flow

```
+-----------------------------------------------------------------------------------+
|                            INSTALLATION & EXECUTION FLOW                          |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  1. Clone Repository                                                              |
|     └─> git clone git@github.com:robink2404/VectorTask.git                        |
|                                                                                   |
|  2. Backend Setup (FastAPI)               3. Frontend Setup (React Flow)          |
|     ├─> cd backend                            ├─> cd frontend                         |
|     ├─> python3 -m venv venv                  ├─> npm install                         |
|     ├─> ./venv/bin/pip install -r reqs.txt    └─> npm start                           |
|     └─> ./venv/bin/uvicorn main:app --reload        (Opens http://localhost:3000)   |
|         (Server running on port 8000)                                             |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 📋 Detailed Instructions: How to Install Libraries & Run

### Prerequisites
Make sure you have installed on your machine:
- **Node.js** (v16+ or v18+) and `npm`
- **Python** (v3.9+) and `pip`
- **Git**

---

### Step 1: Clone the Repository
```bash
git clone git@github.com:robink2404/VectorTask.git
cd VectorTask
```

---

### Step 2: Install Libraries & Start Backend (FastAPI)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create a Python Virtual Environment:
   ```bash
   python3 -m venv venv
   ```

3. Activate Virtual Environment (Optional):
   - **macOS / Linux**: `source venv/bin/activate`
   - **Windows**: `venv\Scripts\activate`

4. Install Required Dependencies (`fastapi`, `uvicorn`, `pydantic`):
   ```bash
   ./venv/bin/pip install -r requirements.txt
   ```

5. Run the Backend API Server:
   ```bash
   ./venv/bin/uvicorn main:app --reload --port 8000
   ```
   *The backend will be running live at `http://localhost:8000`.*

6. *(Optional)* Run Automated Graph DAG Tests:
   In a new terminal window inside `backend/`:
   ```bash
   ./venv/bin/python test_dag.py
   ```

---

### Step 3: Install Libraries & Start Frontend (React + React Flow)

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install Node Dependencies (`reactflow`, `zustand`, `lucide-react`, `react-scripts`):
   ```bash
   npm install
   ```

3. Launch the React Development Server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   **`http://localhost:3000`**

---

## 🌟 Features Overview

### 1. Node Abstraction Engine (`BaseNode.js`)
- Standardizes container cards, header actions, delete controls, form controls, and custom handle positioning across all nodes.
- **Original Refactored Nodes**: `InputNode`, `OutputNode`, `LLMNode`, `TextNode`.
- **5 New Custom Nodes**:
  - `FilterNode`: Conditional dataset filtering with `Passed` / `Failed` handles.
  - `TransformNode`: Data mapper for JSON parsing, stringifying, uppercase, and keypath extraction.
  - `APIRequestNode`: HTTP client node supporting GET, POST, PUT, DELETE requests.
  - `NoteNode`: Canvas annotation sticky note for workflow documentation.
  - `ConditionalNode`: Logic splitter with comparison operators (`==`, `!=`, `>`, `<`, `>=`, `<=`).

### 2. Dynamic Text Node Logic
- **Real-Time Auto-Resizing**: Dynamically calculates container width and tracks `scrollHeight` height as text is entered.
- **Variable Handle Extraction**: Scans text using regex `/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g`. Automatically creates dynamic target handles on the left side of the `TextNode` for valid JavaScript variable names.

### 3. FastAPI Backend & Graph Topology Validation
- Endpoint: `POST /pipelines/parse`
- Calculates `num_nodes`, `num_edges`, and checks if the graph is a Directed Acyclic Graph (`is_dag`) using **Kahn's Algorithm (Topological Sort BFS)**.

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
