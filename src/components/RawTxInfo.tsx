import type { ITxInfo } from "@/@types";
import React from "react";

interface Props {
  txInfo: ITxInfo;
  show: boolean;
}

export const RawTxInfo: React.FC<Props> = ({ txInfo, show }) => {
  if (!show) return null;

  return (
    <div className="mt-6 bg-white/20 dark:bg-white/5 backdrop-blur rounded-2xl p-4 max-h-[500px] overflow-auto shadow ring-1 ring-white/20 dark:ring-white/10 text-xs font-mono whitespace-pre-wrap">
      <pre className="text-gray-900 dark:text-gray-100">{JSON.stringify(txInfo, null, 2)}</pre>
    </div>
  );
};
