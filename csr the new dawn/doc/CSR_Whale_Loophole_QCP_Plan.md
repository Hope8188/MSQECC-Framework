# White Whale Plan A: T3 Gapless QCP Route

Goal: derive a 1/|x|^3 correlation for the relevant scalar observable on T3, which yields a non-analytic |p|^3 kernel.
Status: plan only. No new physics inserted.
March 2026.

## Why this is the only QCP route
- The no-go theorem closes all finite-second-moment kernels (analytic p^2).
- A 1/|x|^3 correlator is the unique marginal case that can produce |p|^3 behavior in d=3.

## Assumption audit (must be verified before any claim)
A1. There exists a quantum critical point (QCP) in the T3 toric-code family accessible by tuning a Hamiltonian parameter.
- Verified: NO.
A2. The target observable (the scalar proxy derived from edge coherence) has scaling dimension Delta = 3/2 at that QCP.
- Verified: NO.
A3. The relevant operator couples to the bridge in a way that survives the open-system reduction.
- Verified: NO.

## Required derivations (hard gates)
1. **Identify the critical Hamiltonian**
   - Specify the T3 Hamiltonian deformation that generates a QCP (e.g., string tension, magnetic field, or loop terms).
   - Compute or cite the phase diagram and locate the critical point.
   - Gate A: existence of QCP with algebraic correlations.

2. **Compute the scaling dimension of the bridge-relevant operator**
   - Identify the operator O(x) tied to edge coherence or plaquette order.
   - Derive <O(x)O(0)> ~ 1/|x|^{2 Delta}.
   - Gate B: Delta = 3/2 (so 2 Delta = 3).

3. **Show kernel divergence (infinite second moment)**
   - Demonstrate that J(r) ~ 1/r^3 for the bridge-relevant observable.
   - Verify that the second moment diverges, invalidating the analytic p^2 expansion.
   - Gate C: non-analytic |p|^3 term in Fourier space (no log-only case).

4. **Integrate with bridge map**
   - Confirm that the observable map uses the same operator O(x).
   - Show that the open-system reduction does not kill the long-range correlations.
   - Gate D: non-analytic kernel survives the bridge reduction.

## Outputs if successful
- A derived |p|^3 kernel from a critical T3 phase.
- Gate 1 PASS without insertion.
- Permission to attempt the fixed-point computation.

## If any gate fails
- Record as a closed loophole and keep the no-go theorem intact.

## Immediate next work (if you want me to proceed)
- Draft a concrete candidate QCP Hamiltonian and list required references.
- Define the exact operator O(x) to measure (edge coherence vs plaquette loop).
- Write the minimal renormalization group calculation needed to extract Delta.
