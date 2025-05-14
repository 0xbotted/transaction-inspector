"use client";

import { useTxInspector } from "@/hooks/useTxInspector";
import TxForm from "@/components/TxForm";
import TxInfo from "@/components/TxInfo";
import CalldataDetails from "@/components/CalldataDetails";
import ToggleButtons from "@/components/ToggleButtons";
import TxLogsViewer from "@/components/TxLogsViewer";
import { RawTxInfo } from "@/components/RawTxInfo";

export default function TxInspectorClient() {
  const {
    hash,
    setHash,
    chainKey,
    setChainKey,
    txInfo,
    balances,
    showRaw,
    showLogs,
    inspectTx,
    getBalance,
    copyToClipboard,
    toggleShowRaw,
    toggleShowLogs,
    error,
  } = useTxInspector();

  return (
    <>
      <TxForm hash={hash} setHash={setHash} chainKey={chainKey} setChainKey={setChainKey} onSubmit={inspectTx} />

      {error && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 rounded-lg shadow">
          {error}
        </div>
      )}

      {txInfo && (
        <div className="mt-10 space-y-6">
          <TxInfo txInfo={txInfo} balances={balances} getBalance={getBalance} />
          <CalldataDetails txInfo={txInfo} copyToClipboard={copyToClipboard} />
          <ToggleButtons
            showRaw={showRaw}
            setShowRaw={toggleShowRaw}
            showLogs={showLogs}
            setShowLogs={toggleShowLogs}
          />
          <RawTxInfo txInfo={txInfo} show={showRaw} />
          <TxLogsViewer logs={txInfo?.receipt?.logs ?? []} show={showLogs} />
        </div>
      )}
    </>
  );
}
