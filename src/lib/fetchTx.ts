import { ethers } from "ethers";
import { CHAINS } from "./chains";
import { ChainKey, TxDataResponse } from "@/@types";

export async function fetchTxData(txHash: string, chainKey: ChainKey): Promise<TxDataResponse> {
  const chain = CHAINS[chainKey];
  const provider = new ethers.JsonRpcProvider(chain.rpcUrls[0]);
  const tx = await provider.getTransaction(txHash);
  const receipt = await provider.getTransactionReceipt(txHash);
  return { tx, receipt, chain };
}
