import { CHAINS } from "@/lib/chains";
import type { ChainKey } from "@/@types";

type Props = {
  chainKey: ChainKey;
  setChainKey: (key: ChainKey) => void;
  className?: string;
};

export default function ChainSelector({ chainKey, setChainKey, className = "" }: Props) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-300/90 mb-1.5">Network</label>

      <div className="relative group">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <select
          value={chainKey}
          onChange={(e) => setChainKey(e.target.value as ChainKey)}
          className="w-full appearance-none rounded-lg bg-gray-800/70 px-4 py-3 pr-10 text-sm text-white border border-gray-700/70 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all cursor-pointer"
        >
          {Object.entries(CHAINS).map(([key, chain]) => (
            <option key={key} value={key} className="text-white bg-gray-800 hover:bg-purple-500">
              {chain.name}
            </option>
          ))}
        </select>

        {/* Custom chevron with animation */}
        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-300 transition-colors">
          <svg
            className="w-5 h-5 transition-transform group-focus-within:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
