import type { DrawingEvent } from '@drawing-app/types';
import { forwardRef, useEffect, useRef } from 'react';
import type { ReactSketchCanvasRef } from 'react-sketch-canvas';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import socket from '../lib/socket';

interface DrawingCanvasProps {
  strokeColor: string;
  strokeWidth: number;
  roomId: string;
}

export const DrawingCanvas = forwardRef<ReactSketchCanvasRef, DrawingCanvasProps>(
  ({ strokeColor, strokeWidth, roomId }, ref) => {
    const internalRef = useRef<ReactSketchCanvasRef>(null);

    const setRefs = (node: ReactSketchCanvasRef | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }

      internalRef.current = node;
    };

    const handleStroke = async () => {
      const canvas = internalRef.current;
      if (!canvas) return;

      try {
        const paths = await canvas.exportPaths();
        const latestPath = paths[paths.length - 1];

        if (latestPath) {
          const drawingEvent: DrawingEvent = {
            drawMode: latestPath.drawMode,
            strokeColor: latestPath.strokeColor,
            strokeWidth: latestPath.strokeWidth,
            paths: latestPath.paths,
            startTimestamp: latestPath.startTimestamp || Date.now(),
            endTimestamp: latestPath.endTimestamp || 0,
          };

          socket.emit('draw', {
            roomId,
            stroke: drawingEvent,
          });
        }
      } catch (error) {
        console.error('Error exporting paths:', error);
      }
    };

    useEffect(() => {
      const handleDrawEvent = (incomingStroke: DrawingEvent) => {
        if (internalRef.current) {
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

          internalRef.current.loadPaths(sketchCanvasPaths);
        }
      };

      socket.on('draw', handleDrawEvent);

      return () => {
        socket.off('draw', handleDrawEvent);
      };
    }, []);

    useEffect(() => {
      if (!roomId) return;

      const handleCanvasData = (paths: DrawingEvent[]) => {
        if (internalRef.current) {
          internalRef.current.loadPaths(paths);
        }
      };

      socket.on('canvas-data', handleCanvasData);

      socket.emit('request-canvas-data', { roomId });

      return () => {
        socket.off('canvas-data', handleCanvasData);
      };
    }, [roomId]);

    return (
      <div
        className="w-full max-w-[90vw] sm:max-w-5xl h-[60vh] sm:h-[600px] border-2 rounded-xl shadow-lg overflow-hidden"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderColor: 'var(--color-border)',
          boxShadow: `0 4px 8px 0 var(--color-shadow)`,
        }}
      >
        <ReactSketchCanvas
          ref={setRefs}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          canvasColor="#fff"
          width="100%"
          height="100%"
          withTimestamp={true}
          onStroke={handleStroke}
        />
      </div>
    );
  }
);

DrawingCanvas.displayName = 'DrawingCanvas';
