import React from 'react';
import { StickyNote } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const NoteNode = (props) => {
  const { data } = props;
  const defaultNote = data?.note || 'Add workflow documentation or comments here...';

  return (
    <BaseNode
      {...props}
      title="Canvas Note"
      icon={StickyNote}
      accentColor="#eab308"
      inputs={[]}
      outputs={[]}
      fields={[
        {
          name: 'note',
          label: 'Documentation Note',
          type: 'textarea',
          defaultValue: defaultNote,
          rows: 4,
          placeholder: 'Write workflow explanation...',
        },
      ]}
      style={{
        background: 'rgba(234, 179, 8, 0.08)',
        borderColor: 'rgba(234, 179, 8, 0.3)',
      }}
    />
  );
};
