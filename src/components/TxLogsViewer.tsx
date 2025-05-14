import type { Log } from "ethers";
import { JSX, memo } from "react";
import { ScrollText, FileText, ArrowRightLeft, CheckCircle, Copy } from "lucide-react";

type Props = {
  logs: readonly Log[];
  show: boolean;
  onCopy?: (text: string) => void;
};

const KNOWN_EVENTS: Record<string, { name: string; icon: JSX.Element }> = {
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": {
    name: "Transfer",
    icon: <ArrowRightLeft className="w-4 h-4" />,
  },
  "0x8c5be1e5ebec7d5bd14f714fada36d0b69dcb6cbe7b7c6f1859cd5e7e196efb0": {
    name: "Approval",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  "0xd78ad95fa46c994b6551d0da85fc275fe613ff3bcddeec569f6e2c54dfeb42b8": {
    name: "Swap",
    icon: <FileText className="w-4 h-4" />,
  },
};

const TxLogsViewer = ({ logs, show, onCopy }: Props) => {
  if (!show) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    onCopy?.(text);
  };

  return (
    <section className="mt-6 bg-white/10 dark:bg-gray-800/80 border border-gray-200/20 dark:border-gray-700/50 rounded-xl shadow-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200/20 dark:border-gray-700/50 bg-white/5 dark:bg-gray-700/30 flex items-center gap-3">
        <ScrollText className="h-5 w-5 text-purple-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Transaction Logs & Events</h2>
        <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">
          {logs?.length || 0} events
        </span>
      </div>

      {!logs?.length ? (
        <div className="p-5 text-center text-gray-500 dark:text-gray-400 text-sm">
          No event logs found for this transaction
        </div>
      ) : (
        <div className="divide-y divide-gray-200/20 dark:divide-gray-700/30 max-h-[500px] overflow-y-auto">
          {logs.map((log, idx) => (
            <div
              key={`${log.address}-${idx}`}
              className="p-4 hover:bg-gray-100/30 dark:hover:bg-gray-700/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  {(log.topics[0] && KNOWN_EVENTS[log.topics[0]]?.icon) || (
                    <FileText className="w-4 h-4 text-gray-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {(log.topics[0] && KNOWN_EVENTS[log.topics[0]]?.name) || "Unknown Event"}
                    </h3>
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-700 dark:text-gray-300">
                      {idx + 1}/{logs.length}
                    </span>
                  </div>

                  <div className="text-xs space-y-1.5">
                    <div className="flex items-start gap-1">
                      <span className="text-gray-500 dark:text-gray-400 mt-0.5">Contract:</span>
                      <div className="flex-1 font-mono break-all">
                        {log.address}
                        <button
                          onClick={() => handleCopy(log.address)}
                          className="ml-2 text-gray-400 hover:text-blue-500 transition-colors"
                          title="Copy address"
                        >
                          <Copy className="w-3 h-3 inline" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-500 dark:text-gray-400 mb-1">Topics:</div>
                      <ul className="space-y-1 ml-2">
                        {log.topics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-gray-500 dark:text-gray-400 mt-0.5">{i}:</span>
                            <div className="flex-1 font-mono break-all">
                              {topic}
                              <button
                                onClick={() => handleCopy(topic)}
                                className="ml-2 text-gray-400 hover:text-blue-500 transition-colors"
                                title="Copy topic"
                              >
                                <Copy className="w-3 h-3 inline" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-start gap-1">
                      <span className="text-gray-500 dark:text-gray-400 mt-0.5">Data:</span>
                      <div className="flex-1 font-mono break-all">
                        {log.data || "0x"}
                        {log.data && (
                          <button
                            onClick={() => handleCopy(log.data)}
                            className="ml-2 text-gray-400 hover:text-blue-500 transition-colors"
                            title="Copy data"
                          >
                            <Copy className="w-3 h-3 inline" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default memo(TxLogsViewer);
