import React from "react";

interface ToggleSwitchProps {
  isMarkdownMode: boolean;
  onToggle: () => void;
}

export function ToggleSwitch({ isMarkdownMode, onToggle }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-center gap-2 bg-white dark:bg-neutral-900 rounded-full p-1 shadow-md border border-neutral-200">
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          isMarkdownMode
            ? "bg-blue-500 text-white"
            : "bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100"
        }`}
      >
      Markdown to HTML
      </button>
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !isMarkdownMode
            ? "bg-blue-500 text-white"
            : "bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100"
        }`}
      >
        HTML to Markdown
      </button>
    </div>
  );
}

export default ToggleSwitch;