import React from 'react';
import { Handle, Position } from 'reactflow';
import { Trash2 } from 'lucide-react';
import { useStore } from '../store';

/**
 * BaseNode Component - Core Abstraction Engine for VectorShift Nodes.
 * 
 * Standardizes layout, header, handles, fields, state synchronization,
 * deletion, and visual styling across all pipeline nodes.
 */
export const BaseNode = ({
  id,
  data,
  selected,
  title = 'Node',
  icon: Icon,
  accentColor = '#6366f1',
  inputs = [],
  outputs = [],
  fields = [],
  customContent = null,
  children = null,
  minWidth = 230,
  style = {},
}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const removeNode = useStore((state) => state.removeNode);

  const handleFieldChange = (fieldName, value, customOnChange) => {
    updateNodeField(id, fieldName, value);
    if (customOnChange) {
      customOnChange(value);
    }
  };

  return (
    <div
      className={`vectorshift-node ${selected ? 'selected' : ''}`}
      style={{
        minWidth: `${minWidth}px`,
        borderColor: selected ? accentColor : undefined,
        ...style,
      }}
    >
      {/* Input Target Handles */}
      {inputs.map((handle, idx) => {
        const topOffset = handle.top !== undefined
          ? handle.top
          : inputs.length === 1
          ? '50%'
          : `${((idx + 1) * 100) / (inputs.length + 1)}%`;

        return (
          <React.Fragment key={`input-handle-${handle.id || idx}`}>
            <Handle
              type="target"
              position={handle.position || Position.Left}
              id={`${id}-${handle.id || 'target'}`}
              style={{
                top: topOffset,
                background: handle.color || accentColor,
                ...handle.style,
              }}
            />
            {handle.label && (
              <span
                className="handle-label handle-label-left"
                style={{ top: `calc(${topOffset} - 6px)` }}
              >
                {handle.label}
              </span>
            )}
          </React.Fragment>
        );
      })}

      {/* Output Source Handles */}
      {outputs.map((handle, idx) => {
        const topOffset = handle.top !== undefined
          ? handle.top
          : outputs.length === 1
          ? '50%'
          : `${((idx + 1) * 100) / (outputs.length + 1)}%`;

        return (
          <React.Fragment key={`output-handle-${handle.id || idx}`}>
            <Handle
              type="source"
              position={handle.position || Position.Right}
              id={`${id}-${handle.id || 'source'}`}
              style={{
                top: topOffset,
                background: handle.color || accentColor,
                ...handle.style,
              }}
            />
            {handle.label && (
              <span
                className="handle-label handle-label-right"
                style={{ top: `calc(${topOffset} - 6px)` }}
              >
                {handle.label}
              </span>
            )}
          </React.Fragment>
        );
      })}

      {/* Node Header */}
      <div className="node-header">
        <div className="node-title-group">
          {Icon && (
            <div
              className="node-icon"
              style={{ background: `${accentColor}22`, color: accentColor }}
            >
              <Icon size={14} />
            </div>
          )}
          <span>{title}</span>
        </div>
        <div className="node-actions">
          <button
            className="node-delete-btn"
            title="Delete node"
            onClick={() => removeNode(id)}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Node Body & Fields */}
      <div className="node-body">
        {fields.map((field) => {
          const fieldValue =
            data && data[field.name] !== undefined
              ? data[field.name]
              : field.defaultValue ?? '';

          return (
            <div key={field.name} className="node-field">
              {field.label && (
                <label className="node-field-label">
                  <span>{field.label}</span>
                </label>
              )}

              {field.type === 'text' && (
                <input
                  type="text"
                  className="node-input"
                  value={fieldValue}
                  placeholder={field.placeholder || ''}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value, field.onChange)
                  }
                />
              )}

              {field.type === 'select' && (
                <select
                  className="node-select"
                  value={fieldValue}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value, field.onChange)
                  }
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'textarea' && (
                <textarea
                  className="node-textarea"
                  value={fieldValue}
                  rows={field.rows || 3}
                  placeholder={field.placeholder || ''}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value, field.onChange)
                  }
                />
              )}

              {field.type === 'number' && (
                <input
                  type="number"
                  className="node-input"
                  value={fieldValue}
                  min={field.min}
                  max={field.max}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value, field.onChange)
                  }
                />
              )}
            </div>
          );
        })}

        {customContent}
        {children}
      </div>
    </div>
  );
};
