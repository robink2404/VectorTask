import React from 'react';
import { Wand2 } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const TransformNode = (props) => {
  const { data } = props;
  const defaultType = data?.transformType || 'json_parse';

  return (
    <BaseNode
      {...props}
      title="Transform Data"
      icon={Wand2}
      accentColor="#ec4899"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'output', label: 'Transformed' }]}
      fields={[
        {
          name: 'transformType',
          label: 'Operation',
          type: 'select',
          defaultValue: defaultType,
          options: [
            { label: 'JSON Parse', value: 'json_parse' },
            { label: 'JSON Stringify', value: 'json_stringify' },
            { label: 'UPPERCASE', value: 'uppercase' },
            { label: 'lowercase', value: 'lowercase' },
            { label: 'Trim Whitespace', value: 'trim' },
          ],
        },
        {
          name: 'keyPath',
          label: 'JSON Key Path (Optional)',
          type: 'text',
          defaultValue: data?.keyPath || '',
          placeholder: 'e.g. data.user.name',
        },
      ]}
    />
  );
};
