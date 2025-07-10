import type { DrawingEvent } from '@drawing-app/types';
import { useCallback } from 'react';
import { useCanvasStore } from '../store/canvasStore';

export function useCanvasControls() {
  const canvasRef = useCanvasStore((state) => state.canvasRef);
  const strokeColor = useCanvasStore((state) => state.strokeColor);
  const strokeWidth = useCanvasStore((state) => state.strokeWidth);
  const roomId = useCanvasStore((state) => state.roomId);
  const setRoomId = useCanvasStore((state) => state.setRoomId);
  const setStrokeColor = useCanvasStore((state) => state.setStrokeColor);
  const setStrokeWidth = useCanvasStore((state) => state.setStrokeWidth);

  const onColorChange = (color: string) => setStrokeColor(color);
  const onWidthChange = (width: number) => setStrokeWidth(width);
  const onRoomChange = useCallback((id: string) => setRoomId(id), [setRoomId]);

  const onClear = () => {
    const canvas = canvasRef.current;
    if (canvas) canvas.clearCanvas();
  };

  const onUndo = () => {
    const canvas = canvasRef.current;
    if (canvas) canvas.undo();
  };

  const onRedo = () => {
    const canvas = canvasRef.current;
    if (canvas) canvas.redo();
  };

  const onReset = () => {
    const canvas = canvasRef.current;
    if (canvas) canvas.resetCanvas();
    setStrokeColor('#000000');
    setStrokeWidth(4);
  };

  const onExportImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const time = await canvas.getSketchingTime();
    if (time === 0) return console.warn('Nothing to export.');

    const dataUrl = await canvas.exportImage('png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'drawing.png';
    link.click();
  };

  const onDrawEvent = useCallback(
    (incomingStroke: DrawingEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const sketchCanvasPaths = [
        {
          drawMode: incomingStroke.drawMode,
          strokeColor: incomingStroke.strokeColor,
          strokeWidth: incomingStroke.strokeWidth,
          paths: incomingStroke.paths,
          startTimestamp: incomingStroke.startTimestamp,
          endTimestamp: incomingStroke.endTimestamp,
        },
      ];

      canvas.loadPaths(sketchCanvasPaths);
    },
    [canvasRef]
  );

  const onRemoteAction = useCallback(
    (action: { type: string }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      switch (action.type) {
        case 'clear':
          canvas.clearCanvas();
          break;
        case 'undo':
          canvas.undo();
          break;
        case 'redo':
          canvas.redo();
          break;
        case 'reset':
          canvas.resetCanvas();
          setStrokeColor('#000000');
          setStrokeWidth(4);
          break;
        default:
          break;
      }
    },
    [canvasRef, setStrokeColor, setStrokeWidth]
  );

  return {
    canvasRef,
    strokeColor,
    strokeWidth,
    roomId,
    onRoomChange,
    onColorChange,
    onWidthChange,
    onClear,
    onUndo,
    onRedo,
    onReset,
    onExportImage,
    onDrawEvent,
    onRemoteAction,
  };
}
