# VectorShift Frontend Technical Assessment - Video Demo Script & Presentation Speech

Use this step-by-step script and speech guide while recording your screen for your assessment submission.

---

## ⏱️ Video Demo Overview (Target Duration: ~3 to 4 Minutes)

| Time | Section | Screen Action |
|---|---|---|
| **0:00 - 0:30** | **1. Introduction** | Show full studio interface running at `http://localhost:3000`. |
| **0:30 - 1:30** | **2. Part 1: Node Abstraction & 5 New Nodes** | Drag & drop the 5 new custom nodes from the sidebar onto the canvas. |
| **1:30 - 2:00** | **3. Part 2: Styling & Design System** | Show VectorShift dark glassmorphism, glowing handles, theme controls. |
| **2:00 - 2:45** | **4. Part 3: Dynamic Text Node Logic** | Type text with `{{ user_id }}` and `{{ prompt }}`; show dynamic resizing & handle creation. |
| **2:45 - 3:30** | **5. Part 4: Backend Integration & DAG Validation** | Click **Submit Pipeline** to show valid DAG modal; connect a cycle and show **Cycle Detected** modal. |
| **3:30 - 3:45** | **6. Conclusion & Repository** | Wrap up and highlight GitHub repository link (`git@github.com:robink2404/VectorTask.git`). |

---

## 🎙️ Complete Voiceover & Presentation Speech

### 🎬 Part 1: Introduction (0:00 - 0:30)
> *"Hello everyone! Thank you for reviewing my submission for the VectorShift Frontend Technical Assessment. Today I am excited to demonstrate the visual pipeline builder I built from scratch using React, React Flow, Zustand, and a FastAPI backend.*
>
> *I have implemented all four parts of the technical assessment: Node Abstraction, Glassmorphism Styling, Dynamic Text Node Variable Logic, and Backend Graph Cycle Detection (DAG Validation). Let’s dive right in!"*

---

### 🎬 Part 2: Node Abstraction & 5 New Nodes (0:30 - 1:30)
> *"Starting with Part 1: Node Abstraction.*
>
> *Instead of duplicating component code for every new node, I created a core reusable abstraction engine in `BaseNode.js`. It encapsulates header controls, delete actions, dynamic input and output handle generation, styled form controls, and automatic state sync to our Zustand store.*
>
> *Using this abstraction, I refactored the four original nodes—Input, Output, LLM, and Text—and built **five brand new custom nodes** to showcase its flexibility:*
> 1. *First, the **Filter Node**—which filters incoming datasets with condition selectors and dual `Passed` and `Failed` output handles.*
> 2. *Second, the **Transform Data Node**—supporting JSON parsing, stringifying, uppercase conversion, and keypath extraction.*
> 3. *Third, the **API Request Node**—an HTTP client supporting GET, POST, PUT, and DELETE methods.*
> 4. *Fourth, the **Canvas Note Node**—a sticky annotation block for workflow documentation.*
> 5. *And fifth, the **Conditional Split Node**—providing logical branching with comparison operators like equal, greater than, or less than."*

---

### 🎬 Part 3: Styling & UI Experience (1:30 - 2:00)
> *"Moving to Part 2: Styling.*
>
> *I designed a sleek, modern VectorShift glassmorphism theme with a deep `#0b0f19` canvas, custom background dot grid, color-coded node category borders, glowing interactive handles, a categorized drag-and-drop toolbar, and canvas mini-map controls."*

---

### 🎬 Part 4: Dynamic Text Node & Variable Handles (2:00 - 2:45)
> *"Now for Part 3: Dynamic Text Node Logic.*
>
> *Here in the Text Node, watch what happens as I type text containing variables surrounded by double curly brackets, like `{{ user_prompt }}` and `{{ context_data }}`.*
>
> *Our regex engine detects valid JavaScript variable names in real-time, automatically generating dynamic Target Handles on the left side of the node and registering them with `useUpdateNodeInternals`.*
>
> *Notice also that as I type multi-line or longer text, both the container width and height adjust dynamically in real-time using `scrollHeight` measurements, ensuring full visibility without any awkward scrollbars."*

---

### 🎬 Part 5: Backend Integration & DAG Validation (2:45 - 3:30)
> *"Finally, Part 4: Backend Integration.*
>
> *When I click **Submit Pipeline**, the frontend extracts the complete node and edge graph structure and sends a POST request to our FastAPI backend endpoint `/pipelines/parse`.*
>
> *On the backend, we run **Kahn’s Topological Sort Algorithm (BFS)** to calculate the total number of nodes, total edges, and check whether the graph is a Directed Acyclic Graph.*
>
> *As you can see on screen, for our valid flow, the backend returns 4 nodes, 3 edges, and `is_dag: true`, displaying a green success modal.*
>
> *Now, let's create a cyclic loop by connecting the output of our LLM node back into the input of our Text node. When I click **Submit Pipeline** again, Kahn's algorithm detects the cycle, returning `is_dag: false`, and our alert modal displays a prominent **Cycle Detected** warning!"*

---

### 🎬 Part 6: Conclusion (3:30 - 3:45)
> *"All 12 automated unit tests for graph analysis are passing, and the complete codebase is pushed to my GitHub repository at `git@github.com:robink2404/VectorTask.git`.*
>
> *Thank you very much for your time and consideration!"*
