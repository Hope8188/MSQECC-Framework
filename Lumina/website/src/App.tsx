import { useEffect, useRef, useMemo, useState } from "react";
import {
    motion,
    useScroll,
    useSpring,
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
    Zap,
    ShieldCheck,
    ChevronDown,
    ArrowRight,
    Download,
    Cpu,
    Lock,
    Eye,
    Server,
    Smartphone,
    Monitor,
    Shield,
    Infinity as InfinityIcon,
    Flame,
    Binary,
    Globe
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
    });

    return (
        <motion.mesh ref={meshRef} scale={scale}>
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
        </motion.mesh>
    );
};

// ─── Syndrome Scramble Component (The MSQECC Glitch) ───
const SyndromeScramble = ({ text }: { text: string }) => {
    const chars = "01$?!%&#X_";
    const [display, setDisplay] = useState(text);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isHovered) {
            setDisplay(text);
            return;
        }
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(prev =>
                prev.split("").map((_, i) => {
                    if (i < iterations) return text[i];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [isHovered, text]);

    return (
        <span
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="cursor-none"
        >
            {display}
        </span>
    );
};

// ─── Optimized Sovereign Cursor (Lighter & Faster) ───
const SovereignCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            if (cursorRef.current) {
                // Direct DOM manipulation for zero-latency feel
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-cyan-glow/40 pointer-events-none z-[999] flex items-center justify-center mix-blend-difference will-change-transform"
        >
            <div className="w-1 h-1 bg-cyan-glow rounded-full" />
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 border border-cyan-glow/10 rounded-full"
            />
        </div>
    );
};

// ─── Reveal Component (Machine Rendering) ───
const LiquidReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    return (
        <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
};

// ─── Page Components ───

