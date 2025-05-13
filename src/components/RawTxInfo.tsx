import React from "react";
import type { ITxInfo } from "@/@types";

interface Props {
  txInfo: ITxInfo;
  show: boolean;
}

export const RawTxInfo: React.FC<Props> = ({ txInfo, show }) => {
  if (!show) return null;

  return (
    <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-auto max-h-[500px] font-mono whitespace-pre-wrap">
      <pre>{JSON.stringify(txInfo, null, 2)}</pre>
    </div>
  );
};
