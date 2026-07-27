from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any

app = FastAPI(
    title="VectorShift Pipeline Parser API",
    description="Backend service for pipeline topology validation and DAG analysis",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineParseRequest(BaseModel):
    nodes: List[Dict[str, Any]] = Field(default_factory=list)
    edges: List[Dict[str, Any]] = Field(default_factory=list)

class PipelineParseResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

def check_is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Determines if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG)
    using Kahn's Algorithm (Topological Sort BFS).
    """
    # Collect all unique node IDs
    node_ids = {str(n.get("id")) for n in nodes if n.get("id") is not None}
    
    # Also collect any node IDs referenced in edges
    for edge in edges:
        source = str(edge.get("source")) if edge.get("source") is not None else None
        target = str(edge.get("target")) if edge.get("target") is not None else None
        if source:
            node_ids.add(source)
        if target:
            node_ids.add(target)

    if not node_ids:
        return True

    # Build adjacency list and calculate in-degrees
    adj: Dict[str, List[str]] = {nid: [] for nid in node_ids}
    in_degree: Dict[str, int] = {nid: 0 for nid in node_ids}

    for edge in edges:
        source = str(edge.get("source")) if edge.get("source") is not None else None
        target = str(edge.get("target")) if edge.get("target") is not None else None
        
        if source in adj and target in in_degree:
            adj[source].append(target)
            in_degree[target] += 1

    # Kahn's algorithm: queue nodes with 0 in-degree
    queue = [nid for nid in node_ids if in_degree[nid] == 0]
    visited_count = 0

    while queue:
        curr = queue.pop(0)
        visited_count += 1

        for neighbor in adj[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If visited_count equals total nodes, no cycle exists -> it is a DAG
    return visited_count == len(node_ids)

@app.get("/")
def read_root():
    return {"status": "online", "message": "VectorShift Pipeline Parser API is running"}

@app.post("/pipelines/parse", response_model=PipelineParseResponse)
def parse_pipeline(pipeline: PipelineParseRequest):
    try:
        nodes = pipeline.nodes
        edges = pipeline.edges

        num_nodes = len(nodes)
        num_edges = len(edges)
        is_dag = check_is_dag(nodes, edges)

        return PipelineParseResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_dag
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse pipeline: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
