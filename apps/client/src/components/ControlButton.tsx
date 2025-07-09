import { useState } from 'react';

type ControlButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  color: string;
  hoverColor: string;
};

export default function ControlButton({
  onClick,
  icon,
  label,
  color,
  hoverColor,
}: ControlButtonProps) {
  const [bgColor, setBgColor] = useState(color);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setBgColor(hoverColor)}
      onMouseLeave={() => setBgColor(color)}
      style={{ backgroundColor: bgColor }}
      className="
        text-white
        px-4 py-2 rounded-lg shadow-md
        flex items-center justify-center gap-2
        min-w-[48px] min-h-[48px]
        transition-colors duration-200 ease-in-out
        active:scale-95
      "
      aria-label={label}
    >
      <span className="text-xl">{icon}</span>
      <span className="hidden sm:inline text-sm font-medium">{label}</span>
    </button>
  );
}
