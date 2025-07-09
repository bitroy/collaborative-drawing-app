import { useEffect, useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';

interface ShareButtonProps {
  roomId: string;
}

export function ShareButton({ roomId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/room/${roomId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (error) {
      console.error(error);
      alert('Failed to copy the link.');
    }
  };

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className="flex items-center space-x-2 max-w-fit">
      {/* Button */}
      <button
        onClick={handleCopy}
        aria-label="Share Room"
        className="
          bg-blue-600 hover:bg-blue-700 active:bg-blue-800
          text-white rounded flex items-center justify-center
          focus:outline-none focus:ring-2 focus:ring-blue-400
          p-2 sm:px-4 sm:py-2
          min-w-[40px] sm:min-w-auto
        "
      >
        <FaShareAlt size={16} />
        <span className="hidden sm:inline ml-2">Share Room</span>
      </button>

      {/* Message */}
      {copied && (
        <div
          role="alert"
          aria-live="assertive"
          className="
            text-green-600 text-sm select-text break-words max-w-xs
            bg-green-50 border border-green-200 px-3 py-0.5 rounded
          "
        >
          Copied link!
        </div>
      )}
    </div>
  );
}
