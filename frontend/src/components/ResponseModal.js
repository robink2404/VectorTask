import React from 'react';
import { CheckCircle2, AlertTriangle, X, Hash, Share2, Layers } from 'lucide-react';

export const ResponseModal = ({ isOpen, onClose, result, error }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="node-title-group" style={{ fontSize: '16px' }}>
            <Layers size={20} color="#6366f1" />
            <span>Pipeline Submission Results</span>
          </div>
          <button className="node-delete-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {error ? (
          <div className="dag-status-box has-cycle">
            <AlertTriangle size={20} />
            <div>
              <div style={{ fontWeight: 700 }}>Connection Error</div>
              <div style={{ fontSize: '12px', fontWeight: 400, marginTop: '2px' }}>{error}</div>
            </div>
          </div>
        ) : result ? (
          <>
            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Hash size={14} /> Total Nodes
                </div>
                <div className="stat-value">{result.num_nodes}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Share2 size={14} /> Total Edges
                </div>
                <div className="stat-value">{result.num_edges}</div>
              </div>
            </div>

            <div className={`dag-status-box ${result.is_dag ? 'is-dag' : 'has-cycle'}`}>
              {result.is_dag ? (
                <>
                  <CheckCircle2 size={24} />
                  <div>
                    <div>Valid Directed Acyclic Graph (DAG)</div>
                    <div style={{ fontSize: '12px', fontWeight: 400, opacity: 0.85, marginTop: '2px' }}>
                      Pipeline has no cyclic loops and is ready for execution.
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle size={24} />
                  <div>
                    <div>Cycle Detected in Pipeline</div>
                    <div style={{ fontSize: '12px', fontWeight: 400, opacity: 0.85, marginTop: '2px' }}>
                      Warning: The flow contains circular connections and is not a DAG.
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : null}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={onClose}>
            Close & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
