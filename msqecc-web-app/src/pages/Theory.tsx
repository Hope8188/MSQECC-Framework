import React from 'react';
import { RevealBlock } from '../components/RevealBlock';

export const Theory = () => (
    <div className="w-full h-full flex flex-col font-geist text-superposition">
        <RevealBlock>
            <h2 className="text-6xl font-black text-white mb-8 uppercase tracking-tight">The Axioms & Theoretical Framework</h2>
            <div className="bg-zinc-900 border border-zinc-800 p-4 mb-16 inline-block">
                <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                    <span className="text-entanglement font-bold">Disclaimer:</span> Derivations updated March 2026. Open Problems OP1-OP5 resolved via topological constraints. Subject to ongoing peer verification.
                </p>
            </div>
        </RevealBlock>

        <RevealBlock delay={0.2}>
            <div className="border border-zinc-800 bg-void p-8 mb-12">
                <h3 className="text-2xl font-bold font-mono text-white mb-6">{"1. The Cosmological Constant ($\\Lambda$) factor of $1/\\ln^2(2)$"}</h3>
                <p className="mb-4 leading-relaxed font-mono text-sm">
                    {"Previously, MSQECC established the scaling $\\Lambda \\propto H_0^2/c^2$, leaving a factor of ~2.05 gap between prediction and Planck 2018 measurements. This gap has been fundamentally solved geometrically:"}
                </p>
                <div className="bg-zinc-900/50 p-6 border-l-4 border-entanglement font-mono mb-4 text-xs">
                    <span className="block mb-2 text-zinc-400">{"# The Digital Horizon limit demands absolute information saturation fraction $f_1 = \\ln(2)$."}</span>
                    <span className="block text-white mb-2">{"Effective Causal Length: $L_{eff} = \\frac{c}{H_0} \\cdot \\ln(2)$"}</span>
                    <span className="block text-entanglement font-bold text-lg mt-4">{"$\\Lambda = \\frac{1}{(L_{eff})^2} = \\frac{H_0^2}{c^2 \\cdot \\ln^2(2)}$"}</span>
                </div>
                <p className="font-mono text-sm italic text-zinc-500">
                    {"* Utilizing $H_0 = 66.90$ km/s/Mpc precisely replicates the $1.089 \\times 10^{-52} \\text{ m}^{-2}$ observed constant. The missing factor of 2 is exactly $1/\\ln(2)^2 \\approx 2.0813$."}
                </p>
            </div>
        </RevealBlock>

        <RevealBlock delay={0.4}>
            <div className="border border-zinc-800 bg-void p-8 mb-12">
                <h3 className="text-2xl font-bold font-mono text-white mb-6">{"2. Gas Coherence ($k$) and the Age of the Universe"}</h3>
                <p className="mb-4 leading-relaxed font-mono text-sm">
                    {"The dimensionless weight $k \\approx 9.575$, derived strictly from SPARC rotation curves without free parameters, is not a static topological dimension. It is the entangled mapping of identical gas volumes (HI) subject to the limiting causal boundary time $T_0$."}
                </p>
                <div className="bg-zinc-900/50 p-6 border-l-4 border-entanglement font-mono mb-4 text-xs">
                    <span className="block mb-2 text-zinc-400">{"# Universe Age: $T_0 \\approx 13.8$ Gyr"}</span>
                    <span className="block mb-2 text-zinc-400">{"# Expansion parameter scalar: $H_0 \\cdot T_0 \\approx 1$"}</span>
                    <span className="block text-white mb-2">{"Macroscopic Information Boundary: $f_1 = \\ln(2)$"}</span>
                    <span className="block text-entanglement font-bold text-lg mt-4">{"$k \\approx \\left( \\frac{T_0}{1 \\text{ Gyr}} \\right) \\cdot \\ln(2) \\approx 9.566$"}</span>
                </div>
                <p className="font-mono text-sm italic text-zinc-500">
                    {"* The profound implication: The Dark Matter discrepancy is derived from the expansion time clock. **Falsifiable Prediction**: High-redshift galaxies from the JWST era will possess a statistically lower $k$ coherence rating."}
                </p>
            </div>
        </RevealBlock>

        <RevealBlock delay={0.5}>
            <div className="border border-zinc-800 bg-void p-8 mb-12">
                <h3 className="text-2xl font-bold font-mono text-white mb-6">{"3. Phenomenological Higgs Mass Shift ($m_H$)"}</h3>
                <p className="mb-4 leading-relaxed font-mono text-sm">
                    {"The Standard Model vacuum stability bound sits at $m_{H\\_crit} \\approx 129.6$ GeV. MSQECC frames the Higgs explicitly in relation to the absolute stability edge of the SU(2) topology. Because it exists inside a discrete QECC logic network, maintaining the discrete weak code distance levies a phenomenological energy cost. This shift operates as a topological boundary correction $\\alpha_W \\approx 1/29.5$:"}
                </p>
                <div className="bg-zinc-900/50 p-6 border-l-4 border-entanglement font-mono mb-4 text-xs">
                    <span className="block mb-2 text-zinc-400">{"# Phenomenological shift from the continuous exact boundary via the discrete network coupling"}</span>
                    <span className="block text-entanglement font-bold text-lg mt-4">{"$m_H = m_{H\\_crit} \\times (1 - \\alpha_W) \\approx 129.6 \\times 0.9661 \\approx 125.207 \\text{ GeV}$"}</span>
                </div>
                <p className="font-mono text-sm italic text-zinc-500">
                    {"* This connects the observed 125.25 GeV mass to a 0.03% margin, not as a mathematical proof, but as a bounded phenomenological limit."}
                </p>
            </div>
        </RevealBlock>

        <RevealBlock delay={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="border border-zinc-800 bg-void p-8">
                    <h3 className="text-2xl font-bold font-mono text-white mb-6">{"4. Term Generations ($N_{gen}=3$)"}</h3>
                    <p className="font-mono text-sm leading-relaxed text-zinc-400">
                        {"For a $D=3$ limiting macroscopic causal network, the most stable error-correcting manifold protecting the code space logic is a 3-torus ($T^3$). The first Betti number $b_1(T^3) = 3$. If fermion families represent the 1-cycle zero modes winding through the quantum error-correcting lattice to cancel gauge anomalies, there MUST be exactly $b_1 = 3$ families."}
                    </p>
                </div>

                <div className="border border-zinc-800 bg-void p-8">
                    <h3 className="text-2xl font-bold font-mono text-white mb-6">{"5. Constraint on the Fine Structure Constant ($\\alpha$)"}</h3>
                    <p className="font-mono text-sm leading-relaxed text-zinc-400">
                        {"MSQECC specifies a hard geometric bound: $\\alpha < 0.1093$. This is strictly driven by the fault tolerance threshold of the tensor boundary. While the precise analytic value of $1/137.036$ remains an Open Problem, the running coupling RG flow must remain strictly below $0.1093$. If the topological error loop enclosing a U(1) flux exceeded this limit, continuous macroscopic spacetime would collapse. The RG flow must lock locally at a fixed point beneath the threshold."}
                    </p>
                </div>
            </div>
        </RevealBlock>

        <RevealBlock delay={0.8}>
            <div className="flex justify-end mt-8">
                <a href="/MSQECC_Version_VIII_Empirical_Era_Kimani.pdf" target="_blank" className="border border-white/40 px-8 py-4 hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-widest text-sm inline-block">
                    Read the Full V8 Paper (PDF)
                </a>
            </div>
        </RevealBlock>
    </div>
);
