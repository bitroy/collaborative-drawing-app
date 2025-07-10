import type { ChangeEvent } from 'react';
import { FaEraser, FaFileExport, FaRedo, FaSync, FaUndo } from 'react-icons/fa';
import { useCanvasControls } from '../hooks/useCanvasControls';
import { useCanvasSocket } from '../hooks/useCanvasSocket';
import ControlButton from './ControlButton';

export function ControlsPanel() {
  const {
    roomId,
    strokeColor,
    strokeWidth,
    onColorChange,
    onWidthChange,
    onClear,
    onReset,
    onUndo,
    onRedo,
    onExportImage,
  } = useCanvasControls();

  const { emitCanvasAction } = useCanvasSocket();

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  };

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    onWidthChange(Number(e.target.value));
  };

  const handleClear = () => {
    onClear();
    emitCanvasAction(roomId, { type: 'clear' });
  };

  const handleReset = () => {
    onReset();
    emitCanvasAction(roomId, { type: 'reset' });
  };

  const handleUndo = () => {
    onUndo();
    emitCanvasAction(roomId, { type: 'undo' });
  };

  const handleRedo = () => {
    onRedo();
    emitCanvasAction(roomId, { type: 'redo' });
  };

  const handleExportImage = () => {
    onExportImage();
  };

  return (
    <div className="w-full max-w-lg flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:items-center text-[var(--color-text)]">
      <div className="flex items-center gap-3 w-full sm:w-auto border border-[var(--color-border)] rounded-md px-2 py-1">
        <span className="text-sm font-medium min-w-[120px]">Stroke Color:</span>
        <input
          type="color"
          value={strokeColor}
          onChange={handleColorChange}
          className="h-8 w-8 border-2 rounded-lg hover:scale-110 transition-transform border-[var(--color-border)]"
        />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto border border-[var(--color-border)] rounded-md px-2 py-1">
        <span className="text-sm font-medium min-w-[120px]">Stroke Width:</span>
        <input
          type="range"
          min={1}
          max={10}
          value={strokeWidth}
          onChange={handleWidthChange}
          className="w-full max-w-[150px] accent-[var(--color-primary)]"
        />
        <span className="text-sm w-8 text-center">{strokeWidth}px</span>
      </div>

      <div className="flex flex-wrap justify-evenly gap-3 w-full sm:w-auto">
        <ControlButton
          onClick={handleClear}
          icon={<FaEraser />}
          label="Clear"
          color="var(--btn-red)"
          hoverColor="var(--btn-red-hover)"
        />
        <ControlButton
          onClick={handleReset}
          icon={<FaSync />}
          label="Reset"
          color="var(--btn-gray)"
          hoverColor="var(--btn-gray-hover)"
        />
        <ControlButton
          onClick={handleUndo}
          icon={<FaUndo />}
          label="Undo"
          color="var(--btn-indigo)"
          hoverColor="var(--btn-indigo-hover)"
        />
        <ControlButton
          onClick={handleRedo}
          icon={<FaRedo />}
          label="Redo"
          color="var(--btn-indigo)"
          hoverColor="var(--btn-indigo-hover)"
        />
        <ControlButton
          onClick={handleExportImage}
          icon={<FaFileExport />}
          label="PNG"
          color="var(--btn-green)"
          hoverColor="var(--btn-green-hover)"
        />
      </div>
    </div>
  );
}
