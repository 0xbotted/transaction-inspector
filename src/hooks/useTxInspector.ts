"use client";

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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const inspectTx = async () => {
    setError(null);
    try {
      setIsLoading(true);
      setTxInfo(null);
      setBalances({});

      if (!hash || !hash.startsWith("0x") || hash.length !== 66) {
        throw new Error("Invalid transaction hash format.");
      }

      const result = await fetchTxData(hash, chainKey);
      if (!result || !result.tx || !result.receipt) {
        throw new Error("Transaction not found or failed to fetch.");
      }

      const { tx, receipt, chain } = result;
      const selector = getSelector(tx.data);
      const args = splitArgs(tx.data);
      const funcSigs = await lookupSelector(selector);

      setTxInfo({ tx, receipt, selector, args, funcSigs, chain });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unexpected error occurred during inspection.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
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
        [address]: ethers.formatEther(balance),
      }));
    } catch (err) {
      console.error(`Failed to fetch balance for ${address}:`, err);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
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
    error,
    inspectTx,
    getBalance,
    copyToClipboard,
    isLoading,
    toggleShowRaw: () => setShowRaw((prev) => !prev),
    toggleShowLogs: () => setShowLogs((prev) => !prev),
  };
};
