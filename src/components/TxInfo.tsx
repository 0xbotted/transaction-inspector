import { CHAINS } from "@/lib/chains";
import type { ChainKey } from "@/@types";
import { JSX } from "react";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  txInfo: any;
  balances: Record<string, string>;
  getBalance: (address: string) => void;
};

export default function TxInfo({ txInfo, balances, getBalance }: Props) {
  const { tx, receipt, chain } = txInfo;

  const InfoRow = ({ label, value }: { label: string; value: string | JSX.Element }) => (
    <div className="flex justify-between items-center py-1 text-sm">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span className="font-mono text-gray-900 dark:text-gray-100 text-right">{value}</span>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow ring-1 ring-gray-200 dark:ring-gray-700 space-y-2">
      <h2 className="text-xl font-semibold mb-2">Transaction Info</h2>
      <InfoRow label="Chain" value={chain.name} />
      <InfoRow label="Status" value={receipt.status === "0x1" ? "✅ Success" : "❌ Failed"} />
      <InfoRow label="From" value={
        <button
          onClick={() => getBalance(tx.from)}
          className="underline underline-offset-2 hover:text-blue-500 transition"
        >
          {tx.from}
        </button>
      } />
      {balances[tx.from] && <InfoRow label="From Balance" value={balances[tx.from]} />}
      <InfoRow label="To" value={tx.to ?? "Contract Creation"} />
      {balances[tx.to] && <InfoRow label="To Balance" value={balances[tx.to]} />}
      <InfoRow label="Nonce" value={tx.nonce.toString()} />
      <InfoRow label="Gas Used" value={parseInt(receipt.gasUsed).toLocaleString()} />
      <InfoRow label="Tx Fee" value={
        `${parseFloat(receipt.gasUsed) * parseFloat(tx.gasPrice) / 1e18} ${CHAINS[chain.key as ChainKey]?.tokenSymbol}`
      } />
    </div>
  );
}
