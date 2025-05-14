import { ITxInfo } from "@/@types";
import { CodeXml, Copy } from "lucide-react";

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
    <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/20 dark:border-gray-700/50 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-purple-500/10">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200/20 dark:border-gray-700/50 bg-white/5 dark:bg-gray-700/30 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
          <CodeXml className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Calldata Analysis</h2>
      </div>

      <div className="p-5 space-y-5">
        {/* Function Selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Function Selector</span>
            <button
              onClick={() => copyToClipboard(selector)}
              className="text-sm flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
          </div>
          <div className="font-mono text-sm p-3 rounded-lg bg-gray-100/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 break-all">
            {selector}
          </div>
        </div>

        {/* Function Signature */}
        <div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Matched Function</span>
          <div className="font-mono text-sm p-3 rounded-lg bg-gray-100/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100">
            {funcName || <span className="text-gray-500 italic">Unable to decode</span>}
          </div>
        </div>

        {/* Arguments */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Arguments</h3>
          {args.length === 0 ? (
            <div className="text-sm text-gray-500 dark:text-gray-400 italic p-3 rounded-lg bg-gray-100/50 dark:bg-gray-700/50">
              No arguments passed
            </div>
          ) : (
            <div className="space-y-3">
              {args.map((arg, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-gray-100/50 dark:bg-gray-700/50">
                  <div className="flex justify-between items-start gap-4 text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">arg[{idx}]</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600/50 px-2 py-1 rounded">
                      {paramTypes[idx] || "unknown"}
                    </span>
                  </div>
                  <code className="font-mono text-sm break-all text-gray-900 dark:text-gray-100 block mt-1">{arg}</code>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
