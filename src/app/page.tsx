"use client";

import { useState } from "react";
import { fetchTxData } from "@/lib/fetchTx";
import { getSelector, splitArgs } from "@/lib/decodeCalldata";
import { lookupSelector } from "@/lib/lookup4Byte";
import { CHAINS } from "@/lib/chains";
import type { ChainKey, ITxInfo } from "@/@types";
import { ethers } from "ethers";

import TxForm from "@/components/TxForm";
import TxInfo from "@/components/TxInfo";
import CalldataDetails from "@/components/CalldataDetails";
import ToggleButtons from "@/components/ToggleButtons";
import TxLogsViewer from "@/components/TxLogsViewer";
import { RawTxInfo } from "@/components/RawTxInfo";

export default function Home() {
  const [hash, setHash] = useState("");
  const [chainKey, setChainKey] = useState<ChainKey>("ETHEREUM");
  const [txInfo, setTxInfo] = useState<ITxInfo | null>(null);
  const [balances, setBalances] = useState<Record<string, string>>({});
  const [showRaw, setShowRaw] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  const inspectTx = async () => {
    try {
      setTxInfo(null);
      setBalances({});
      const result = await fetchTxData(hash, chainKey);
      if (!result || !result.tx || !result.receipt) return;

      const { tx, receipt, chain } = result;
      const selector = getSelector(tx.data);
      const args = splitArgs(tx.data);
      const funcSigs = await lookupSelector(selector);

      setTxInfo({ tx, receipt, selector, args, funcSigs, chain });
    } catch (err) {
      console.error("Error inspecting tx:", err);
    }
  };

  const getBalance = async (address: string) => {
    try {
      const rpcUrl = CHAINS[chainKey]?.rpcUrls?.[0];
      if (!rpcUrl) throw new Error("Missing RPC URL");

      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const balance = await provider.getBalance(address);

      setBalances((prev) => ({
        ...prev,
        [address]: `${ethers.formatEther(balance)} ${CHAINS[chainKey]?.tokenSymbol ?? ""}`,
      }));
    } catch (err) {
      console.error(`Failed to fetch balance for ${address}:`, err);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100 relative">
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Multi-Chain Tx Inspector
      </h1>

      <TxForm hash={hash} setHash={setHash} chainKey={chainKey} setChainKey={setChainKey} onSubmit={inspectTx} />

      {txInfo && (
        <div className="mt-10 space-y-6">
          <TxInfo txInfo={txInfo} balances={balances} getBalance={getBalance} />
          <CalldataDetails txInfo={txInfo} copyToClipboard={copyToClipboard} />
          <ToggleButtons
            showRaw={showRaw}
            setShowRaw={() => setShowRaw(!showRaw)}
            showLogs={showLogs}
            setShowLogs={() => setShowLogs(!showLogs)}
          />

          <RawTxInfo txInfo={txInfo} show={showRaw} />
          <TxLogsViewer logs={txInfo?.receipt?.logs ?? []} show={showLogs} />
        </div>
      )}
    </main>
  );
}
