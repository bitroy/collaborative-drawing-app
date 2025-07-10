import { useCallback } from 'react';
import socket from '../lib/socket';

export function useCanvasSocket() {
  const emitCanvasAction = useCallback((roomId: string | null, action: { type: string }) => {
    if (roomId) {
      socket.emit('canvas-action', { ...action, roomId });
    }
  }, []);

  return {
    emitCanvasAction,
  };
}
