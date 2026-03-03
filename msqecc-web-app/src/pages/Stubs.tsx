import React from 'react';
import { GalaxyCalculator } from '../components/GalaxyCalculator';
import { QuantumNoiseSimulator } from '../components/QuantumNoiseSimulator';
import { ConstantOptimizer } from '../components/ConstantOptimizer';
import { NullTracker } from '../components/NullTracker';
import { RevealBlock } from '../components/RevealBlock';
import { HiggsTopologyTest } from '../components/HiggsTopologyTest';
import { LambdaSaturationTest } from '../components/LambdaSaturationTest';
import { AlphaFineStructure } from '../components/AlphaFineStructure';
import { KimaniEfficiency } from '../components/KimaniEfficiency';

import { Theory } from './Theory';
export const Reproducibility = () => (
    <div className="w-full h-full flex flex-col font-geist">
        <RevealBlock>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-12 md:mb-16 uppercase tracking-tight">Code & Data Reproducibility</h2>
        </RevealBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealBlock delay={0.2}>
                <div className="border border-zinc-800 bg-void p-8 h-full flex flex-col">
                    <h3 className="text-2xl font-bold font-mono text-white mb-6">MSQECC Empirical Core (Python)</h3>
                    <p className="text-zinc-500 font-mono text-sm flex-grow mb-8">
                        The entire SPARC galaxy rotation curve verification suite and the topological derivations for the 5 fundamental constants (alpha, Lambda, m_H, k, N_gen) are compiled here in raw Python formats. Run them locally to verify the mathematics.
                    </p>
                    <a href="/MSQECC_Testing_Code.zip" download className="block border border-white text-center py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-transparent hover:text-white transition-colors">
                        Download Code Package (ZIP)
                    </a>
                </div>
            </RevealBlock>

            <RevealBlock delay={0.4} direction="right">
                <div className="border border-zinc-800 bg-void p-8 h-full flex flex-col">
                    <h3 className="text-2xl font-bold font-mono text-white mb-6">SPARC Database Archive</h3>
                    <p className="text-zinc-500 font-mono text-sm flex-grow mb-8">
                        All astrophysical evidence stems from the Spitzer Photometry and Accurate Rotation Curves (SPARC) database. The sample contains 171 individual rotating galaxies across distinct morphologies and baryonic masses.
                    </p>
                    <a href="http://astroweb.cwru.edu/SPARC/" target="_blank" rel="noreferrer" className="block border border-zinc-800 text-center py-4 bg-zinc-900/50 text-white font-bold uppercase tracking-widest text-sm hover:border-entanglement hover:text-entanglement transition-colors">
                        Access External SPARC Data
                    </a>
                </div>
            </RevealBlock>
        </div>

        <RevealBlock delay={0.6}>
            <div className="mt-12 border border-zinc-800 bg-void p-8 w-full flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-grow">
                    <h3 className="text-2xl font-bold font-mono text-entanglement mb-4 uppercase tracking-widest">Radical Transparency & Independent Research</h3>
                    <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-4">
                        The MSQECC Framework is published via an independent research model outside traditional institutional affiliations. In modern theoretical physics, the burden of proof scales inversely with institutional pedigree. To counter this, MSQECC is engineered strictly around open-source radical transparency.
                    </p>
                    <p className="text-zinc-500 font-mono text-xs leading-relaxed">
                        Rather than appealing to authority, we appeal to the compiler. Every claim is falsifiable. Every equation is computable. The Python notebooks accompanying this architecture demonstrate precisely how the empirical bounds are established. Execute the codebase, challenge the derivations, and let the data govern the physics.
                    </p>
                </div>
            </div>
        </RevealBlock>
    </div>
);
export const Verification = () => (
    <div className="w-full h-full flex flex-col font-geist">
        <RevealBlock>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-12 md:mb-16 uppercase tracking-tight">Falsification Challenge</h2>
        </RevealBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealBlock delay={0.2}>
                <NullTracker />
            </RevealBlock>
            <RevealBlock delay={0.4} direction="right">
                <div className="flex flex-col gap-8 h-full">
                    <div className="border border-zinc-800 bg-void p-6 font-mono text-sm flex-1">
                        <h3 className="text-xl font-bold font-geist text-red-500 tracking-widest mb-6 uppercase flex items-center gap-4">
                            <div className="w-2 h-2 bg-red-500 animate-pulse" />
                            SUBMIT A FATAL FLAW
                        </h3>
                        <p className="text-zinc-500 mb-6">
                            If you have identified a mathematical error in the derivation of the boundary equations, or observational data that cleanly falsifies the SPARC correlations (beyond standard expected scatter), submit the issue directly to the MSQECC repository.
                        </p>
                        <a href="https://github.com/Hope8188/MSQECC-Framework/issues/new" target="_blank" rel="noreferrer" className="inline-block bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white transition-colors px-6 py-3 uppercase tracking-widest font-bold">
                            Open GitHub Issue
                        </a>
                    </div>

                    <div className="border border-zinc-800 bg-void p-6 font-mono text-sm">
                        <h3 className="text-xl font-bold font-geist text-entanglement tracking-widest mb-6 uppercase flex items-center gap-4">
                            DIRECT CONTACT
                        </h3>
                        <p className="text-zinc-500 mb-6">
                            For scholarly validation, critical academic inquiries, or press, you may contact the core architect, Jack Kimani, directly below.
                        </p>
                        <a href="mailto:jackkimani.physics@proton.me?subject=MSQECC%20Academic%20Inquiry" className="inline-flex items-center gap-3 w-full border border-entanglement/50 bg-entanglement/10 text-entanglement hover:bg-entanglement hover:text-black transition-colors px-6 py-4 uppercase tracking-widest font-bold">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeDasharray="2" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            jackkimani.physics@proton.me
                        </a>
                    </div>
                </div>
            </RevealBlock>
        </div>

        <RevealBlock delay={0.6}>
            <div className="mt-12 border border-red-500/20 bg-red-500/5 p-8">
                <h3 className="text-2xl font-bold font-mono text-red-500 mb-6 uppercase tracking-widest">Active Research Frontier (Known Vulnerabilities)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm leading-relaxed">
                    <div className="space-y-4">
                        <p className="text-white font-bold">1. Absence of Microscopic Lagrangian</p>
                        <p className="text-zinc-400">Current derivations operate at the Effective Field Theory (EFT) level. MSQECC identifies the Hamiltonian and boundary states, but the non-perturbative microscopic action remains an open problem (OP6).</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-white font-bold">2. Fine Structure Constant Bound</p>
                        <p className="text-zinc-400">While MSQECC establishes the geometric fault-tolerance threshold ($\alpha {"<"} 0.1093$), the precise analytical value of 1/137.036 remains an open sufficiency problem (OP1).</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-white font-bold">3. SPARC Variance (18%)</p>
                        <p className="text-zinc-400">The 18% scatter in rotation curve fits is hypothesized as Environment Boundary Terms. Verification of environmental correlation (field vs. cluster) is required to eliminate phenomenological fits.</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-white font-bold">4. Topologically Derived Mass Scales</p>
                        <p className="text-zinc-400">The Higgs mass correction is currently framed as a phenomenological shift derived from maintained code distance. A fully derived topological diagram is required to move from 'correction' to 'proof'.</p>
                    </div>
                </div>
            </div>
        </RevealBlock>
    </div>
);

export const Lab = () => (
    <div className="w-full h-full flex flex-col font-geist">
        <RevealBlock>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-12 md:mb-16 uppercase tracking-tight">The Living Laboratory</h2>
        </RevealBlock>
        <div className="grid grid-cols-1 gap-12 pb-24">
            <RevealBlock delay={0.2}>
                <GalaxyCalculator />
            </RevealBlock>
            <RevealBlock delay={0.25}>
                <KimaniEfficiency />
            </RevealBlock>
            <RevealBlock delay={0.3}>
                <QuantumNoiseSimulator />
            </RevealBlock>
            <RevealBlock delay={0.4}>
                <LambdaSaturationTest />
            </RevealBlock>
            <RevealBlock delay={0.5}>
                <HiggsTopologyTest />
            </RevealBlock>
            <RevealBlock delay={0.6}>
                <AlphaFineStructure />
            </RevealBlock>
            <RevealBlock delay={0.7}>
                <ConstantOptimizer />
            </RevealBlock>
        </div>
    </div>
);
