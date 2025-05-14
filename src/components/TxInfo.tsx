import type { TxDataResponse } from "@/@types";
import { JSX } from "react";

type Props = {
  txInfo: TxDataResponse;
  balances: Record<string, string>;
  getBalance: (address: string) => void;
};

export default function TxInfo({ txInfo, balances, getBalance }: Props) {
  const { tx, receipt, chain } = txInfo;

  if (!tx || !chain) {
    return (
      <div className="p-4 rounded bg-yellow-50 text-yellow-800 border border-yellow-300">
        Missing transaction or chain data.
      </div>
    );
  }

  const InfoRow = ({ label, value }: { label: string; value: string | JSX.Element | null | undefined }) => (
    <div className="flex justify-between items-center py-1 text-sm">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span className="font-mono text-gray-900 dark:text-gray-100 text-right break-all">{value ?? "-"}</span>
    </div>
  );

  const fromBalance = balances[tx.from];
  const to = tx.to ?? null;
  const toBalance = to ? balances[to] : null;

  const gasUsed = receipt?.gasUsed ? BigInt(receipt.gasUsed) : null;
  const gasPrice = tx.gasPrice ? BigInt(tx.gasPrice) : null;
  const feeEth = gasUsed && gasPrice ? (Number(gasUsed) * Number(gasPrice)) / 1e18 : null;

  const tokenSymbol = chain.tokenSymbol ?? "";

  return (
    <div className="bg-white/30 dark:bg-white/5 backdrop-blur-lg ring-1 ring-white/40 dark:ring-white/10 shadow-xl p-6 rounded-2xl space-y-4 transition-all">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">📄 Transaction Info</h2>

      <InfoRow label="Chain" value={chain.name} />

      <InfoRow
        label="Status"
        value={
          receipt ? (
            receipt.status === 1 ? (
              <span className="inline-flex items-center px-2 py-0.5 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded">
                ✅ Success
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded">
                ❌ Failed
              </span>
            )
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded">
              ⏳ Pending
            </span>
          )
        }
      />

      <InfoRow
        label="From"
        value={
          <button
            onClick={() => getBalance(tx.from)}
            className="underline underline-offset-2 hover:text-blue-500 transition"
          >
            {tx.from}
          </button>
        }
      />
      {fromBalance && <InfoRow label="From Balance" value={fromBalance} />}

      <InfoRow label="To" value={to ?? "Contract Creation"} />
      {to && toBalance && <InfoRow label="To Balance" value={toBalance} />}

      <InfoRow label="Nonce" value={tx.nonce?.toString()} />
      <InfoRow label="Gas Used" value={gasUsed ? gasUsed.toLocaleString() : undefined} />
      <InfoRow label="Tx Fee" value={feeEth !== null ? `${feeEth.toFixed(6)} ${tokenSymbol}` : undefined} />
    </div>
  );
}
