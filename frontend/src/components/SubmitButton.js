import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useStore } from '../store';
import { submitPipeline } from '../submit';
import { ResponseModal } from './ResponseModal';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalResult, setModalResult] = useState(null);
  const [modalError, setModalError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setModalError(null);
    setModalResult(null);

    try {
      const res = await submitPipeline(nodes, edges);
      setModalResult(res);
    } catch (err) {
      setModalError(
        err.message || 'Could not connect to FastAPI backend at http://localhost:8000. Ensure backend server is running.'
      );
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="spin" size={16} />
            <span>Parsing Pipeline...</span>
          </>
        ) : (
          <>
            <Send size={16} />
            <span>Submit Pipeline</span>
          </>
        )}
      </button>

      <ResponseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        result={modalResult}
        error={modalError}
      />
    </>
  );
};
