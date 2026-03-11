# CSR Bridge Nonanalytic Kernel Attempt (Designer)

Status: attempt. This note documents a designer kernel that enforces `K(p) = |p|^3` directly in momentum space.
It is not derived from the core bridge generator; it illustrates what a cubic IR operator requires.
March 2026.

## Assumption (Explicit)
A1. Set the lattice Fourier symbol to `K(p) = |p|^3` on a periodic cubic lattice.
- Verified: NO (this is an insertion to inspect structure).

## Method
- Build `K(p) = |p|^3` on a size-20 periodic lattice in momentum space.
- Inverse FFT to obtain the real-space kernel `J(r)`.
- Compute radial averages and tail statistics to assess nonlocality.

Machine output:
- `output/audit/csr_bridge_nonanalytic_kernel_attempt.json`
- `verification/csr_bridge_nonanalytic_kernel_attempt.py`

## Results (From the Attempt)
- The kernel is long-range and sign-changing in real space.
- Tail ratio (abs-weight outside nearest neighbors): ~0.56.
- Mean sign changes across radius bins: 81.

These diagnostics confirm that a cubic operator requires a highly nonlocal, oscillatory kernel.

## Gate 1 Implication
This attempt does NOT satisfy Gate 1 because it inserts the |p|^3 structure by hand.
A Gate 1 pass requires the same structure to be derived from the explicit bridge algebra.

## Bottom Line
The cubic operator is possible in principle, but only through a genuinely nonlocal kernel.
Until such a kernel is derived from the bridge object, Gate 1 remains a fail.
