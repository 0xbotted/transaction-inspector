import { TransactionReceipt } from "ethers";
import { TransactionResponse } from "ethers";

export interface ChainProps {
  name: string;
  chainId: number;
  tokenSymbol: string;
  rpcUrls: string[];
  explorerUrl: string;
  nativeCurrency: string;
  txUrl: string;
  disperseCA: string;
  fullBlockNotAllowed?: boolean;
  rateLimitPerS?: number;
}

export type ChainType<T extends string> = {
  [K in T]: ChainProps;
};

export type ChainKey =
  | "MON_T"
  | "SONENIUM"
  | "VICTION"
  | "TIA"
  | "APE"
  | "ABSTRACT"
  | "BASE"
  | "ARBITRUM_ONE"
  | "BASE_SEPOLIA"
  | "MEGA_ETH_TESTNET"
  | "FLUENT_TESTNET"
  | "BERA"
  | "ETHEREUM"
  | "POLYGON"
  | "BSC"
  | "AVALANCHE"
  | "FANTOM"
  | "OPTIMISM"
  | "GNOSIS"
  | "ZKSYNC"
  | "LINEA"
  | "SCROLL"
  | "ETHEREUM_SEPOLIA"
  | "SOMNIA_TESTNET";

type txInfo = TransactionResponse | null;

// Add to your existing @/types
export interface ContractInfo {
  address: string;
  name: string | null;
  isContract: boolean;
  tokenSymbol?: string | null;
}

export interface FunctionArg {
  type: string;
  value: string;
}

export interface FunctionInfo {
  selector: string;
  name: string | null;
  args: FunctionArg[] | null;
}

export interface EnhancedTxDataResponse {
  tx: ethers.TransactionResponse | null;
  receipt: ethers.TransactionReceipt | null;
  chain: ChainProps;
  contractInfo: ContractInfo | null;
  functionInfo: FunctionInfo | null;
}
interface TxDataResponse {
  tx: txInfo;
  receipt: TransactionReceipt | null;
  chain: ChainProps;
}

// Function signatures from 4byte.directory
export interface FunctionSignature {
  name: string;
  text: string;
  bytes: string;
}

export interface ITxInfo {
  tx: TransactionResponse;
  receipt: TransactionReceipt | null;
  chain: ChainProps;
  selector: string;
  args: string[];
  funcSigs: string[];
}
