import React from 'react';
import { Trash2, Sparkles, Workflow } from 'lucide-react';
import { useStore } from '../store';
import { SubmitButton } from './SubmitButton';

export const Header = () => {
  const clearCanvas = useStore((state) => state.clearCanvas);
  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);

  const loadPresetWorkflow = () => {
    const initialNodes = [
      {
        id: 'input-1',
        type: 'customInput',
        position: { x: 100, y: 180 },
        data: { inputName: 'user_prompt', inputType: 'Text' },
      },
      {
        id: 'text-1',
        type: 'text',
        position: { x: 380, y: 140 },
        data: { text: 'Analyze sentiment for: {{ user_prompt }} with context {{ context_data }}' },
      },
      {
        id: 'llm-1',
        type: 'llm',
        position: { x: 740, y: 160 },
        data: { model: 'gpt-4o' },
      },
      {
        id: 'output-1',
        type: 'customOutput',
        position: { x: 1040, y: 180 },
        data: { outputName: 'sentiment_output', outputType: 'Text' },
      },
    ];

    const initialEdges = [
      {
        id: 'e1-2',
        source: 'input-1',
        target: 'text-1',
        sourceHandle: 'input-1-value',
        targetHandle: 'text-1-user_prompt',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2 },
      },
      {
        id: 'e2-3',
        source: 'text-1',
        target: 'llm-1',
        sourceHandle: 'text-1-output',
        targetHandle: 'llm-1-prompt',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2 },
      },
      {
        id: 'e3-4',
        source: 'llm-1',
        target: 'output-1',
        sourceHandle: 'llm-1-response',
        targetHandle: 'output-1-value',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2 },
      },
    ];

    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  return (
    <header className="app-header">
      <div className="brand-logo">
        <div className="brand-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Workflow size={18} />
          <span>VectorShift</span>
        </div>
        <span className="brand-title">Pipeline & Flow Architecture Studio</span>
      </div>

      <div className="header-actions">
        <button className="btn btn-secondary" onClick={loadPresetWorkflow} title="Load sample pipeline graph">
          <Sparkles size={15} color="#818cf8" />
          <span>Load Preset Flow</span>
        </button>

        <button className="btn btn-secondary" onClick={clearCanvas} title="Clear all nodes from canvas">
          <Trash2 size={15} color="#f43f5e" />
          <span>Clear Canvas</span>
        </button>

        <SubmitButton />
      </div>
    </header>
  );
};
