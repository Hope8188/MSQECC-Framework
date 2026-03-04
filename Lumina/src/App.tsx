import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import {
  Zap,
  Activity,
  Command,
  ChevronRight,
  ShieldCheck,
  User,
  Settings,
  Plus
} from "lucide-react";
import { getLuminaStatus, processQuery } from "./ipc";
import type { LuminaStatus } from "./ipc";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import "./App.css";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Digital Mercury Orb - The heart of Liquid Sovereignty
const LuminaOrb = () => {
  return (
    <div className="relative group">
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00f3ff]/20 to-[#a78bfa]/20 blur-3xl opacity-50 transition-opacity group-hover:opacity-100"
      />
      <div className="relative h-48 w-48 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-3xl bg-white/[0.02]">
        <motion.div
          animate={{
            borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "30% 60% 70% 40% / 50% 60% 30% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="h-32 w-32 bg-gradient-to-br from-[#00f3ff] to-[#a78bfa] blur-2xl opacity-40 shadow-[0_0_50px_rgba(0,243,255,0.3)]"
        />
        <Zap size={40} className="text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </div>
    </div>
  );
};

export default function App() {
  const [status, setStatus] = useState<LuminaStatus | null>(null);
  const [messages, setMessages] = useState<{ id: string, role: string, content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'HUB' | 'MORPH'>('HUB');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 600, damping: 30 });
  const cursorY = useSpring(mouseY, { stiffness: 600, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
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

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;
    const userMsg = { id: Math.random().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsProcessing(true);
    const res = await processQuery(input);
    setMessages(prev => [...prev, { id: Math.random().toString(), role: "lumina", content: res }]);
    setIsProcessing(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050505] font-sans selection:bg-[#00f3ff]/30 selection:text-[#00f3ff]">
      {/* Noise Grain Texturing */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Sovereign Custom Cursor */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 z-[100] h-6 w-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[#00f3ff] shadow-[0_0_15px_#00f3ff]" />
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute h-full w-full rounded-full border border-[#00f3ff]"
        />
      </motion.div>

      {/* Navigation - Lunar Glass */}
      <nav className="drag-region relative z-50 flex items-center justify-between px-10 py-8 backdrop-blur-2xl border-b border-white/[0.04]">
        <div className="flex items-center gap-5">
          <div className="h-10 w-10 overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group hover:border-[#00f3ff]/50 transition-colors">
            <Zap size={18} className="text-[#00f3ff] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold tracking-tight text-white">Lumina Horizon</h1>
            <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-white/30 leading-none mt-1">Sovereign OS</span>
          </div>
        </div>

        <div className="no-drag flex items-center gap-8">
          <div className="flex bg-white/[0.03] p-1 rounded-2xl border border-white/[0.06]">
            <button
              onClick={() => setActiveTab('HUB')}
              className={cn("px-5 py-2 rounded-xl text-[11px] font-bold transition-all", activeTab === 'HUB' ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white")}
            >
              HUB
            </button>
            <button
              onClick={() => setActiveTab('MORPH')}
              className={cn("px-5 py-2 rounded-xl text-[11px] font-bold transition-all", activeTab === 'MORPH' ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white")}
            >
              MORPH
            </button>
          </div>
          <div className="h-8 w-[1px] bg-white/5" />
          <div className="flex items-center gap-4">
            <button className="text-white/30 hover:text-white transition-colors cursor-none"><User size={20} /></button>
            <button className="text-white/30 hover:text-white transition-colors cursor-none"><Settings size={20} /></button>
          </div>
        </div>
      </nav>

      {/* Main Orchestration Container */}
      <main className="relative z-10 flex h-[calc(100vh-100px)] w-full p-10 gap-10">

        {/* Left Control Plane: Vitals */}
        <section className="flex w-[380px] flex-col gap-10">
          <div className="rounded-[40px] p-8 bg-white/[0.01] border border-white/[0.05] backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity size={120} />
            </div>

            <header className="flex items-center justify-between mb-12">
              <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-white/40">System Vitals</span>
              <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Coherent</span>
              </div>
            </header>

            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[13px] font-medium text-white/60">Liquid Optimization</span>
                  <span className="text-2xl font-geist font-bold text-white tracking-tighter">{status?.hardware.cpu_usage_percent.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${status?.hardware.cpu_usage_percent}%` }}
                    className="h-full bg-gradient-to-r from-[#00f3ff] to-[#a78bfa] shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <span className="text-[13px] font-medium text-white/60 block">Privacy Health</span>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-4 rounded-3xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all cursor-none group">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={18} className="text-[#00f3ff]" />
                      <span className="text-[11px] font-mono text-white/80 uppercase tracking-widest">Seal Stage 4</span>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                  </div>
                  <p className="text-[10px] text-white/20 italic pl-2">Topological parity established across all MKI layers.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-[40px] p-8 bg-gradient-to-b from-white/[0.01] to-transparent border border-white/[0.03] flex flex-col items-center justify-center gap-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-[#a78bfa]/5 blur-[100px] pointer-events-none" />
            <LuminaOrb />
            <div className="text-center z-10">
              <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-white/20 mb-2">Neural Link Active</h2>
              <p className="max-w-[180px] text-[10px] text-white/10 mx-auto">Observing hand-tremor resonances for pre-cognitive navigation.</p>
            </div>
          </div>
        </section>

        {/* Right Execution Plane: Intelligence */}
        <section className="flex-1 flex flex-col gap-10">
          <div className="flex-1 rounded-[48px] bg-white/[0.005] border border-white/[0.03] overflow-hidden relative flex flex-col shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">

            <AnimatePresence mode="wait">
              {activeTab === 'HUB' ? (
                <motion.div
                  key="hub"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex-1 flex flex-col p-10"
                >
                  <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-10">
                    {messages.length === 0 && (
                      <div className="flex-1 flex flex-col items-center justify-center gap-10 opacity-30">
                        <div className="h-32 w-32 rounded-full border-2 border-dashed border-[#00f3ff]/10 flex items-center justify-center animate-spin-slow">
                          <Command size={48} className="text-[#00f3ff]" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-[13px] font-bold uppercase tracking-[0.6em] text-white">Awaiting Synapse</p>
                          <p className="text-[10px] text-white/40 font-medium">Command: "Optimize local memory usage"</p>
                        </div>
                      </div>
                    )}

                    {messages.map(msg => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        key={msg.id}
                        className={cn("flex flex-col gap-3 max-w-[85%]", msg.role === 'user' ? "ml-auto items-end" : "items-start")}
                      >
                        <div className={cn(
                          "px-8 py-5 rounded-[32px] text-[14px] leading-relaxed shadow-2xl relative",
                          msg.role === 'user' ? "bg-white text-black font-semibold" : "glass-panel text-white/90"
                        )}>
                          {msg.content}
                          {msg.role === 'lumina' && <div className="absolute top-1/2 -left-12 -translate-y-1/2 h-8 w-8 rounded-full border border-[#00f3ff]/20 bg-[#00f3ff]/5 flex items-center justify-center"><Zap size={12} className="text-[#00f3ff]" /></div>}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* High-Fidelity Interaction Bar */}
                  <div className="pt-10">
                    <div className="flex items-center gap-6 p-2 pl-8 pr-2 rounded-[32px] bg-white/[0.04] border border-white/[0.08] focus-within:border-[#00f3ff]/50 focus-within:bg-white/[0.06] transition-all shadow-4xl backdrop-blur-3xl">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Define your horizon..."
                        className="flex-1 bg-transparent py-5 text-sm font-medium text-white placeholder:text-white/20 outline-none"
                      />
                      <button
                        onClick={handleSend}
                        className="h-14 w-14 flex items-center justify-center rounded-[24px] bg-white text-black hover:bg-[#00f3ff] transition-all active:scale-95 cursor-none group"
                      >
                        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="morph"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="flex-1 p-16 grid grid-cols-2 lg:grid-cols-3 gap-10 overflow-y-auto no-scrollbar"
                >
                  <div className="aspect-square rounded-[40px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-[#00f3ff]/30 hover:bg-white/[0.01] transition-all cursor-none group">
                    <Plus size={32} className="text-white/20 group-hover:text-[#00f3ff] transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 group-hover:text-white transition-colors">App Morph</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}
