import React from 'react';
import { RevealBlock } from '../components/RevealBlock';

export const Home = () => {
    return (
        <div className="flex flex-col gap-12 pt-20">
            <RevealBlock direction="right">
                <h1 className="text-7xl md:text-9xl font-black font-geist tracking-tighter text-balance uppercase">
                    THE UNIVERSE IS A QUANTUM<br />
                    <span className="text-zinc-600 line-through mr-4">ERROR</span><br />
                    <span className="text-entanglement underline decoration-[12px] underline-offset-[24px]">CORRECTING CODE.</span>
                </h1>
            </RevealBlock>

            <RevealBlock delay={0.4}>
                <p className="font-mono text-2xl md:text-4xl max-w-4xl text-zinc-400 mt-8 border-l-4 border-zinc-800 pl-8 space-y-4">
                    <span className="block text-white">We predicted the specific velocity profiles of 171 SPARC galaxies directly from quantum boundary thermodynamics.</span>
                    <span className="block text-entanglement/80">0 Free Parameters per Galaxy.</span>
                    <span className="block text-entanglement/80 italic font-cormorant text-5xl mt-8 border-t border-zinc-800/50 pt-8 tracking-wide">R² = 0.82.</span>
                </p>
            </RevealBlock>

            <RevealBlock delay={0.8}>
                <div className="flex flex-col md:flex-row gap-6 mt-16 font-mono string uppercase text-lg">
                    <a href="/MSQECC_Version_VIII_Empirical_Era_Kimani.pdf" target="_blank" className="border-2 border-white/40 px-10 py-5 hover:bg-white hover:text-black transition-colors font-bold ring-2 ring-inset ring-transparent hover:ring-black whitespace-nowrap text-center">
                        Download Paper v8 (PDF)
                    </a>
                    <a href="/MSQECC_Testing_Code.zip" download className="border-2 border-zinc-800 px-10 py-5 bg-zinc-900/50 hover:bg-zinc-800 transition-colors whitespace-nowrap text-center">
                        Download Verification Code (ZIP)
                    </a>
                </div>
            </RevealBlock>
        </div>
    );
};
