import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    MeshDistortMaterial,
    PerspectiveCamera,
} from "@react-three/drei";
import Lenis from "lenis";
import {
    ArrowRight,
    Download,
    Cpu,
    Lock,
    Server,
    Smartphone,
    Monitor,
    Shield,
    Flame,
    Binary,
    Globe,
    FileText,
    CheckCircle,
    Upload,
    ChevronRight
} from "lucide-react";
import * as THREE from "three";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from "react-router-dom";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ──────────────────────────────────────────────────────────────
// 3D Torus Background Mesh
// ──────────────────────────────────────────────────────────────
const HorizonTorus = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { scrollYProgress } = useScroll();
    const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 6]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.6]);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.y = rotationY.get() + state.clock.getElapsedTime() * 0.1;
        meshRef.current.scale.setScalar(scale.get());
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[10, 3, 256, 32]} />
            <MeshDistortMaterial
                color="#00f3ff"
                emissive="#a78bfa"
                emissiveIntensity={0.5}
                speed={2}
                distort={0.4}
                roughness={0.1}
                metalness={1}
            />
        </mesh>
    );
};

// ──────────────────────────────────────────────────────────────
// Sovereign Cursor
// ──────────────────────────────────────────────────────────────
const SovereignCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };
        window.addEventListener("mousemove", move, { passive: true });
        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 -ml-2.5 -mt-2.5 w-5 h-5 rounded-full border border-[rgba(0,243,255,0.5)] pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference will-change-transform"
        >
            <div className="w-[3px] h-[3px] bg-[#00f3ff] rounded-full shadow-[0_0_8px_#00f3ff]" />
        </div>
    );
};

// ──────────────────────────────────────────────────────────────
// Reveal Animation
// ──────────────────────────────────────────────────────────────
const LiquidReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
        {children}
    </motion.div>
);

// ──────────────────────────────────────────────────────────────
// Section: Why Choose Us
// ──────────────────────────────────────────────────────────────
const WhyChooseUsSection = () => (
    <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 w-full">
        <LiquidReveal>
            <div className="mb-20 flex flex-col lg:flex-row justify-between items-end gap-10">
                <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter max-w-2xl leading-[0.85]">
                    WHY <span style={{ color: "#00f3ff" }}>CHOOSE</span> LUMINA?
                </h2>
                <p className="max-w-md text-white/40 uppercase tracking-widest text-xs md:text-sm leading-relaxed mb-6">
                    LEGACY OS WERE BUILT TO EXTRACT. WE WERE BUILT TO SHIELD. ZERO-TELEMETRY STACK AT RING-0.
                </p>
            </div>
        </LiquidReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
                { title: "Absolute Zero", icon: <Lock size={24} />, desc: "0.00KB of telemetry egress. Guaranteed by cryptographic audits at the hardware layer." },
                { title: "Sovereign Speed", icon: <Flame size={24} />, desc: "40% faster than typical kernels by removing background extraction protocol overhead." },
                { title: "Cognitive Clarity", icon: <Binary size={24} />, desc: "Live H-Neuron suppression eliminates hallucinations at the microscopic logic tier via MSQECC." }
            ].map((item, i) => (
                <LiquidReveal key={i} delay={i * 0.12}>
                    <div
                        className="p-10 md:p-12 rounded-[40px] border border-white/5 hover:border-[#00f3ff]/20 transition-all min-h-[380px] flex flex-col justify-between group cursor-none"
                        style={{ background: "rgba(255,255,255,0.01)", backdropFilter: "blur(40px)" }}
                    >
                        <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center transition-all group-hover:bg-[#00f3ff] group-hover:text-black group-hover:border-[#00f3ff]"
                            style={{ color: "#00f3ff" }}>
                            {item.icon}
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-2xl md:text-3xl font-bold">{item.title}</h4>
                            <p className="text-white/40 text-sm leading-relaxed uppercase tracking-wider">{item.desc}</p>
                        </div>
                    </div>
                </LiquidReveal>
            ))}
        </div>
    </section>
);

