import { create } from 'zustand';

interface MsqeccStore {
    constants: {
        k: number;
        c: number;
        D: number;
    };
    setConstant: (name: keyof MsqeccStore['constants'], value: number) => void;
    isGlitching: boolean;
    triggerGlitch: () => void;
}

export const useStore = create<MsqeccStore>((set) => ({
    constants: {
        k: 9.575, // The exact empirical constant yielding R^2 = 0.82
        c: 299792458,
        D: 3,
    },
    setConstant: (name, value) =>
        set((state) => ({ constants: { ...state.constants, [name]: value } })),

    isGlitching: false,
    triggerGlitch: () => {
        set({ isGlitching: true });
        setTimeout(() => set({ isGlitching: false }), 400); // 400ms glitch decode time
    }
}));
