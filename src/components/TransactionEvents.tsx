import { JSX } from "react";
import { ethers } from "ethers";
import { ArrowLeftRight, Handshake, ArrowDown, Banknote, Flame } from "lucide-react";
import { motion } from "framer-motion";

type EventLog = ethers.Log & {
  _type?: "log";
};

interface EventDecoder {
  name: string;
  description: string;
  icon: JSX.Element;
  decode: (log: EventLog) => JSX.Element;
}

const DEFAULT_DECODER: EventDecoder = {
  name: "Contract Interaction",
  description: "An action was performed on a smart contract",
  icon: <Banknote className="h-4 w-4 text-gray-500" />,
  decode: (log) => (
    <div className="space-y-1">
      <p className="font-mono text-xs break-all">Data: {log.data || "No data"}</p>
      {log.topics?.slice(1).map((topic, i) => (
        <p key={i} className="font-mono text-xs break-all">
          Arg {i + 1}: {topic}
        </p>
      ))}
    </div>
  ),
};

const EVENT_DECODERS: Record<string, EventDecoder> = {
  // ERC-20 Transfer
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": {
    name: "Transfer",
    description: "Token transfer between addresses",
    icon: <ArrowLeftRight className="h-4 w-4 text-blue-500" />,
    decode: (log) => {
      const from = log.topics?.[1] ? `0x${log.topics[1].slice(26)}` : null;
      const to = log.topics?.[2] ? `0x${log.topics[2].slice(26)}` : null;
      const value = log.data !== "0x" ? BigInt(log.data).toString() : null;

      return (
        <div className="space-y-1">
          {from && (
            <p>
              <span className="font-medium">From:</span> <span className="font-mono text-xs">{from}</span>
            </p>
          )}
          {to && (
            <p>
              <span className="font-medium">To:</span> <span className="font-mono text-xs">{to}</span>
            </p>
          )}
          {value && (
            <p>
              <span className="font-medium">Amount:</span> <span className="font-mono text-xs">{value}</span>
            </p>
          )}
        </div>
      );
    },
  },

  // ERC-20 Approval
  "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925": {
    name: "Approval",
    description: "Token spending approval",
    icon: <Handshake className="h-4 w-4 text-green-500" />,
    decode: (log) => {
      const owner = log.topics?.[1] ? `0x${log.topics[1].slice(26)}` : null;
      const spender = log.topics?.[2] ? `0x${log.topics[2].slice(26)}` : null;
      const value = log.data !== "0x" ? BigInt(log.data).toString() : null;

      return (
        <div className="space-y-1">
          {owner && (
            <p>
              <span className="font-medium">Owner:</span> <span className="font-mono text-xs">{owner}</span>
            </p>
          )}
          {spender && (
            <p>
              <span className="font-medium">Spender:</span> <span className="font-mono text-xs">{spender}</span>
            </p>
          )}
          {value && (
            <p>
              <span className="font-medium">Amount:</span> <span className="font-mono text-xs">{value}</span>
            </p>
          )}
        </div>
      );
    },
  },

  // Custom Deposit Event
  "0x8752a472e571a816aea92eec8dae9baf628e840f4929fbcc2d155e6233ff68a7": {
    name: "Deposit",
    description: "Token deposit into contract",
    icon: <ArrowDown className="h-4 w-4 text-purple-500" />,
    decode: (log) => {
      const depositor = log.topics?.[1] ? `0x${log.topics[1].slice(26)}` : null;
      const tokenAddress = log.topics?.[2] ? `0x${log.topics[2].slice(26)}` : null;
      const amount = log.data !== "0x" ? BigInt(log.data).toString() : null;

      return (
        <div className="space-y-1">
          {depositor && (
            <p>
              <span className="font-medium">Depositor:</span> <span className="font-mono text-xs">{depositor}</span>
            </p>
          )}
          {tokenAddress && (
            <p>
              <span className="font-medium">Token:</span> <span className="font-mono text-xs">{tokenAddress}</span>
            </p>
          )}
          {amount && (
            <p>
              <span className="font-medium">Amount:</span> <span className="font-mono text-xs">{amount}</span>
            </p>
          )}
        </div>
      );
    },
  },

  // ERC-721/ERC-1155 ApprovalForAll
  "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31": {
    name: "ApprovalForAll",
    description: "Operator approval for all tokens",
    icon: <Handshake className="h-4 w-4 text-green-500" />,
    decode: (log) => {
      const owner = log.topics?.[1] ? `0x${log.topics[1].slice(26)}` : null;
      const operator = log.topics?.[2] ? `0x${log.topics[2].slice(26)}` : null;
      const approved = log.data !== "0x" ? (BigInt(log.data).toString() === "1" ? "Approved" : "Revoked") : null;

      return (
        <div className="space-y-1">
          {owner && (
            <p>
              <span className="font-medium">Owner:</span> <span className="font-mono text-xs">{owner}</span>
            </p>
          )}
          {operator && (
            <p>
              <span className="font-medium">Operator:</span> <span className="font-mono text-xs">{operator}</span>
            </p>
          )}
          {approved && (
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span className={approved === "Approved" ? "text-green-500" : "text-red-500"}>{approved}</span>
            </p>
          )}
        </div>
      );
    },
  },
};

interface TransactionEventsProps {
  logs: readonly EventLog[];
  className?: string;
}

export function TransactionEvents({ logs, className }: TransactionEventsProps) {
  if (!logs || logs.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800/95 rounded-xl overflow-hidden ${className}`}
    >
      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Flame className="h-5 w-5 text-blue-500" />
          Transaction Events
          <span className="ml-auto text-sm font-normal text-gray-500 dark:text-gray-400">
            {logs.length} event{logs.length !== 1 ? "s" : ""}
          </span>
        </h3>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {logs.map((log, idx) => {
          const decoder = log.topics?.[0] ? EVENT_DECODERS[log.topics[0]] || DEFAULT_DECODER : DEFAULT_DECODER;

          return (
            <div
              key={`${log.transactionHash}-${log.index}`}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{decoder.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-medium text-gray-900 dark:text-white truncate">{decoder.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">#{idx + 1}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{decoder.description}</p>
                  <div className="mt-2 text-sm">{decoder.decode(log)}</div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 break-all">Contract: {log.address}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
