import type { InternalNodeBase, NodeBase } from '@xyflow/system';
import type { HTMLAttributes } from 'vue';
import type { ClassValue, Styles } from './flow';

/**
 * The origin of a Node determines how it is placed relative to its own coordinates.
 * `[0, 0]` places it at the top left corner, `[0.5, 0.5]` right in the center and
 * `[1, 1]` at the bottom right of its position.
 *
 * Locally defined (not re-exported from `@xyflow/system`) so the Vue SFC compiler stays out of system's
 * d.ts (its `Optional<T, K>` trips vuejs/core#14236); structurally identical to system's.
 */
export type NodeOrigin = [number, number];

/**
 * The `Node` type represents everything Vue Flow needs to know about a given node. Whenever you want to
 * update a certain attribute of a node, you need to create a new node object.
 */
export type Node<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
  NodeType extends string | undefined = string | undefined,
> = NodeBase<NodeData, NodeType> & {
  /** Additional class names applied to the node element. */
  class?: ClassValue;
  /** Additional inline styles applied to the node element. */
  style?: Styles;
  /** Whether the node is currently being resized. */
  resizing?: boolean;
  /** Whether the node can be focused for keyboard interaction (a11y). */
  focusable?: boolean;
  /** ARIA role applied to the node element. */
  ariaRole?: string;
  /** General escape hatch for adding custom attributes to the node's DOM element. */
  domAttributes?: Omit<
    HTMLAttributes,
    | 'id'
    | 'style'
    | 'className'
    | 'draggable'
    | 'aria-label'
    | 'onMouseenter'
    | 'onMousemove'
    | 'onMouseleave'
    | 'onContextmenu'
    | 'onClick'
    | 'onDblclick'
    | 'onKeydown'
  >;
};
/**
 * The enriched, store-internal node — what `nodeLookup`/`getInternalNode(id)`/`useInternalNode(id)` return,
 * once a user-provided `Node` has been processed by the store. Carries the user `Node`
 * (`internals.userNode`) plus the store-computed `internals.{positionAbsolute, z, handleBounds}` and
 * authoritative `measured`.
 */
export type InternalNode<NodeType extends Node = Node> = InternalNodeBase<NodeType>;

/**
 * When you implement a custom node it is wrapped in a component that enables basic functionality like
 * selection and dragging. Your custom node receives `NodeProps` as props.
 */
export interface NodeProps<NodeType extends Node = Node> {
  /** The node's id. */
  id: string;
  /** Arbitrary user data attached to the node. */
  data: NodeType['data'];
  /** The node's type — the key it was registered under in `nodeTypes`. */
  type: NodeType['type'];
  /** Whether the node is currently selected. */
  selected: boolean;
  /** Whether the node can be selected. */
  selectable: boolean;
  /** Whether the node can be deleted. */
  deletable: boolean;
  /** Whether the node can be dragged. */
  draggable: boolean;
  /** Whether the node is currently being dragged. */
  dragging: boolean;
  /** The node's z-index. */
  zIndex: number;
  /** Whether a node is connectable or not. */
  isConnectable: boolean;
  /** Position absolute x value. */
  positionAbsoluteX: number;
  /** Position absolute y value. */
  positionAbsoluteY: number;
  /** The node's width, in pixels. */
  width?: NodeType['width'];
  /** The node's height, in pixels. */
  height?: NodeType['height'];
  /** Default side the node's source handles are placed on, see {@link Position}. */
  sourcePosition?: NodeType['sourcePosition'];
  /** Default side the node's target handles are placed on, see {@link Position}. */
  targetPosition?: NodeType['targetPosition'];
  /** CSS selector limiting which child element starts a drag. */
  dragHandle?: NodeType['dragHandle'];
  /** Id of the parent node when this node is nested inside another. */
  parentId?: NodeType['parentId'];
}

/**
 * The `BuiltInNode` type represents the built-in node types that are available in Vue Flow. You can use
 * this type to extend your custom node type if you still want to use the built-in ones.
 */
export type BuiltInNode = Node<{ label: string }, 'input' | 'output' | 'default'> | Node<Record<string, never>, 'group'>;
