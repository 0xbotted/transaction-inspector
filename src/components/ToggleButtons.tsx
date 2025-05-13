type ToggleButtonsProps = {
  showRaw: boolean;
  setShowRaw: React.Dispatch<React.SetStateAction<boolean>>;
  showLogs: boolean;
  setShowLogs: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ToggleButtons({ showRaw, setShowRaw, showLogs, setShowLogs }: ToggleButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => setShowRaw((prev) => !prev)}
        className="px-3 py-1 rounded border text-sm dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {showRaw ? "Hide" : "Show"} Raw txInfo
      </button>

      <button
        onClick={() => setShowLogs((prev) => !prev)}
        className="px-3 py-1 rounded border text-sm dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {showLogs ? "Hide" : "Show"} Logs / Events
      </button>
    </div>
  );
}
