import React from 'react';
import { RevealBlock } from '../components/RevealBlock';

export const Home = () => {
    return (
        <div className="flex flex-col gap-24 pt-32 selection:bg-entanglement/20 selection:text-entanglement">
            {/* Premium Hero Section */}
            <div className="max-w-6xl">
                <RevealBlock direction="up">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-entanglement/10 border border-entanglement/20 text-entanglement text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] font-semibold mb-8 backdrop-blur-md">
                        Empirical Era VIII
                    </span>
                    <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-bold font-geist tracking-[-0.04em] text-white leading-[0.9] text-balance mb-12">
                        Liquid<br />Sovereignty.
                    </h1>
                </RevealBlock>

                <RevealBlock delay={0.4}>
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="flex-1 font-mono text-lg md:text-2xl text-white/40 leading-relaxed border-l border-white/10 pl-8">
                            The universe is a quantum error-correcting code. We've mapped its
                            boundary thermodynamics to <span className="text-white">171 galaxies</span> with
                            zero free parameters.
                        </div>
                        <div className="flex flex-col gap-2 bg-white/[0.03] p-8 rounded-[32px] border border-white/[0.05] backdrop-blur-2xl">
                            <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Accuracy Metric</span>
                            <span className="text-5xl md:text-6xl font-geist font-black text-entanglement/80 shadow-[0_0_30px_rgba(0,243,255,0.1)]">R² = 0.82</span>
                        </div>
                    </div>
                </RevealBlock>
            </div>

            {/* Interaction Matrix */}
            <RevealBlock delay={0.8}>
                <div className="flex flex-wrap gap-6 font-mono uppercase text-sm md:text-base">
                    <a href="http://localhost:1420" target="_blank" className="group rounded-full bg-entanglement px-10 py-5 text-black font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,243,255,0.4)] flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                        Launch Horizon
                    </a>
                    <a href="/MSQECC_Version_VIII_Empirical_Era_Kimani.pdf" target="_blank" className="rounded-full border border-white/10 px-10 py-5 bg-white/[0.03] text-white/80 hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-md font-bold">
                        Read Theory
                    </a>
                    <a href="/MSQECC_Testing_Code.zip" download className="rounded-full border border-white/5 px-10 py-5 text-white/30 hover:text-white/60 transition-colors">
                        Repo Access
                    </a>
                </div>
            </RevealBlock>

            {/* Subtle Telemetry Hint */}
            <RevealBlock delay={1.2}>
                <div className="flex items-center gap-6 opacity-20 hover:opacity-100 transition-opacity duration-1000">
                    <div className="h-[1px] flex-1 bg-gradient-to-right from-transparent via-white/20 to-transparent" />
                    <span className="text-[9px] uppercase tracking-[1em] text-white/50 font-mono">Topological Parity Confirmed</span>
                    <div className="h-[1px] flex-1 bg-gradient-to-right from-transparent via-white/20 to-transparent" />
                </div>
            </RevealBlock>
        </div>
    );
};
