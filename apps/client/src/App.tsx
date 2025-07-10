import { useEffect } from 'react';
import { ControlsPanel } from './components/ControlsPanel';
import { DrawingCanvas } from './components/DrawingCanvas';
import { ShareButton } from './components/ShareButton';
import { useCanvasControls } from './hooks/useCanvasControls';

interface AppProps {
  roomId: string;
}

export default function App({ roomId }: AppProps) {
  const { onRoomChange } = useCanvasControls();

  useEffect(() => {
    if (roomId) {
      onRoomChange(roomId);
    }
  }, [roomId, onRoomChange]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <h1
        className="text-4xl font-extrabold drop-shadow-sm my-3"
        style={{ color: 'var(--color-primary)' }}
      >
        Collaborative Drawing App
      </h1>

      <div className="sm:self-auto self-start my-3">
        <ShareButton roomId={roomId} />
      </div>

      <ControlsPanel />

      <DrawingCanvas roomId={roomId} />
    </div>
  );
}
