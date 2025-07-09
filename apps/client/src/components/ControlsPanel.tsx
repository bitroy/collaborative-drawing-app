import type { ChangeEvent } from 'react';
import { FaEraser, FaFileExport, FaRedo, FaSync, FaUndo } from 'react-icons/fa';
import ControlButton from './ControlButton';

type ControlsPanelProps = {
  strokeColor: string;
  strokeWidth: number;
  onColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onWidthChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
};

export function ControlsPanel({
  strokeColor,
  strokeWidth,
  onColorChange,
  onWidthChange,
  onClear,
  onReset,
  onUndo,
  onRedo,
  onExport,
}: ControlsPanelProps) {
  return (
    <div
      className="w-full max-w-lg flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:items-center"
      style={{ color: 'var(--color-text)' }}
    >
      <div
        className="flex items-center gap-3 w-full sm:w-auto"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <span className="text-sm font-medium min-w-[120px]">Stroke Color:</span>
        <input
          type="color"
          value={strokeColor}
          onChange={onColorChange}
          className="h-8 w-8 border-2 rounded-lg hover:scale-110 transition-transform"
          style={{ borderColor: 'var(--color-border)' }}
        />
      </div>

      <div
        className="flex items-center gap-3 w-full sm:w-auto"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <span className="text-sm font-medium min-w-[120px]">Stroke Width:</span>
        <input
          type="range"
          min={1}
          max={10}
          value={strokeWidth}
          onChange={onWidthChange}
          className="w-full max-w-[150px]"
          style={{ accentColor: 'var(--color-primary)' }}
        />
        <span className="text-sm w-8 text-center">{strokeWidth}px</span>
      </div>

      <div className="flex flex-wrap justify-evenly gap-3 w-full sm:w-auto">
        <ControlButton
          onClick={onClear}
          icon={<FaEraser />}
          label="Clear"
          color="var(--btn-red)"
          hoverColor="var(--btn-red-hover)"
        />
        <ControlButton
          onClick={onReset}
          icon={<FaSync />}
          label="Reset"
          color="var(--btn-gray)"
          hoverColor="var(--btn-gray-hover)"
        />
        <ControlButton
          onClick={onUndo}
          icon={<FaUndo />}
          label="Undo"
          color="var(--btn-indigo)"
          hoverColor="var(--btn-indigo-hover)"
        />
        <ControlButton
          onClick={onRedo}
          icon={<FaRedo />}
          label="Redo"
          color="var(--btn-indigo)"
          hoverColor="var(--btn-indigo-hover)"
        />
        <ControlButton
          onClick={onExport}
          icon={<FaFileExport />}
          label="PNG"
          color="var(--btn-green)"
          hoverColor="var(--btn-green-hover)"
        />
      </div>
    </div>
  );
}
