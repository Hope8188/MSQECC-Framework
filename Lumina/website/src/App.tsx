import { useEffect, useRef, useState } from "react";
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
    FileText
} from "lucide-react";
import * as THREE from "three";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ─── High-Fidelity 3D Torus (The "Digital Mercury" Orbit) ───
const HorizonTorus = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { scrollYProgress } = useScroll();
    const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 4]);
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

// ─── Optimized Sovereign Cursor (Zero Latency) ───
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
            className="fixed top-0 left-0 w-6 h-6 -ml-3 -mt-3 rounded-full border border-cyan-glow/50 pointer-events-none z-[999] flex items-center justify-center mix-blend-difference will-change-transform"
        >
            <div className="w-[2px] h-[2px] bg-cyan-glow rounded-full shadow-[0_0_10px_#00f3ff]" />
        </div>
    );
};

// ─── Reveal Component ───
const LiquidReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
};

// ─── Shared Components ───

const WhyChooseUsSection = () => (
    <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 w-full">
        <LiquidReveal>
            <div className="mb-24 flex flex-col lg:flex-row justify-between items-end gap-12">
                <h2 className="text-6xl lg:text-9xl font-black tracking-tighter max-w-2xl leading-[0.85]">
                    WHY <span className="text-cyan-glow">CHOOSE</span> LUMINA?
                </h2>
                <p className="max-w-md text-white/40 uppercase tracking-widest text-sm leading-relaxed mb-6">
                    LEGACY OS WERE DESIGNED TO EXTRACT. WE WERE BUILT TO SHIELD. ZERO-TELEMETRY STACK OPERATING AT RING-0.
                </p>
            </div>
        </LiquidReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: "Absolute Zero", icon: <Lock />, desc: "0.00KB of telemetry egress. Guaranteed by strict cryptographic audits." },
                { title: "Sovereign Speed", icon: <Flame />, desc: "40% faster than typical kernels by removing background extraction protocols." },
                { title: "Neural Fidelity", icon: <Binary />, desc: "Isomorphic app wrapping allows you to use your favorite tools without their tracking." }
            ].map((item, i) => (
                <LiquidReveal key={i} delay={i * 0.1}>
                    <div className="p-12 glass-gate rounded-[48px] border-white/5 hover:border-cyan-glow/20 transition-all min-h-[400px] flex flex-col justify-between group cursor-none">
                        <div className="w-16 h-16 rounded-2xl glass-gate flex items-center justify-center text-cyan-glow group-hover:bg-cyan-glow group-hover:text-black transition-all">
                            {item.icon}
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-3xl font-bold">{item.title}</h4>
                            <p className="text-white/40 text-sm leading-relaxed uppercase tracking-wider">{item.desc}</p>
                        </div>
                    </div>
                </LiquidReveal>
            ))}
        </div>
    </section>
);

