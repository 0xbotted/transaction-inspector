import TxInspectorClient from "@/components/TxInspectorClient";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-gray-100 px-4 py-12 sm:py-16 flex flex-col items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-fuchsia-500/10 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Frosted Glass Overlay */}
      <div className="absolute inset-0 z-0 backdrop-blur-sm bg-gradient-to-br from-slate-900/80 to-gray-950/80 pointer-events-none" />

      {/* Header */}
      <header className="z-10 text-center mb-12 px-4 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 text-center text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-500 bg-clip-text drop-shadow-lg leading-tight">
          Multi-Chain Transaction Inspector
        </h1>
        <p className="text-center text-gray-300/90 text-sm sm:text-base max-w-2xl mx-auto">
          Decode calldata, analyze logs, and inspect transactions across multiple EVM-compatible blockchains with
          real-time insights.
        </p>
      </header>

      {/* Main Card Container */}
      <div className="z-10 w-full max-w-4xl rounded-2xl shadow-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] backdrop-blur-2xl p-6 md:p-8 space-y-6 transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-400/30">
        <div className="absolute -top-px left-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <TxInspectorClient />
      </div>

      {/* Footer */}
      <footer className="z-10 mt-12 text-center text-xs text-gray-400/60">
        <p>Securely analyze transactions without compromising your wallet</p>
      </footer>
    </main>
  );
}
