# MSQECC Components & Interaction Architecture (Taste-Skill Level 8)

This document precisely defines the input/output schemas, logic, and redirection behaviors for the microscopic components of the MSQECC web app. It ensures high ROI (20% code -> 80% impact) while adhering to Quantum Brutalist design.

## 1. Global State Schema (`zustand`)
We use `zustand` to avoid heavy `Context.Provider` wrappers. It instantly updates the 3D Canvas when UI sliders move.
```ts
interface MsqeccStore {
  constants: {
    k: number; // Def: 9.575
    c: number; // Def: 299792458
    D: number; // Def: 3
  };
  setConstant: (name: keyof MsqeccStore['constants'], value: number) => void;
  isGlitching: boolean; // Global state to trigger canvas noise on route changes
  triggerGlitch: () => void;
}
```

## 2. Component: `<MagneticButton>`
**Purpose:** Replaces all primitive buttons. It tracks the mouse position during hover and pulls the button geometry slightly towards the cursor using physics-based springs (`framer-motion`).
**Schema:**
- `children`: ReactNode.
- `onClick`: Function.
- `className`: For custom styling over the base brutalist box.
**Internal Logic:** 
- `onMouseMove`: Calculates the delta between the mouse `clientX/Y` and the center of the button's `getBoundingClientRect()`. 
- Sets `x` and `y` `useMotionValue` to 20% of the delta.
- Uses `useSpring` with `stiffness: 150, damping: 15` for a weighty, physical return-to-center when the mouse leaves.

## 3. Component: `<GlitchLink>`
**Purpose:** Replaces all `react-router-dom` `<Link>` tags. Creates the cinematic transition effect.
**Schema:**
- `to`: string (Target route).
- `children`: string (The visible text).
**Internal Logic:**
1. Renders the route name (e.g., "[ EMPIRICAL DATA ]").
2. On `onClick`, it intercepts the route change.
3. Triggers `zustand` `triggerGlitch()` (makes the background 3D nodes scramble).
4. Runs a `requestAnimationFrame` loop that randomly replaces the text characters with "01X?$%" for exactly 400ms.
5. After 400ms, it executes `navigate(to)`.

## 4. Route Manifest & Button Redirection Flow
Here are the exact mappings of the buttons across the application:

1. **Top NavBar -> `Holographic Sandbox` Button**
   - **Type:** `<MagneticButton><GlitchLink to="/holographic-sandbox">...</GlitchLink></MagneticButton>`
   - **Action:** Navigates away from the Scrollytelling paper directly into the interactive simulation UI.

2. **Hero Section -> `[ READ DERIVATIONS ]` Button**
   - **Type:** `<MagneticButton><GlitchLink to="/paper/derivations">...</GlitchLink></MagneticButton>`
   - **Action:** Drops the user directly into the latex-styled terminal readout of the mathematical proofs.

3. **Holographic Sandbox -> Slider Inputs**
   - **Type:** Standard native input mapped to `zustand` `setConstant(val)`.
   - **Action:** Triggers a recompute in the R3F `<Canvas>`, instantly expanding/contracting the $1/D^2$ torus noise visualizer in the background.

## 5. Viewport Reveal Schema (GSAP)
**Purpose:** Ensure elements format onto the screen architecturally, rather than fading in cheaply.
**Component:** `<RevealBlock>`
- Uses `@gsap/react` `useGSAP()`.
- Binds a `ScrollTrigger` to itself.
- Runs `gsap.fromTo` on `clipPath` (from `inset(100% 0 0 0)` to `inset(0 0 0 0)`).
- **Result:** Instead of opacity changing, the data block physically unveils downwards like a machine rendering lines of logic.

### 20/80 Development Note:
By writing the `<MagneticButton>` and `<GlitchLink>` components ONCE, and mapping the entire app state to `zustand` ONCE, we secure the 80% impact of an Awwwards-winning physics website without writing thousands of lines of redundant event listeners across the individual pages.