const ProofSection = () => (
    <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full border-t border-white/5 flex flex-col items-center">
        <LiquidReveal>
            <div className="text-center mb-24">
                <h2 className="text-6xl lg:text-9xl font-black mb-6 tracking-tighter">THE <span className="text-cyan-glow">PROOF.</span></h2>
                <p className="text-white/40 uppercase tracking-widest font-serif italic text-xl lg:text-3xl">Lumina vs. Legacy Tech</p>
            </div>
        </LiquidReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full mb-32">
            <LiquidReveal>
                <div className="p-8 lg:p-12 glass-gate rounded-[48px] space-y-8 bg-black/40 border-void relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-500/[0.02] group-hover:bg-red-500/[0.05] transition-colors" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-12 h-12 glass-gate rounded-xl flex items-center justify-center text-red-500 border-red-500/20">
                            <Monitor size={20} />
                        </div>
                        <h4 className="text-xl font-bold uppercase tracking-widest text-white/50">Other Platforms</h4>
                    </div>
                    <div className="space-y-6 relative z-10">
                        {[
                            { label: "Background Telemetry", val: 85, color: "bg-red-500" },
                            { label: "Extraction Latency", val: 70, color: "bg-red-500" },
                            { label: "User Sovereignty", val: 5, color: "bg-red-500" }
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-[10px] uppercase font-bold text-white/40">
                                    <span>{stat.label}</span>
                                    <span>{stat.val}% Extraction</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${stat.val}%` }} className={cn("h-full opacity-40", stat.color)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </LiquidReveal>

            <LiquidReveal delay={0.2}>
                <div className="p-8 lg:p-12 glass-gate rounded-[48px] space-y-8 border-cyan-glow/20 bg-cyan-glow/[0.02]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 glass-gate rounded-xl flex items-center justify-center text-cyan-glow border-cyan-glow/20 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                            <Shield size={20} />
                        </div>
                        <h4 className="text-xl font-bold uppercase tracking-widest text-white">Lumina Horizon</h4>
                    </div>
                    <div className="space-y-6">
                        {[
                            { label: "Background Telemetry", val: 0, color: "bg-cyan-glow" },
                            { label: "Extraction Latency", val: 0, color: "bg-cyan-glow" },
                            { label: "User Sovereignty", val: 100, color: "bg-cyan-glow" }
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-[10px] uppercase font-bold text-cyan-glow">
                                    <span>{stat.label}</span>
                                    <span>{stat.val}% Protected</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${stat.val}%` }} className={cn("h-full drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]", stat.color)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </LiquidReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            <LiquidReveal>
                <div className="space-y-12">
                    <div className="flex gap-6 items-start">
                        <div className="shrink-0 text-cyan-glow p-3 glass-gate rounded-2xl"><Globe size={24} /></div>
                        <div>
                            <h5 className="text-2xl font-bold mb-2">Vs. Tech Giants</h5>
                            <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest">They treat your data as corporate assets. We treat it as sovereign property shielded by Ring-0 encryption.</p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-start">
                        <div className="shrink-0 text-cyan-glow p-3 glass-gate rounded-2xl"><Cpu size={24} /></div>
                        <div>
                            <h5 className="text-2xl font-bold mb-2">Vs. Generic OS</h5>
                            <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest">While some are open, they lack cohesive protection. We engineer tracking resistance into the hardware abstraction.</p>
                        </div>
                    </div>
                </div>
            </LiquidReveal>
            <LiquidReveal delay={0.2}>
                <div className="glass-gate p-12 rounded-[48px] bg-[#050505] border-white/10 flex flex-col justify-between h-full relative overflow-hidden group">
                    <div className="absolute inset-0 bg-cyan-glow/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <div className="relative z-10 space-y-8">
                        <h5 className="text-4xl font-black tracking-tighter text-white">THE VERDICT.</h5>
                        <p className="font-serif italic text-lg leading-relaxed text-white/70">"Lumina doesn't just block tracking; it renders tracking technologically impossible at the hardware abstraction level."</p>
                        <Link to="/portal" className="inline-block px-8 py-4 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-center hover:bg-cyan-glow hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all cursor-none w-max">
                            Switch to Sovereignty
                        </Link>
                    </div>
                </div>
            </LiquidReveal>
        </div>
    </section>
);

const ResearchSection = () => (
    <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 w-full" id="research">
        <LiquidReveal>
            <div className="mb-20 text-center">
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-4">THE <span className="text-resonance">RESEARCH.</span></h2>
                <p className="text-white/40 uppercase tracking-widest">Sovereign Architecture Whitepapers</p>
            </div>
        </LiquidReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
                { id: "1", title: "Zero-Telemetry Runtime Isolation", date: "Vol I." },
                { id: "2", title: "Hardware-Level Cryptographic Sandboxing", date: "Vol II." },
                { id: "3", title: "Syndrome Sealing: An Analysis", date: "Vol III." },
                { id: "4", title: "Isomorphic App Compilation", date: "Vol IV." },
            ].map((paper, i) => (
                <LiquidReveal key={i} delay={i * 0.1}>
                    <Link to={`/paper/${paper.id}`} className="p-8 glass-gate rounded-3xl border border-white/5 hover:border-resonance/40 transition-all flex items-center justify-between group cursor-none">
                        <div className="flex items-center gap-6">
                            <FileText className="text-resonance/50 group-hover:text-resonance transition-colors" />
                            <div>
                                <h4 className="font-bold text-lg text-white">{paper.title}</h4>
                                <span className="text-[10px] text-white/40 uppercase tracking-widest group-hover:text-resonance/80 transition-colors">{paper.date}</span>
                            </div>
                        </div>
                        <ArrowRight className="text-white/20 group-hover:text-white group-hover:translate-x-2 transition-transform" />
                    </Link>
                </LiquidReveal>
            ))}
        </div>
    </section>
);

