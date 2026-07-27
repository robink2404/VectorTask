import unittest
from main import check_is_dag

class TestDAGAlgorithm(unittest.TestCase):
    def test_empty_graph(self):
        """Edge Case 1: Empty pipeline with 0 nodes and 0 edges"""
        self.assertTrue(check_is_dag([], []))

    def test_single_node_no_edges(self):
        """Edge Case 2: Isolated single node with no connections"""
        nodes = [{"id": "node-1"}]
        edges = []
        self.assertTrue(check_is_dag(nodes, edges))

    def test_linear_dag(self):
        """Standard Case: Linear DAG pipeline (1 -> 2 -> 3)"""
        nodes = [{"id": "1"}, {"id": "2"}, {"id": "3"}]
        edges = [
            {"id": "e1", "source": "1", "target": "2"},
            {"id": "e2", "source": "2", "target": "3"}
        ]
        self.assertTrue(check_is_dag(nodes, edges))

    def test_diamond_dag(self):
        """Standard Case: Diamond DAG (1 -> 2, 1 -> 3, 2 -> 4, 3 -> 4)"""
        nodes = [{"id": "1"}, {"id": "2"}, {"id": "3"}, {"id": "4"}]
        edges = [
            {"id": "e1", "source": "1", "target": "2"},
            {"id": "e2", "source": "1", "target": "3"},
            {"id": "e3", "source": "2", "target": "4"},
            {"id": "e4", "source": "3", "target": "4"}
        ]
        self.assertTrue(check_is_dag(nodes, edges))

    def test_simple_cycle(self):
        """Edge Case 3: Direct 2-node cycle (1 -> 2 -> 1)"""
        nodes = [{"id": "1"}, {"id": "2"}]
        edges = [
            {"id": "e1", "source": "1", "target": "2"},
            {"id": "e2", "source": "2", "target": "1"}
        ]
        self.assertFalse(check_is_dag(nodes, edges))

    def test_complex_cycle(self):
        """Edge Case 4: Multi-node feedback loop (1 -> 2 -> 3 -> 4 -> 2)"""
        nodes = [{"id": "1"}, {"id": "2"}, {"id": "3"}, {"id": "4"}]
        edges = [
            {"id": "e1", "source": "1", "target": "2"},
            {"id": "e2", "source": "2", "target": "3"},
            {"id": "e3", "source": "3", "target": "4"},
            {"id": "e4", "source": "4", "target": "2"}
        ]
        self.assertFalse(check_is_dag(nodes, edges))

    def test_self_loop(self):
        """Edge Case 5: Self-referential loop (1 -> 1)"""
        nodes = [{"id": "1"}]
        edges = [{"id": "e1", "source": "1", "target": "1"}]
        self.assertFalse(check_is_dag(nodes, edges))

    def test_disconnected_components_with_cycle(self):
        """Edge Case 6: Multiple disconnected subgraphs where one subgraph contains a cycle"""
        # Subgraph A (Valid DAG): 1 -> 2
        # Subgraph B (Cycle): 3 -> 4 -> 3
        nodes = [{"id": "1"}, {"id": "2"}, {"id": "3"}, {"id": "4"}]
        edges = [
            {"id": "e1", "source": "1", "target": "2"},
            {"id": "e2", "source": "3", "target": "4"},
            {"id": "e3", "source": "4", "target": "3"}
        ]
        self.assertFalse(check_is_dag(nodes, edges))

    def test_disconnected_dag_components(self):
        """Edge Case 7: Multiple disconnected subgraphs, all valid DAGs"""
        nodes = [{"id": "1"}, {"id": "2"}, {"id": "3"}, {"id": "4"}]
        edges = [
            {"id": "e1", "source": "1", "target": "2"},
            {"id": "e2", "source": "3", "target": "4"}
        ]
        self.assertTrue(check_is_dag(nodes, edges))

    def test_multiple_parallel_edges(self):
        """Edge Case 8: Parallel edges between same nodes on different handles (1 -> 2, 1 -> 2)"""
        nodes = [{"id": "1"}, {"id": "2"}]
        edges = [
            {"id": "e1", "source": "1", "target": "2", "sourceHandle": "out1", "targetHandle": "in1"},
            {"id": "e2", "source": "1", "target": "2", "sourceHandle": "out2", "targetHandle": "in2"}
        ]
        self.assertTrue(check_is_dag(nodes, edges))

    def test_implied_nodes_from_edges(self):
        """Edge Case 9: Edges referencing node IDs not listed in nodes array"""
        nodes = []  # Nodes array omitted or empty
        edges = [
            {"id": "e1", "source": "nodeA", "target": "nodeB"},
            {"id": "e2", "source": "nodeB", "target": "nodeC"}
        ]
        self.assertTrue(check_is_dag(nodes, edges))

    def test_large_pipeline_dag(self):
        """Edge Case 10: Deep pipeline chain (100 sequential nodes)"""
        nodes = [{"id": f"node-{i}"} for i in range(100)]
        edges = [{"id": f"edge-{i}", "source": f"node-{i}", "target": f"node-{i+1}"} for i in range(99)]
        self.assertTrue(check_is_dag(nodes, edges))

if __name__ == "__main__":
    unittest.main()
