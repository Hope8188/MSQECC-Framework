# Lumina Website: Component Structure (The Gateway Elements)

## 0. The Mission: Minimalist Perfection
Every component on the **Lumina Horizon Gateway** (Marketing Website) must be a masterpiece of 20/80 ROI: Minimal DOM, Maximal Aesthetic Presence.

## 1. The Global Web Interface Components

### `<HorizonNav>`
**Type:** Sticky Glass-Bar
- **Rounding:** `40px` (Corner-Radius-XL).
- **Aesthetic:** `backdrop-filter: blur(40px) saturate(200%)`.
- **Logic:** Reveals on scroll-up, hides on scroll-down (Momentum Inversion).

### `<ResonanceLink>`
**Type:** Magnetic Navigation Trigger
- **Radius:** `60px` (Magnetic Reach).
- **Animation:** Pulls the custom cursor toward the center-line while adding an "Electric Cyan" bloom.
- **Micro-Interaction:** Text undergoes the "Syndrome Scramble" on hover.

### `<DigitalMercuryHero>`
**Type:** WebGL / R3F Canvas Centerpiece
- **Geometry:** `TorusKnot` with physics distortion (MSQECC Stress).
- **Interaction:** Rotation maps to the `scrollYProgress` using `framer-motion` hooks.
- **Z-Index:** Always at the floor (`z-index: -10`).

### `<MorphicCard>`
**Type:** Glass Content Module
- **Aesthetic:** High-contrast `Lunar White` border. 
- **Content:** Information-dense snippets (Rust snippets, IPC metrics).

## 2. Interaction Workflow (The Conversion)
- **Phase 1 (The Hook):** User arrives. Screen is black. A 1Hz pulse (Electric Cyan) glows from the center.
- **Phase 2 (The Identity):** User clicks "Enter". The 3D Orb reveals itself with a vertical clip-path mask.
- **Phase 3 (The Proof):** As the user scrolls, the Torus background accelerates (Momentum Linking).
- **Phase 4 (The Conversion):** The final section is a massive, glowing button occupying 100% of the viewport.

## 3. Global Web State (`zustand`)
```ts
interface HorizonWebStore {
  ui: {
    hasEntered: boolean; 
    scrollInertia: number; 
    isGlitching: boolean;
  };
}
```
