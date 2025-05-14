import ChainSelector from "./ChainSelector";
import type { ChainKey } from "@/@types";

type Props = {
  hash: string;
  setHash: (v: string) => void;
  chainKey: ChainKey;
  setChainKey: (k: ChainKey) => void;
  onSubmit: () => void;
  isLoading?: boolean;
};

export default function TxForm({ hash, setHash, chainKey, setChainKey, onSubmit, isLoading = false }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="relative bg-gradient-to-br from-white/5 to-white/10 dark:from-gray-900/50 dark:to-gray-800/30 border border-white/20 dark:border-gray-700/50 p-6 rounded-2xl shadow-2xl space-y-5 backdrop-blur-sm transition-all hover:shadow-purple-500/10 hover:border-purple-400/30 group"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-100 mb-1 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
                clipRule="evenodd"
              />
            </svg>
            Transaction Inspector
          </h2>
          <p className="text-sm text-gray-400">Enter transaction details to analyze</p>
        </div>

        <ChainSelector chainKey={chainKey} setChainKey={setChainKey} />

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300/90 mb-1 flex items-center justify-between">
            <span>Transaction Hash</span>
            {hash && !hash.match(/^0x[a-fA-F0-9]{64}$/) && (
              <span className="text-xs text-rose-400">Invalid hash format</span>
            )}
          </label>
          <div className="relative">
            <input
              type="text"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              pattern="^0x[a-fA-F0-9]{64}$"
              placeholder="0x..."
              className="w-full px-4 py-3 rounded-lg bg-gray-800/70 text-white border border-gray-700/70 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent placeholder-gray-500 transition-all"
              required
            />
            {hash && (
              <button
                type="button"
                onClick={() => setHash("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !hash.match(/^0x[a-fA-F0-9]{64}$/)}
          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/30 flex items-center justify-center ${
            isLoading || !hash.match(/^0x[a-fA-F0-9]{64}$/) ? "opacity-70 cursor-not-allowed" : "hover:shadow-xl"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Inspect Transaction"
          )}
        </button>
      </div>
    </form>
  );
}