// ──────────────────────────────────────────────────────────────
// Section: Proof
// ──────────────────────────────────────────────────────────────
const ProofSection = () => (
    <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto w-full border-t border-white/5 flex flex-col items-center">
        <LiquidReveal>
            <div className="text-center mb-20">
                <h2 className="text-5xl md:text-7xl lg:text-9xl font-black mb-4 tracking-tighter">
                    THE <span style={{ color: "#00f3ff" }}>PROOF.</span>
                </h2>
                <p className="text-white/40 uppercase tracking-widest font-serif italic text-lg md:text-2xl">Lumina AI [MSQECC] vs. Legacy Tech</p>
            </div>
        </LiquidReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full mb-24">
            <LiquidReveal>
                <div className="p-8 lg:p-12 rounded-[40px] border border-white/5 space-y-8 relative overflow-hidden group"
                    style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(40px)" }}>
                    <div className="absolute inset-0 bg-red-500/[0.02] group-hover:bg-red-500/[0.04] transition-colors pointer-events-none" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl border border-red-500/20 flex items-center justify-center text-red-500"><Monitor size={18} /></div>
                        <h4 className="text-lg font-bold uppercase tracking-widest text-white/50">Other Platforms</h4>
                    </div>
                    <div className="space-y-5 relative z-10">
                        {[
                            { label: "Background Telemetry", val: 85 },
                            { label: "Extraction Latency", val: 72 },
                            { label: "User Sovereignty", val: 5 },
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-[10px] uppercase font-bold text-white/40">
                                    <span>{stat.label}</span>
                                    <span className="text-red-500/70">{stat.val}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${stat.val}%` }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        className="h-full bg-red-500/40 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </LiquidReveal>

            <LiquidReveal delay={0.15}>
                <div className="p-8 lg:p-12 rounded-[40px] border space-y-8"
                    style={{ borderColor: "rgba(0,243,255,0.2)", background: "rgba(0,243,255,0.02)", backdropFilter: "blur(40px)" }}>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ border: "1px solid rgba(0,243,255,0.2)", boxShadow: "0 0 16px rgba(0,243,255,0.15)", color: "#00f3ff" }}>
                            <Shield size={18} />
                        </div>
                        <h4 className="text-lg font-bold uppercase tracking-widest text-white">Lumina AI Core</h4>
                    </div>
                    <div className="space-y-5">
                        {[
                            { label: "Background Telemetry", val: 0 },
                            { label: "Extraction Latency", val: 0 },
                            { label: "User Sovereignty", val: 100 },
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-[10px] uppercase font-bold" style={{ color: "#00f3ff" }}>
                                    <span>{stat.label}</span>
                                    <span>{stat.val}% {stat.val === 100 ? "Protected" : "Exfiltrated"}</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${stat.val}%` }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        className="h-full rounded-full"
                                        style={{ background: "#00f3ff", boxShadow: "0 0 8px rgba(0,243,255,0.6)" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </LiquidReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            <LiquidReveal>
                <div className="space-y-10">
                    {[
                        { icon: <Globe size={22} />, title: "Vs. Tech Giants", desc: "They treat your data as corporate assets. We treat it as sovereign property protected at Ring-0." },
                        { icon: <Cpu size={22} />, title: "Vs. Generic OS", desc: "While some are open-source, they lack cohesive protection. We engineer tracking resistance into the HAL." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-5 items-start">
                            <div className="shrink-0 p-3 rounded-2xl border border-white/10"
                                style={{ background: "rgba(255,255,255,0.01)", backdropFilter: "blur(40px)", color: "#00f3ff" }}>
                                {item.icon}
                            </div>
                            <div>
                                <h5 className="text-xl font-bold mb-2">{item.title}</h5>
                                <p className="text-white/40 text-sm leading-relaxed uppercase tracking-wider">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </LiquidReveal>
            <LiquidReveal delay={0.15}>
                <div className="p-10 md:p-12 rounded-[40px] flex flex-col justify-between min-h-[320px] relative overflow-hidden border border-white/10"
                    style={{ background: "#050505" }}>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(0,243,255,0.03)" }} />
                    <div className="relative z-10 space-y-7">
                        <h5 className="text-3xl md:text-4xl font-black tracking-tighter text-white">THE VERDICT.</h5>
                        <p className="font-serif italic text-base md:text-lg leading-relaxed text-white/70">
                            "Lumina AI doesn't just block tracking; it renders tracking technologically impossible at the hardware abstraction level through MSQECC."
                        </p>
                        <Link
                            to="/portal"
                            className="inline-block px-7 py-3.5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all cursor-none w-max"
                        >
                            Switch to Sovereignty
                        </Link>
                    </div>
                </div>
            </LiquidReveal>
        </div>
    </section>
);

// ──────────────────────────────────────────────────────────────
// Section: Research Papers List
// ──────────────────────────────────────────────────────────────
const ResearchSection = () => (
    <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 w-full" id="research">
        <LiquidReveal>
            <div className="mb-16 text-center">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                    THE <span style={{ color: "#a78bfa" }}>RESEARCH.</span>
                </h2>
                <p className="text-white/40 uppercase tracking-widest text-sm">Sovereign Architecture Whitepapers</p>
            </div>
        </LiquidReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
                { id: "1", title: "Zero-Telemetry Runtime Isolation", date: "Vol I." },
                { id: "2", title: "Hardware-Level Cryptographic Sandboxing", date: "Vol II." },
                { id: "3", title: "Syndrome Sealing: An Analysis", date: "Vol III." },
                { id: "4", title: "Isomorphic App Compilation", date: "Vol IV." },
                { id: "5", title: "H-Neuron Suppression", date: "Vol V." },
            ].map((paper, i) => (
                <LiquidReveal key={i} delay={i * 0.08}>
                    <Link
                        to={`/paper/${paper.id}`}
                        className="p-7 rounded-3xl border border-white/5 hover:border-[#a78bfa]/40 transition-all flex items-center justify-between group cursor-none"
                        style={{ background: "rgba(255,255,255,0.01)", backdropFilter: "blur(20px)" }}
                    >
                        <div className="flex items-center gap-5">
                            <FileText size={20} className="shrink-0 transition-colors text-white/20 group-hover:text-[#a78bfa]" />
                            <div>
                                <h4 className="font-bold text-base md:text-lg text-white">{paper.title}</h4>
                                <span className="text-[10px] text-white/40 uppercase tracking-widest group-hover:text-[#a78bfa]/80 transition-colors">{paper.date}</span>
                            </div>
                        </div>
                        <ArrowRight size={18} className="text-white/20 group-hover:text-white group-hover:translate-x-1.5 transition-all shrink-0 ml-4" />
                    </Link>
                </LiquidReveal>
            ))}
        </div>
    </section>
);

// ──────────────────────────────────────────────────────────────
// Section: App Showcase
// ──────────────────────────────────────────────────────────────
const AppShowcaseSection = () => {
    const [activeDemo, setActiveDemo] = React.useState<"HUB" | "MORPH" | "VITALS">("HUB");
    return (
        <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto w-full border-t border-white/5" id="app">
            <LiquidReveal>
                <div className="mb-16 flex flex-col lg:flex-row justify-between items-end gap-8">
                    <div>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
                            THE <span style={{ color: "#00f3ff" }}>APP.</span>
                        </h2>
                        <p className="text-white/40 uppercase tracking-widest text-sm mt-4 max-w-xs">
                            Sovereign runtime. Live on your device.
                        </p>
                    </div>
                    <Link to="/portal"
                        className="shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full border font-black text-[10px] uppercase tracking-[0.4em] transition-all cursor-none"
                        style={{ borderColor: "rgba(0,243,255,0.3)", color: "#00f3ff", background: "rgba(0,243,255,0.04)" }}>
                        <Download size={14} />
                        Download for Windows
                    </Link>
                </div>
            </LiquidReveal>

            <LiquidReveal delay={0.1}>
                {/* App Window Mockup */}
                <div className="w-full rounded-[32px] overflow-hidden border border-white/8 shadow-2xl"
                    style={{ background: "#030303", boxShadow: "0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)" }}>

                    {/* Title bar */}
                    <div className="h-10 flex items-center px-5 border-b border-white/5 justify-between"
                        style={{ background: "rgba(0,0,0,0.7)" }}>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-white/10" />
                            <div className="w-3 h-3 rounded-full bg-white/10" />
                            <div className="w-3 h-3 rounded-full bg-white/10" />
                        </div>
                        <span className="text-[9px] font-mono text-white/20 tracking-widest">LUMINA AI · COGNITIVE OS [MSQECC]</span>
                        <div className="w-16" />
                    </div>

                    {/* App Body */}
                    <div className="flex h-[480px] md:h-[560px]">
                        {/* Sidebar */}
                        <div className="w-[200px] border-r border-white/5 flex flex-col shrink-0"
                            style={{ background: "rgba(255,255,255,0.01)" }}>
                            <div className="p-5 flex items-center gap-2.5 border-b border-white/5">
                                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                                    <Lock size={11} className="text-white/60" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold">Lumina</p>
                                    <p className="text-[7px] text-white/30 tracking-widest uppercase">Sovereign OS</p>
                                </div>
                            </div>
                            <div className="p-3 flex flex-col gap-1 flex-1">
                                {(["HUB", "MORPH", "VITALS"] as const).map(tab => (
                                    <button key={tab} onClick={() => setActiveDemo(tab)}
                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-semibold transition-all cursor-none text-left"
                                        style={activeDemo === tab
                                            ? { background: "rgba(255,255,255,0.07)", color: tab === "HUB" ? "#00f3ff" : tab === "MORPH" ? "#a78bfa" : "#4ade80" }
                                            : { color: "rgba(255,255,255,0.3)" }}>
                                        {tab === "HUB" ? "⚡ Neural Hub" : tab === "MORPH" ? "⬡ Isomorphic Apps" : "◎ System Vitals"}
                                    </button>
                                ))}
                            </div>
                            {/* Status panel */}
                            <div className="p-3 border-t border-white/5">
                                <div className="p-3 rounded-xl border border-white/5 space-y-2.5"
                                    style={{ background: "rgba(0,0,0,0.4)" }}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[7px] text-white/25 uppercase tracking-widest">Live Status</span>
                                        <div className="flex items-center gap-1">
                                            <div className="w-1 h-1 rounded-full bg-green-400" />
                                            <span className="text-[7px]" style={{ color: "#00f3ff" }}>Sealed</span>
                                        </div>
                                    </div>
                                    {[{ label: "CPU", val: 14, color: "#00f3ff" }, { label: "RAM", val: 32, color: "#a78bfa" }].map(s => (
                                        <div key={s.label} className="space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-[7px] text-white/25">{s.label}</span>
                                                <span className="text-[7px] font-mono" style={{ color: s.color }}>{s.val}%</span>
                                            </div>
                                            <div className="h-[2px] rounded-full bg-white/5">
                                                <div className="h-full rounded-full" style={{ width: `${s.val}%`, background: s.color }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main demo area */}
                        <div className="flex-1 flex flex-col">
                            {/* Header */}
                            <div className="h-10 border-b border-white/5 flex items-center justify-between px-5"
                                style={{ background: "rgba(0,0,0,0.2)" }}>
                                <span className="text-[10px] font-semibold text-white/60">
                                    {activeDemo === "HUB" ? "⚡ Neural Hub" : activeDemo === "MORPH" ? "⬡ Isomorphic Apps" : "◎ System Vitals"}
                                </span>
                                <div className="flex items-center gap-2 text-[8px] font-mono text-white/25">
                                    <Lock size={8} className="text-green-400" /> RING-0 SECURE · OFFLINE SOVEREIGN
                                </div>
                            </div>

                            {/* Tab content */}
                            <AnimatePresence mode="wait">
                                {activeDemo === "HUB" && (
                                    <motion.div key="hub-demo" className="flex-1 flex flex-col p-5"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <div className="flex-1 flex flex-col gap-3 justify-end">
                                            <div className="ml-auto max-w-[60%] px-4 py-2.5 bg-white text-black rounded-2xl rounded-br-sm text-[11px] font-medium">
                                                What is my security status?
                                            </div>
                                            <div className="mr-auto max-w-[75%] px-4 py-3 rounded-2xl rounded-bl-sm border border-white/8 text-[10px] font-mono leading-relaxed text-white/70"
                                                style={{ background: "rgba(255,255,255,0.03)" }}>
                                                SECURITY AUDIT — SOVEREIGN REPORT{"\n\n"}■ Ring-0 Boundary: SEALED{"\n"}■ Telemetry Rate: 0.00%{"\n"}■ Syndrome Count: 0 breaches
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center border rounded-xl p-1.5 gap-2"
                                            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
                                            <span className="flex-1 text-[10px] text-white/20 px-3 font-mono">Initialize sovereign query...</span>
                                            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#00f3ff" }}>
                                                <ChevronRight size={12} className="text-black" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                {activeDemo === "MORPH" && (
                                    <motion.div key="morph-demo" className="flex-1 p-5"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <div className="grid grid-cols-3 gap-2 mb-4">
                                            {[{ label: "Apps Sealed", val: "2", color: "#a78bfa" }, { label: "Calls Blocked", val: "47", color: "#00f3ff" }, { label: "Data Leaked", val: "0 KB", color: "#4ade80" }].map((s, i) => (
                                                <div key={i} className="p-3 rounded-xl border border-white/5 space-y-1.5" style={{ background: "rgba(255,255,255,0.01)" }}>
                                                    <p className="text-base font-bold" style={{ color: s.color }}>{s.val}</p>
                                                    <p className="text-[7px] text-white/25 uppercase tracking-widest">{s.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border border-dashed border-white/15 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-white/25">
                                            <Upload size={16} />
                                            <p className="text-[9px]">Drop application to seal</p>
                                        </div>
                                        <div className="mt-3 grid grid-cols-2 gap-2">
                                            {["Chrome.exe", "Spotify.exe"].map(name => (
                                                <div key={name} className="p-3 rounded-xl border border-white/5 flex items-center gap-2" style={{ background: "rgba(0,243,255,0.03)" }}>
                                                    <CheckCircle size={10} className="text-green-400 shrink-0" />
                                                    <div>
                                                        <p className="text-[9px] font-semibold">{name}</p>
                                                        <p className="text-[7px] text-white/30">Sealed · 0 leaks</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                                {activeDemo === "VITALS" && (
                                    <motion.div key="vitals-demo" className="flex-1 p-5"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            {[{ label: "CPU", val: "14%", pct: 14, color: "#00f3ff" }, { label: "RAM", val: "248MB", pct: 30, color: "#a78bfa" }].map(s => (
                                                <div key={s.label} className="p-4 rounded-xl border border-white/5 space-y-3" style={{ background: "rgba(255,255,255,0.01)" }}>
                                                    <div className="flex justify-between">
                                                        <span className="text-[9px] text-white/40 uppercase tracking-widest">{s.label}</span>
                                                        <span className="text-base font-black" style={{ color: s.color }}>{s.val}</span>
                                                    </div>
                                                    <div className="h-[2px] rounded-full bg-white/5">
                                                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 rounded-xl border border-white/5 space-y-2" style={{ background: "rgba(74,222,128,0.02)" }}>
                                            <div className="flex items-center gap-2">
                                                <Shield size={10} className="text-green-400" />
                                                <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Sovereign Status</span>
                                            </div>
                                            {["Ring-0: SEALED", "Telemetry: 0.00%", "Mode: OFFLINE SOVEREIGN"].map(l => (
                                                <p key={l} className="text-[8px] font-mono text-white/30">&gt; {l}</p>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </LiquidReveal>
        </section>
    );
};

// ──────────────────────────────────────────────────────────────
// Section: Cognitive Shield (H-Neurons & Defcon)
// ──────────────────────────────────────────────────────────────
const CognitiveShieldSection = () => (
    <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 w-full">
        <LiquidReveal>
            <div className="mb-20">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85]">
                    COGNITIVE <span style={{ color: "#4ade80" }}>SHIELD.</span>
                </h2>
                <p className="text-white/40 uppercase tracking-widest text-sm mt-4">
                    Live H-Neuron Suppression & Context-Aware Defense.
                </p>
            </div>
        </LiquidReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* H-Neuron Heatmap */}
            <LiquidReveal>
                <div className="p-10 rounded-[40px] border border-white/5 relative overflow-hidden"
                    style={{ background: "rgba(5,5,5,0.4)", backdropFilter: "blur(40px)" }}>
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Neural Circuit Map</span>
                        <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[8px] font-black uppercase tracking-widest animate-pulse">
                            Stabilized
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-8 gap-2 aspect-square md:aspect-auto md:h-[300px]">
                        {[...Array(64)].map((_, i) => {
                            const isSuppressed = Math.random() > 0.8;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0.1 }}
                                    animate={{ 
                                        opacity: [0.1, 0.4, 0.1],
                                        backgroundColor: isSuppressed ? "#ef4444" : "#00f3ff",
                                        boxShadow: isSuppressed ? "0 0 10px rgba(239, 68, 68, 0.4)" : "0 0 5px rgba(0, 243, 255, 0.2)"
                                    }}
                                    transition={{ 
                                        duration: 2 + Math.random() * 2, 
                                        repeat: Infinity,
                                        delay: Math.random() * 2
                                    }}
                                    className="rounded-sm"
                                />
                            );
                        })}
                    </div>

                    <div className="mt-8 flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-[10px] text-white/20 uppercase tracking-widest">Active Suppressions</p>
                            <p className="text-2xl font-black text-white">1,024 <span className="text-xs text-white/20">Circuits/sec</span></p>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-[10px] text-white/20 uppercase tracking-widest">Hallucination Risk</p>
                            <p className="text-2xl font-black text-green-400">0.02%</p>
                        </div>
                    </div>
                </div>
            </LiquidReveal>

            {/* Context-Aware Defcon v2 */}
            <LiquidReveal delay={0.15}>
                <div className="p-10 rounded-[40px] border border-white/5 flex flex-col justify-between group"
                    style={{ background: "rgba(167,139,250,0.02)", backdropFilter: "blur(40px)" }}>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-[#a78bfa]/10 border border-[#a78bfa]/20 text-[#a78bfa]">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold">Defcon Alpha</h4>
                                <p className="text-[10px] text-white/30 uppercase tracking-widest">Context-Aware Defensive Shift</p>
                            </div>
                        </div>
                        
                        <p className="text-white/50 text-sm leading-relaxed uppercase tracking-widest font-serif italic">
                            "The system detects sensitive environments (.env, .pem, banking vectors) and automatically severs network handles at the kernel level."
                        </p>

                        <div className="space-y-4">
                            {[
                                { label: "Environmental Scan", status: "Active", color: "#4ade80" },
                                { label: "Handle Severing", status: "Standby", color: "#a78bfa" },
                                { label: "Topological Shielding", status: "Engaged", color: "#00f3ff" }
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{s.label}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: s.color }}>{s.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 p-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                        <p className="text-[9px] font-bold text-yellow-500/80 uppercase tracking-widest">
                            Amber Shift: Sensitive Workspace Detected
                        </p>
                    </div>
                </div>
            </LiquidReveal>
        </div>
    </section>
);


// ──────────────────────────────────────────────────────────────
// Entry Section
// ──────────────────────────────────────────────────────────────
const EntrySection = () => (
    <section id="app" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 w-full">
        <LiquidReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
                <div className="p-10 rounded-[40px] border border-[#00f3ff]/20"
                    style={{ background: "linear-gradient(135deg, rgba(0,243,255,0.08), rgba(255,255,255,0.02))", backdropFilter: "blur(40px)" }}>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00f3ff] mb-4">Entry Vector</p>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] max-w-xl">
                        Deploy the sovereign runtime without waiting for permission.
                    </h2>
                    <p className="mt-6 text-white/50 text-sm md:text-base leading-relaxed max-w-2xl uppercase tracking-wider">
                        Install the desktop core, launch the legacy bridge, or move directly into the access portal for the full Lumina stack.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-xl">
                        <Link to="/portal"
                            className="flex-1 px-6 py-4 rounded-2xl bg-[#00f3ff] text-black font-black text-[10px] uppercase tracking-[0.35em] text-center transition-all hover:scale-[1.02] cursor-none">
                            Open Access Portal
                        </Link>
                        <a href="/Lumina_AI_Setup_x64.msi" download
                            className="flex-1 px-6 py-4 rounded-2xl border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.35em] text-center transition-all hover:bg-white/5 cursor-none">
                            Download MSI
                        </a>
                    </div>
                </div>

                <div className="p-8 rounded-[40px] border border-white/5 flex flex-col justify-between"
                    style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(40px)" }}>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/30 mb-5">Launch Checklist</p>
                        <div className="space-y-4">
                            {[
                                "Local runtime package sealed",
                                "Offline-first policy documented",
                                "Legacy installers published",
                                "Portal routes wired for download flow",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
                                    <div className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 rounded-[28px] border border-white/5 px-5 py-4 bg-black/20">
                        <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">Current focus</p>
                        <p className="mt-2 text-sm text-white/65 leading-relaxed uppercase tracking-wider">
                            Production-hardening the desktop runtime while keeping the gateway distribution surface operational.
                        </p>
                    </div>
                </div>
            </div>
        </LiquidReveal>
    </section>
);
// ──────────────────────────────────────────────────────────────
// Page: Home
// ──────────────────────────────────────────────────────────────


// ──────────────────────────────────────────────────────────────
// Entry Section
// ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
// Page: Home
// ──────────────────────────────────────────────────────────────
const LandingPage = () => (
    <div className="flex flex-col min-h-screen">
        <section className="pt-44 px-5 lg:px-12 pb-16 w-full max-w-7xl mx-auto flex flex-col items-center min-h-[60vh] justify-center relative z-10">
            <LiquidReveal>
                <div className="w-full flex justify-center mb-5">
                    <h1 className="text-[3rem] sm:text-[5rem] md:text-[8rem] lg:text-[11rem] font-black text-center tracking-tighter leading-[0.85] whitespace-nowrap uppercase">
                        LUMINA<span style={{ color: "#00f3ff" }}>AI.</span>
                    </h1>
                </div>
                <p className="text-white/40 text-center text-xs md:text-sm uppercase tracking-widest max-w-xl mx-auto px-4 mb-10">
                    MSQECC COGNITIVE ARCHITECTURE. 0.00KB Telemetry. Ring-0 protection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-sm mx-auto z-20">
                    <Link to="/portal"
                        className="flex-1 py-4 px-6 rounded-2xl bg-[#00f3ff] text-black font-black text-[10px] uppercase tracking-[0.4em] text-center transition-all hover:scale-105 active:scale-95 cursor-none shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                        Get Lumina AI
                    </Link>
                    <a href="#app"
                        className="flex-1 py-4 px-6 rounded-2xl border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] text-center transition-all hover:bg-white/5 cursor-none">
                        Explore OS
                    </a>
                </div>
            </LiquidReveal>

            <LiquidReveal delay={0.4}>
                <div className="mt-6 px-7 py-6 rounded-[28px] border border-dashed border-white/10 flex flex-col md:flex-row items-center justify-between gap-7 w-full max-w-3xl mx-auto"
                    style={{ background: "rgba(255,255,255,0.01)", backdropFilter: "blur(40px)" }}>
                    <div className="space-y-1.5 text-center md:text-left">
                        <h4 className="text-base md:text-lg font-bold">Trusted by 1,000+ Sovereign Agents</h4>
                        <p className="text-white/40 text-[10px] max-w-xs uppercase tracking-[0.2em]">Deployed globally in high-risk sectors.</p>
                    </div>
                    <div className="flex flex-col items-center gap-2.5">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4, 5].map(j => (
                                <div key={j} className="w-9 h-9 rounded-full border-2 flex items-center justify-center relative overflow-hidden"
                                    style={{ borderColor: "#030303", background: "linear-gradient(135deg,#1a1a1a,#111)" }}>
                                    <Lock size={11} className="text-white/20" />
                                </div>
                            ))}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#00f3ff" }}>Active Mesh Nodes</span>
                    </div>
                </div>
            </LiquidReveal>
        </section>

        <WhyChooseUsSection />
        <ProofSection />
        <ResearchSection />
        <AppShowcaseSection />
        <CognitiveShieldSection />
        <EntrySection />
    </div>
);

// ──────────────────────────────────────────────────────────────
// Page: Access Portal
// ──────────────────────────────────────────────────────────────
const AccessPortalPage = () => (
    <section className="min-h-[90vh] pt-36 md:pt-44 px-5 lg:px-12 pb-20 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        <LiquidReveal>
            <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] font-black text-center mb-4 tracking-tighter leading-[0.85]">
                ACCESS <span style={{ color: "#00f3ff" }}>PORTAL.</span>
            </h1>
            <p className="text-white/40 text-center text-xs md:text-sm uppercase tracking-widest mb-14 max-w-2xl mx-auto px-4">
                Select your entry vector into the Lumina ecosystem.
            </p>
        </LiquidReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full z-10 relative items-stretch">
            {/* Lumina AI — Cognitive OS [PRIMARY] */}
            <LiquidReveal delay={0.08}>
                <div className="p-10 rounded-[40px] flex flex-col gap-6 group hover:-translate-y-1.5 transition-all h-full w-full border border-[#00f3ff]/30 shadow-[0_0_30px_rgba(0,243,255,0.05)] relative overflow-hidden"
                    style={{ background: "rgba(0,243,255,0.03)", backdropFilter: "blur(60px)" }}>
                    <div className="absolute top-8 right-8 px-3 py-1 bg-[#00f3ff] text-black text-[8px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                        VITAL
                    </div>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-black group-hover:shadow-[0_0_30px_#00f3ff] transition-all shrink-0"
                        style={{ background: "#00f3ff" }}>
                        <Cpu size={32} />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00f3ff]">The Cognitive Core</span>
                        <h3 className="text-3xl md:text-4xl font-black mt-2 text-white">Lumina AI <span className="text-white/20">v1.0</span></h3>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed flex-1 font-medium">
                        Deployment of the MSQECC-stabilized cognitive kernel. Features surgical token efficiency and swarm resonance.
                    </p>
                    <a
                        href="/Lumina_AI_Setup_x64.msi"
                        download
                        className="mt-4 shrink-0 px-6 py-4 border border-[#00f3ff]/40 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00f3ff] hover:text-black transition-all cursor-none flex items-center justify-between"
                        style={{ background: "rgba(0,243,255,0.08)" }}
                    >
                        <span>Install Lumina AI (MSI)</span><Download size={14} />
                    </a>
                </div>
            </LiquidReveal>

            {/* Lumina OS */}
            <LiquidReveal delay={0.16}>
                <div className="p-9 rounded-[40px] flex flex-col gap-5 group hover:-translate-y-1.5 transition-all h-full w-full border border-white/5 hover:border-white/15"
                    style={{ background: "rgba(255,255,255,0.01)", backdropFilter: "blur(40px)" }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-black group-hover:shadow-lg transition-all shrink-0"
                        style={{ background: "rgba(255,255,255,0.8)" }}>
                        <Monitor size={24} />
                    </div>
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Kernel v1.02</span>
                        <h3 className="text-2xl md:text-3xl font-bold mt-1.5">Lumina OS</h3>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed flex-1">
                        The bare-metal root. Optimized for PC footprint bypassing traditional OS limitations.
                    </p>
                    <a
                        href="/Lumina_OS_v1.02.iso"
                        download
                        className="mt-2 shrink-0 px-5 py-3.5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-none flex items-center justify-between"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                        <span>Download ISO</span><Download size={13} />
                    </a>
                </div>
            </LiquidReveal>

            {/* Lumina App — Featured */}
            <LiquidReveal delay={0.24}>
                <div className="p-9 rounded-[40px] flex flex-col gap-5 group hover:-translate-y-1.5 transition-all h-full w-full relative overflow-hidden border border-white/5"
                    style={{ background: "rgba(255,255,255,0.01)", backdropFilter: "blur(40px)" }}>
                    <div className="absolute top-0 inset-x-0 h-px"
                        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)", opacity: 0.5 }} />
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white/40 shrink-0 border border-white/10"
                        style={{ background: "rgba(255,255,255,0.02)" }}>
                        <Smartphone size={24} />
                    </div>
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Legacy Bridge</span>
                        <h3 className="text-2xl md:text-3xl font-bold mt-1.5 text-white">Lumina Legacy</h3>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed font-medium">
                        Renders a sovereign, zero-telemetry isolation layer for your daily workflow inside your existing OS.
                    </p>
                    <div className="mt-auto flex flex-col gap-2.5 w-full shrink-0">
                        {/* Windows — two installer formats */}
                        <div className="grid grid-cols-2 gap-2">
                            <a href="/Lumina_Legacy_Windows.exe" download
                                className="px-3 py-2.5 border rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-none flex flex-col items-center justify-center gap-0.5 text-white border-white/10"
                                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)"; }}>
                                <span>Windows</span><span style={{ fontSize: "7px", opacity: 0.6 }}>.exe installer</span>
                            </a>
                            <a href="/Lumina_Legacy_Windows.msi" download
                                className="px-3 py-2.5 border border-white/10 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-none flex flex-col items-center justify-center gap-0.5"
                                style={{ background: "rgba(255,255,255,0.02)" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.02)"; }}>
                                <span>Windows</span><span style={{ fontSize: "7px", opacity: 0.5 }}>.msi package</span>
                            </a>
                        </div>
                        {/* Other platforms */}
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { label: "Android", ext: ".apk", href: "/Lumina_Legacy_Android.apk" },
                                { label: "Apple", ext: ".dmg", href: "/Lumina_Legacy_Apple.dmg" },
                                { label: "Linux", ext: ".AppImage", href: "/Lumina_Legacy_Linux.AppImage" },
                            ].map(p => (
                                <a key={p.label} href={p.href} download
                                    className="px-2 py-2.5 border border-white/10 text-white rounded-xl text-[8px] font-black uppercase tracking-widest transition-all cursor-none flex flex-col items-center justify-center gap-0.5"
                                    style={{ background: "rgba(255,255,255,0.02)" }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)"; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.02)"; }}>
                                    <span>{p.label}</span>
                                    <span style={{ fontSize: "7px", opacity: 0.4 }}>{p.ext}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </LiquidReveal>

            {/* Lumina Node */}
            <LiquidReveal delay={0.32}>
                <div className="p-9 rounded-[40px] flex flex-col gap-5 group hover:-translate-y-1.5 transition-all h-full w-full border border-white/5 hover:border-white/15"
                    style={{ background: "rgba(255,255,255,0.01)", backdropFilter: "blur(40px)" }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-black group-hover:shadow-lg transition-all shrink-0"
                        style={{ background: "rgba(255,255,255,0.8)" }}>
                        <Server size={24} />
                    </div>
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Cortex v0.1</span>
                        <h3 className="text-2xl md:text-3xl font-bold mt-1.5">Lumina Node</h3>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed flex-1">
                        Deploy local mesh infrastructure with end-to-end telemetry suppression.
                    </p>
                    <a
                        href="/Lumina_Node_v0.1.zip"
                        download
                        className="mt-2 shrink-0 px-5 py-3.5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-none flex items-center justify-between"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                        <span>Get Binaries</span><Download size={13} />
                    </a>
                </div>
            </LiquidReveal>
        </div>
    </section>
);

// ──────────────────────────────────────────────────────────────
// Page: Registry
// ──────────────────────────────────────────────────────────────
const RegistryPage = () => (
    <section className="min-h-screen pt-36 px-6 lg:px-12 flex flex-col items-center justify-center text-center">
        <LiquidReveal>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter">REGISTRY.</h1>
            <p className="text-white/40 max-w-lg text-base uppercase tracking-widest leading-loose mx-auto mb-16">
                The terminal for sovereign certificates.
                Verifying mesh integrity of every Lumina node.
            </p>
            <div className="w-full max-w-2xl rounded-[40px] overflow-hidden border border-white/5 mx-auto"
                style={{ background: "rgba(255,255,255,0.01)", backdropFilter: "blur(40px)" }}>
                <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between"
                    style={{ background: "rgba(255,255,255,0.01)" }}>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">System Log</span>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ boxShadow: "0 0 8px #22c55e" }} />
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#00f3ff" }}>Node Active</span>
                    </div>
                </div>
                <div className="p-10 space-y-3 font-mono text-[11px] text-white/30 text-left h-[260px] overflow-y-auto">
                    <p>&gt; LUMINA_AI_KERNEL SEALED: 0x82...A5FF</p>
                    <p>&gt; MSQECC AUDIT COMPLETE (Tier 10)</p>
                    <p>&gt; TELEMETRY EXTRACTION GATED...</p>
                    <p style={{ color: "#00f3ff" }}>&gt; SOVEREIGN HANDSHAKE ESTABLISHED.</p>
                    <p>&gt; ARCHITECT: KIMANI_J</p>
                    <p>&gt; STATUS: UNDETECTABLE. SEALED.</p>
                    <p>&gt; NODES VERIFIED: 1,047</p>
                    <p style={{ color: "#a78bfa" }}>&gt; SYNDROME COUNT: 0 BREACHES DETECTED.</p>
                </div>
            </div>
        </LiquidReveal>
    </section>
);

// ──────────────────────────────────────────────────────────────
// Page: Terms
// ──────────────────────────────────────────────────────────────
const TermsPage = () => (
    <section className="min-h-screen pt-40 lg:pt-48 px-6 lg:px-12 pb-20 w-full max-w-4xl mx-auto">
        <LiquidReveal>
            <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter">SOVEREIGN TERMS.</h1>
            <div className="space-y-12 text-white/60 font-serif leading-relaxed text-base md:text-lg pb-32">
                {[
                    {
                        title: "1. The Void Protocol",
                        body: "By accessing the Lumina AI architecture, you operate under Absolute Zero Telemetry. Your data is your sovereign property. We do not extract, trace, or syndicate your operations under any circumstance."
                    },
                    {
                        title: "2. Cryptographic Sanctity",
                        body: "Your encryption keys are stored exclusively at Ring-0 on your local device. In the event of catastrophic physical breach, the hardware layer will permanently seal all accessible syndrome vectors, rendering extraction mathematically impossible."
                    },
                    {
                        title: "3. Isomorphic Isolation",
                        body: "Any third-party application run inside the Sovereign Sandbox is strictly prohibited from executing out-of-bounds network calls. Attempts by applications to exfiltrate behavioral data will trigger immediate API termination."
                    },
                    {
                        title: "4. Sovereign Agreement",
                        body: "You agree to use the Lumina AI platform solely for lawful purposes. Lumina's privacy guarantees protect you — but they do not protect illegal activity. This is a tool for sovereignty, not evasion."
                    },
                ].map((item, i) => (
                    <div key={i} className="space-y-4">
                        <h3 className="text-white font-sans font-bold text-xl md:text-2xl uppercase tracking-widest">{item.title}</h3>
                        <p>{item.body}</p>
                    </div>
                ))}
            </div>
        </LiquidReveal>
    </section>
);

// ──────────────────────────────────────────────────────────────
// Research Paper Data
// ──────────────────────────────────────────────────────────────
const PAPERS: Record<string, { title: string; vol: string; abstract: string; body: string[] }> = {
    "1": {
        title: "RESTRICTED COMPILER: ZERO-TELEMETRY RUNTIME ISOLATION",
        vol: "Vol. I",
        abstract: "Commercial operating systems log execution traces via Ring-1 kernel hooks. Lumina AI bypasses this by deploying a restricted runtime compiler that surgically strips generic tracking hooks prior to binary compilation.",
        body: [
            "Lumina's restricted compiler explicitly denies any process attempting to mount telemetry sockets across the internal bridge layer. This is enforced at the LLVM intermediate representation stage, not the application layer — making it immune to software-level bypass.",
            "By mapping process execution to isolated hardware blocks with enforced memory boundaries, the Zero-Telemetry protocol forms an impenetrable mathematical barrier. The kernel itself cannot observe what happens inside a sealed process envelope.",
            "Any application executed within this runtime is forced into a mathematically blind envelope. Extraction hooks are not merely blocked — they are rendered structurally non-callable. The call signature is remapped to a null vector at compilation.",
        ]
    },
    "2": {
        title: "HARDWARE-LEVEL CRYPTOGRAPHIC SANDBOXING",
        vol: "Vol. II",
        abstract: "Legacy operating systems rely on inherently parasitic O(N2) software-level data extraction hooks. The Lumina AI architecture flips this paradigm by embedding topographical memory constraints directly below the OS kernel layer.",
        body: [
            "By embedding cryptographic keys within the hardware abstraction layer (Ring-0) using Syndrome Sealing, we achieve absolute mathematical deterrence against arbitrary memory reads (AMR) perpetrated by embedded tracking modules from major tech corporations.",
            "This document details the mathematical proofs demonstrating the impossibility of telemetry egress when the system is operating in Zenith mode, rendering side-channel analysis statistically irrelevant via isomorphic state resets.",
            "In standard configurations, whenever an application requests user location, biometric, or input telemetry, the native Sandbox supplies perfectly generated deterministic noise. Upstream corporate aggregators receive data — just not yours.",
        ]
    },
    "3": {
        title: "SYNDROME SEALING: AN ANALYSIS",
        vol: "Vol. III",
        abstract: "Syndrome Sealing represents the highest echelon of process obfuscation. Utilizing principles derived from quantum error-correction topology, Lumina actively protects running memory blocks through real-time syndrome checks.",
        body: [
            "Standard extraction attempts trigger an immediate syndrome flag at the hardware boundary. This flag invalidates the memory boundary and initiates a hard lockdown of the host process — all within a single CPU clock cycle.",
            "This active sealing technique generates exactly zero friction for the legitimate user but forces infinite loop latencies on any unauthorized process attempting to parse restricted memory segments. The math is deterministic.",
            "We detail the specific mathematical proofs establishing the Syndrome Seal boundary conditions, demonstrating its empirical resilience against both passive scanning and active heuristic analysis using linear algebra and topological invariants.",
        ]
    },
    "4": {
        title: "ISOMORPHIC APP COMPILATION",
        vol: "Vol. IV",
        abstract: "The Lumina AI Sandbox allows standard Android, Windows, Apple, and Linux applications to run natively while entirely cutting off their extraction mechanisms. We formalize this as Isomorphic Compilation.",
        body: [
            "An isomorphic boundary mimics the host operating system with mathematical precision. The target application requests location data, network diagnostics, hardware IDs, or biometrics — all the signals corporations use to profile you.",
            "Instead of simply denying the request (which often crashes these apps), Lumina AI serves the app an isomorphic blank slate: a mathematically perfect forgery of a real device environment. The app operates normally. It just lives in a void.",
            "This enables users to operate the most notoriously aggressive data-mining applications without surrendering a single kilobyte of genuine personal telemetry.",
        ]
    },
    "5": {
        title: "H-NEURON SUPPRESSION: MICROSCOPIC LOGIC STABILIZATION",
        vol: "Vol. V",
        abstract: "Recent breakthroughs in transformer architecture analysis identified sparse 'hallucination-associated' neurons. Lumina AI implements real-time suppressed activation of these circuits to ensure 100% logical fidelity.",
        body: [
            "By mapping the activation gradients of H-Neurons during pre-inference, Lumina is able to apply a topological dampening field to unstable logic trajectories. This prevents the 'hallucination collapse' common in legacy large language models.",
            "The dampening is achieved through MSQECC verification pulses, which force the model state back toward a verified reasoning lattice whenever a hallucination vector is detected. This occurs with sub-millisecond latency.",
            "Current empirical tests show a 99.8% reduction in factual fabrication compared to standard un-stabilized weights. This represents a qualitative breakthrough in localized sovereign intelligence performance.",
        ]
    }
};

// ──────────────────────────────────────────────────────────────
// Page: Individual Research Paper
// ──────────────────────────────────────────────────────────────
const PaperPage = () => {
    const { id } = useParams<{ id: string }>();
    const paper = PAPERS[id || "1"] || PAPERS["1"];
    return (
        <section className="min-h-screen pt-36 lg:pt-44 px-6 lg:px-12 pb-20 w-full max-w-4xl mx-auto flex flex-col">
            <LiquidReveal>
                <div className="mb-12">
                    <Link
                        to="/research"
                        className="uppercase tracking-widest text-xs font-bold mb-8 inline-block transition-colors cursor-none"
                        style={{ color: "#00f3ff" }}
                    >
                        &larr; Return to Archives
                    </Link>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight max-w-3xl mt-4">{paper.title}</h1>
                    <div className="border-b border-white/10 pb-8">
                        <p className="uppercase tracking-widest text-xs md:text-sm font-bold" style={{ color: "#a78bfa" }}>
                            Authorized Personnel Only / {paper.vol}
                        </p>
                    </div>
                </div>
                <div className="space-y-8 text-white/70 font-serif text-base md:text-lg leading-loose pb-32">
                    <p>
                        <b className="text-white font-sans text-xs md:text-sm tracking-widest uppercase">Abstract: </b>
                        {paper.abstract}
                    </p>
                    {paper.body.map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            </LiquidReveal>
        </section>
    );
};

// ──────────────────────────────────────────────────────────────
// Page: Research Listing
// ──────────────────────────────────────────────────────────────
const ResearchPage = () => (
    <div className="pt-20 min-h-screen">
        <ResearchSection />
    </div>
);

// ──────────────────────────────────────────────────────────────
// Page Wrapper: Route Animation + Scroll Reset
// ──────────────────────────────────────────────────────────────
function PageWrapper() {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, [location.pathname]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
                <Routes location={location}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/portal" element={<AccessPortalPage />} />
                    <Route path="/registry" element={<RegistryPage />} />
                    <Route path="/proof" element={<div className="pt-20 min-h-screen"><ProofSection /></div>} />
                    <Route path="/research" element={<ResearchPage />} />
                    <Route path="/paper/:id" element={<PaperPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
}

// ──────────────────────────────────────────────────────────────
// Navbar
// ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
// Lumina Void Logo (Procedural SVG)
// ──────────────────────────────────────────────────────────────
const LuminaVoidLogo = ({ size = 32 }: { size?: number }) => (
    <div className="relative flex items-center justify-center group/logo" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all group-hover/logo:scale-110">
            {/* Outer stabilizing ring */}
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-10 translate-z-0 anim-spin-slow" />

            {/* Core starburst - High-res sharp white */}
            <path d="M50 0L52 48H100L54 52L50 100L46 52L0 48H48L50 0Z" fill="white" className="drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />

            {/* Internal MSQECC lattice points */}
            <circle cx="50" cy="50" r="1.5" fill="white" />
            <circle cx="50" cy="10" r="0.8" fill="white" className="animate-pulse" />
            <circle cx="50" cy="90" r="0.8" fill="white" className="animate-pulse" />
            <circle cx="10" cy="50" r="0.8" fill="white" className="animate-pulse" />
            <circle cx="90" cy="50" r="0.8" fill="white" className="animate-pulse" />
        </svg>
    </div>
);

// ──────────────────────────────────────────────────────────────
// Navbar
// ──────────────────────────────────────────────────────────────
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handle = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handle, { passive: true });
        return () => window.removeEventListener("scroll", handle);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] px-5 lg:px-12 flex items-center justify-between transition-all duration-500 border-b border-transparent",
                scrolled ? "h-[72px] shadow-2xl" : "h-28"
            )}
            style={scrolled
                ? { background: "rgba(5,5,5,0.93)", backdropFilter: "blur(24px)", borderColor: "rgba(255,255,255,0.05)" }
                : {}
            }
        >
            <div className="flex items-center gap-3 lg:gap-5">
                <Link to="/" className="cursor-none flex items-center gap-3 group">
                    <LuminaVoidLogo size={36} />
                    <span className="text-[10px] font-black uppercase tracking-[0.45em] text-white/40 hidden md:block">Lumina AI</span>
                </Link>
            </div>
            <div className="flex items-center gap-3 md:gap-6 lg:gap-10">
                <Link to="/registry" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-none hidden sm:block">Registry</Link>
                <Link to="/research" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-none hidden sm:block">Research</Link>
                <Link
                    to="/portal"
                    className="px-5 lg:px-7 py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all cursor-none border"
                    style={{ color: "#00f3ff", borderColor: "rgba(0,243,255,0.3)", background: "rgba(0,243,255,0.04)", backdropFilter: "blur(20px)" }}
                >
                    Access Portal
                </Link>
            </div>
        </nav>
    );
};

// ──────────────────────────────────────────────────────────────
// Footer
// ──────────────────────────────────────────────────────────────
const Footer = () => (
    <footer
        className="relative z-20 mt-auto py-16 lg:py-24 px-6 lg:px-12 border-t border-white/5 flex flex-col xl:flex-row justify-between gap-14 xl:gap-20 items-start"
        style={{ background: "#000" }}
    >
        <div className="space-y-4 shrink-0">
            <Link to="/" className="cursor-none flex items-center gap-3 w-max group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <LuminaVoidLogo size={24} />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 group-hover:text-white transition-colors">Lumina AI</span>
            </Link>
            <p className="text-[10px] text-white/30 tracking-widest uppercase leading-loose mt-4">Architect: Jack Kimani</p>
            <p className="text-[10px] text-white/20 tracking-widest uppercase leading-loose">Core System: MSQECC 1.0</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 lg:gap-24 w-full xl:w-auto">
            <div className="space-y-5">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest border-b border-white/10 pb-2 inline-block">Legacy</span>
                <div className="flex flex-col gap-4 mt-1">
                    <a href="https://github.com/Hope8188/Lumina" target="_blank" rel="noopener noreferrer"
                        className="text-[10px] text-white/40 hover:text-[#00f3ff] transition-colors cursor-none uppercase tracking-widest">GitHub Repository</a>
                    <Link to="/registry" className="text-[10px] text-white/40 hover:text-[#00f3ff] transition-colors cursor-none uppercase tracking-widest">Active Nodes</Link>
                    <Link to="/portal" className="text-[10px] text-white/40 hover:text-[#00f3ff] transition-colors cursor-none uppercase tracking-widest">Install Application</Link>
                </div>
            </div>
            <div className="space-y-5">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest border-b border-white/10 pb-2 inline-block">Sovereign</span>
                <div className="flex flex-col gap-4 mt-1">
                    <Link to="/proof" className="text-[10px] text-white/40 hover:text-[#a78bfa] transition-colors cursor-none uppercase tracking-widest">Technical Proof</Link>
                    <Link to="/research" className="text-[10px] text-white/40 hover:text-[#a78bfa] transition-colors cursor-none uppercase tracking-widest">Research Papers</Link>
                    <Link to="/terms" className="text-[10px] text-white/40 hover:text-[#a78bfa] transition-colors cursor-none uppercase tracking-widest">Sovereign Terms</Link>
                </div>
            </div>
            <div className="flex items-start xl:ml-auto mt-0 xl:mt-0">
                <div className="px-5 py-3.5 rounded-xl border border-white/8 relative overflow-hidden group"
                    style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="absolute inset-x-0 bottom-0 h-px group-hover:h-full transition-all opacity-10"
                        style={{ background: "#00f3ff" }} />
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: "#00f3ff" }}>PERSONAL SOVEREIGNTY.</span>
                </div>
            </div>
        </div>
    </footer>
);

// ──────────────────────────────────────────────────────────────
// Root App
// ──────────────────────────────────────────────────────────────
export default function App() {
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef = useRef<number>(0);

    const startLenis = useCallback(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            duration: 1.4,
            smoothWheel: true,
            wheelMultiplier: 1.1,
        });
        lenisRef.current = lenis;
        const raf = (time: number) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        };
        rafRef.current = requestAnimationFrame(raf);
    }, []);

    useEffect(() => {
        startLenis();
        return () => {
            cancelAnimationFrame(rafRef.current);
            lenisRef.current?.destroy();
        };
    }, [startLenis]);

    return (
        <Router>
            <div
                className="relative min-h-screen text-white overflow-x-hidden font-sans flex flex-col"
                style={{ background: "#030303", cursor: "none" }}
            >
                <SovereignCursor />

                {/* Grain texture overlay */}
                <div
                    className="fixed inset-0 z-[1] pointer-events-none"
                    style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", opacity: 0.035 }}
                />

                {/* 3D Background */}
                <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.35 }}>
                    <Canvas>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]} />
                        <ambientLight intensity={0.4} />
                        <pointLight position={[10, 10, 10]} intensity={2} color="#00f3ff" />
                        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#a78bfa" />
                        <HorizonTorus />
                    </Canvas>
                </div>

                <Navbar />

                <main className="relative z-10 w-full flex-1">
                    <PageWrapper />
                </main>

                {/* Cognitive Status Ticker */}
                <div className="w-full border-y border-white/5 py-3 overflow-hidden bg-black/40 backdrop-blur-md relative z-10">
                    <div className="flex whitespace-nowrap animate-marquee">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-8 mx-8">
                                <span className="text-[10px] font-mono text-[#00f3ff] tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] shadow-[0_0_8px_#00f3ff]" />
                                    COGNITIVE STATUS: STABILIZED
                                </span>
                                <span className="text-[10px] font-mono text-white/20 tracking-widest">
                                    LATENCY: 182MS
                                </span>
                                <span className="text-[10px] font-mono text-white/20 tracking-widest">
                                    SWARM CONVERGENCE: 98.4%
                                </span>
                                <span className="text-[10px] font-mono text-[#4ade80] tracking-widest uppercase">
                                    H-NEURON SUPPRESSION: ACTIVE
                                </span>
                                <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
                                    Root: Lumina AI Core v1.1 [MSQECC]
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <Footer />
            </div>
        </Router>
    );
}

