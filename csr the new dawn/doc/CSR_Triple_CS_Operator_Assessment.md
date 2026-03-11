# CSR Triple-CS / Factorized |p|^3 Assessment

Purpose: assess whether a factorized operator |px||py||pz| (triple-CS / triple-cycle) can serve as the White Whale.
Status: assessment only. No new physics inserted.
March 2026.

## What the Monte Carlo actually shows
- The rotational average of |px||py||pz| on a sphere scales as r^3 with a geometric constant.
- This is a dimensional fact, not a derivation of a new kernel.

Key constant (from the user run):
- C_iso ≈ 0.0796 for isotropic sampling (continuous sphere)
- Lattice sampling shifts C_iso upward (~20% in the reported test)
- Mild anisotropy changes the constant by a few percent

## What it does NOT prove
- It does not show that |px||py||pz| equals |p|^3.
- It does not derive the operator from a T3 toric code or a specific bridge algebra.
- It does not show that the resulting kernel is isotropic.

## Core physical issue
The factorized operator breaks rotational symmetry:
- |px||py||pz| = |p|^3 * f(angles)
- f(angles) is not constant; only its average is.

Therefore, a theory that truly produces |px||py||pz| predicts orientation-dependent behavior unless a mechanism restores isotropy (RG flow, disorder averaging, or symmetry enhancement).

## How this helps the CSR program
It suggests a **candidate new bridge object** (Plan C):
- a triple-cycle / triple-CS coupling that yields a factorized fractional Laplacian.

This is a *structural* lead, not a derivation. It defines what must be proven:
1. an explicit action/generator that yields the factorized operator,
2. a mechanism that makes the effective kernel isotropic (or a falsifiable anisotropy signature in galaxy data),
3. compatibility with the bridge-to-phi observable map.

## Binary implication for Gate 1
- If only |px||py||pz| is derived and no isotropization exists, then **Gate 1 still fails** for the MOND target.
- If an isotropization mechanism is derived, then Gate 1 can pass without insertion.

## Next concrete steps (if we pursue this path)
1. Derive the real-space Green's function for the factorized operator and compare it to (-∇^2)^{3/2}.
2. Quantify anisotropy signatures and check whether the direct-observed gate already rules them out.
3. Attempt an explicit triple-CS action on T3 and compute the induced kernel.

## New empirical anisotropy summary (March 2026)
Computed angular ratio r = |px||py||pz| / |p|^3 on the unit sphere (purely angular):
- mean ≈ 0.07951, std ≈ 0.05653
- p05 ≈ 0.00401, p95 ≈ 0.17826
- max ≈ 0.19245, min ≈ 1.2e-09

Lattice shell (R=12) shows similar spread with mean ≈ 0.08337 and max ≈ 0.19245.
Machine output: output/audit/csr_factorized_operator_anisotropy.json.
