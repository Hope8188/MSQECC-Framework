# MSQECC Paragon Synthesis: Foundation-Corrected Core

**Revised after the T^3 toric-code foundation audit - March 8, 2026**

## Abstract

The strongest defensible version of MSQECC is now smaller and clearer. The project contains one real empirical core: a SPARC rotation-curve ansatz that outperforms baryons-only baselines and improves modestly when morphology is included. It also now contains one explicit mathematical backbone: the standard `Z2` toric code on `T^3`, written as a periodic cubic-lattice stabilizer code with `3` encoded qubits. What it still does not contain is the missing bridge between the two. The plain `T^3` toric code does not define gas and stellar sectors, does not derive `k = 3*pi`, does not produce the claimed inverse-square hardware law, and does not naturally generate the polynomial `4*pi^3 + pi^2 + pi`. The corrected conclusion is that MSQECC is presently a phenomenological galaxy program with a speculative QECC interpretation, not a finished unification framework.

## 1. The Part That Survives Contact With Data

The SPARC model family remains nontrivial:

- Optimized MSQECC: `R^2 = 0.8159 +/- 0.0377`
- Fixed `k = 3*pi`: `R^2 = 0.8179 +/- 0.0390`
- Morphology-aware 3-bin model: `R^2 = 0.8240 +/- 0.0338`
- MOND baseline: `R^2 = 0.9299 +/- 0.0133`
- Baryons-only baseline: `R^2 = 0.5469 +/- 0.1117`

That is enough for a serious phenomenology result. It is not enough for a theory of everything.

## 2. The Foundation Choice

The first correction is conceptual discipline: pick one code manifold and stay there.

The defensible choice is `T^3`, not alternating stories involving `S^3`, `T^3`, and unspecified compact manifolds. On `T^3`, the toric-code stabilizer algebra is explicit and standard.

Take an `L x L x L` periodic cubic lattice with qubits on edges.

- `A_v = product X_e` over the edges incident on vertex `v`
- `B_p = product Z_e` over the boundary of plaquette `p`
- `H = - sum_v A_v - sum_p B_p`

These operators commute and define the code space as their simultaneous `+1` eigenspace.

Logical structure:

- noncontractible `Z` loops along the three 1-cycles,
- noncontractible `X` membranes across the three dual 2-cycles,
- `3` encoded qubits.

A new finite-size sanity script verifies this locally for `L = 2, 3, 4`.

## 3. Where the Theory Actually Breaks

The most important result of the foundation audit is negative.

The plain `T^3` toric code knows about:

- stabilizers,
- loops,
- membranes,
- topological sectors,
- homology ranks.

It does **not** know about:

- HI gas versus stars,
- a baryonic coherence weight,
- a `U(1)` electromagnetic coupling,
- an entanglement stress tensor with defined matrix elements,
- or a cosmological saturation functional that outputs `ln(2)`.

That missing matter-coupling layer is the real gap.

## 4. The k = 3pi Claim After Foundation Audit

Before this pass, the claim was "`k = 3*pi` is unsupported."

After the `T^3` toric-code audit, the claim is stronger and cleaner:

- the standard toric code on `T^3` does not even define the two sectors whose ratio would equal `k`.

So the corrected status is:

- `k = 3*pi` is not derived,
- not a toric-code invariant,
- and not presently a QECC prediction.

It remains an empirically useful hypothesis inside the galaxy ansatz.

## 5. Morphology Is Real, But It Is Not the Whole Fix

The morphology benchmark matters because it identifies real missing structure.

- overall `C` versus `log(M_b)`: `r = 0.292`
- after 3-bin morphology conditioning: `r = 0.086`
- after exact T-type conditioning: `r = 0.026`

That is a real clue. It means galaxy structure carries part of the physics that the global model misses.

But the predictive gain remains modest. The best morphology-aware result still falls well short of MOND.

## 6. The IBM Claim After Proper Testing

Two things now point the same way.

Empirically:

- the preregistered IBM sweep on `ibm_marrakesh` and `ibm_torino` failed its own inverse-square success rule.

Mathematically:

- the plain gapped local toric code on `T^3` does not naturally produce a long-range inverse-square idle-correlation law.

So the corrected quantum statement is not merely "hardware did not confirm the claim." It is:

- the standard `T^3` toric-code foundation does not currently imply the claim.

## 7. The Constant Claims

### alpha

`4*pi^3 + pi^2 + pi` remains an extraordinary coincidence.

But the plain `Z2` toric code is a discrete `GF(2)` stabilizer system, not a `U(1)` coupling theory. Its natural invariants are integers and parities, not that polynomial in `pi`.

So alpha remains a target, not a derivation.

### Lambda

The actual toric-code rate on `T^3` is `K/N = 1/L^3`.

That is useful. It is not a derivation of the cosmological constant, and it does not by itself produce the Digital Horizon `ln(2)` factor.

### Three Generations

The code really does encode `3` logical qubits on `T^3`.

What remains unproved is the physical identification of those qubits with the `3` fermion generations and the uniqueness of `T^3` among compact flat 3-manifolds.

## 8. The Correct Scientific Standing

The project is best described as:

- a real galaxy phenomenology result,
- a standard topological-code foundation on `T^3`,
- and a missing physical coupling layer that still has to be built.

That is smaller than the original ambition, but it is mathematically cleaner and scientifically harder to dismiss.

## Conclusion

Writing down the stabilizer algebra was the right move because it reveals the actual bottleneck. The toric code is not the problem. The missing bridge from the toric code to matter is the problem.

Until that bridge exists, MSQECC cannot honestly claim that the toric code predicts `k = 3*pi`, the IBM inverse-square law, alpha, Lambda, or three generations. What it can honestly claim is a nontrivial galaxy fit and a clear mathematical place where the next real theory work has to happen.
