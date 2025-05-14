'use client'

import { useState } from "react";
import { fetchTxData } from "@/lib/fetchTx";
import { getSelector, splitArgs } from "@/lib/decodeCalldata";
import { lookupSelector } from "@/lib/lookup4Byte";
import { CHAINS } from "@/lib/chains";
import type { ChainKey, ITxInfo } from "@/@types";
import { ethers } from "ethers";

export const useTxInspector = () => {
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

  return {
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
    toggleShowRaw: () => setShowRaw(prev => !prev),
    toggleShowLogs: () => setShowLogs(prev => !prev),
  };
};
