export interface DrawingEvent {
  drawMode: boolean;
  strokeColor: string;
  strokeWidth: number;
  paths: { x: number; y: number }[];
  startTimestamp?: number;
  endTimestamp?: number;
}

export interface RoomData {
  id: string;
  name: string;
}
