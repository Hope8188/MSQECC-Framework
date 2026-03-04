import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Activity,
  Command,
  ChevronRight,
  User,
  Settings,
  Plus,
  Cpu,
  Lock
} from "lucide-react";
import { getLuminaStatus, processQuery } from "./ipc";
import type { LuminaStatus } from "./ipc";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import "./App.css";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Refined Sovereign Cursor ───
const SovereignCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center mix-blend-difference will-change-transform"
      style={{ marginLeft: '-10px', marginTop: '-10px' }}
    >
      <div className="w-[4px] h-[4px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      <div className="absolute w-[24px] h-[24px] border border-white/30 rounded-full" />
    </div>
  );
};

// ─── Subtle Resonance Orb ───
const ResonanceOrb = () => (
  <div className="relative flex items-center justify-center h-48 w-48 mx-auto my-12 pointer-events-none">
    <motion.div
      animate={{
        scale: [1, 1.02, 1],
        opacity: [0.3, 0.4, 0.3],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-violet-500/20 blur-3xl"
    />
    <div className="absolute h-24 w-24 rounded-full border border-white/5 backdrop-blur-2xl flex items-center justify-center shadow-2xl bg-white/[0.01]">
      <Zap size={24} className="text-white/80" />
    </div>
  </div>
);

export default function App() {
  const [status, setStatus] = useState<LuminaStatus | null>(null);
  const [messages, setMessages] = useState<{ id: string, role: string, content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'HUB' | 'MORPH'>('HUB');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.cursor = 'none';
    const poll = async () => {
      try {
        const s = await getLuminaStatus();
        setStatus(s);
      } catch (e) {
        console.error("IPC Sync Error", e);
      }
    };
    poll();
    const interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;
    const userMsg = { id: Math.random().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsProcessing(true);
    try {
      const res = await processQuery(input);
      setMessages(prev => [...prev, { id: Math.random().toString(), role: "lumina", content: res }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: Math.random().toString(), role: "lumina", content: "AI module offline or unreachable." }]);
    }
    setIsProcessing(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#030303] text-white font-sans selection:bg-white/20 selection:text-white flex">
      <SovereignCursor />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ─── Left Sidebar: Navigation & Identity ─── */}
      <aside className="w-[280px] h-full border-r border-white/5 bg-white/[0.01] backdrop-blur-xl flex flex-col drag-region relative z-20">
        <div className="p-8 pb-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shadow-lg">
            <Command size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight">Lumina</h1>
            <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mt-0.5">Sovereign OS</p>
          </div>
        </div>

        <div className="px-6 py-4 flex-1 flex flex-col gap-2 no-drag">
          <button
            onClick={() => setActiveTab('HUB')}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-all cursor-none", activeTab === 'HUB' ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5")}
          >
            <Activity size={16} /> Neural Hub
          </button>
          <button
            onClick={() => setActiveTab('MORPH')}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-all cursor-none", activeTab === 'MORPH' ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5")}
          >
            <Cpu size={16} /> Isomorphic Apps
          </button>
        </div>

        {/* Status Mini-Panel */}
        <div className="p-6 no-drag">
          <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/5 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Shield Status</span>
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-medium text-white/80">Telemetry Ext.</span>
                <span className="text-[10px] font-mono text-white/50">0.00%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full">
                <div className="h-full bg-cyan-400 w-[0%] rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0 flex gap-4 no-drag border-t border-white/5 mt-4 text-white/40">
          <button className="p-2 hover:text-white transition-colors cursor-none"><User size={16} /></button>
          <button className="p-2 hover:text-white transition-colors cursor-none"><Settings size={16} /></button>
        </div>
      </aside>

      {/* ─── Main Content Area ─── */}
      <main className="flex-1 h-full flex flex-col relative z-20 no-drag">
        <header className="h-[88px] flex items-center justify-between px-10 border-b border-white/5 shrink-0 drag-region">
          <div className="flex items-center gap-3">
            {activeTab === 'HUB' && <><Activity size={18} className="text-white/40" /><h2 className="text-sm font-medium">Neural Hub</h2></>}
            {activeTab === 'MORPH' && <><Cpu size={18} className="text-white/40" /><h2 className="text-sm font-medium">App Sandbox</h2></>}
          </div>
          <div className="flex items-center gap-4 text-white/40 text-xs font-mono">
            {status ? (
              <span className="flex items-center gap-2"><Lock size={14} className="text-green-400" /> RING-0 SECURE</span>
            ) : (
              <span className="animate-pulse">Awaiting Sync...</span>
            )}
          </div>
        </header>

        <section className="flex-1 overflow-hidden relative flex flex-col">
          <AnimatePresence mode="wait">
            {activeTab === 'HUB' ? (
              <motion.div
                key="hub"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col h-full"
              >
                <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-10 py-10 flex flex-col gap-8 custom-scrollbar">
                  {messages.length === 0 && (
                    <div className="my-auto flex flex-col items-center text-center opacity-60">
                      <ResonanceOrb />
                      <h3 className="text-lg font-medium tracking-tight text-white mb-2">Welcome to Lumina OS</h3>
                      <p className="text-sm text-white/50 max-w-sm leading-relaxed">System is sovereign. Telemetry extraction blocked. How can I assist you with your isolated workspace today?</p>
                    </div>
                  )}
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn("flex max-w-[80%]", msg.role === 'user' ? "ml-auto" : "mr-auto")}
                    >
                      <div className={cn(
                        "p-5 rounded-2xl text-[14px] leading-relaxed relative",
                        msg.role === 'user'
                          ? "bg-white text-black font-medium"
                          : "bg-white/5 border border-white/10 text-white/90 shadow-2xl backdrop-blur-md"
                      )}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isProcessing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex max-w-[80%] mr-auto">
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse delay-75" />
                        <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse delay-150" />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Refined Input Bar */}
                <div className="p-8 pt-0 w-full max-w-4xl mx-auto">
                  <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-[20px] p-2 focus-within:border-white/30 transition-all shadow-2xl backdrop-blur-xl group">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Initialize protocol..."
                      className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-sm text-white placeholder:text-white/30"
                    />
                    <button
                      onClick={handleSend}
                      className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-black rounded-xl transition-all cursor-none"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="morph"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex-1 p-12 overflow-y-auto"
              >
                <div className="max-w-5xl mx-auto">
                  <header className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-3">Isomorphic Sandbox</h2>
                    <p className="text-white/50 text-sm">Deploy external applications natively inside Lumina's zero-telemetry environment. Data extraction calls are silently dropped at the hardware level.</p>
                  </header>
                  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div className="aspect-[4/3] rounded-2xl border border-dashed border-white/20 hover:border-white/50 hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-3 cursor-none text-white/40 hover:text-white">
                      <Plus size={24} />
                      <span className="text-xs font-medium">Add Application</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
