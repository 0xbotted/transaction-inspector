# Transaction Inspector

Decode and explore Ethereum and EVM-compatible transaction calldata, logs, and events across multiple chains.  
Built with [Next.js](https://nextjs.org) and [Ethers.js](https://docs.ethers.org/).

---

## Features

- **Function Signature Matching** – Parses function selectors and shows matching signature(s)
- **Argument Decoding** – Displays calldata arguments clearly by type
- **Log & Event Decoding** – Recognizes common event topics (e.g. Transfer, Approval)
- **Multi-chain Support** – Decode transactions across several EVM-compatible chains
- **Built with Modern Stack** – Next.js App Router, Tailwind CSS, Geist fonts, and more
- **Ready for Vercel Deployment**

---

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Project Structure

- `app/` – App Router entrypoints (layout, pages, metadata)
- `components/` – UI components like `CalldataDetails`, `LogViewer`, etc.
- `lib/` – Helper functions (decoding, formatting, etc.)
- `types/` – Shared TypeScript types
- `styles/` – Global styles and Tailwind config

---

## Deploy on Vercel

Deploy instantly to [Vercel](https://vercel.com/new) for free:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or follow the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

## Built By

Created by [`0xbotted`](mailto:0xbotted@gmail.com)  
Open source contributions welcome!

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Geist Font](https://vercel.com/font)

---

## 📄 License

MIT

## TODO

- [ ] Add input validation and fallback error handling
- [ ] Integrate contract metadata (name, symbol, decimals where relevant)
- [ ] Support multiple call types (delegatecall, create, staticcall)
- [ ] Add search history using localStorage
- [ ] Copy/share permalink for decoded transaction
- [ ] Add dark mode toggle (currently default only)
- [ ] Add multi-chain routing support (`/[chainId]/tx/[txHash]`)
- [ ] Display contract address (CA) info (`/[chainId]/address/[contractAddress]`)
- [ ] Fetch verified contract ABIs from Sourcify or Blockscout
- [ ] Decode function calls across supported chains
- [ ] Parse and display contract metadata (ERC20, ERC721, ERC1155)
- [ ] Enhance UI for logs and event inspection
- [ ] Add search functionality for transaction hashes and addresses
- [ ] Optional: Add support for ENS / Lens / Farcaster names
