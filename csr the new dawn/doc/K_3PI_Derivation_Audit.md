# k = 3pi Derivation Audit

Date: 2026-03-08

## Claim under review
The project has repeatedly claimed that the gas-weight parameter `k = 3*pi` is a first-principles prediction of a quantum error-correcting spacetime geometry, sometimes described as coming from a stabilizer code on `T^3` and sometimes as a holographic `S^3 -> S^2` boundary ratio.

## Audit result
No first-principles derivation of `k = 3*pi` exists in this repository.

The current codebase supports only this narrower statement:
- the SPARC rotation-curve ansatz has an empirically useful gas-weight region near `k = 3*pi`,
- but `k = 3*pi` is not derived from the claimed QECC stabilizer structure.

## What was checked
I reviewed the local derivation scripts and theory notes that explicitly discuss `k`, `T^3`, `S^3`, stabilizers, or topological counting.

Key files reviewed:
- `archive/legacy_scripts/derive_k_theoretical.py`
- `archive/legacy_papers/new age/# Entanglement Stress as Dark Matte.txt`
- `archive/legacy_notes/MSQECC_Version_IX_Addendum.md`
- `archive/legacy_notes/MSQECC_Version_IX_Addendum.md` sections on `T^3` and `b_1(T^3)=3`

## What the local material actually does
### 1. The only explicit closed-form calculation is heuristic
The script `archive/legacy_scripts/derive_k_theoretical.py` computes

`k = (Volume(S^3) / Area(S^2)) * 6 / R = 3*pi`

This is not a stabilizer derivation. It inserts three unsupported choices:
- an `S^3` bulk and `S^2` boundary rather than the separately claimed `T^3` code manifold,
- a coordination number `6` supplied by hand,
- an assumed cancellation of `R` without a derivation of why this is the correct dimensionless observable.

That construction can reproduce `3*pi`, but it does not prove that nature or the code must choose it.

### 2. The topology claims are internally inconsistent
Different files claim different origins for the same constant:
- `S^3/S^2` boundary geometry,
- `T^3` first Betti number arguments,
- `ln(2)` times a de Broglie wavelength ratio with an unspecified exponent `n`.

These cannot all be the same derivation. A real first-principles result should have one starting point, one chain of logic, and one invariant quantity being computed.

### 3. The `T^3` material does not derive `k`
The local `T^3` discussion supports only the separate statement that `b_1(T^3) = 3` for a 3-torus. That is a standard topology fact. It does not yield `3*pi`, does not count gas versus stellar entropy, and does not produce a dimensionless weight for the SPARC ansatz.

### 4. No stabilizer algebra appears in the derivation path
The claimed target was a derivation from QECC stabilizer structure. The audited files do not compute:
- stabilizer ranks,
- logical-qubit counts,
- syndrome degeneracies,
- code rates,
- entanglement entropies for gas and stellar sectors,
- or any operator algebra whose ratio evaluates to `3*pi`.

Without that structure, the calculation is not a QECC derivation.

## Conclusion
`k = 3*pi` must be retired as a derived prediction.

The honest status is:
- `k = 3*pi` is a fixed empirical hypothesis that happens to sit near a useful region of the SPARC fit landscape.
- The repository does not contain a valid analytic proof that this value follows from QECC first principles.
- Any paper claiming that `k = 3*pi` has been derived should be corrected.

## What would be required to revive the claim
A valid derivation would need all of the following:
- one unambiguous microscopic starting point,
- one explicit code manifold, not alternating between `S^3` and `T^3`,
- a concrete stabilizer or tensor-network calculation of gas-sector and stellar-sector entanglement weights,
- no ad hoc index inserted to force the answer,
- and a final expression that lands at `3*pi` without fitting or back-solving.

Until that exists, `k = 3*pi` is not a theorem.
