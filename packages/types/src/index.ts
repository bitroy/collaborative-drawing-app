export interface DrawingEvent {
  path: string[];
  color: string;
  strokeWidth: number;
  drawMode: boolean;
}

export interface RoomData {
  id: string;
  name: string;
}
