/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { fetchTxData } from "@/lib/fetchTx";
import { getSelector, splitArgs } from "@/lib/decodeCalldata";
import { lookupSelector } from "@/lib/lookup4Byte";
import { CHAINS } from "@/lib/chains";
import type { ChainKey } from "@/@types";
import { ethers } from "ethers";

import ThemeToggle from "@/components/ThemeToggle";
import TxForm from "@/components/TxForm";
import TxInfo from "@/components/TxInfo";
import CalldataDetails from "@/components/CalldataDetails";

export default function Home() {
  const [hash, setHash] = useState("");
  const [chainKey, setChainKey] = useState<ChainKey>("ETHEREUM");
  const [txInfo, setTxInfo] = useState<any>(null);
  const [balances, setBalances] = useState<Record<string, string>>({});

  const inspectTx = async () => {
    try {
      setTxInfo(null);
      setBalances({});
      const { tx, receipt, chain } = await fetchTxData(hash, chainKey);
      if (!tx) return;
      const selector = getSelector(tx.data);
      const args = splitArgs(tx.data);
      const funcSigs = await lookupSelector(selector);
      setTxInfo({ tx, receipt, selector, args, funcSigs, chain });
    } catch (err) {
      console.error("Error inspecting tx:", err);
    }
  };

  const getBalance = async (address: string) => {
    const provider = new ethers.JsonRpcProvider(CHAINS[chainKey].rpcUrls[0]);
    const balance = await provider.getBalance(address);
    setBalances((prev) => ({
      ...prev,
      [address]: `${ethers.formatEther(balance)} ${CHAINS[chainKey].tokenSymbol}`,
    }));
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100 relative">
      <ThemeToggle />

      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Multi-Chain Tx Inspector
      </h1>

      <TxForm hash={hash} setHash={setHash} chainKey={chainKey} setChainKey={setChainKey} onSubmit={inspectTx} />

      {txInfo && (
        <div className="mt-10 space-y-6">
          <TxInfo txInfo={txInfo} balances={balances} getBalance={getBalance} />
          <CalldataDetails txInfo={txInfo} copyToClipboard={copyToClipboard} />
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(txInfo, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
