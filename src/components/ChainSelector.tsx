import { CHAINS } from "@/lib/chains";
import type { ChainKey } from "@/@types";

type Props = {
  chainKey: ChainKey;
  setChainKey: (key: ChainKey) => void;
};

export default function ChainSelector({ chainKey, setChainKey }: Props) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Chain
      </label>
      <select
        value={chainKey}
        onChange={(e) => setChainKey(e.target.value as ChainKey)}
        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Object.entries(CHAINS).map(([key, chain]) => (
          <option key={key} value={key}>
            {chain.name}
          </option>
        ))}
      </select>
    </div>
  );
}
