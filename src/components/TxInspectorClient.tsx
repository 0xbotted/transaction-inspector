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
  } = useTxInspector();

  return (
    <>
      <TxForm hash={hash} setHash={setHash} chainKey={chainKey} setChainKey={setChainKey} onSubmit={inspectTx} />

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
