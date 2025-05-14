import TxInspectorClient from "@/components/TxInspectorClient";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-900 to-gray-950 text-gray-100 px-4 py-10 flex flex-col items-center">
      {/* Background Glow / Frosted Effect */}
      <div className="absolute inset-0 z-0 backdrop-blur-md bg-white/5 pointer-events-none" />

      {/* Header */}
      <div className="z-10 text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-fade-in">
          Multi-Chain Tx Inspector
        </h1>
        <p className="text-sm text-gray-400 mt-2 animate-fade-in-slow">
          Decode calldata, view logs, and inspect transactions across EVM chains.
        </p>
      </div>

      {/* Card-like Frosted Container */}
      <div className="z-10 w-full max-w-3xl rounded-2xl shadow-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 space-y-6 animate-fade-in-up">
        <TxInspectorClient />
      </div>
    </main>
  );
}
