import React from 'react';
import { Cpu } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const LLMNode = (props) => {
  const { data } = props;
  const defaultModel = data?.model || 'gpt-4o';

  return (
    <BaseNode
      {...props}
      title="LLM Model"
      icon={Cpu}
      accentColor="#8b5cf6"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'prompt', label: 'Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
      fields={[
        {
          name: 'model',
          label: 'Model Engine',
          type: 'select',
          defaultValue: defaultModel,
          options: [
            { label: 'OpenAI GPT-4o', value: 'gpt-4o' },
            { label: 'Claude 3.5 Sonnet', value: 'claude-3-5-sonnet' },
            { label: 'Google Gemini 1.5 Pro', value: 'gemini-1.5-pro' },
            { label: 'Mistral Large', value: 'mistral-large' },
          ],
        },
      ]}
    />
  );
};
