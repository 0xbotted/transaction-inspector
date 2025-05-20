import type { TxDataResponse } from "@/@types";
import {
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  ArrowLeftRight,
  Wallet,
  Hash,
  Flame,
  Coins,
  Link,
  ChevronRight,
} from "lucide-react";
import { useState, JSX } from "react";
import { motion } from "framer-motion";
import { knownEvents } from "@/lib/decodeLogs";

type Props = {
  txInfo: TxDataResponse;
  balances: Record<string, string>;
  getBalance: (address: string) => void;
};

export default function TxInfo({ txInfo, balances, getBalance }: Props) {
  const { tx, receipt, chain } = txInfo;
  const [isLoadingBalance, setIsLoadingBalance] = useState<string | null>(null);

  if (!tx || !chain) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 rounded-lg bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 flex items-start gap-3"
        role="alert"
      >
        <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium">Missing Data</h3>
          <p className="text-sm">Transaction or chain data not available</p>
        </div>
      </motion.div>
    );
  }

  const InfoRow = ({
    label,
    value,
    isMono = true,
    icon,
    isLast = false,
  }: {
    label: string;
    value: string | JSX.Element | null | undefined;
    isMono?: boolean;
    icon?: JSX.Element;
    isLast?: boolean;
  }) => (
    <div
      className={`flex items-center justify-between gap-4 py-3 ${
        !isLast ? "border-b border-gray-200 dark:border-gray-700" : ""
      }`}
    >
      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 w-2/5">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <span className={`text-right break-all ${isMono ? "font-mono" : ""} text-gray-900 dark:text-gray-100 w-3/5`}>
        {value ?? <span className="text-gray-400 italic">Not available</span>}
      </span>
    </div>
  );

  const fromBalance = balances[tx.from];
  const to = tx.to ?? null;
  const toBalance = to ? balances[to] : null;

  const gasUsed = receipt?.gasUsed ? BigInt(receipt.gasUsed) : null;
  const gasPrice = tx.gasPrice ? BigInt(tx.gasPrice) : null;
  const feeEth = gasUsed && gasPrice ? (Number(gasUsed) * Number(gasPrice)) / 1e18 : null;

  const tokenSymbol = chain.tokenSymbol ?? "";

  const handleGetBalance = async (address: string) => {
    setIsLoadingBalance(address);
    try {
      await getBalance(address);
    } finally {
      setIsLoadingBalance(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
          <ArrowLeftRight className="h-5 w-5 text-blue-500" />
          Transaction Details
        </h2>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-5 space-y-3">
          <InfoRow
            label="Network"
            value={chain.name}
            isMono={false}
            icon={<Link className="h-4 w-4 text-gray-500" />}
          />

          <InfoRow
            label="Status"
            value={
              receipt ? (
                receipt.status === 1 ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Success
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    <XCircle className="h-3.5 w-3.5" />
                    Failed
                  </span>
                )
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Clock className="h-3.5 w-3.5" />
                  Pending
                </span>
              )
            }
            isMono={false}
            icon={<ChevronRight className="h-4 w-4 text-gray-500" />}
          />
        </div>

        <div className="p-5 space-y-3">
          <InfoRow
            label="From Address"
            value={
              <button
                onClick={() => handleGetBalance(tx.from)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                disabled={isLoadingBalance === tx.from}
              >
                {isLoadingBalance === tx.from ? (
                  <RefreshCw className="h-3.5 w-3.5 inline mr-2 animate-spin" />
                ) : (
                  <Wallet className="h-3.5 w-3.5 inline mr-2" />
                )}
                <span className="truncate max-w-[180px]">{tx.from}</span>
              </button>
            }
            icon={<ChevronRight className="h-4 w-4 text-gray-500" />}
          />
          {fromBalance && (
            <InfoRow
              label="From Balance"
              value={`${fromBalance} ${tokenSymbol}`}
              icon={<Coins className="h-4 w-4 text-gray-500" />}
            />
          )}

          <InfoRow
            label="To Address"
            value={
              to ? (
                <button
                  onClick={() => handleGetBalance(to)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                  disabled={isLoadingBalance === to}
                >
                  {isLoadingBalance === to ? (
                    <RefreshCw className="h-3.5 w-3.5 inline mr-2 animate-spin" />
                  ) : (
                    <Wallet className="h-3.5 w-3.5 inline mr-2" />
                  )}
                  <span className="truncate max-w-[180px]">{to}</span>
                </button>
              ) : (
                <span className="text-gray-500 italic">Contract Creation</span>
              )
            }
            icon={<ChevronRight className="h-4 w-4 text-gray-500" />}
          />
          {to && toBalance && (
            <InfoRow
              label="To Balance"
              value={`${toBalance} ${tokenSymbol}`}
              icon={<Coins className="h-4 w-4 text-gray-500" />}
            />
          )}
        </div>
        {receipt?.logs && receipt?.logs?.length > 0 && (
          <div className="p-5 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-4 flex items-center gap-3">
              <Flame className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">What Happened in This Transaction</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {receipt.logs.length} action{receipt.logs.length !== 1 ? "s were" : " was"} recorded
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {receipt.logs.map((log, idx) => {
                const eventSig = log.topics[0];
                if (!eventSig) return null;

                const eventName = knownEvents[eventSig] || "Activity";
                const from = log.topics[1] ? `0x${log.topics[1].slice(26)}` : null;
                const to = log.topics[2] ? `0x${log.topics[2].slice(26)}` : null;
                const tokenId = log.topics[3] ? BigInt(log.topics[3]).toString() : null;

                return (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                        <span className="block text-sm font-medium">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        {eventName === "Transfer" && from && to ? (
                          <>
                            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                              {from === "0x0000000000000000000000000000000000000000" ? (
                                <>
                                  <span className="text-green-500">🟢 Created</span>
                                  {tokenId && <span>Token #{tokenId}</span>}
                                </>
                              ) : (
                                <>
                                  <span className="text-blue-500">🔄 Transferred</span>
                                  {tokenId && <span>Token #{tokenId}</span>}
                                </>
                              )}
                            </h4>
                            <div className="mt-2 space-y-1 text-sm">
                              {from !== "0x0000000000000000000000000000000000000000" && (
                                <p>
                                  From: <span className="font-mono text-xs">{from}</span>
                                </p>
                              )}
                              <p>
                                To: <span className="font-mono text-xs">{to}</span>
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                              📦 {eventName.replace(/([A-Z])/g, " $1").trim()}
                            </h4>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                              This action involved the contract:
                            </p>
                            <p className="font-mono text-xs mt-1 break-all">{log.address}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-start gap-2">
                <span className="text-blue-500">ℹ️</span>
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    These are automated records of what happened in the transaction.
                  </p>
                  <p className="text-xs mt-1 text-blue-600 dark:text-blue-400">
                    Think of them like a receipt showing all the steps that occurred.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-5 space-y-3">
          <InfoRow label="Nonce" value={tx.nonce?.toString()} icon={<Hash className="h-4 w-4 text-gray-500" />} />
          <InfoRow
            label="Gas Used"
            value={gasUsed ? gasUsed.toLocaleString() : undefined}
            icon={<Flame className="h-4 w-4 text-gray-500" />}
          />
          <InfoRow
            label="Transaction Fee"
            value={feeEth !== null ? `${feeEth.toFixed(6)} ${tokenSymbol}` : undefined}
            icon={<Coins className="h-4 w-4 text-gray-500" />}
            isLast={true}
          />
        </div>
      </div>
    </motion.div>
  );
}
