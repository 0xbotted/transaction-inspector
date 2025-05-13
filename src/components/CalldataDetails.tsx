import { ITxInfo } from "@/@types";

type Props = {
  txInfo: ITxInfo;
  copyToClipboard: (val: string) => void;
};

export default function CalldataDetails({ txInfo, copyToClipboard }: Props) {
  const { selector, funcSigs, args } = txInfo;

  const funcName = funcSigs.length ? funcSigs[0] : "Unknown";

  const match = funcName.match(/\((.*)\)/);
  
  const paramTypes = !match || !match[1] ? [] : match[1].split(",").map((type) => type.trim());

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow ring-1 ring-gray-200 dark:ring-gray-700 space-y-3">
      <h2 className="text-xl font-semibold">Calldata</h2>

      <div className="flex items-center justify-between">
        <span className="text-gray-600 dark:text-gray-400 text-sm">Function Selector</span>
        <button
          onClick={() => copyToClipboard(selector)}
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          Copy
        </button>
      </div>
      <div className="font-mono text-sm break-all text-gray-900 dark:text-gray-100">{selector}</div>

      <div className="text-sm text-gray-700 dark:text-gray-300 mt-2">
        Matched: <span className="font-semibold">{funcName}</span>
      </div>

      {/* Argument list */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-1">Arguments:</h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {args.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 text-sm italic">No arguments</div>
          ) : (
            args.map((arg: string, idx: number) => (
              <div key={idx} className="py-2 flex justify-between items-start gap-4 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  arg[{idx}] ({paramTypes[idx] || "unknown"})
                </span>
                <code className="font-mono text-right break-all text-gray-900 dark:text-gray-100">{arg}</code>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
