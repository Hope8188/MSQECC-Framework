# CSR Bridge Self-Energy: Gate 1b Results

Does the bridge yield `Sigma(p) ~ |p|^3` in the IR?
March 2026.

Machine-readable output:
- `output/audit/bridge_computation_result.json`

Scope note:
- These results are for a power-law bubble / Yukawa/Dirac effective bridge class.
- They close that perturbative mechanism class as a route to `|p|^3` in the IR.
- They do not decide the actual toric-code/open-system bridge unless an explicit mapping to an effective scalar operator is written.

## Core Theorem: The n=3 Barrier
For a bridge propagator `G(q) ~ 1/|q|^beta` in `d=3`, the bubble scaling is:
- `Sigma(p) ~ |p|^(3 - 2 beta)`

Therefore:
- reaching `Sigma(p) ~ |p|^3` requires `beta = 0`, i.e. `G(q)` constant (no propagation), which is unphysical

This closes the entire class of simple power-law bridge bubbles as a route to `|p|^3` in the IR.

## Additional Closures Recorded
- Massless Dirac/QED3 bubble yields `Sigma(p) ~ |p|` (wrong direction for the `q=3` target)
- One-derivative edge vertex is killed exactly by the Ward identity (self-energy contribution is zero)
- Two-derivative vertices reach `n=3` only in the UV regime, not in the IR regime relevant for galaxies
- Loop corrections shift kinetic functions toward `f(X) ~ X^(1/2)`; the MOND target is `f(X) ~ X^(3/2)`

## Updated Gate Result
Closed (perturbative/loop routes):
- Standard Yukawa bubble
- Power-law bubbles (theorem)
- Derivative edge vertex (Ward identity)
- Two-derivative vertex in the IR

Open (requires explicit bridge algebra to evaluate):
- Tree-level `|grad phi|^3` coupling in the bridge-modified effective object
- A genuinely non-perturbative resummation mechanism for the kinetic function `f(X)`

## One Remaining Computable Check
Write the explicit bridge object and coupling/mapping, then answer:
- does the IR effective operator contain a cubic kinetic term without inserting MOND by hand?
