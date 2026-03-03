# MSQECC Task List: The "Living Laboratory" Build

This document tracks the engineering tasks required to actualize the MSQECC Web Application. It operates on the Pareto Protocol, dedicating massive effort only to empirical interaction and theoretical transparency, avoiding "brochure-ware" completely.

## Phase 1: Core Setup & Typographic Engine (Done)
- [x] Configure Vite + React + Tailwind v4 PostCSS compilation.
- [x] Inject custom global typography (`Geist`, `Cormorant Garamond`, `JetBrains Mono`).
- [x] Integrate Global Physics Cursor (`Framer Motion`) & Telemetry Overlay.
- [x] Install bleeding-edge infrastructure (`lenis`, `@gsap/react`, `three`, `@react-three/fiber`, `zustand`, `react-router-dom`).
- [x] Seed ArXiv Automated Ingestion Pipeline (`research_stream.json` + GitHub Actions).

## Phase 2: Structural Architecture Rebuild (High Priority)
- [x] **React Router Setup:** Establish the core routes (`/`, `/theory`, `/reproducibility`, `/verification`, `/lab`) inside `src/router.tsx` using `<MainLayout>` as the shell.
- [x] **Scroll Linearization:** Wrap `<App>` inside `<ReactLenis root>` to synchronize UI unmounting/mounting with the hardware monitor refresh rate perfectly.
- [x] **GSAP Master Timeline:** Wire all Section Components into a single central GSAP `ScrollTrigger` timeline hook to unveil data linearly as if rendering from a terminal.
- [x] **Typography Overhaul:** Scale up all `H1` and `H2` classes by 1.5x. Brutalism demands absolute textual supremacy.

## Phase 3: The 3D Topology (The 20% Magic)
- [x] **WebGL Canvas Inject:** Build a global, stationary `<Canvas>` component that sits at `z-index: -1` behind the entire app to maintain simulation state across routes.
- [x] **1/D² Noise Particle Mesh:** Write an `InstancedMesh` of 1000 nodes connecting in a torus geometry (a tensor network) that subtly rotates based on the user's scroll position via GSAP.

## Phase 4: The Core Lab Interfaces (The Immediate Execution Priorities)
- [x] **Test 1: Galaxy Rotation Curve Component (Highest Priority):** Let users pick a galaxy (e.g., NGC 2403) and tune the slider for the gas coherence weight $k$. Plot MSQECC versus NFW visually using `recharts` or `chart.js`.
- [x] **Test 2: Quantum Noise Simulator:** A side-by-side JS-based heatmap showing "Classical Noise" vs "MSQECC Noise" ($1/D^2$ tail).
- [x] **Test 3: Constant Optimizer:** A lightweight, browser-based tuner testing values around $k \approx 9.6$ and $C$ to break or reinforce the $R² = 0.82$ score.
- [x] **Test 4: Null Tracker / "Kill Switches":** Live status lights on ADMX, Super-K, Fermi-LAT data (incorporating the `research_stream.json` data).
- [x] **Test 5: Tensor Network Visualizer:** R3F graph showing Entanglement Stress flowing from the boundary (Dark Matter mimic).

## Phase 5: Deployment & Community (The Release)
- [x] Build GitHub Issue tracking link hooks directly into the `/verification` page and create a "Bug/Flaw Submission Form".
- [x] Compile Python code (`analyze_msqecc.py`, `quantum_noise_test_local.py`) into a clean `.zip` to be hosted statically in `/public`.
- [x] Export `MSQECC_Version_VIII_Empirical_Era_Kimani.pdf` into `/public`.
- [x] Final Vercel/GitHub Pages deployment.
