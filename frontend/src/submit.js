/**
 * submitPipeline - Integration module for VectorShift Backend API.
 * 
 * Sends current pipeline nodes and edges to backend /pipelines/parse endpoint
 * and returns graph metrics: { num_nodes, num_edges, is_dag }.
 */
export const submitPipeline = async (nodes, edges) => {
  try {
    const response = await fetch('http://localhost:8000/pipelines/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          data: node.data,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle,
        })),
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `Server returned status code ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting pipeline:', error);
    throw error;
  }
};
