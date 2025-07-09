import { forwardRef } from 'react';
import type { ReactSketchCanvasRef } from 'react-sketch-canvas';
import { ReactSketchCanvas } from 'react-sketch-canvas';

type DrawingCanvasProps = {
  strokeColor: string;
  strokeWidth: number;
  className?: string;
};

export const DrawingCanvas = forwardRef<ReactSketchCanvasRef, DrawingCanvasProps>(
  ({ strokeColor, strokeWidth }, ref) => (
    <div
      className="w-full max-w-[90vw] sm:max-w-5xl h-[60vh] sm:h-[600px] border-2 rounded-xl shadow-lg overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderColor: 'var(--color-border)',
        boxShadow: `0 4px 8px 0 var(--color-shadow)`,
      }}
    >
      <ReactSketchCanvas
        ref={ref}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor}
        canvasColor="#fff"
        width="100%"
        height="100%"
        withTimestamp={true}
      />
    </div>
  )
);

DrawingCanvas.displayName = 'DrawingCanvas';
