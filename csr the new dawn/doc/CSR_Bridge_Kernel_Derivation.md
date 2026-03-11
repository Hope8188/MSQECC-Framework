# CSR Bridge Kernel Derivation (Core)

This note derives the spatial kernel implied by the core bridge generator alone.
March 2026.

## Assumptions (Explicit)
A1. The bridge generator is stabilizer monitoring with jump operators proportional to plaquette checks B_p.
- Verified: YES (CSR_Bridge_Object_Core.md).

A2. The bridge coupling to matter is local on a single edge e, using X_e.
- Verified: YES (CSR_Bridge_Object_Core.md).

A3. The adjoint action of the Lindblad generator on X_e captures the spatial structure of any kernel that could arise from the bridge alone.
- Verified: YES (this is standard for open-system generators; no additional modeling assumed).

## Derivation (Minimal)
For a plaquette operator B_p containing edge e:
- B_p X_e B_p = -X_e
- D^dagger[B_p](X_e) = B_p X_e B_p - X_e = -2 X_e

Only plaquettes incident on e anticommute with X_e. All other plaquettes commute and contribute 0.

On a cubic T^3 lattice, each edge touches four plaquettes, therefore:
- sum_p D^dagger[B_p](X_e) = -8 X_e

This derivation is verified numerically by a direct matrix computation in:
- `verification/csr_bridge_kernel_derivation.py`

Machine output:
- `output/audit/csr_bridge_kernel_derivation.json`

## Implication for the Spatial Kernel
The adjoint action produces a local damping of X_e with a scalar rate. There are no spatial derivative terms and no coupling to neighboring edges in the generator itself.

Therefore, the kernel implied by the bridge generator alone is:
- ultralocal (delta in real space)
- constant in momentum space (p^0), not p^2 or p^3

This is a hard obstruction: the core generator by itself cannot produce a cubic spatial kinetic operator.

## Gate 1 Status Under This Derivation
Gate 1 asks for a derived cubic IR operator (|grad phi|^3 / |p|^3) without insertion.

From the core bridge generator alone:
- derived cubic operator: NO
- Gate 1: FAIL

This is not a failure of the full program, only a statement about the current core bridge object. A nonlocal kernel would require an explicit observable map and a coarse-graining mechanism not yet written in the core.
