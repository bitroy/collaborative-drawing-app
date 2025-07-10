import type { DrawingEvent } from '@drawing-app/types';
import { useEffect } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useCanvasControls } from '../hooks/useCanvasControls';
import socket from '../lib/socket';

interface DrawingCanvasProps {
  roomId: string;
}

export const DrawingCanvas = ({ roomId }: DrawingCanvasProps) => {
  const { canvasRef, strokeColor, strokeWidth, onDrawEvent, onRemoteAction } = useCanvasControls();

  const handleStroke = async () => {
    const canvas = canvasRef?.current;
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

  // receive and send the current draw progress
  useEffect(() => {
    socket.on('draw', onDrawEvent);
    return () => {
      socket.off('draw', onDrawEvent);
    };
  }, [onDrawEvent]);

  // receive and send the current actions
  useEffect(() => {
    socket.on('canvas-action', onRemoteAction);
    return () => {
      socket.off('canvas-action', onRemoteAction);
    };
  }, [onRemoteAction]);

  // Receive the canvas data of the room on join
  useEffect(() => {
    if (!roomId) return;

    const handleCanvasData = (paths: DrawingEvent[]) => {
      const canvas = canvasRef?.current;
      if (canvas) {
        canvas.loadPaths(paths);
      }
    };

    socket.on('canvas-data', handleCanvasData);
    socket.emit('request-canvas-data', { roomId });

    return () => {
      socket.off('canvas-data', handleCanvasData);
    };
  }, [roomId, canvasRef]);

  return (
    <div
      className="
        w-full max-w-[90vw] sm:max-w-5xl 
        h-[60vh] sm:h-[600px] 
        border-2 rounded-xl overflow-hidden
        bg-[var(--color-bg)] border-[var(--color-border)]
        shadow-[0_4px_8px_0_var(--color-shadow)]
      "
    >
      <ReactSketchCanvas
        ref={canvasRef}
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
};

DrawingCanvas.displayName = 'DrawingCanvas';
