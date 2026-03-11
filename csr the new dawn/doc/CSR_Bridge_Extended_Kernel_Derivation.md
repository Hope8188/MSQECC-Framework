# CSR Bridge Extended Kernel Derivation (Nonlocal Bridge Attempt)

Status: attempt. This file explores whether an extended nonlocal bridge could yield a cubic IR operator. It is not derived from the core bridge; it is a designed extension to test feasibility.
March 2026.

## Assumptions (Explicit)
A1. The extended bridge induces an effective nonlocal kernel J(r) between lattice sites or edges.
- Verified: NO (this is a designed extension).

A2. The kernel is of fractional-Laplacian class: J(r) ~ 1/|r|^{d+sigma} in d=3.
- Verified: NO (assumption for feasibility testing).

## Derivation (Discrete Fourier Symbol)
For a translation-invariant kernel J(r), the Fourier symbol is
- K(p) = sum_r J(r) * (1 - cos(p · r)).

In the fractional-Laplacian class, the expected small-p behavior is:
- |p|^sigma for sigma < 2,
- p^2 for sigma >= 2 (finite second moment, quadratic expansion dominates).

## Numerical Check (Lattice)
We compute the discrete Fourier symbol on a periodic cubic lattice (size 20) and fit the small-p exponent.

Machine output:
- `output/audit/csr_bridge_extended_kernel_derivation.json`
- `verification/csr_bridge_extended_kernel_derivation.py`

Observed fits:
- sigma = 1.0 -> exponent ~1.48 (finite-size effects, but <2)
- sigma = 2.0 -> exponent ~1.90 (near quadratic)
- sigma = 3.0 -> exponent ~2.09 (quadratic)

## Implication for the q=3 Target
A simple power-law nonlocal kernel of fractional-Laplacian class does NOT yield |p|^3 in the IR. For sigma >= 2 the kernel becomes quadratic at small p.

Therefore:
- An extended bridge of this simple class is insufficient to produce a cubic IR operator.
- Achieving |p|^3 would require a different non-analytic structure than a standard power-law kernel with finite second moment.

## Gate 1 Status Under This Attempt
- Derived cubic operator: NO
- Gate 1: FAIL (for this nonlocal class)

This is a feasibility test, not a derivation from the core bridge. It rules out a large class of nonlocal extensions.
