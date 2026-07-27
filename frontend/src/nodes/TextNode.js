import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { FileText } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = (props) => {
  const { id, data } = props;
  const updateNodeInternals = useUpdateNodeInternals();
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [text, setText] = useState(data?.text || '{{ input }}');
  const textareaRef = useRef(null);

  // Sync state if node data changes from store
  useEffect(() => {
    if (data?.text !== undefined && data.text !== text) {
      setText(data.text);
    }
  }, [data?.text, text]);

  // Extract unique valid JS variable names from {{ variableName }}
  const variables = useMemo(() => {
    const matches = Array.from(text.matchAll(VARIABLE_REGEX));
    const extracted = matches.map((m) => m[1].trim()).filter(Boolean);
    // Deduplicate variables
    return Array.from(new Set(extracted));
  }, [text]);

  // Dynamically update React Flow handle internals whenever variable handles change
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, variables, updateNodeInternals]);

  // Real-time height auto-resizing via scrollHeight measurement
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(64, textareaRef.current.scrollHeight)}px`;
    }
  }, [text]);

  // Dynamic dimension calculations based on text length and lines
  const cardWidth = useMemo(() => {
    const lines = text.split('\n');
    const maxLineLen = lines.reduce((max, line) => Math.max(max, line.length), 0);
    return Math.max(240, Math.min(600, maxLineLen * 8.5 + 44));
  }, [text]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    updateNodeField(id, 'text', newText);
  };

  // Convert extracted variables into input handle configurations for BaseNode
  const inputHandles = useMemo(() => {
    return variables.map((varName) => ({
      id: varName,
      label: `{{ ${varName} }}`,
    }));
  }, [variables]);

  return (
    <BaseNode
      {...props}
      title="Text Template"
      icon={FileText}
      accentColor="#6366f1"
      minWidth={cardWidth}
      inputs={inputHandles}
      outputs={[{ id: 'output', label: 'Text Output' }]}
      customContent={
        <div className="node-field">
          <div className="node-field-label">
            <span>Text Content</span>
            {variables.length > 0 && (
              <span style={{ color: '#818cf8', textTransform: 'none' }}>
                {variables.length} var{variables.length > 1 ? 's' : ''} detected
              </span>
            )}
          </div>
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={text}
            placeholder="Type text with {{ variables }}..."
            onChange={handleTextChange}
            style={{
              width: '100%',
              minHeight: '64px',
              overflow: 'hidden',
              transition: 'height 0.1s ease, width 0.1s ease',
            }}
          />
        </div>
      }
    />
  );
};
