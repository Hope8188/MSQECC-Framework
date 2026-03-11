# MSQECC Matter-Coupling Memo

**Date:** March 8, 2026

## Status

This memo is not a derivation.

It is a candidate scaffold for the missing map between the `T^3` toric-code backbone and physical matter variables. Its purpose is to make the next algebraic step explicit enough that it can fail cleanly.

## 1. Problem Statement

The `T^3` toric code provides:

- edge qubits,
- stabilizers `A_v` and `B_p`,
- logical loops and membranes,
- and `3` encoded qubits.

It does not provide:

- gas versus stellar sectors,
- a charge sector resembling `U(1)`,
- or an entanglement stress operator `T^ent` with physical matter content.

To move beyond phenomenology, MSQECC needs an explicit coupling map from matter observables to code observables.

## 2. Minimal Design Criteria

Any viable matter-coupling map has to do five jobs.

1. Distinguish diffuse, phase-coherent gas from localized, decohered stellar matter.
2. Produce a code-space observable whose expectation value can modify the galaxy response.
3. Permit a definition of entanglement stress as a response quantity.
4. Leave the pure stabilizer backbone intact in the vacuum limit.
5. Reduce to ordinary local matter observables when the code interpretation is switched off.

## 3. Candidate Hilbert-Space Structure

A minimal extension is:

`H_total = H_code tensor H_matter`

with

- `H_code`: edge-qubit toric-code Hilbert space on `T^3`,
- `H_matter`: coarse-grained matter registers attached to edges, vertices, or cells.

A practical coarse-grained choice is:

- edge occupation operators `n_e` for baryonic loading,
- vertex localization operators `l_v` for compact collapsed structures,
- bond-coherence operators `c_{ee'}` built from a reduced one-body density matrix.

The code then talks to matter through an interaction Hamiltonian.

## 4. Candidate Interaction Hamiltonian

A minimal schematic interaction is

`H_int = lambda_n sum_e n_e Z_e + lambda_c sum_{<e,e'>} c_{ee'} X_e X_{e'} + lambda_l sum_v l_v A_v`

Interpretation:

- `lambda_n` couples baryonic occupation to flux-like loading of the code,
- `lambda_c` couples phase coherence to correlated code flips,
- `lambda_l` couples strong localization to star-check response.

This is not unique. It is only the smallest algebraic form that can distinguish occupation, coherence, and localization.

## 5. Candidate Sector Definitions

### 5.1 Gas Sector

A candidate gas sector should represent diffuse matter with high phase coherence and low localization.

Define a gas-sector projector by thresholds on coherence and localization:

`P_gas = 1[ C > C_* ] 1[ L < L_* ]`

where

- `C = sum_{<e,e'>} |c_{ee'}| w_{ee'}` is a coherence functional,
- `L = sum_v l_v` is a localization functional.

This makes gas an algebraic sector of `H_matter`, not a verbal label.

### 5.2 Stellar Sector

A candidate stellar sector should represent localized pointer-like states with low phase coherence and large localization.

Define

`P_star = 1[ C < C_* ] 1[ L > L_* ]`

This gives two candidate sectors in which observables can actually be evaluated.

## 6. Candidate Weight for k

The correct lesson from the failure audit is that `k` must come from a defined response quantity, not from geometry alone.

A workable candidate is a sector susceptibility:

`W_sector = d^2 F_sector / d lambda^2`

where `F_sector` is the free energy restricted to the chosen sector and `lambda` is whichever coupling controls the code response most directly.

Then define

`k_candidate = W_gas / W_star`

This has three advantages:

- it is dimensionless,
- it is computed from defined sectors,
- and it turns `k` into a response ratio rather than a guessed geometric constant.

At present this is only a scaffold. No calculation in this memo shows that `k_candidate = 3*pi`.

## 7. Candidate Entanglement Stress

A code-space stress tensor should be defined as a response of the interacting free energy to geometric deformation.

