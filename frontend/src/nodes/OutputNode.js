import React from 'react';
import { LogOut } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const OutputNode = (props) => {
  const { id, data } = props;

  const defaultName = data?.outputName || id.replace('customOutput-', 'output_');
  const defaultType = data?.outputType || 'Text';

  return (
    <BaseNode
      {...props}
      title="Output"
      icon={LogOut}
      accentColor="#f59e0b"
      inputs={[{ id: 'value', label: 'Value' }]}
      fields={[
        {
          name: 'outputName',
          label: 'Field Name',
          type: 'text',
          defaultValue: defaultName,
          placeholder: 'e.g. final_result',
        },
        {
          name: 'outputType',
          label: 'Type',
          type: 'select',
          defaultValue: defaultType,
          options: [
            { label: 'Text', value: 'Text' },
            { label: 'Image', value: 'Image' },
            { label: 'File', value: 'File' },
          ],
        },
      ]}
    />
  );
};
