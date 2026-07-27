import React from 'react';
import { Filter } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const FilterNode = (props) => {
  const { data } = props;
  const defaultCondition = data?.condition || 'contains';
  const defaultValue = data?.targetValue || '';

  return (
    <BaseNode
      {...props}
      title="Filter Data"
      icon={Filter}
      accentColor="#06b6d4"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[
        { id: 'passed', label: 'Passed', color: '#10b981' },
        { id: 'failed', label: 'Failed', color: '#f43f5e' },
      ]}
      fields={[
        {
          name: 'condition',
          label: 'Condition',
          type: 'select',
          defaultValue: defaultCondition,
          options: [
            { label: 'Contains', value: 'contains' },
            { label: 'Equals', value: 'equals' },
            { label: 'Regex Match', value: 'regex' },
            { label: 'Greater Than', value: 'gt' },
          ],
        },
        {
          name: 'targetValue',
          label: 'Value To Compare',
          type: 'text',
          defaultValue: defaultValue,
          placeholder: 'Search term or value...',
        },
      ]}
    />
  );
};