const EntrySection = () => (
    <section className="py-32 flex flex-col items-center justify-center text-center rounded-[80px] border border-white/5 bg-[#0a0a0c] shadow-[0_-50px_100px_rgba(0,0,0,0.8)] mx-4 lg:mx-12 mt-32 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,243,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        <LiquidReveal>
            <h2 className="text-[4rem] md:text-[8rem] lg:text-[14rem] leading-none font-black tracking-tighter mb-8 text-white w-full text-center">ENTRY.</h2>
        </LiquidReveal>
        <LiquidReveal delay={0.3}>
            <p className="text-lg lg:text-2xl font-bold uppercase tracking-widest mb-16 text-white/40 font-serif italic px-6">Ready to break the seal?</p>
            <Link to="/portal" className="px-12 lg:px-24 py-6 lg:py-8 rounded-full border border-white/10 hover:border-cyan-glow text-white hover:bg-cyan-glow hover:text-black font-black text-sm md:text-lg lg:text-xl uppercase tracking-[0.4em] transition-all transform hover:scale-[1.02] active:scale-95 cursor-none bg-white/[0.02] backdrop-blur-xl shadow-2xl">
                Launch Horizon
            </Link>
        </LiquidReveal>
    </section>
);

// ─── Pages ───

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* The Horizontal Hero - Fully aligned to Access Portal styling but perfectly unbreaking */}
            <section className="pt-48 px-4 lg:px-12 pb-20 w-full max-w-7xl mx-auto flex flex-col items-center min-h-[60vh] justify-center relative z-10">
                <LiquidReveal>
                    <div className="w-full flex justify-center mb-6">
                        <h1 className="text-[3.5rem] md:text-[7rem] lg:text-[10rem] font-black text-center tracking-tighter leading-[0.85] whitespace-nowrap flex overflow-visible">
                            SOVER<span className="text-cyan-glow">EIGN.</span>
                        </h1>
                    </div>
                    <p className="text-white/40 text-center text-xs md:text-sm lg:text-lg uppercase tracking-widest mb-10 max-w-2xl mx-auto px-4">
                        Absolute structural privacy. 0.00KB Telemetry.
                    </p>
                </LiquidReveal>

                {/* Refined Trusted By (Clean Avatars) */}
                <LiquidReveal delay={0.5}>
                    <div className="mt-8 p-6 lg:p-8 glass-gate rounded-[32px] w-full border-dashed border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto shadow-2xl">
                        <div className="space-y-2 text-center md:text-left">
                            <h4 className="text-lg lg:text-xl font-bold">Trusted by 1,000+ Sovereign Agents</h4>
                            <p className="text-white/40 text-[10px] lg:text-xs max-w-sm uppercase tracking-[0.2em]">Deployed globally in high-risk sectors.</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map(j => (
                                    <div key={j} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-void bg-gradient-to-tr from-zinc-800 to-zinc-900 shadow-md relative overflow-hidden flex justify-center items-center">
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                        <Lock size={12} className="text-white/20" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-cyan-glow">Active Mesh Nodes</span>
                        </div>
                    </div>
                </LiquidReveal>
            </section>

            <WhyChooseUsSection />
            <ProofSection />
            <ResearchSection />
            <EntrySection />
        </div>
    );
};

