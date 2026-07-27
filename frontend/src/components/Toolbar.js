import React from 'react';
import {
  LogIn,
  LogOut,
  FileText,
  Cpu,
  Filter,
  Wand2,
  Globe,
  StickyNote,
  GitFork,
} from 'lucide-react';

const NODE_CATALOG = [
  {
    category: 'General Components',
    items: [
      {
        type: 'customInput',
        label: 'Input Node',
        desc: 'Pipeline entry point',
        icon: LogIn,
        color: '#10b981',
      },
      {
        type: 'customOutput',
        label: 'Output Node',
        desc: 'Pipeline destination',
        icon: LogOut,
        color: '#f59e0b',
      },
      {
        type: 'text',
        label: 'Text Node',
        desc: 'Dynamic template with {{vars}}',
        icon: FileText,
        color: '#6366f1',
      },
    ],
  },
  {
    category: 'AI & Intelligence',
    items: [
      {
        type: 'llm',
        label: 'LLM Engine',
        desc: 'GPT-4 / Claude / Gemini model',
        icon: Cpu,
        color: '#8b5cf6',
      },
      {
        type: 'filter',
        label: 'Filter Node',
        desc: 'Conditional dataset filter',
        icon: Filter,
        color: '#06b6d4',
      },
      {
        type: 'conditional',
        label: 'Conditional Split',
        desc: 'If / Else branching logic',
        icon: GitFork,
        color: '#f43f5e',
      },
    ],
  },
  {
    category: 'Integration & Utility',
    items: [
      {
        type: 'apiRequest',
        label: 'API Request',
        desc: 'HTTP GET / POST fetcher',
        icon: Globe,
        color: '#6366f1',
      },
      {
        type: 'transform',
        label: 'Transform Data',
        desc: 'JSON parse & string mapper',
        icon: Wand2,
        color: '#ec4899',
      },
      {
        type: 'note',
        label: 'Canvas Note',
        desc: 'Workflow documentation',
        icon: StickyNote,
        color: '#eab308',
      },
    ],
  },
];

export const Toolbar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="toolbar-sidebar">
      {NODE_CATALOG.map((cat) => (
        <div key={cat.category}>
          <div className="toolbar-category-title">{cat.category}</div>
          <div className="toolbar-items-grid">
            {cat.items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.type}
                  className="toolbar-item"
                  onDragStart={(e) => onDragStart(e, item.type)}
                  draggable
                >
                  <div
                    className="toolbar-item-icon"
                    style={{ background: `${item.color}22`, color: item.color }}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="toolbar-item-text">
                    <span className="toolbar-item-name">{item.label}</span>
                    <span className="toolbar-item-desc">{item.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
};
