import React from 'react';
import { RevealBlock } from '../components/RevealBlock';

export const Theory = () => (
    <div className="w-full h-full flex flex-col font-geist text-superposition">
        <RevealBlock>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tight">The Axioms & Theoretical Framework</h2>
            <div className="bg-zinc-900 border border-zinc-800 p-4 mb-16 inline-block">
                <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                    <span className="text-entanglement font-bold">Disclaimer:</span> Derivations updated March 2026. Subject to ongoing peer verification.
                </p>
            </div>
        </RevealBlock>

        <RevealBlock delay={0.2}>
            <div className="border border-zinc-800 bg-void p-6 md:p-8 mb-12">
                <h3 className="text-xl md:text-2xl font-bold font-mono text-white mb-6">{"1. The Cosmological Constant ($\\Lambda$)"}</h3>
                <p className="mb-4 leading-relaxed font-mono text-xs md:text-sm">
                    {"MSQECC proposes a scaling $\\Lambda \\propto H_0^2/c^2$, addressing the factor of ~2.05 gap through digital horizon saturation:"}
                </p>
                <div className="bg-zinc-900/50 p-4 md:p-6 border-l-4 border-entanglement font-mono mb-4 text-[10px] md:text-xs overflow-x-auto">
                    <span className="block mb-2 text-zinc-400">{"# Information saturation fraction f₁ = ln(2)"}</span>
                    <span className="block text-white mb-2 whitespace-nowrap">{"Effective Causal Length: $L_{eff} = \\frac{c}{H_0} \\cdot \\ln(2)$"}</span>
                    <span className="block text-entanglement font-bold text-base md:text-lg mt-4">{"$\\Lambda = \\frac{1}{(L_{eff})^2} = \\frac{H_0^2}{c^2 \\cdot \\ln^2(2)}$"}</span>
                </div>
            </div>
        </RevealBlock>

        <RevealBlock delay={0.4}>
            <div className="border border-zinc-800 bg-void p-6 md:p-8 mb-12">
                <h3 className="text-xl md:text-2xl font-bold font-mono text-white mb-6">{"2. Geometric Coherence ($k = 3\\pi$)"}</h3>
                <p className="mb-4 leading-relaxed font-mono text-xs md:text-sm">
                    {"The weight $k \\approx 9.425$ ($3\\pi$) is derived from the bulk-to-boundary area ratio of the code manifold:"}
                </p>
                <div className="bg-zinc-900/50 p-4 md:p-6 border-l-4 border-entanglement font-mono mb-4 text-[10px] md:text-xs overflow-x-auto">
                    <span className="block mb-2 text-zinc-400">{"# Topological Index z/R = 6/R"}</span>
                    <span className="block text-white mb-2 whitespace-nowrap">{"Constant: $k = (\\pi R / 2) \\cdot (6/R) = 3\\pi$"}</span>
                    <span className="block text-entanglement font-bold text-base md:text-lg mt-4">{"$k = 3\\pi \\approx 9.4247$"}</span>
                </div>
            </div>
        </RevealBlock>

        <RevealBlock delay={0.5}>
            <div className="border border-zinc-800 bg-void p-6 md:p-8 mb-12">
                <h3 className="text-xl md:text-2xl font-bold font-mono text-white mb-6">{"3. Higgs Mass Stability Shift"}</h3>
                <p className="mb-4 leading-relaxed font-mono text-xs md:text-sm">
                    {"Derived from the energy cost of maintaining code distance within the vacuum network:"}
                </p>
                <div className="bg-zinc-900/50 p-4 md:p-6 border-l-4 border-entanglement font-mono text-[10px] md:text-xs">
                    <span className="block text-entanglement font-bold text-base md:text-lg">{"$m_H = m_{H\\_crit} \\times (1 - \\alpha_W) \\approx 125.25 \\text{ GeV}$"}</span>
                </div>
            </div>
        </RevealBlock>

        <RevealBlock delay={0.6}>
            <div className="space-y-12 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="border border-zinc-800 bg-void p-8">
                        <h3 className="text-2xl font-bold font-mono text-white mb-6">{"4. Term Generations ($N_{gen}=3$)"}</h3>
                        <p className="font-mono text-sm leading-relaxed text-zinc-400">
                            {"For a $D=3$ limiting macroscopic causal network, the most stable error-correcting manifold protecting the code space logic is a 3-torus ($T^3$). The first Betti number $b_1(T^3) = 3$. If fermion families represent the 1-cycle zero modes winding through the quantum error-correcting lattice to cancel gauge anomalies, there MUST be exactly $b_1 = 3$ families."}
                        </p>
                    </div>

                    <div className="border border-zinc-800 bg-void p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-bold font-mono text-white mb-6">{"5. Topological $\\alpha$"}</h3>
                        <p className="font-mono text-xs md:text-sm leading-relaxed text-zinc-400">
                            {"Summation of volumetric, area, and linear topological components of the $S^3 \times S^1$ manifold:"}
                        </p>
                        <div className="bg-zinc-900/50 p-4 border-l-2 border-entanglement mt-4 font-mono text-[10px] md:text-xs text-white">
                            {"$\\alpha^{-1} = 4\\pi^3 + \pi^2 + \pi \\approx 137.0355$"}
                        </div>
                    </div>
                </div>

                <div className="border border-zinc-100/10 bg-white/5 p-8">
                    <h3 className="text-2xl font-bold font-mono text-white mb-6">{"6. Open Problem 6: The Lagrangian ($\mathcal{L}$)"}</h3>
                    <p className="font-mono text-sm leading-relaxed text-zinc-400">
                        {"MSQECC currently operates as a robust **Effective Field Theory (EFT)**. While we derive the Hamiltonian and thermodynamic boundary states, the microscopic non-perturbative action $\mathcal{S} = \int \mathcal{L} d^4x$ remains an ongoing theoretical frontier. Constructing the microscopic physics of the $(3+1)D$ code space from tensor geometry is the primary objective of the next phase of unification."}
                    </p>
                </div>
            </div>
        </RevealBlock>

        <RevealBlock delay={0.8}>
            <div className="flex justify-center md:justify-end mt-8">
                <a href="/MSQECC_Version_VIII_Empirical_Era_Kimani.pdf" target="_blank" className="border border-white/40 px-6 md:px-8 py-4 hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-widest text-[10px] md:text-sm inline-block text-center w-full md:w-auto">
                    Read the Full V8 Paper (PDF)
                </a>
            </div>
        </RevealBlock>
    </div>
);
