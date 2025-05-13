import ChainSelector from "./ChainSelector";
import type { ChainKey } from "@/@types";

type Props = {
  hash: string;
  setHash: (v: string) => void;
  chainKey: ChainKey;
  setChainKey: (k: ChainKey) => void;
  onSubmit: () => void;
};

export default function TxForm({ hash, setHash, chainKey, setChainKey, onSubmit }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow space-y-4 ring-1 ring-gray-200 dark:ring-gray-700"
    >
      <ChainSelector chainKey={chainKey} setChainKey={setChainKey} />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Transaction Hash
        </label>
        <input
          type="text"
          placeholder="0x..."
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
      >
        Inspect
      </button>
    </form>
  );
}
