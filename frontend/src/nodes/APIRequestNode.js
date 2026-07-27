import React from 'react';
import { Globe } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const APIRequestNode = (props) => {
  const { data } = props;
  const defaultMethod = data?.method || 'GET';
  const defaultUrl = data?.url || 'https://api.example.com/data';

  return (
    <BaseNode
      {...props}
      title="API Request"
      icon={Globe}
      accentColor="#6366f1"
      inputs={[
        { id: 'params', label: 'Params' },
        { id: 'body', label: 'Body' },
      ]}
      outputs={[
        { id: 'response', label: 'Response' },
        { id: 'status', label: 'Status' },
      ]}
      fields={[
        {
          name: 'method',
          label: 'HTTP Method',
          type: 'select',
          defaultValue: defaultMethod,
          options: [
            { label: 'GET', value: 'GET' },
            { label: 'POST', value: 'POST' },
            { label: 'PUT', value: 'PUT' },
            { label: 'DELETE', value: 'DELETE' },
          ],
        },
        {
          name: 'url',
          label: 'Endpoint URL',
          type: 'text',
          defaultValue: defaultUrl,
          placeholder: 'https://api.service.com/v1/endpoint',
        },
      ]}
    />
  );
};
