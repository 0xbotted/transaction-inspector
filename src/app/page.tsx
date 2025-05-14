import TxInspectorClient from "@/components/TxInspectorClient";

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100 relative">
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Multi-Chain Tx Inspector
      </h1>

      <TxInspectorClient />
    </main>
  );
}
