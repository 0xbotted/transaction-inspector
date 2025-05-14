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
      className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/30 p-6 rounded-2xl shadow-lg space-y-4 ring-1 ring-white/10 dark:ring-white/10 transition-all"
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
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold shadow-md hover:shadow-lg transition-all"
      >
        Inspect
      </button>
    </form>
  );
}
