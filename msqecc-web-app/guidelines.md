# MSQECC Web App Guidelines: The Living Laboratory

**Core Philosophy:** The universe is a quantum error-correcting code. The UI must reflect this profound reality, but more importantly, **the UI must prove it**. This website is not a promotional brochure; it is a "Living Laboratory." The target audience consists of skeptical physicists, quantum information theorists, and astrophysicists who deal with crackpot theories daily. Their currency is empirical data, mathematical rigor, and falsifiability.

### 1. Transparency, Reproducibility, Interactive Verification
- **Honesty Builds Trust:** Do not hide the flaws. Emphasize what is *not* proven first (e.g., the exact first-principles value of $k$).
- **Falsifiability Front and Center:** Invite the user to explicitly break the theory. List the "Kill Switches" clearly (Proton decay, Axion confirmation).
- **Zero Marketing Speak:** Text must be concise, objective, and dense with information. "Only knowledge matters."

### 2. The Architectural Strategy (The 5 Interactive Tests)
We must prioritize tools that empower visitors to falsify or validate MSQECC themselves:
1.  **The Galaxy Rotation Curve Calculator:** A slider tuning the gas coherence weight ($k \approx 9.6$) against SPARC galaxies.
2.  **The Quantum Noise Simulator:** A browser-based side-by-side heatmap showing classical exponential decay vs. MSQECC's $1/D²$ topological tail.
3.  **The Null Result Tracker:** A live dashboard reading Super-K, ADMX, and Fermi-LAT bounds (fed by `research_stream.json`).
4.  **The Constant Optimizer:** A tuning tool challenging the user to beat your $R² = 0.82$ score.
5.  **Tensor Network Visualizer:** An interactive R3F graph showing structural entanglement stress mimicking Dark Matter.

### 3. Aesthetic Identity: "Quantum Brutalism"
1. **Never use standard UI kits** (no rounded-lg shadows, no bouncy bubbly buttons).
2. **Typography is King:**
    - `Geist` (Inter) for ultra-legible, geometric tracking (Headers).
    - `Cormorant` (Italicized) for mathematical elegance and emphasis (Subheaders).
    - `JetBrains Mono` for all data, telemetry, code snippets, and strict measurements.
3. **Monochromatic Baseline:** The void (black) background and superposition (white/zinc-400) foreground form the fundamental grid.
4. **Entanglement Blue (`#3B82F6`)** is the *only* primary color, used exclusively to highlight interactive nodes, critical data ($R²=0.82$, $k=9.575$), and active states.

### 4. Cinematic Telemetry (GSAP & Lenis)
- Smooth Scrolling (`react-lenis`) is mandatory to linearize the user's descent through the data.
- Complex data staggers are handled by GSAP (`@gsap/react`). Animations should feel like "hardware booting up" or "quantum states resolving"—avoiding software "ease-in-out-sine" softness in favor of physics-based spring dampening.

### The "Taste-Skill" Directive
*Any AI code generation moving forward must implicitly understand these rules via the `.cursorrules` master configuration.*
- Everything must possess a clear `z-index` depth mirroring physical reality (Background Tensor Network -> Tensor Grid -> Content Blocks -> Telemetry Overlay -> Interactive Data -> Custom Pointer).
- Do not build complex bespoke UI when standard data curves and SVG topologies communicate the physics quicker.
