# VectorShift - Visual Flow Architecture & Pipeline Studio

A modern, full-stack visual pipeline builder built with **React**, **React Flow**, **Zustand**, and **FastAPI**. Includes a modular node abstraction system, real-time dynamic text variable handle parsing, and directed acyclic graph (DAG) cycle detection.

Repository: [git@github.com:robink2404/VectorTask.git](https://github.com/robink2404/VectorTask)

---

## 🌟 Key Features

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
- **Variable Handle Extraction**: Scans text using regex `/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g`. Automatically creates dynamic target handles on the left side of the `TextNode` for valid JavaScript variable names and registers them with `useUpdateNodeInternals`.

### 3. FastAPI Backend & Graph Topology Validation
- Endpoint: `POST /pipelines/parse`
- Calculates `num_nodes`, `num_edges`, and checks if the graph is a Directed Acyclic Graph (`is_dag`) using **Kahn's Algorithm (Topological Sort BFS)**.

---

## 🧪 Detailed Test Case Examples

### A. Happy Path Test Cases (Success Scenarios)

#### Happy Case 1: Standard Linear Pipeline DAG
- **Scenario**: A 4-node flow where user query flows from Input -> Text Template -> LLM Model -> Output.
- **Request Payload (`POST /pipelines/parse`)**:
```json
{
  "nodes": [
    { "id": "input-1", "type": "customInput" },
    { "id": "text-1", "type": "text", "data": { "text": "Summary for {{ prompt }}" } },
    { "id": "llm-1", "type": "llm" },
    { "id": "output-1", "type": "customOutput" }
  ],
  "edges": [
    { "id": "e1-2", "source": "input-1", "target": "text-1" },
    { "id": "e2-3", "source": "text-1", "target": "llm-1" },
    { "id": "e3-4", "source": "llm-1", "target": "output-1" }
  ]
}
```
- **Backend Response (`200 OK`)**:
```json
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}
```
- **Frontend Alert**: Displays green badge `Valid Directed Acyclic Graph (DAG)`.

---

#### Happy Case 2: Multi-Branch Diamond DAG
- **Scenario**: Node 1 splits into Node 2 and Node 3, which both merge into Node 4.
- **Request Payload**:
```json
{
  "nodes": [
    { "id": "N1" }, { "id": "N2" }, { "id": "N3" }, { "id": "N4" }
  ],
  "edges": [
    { "id": "e1", "source": "N1", "target": "N2" },
    { "id": "e2", "source": "N1", "target": "N3" },
    { "id": "e3", "source": "N2", "target": "N4" },
    { "id": "e4", "source": "N3", "target": "N4" }
  ]
}
```
- **Backend Response**:
```json
{
  "num_nodes": 4,
  "num_edges": 4,
  "is_dag": true
}
```

---

#### Happy Case 3: Valid Variable Extraction in Text Node
- **Text Input**: `"Hello {{ user_name }}, your order ID is {{ order_id }}."`
- **Parsed Result**:
  - Valid Variable Handles Created: `user_name`, `order_id` (2 Target handles on left).
  - Deduplicated & Valid JS identifiers.

---

### B. Failed Path & Edge Test Cases (Error & Cycle Scenarios)

#### Failed Case 1: Direct 2-Node Circular Dependency (Not a DAG)
- **Scenario**: Output feeds directly back into Input (`N1 -> N2` and `N2 -> N1`).
- **Request Payload**:
```json
{
  "nodes": [
    { "id": "N1" }, { "id": "N2" }
  ],
  "edges": [
    { "id": "e1", "source": "N1", "target": "N2" },
    { "id": "e2", "source": "N2", "target": "N1" }
  ]
}
```
- **Backend Response (`200 OK`)**:
```json
{
  "num_nodes": 2,
  "num_edges": 2,
  "is_dag": false
}
```
- **Frontend Alert**: Displays red badge `Cycle Detected in Pipeline`.

---

#### Failed Case 2: Disconnected Subgraph with Hidden Loop
- **Scenario**: Subgraph A (`1 -> 2`) is linear, but Subgraph B (`3 -> 4 -> 5 -> 3`) contains a 3-node loop.
- **Request Payload**:
```json
{
  "nodes": [
    { "id": "1" }, { "id": "2" }, { "id": "3" }, { "id": "4" }, { "id": "5" }
  ],
  "edges": [
    { "id": "e1", "source": "1", "target": "2" },
    { "id": "e2", "source": "3", "target": "4" },
    { "id": "e3", "source": "4", "target": "5" },
    { "id": "e4", "source": "5", "target": "3" }
  ]
}
```
- **Backend Response**:
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": false
}
```

---

#### Failed Case 3: Invalid JS Variable Names in Text Input
- **Text Input**: `"Invalid variables: {{ 123digit }} {{ user-name }} {{ @admin }}"`
- **Result**:
  - `123digit`: Rejected (starts with a number).
  - `user-name`: Rejected (`-` is minus operator, not valid JS identifier).
  - `@admin`: Rejected (`@` invalid character).
  - **No target handles created for invalid expressions**.

---

## 🛠️ Installation & Setup

### 1. Backend Setup (FastAPI)
```bash
cd backend
python3 -m venv venv
./venv/bin/pip install -r requirements.txt
./venv/bin/uvicorn main:app --reload --port 8000
```

### 2. Run Automated Graph Tests
```bash
cd backend
./venv/bin/python test_dag.py
```

### 3. Frontend Setup (React Flow)
```bash
cd frontend
npm install
npm start
```

Access the app at [http://localhost:3000](http://localhost:3000).
