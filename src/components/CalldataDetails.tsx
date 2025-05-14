import { ITxInfo } from "@/@types";

type Props = {
  txInfo: ITxInfo;
  copyToClipboard: (val: string) => void;
};

export default function CalldataDetails({ txInfo, copyToClipboard }: Props) {
  const { selector, funcSigs, args } = txInfo;
  const funcName = funcSigs.length ? funcSigs[0] : "Unknown";
  const paramTypes =
    funcName
      .match(/\((.*)\)/)?.[1]
      ?.split(",")
      .map((s) => s.trim()) || [];

  return (
    <div className="bg-white/30 dark:bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow ring-1 ring-white/20 dark:ring-white/10 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">📦 Calldata</h2>

      <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
        <span>Function Selector</span>
        <button onClick={() => copyToClipboard(selector)} className="text-blue-600 dark:text-blue-400 hover:underline">
          Copy
        </button>
      </div>
      <div className="font-mono text-sm break-all text-gray-900 dark:text-gray-100">{selector}</div>

      <div className="text-sm text-gray-700 dark:text-gray-300">
        Matched: <span className="font-semibold">{funcName}</span>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Arguments:</h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {args.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 text-sm italic">No arguments</div>
          ) : (
            args.map((arg, idx) => (
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
