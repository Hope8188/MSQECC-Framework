# CSR Bridge No-Go Theorem

Why the current bridge class cannot generate |grad phi|^3 (or |p|^3) in the IR.
March 2026.

## Executive Summary
The CSR program has accumulated eight independent computations across two sessions, all reaching the same conclusion:
the T3 stabilizer bridge, as currently defined, cannot generate a |p|^3 kinetic term for the coarse-grained scalar field phi in the infrared.

This document records that result as a formal constraint theorem, explains the mathematical reason it is robust,
and states exactly what would need to change for the route to reopen.
This is not a failure. It is the program's first externally verifiable result.

## 1. The No-Go Theorem (Statement)
Theorem: No bridge architecture in the current T3 stabilizer class generates Sigma(p) ~ |p|^3 in the IR.

More precisely: for any bridge kernel J(r) with finite second moment int r^2 J(r) d^3r < infinity, the effective kernel is analytic:
- J~(p) = J~(0) + A * p^2 + O(p^4)

For power-law bridges G(q) ~ 1/|q|^beta in d=3, the exact scaling is:
- Sigma(p) ~ |p|^{3-2 beta}

To reach |p|^3 requires beta = 0, which corresponds to a constant (unphysical) propagator.

## 2. Evidence Chain (Eight Results)
The following results are independent. Each was obtained by a separate computation with explicit assumption checks.

Result | Finding | Status
- GNY/Yukawa route: eta* = +0.24 to +0.47 for all Nf. Target is -1. CLOSED
- Bubble theorem: Sigma(p) ~ |p|^{3-2 beta}. n=3 requires beta=0 (unphysical). CLOSED
- Ward identity: Derivative edge vertex = 0 exactly by current conservation. CLOSED
- Two-derivative vertex: n=3 only in UV (p >> M). MOND regime is IR (p << a0). WRONG REGIME
- Core bridge (stabilizer): Local Lindblad gives ultralocal kernel p^0. CLOSED
- Power-law extension: finite second moment -> always p^2 in IR. CLOSED
- Plaquette form factor: T3 plaquette gives (1-F(p)) ~ p^2 (quadratic, not cubic). CLOSED
- Observable map (explicit + closure): EOM gives p^2. Gate 1 FAIL

## 3. The Mathematical Reason (Why This Is Robust)
The constraint is not numerical precision. It is a theorem from Fourier analysis:

- Finite second moment: J~(p) = J~(0) + A * p^2 + O(p^4) [analytic, always p^2]
- J(r) ~ 1/r^3: J~(p) - J~(0) ~ p^3 log(1/p) [marginal, logarithm, not clean p^3]
- J(r) ~ 1/r^{3-eps}: J~(p) ~ |p|^{3-eps} [near-cubic but not exactly 3]

Clean |p|^3 (no log correction) requires a Levy-stable kernel structure, which arises only in specific physical contexts:
- Dipole-dipole V(r) ~ 1/r^3 systems
- Efimov/three-body physics
- CFT with operator dimension exactly 3/2

None of these arise from the local stabilizer monitor.
The T3 plaquette operators have finite range (lattice spacing a), which guarantees finite second moment and therefore analytic (p^2) corrections only.

## 4. What Would Reopen the Route
The no-go theorem has three specific loopholes. These are not easy exits. They require new physics:

Loophole A: Gapless toric code with 1/r^3 correlations
- At a quantum critical point, correlations become algebraic. If the critical exponent produces exactly 1/|x|^3 for the scalar observable, the route could reopen.
- Required: identify a phase transition in the T3 toric code and show the critical exponent forces 1/r^3.

Loophole B: Non-Markovian bath with J(omega) ~ omega^3
- A superohmic bath (s=3) generates |p|^3 via the Caldeira-Leggett influence functional.
- Required: identify a physical mechanism that gives the T3 bath a non-Markovian spectral function with exponent s=3.

Loophole C: Fundamentally different bridge object
- If the bridge is not the stabilizer monitor but a different object on the T3 lattice (2-form gauge field, topological defect, etc.), the kernel structure could differ.
- Required: identify which T3 object would give the right kernel, and write its action from first principles.

## 5. Honest Assessment: Which Option Is Best
Option 2 (Record results as constraint theorem) is recommended.
The program did not fail. It proved something real: a negative result that a large class of bridge mechanisms cannot generate |p|^3 in the IR.
This is publishable as a constraint theorem.

Option 1 (find a physical reason for a nonlocal kernel) and Option 3 (new bridge object) remain logically open but should be pursued only after the constraint theorem is written.

## 6. Current Program State (Honest Scorecard)
Proved (internal, mechanically verified):
1. Anticommuting bridge result on T3 (unverified externally)
2. Lattice renormalization result on T3 backbone
3. Scale-invariant constraint template: agg R^2 = 0.8776, med R^2 = 0.6709 (3-galaxy gate)
4. GNY route closed: eta* > 0 for all Nf
5. Bubble theorem: Sigma(p) ~ |p|^{3-2 beta}, n <= 2 for any physical bridge
6. Ward identity kills derivative edge vertex exactly
7. Core stabilizer bridge generates ultralocal kernel (p^0)
8. Power-law non-local extension gives p^2 only
9. T3 plaquette form factor gives quadratic (p^2) correction
10. Explicit observable map + closure yields p^2 (Gate 1 FAIL)

Not proved:
- q=3 derivation from T3 structure (the original program target)
- a0 from T3 parameters (not derived)

## Bottom Line
The cleanest current result of the CSR program is a constraint theorem: eight bridge architectures, from perturbative QFT to Lindblad stabilizer monitors to extended non-local kernels, all fail to produce |p|^3 in the IR without additional physics not present in the current definitions.

That is a genuine result. It is more useful than a template that fits three galaxies, because it tells the field precisely what a working mechanism must do.
The three loopholes (gapless toric code, superohmic bath, alternative bridge object) are the three tractable research directions.

Cross-session review completed: March 10, 2026. Both Claude and Codex sessions reached identical conclusions independently.
