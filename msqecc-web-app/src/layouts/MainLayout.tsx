import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { useStore } from '../store/msqeccStore';
import { TopologyCanvas } from '../components/TopologyCanvas';

const GlitchLink = ({ to, children }: { to: string, children: string }) => {
    const triggerGlitch = useStore(state => state.triggerGlitch);

    return (
        <Link
            to={to}
            className="text-superposition/80 hover:text-entanglement transition-colors font-mono tracking-widest text-sm relative group"
            onClick={() => triggerGlitch()}
        >
            <span className="relative z-10">{children}</span>
            <span className="absolute inset-0 bg-entanglement/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0 mix-blend-screen" />
        </Link>
    );
};

export const MainLayout = () => {
    const isGlitching = useStore(state => state.isGlitching);

    return (
        <ReactLenis root>
            <div className="bg-void min-h-screen text-superposition font-geist dot-grid relative overflow-x-hidden selection:bg-entanglement/30 selection:text-entanglement">

                {/* Navigation - Sticky Terminal Header */}
                <header className="fixed top-0 w-full border-b border-zinc-800/50 bg-void/80 backdrop-blur-md z-50">
                    <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                        <div className="font-mono font-bold text-entanglement tracking-[0.2em] flex items-center gap-2">
                            <div className="w-2 h-2 bg-entanglement animate-pulse" />
                            MSQECC_V8
                        </div>
                        <nav className="flex gap-8">
                            <GlitchLink to="/">[ EMPIRICAL_CLAIM ]</GlitchLink>
                            <GlitchLink to="/theory">[ AXIOMS ]</GlitchLink>
                            <GlitchLink to="/reproducibility">[ REPRODUCE ]</GlitchLink>
                            <GlitchLink to="/verification">[ FALSIFY ]</GlitchLink>
                            <GlitchLink to="/lab">[ THE_LAB ]</GlitchLink>
                        </nav>
                    </div>
                </header>

                {/* Global R3F Canvas Placeholder (z-index: -1) */}
                <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                    <TopologyCanvas />
                </div>

                {/* Global Glitch Overlay */}
                <AnimatePresence>
                    {isGlitching && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-void pointer-events-none flex items-center justify-center font-mono text-entanglement text-4xl"
                        >
                            {"DECODING_TENSOR_STATE..."}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                <main className="relative z-10 pt-24 pb-32 max-w-7xl mx-auto px-6 min-h-screen">
                    <Outlet />
                </main>

                {/* Telemetry Footer */}
                <div className="fixed bottom-4 right-6 font-mono text-[10px] text-zinc-500 z-40 text-right pointer-events-none mix-blend-screen bg-void/80 p-2 border border-zinc-800/50">
                    <div className="flex justify-between gap-8"><span className="text-zinc-600">ARCHITECT</span> <span>JACK KIMANI</span></div>
                    <div className="flex justify-between gap-8"><span className="text-zinc-600">CONTACT</span> <span>JACKKIMANI.PHYSICS@PROTON.ME</span></div>
                    <div className="border-t border-zinc-800/50 my-1"></div>
                    <div className="flex justify-between gap-8"><span className="text-zinc-600">SYS_STATUS</span> <span className="text-green-500">NOMINAL</span></div>
                    <div className="flex justify-between gap-8"><span className="text-zinc-600">k_COHERENCE</span> <span className="text-entanglement animate-pulse">9.575</span></div>
                    <div className="flex justify-between gap-8"><span className="text-zinc-600">GRAVITY_ERR</span> <span>0.0000000</span></div>
                </div>

            </div>
        </ReactLenis>
    );
};
