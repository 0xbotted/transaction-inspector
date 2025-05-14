import { useState } from "react";
import { Code, List } from "lucide-react";

type ToggleButtonsProps = {
  showRaw: boolean;
  setShowRaw: React.Dispatch<React.SetStateAction<boolean>>;
  showLogs: boolean;
  setShowLogs: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ToggleButtons({ showRaw, setShowRaw, showLogs, setShowLogs }: ToggleButtonsProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = (type: "raw" | "logs") => {
    if (isAnimating) return;

    setIsAnimating(true);
    if (type === "raw") {
      setShowRaw((prev) => !prev);
    } else {
      setShowLogs((prev) => !prev);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={() => handleToggle("raw")}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
          showRaw
            ? "bg-purple-100/80 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800 shadow-sm"
            : "bg-white/50 dark:bg-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-600/50 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
        }`}
        disabled={isAnimating}
      >
        <Code className="h-4 w-4" />
        {showRaw ? "Hide Raw Data" : "View Raw Data"}
      </button>

      <button
        onClick={() => handleToggle("logs")}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
          showLogs
            ? "bg-blue-100/80 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800 shadow-sm"
            : "bg-white/50 dark:bg-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-600/50 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
        }`}
        disabled={isAnimating}
      >
        <List className="h-4 w-4" />
        {showLogs ? "Hide Event Logs" : "View Event Logs"}
      </button>
    </div>
  );
}
