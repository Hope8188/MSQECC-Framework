import React, { useState } from 'react';
import { useStore } from '../store/msqeccStore';

export const ConstantOptimizer = () => {
    const { constants, setConstant } = useStore();
    const [cValue, setCValue] = useState(constants.c);
    const [dValue, setDValue] = useState(constants.D);

    const isSpeedOfLightBroken = cValue !== 299792458;
    const isDimensionBroken = dValue !== 3;

    return (
        <div className="border border-zinc-800 bg-void p-6 relative font-mono text-sm group">
            <h3 className="text-xl font-bold font-geist text-white tracking-widest mb-6 uppercase">
                CONSTANT OPTIMIZER
            </h3>
            <p className="text-zinc-500 mb-8 border-l border-zinc-800 pl-4 w-full md:w-3/4">
                Challenge the MSQECC invariant values. Physics operates purely on information saturation at the Hubble boundary. Altering these universal seeds breaks the topological tensor.
            </p>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Speed of Light Constant */}
                <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
                        <label className="text-entanglement tracking-tight text-xs">
                            Hubble Horizon Transfer Speed (c)
                        </label>
                        <span className="text-white text-lg">{cValue.toLocaleString()} m/s</span>
                    </div>
                    <input
                        type="range"
                        min="100000000"
                        max="400000000"
                        step="10000"
                        value={cValue}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setCValue(val);
                            setConstant('c', val);
                        }}
                        className="w-full h-[1px] bg-zinc-800 appearance-none cursor-ew-resize
                                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 
                                   [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white"
                    />
                    {isSpeedOfLightBroken && (
                        <p className="text-red-500 text-xs animate-pulse opacity-80 pt-2">
                            CRITICAL WARNING: Causality Violated. Lorentz Invariance broken.
                        </p>
                    )}
                </div>

                {/* Spatial Dimensions Constant */}
                <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
                        <label className="text-entanglement tracking-tight text-xs">
                            Macroscopic Space Dimensions (D)
                        </label>
                        <span className="text-white text-lg">{dValue}</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="11"
                        step="1"
                        value={dValue}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setDValue(val);
                            setConstant('D', val);
                        }}
                        className="w-full h-[1px] bg-zinc-800 appearance-none cursor-ew-resize
                                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 
                                   [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white"
                    />
                    {isDimensionBroken && (
                        <p className="text-zinc-500 text-xs mt-2 italic pt-2 border-t border-zinc-800/50">
                            {dValue > 3 ? "String theory mode: No macroscopic observables possible without compactification." : "Flatland: Tensor network topology cannot map a 2D spherical boundary."}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => {
                        setCValue(299792458);
                        setConstant('c', 299792458);
                        setDValue(3);
                        setConstant('D', 3);
                    }}
                    className={`text-xs px-4 py-2 uppercase tracking-widest transition-colors font-bold ${isSpeedOfLightBroken || isDimensionBroken ? 'bg-entanglement text-white' : 'bg-zinc-900 border border-zinc-800 text-zinc-500'}`}
                >
                    Restore True Vacuum State
                </button>
            </div>
        </div>
    );
};
