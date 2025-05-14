import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CHAINS } from "@/lib/chains";
import { CONFIG } from "@/config";

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
  title: CONFIG.APP_NAME,
  description:
    "Decode and explore transaction calldata, logs, events, and function signatures across multiple EVM-compatible chains.",
  keywords: [
    "Ethereum",
    "Calldata Decoder",
    CONFIG.APP_NAME,
    "EVM",
    "Logs Viewer",
    "Function Selector",
    "Smart Contracts",
    "Multichain",
    ...chains,
  ],
  authors: [{ name: "noobest", url: "mailto:0xbotted@gmail.com" }],
  creator: "0xbotted",
  metadataBase: new URL(CONFIG.BASE_URL),
  openGraph: {
    title: CONFIG.APP_NAME,
    description:
      "Decode any EVM-Compatiable Chain's transaction calldata, logs, selectors, and functions all in one UI.",
    url: CONFIG.BASE_URL,
    siteName: CONFIG.APP_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: CONFIG.APP_NAME,
    description: "Explore and debug EVM transactions by decoding calldata, logs, and more.",
    creator: "@0xnovato",
  },
  verification: {
    google: "HxozCDp6Wy3gCriMAJhVjBihNCAOGCIvWrdY-HVorMM",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="HxozCDp6Wy3gCriMAJhVjBihNCAOGCIvWrdY-HVorMM" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
