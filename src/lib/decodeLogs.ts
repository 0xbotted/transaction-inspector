// utils/decodeLogs.ts

import { Log } from "ethers";
export const knownEvents: Record<string, string> = {
  // --- ERC Standards ---
  // ERC20 Transfer(address,address,uint256)
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": "Transfer",
  // ERC20 Approval(address,address,uint256)

  // ERC721 Transfer(address,address,uint256)
  // same as above
  // ERC721 Approval(address,address,uint256)
  "0x8c5be1e5ebec7d5bd14f714f8a63f636c7f8d16e6c3b2c2bd8a89c9e6f2e0b7b": "Approval",
  // ERC721 ApprovalForAll(address,operator,bool)

  // ERC1155 TransferSingle(operator, from, to, id, value)
  "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62": "TransferSingle",
  // ERC1155 TransferBatch(operator, from, to, ids, values)
  "0x4a39dc06d4c0dbc64b70bfa78d4d22674dbf6b63c6eebaea01aaf2f718a0a4db": "TransferBatch",
  // ERC1155 ApprovalForAll(owner, operator, approved)
  "0x17307eab39d49f6c7e7e4e5c4c2eea2f621a4907e0bbff1796c3f43f59b8d4c3": "ApprovalForAll",

  // --- Uniswap v2/v3 ---
  // Swap (v2/v3): indexed sender, indexed to, uint256 amount0In, uint256 amount1In, ...
  "0xd78ad95fa46c994b6551d0da85fc275fe613ce3dbd2aa5e3b8b60ff7fdd6efc7": "Swap",
  // Sync (reserves update)
  "0x1c411e9a96e3ea0b980b43f8c3be5e06d8f3d50fa3d7e3f8c9a2d50be9e84f6e": "Sync",
  // Mint
  "0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9": "Mint",
  // Burn
  "0x9e1c95dcd69f4fc85a4bb0461fc6c2ffdbcb9c86abec7760ef3a0db0f3f8fa12": "Burn",

  // --- OpenSea / Seaport ---
  // OrderFulfilled
  "0x9ebea88d9403de39ef9f2c1a3eb0bb999db53be8d2087579e294ae4a38fc9cdf": "Seaport OrderFulfilled",

  // --- ENS ---
  // NameRegistered
  "0x8f2839707b773bfa7f5e31cc069b48eb2c32f3948ec239b84b832b801cb0061a": "NameRegistered",
  // NameRenewed
  "0x70de46f9f39df60f7ce45d54e0d3e37f6b93c20421a1c6b4fcf688282ed2ce1e": "NameRenewed",

  // --- Aave ---
  // Deposit
  "0xe1fffcc4923d02f464cc4b44c02cbd4c50e3efb9e7381f6e5f9f0f62b6a5c11c": "Deposit",
  // Withdraw
  "0x00e2856c1c0e4d6f3a72f4c40254acdfbd6229f513d3e20dbb1f6be70f954926": "Withdraw",
  // Borrow
  "0xc6a898309e4d2820d6b077b5015d6c123be2246f0dbb660e5c8a40e6ae4a50c5": "Borrow",
  // Repay
  "0x99f5f52f6c3a03a3eac20443c667c30d33d5f7a6c658e1b45ce1eb15c66f2c5e": "Repay",

  // --- Compound ---
  // Mint
  "0x783cca1c0412dd0d695e784568c7d2295a20acbf7e0c0f85dce81dcd7e11caae": "Compound Mint",
  // Redeem
  "0xe5c5a17c4fdeeec4dc9f6ae2bc4f3d86e8b42862c69eddf2fe9547ab3d07b2d3": "Compound Redeem",

  // --- Curve ---
  // TokenExchange
  "0x8b8e35346ddf9c0a6ea3e8c17a21c4f27e9bd52d8c786bdb21f5da2211a8c24a": "Curve Exchange",

  // CUSTOM
  "0x2e8ac5177a616f2aec08c3048f5021e4e9743ece034e8d83ba5caf76688bb475": "TokensMinted",
  "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31": "ApprovalForAll",
};

export function decodeLog(log: Log): string {
  const eventSig = log.topics[0];
  if (!eventSig) return ``;
  const event = knownEvents[eventSig] ?? eventSig;
  const from = log.topics[1] ? `0x${log.topics[1].slice(26)}` : null;
  const to = log.topics[2] ? `0x${log.topics[2].slice(26)}` : null;

  if (event === "Transfer" && from && to) {
    const isMint = from.toLowerCase() === "0x0000000000000000000000000000000000000000";
    const tokenId = log.topics[3] ? BigInt(log.topics[3]).toString() : "?";

    return isMint ? `🟢 Minted Token #${tokenId} to ${to}` : `🔁 Transferred Token #${tokenId} from ${from} to ${to}`;
  }

  return `📦 ${event} log from ${log.address}`;
}
