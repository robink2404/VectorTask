import unittest
from main import check_is_dag

class TestDAGAlgorithm(unittest.TestCase):
    def test_empty_graph(self):
        self.assertTrue(check_is_dag([], []))

    def test_single_node_no_edges(self):
        nodes = [{"id": "node-1"}]
        edges = []
        self.assertTrue(check_is_dag(nodes, edges))

    def test_linear_dag(self):
        # 1 -> 2 -> 3
        nodes = [{"id": "1"}, {"id": "2"}, {"id": "3"}]
        edges = [
            {"id": "e1", "source": "1", "target": "2"},
            {"id": "e2", "source": "2", "target": "3"}
        ]
        self.assertTrue(check_is_dag(nodes, edges))

    def test_diamond_dag(self):
        # 1 -> 2, 1 -> 3, 2 -> 4, 3 -> 4
        nodes = [{"id": "1"}, {"id": "2"}, {"id": "3"}, {"id": "4"}]
        edges = [
            {"id": "e1", "source": "1", "target": "2"},
            {"id": "e2", "source": "1", "target": "3"},
            {"id": "e3", "source": "2", "target": "4"},
            {"id": "e4", "source": "3", "target": "4"}
        ]
        self.assertTrue(check_is_dag(nodes, edges))

    test_simple_cycle = None

    def test_simple_cycle(self):
        # 1 -> 2 -> 1
        nodes = [{"id": "1"}, {"id": "2"}]
        edges = [
            {"id": "e1", "source": "1", "target": "2"},
            {"id": "e2", "source": "2", "target": "1"}
        ]
        self.assertFalse(check_is_dag(nodes, edges))

    def test_complex_cycle(self):
        # 1 -> 2 -> 3 -> 4 -> 2
        nodes = [{"id": "1"}, {"id": "2"}, {"id": "3"}, {"id": "4"}]
        edges = [
            {"id": "e1", "source": "1", "target": "2"},
            {"id": "e2", "source": "2", "target": "3"},
            {"id": "e3", "source": "3", "target": "4"},
            {"id": "e4", "source": "4", "target": "2"}
        ]
        self.assertFalse(check_is_dag(nodes, edges))

    def test_self_loop(self):
        # 1 -> 1
        nodes = [{"id": "1"}]
        edges = [{"id": "e1", "source": "1", "target": "1"}]
        self.assertFalse(check_is_dag(nodes, edges))

if __name__ == "__main__":
    unittest.main()
