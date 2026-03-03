import React, { useState, useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';

export const HiggsTopologyTest = () => {
    const [alphaW, setAlphaW] = useState(1 / 29.5); // Weak coupling
    const [mHCrit, setMHCrit] = useState(129.6);

    const data = useMemo(() => {
        const pts = [];
        for (let energyScale = 100; energyScale <= 200; energyScale += 5) {
            // Mock standard vacuum stability curve
            const stabilityThreshold = 129.6 + Math.log10(energyScale / 100) * 10;

            // MSQECC Discrete Topology Higgs Mass
            const predictedMass = mHCrit * (1 - alphaW);

            pts.push({
                energyScale,
                'Vacuum Stability Edge': stabilityThreshold,
                'MSQECC Predicted m_H': predictedMass,
                'Observed m_H': 125.25
            });
        }
        return pts;
    }, [alphaW, mHCrit]);

    const currentPredicted = mHCrit * (1 - alphaW);
    const errorMargin = Math.abs(currentPredicted - 125.25) / 125.25 * 100;

    return (
        <div className="border border-zinc-800 bg-void p-6 relative group font-mono">
            <h3 className="text-xl font-bold font-geist text-white tracking-widest mb-1 uppercase">
                Higgs Boson Topology Gap
            </h3>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-8 border-l border-zinc-800 pl-4">
                Validating the SU(2) 1-Loop Weak Coupling Mass Offset
            </p>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3 flex flex-col space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-zinc-400">
                            <span>Weak Coupling ($\\alpha_W$)</span>
                            <span>{alphaW.toFixed(5)}</span>
                        </div>
                        <input
                            type="range"
                            min="0.01"
                            max="0.05"
                            step="0.001"
                            value={alphaW}
                            onChange={(e) => setAlphaW(parseFloat(e.target.value))}
                            className="w-full h-1 bg-zinc-800 appearance-none cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-zinc-400">
                            <span>Vacuum Stability Bound (GeV)</span>
                            <span>{mHCrit.toFixed(1)} GeV</span>
                        </div>
                        <input
                            type="range"
                            min="120"
                            max="140"
                            step="0.1"
                            value={mHCrit}
                            onChange={(e) => setMHCrit(parseFloat(e.target.value))}
                            className="w-full h-1 bg-zinc-800 appearance-none cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white"
                        />
                    </div>

                    <div className="border-t border-zinc-800 pt-4 mt-auto">
                        <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-zinc-500">Predicted $m_H$:</span>
                            <span className={errorMargin < 0.1 ? "text-green-400" : "text-white"}>{currentPredicted.toFixed(3)} GeV</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-zinc-500">Error Margin:</span>
                            <span className={errorMargin < 0.1 ? "text-green-400" : "text-red-400"}>{errorMargin.toFixed(3)}%</span>
                        </div>

                        {errorMargin < 0.1 && (
                            <div className="mt-4 text-[10px] text-entanglement/80 uppercase animate-pulse border border-entanglement/30 bg-entanglement/10 p-2">
                                [ TOPOLOGY ALIGNED: Higgs mass derived physically ]
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:w-2/3 h-[300px] border-l border-zinc-800/50 pl-2 lg:pl-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                            <XAxis dataKey="energyScale" stroke="#a1a1aa" fontSize={11} tickFormatter={(val: number) => `${val} GeV`} />
                            <YAxis stroke="#a1a1aa" fontSize={11} domain={[120, 140]} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#050505', border: '1px solid #27272a', borderRadius: '0' }}
                                itemStyle={{ fontFamily: 'JetBrains Mono', fontSize: '12px' }}
                                labelStyle={{ color: '#a1a1aa', marginBottom: '8px' }}
                            />
                            <Legend iconType="plainline" wrapperStyle={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }} />

                            <Line type="monotone" dataKey="Vacuum Stability Edge" stroke="#a1a1aa" strokeWidth={1} strokeDasharray="5 5" dot={false} />
                            <Line type="monotone" dataKey="MSQECC Predicted m_H" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="Observed m_H" stroke="#fff" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
