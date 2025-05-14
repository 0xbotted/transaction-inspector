import type { Log } from "ethers";
import { memo } from "react";

type Props = {
  logs: readonly Log[];
  show: boolean;
};

const KNOWN_EVENTS: Record<string, string> = {
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": "Transfer",
  "0x8c5be1e5ebec7d5bd14f714fada36d0b69dcb6cbe7b7c6f1859cd5e7e196efb0": "Approval",
  "0xd78ad95fa46c994b6551d0da85fc275fe613ff3bcddeec569f6e2c54dfeb42b8": "Swap",
};

const TxLogsViewer = ({ logs, show }: Props) => {
  if (!show || !logs?.length) return null;

  return (
    <section className="mt-8 bg-white/30 dark:bg-white/5 backdrop-blur-md ring-1 ring-white/20 dark:ring-white/10 p-5 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">🧾 Transaction Logs / Events</h2>

      {logs.map((log, idx) => (
        <div
          key={`${log.address}-${idx}`}
          className="bg-gray-100/70 dark:bg-gray-800/50 backdrop-blur rounded-xl p-4 font-mono text-xs space-y-2 overflow-x-auto"
        >
          <p><strong>Address:</strong> {log.address}</p>

          <div>
            <strong>Topics:</strong>
            <ul className="ml-4 list-disc">
              {log.topics.map((topic, i) => (
                <li key={i}>
                  {KNOWN_EVENTS[topic] && (
                    <span className="text-green-500">[{KNOWN_EVENTS[topic]}] </span>
                  )}
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <p><strong>Data:</strong> {log.data}</p>
        </div>
      ))}
    </section>
  );
};

export default memo(TxLogsViewer);
