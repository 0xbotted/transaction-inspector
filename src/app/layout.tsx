import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CHAINS } from "@/lib/chains";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chains = Object.values(CHAINS).map((x) => x.name);

export const metadata: Metadata = {
  title: "Transaction Inspector",
  description:
    "Decode and explore transaction calldata, logs, events, and function signatures across multiple EVM-compatible chains.",
  keywords: [
    "Ethereum",
    "Calldata Decoder",
    "Transaction Inspector",
    "EVM",
    "Logs Viewer",
    "Function Selector",
    "Smart Contracts",
    "Multichain",
    ...chains,
  ],
  authors: [{ name: "noobest", url: "mailto:0xbotted@gmail.com" }],
  creator: "0xbotted",
  metadataBase: new URL("https://transaction-inspector.vercel.app"),
  openGraph: {
    title: "Transaction Inspector",
    description:
      "Decode any EVM-Compatiable Chain's transaction calldata, logs, selectors, and functions all in one UI.",
    url: "https://transaction-inspector.vercel.app",
    siteName: "Transaction Inspector",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transaction Inspector",
    description: "Explore and debug EVM transactions by decoding calldata, logs, and more.",
    creator: "@0xnovato",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="google-site-verification" content="HxozCDp6Wy3gCriMAJhVjBihNCAOGCIvWrdY-HVorMM" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
