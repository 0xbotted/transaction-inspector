import type { ITxInfo } from "@/@types";
import React from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

interface Props {
  txInfo: ITxInfo;
  show: boolean;
  onCopy?: () => void;
}

export const RawTxInfo: React.FC<Props> = ({ txInfo, show, onCopy }) => {
  if (!show) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(txInfo, null, 2));
    onCopy?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="mt-4 bg-white/10 dark:bg-gray-800/80 border border-gray-200/20 dark:border-gray-700/50 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 dark:bg-gray-700/50 border-b border-gray-200/20 dark:border-gray-700/50">
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Raw Transaction Data</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
          title="Copy raw data"
        >
          <Copy className="h-4 w-4" />
          Copy
        </button>
      </div>

      <div className="max-h-[500px] overflow-auto p-4">
        <pre className="text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
          {JSON.stringify(
            txInfo,
            (key, value) => {
              // Handle big numbers and other special cases
              if (typeof value === "bigint") {
                return value.toString();
              }
              return value;
            },
            2
          )}
        </pre>
      </div>

      <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 bg-white/5 dark:bg-gray-700/30 border-t border-gray-200/20 dark:border-gray-700/50">
        {Object.keys(txInfo).length} properties
      </div>
    </motion.div>
  );
};
