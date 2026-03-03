# MSQECC Project Resources Database & Architecture References

**Primary Theory Asset:**
- [Master Paper (Empirical Era)](../artifacts/MSQECC_Version_VIII_Empirical_Era.md)
- [Supplementary Analysis Code (Zip)](../artifacts/MSQECC_V8_Supplementary_Code.zip)

**Empirical Data Visuals (Must be accessible in /public):**
1. `msqecc_predictions.png`: R^2 = 0.82 Fit 
2. `qiskit_local_baseline.png`: Classical Null Noise
3. `quantum_noise_comparison.png`: MSQECC 1/D^2 Topological Tail
4. `quantum_correlation_decay.png`: Log-linear Decay Profile

**Core Engine Rules & Skills:**
- `.cursorrules`: Critical AI guidelines for component structure, GSAP hooks, and React-Three-Fiber instantiation.
- `skills.md`: Advanced GSAP, Lenis, and R3F timeline architectures.
- `guidelines.md`: Typography rules, color palettes, spacing rhythm, and the "Taste-Skill" directive.

**External Documentation (Required Reading for Architecture):**
1. **React Three Fiber (R3F):** https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
    - *Focus on:* `InstancedMesh` documentation for large-scale noise matrix visualization; `frameloop="demand"` for performance.
2. **GSAP React Integration:** https://gsap.com/resources/React
    - *Focus on:* The `@gsap/react` `useGSAP()` hook for seamless unmounting and state management tracking.
3. **Lenis Scroll Handling:** https://github.com/darkroomengineering/lenis
    - *Focus on:* The `<ReactLenis root>` wrapper paradigm to linearize scroll ticks globally across the entire DOM tree.
4. **Taste-Skill Reference (Leonxlnx):** https://github.com/Leonxlnx/taste-skill
    - *Focus on:* Micro-interactions, cursor displacement algorithms, layout brutalism, and typography tracking.

**Pareto Optimization Data Vectors:**
- When modeling data, target *maximum visual impact* using *minimum DOM nodes*. Offload massive coordinate arrays to a central Web Worker if physics simulations run hot, but prefer static JSON approximations if the visual result is indistinguishable (20% effort -> 80% aesthetic impact).
