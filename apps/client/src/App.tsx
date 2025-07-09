import type { ChangeEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import type { ReactSketchCanvasRef } from 'react-sketch-canvas';
import { ControlsPanel } from './components/ControlsPanel';
import { DrawingCanvas } from './components/DrawingCanvas';

export default function App() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const [strokeWidth, setStrokeWidth] = useState<number>(4);

  const handleColorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(e.target.value);
  }, []);

  const handleWidthChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(Number(e.target.value));
  }, []);

  const handleClear = useCallback(async () => {
    if (canvasRef.current) {
      const time = await canvasRef.current.getSketchingTime();
      if (time > 0) {
        await canvasRef.current.clearCanvas();
      }
    }
  }, []);

  const handleReset = useCallback(async () => {
    if (canvasRef.current) await canvasRef.current.resetCanvas();
    setStrokeColor('#000000');
    setStrokeWidth(4);
  }, []);

  const handleUndo = useCallback(async () => {
    if (canvasRef.current) {
      const time = await canvasRef.current.getSketchingTime();
      if (time > 0) {
        await canvasRef.current.undo();
      }
    }
  }, []);

  const handleRedo = useCallback(async () => {
    if (canvasRef.current) {
      const time = await canvasRef.current.getSketchingTime();
      if (time > 0) {
        await canvasRef.current.redo();
      }
    }
  }, []);

  const handleExport = useCallback(async () => {
    if (canvasRef.current) {
      const time = await canvasRef.current.getSketchingTime();
      if (time > 0) {
        const dataUrl = await canvasRef.current.exportImage('png');
        if (dataUrl) {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `drawing.png`;
          link.click();
        }
      } else {
        console.warn('Nothing to export.');
      }
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      <h1
        className="text-4xl font-extrabold drop-shadow-sm"
        style={{ color: 'var(--color-primary)' }}
      >
        Collaborative Drawing App
      </h1>

      <ControlsPanel
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        onColorChange={handleColorChange}
        onWidthChange={handleWidthChange}
        onClear={handleClear}
        onReset={handleReset}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onExport={handleExport}
      />

      <DrawingCanvas ref={canvasRef} strokeColor={strokeColor} strokeWidth={strokeWidth} />
    </div>
  );
}
