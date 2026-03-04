# Lumina App: Component Structure (The User Portal Elements)

## 0. The Mission: Predictable Sovereignty
The **Lumina Horizon App** operates on a **Deterministic State Machine**. Every interaction must be mathematically resolved before it is rendered.

## 1. The Global App Interface Components

### `<ResonanceModule>`
**Type:** Glass Content Module
- **Rounding:** `40px` (Corner-Radius-XL).
- **Aesthetic:** `backdrop-filter: blur(48px) saturate(220%)`.
- **Logic:** Subtle "Lean" toward the cursor. On click, it triggers a `PixelRipple` effect from the point of contact.

### `<ActionOrb>`
**Type:** Floating Navigation/Action Trigger
- **Aesthetic:** A "Digital Mercury" sphere.
- **Behavior:** Pulses at 1Hz (Resonance). Follows the mouse with significant inertia (Inertial Lag).
- **Interaction:** Expands into the **Module Switcher** when clicked.

### `<MorphicWindow>`
**Type:** Isolation Container for App Morph
- **Aesthetic:** No OS chrome. Uses Lumina's glassmorphic title-bar.
- **Logic:** Injects `MKI_OVERLAY.css` into the guest application to ensure visual alignment.

### `<ResonanceCursor>`
**Type:** High-Fidelity Custom Pointer
- **Aesthetic:** Electric Cyan glow dot with displacement rings.
- **Logic:** Displacement-maps UI nodes upon proximity.

## 2. Interaction Patterns
1. **Topological Reveal:** Page spawns use a clip-path "Rendering" sequence.
2. **Magnetic Pull:** Interactive elements attract the custom cursor within a 40px radius.
3. **Surface Texture:** Enforced 0.04% pixel grain on the fixed root.

## 3. Global App State (`zustand`)
```ts
interface HorizonStore {
  system: {
    isSealed: boolean; 
    loadFactor: number; 
    entropy: number; 
    msqeccMode: 'OPTIMAL' | 'RESONANCE';
  };
  navigation: {
    current: 'HUB' | 'MORPH' | 'DEEP';
    isTransitioning: boolean;
  };
}
```

## 4. Engineering Directive (20/80 ROI)
Do not build deep nestings. Build **One Layout** with **Three High-Status Modules** (`<ResonanceModule>`, `<ActionOrb>`, `<MorphicWindow>`). If these three feel like a $2000 hardware device, we win.
