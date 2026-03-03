import React from 'react';
import researchData from '../data/research_stream.json';

const EXPERIMENTS = [
    {
        name: 'ADMX (Axion Dark Matter eXperiment)',
        target: 'No Candidate (∞)',
        status: 'NOMINAL',
        desc: 'MSQECC voids axion necessity. Dark matter is geometry.',
        color: 'text-green-500'
    },
    {
        name: 'Super-Kamiokande (Proton Decay)',
        target: 'No Decay (ΔE=0)',
        status: 'NOMINAL',
        desc: 'Protects macroscopic baryon stability.',
        color: 'text-green-500'
    },
    {
        name: 'Fermi-LAT (Lorentz Invariance)',
        target: 'No Delay (c = const)',
        status: 'NOMINAL',
        desc: 'Validates non-local MSQECC mapping preserving c.',
        color: 'text-green-500'
    }
];

export const NullTracker = () => {
    return (
        <div className="border border-zinc-800 bg-void p-6 font-mono text-sm relative">
            <h3 className="text-xl font-bold font-geist text-white tracking-widest mb-6">
                NULL RESULT "KILL SWITCHES"
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {EXPERIMENTS.map((exp, idx) => (
                    <div key={idx} className="border border-zinc-800 bg-zinc-900/50 p-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-zinc-400 text-xs w-2/3">{exp.name}</span>
                            <span className={`text-[10px] uppercase font-bold px-2 py-1 bg-zinc-800 ${exp.color} animate-pulse`}>
                                {exp.status}
                            </span>
                        </div>
                        <div className="text-white mb-2 text-lg">Target: {exp.target}</div>
                        <div className="text-zinc-500 text-xs">{exp.desc}</div>
                    </div>
                ))}
            </div>

            <div className="border-t border-zinc-800 pt-6">
                <h4 className="text-entanglement text-xs mb-4 w-full">LATEST RESEARCH INGEST</h4>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {researchData.map((item) => (
                        <div key={item.id} className="flex gap-4 items-start border-l border-zinc-800 pl-4">
                            <div className="text-zinc-500 text-xs whitespace-nowrap pt-1">[{item.date}]</div>
                            <div>
                                <a href={item.url} target="_blank" rel="noreferrer" className="text-white hover:text-entanglement transition-colors block mb-1">
                                    {item.title}
                                </a>
                                <p className="text-zinc-500 text-xs italic">"{item.relevance}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
