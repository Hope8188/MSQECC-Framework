import React, { useState } from 'react';

export const AlphaFineStructure = () => {
    const [alpha, setAlpha] = useState(1 / 137.036);

    // The exact QECC fault tolerance threshold
    const QECC_THRESHOLD = 0.1093;

    // Derived states
    const isError = alpha >= QECC_THRESHOLD;
    const invAlpha = 1 / alpha;

    return (
        <div className="border border-zinc-800 bg-void p-6 relative group font-mono">
            <h3 className="text-xl font-bold font-geist text-white tracking-widest mb-1 uppercase">
                Fine Structure Bound ($\\alpha$)
            </h3>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-8 border-l border-zinc-800 pl-4">
                Testing the EM Coupling vs QECC Fault Tolerance
            </p>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2 flex flex-col justify-center space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs text-zinc-400 mb-2">
                            <span>Electromagnetic Coupling ($\\alpha$)</span>
                            <span className={isError ? "text-red-500 font-bold" : "text-white"}>{alpha.toFixed(5)}</span>
                        </div>
                        <input
                            type="range"
                            min="0.005"
                            max="0.150"
                            step="0.001"
                            value={alpha}
                            onChange={(e) => setAlpha(parseFloat(e.target.value))}
                            className="w-full h-1 bg-zinc-800 appearance-none cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white"
                        />
                        <div className="flex justify-between text-[10px] text-zinc-600 mt-1 uppercase">
                            <span>Weak (0.005)</span>
                            <span>Threshold ({QECC_THRESHOLD})</span>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 p-4 border-l border-zinc-800 text-xs text-zinc-400">
                        Topological Limit: The probability of a U(1) logical error loop forming must strictly abide by $p_c &lt; 0.1093$. If the RG flow exceeds this, the code tensor space collapses and macroscopic continuous spacetime shatters.
                    </div>
                </div>

                <div className="lg:w-1/2 flex flex-col justify-center border border-zinc-800 p-6 relative overflow-hidden">
                    {/* Visualizer Background */}
                    <div className={`absolute inset-0 transition-colors duration-500 ${isError ? 'bg-red-500/10' : 'bg-transparent'}`} />

                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-end border-b border-zinc-800 pb-4 mb-4">
                            <span className="text-xs text-zinc-500 uppercase">Inverse Coupling ($1/\\alpha$)</span>
                            <span className={`text-2xl font-bold ${isError ? 'text-red-500' : 'text-entanglement'}`}>
                                {invAlpha.toFixed(3)}
                            </span>
                        </div>

                        {!isError ? (
                            <div className="text-[10px] text-green-500 uppercase animate-pulse border border-green-500/30 p-2 text-center bg-green-500/5">
                                [ NOMINAL: STABLE RG FLOW ENFORCED BY MACROSCOPIC BOUNDARY ]
                            </div>
                        ) : (
                            <div className="text-[10px] text-red-500 uppercase animate-pulse border border-red-500/30 p-2 text-center bg-red-500/10">
                                [ CRITICAL: FAULT TOLERANCE BREACHED. UNIVERSE DESTABILIZED. ]
                            </div>
                        )}

                        {Math.abs(alpha - 1 / 137.0355) < 0.001 && (
                            <div className="mt-2 text-xs text-center text-white italic">
                                <div>{"Topological Derivation:"}</div>
                                <div className="text-entanglement">{"$4\\pi^3 + \\pi^2 + \\pi \\approx 137.0355$"}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
