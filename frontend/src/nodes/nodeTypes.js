import { InputNode } from './InputNode';
import { OutputNode } from './OutputNode';
import { LLMNode } from './LLMNode';
import { TextNode } from './TextNode';
import { FilterNode } from './FilterNode';
import { TransformNode } from './TransformNode';
import { APIRequestNode } from './APIRequestNode';
import { NoteNode } from './NoteNode';
import { ConditionalNode } from './ConditionalNode';

export const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  filter: FilterNode,
  transform: TransformNode,
  apiRequest: APIRequestNode,
  note: NoteNode,
  conditional: ConditionalNode,
};