// ─── Unique Access Portal Page (The 3 Cards) ───
const AccessPortalPage = () => (
    <section className="min-h-[80vh] pt-40 px-4 lg:px-12 pb-20 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        <LiquidReveal>
            <h1 className="text-[3rem] md:text-[5rem] lg:text-[7rem] font-black text-center mb-4 tracking-tighter leading-[0.85]">
                ACCESS <span className="text-cyan-glow">PORTAL.</span>
            </h1>
            <p className="text-white/40 text-center text-xs md:text-sm lg:text-lg uppercase tracking-widest mb-16 max-w-2xl mx-auto px-4">
                Select your entry vector into the Horizon ecosystem.
            </p>
        </LiquidReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full z-10 relative items-stretch">
            <LiquidReveal delay={0.1}>
                <div className="p-10 glass-gate rounded-[48px] flex flex-col gap-6 group hover:translate-y-[-5px] transition-all border-white/5 hover:border-white/20 h-full w-full">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-black bg-white/80 group-hover:bg-cyan-glow transition-colors shrink-0 shadow-lg">
                        <Monitor size={28} />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Kernel v1.02</span>
                        <h3 className="text-3xl font-bold mt-2">Lumina OS</h3>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed pb-6">The bare-metal root. Optimized for PC footprint bypassing traditional OS limitations.</p>
                    <a href="/Lumina_OS_v1.02.iso" download className="mt-auto shrink-0 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all group-hover:border-cyan-glow/50 cursor-none flex items-center justify-between">
                        <span>Download ISO</span><Download size={14} />
                    </a>
                </div>
            </LiquidReveal>

            {/* Highly Pushed App Card with Multi-Platform Downloads */}
            <LiquidReveal delay={0.2}>
                <div className="p-8 lg:p-12 bg-white/5 rounded-[48px] flex flex-col gap-6 group hover:translate-y-[-5px] shadow-[0_0_50px_rgba(0,243,255,0.05)] transition-all border border-cyan-glow/30 hover:border-cyan-glow h-full w-full relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-glow to-transparent opacity-50" />
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-black bg-cyan-glow group-hover:shadow-[0_0_30px_#00f3ff] transition-all shrink-0">
                        <Smartphone size={32} />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-glow">Recommended Entry</span>
                        <h3 className="text-4xl font-black mt-2 text-white">Lumina App</h3>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed font-medium pb-2 text-balance">Renders a sovereign, zero-telemetry sandbox for your daily workflow inside your existing OS.</p>

                    {/* Multi-Platform Download Options */}
                    <div className="mt-auto grid grid-cols-2 gap-3 w-full shrink-0">
                        <a href="/Lumina_App_Android.apk" download className="px-3 py-3 bg-white/[0.03] border border-white/10 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-cyan-glow hover:text-black hover:border-cyan-glow transition-all cursor-none flex flex-col items-center justify-center gap-1">
                            <span>Android</span>
                            <span className="opacity-40 text-[8px] tracking-normal">.apk</span>
                        </a>
                        <a href="/Lumina_App_Apple.dmg" download className="px-3 py-3 bg-white/[0.03] border border-white/10 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-cyan-glow hover:text-black hover:border-cyan-glow transition-all cursor-none flex flex-col items-center justify-center gap-1">
                            <span>Apple</span>
                            <span className="opacity-40 text-[8px] tracking-normal">iOS / macOS</span>
                        </a>
                        <a href="/Lumina_App_Windows.exe" download className="px-3 py-3 bg-white/[0.03] border border-white/10 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-cyan-glow hover:text-black hover:border-cyan-glow transition-all cursor-none flex flex-col items-center justify-center gap-1">
                            <span>Windows</span>
                            <span className="opacity-40 text-[8px] tracking-normal">.exe</span>
                        </a>
                        <a href="/Lumina_App_Linux.AppImage" download className="px-3 py-3 bg-white/[0.03] border border-white/10 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-cyan-glow hover:text-black hover:border-cyan-glow transition-all cursor-none flex flex-col items-center justify-center gap-1">
                            <span>Linux</span>
                            <span className="opacity-40 text-[8px] tracking-normal">.AppImage</span>
                        </a>
                    </div>
                </div>
            </LiquidReveal>

            <LiquidReveal delay={0.3}>
                <div className="p-10 glass-gate rounded-[48px] flex flex-col gap-6 group hover:translate-y-[-5px] transition-all border-white/5 hover:border-white/20 h-full w-full">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-black bg-white/80 group-hover:bg-resonance transition-colors shrink-0 shadow-lg">
                        <Server size={28} />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Cortex v0.1</span>
                        <h3 className="text-3xl font-bold mt-2">Lumina Node</h3>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed pb-6 text-balance">Deploy local mesh infrastructure with end-to-end telemetry suppression.</p>
                    <a href="/Lumina_Node_v0.1.zip" download className="mt-auto shrink-0 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all group-hover:border-resonance/50 cursor-none flex items-center justify-between">
                        <span>Get Binaries</span><Download size={14} />
                    </a>
                </div>
            </LiquidReveal>
        </div>
    </section>
);

const RegistryPage = () => (
    <section className="min-h-screen pt-40 px-6 lg:px-12 flex flex-col items-center justify-center text-center">
        <LiquidReveal>
            <h1 className="text-6xl lg:text-8xl font-black mb-8">REGISTRY.</h1>
            <p className="text-white/40 max-w-xl text-lg uppercase tracking-widest leading-loose mx-auto">
                The terminal for sovereign certificates. <br />
                Verifying the mesh integrity of every Lumina node.
            </p>
            <div className="mt-20 w-full max-w-3xl glass-gate rounded-[48px] overflow-hidden mx-auto">
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">System Log</span>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-glow">Node Active</span>
                    </div>
                </div>
                <div className="p-12 space-y-4 font-mono text-[11px] text-white/30 text-left h-[300px] overflow-y-auto custom-scrollbar">
                    <p>&gt; MKI_KERNEL SEALED: 0x82...A5</p>
                    <p>&gt; LUMINA AUDIT COMPLETE (Tier 10)</p>
                    <p>&gt; TELEMETRY EXTRACTION GATED...</p>
                    <p className="text-cyan-glow">&gt; SOVEREIGN HANDSHAKE ESTABLISHED.</p>
                    <p>&gt; ARCHITECT: KIMANI_J</p>
                    <p>&gt; STATUS: UNDETECTABLE.</p>
                </div>
            </div>
        </LiquidReveal>
    </section>
);

const TermsPage = () => (
    <section className="min-h-screen pt-48 px-6 lg:px-12 pb-20 w-full max-w-4xl mx-auto">
        <LiquidReveal>
            <h1 className="text-4xl lg:text-6xl font-black mb-12">SOVEREIGN TERMS.</h1>
            <div className="space-y-12 text-white/60 font-serif leading-relaxed text-lg pb-32">
                <div className="space-y-4">
                    <h3 className="text-white font-sans font-bold text-2xl uppercase tracking-widest">1. The Void Protocol</h3>
                    <p>By accessing the Lumina Horizon architecture, you operate under Absolute Zero Telemetry. Your data is your sovereign property. We do not extract, trace, or syndicate your operations.</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-white font-sans font-bold text-2xl uppercase tracking-widest">2. Cryptographic Sanctity</h3>
                    <p>Your encryption keys are stored exclusively at Ring-0 on your local device. In the event of catastrophic physical breach, the hardware layer will permanently seal all accessible syndrome vectors.</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-white font-sans font-bold text-2xl uppercase tracking-widest">3. Isomorphic Isolation</h3>
                    <p>Any third-party application run inside the Sandbox is strictly prohibited from executing out-of-bounds network calls. Attempts by applications to exfiltrate behavioral data will result in immediate API termination.</p>
                </div>
            </div>
        </LiquidReveal>
    </section>
);

const PAPERS_DATA: Record<string, { title: string, vol: string, abstract: string, body: string[] }> = {
    "1": {
        title: "RESTRICTED COMPILER: ZERO-TELEMETRY RUNTIME ISOLATION",
        vol: "Vol. I",
        abstract: "Commercial operating systems log execution traces via Ring-1 kernel hooks. Lumina Horizon bypasses this utilizing a restricted runtime compiler that strips generic tracking hooks prior to binary compilation.",
        body: [
            "Lumina's compiler explicitly denies any process attempting to mount telemetry sockets across the internal bridge.",
            "By mapping process execution explicitly to isolated hardware blocks, the 'Zero-Telemetry' protocol forms an impenetrable barrier.",
            "Any application executed within this runtime is forced into a mathematically blind envelope, rendering extraction hooks completely inoperable."
        ]
    },
    "2": {
        title: "HARDWARE-LEVEL CRYPTOGRAPHIC SANDBOXING",
        vol: "Vol. II",
        abstract: "Legacy operating systems utilize an inherently parasitic architecture, relying on O(N²) software-level data extraction hooks. The Lumina Horizon architecture flips this paradigm by employing topographical memory constraints directly embedded below the OS kernel layer.",
        body: [
            "Furthermore, by embedding the cryptographic keys within the hardware abstraction layer (Ring-0) using Syndrome Sealing, we achieve absolute mathematical deterrence against arbitrary memory reads (AMR) perpetrated by embedded tracking modules from tech giants.",
            "This document details the proofs demonstrating the impossibility of telemetry egress when the system is operating in 'Zenith' mode, rendering side-channel analysis practically irrelevant via isomorphic state resets.",
            "In standard configurations, whenever an application requests user location or input telemetry, the native Sandbox supplies perfectly generated deterministic noise, confusing upstream corporate aggregators without breaking the application runtime."
        ]
    },
    "3": {
        title: "SYNDROME SEALING: AN ANALYSIS",
        vol: "Vol. III",
        abstract: "Syndrome Sealing represents the highest echelon of process obfuscation. Utilizing principles derived from quantum topology, Lumina protects running memory blocks through active error-correction checks.",
        body: [
            "Standard extraction attempts trigger an immediate syndrome flag, invalidating the memory boundary and locking down the host process.",
            "This active 'sealing' technique generates zero friction for the legitimate user but forces infinite loop latencies on any process trying to parse restricted data.",
            "We detail the specific mathematical boundaries established by the Syndrome Seal, proving its resilience against both passive scanning and active heuristic analysis."
        ]
    },
    "4": {
        title: "ISOMORPHIC APP COMPILATION",
        vol: "Vol. IV",
        abstract: "The Lumina Sandbox allows standard Android, Windows, Apple, and Linux applications to run natively while entirely cutting off their extraction mechanisms. We call this 'Isomorphic Compilation.'",
        body: [
            "An isomorphic boundary mimics the host operating system precisely. The target application requests location data, network diagnostics, or hardware IDs to profile the user.",
            "Instead of simply denying the request (which often crashes these apps), Lumina serves the app an isomorphic blank slate. The app operates normally, but it lives in a void.",
            "This enables users to operate notoriously aggressive data-mining applications without surrendering a single kilobyte of genuine personal telemetry."
        ]
    }
};

const PaperPage = () => {
    const location = useLocation();
    const id = location.pathname.split('/').pop() || "1";
    const paper = PAPERS_DATA[id] || PAPERS_DATA["1"];

    return (
        <section className="min-h-screen pt-40 lg:pt-48 px-6 lg:px-12 pb-20 w-full max-w-4xl mx-auto flex flex-col">
            <LiquidReveal>
                <div className="mb-12">
                    <Link to="/research" className="text-cyan-glow hover:text-white uppercase tracking-widest text-xs font-bold mb-8 inline-block transition-colors cursor-none">
                        ← Return to Archives
                    </Link>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight max-w-3xl">{paper.title}</h1>
                    <p className="uppercase tracking-widest text-resonance text-xs md:text-sm font-bold border-b border-white/10 pb-8">Authorized Personnel Only / {paper.vol}</p>
                </div>

                <div className="space-y-8 text-white/70 font-serif text-base md:text-lg leading-loose pb-32">
                    <p><b className="text-white font-sans text-sm md:text-base tracking-widest">ABSTRACT:</b> {paper.abstract}</p>
                    {paper.body.map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            </LiquidReveal>
        </section>
    );
};

const ResearchPage = () => (
    <div className="pt-20 min-h-screen">
        <ResearchSection />
    </div>
);

function PageWrapper() {
    const location = useLocation();

    useEffect(() => {
        // Immediate scroll to top fix for React Router + Lenis overlap
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handle = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handle);
        return () => window.removeEventListener("scroll", handle);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-[100] px-4 lg:px-12 py-4 lg:py-6 flex items-center justify-between transition-all duration-500 border-b border-transparent",
            scrolled ? "bg-[#050505]/90 backdrop-blur-xl border-white/5 h-20 shadow-2xl" : "bg-transparent h-28"
        )}>
            <div className="flex items-center gap-4 lg:gap-6 pointer-events-auto">
                <Link to="/" className="cursor-none flex items-center gap-3 lg:gap-4 group">
                    <div className="h-10 w-10 glass-gate rounded-2xl flex items-center justify-center border-white/10 group-hover:border-cyan-glow/40 transition-all bg-black/40">
                        <img src="/logo.png" alt="Lumina" className="w-8 h-8 group-hover:scale-110 transition-transform object-contain" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 hidden md:block">Lumina Horizon</span>
                </Link>
            </div>

            <div className="flex items-center gap-3 md:gap-6 lg:gap-12 pointer-events-auto">
                <Link to="/registry" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all cursor-none hidden sm:block">Registry</Link>
                <Link to="/research" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all cursor-none hidden sm:block">Research</Link>
                <Link to="/portal" className="px-5 lg:px-8 py-2.5 lg:py-3 glass-gate rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-cyan-glow shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:bg-cyan-glow hover:text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all cursor-none border border-cyan-glow/30">
                    Access Portal
                </Link>
            </div>
        </nav>
    );
};

