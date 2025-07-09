import { useCallback, useRef, useState } from 'react';
import type { ReactSketchCanvasRef } from 'react-sketch-canvas';

export function useCanvasState() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(4);

  const performIfHasDrawing = async (action: () => void | Promise<void>) => {
    if (!canvasRef.current) return;
    const time = await canvasRef.current.getSketchingTime();
    if (time > 0) await action();
  };

  const clear = useCallback(() => performIfHasDrawing(() => canvasRef.current!.clearCanvas()), []);
  const undo = useCallback(() => performIfHasDrawing(() => canvasRef.current!.undo()), []);
  const redo = useCallback(() => performIfHasDrawing(() => canvasRef.current!.redo()), []);

  const reset = useCallback(() => {
    canvasRef.current?.resetCanvas();
    setStrokeColor('#000000');
    setStrokeWidth(4);
  }, []);

  const exportImage = useCallback(async () => {
    if (!canvasRef.current) return;

    const time = await canvasRef.current.getSketchingTime();
    if (time === 0) return console.warn('Nothing to export.');

    const dataUrl = await canvasRef.current.exportImage('png');
    if (dataUrl) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'drawing.png';
      link.click();
    }
  }, []);

  return {
    canvasRef,
    strokeColor,
    strokeWidth,
    setStrokeColor,
    setStrokeWidth,
    clear,
    reset,
    undo,
    redo,
    exportImage,
  };
}
