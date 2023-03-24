import type { XYPosition, Position, Dimensions, OnConnect, Connection, Edge } from '.';

export type HandleType = 'source' | 'target';

export type HandleElement = XYPosition &
  Dimensions & {
    id?: string | null;
    position: Position;
  };

export type ConnectingHandle = {
  nodeId: string;
  type: HandleType;
  handleId?: string | null;
};

export type HandleConnectable =
  | boolean
  | (({ nodeId, handleId }: { nodeId: string; handleId: string | null }) => boolean);

export type HandleProps = {
  type: HandleType;
  position: Position;
  isConnectable?: HandleConnectable;
  isConnectableStart?: boolean;
  isConnectableEnd?: boolean;
  onConnect?: OnConnect;
  isValidConnection?: (connection: Connection) => boolean;
  id?: string;
};
