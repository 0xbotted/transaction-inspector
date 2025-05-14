"use client";

import { useTxInspector } from "@/hooks/useTxInspector";
import TxForm from "@/components/TxForm";
import TxInfo from "@/components/TxInfo";
import CalldataDetails from "@/components/CalldataDetails";
import ToggleButtons from "@/components/ToggleButtons";
import TxLogsViewer from "@/components/TxLogsViewer";
import { RawTxInfo } from "@/components/RawTxInfo";
import { AnimatePresence, motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";

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
    isLoading,
  } = useTxInspector();

  return (
    <div className="space-y-6">
      <TxForm
        hash={hash}
        setHash={setHash}
        chainKey={chainKey}
        setChainKey={setChainKey}
        onSubmit={inspectTx}
        isLoading={isLoading}
      />

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-red-100/80 dark:bg-red-900/80 border border-red-200 dark:border-red-800 rounded-lg shadow-sm flex items-start gap-3"
          >
            <TriangleAlert className="h-5 w-5 text-red-500 dark:text-red-300 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-800 dark:text-red-100">Error</h3>
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {txInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <TxInfo txInfo={txInfo} balances={balances} getBalance={getBalance} />
          <CalldataDetails txInfo={txInfo} copyToClipboard={copyToClipboard} />

          <ToggleButtons
            showRaw={showRaw}
            setShowRaw={toggleShowRaw}
            showLogs={showLogs}
            setShowLogs={toggleShowLogs}
          />

          <AnimatePresence mode="wait">
            {showRaw && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <RawTxInfo txInfo={txInfo} show={showRaw} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {showLogs && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TxLogsViewer logs={txInfo?.receipt?.logs ?? []} show={showLogs} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