A natural coarse-grained definition is

`T^ent_ij = -(1 / V) dF / d g^ij`

where `F = -beta^-1 log Tr exp[-beta(H_code + H_int)]`.

On the lattice, this means introducing anisotropic couplings or bond lengths and differentiating with respect to those deformations.

This does two things:

- it gives `T^ent` an explicit operator origin,
- it makes its amplitude a calculable response quantity rather than an analogy.

## 8. What This Would Change For IBM Tests

If `T^ent` is defined through the interacting free energy, then the observable hardware correlation is not just a shape. It is a connected correlator:

`C_ij = <O_i O_j> - <O_i><O_j>`

for some code observable `O_i` sourced by the deformed interaction.

Only after that step can one ask:

- does `C_ij` decay exponentially,
- algebraically,
- or vanish in the stabilizer limit?

At that point the amplitude is no longer optional. It drops out of the same calculation.

## 9. What This Would Change For alpha

The bare `Z2` toric code cannot produce the electromagnetic coupling.

If alpha is to emerge, the framework likely needs an enlarged gauge structure or an effective `U(1)` sector built on top of the stabilizer backbone.

The minimal lesson is:

- alpha cannot be extracted from the current code alone,
- but it might be extractable from an extended code-plus-matter theory if charge transport is represented by a distinct coupling channel.

## 10. Immediate Tests Of The Scaffold

This memo becomes useful only if it can fail quickly.

The next checks should be:

1. Show that `P_gas` and `P_star` are non-empty and stable under time evolution for some simple toy `H_matter`.
2. Show that `W_gas` and `W_star` are finite and basis-independent.
3. Check whether `k_candidate` depends strongly on arbitrary threshold choices `C_*` and `L_*`.
4. Determine whether the connected correlator `C_ij` is short-ranged in the stabilizer limit and only becomes long-ranged after adding specific matter couplings.

If these checks fail, the scaffold is wrong and should be discarded.

## 11. First Toy-Model Check

A new toy calculation in `Toy_Matter_Sector_Stability.md` and `verification/toy_matter_sector_stability.py` tests the simplest closed code-plus-matter Hamiltonian carrying both coherence and localization couplings.

Result:

- once both couplings are active, neither the gas projector nor the star projector is generically an exact invariant subspace across all code sectors.

This is useful because it means a realistic matter-coupling theory probably has to be:

- an open-system effective theory,
- a separated-timescale theory,
- or a commuting-subspace construction stronger than the naive closed Hamiltonian.
## 11. Bottom Line

This memo does not fix MSQECC.

What it does is identify a plausible algebraic place where the missing bridge could live:

- not in bare topology,
- not in geometry alone,
- but in the response of the toric-code backbone to explicitly represented matter occupation, coherence, and localization.

That is the first version of a matter-coupling map that can be computed, falsified, and improved.


## Open-System Follow-Up

The first open-system extension now clarifies what a viable stellar-sector mechanism would need.

Using the same representative two-level block as the closed toy model, the addition of

- `L_phi = sqrt(gamma_phi) sigma_z`
- `L_relax = sqrt(gamma_relax) sigma_minus`

can stabilize an approximate stellar pointer sector across all four code sectors, but only when the dissipators are chosen to prefer the localized `z` basis explicitly.

The key quantitative landmarks are:

- pure dephasing alone drives the worst-case star weight only to `0.500`,
- balanced dissipation `gamma_phi = 4`, `gamma_relax = 4` reaches worst-case star weight `0.908`,
- strong dissipation `gamma_phi = 8`, `gamma_relax = 8` reaches worst-case star weight `0.973` with worst-case coherence `0.071`.

So the open-system route is not empty. But it does not yet derive the stellar sector from the toric-code backbone. It only shows that any successful matter-coupling construction will likely need a code-derived effective environment that selects the pointer basis and drives relaxation toward it.
