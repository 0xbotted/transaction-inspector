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