export default function App() {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 1.2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    return (
        <Router>
            <div className="relative min-h-screen bg-void text-white selection:bg-cyan-glow/20 selection:text-cyan-glow overflow-hidden font-sans flex flex-col">
                <SovereignCursor />
                <div className="noise-filter" />

                <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                    <Canvas>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]} />
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={2} color="#00f3ff" />
                        <pointLight position={[-10, -10, -10]} intensity={2} color="#a78bfa" />
                        <HorizonTorus />
                    </Canvas>
                </div>

                <Navbar />

                <main className="relative z-10 w-full flex-1">
                    <PageWrapper />
                </main>

                <footer className="relative z-20 mt-auto py-16 lg:py-24 px-6 lg:px-12 border-t border-white/5 bg-black flex flex-col xl:flex-row justify-between gap-16 text-[10px] font-medium uppercase tracking-[0.4em] lg:tracking-[0.5em] text-white/20 items-start">
                    <div className="space-y-4">
                        <Link to="/" className="text-white hover:text-cyan-glow transition-all cursor-none flex items-center gap-3 w-max">
                            <img src="/logo.png" alt="Lumina" className="w-6 h-6 object-contain" />
                            LUMINA HORIZON
                        </Link>
                        <p className="text-white/40 mt-4 leading-relaxed tracking-widest">Architect: Jack Kimani</p>
                        <p className="leading-relaxed tracking-widest">Security Auditor: Sovereign Tier 10</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 lg:gap-24 w-full xl:w-auto">
                        <div className="space-y-4">
                            <span className="text-white/60 font-black tracking-widest border-b border-white/10 pb-2 inline-block">LEGACY</span>
                            <div className="flex flex-col gap-4 mt-4">
                                <a href="https://github.com/Hope8188/Lumina" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-glow transition-colors cursor-none text-white/50 w-max leading-loose tracking-widest">GitHub Repository</a>
                                <Link to="/registry" className="hover:text-cyan-glow transition-colors cursor-none text-white/50 w-max leading-loose tracking-widest">Active Nodes</Link>
                                <Link to="/portal" className="hover:text-cyan-glow transition-colors cursor-none text-white/50 w-max leading-loose tracking-widest">Install Application</Link>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <span className="text-white/60 font-black tracking-widest border-b border-white/10 pb-2 inline-block">SOVEREIGN</span>
                            <div className="flex flex-col gap-4 mt-4">
                                <Link to="/proof" className="hover:text-resonance transition-colors cursor-none text-white/50 w-max leading-loose tracking-widest">Technical Proof</Link>
                                <Link to="/research" className="hover:text-resonance transition-colors cursor-none text-white/50 w-max leading-loose tracking-widest">Research Papers</Link>
                                <Link to="/terms" className="hover:text-resonance transition-colors cursor-none text-white/50 w-max leading-loose tracking-widest">Sovereign Terms</Link>
                            </div>
                        </div>
                        <div className="flex items-start mt-6 sm:mt-0 xl:ml-auto">
                            <div className="px-6 py-4 bg-white/5 rounded-xl border border-white/10 text-cyan-glow tracking-[0.2em] font-black relative overflow-hidden group">
                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-glow group-hover:h-full transition-all opacity-10" />
                                <span className="relative z-10 w-max">PERSONAL SOVEREIGNTY.</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}
