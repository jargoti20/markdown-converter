import React from "react";

interface ToggleSwitchProps {
  isMarkdownMode: boolean;
  onToggle: () => void;
}

export function ToggleSwitch({ isMarkdownMode, onToggle }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-center bg-white rounded-full p-1 shadow-md border border-gray-200">
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          isMarkdownMode
            ? "bg-blue-500 text-white"
            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
        }`}
      >
        Markdown to HTML
      </button>
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !isMarkdownMode
            ? "bg-blue-500 text-white"
            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
        }`}
      >
        HTML to Markdown
      </button>
    </div>
  );
}

export default ToggleSwitch;