import { useCanvasState } from './useCanvasState';

export function useCanvasControls() {
  const {
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
  } = useCanvasState();

  const handleColorChange = (color: string) => {
    setStrokeColor(color);
  };

  const handleWidthChange = (width: number) => {
    setStrokeWidth(width);
  };

  return {
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
  };
}
