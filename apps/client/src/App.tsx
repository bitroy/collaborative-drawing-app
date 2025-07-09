import { ControlsPanel } from './components/ControlsPanel';
import { DrawingCanvas } from './components/DrawingCanvas';
import { ShareButton } from './components/ShareButton';
import { useCanvasControls } from './hooks/useCanvasControls';

interface AppProps {
  roomId: string;
}

export default function App({ roomId }: AppProps) {
  const {
    canvasRef,
    strokeColor,
    strokeWidth,
    handleColorChange,
    handleWidthChange,
    clear,
    reset,
    undo,
    redo,
    exportImage,
  } = useCanvasControls();

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

      <ControlsPanel
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        onColorChange={(e) => handleColorChange(e.target.value)}
        onWidthChange={(e) => handleWidthChange(Number(e.target.value))}
        onClear={clear}
        onReset={reset}
        onUndo={undo}
        onRedo={redo}
        onExport={exportImage}
      />

      <DrawingCanvas
        ref={canvasRef}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        roomId={roomId}
      />
    </div>
  );
}
