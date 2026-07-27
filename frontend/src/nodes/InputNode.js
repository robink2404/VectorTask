import React from 'react';
import { LogIn } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const InputNode = (props) => {
  const { id, data } = props;

  const defaultName = data?.inputName || id.replace('customInput-', 'input_');
  const defaultType = data?.inputType || 'Text';

  return (
    <BaseNode
      {...props}
      title="Input"
      icon={LogIn}
      accentColor="#10b981"
      outputs={[{ id: 'value', label: 'Value' }]}
      fields={[
        {
          name: 'inputName',
          label: 'Field Name',
          type: 'text',
          defaultValue: defaultName,
          placeholder: 'e.g. user_query',
        },
        {
          name: 'inputType',
          label: 'Type',
          type: 'select',
          defaultValue: defaultType,
          options: [
            { label: 'Text', value: 'Text' },
            { label: 'File', value: 'File' },
          ],
        },
      ]}
    />
  );
};
