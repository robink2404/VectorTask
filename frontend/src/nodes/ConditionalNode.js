import React from 'react';
import { GitFork } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const ConditionalNode = (props) => {
  const { data } = props;
  const defaultOp = data?.operator || '==';

  return (
    <BaseNode
      {...props}
      title="Conditional Split"
      icon={GitFork}
      accentColor="#f43f5e"
      inputs={[
        { id: 'varA', label: 'Value A' },
        { id: 'varB', label: 'Value B' },
      ]}
      outputs={[
        { id: 'true', label: 'True Branch', color: '#10b981' },
        { id: 'false', label: 'False Branch', color: '#f43f5e' },
      ]}
      fields={[
        {
          name: 'operator',
          label: 'Comparison Operator',
          type: 'select',
          defaultValue: defaultOp,
          options: [
            { label: 'Equal (==)', value: '==' },
            { label: 'Not Equal (!=)', value: '!=' },
            { label: 'Greater Than (>)', value: '>' },
            { label: 'Less Than (<)', value: '<' },
            { label: 'Greater or Equal (>=)', value: '>=' },
            { label: 'Less or Equal (<=)', value: '<=' },
          ],
        },
      ]}
    />
  );
};
