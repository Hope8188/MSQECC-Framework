import React, { useState, useEffect } from 'react';

// Heatmap dimensions
const GRID_SIZE = 15;
const CENTER = Math.floor(GRID_SIZE / 2);

export const QuantumNoiseSimulator = () => {
    const [noiseType, setNoiseType] = useState<'classical' | 'msqecc'>('msqecc');
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(t => t + 1);
        }, 300); // Decohere step
        return () => clearInterval(interval);
    }, []);

    const renderGrid = (type: 'classical' | 'msqecc') => {
        const cells = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const dx = x - CENTER;
                const dy = y - CENTER;
                const distSq = dx * dx + dy * dy;
                const distance = Math.sqrt(distSq);

                let intensity = 0;

                // Add some random baseline jitter
                const jitter = Math.random() * 0.1;

                if (distance === 0) {
                    intensity = 1.0; // Source error
                } else if (type === 'classical') {
                    // Exponential decay (Markovian quantum local noise)
                    intensity = Math.exp(-distance * 1.5) + jitter;
                } else {
                    // MSQECC: Topological 1/D^2 tail 
                    intensity = (1 / distSq) * 0.5 + jitter;
                }

                // Pulsing effect based on time
                if (distance > 0) {
                    intensity = intensity * (0.8 + 0.2 * Math.sin(time + distance));
                }

                intensity = Math.min(Math.max(intensity, 0), 1);

                // Map intensity to a color (Dark to Blue to White)
                // 0 -> #050505
                // 0.5 -> #3b82f6 (entanglement blue)
                // 1.0 -> #ffffff
                let r = 5, g = 5, b = 5;
                if (intensity > 0.5) {
                    const t = (intensity - 0.5) * 2;
                    r = Math.floor(59 + t * (255 - 59));
                    g = Math.floor(130 + t * (255 - 130));
                    b = Math.floor(246 + t * (255 - 246));
                } else {
                    const t = intensity * 2;
                    r = Math.floor(5 + t * (59 - 5));
                    g = Math.floor(5 + t * (130 - 5));
                    b = Math.floor(5 + t * (246 - 5));
                }

                cells.push(
                    <div
                        key={`${x}-${y}`}
                        className="w-full pb-[100%] rounded-sm transition-colors duration-300"
                        style={{ backgroundColor: `rgb(${r},${g},${b})` }}
                    />
                );
            }
        }
        return cells;
    };

    return (
        <div className="border border-zinc-800 bg-void p-6 relative group">
            {/* Brutalist Frame Deco */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-entanglement" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-entanglement" />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Control Panel */}
                <div className="lg:w-1/3 flex flex-col justify-center space-y-8 font-mono">
                    <div>
                        <h3 className="text-xl font-bold font-geist text-white tracking-widest mb-1">
                            Q-NOISE SIMULATOR
                        </h3>
                        <p className="text-zinc-500 text-xs uppercase tracking-widest">
                            Topological Decoherence
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => setNoiseType('classical')}
                            className={`w-full py-3 border text-left px-4 transition-colors ${noiseType === 'classical' ? 'border-entanglement text-white bg-entanglement/10' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                        >
                            [01] CLASSICAL NOISE (Exp Decay)
                        </button>
                        <button
                            onClick={() => setNoiseType('msqecc')}
                            className={`w-full py-3 border text-left px-4 transition-colors ${noiseType === 'msqecc' ? 'border-entanglement text-white bg-entanglement/10' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                        >
                            [02] MSQECC NOISE (1/D² Tail)
                        </button>
                    </div>

                    <div className="border-t border-zinc-800 pt-6">
                        <p className="text-sm text-zinc-400">
                            {noiseType === 'classical'
                                ? 'Standard Qiskit models assume exponential localization. Errors strictly local.'
                                : 'MSQECC introduces a non-local, scale-invariant tensor geometry. Errors propagate via 1/D², simulating physical gravity.'}
                        </p>
                    </div>
                </div>

                {/* Heatmap Grid */}
                <div className="lg:w-2/3 flex items-center justify-center border-l border-zinc-800/50 pl-0 lg:pl-8">
                    <div
                        className="w-full max-w-[400px] grid gap-[1px] bg-zinc-900 border border-zinc-800 p-1"
                        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
                    >
                        {renderGrid(noiseType)}
                    </div>
                </div>
            </div>
        </div>
    );
};