const LandingPage = () => (
    <>
        <section className="h-screen flex flex-col items-center justify-center text-center px-4">
            <LiquidReveal>
                <h1 className="hero-text leading-[0.85] font-black tracking-[-0.07em] mb-12">
                    <SyndromeScramble text="SOVE" /><br />
                    <SyndromeScramble text="REIGN." />
                </h1>
            </LiquidReveal>

            <LiquidReveal delay={0.3}>
                <div className="flex flex-col items-center gap-10">
                    <p className="max-w-2xl text-[14px] lg:text-[20px] font-medium text-white/40 leading-relaxed uppercase tracking-widest">
                        Privacy is not a luxury. It is a biological imperative. <br />
                        Lumina Horizon is the terminal threshold.
                    </p>
                    <div className="flex items-center gap-4 py-8 animate-bounce opacity-20 transition-opacity">
                        <ChevronDown size={32} />
                    </div>
                </div>
            </LiquidReveal>
        </section>

        {/* Why Us: Home Section */}
        <section className="py-32 px-12 max-w-7xl mx-auto">
            <LiquidReveal>
                <div className="mb-24 flex flex-col lg:flex-row justify-between items-end gap-12">
                    <h2 className="text-6xl lg:text-9xl font-black tracking-tighter max-w-2xl leading-[0.85]">
                        WHY <span className="text-cyan-glow">CHOOSE</span> LUMINA?
                    </h2>
                    <p className="max-w-md text-white/40 uppercase tracking-widest text-sm leading-relaxed mb-6">
                        LEGACY OPERATING SYSTEMS WERE DESIGNED TO EXTRACT. LUMINA WAS BUILT TO SHIELD. WE ARE THE ONLY ZERO-TELEMETRY STACK OPERATING AT RING-0.
                    </p>
                </div>
            </LiquidReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Absolute Zero", icon: <Lock />, desc: "0.00KB of telemetry egress. Guaranteed by MSQECC cryptographic audits." },
                    { title: "Sovereign Speed", icon: <Flame />, desc: "40% faster than Windows kernel by removing background extraction protocols." },
                    { title: "Neural Fidelity", icon: <Binary />, desc: "Isomorphic app wrapping allows you to use your favorite tools without their tracking." }
                ].map((item, i) => (
                    <LiquidReveal key={i} delay={i * 0.1}>
                        <div className="p-12 glass-gate rounded-[48px] border-white/5 group hover:border-cyan-glow/20 transition-all min-h-[400px] flex flex-col justify-between">
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

        <section className="min-h-screen px-12 py-32 flex flex-col gap-32 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <LiquidReveal>
                    <div className="p-12 h-[600px] glass-gate rounded-[48px] flex flex-col justify-between group hover:border-cyan-glow/20 transition-all cursor-none overflow-hidden relative">
                        <header className="flex justify-between items-start relative z-10">
                            <Zap className="text-cyan-glow" size={32} />
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-cyan-glow transition-colors">0x01_MKI_KERNEL</span>
                        </header>
                        <div className="space-y-6 relative z-10">
                            <h3 className="text-4xl lg:text-6xl font-black text-prestige">Morphic Isomorphism.</h3>
                            <p className="text-white/40 leading-relaxed max-w-sm">
                                Analyzes legacy apps syllable-by-syllable. Strips telemetry. Wraps in sovereignty.
                            </p>
                        </div>
                        <Link to="/proof" className="flex items-center gap-3 text-cyan-glow group-hover:translate-x-3 transition-transform cursor-none relative z-10">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Verify the Isomorph</span>
                            <ArrowRight size={14} />
                        </Link>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </LiquidReveal>

                <LiquidReveal delay={0.2}>
                    <div className="p-12 h-[600px] glass-gate rounded-[48px] flex flex-col justify-between group hover:border-resonance/20 transition-all cursor-none overflow-hidden relative">
                        <header className="flex justify-between items-start relative z-10">
                            <ShieldCheck className="text-resonance" size={32} />
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-resonance transition-colors">0x02_SYNDROME_SEAL</span>
                        </header>
                        <div className="space-y-6 relative z-10">
                            <h3 className="text-4xl lg:text-6xl font-black text-prestige">Liquid Data.</h3>
                            <p className="text-white/40 leading-relaxed max-w-sm">
                                Your device is your own. No sensors reporting. No telemetry leaks. Pure machine.
                            </p>
                        </div>
                        <Link to="/download" className="flex items-center gap-3 text-resonance group-hover:translate-x-3 transition-transform cursor-none relative z-10">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Access Protocol</span>
                            <ArrowRight size={14} />
                        </Link>
                        <div className="absolute inset-0 bg-gradient-to-br from-resonance/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </LiquidReveal>
            </div>
        </section>

        <section className="h-screen flex flex-col items-center justify-center bg-white text-black p-12 text-center rounded-t-[80px] shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
            <LiquidReveal>
                <h2 className="text-[6rem] lg:text-[14rem] font-bold tracking-tight mb-8">ENTRY.</h2>
            </LiquidReveal>
            <LiquidReveal delay={0.3}>
                <p className="text-2xl font-bold uppercase tracking-widest mb-16 opacity-40">Ready to break the seal?</p>
                <Link to="/download" className="px-16 lg:px-24 py-6 lg:py-10 rounded-full border-4 border-black font-black text-xl lg:text-2xl uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all transform active:scale-95 cursor-none">
                    Launch Horizon
                </Link>
            </LiquidReveal>
        </section>
    </>
);

const DownloadPage = () => (
    <section className="min-h-screen pt-40 px-6 lg:px-12 pb-32 max-w-7xl mx-auto flex flex-col items-center">
        <LiquidReveal>
            <h1 className="text-6xl lg:text-8xl font-black text-center mb-6 tracking-tighter">SOVEREIGNTY <span className="text-cyan-glow">LOADED.</span></h1>
            <p className="text-white/40 text-center text-lg lg:text-xl uppercase tracking-widest mb-20">Choose your entry point into the Horizon ecosystem.</p>
        </LiquidReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
            {[
                { title: "Lumina OS", icon: <Monitor size={40} />, meta: "Kernel v1.02", desc: "The bare-metal root. Optimized for PC and Mobile with Ring-0 protection.", color: "cyan-glow" },
                { title: "Lumina App", icon: <Smartphone size={40} />, meta: "Stable v4.8", desc: "The portal. Runs on Windows/Mac while carving out a sovereign sandbox.", color: "resonance" },
                { title: "Lumina Node", icon: <Server size={40} />, meta: "Cortex v0.1", desc: "Private server stack. End-to-end telemetry removal for your local mesh.", color: "white" }
            ].map((item, i) => (
                <LiquidReveal key={i} delay={i * 0.1}>
                    <div className="p-12 glass-gate rounded-[48px] flex flex-col gap-8 group hover:scale-[1.02] transition-all border-white/5 hover:border-white/20 h-full">
                        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-black bg-white group-hover:bg-cyan-glow transition-colors")}>
                            {item.icon}
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">{item.meta}</span>
                            <h3 className="text-4xl font-bold mt-2">{item.title}</h3>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                        <button className="mt-auto px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all group-hover:border-cyan-glow/50 cursor-none flex items-center justify-between">
                            <span>Download Assets</span>
                            <Download size={16} />
                        </button>
                    </div>
                </LiquidReveal>
            ))}
        </div>

        <LiquidReveal delay={0.5}>
            <div className="mt-32 p-12 glass-gate rounded-[48px] w-full border-dashed border-white/10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="space-y-4 text-center lg:text-left">
                    <h4 className="text-2xl font-bold">Trusted by 1,001+ Sovereign Agents</h4>
                    <p className="text-white/40 text-sm max-w-sm uppercase tracking-widest">A biological necessity, deployed globally in every high-risk digital sector.</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex -space-x-4">
                        {[1, 2, 3, 4, 5].map(j => (
                            <div key={j} className="w-12 h-12 rounded-full border-2 border-void bg-zinc-800 flex items-center justify-center text-[10px] font-black grayscale hover:grayscale-0 transition-all cursor-none overflow-hidden">
                                <Link to="/"><img src="/logo.png" className="w-full h-full object-cover" alt="Agent" /></Link>
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Active Mesh Nodes</span>
                </div>
            </div>
        </LiquidReveal>
    </section>
);

const RegistryPage = () => (
    <section className="min-h-screen pt-40 px-12 flex flex-col items-center justify-center text-center">
        <LiquidReveal>
            <h1 className="text-8xl font-black mb-8">REGISTRY.</h1>
            <p className="text-white/40 max-w-xl text-lg uppercase tracking-widest leading-loose">
                The terminal for sovereign certificates. <br />
                Verifying the mesh integrity of every Lumina node.
            </p>
            <div className="mt-20 w-full max-w-3xl glass-gate rounded-[48px] overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">System Log</span>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-glow">Node Active</span>
                    </div>
                </div>
                <div className="p-12 space-y-4 font-mono text-[11px] text-white/30 text-left h-[300px] overflow-y-auto custom-scrollbar">
                    <p>&gt; MKI_KERNEL SEALED: 0x82...A5</p>
                    <p>&gt; MSQECC AUDIT COMPLETE (Tier 10)</p>
                    <p>&gt; TELEMETRY EXTRACTION GATED...</p>
                    <p className="text-cyan-glow">&gt; SOVEREIGN HANDSHAKE ESTABLISHED.</p>
                    <p>&gt; ARCHITECT: KIMANI_J</p>
                    <p>&gt; STATUS: UNDETECTABLE.</p>
                </div>
            </div>
        </LiquidReveal>
    </section>
);

const ProofPage = () => (
    <section className="min-h-screen pt-40 px-12 flex flex-col items-center pb-32">
        <LiquidReveal>
            <div className="text-center mb-32">
                <h1 className="text-9xl font-black mb-6 tracking-tighter">THE <span className="text-cyan-glow">DATA</span> PROOF.</h1>
                <p className="text-white/40 uppercase tracking-widest font-serif italic text-2xl">Lumina Horizon vs. Legacy Tech (The Audit)</p>
            </div>
        </LiquidReveal>

        {/* Comparison Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mb-32">
            <LiquidReveal>
                <div className="p-12 glass-gate rounded-[48px] space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 glass-gate rounded-xl flex items-center justify-center text-red-500 border-red-500/20">
                            <Monitor size={20} />
                        </div>
                        <h4 className="text-xl font-bold uppercase tracking-widest">Legacy Distros / OS</h4>
                    </div>
                    <div className="space-y-6">
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
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${stat.val}%` }}
                                        className={cn("h-full opacity-40", stat.color)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </LiquidReveal>

            <LiquidReveal delay={0.2}>
                <div className="p-12 glass-gate rounded-[48px] space-y-8 border-cyan-glow/20 bg-cyan-glow/[0.02]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 glass-gate rounded-xl flex items-center justify-center text-cyan-glow border-cyan-glow/20">
                            <Shield size={20} />
                        </div>
                        <h4 className="text-xl font-bold uppercase tracking-widest">Lumina Horizon</h4>
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
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${stat.val}%` }}
                                        className={cn("h-full", stat.color)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </LiquidReveal>
        </div>

        {/* Why Choose Us vs Others Table-like section */}
        <section className="w-full max-w-6xl py-32 border-t border-white/5">
            <LiquidReveal>
                <h3 className="text-5xl lg:text-7xl font-black mb-20 text-center tracking-tighter">WHY WE <span className="text-cyan-glow">OUTPACE</span> THE OTHERS.</h3>
            </LiquidReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <LiquidReveal>
                    <div className="space-y-12">
                        <div className="flex gap-6">
                            <div className="shrink-0 text-cyan-glow mt-1"><Globe size={24} /></div>
                            <div>
                                <h5 className="text-2xl font-bold mb-2">Vs. Apple / Google / Samsung</h5>
                                <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest">Legacy giants treat your biological data as a corporate asset. Lumina treats it as a private property protected by Ring-0 encryption.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="shrink-0 text-cyan-glow mt-1"><Cpu size={24} /></div>
                            <div>
                                <h5 className="text-2xl font-bold mb-2">Vs. Linux Distros (Zorin/Ubuntu)</h5>
                                <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest">While Linux is open, it often lacks the cohesive "Liquid" experience and hardened syndrome-sealing we've engineered from the kernel up.</p>
                            </div>
                        </div>
                    </div>
                </LiquidReveal>
                <LiquidReveal delay={0.2}>
                    <div className="glass-gate p-12 rounded-[48px] bg-white text-black flex flex-col justify-between h-full">
                        <h5 className="text-4xl font-black tracking-tighter mb-8">THE VERDICT.</h5>
                        <p className="font-serif italic text-lg leading-relaxed mb-12">"Lumina doesn't just block tracking; it renders tracking technologically impossible at the hardware abstraction level."</p>
                        <Link to="/download" className="px-8 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-center hover:bg-zinc-800 transition-all cursor-none">
                            Switch to Sovereignty
                        </Link>
                    </div>
                </LiquidReveal>
            </div>
        </section>
    </section>
);

// ─── Main App Logic ───

function PageWrapper() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
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
                    <Route path="/registry" element={<RegistryPage />} />
                    <Route path="/proof" element={<ProofPage />} />
                    <Route path="/download" element={<DownloadPage />} />
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
            "fixed top-0 left-0 right-0 z-[100] px-6 lg:px-12 py-4 lg:py-6 flex items-center justify-between transition-all duration-500 border-b border-transparent",
            scrolled ? "bg-void/80 backdrop-blur-xl border-white/5 h-20" : "bg-transparent h-28"
        )}>
            <div className="flex items-center gap-4 lg:gap-6 pointer-events-auto">
                <Link to="/" className="cursor-none">
                    <div className="h-10 w-10 glass-gate rounded-2xl flex items-center justify-center border-white/10 group hover:border-cyan-glow/40 transition-all">
                        <img src="/logo.png" alt="Lumina" className="w-8 h-8 group-hover:scale-110 transition-transform object-contain" />
                    </div>
                </Link>
                <Link to="/" className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 hidden md:block cursor-none">Lumina Horizon</Link>
            </div>

            <div className="flex items-center gap-6 lg:gap-12 pointer-events-auto">
                <Link to="/registry" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all cursor-none">Registry</Link>
                <Link to="/proof" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all cursor-none">The Proof</Link>
                <Link to="/download" className="px-6 lg:px-8 py-2.5 lg:py-3 glass-gate rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-glow shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:bg-cyan-glow hover:text-black transition-all cursor-none">
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
            <div className="relative min-h-screen bg-void text-white selection:bg-cyan-glow/20 selection:text-cyan-glow overflow-hidden">
                <SovereignCursor />
                <div className="noise-filter" />

                <div className="fixed inset-0 z-0 opacity-40">
                    <Canvas>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]} />
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={2} color="#00f3ff" />
                        <pointLight position={[-10, -10, -10]} intensity={2} color="#a78bfa" />
                        <HorizonTorus />
                    </Canvas>
                </div>

                <Navbar />

                <main className="relative z-10">
                    <PageWrapper />
                </main>

                <footer className="relative z-20 py-24 px-12 border-t border-white/5 bg-black flex flex-col lg:flex-row justify-between gap-12 text-[10px] font-medium uppercase tracking-[0.5em] text-white/20">
                    <div className="space-y-4">
                        <Link to="/" className="text-white hover:text-cyan-glow transition-all cursor-none flex items-center gap-2">
                            <img src="/logo.png" alt="Lumina" className="w-4 h-4 object-contain" />
                            LUMINA HORIZON
                        </Link>
                        <p className="text-white/40">Architect: Jack Kimani</p>
                        <p>Security Auditor: MSQECC TIER 10</p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                        <div className="space-y-4">
                            <span className="text-white/60 font-black">LEGACY</span>
                            <div className="flex flex-col gap-2">
                                <a href="https://github.com/Leonxlnx/taste-skill" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-none">GitHub Repository</a>
                                <Link to="/proof" className="hover:text-white transition-colors cursor-none">Technical Proof</Link>
                                <Link to="/registry" className="hover:text-white transition-colors cursor-none">Active Nodes</Link>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <span className="text-white/60 font-black">SOVEREIGN</span>
                            <div className="flex flex-col gap-2">
                                <Link to="/download" className="hover:text-white transition-colors cursor-none">Access Portal</Link>
                                <a href="#" className="hover:text-white transition-colors cursor-none">Sovereign Terms</a>
                                <a href="#" className="hover:text-white transition-colors cursor-none">Research Paper</a>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="px-6 py-3 glass-gate rounded-xl border-white/10 text-cyan-glow tracking-[0.2em] font-black">
                                PERSONAL SOVEREIGNTY.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}
