import React from 'react';

export const KimaniEfficiency = () => {
    const K_EF = 15.4;
    const ETA_VAC = 1000;

    return (
        <div className="border border-zinc-800 bg-void p-6 relative group font-mono">
            <h3 className="text-xl font-bold font-geist text-white tracking-widest mb-1 uppercase">
                Kimani Efficiency Matrix
            </h3>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-8 border-l border-zinc-800 pl-4">
                3D Holographic Code Advantage vs Standard 2D Surface QEC
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Qubit Overhead Section */}
                <div className="border border-zinc-800 p-6 bg-zinc-900/30">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-xs text-zinc-500 uppercase italic">Qubit Overhead Reduction</span>
                        <span className="text-2xl font-black text-entanglement">-{K_EF}x</span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-[10px] uppercase">
                            <span className="text-zinc-500">2D Physical-to-Logical Ratio</span>
                            <span className="text-white">~1000 : 1</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-800">
                            <div className="w-full h-full bg-zinc-600" />
                        </div>

                        <div className="flex justify-between text-[10px] uppercase">
                            <span className="text-entanglement">3D MSQECC Ratio (Kef)</span>
                            <span className="text-entanglement">~65 : 1</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-800">
                            <div className="w-[6.5%] h-full bg-entanglement shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        </div>
                    </div>

                    <p className="mt-6 text-[10px] text-zinc-500 leading-relaxed">
                        By utilizing the 3rd dimension for parallel syndrome extraction, MSQECC eliminates the topological bottleneck of 2D manifolds. Kef represents the orders-of-magnitude leap in physical qubit utilization.
                    </p>
                </div>

                {/* Energy Efficiency Section */}
                <div className="border border-zinc-800 p-6 bg-zinc-900/30">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-xs text-zinc-500 uppercase italic">Vacuum-Aligned Computing</span>
                        <span className="text-2xl font-black text-green-500">+{ETA_VAC}x</span>
                    </div>

                    <div className="flex items-end gap-1 h-24 mb-6">
                        {[0.2, 0.4, 0.3, 0.5, 0.4, 0.6, 0.5, 0.8, 0.7, 1.0].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-green-500/20 border-t border-green-500/50"
                                style={{ height: `${h * 100}%` }}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between text-[10px] uppercase mb-2">
                        <span className="text-zinc-500">Traditional Landauer Waste</span>
                        <span className="text-white">High (Heat Limit)</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase">
                        <span className="text-green-500">MSQECC entropy-drag Reduction</span>
                        <span className="text-green-500">Zero-Point Optimized</span>
                    </div>

                    <p className="mt-6 text-[10px] text-zinc-500 leading-relaxed">
                        n_vac leverages the native fault-tolerance of the spatial grid to compute using non-local coherent states. This effectively bypasses the classical thermal semiconductor choke.
                    </p>
                </div>
            </div>
        </div>
    );
};
