import type { ShortcutModifierDefinition } from '@svelte-put/shortcut';
import type {
  FitViewOptionsBase,
  HandleType,
  Position,
  XYPosition,
  ConnectingHandle
} from '@reactflow/system';

import type { Node } from './nodes';

export type KeyModifier = ShortcutModifierDefinition;
export type KeyDefinitionObject = { key: string; modifier?: KeyModifier };
export type KeyDefinition = string | KeyDefinitionObject;

export type ConnectionData = {
  connectionPosition: XYPosition | null;
  connectionStartHandle: ConnectingHandle | null;
  connectionEndHandle: ConnectingHandle | null;
  connectionStatus: string | null;
};

export type HandleComponentProps = {
  type: HandleType;
  position?: Position;
  id?: string;
  class?: string;
  style?: string;
  isConnectable?: boolean;,
  isConnectableStart?: boolean;,
  isConnectableEnd?: boolean;,
};

export type FitViewOptions = FitViewOptionsBase<Node>;