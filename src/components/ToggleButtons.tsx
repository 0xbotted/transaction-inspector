type ToggleButtonsProps = {
  showRaw: boolean;
  setShowRaw: React.Dispatch<React.SetStateAction<boolean>>;
  showLogs: boolean;
  setShowLogs: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ToggleButtons({
  showRaw,
  setShowRaw,
  showLogs,
  setShowLogs,
}: ToggleButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      <button
        onClick={() => setShowRaw((prev) => !prev)}
        className="px-4 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/30 dark:bg-white/10 backdrop-blur text-sm font-medium hover:bg-white/50 dark:hover:bg-white/20 transition"
      >
        {showRaw ? "Hide" : "Show"} Raw txInfo
      </button>

      <button
        onClick={() => setShowLogs((prev) => !prev)}
        className="px-4 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/30 dark:bg-white/10 backdrop-blur text-sm font-medium hover:bg-white/50 dark:hover:bg-white/20 transition"
      >
        {showLogs ? "Hide" : "Show"} Logs / Events
      </button>
    </div>
  );
}
