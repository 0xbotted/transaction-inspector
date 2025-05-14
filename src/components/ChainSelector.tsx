import { CHAINS } from "@/lib/chains";
import type { ChainKey } from "@/@types";

type Props = {
  chainKey: ChainKey;
  setChainKey: (key: ChainKey) => void;
};

export default function ChainSelector({ chainKey, setChainKey }: Props) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Chain</label>

      <div className="relative rounded-lg shadow-sm bg-white/5 backdrop-blur-md border border-white/10">
        <select
          value={chainKey}
          onChange={(e) => setChainKey(e.target.value as ChainKey)}
          className="w-full appearance-none rounded-lg bg-transparent px-4 py-2 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {Object.entries(CHAINS).map(([key, chain]) => (
            <option key={key} value={key} className="text-black dark:text-white bg-white dark:bg-gray-900">
              {chain.name}
            </option>
          ))}
        </select>

        {/* Chevron icon (optional for better UX) */}
        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

