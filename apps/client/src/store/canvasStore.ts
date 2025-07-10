import type { MutableRefObject } from 'react';
import type { ReactSketchCanvasRef } from 'react-sketch-canvas';
import { create } from 'zustand';

interface CanvasStore {
  canvasRef: MutableRefObject<ReactSketchCanvasRef | null>;
  strokeColor: string;
  strokeWidth: number;
  roomId: string | null;
  setRoomId: (id: string) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
}

const canvasRef: MutableRefObject<ReactSketchCanvasRef | null> = {
  current: null,
};

export const useCanvasStore = create<CanvasStore>((set) => ({
  canvasRef,
  strokeColor: '#000000',
  strokeWidth: 4,
  roomId: null,

  setRoomId: (id) => set({ roomId: id }),
  setStrokeColor: (color) => set(() => ({ strokeColor: color })),
  setStrokeWidth: (width) => set(() => ({ strokeWidth: width })),
}));
