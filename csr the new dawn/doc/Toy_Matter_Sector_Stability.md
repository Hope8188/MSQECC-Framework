# Toy Matter-Sector Stability Check

**Date:** March 8, 2026

## Purpose

The matter-coupling memo proposed that gas and stellar sectors should be represented by different matter observables coupled to the `T^3` code backbone.

This note asks the first falsifiable question about that idea:

Can coherent gas and localized stellar sectors both be exact invariant subspaces of a closed code-plus-matter Hamiltonian when both coherence and localization couplings are present?

## Toy Model

Take a reduced model with:

- two commuting code checks represented by eigenvalues `a = +/-1` and `b = +/-1`,
- one effective matter qubit,
- coherence measured by `sigma_x`,
- localization measured by `sigma_z`.

For each code sector `(a, b)`, define

`H_ab = -(J_A a + J_B b) I - (h_x + lambda_c a) sigma_x - (h_z + lambda_l b) sigma_z`

Interpretation:

- `sigma_x` is the gas-like coherence axis,
- `sigma_z` is the star-like localization axis,
- `lambda_c` couples code response to coherence,
- `lambda_l` couples code response to localization.

## Exact Sector Conditions

The gas projector is exact only if it commutes with the Hamiltonian:

`[H_ab, sigma_x] = 0`  if and only if  `h_z + lambda_l b = 0`

The star projector is exact only if

`[H_ab, sigma_z] = 0`  if and only if  `h_x + lambda_c a = 0`

For these conditions to hold in **all** code sectors, the requirements are:

- global gas-sector invariance: `h_z = 0` and `lambda_l = 0`
- global star-sector invariance: `h_x = 0` and `lambda_c = 0`

So in a closed system with both coherence and localization couplings active, neither sector is generically exact.

## Reproducible Check

A script implementing this toy model is archived in:

- `verification/toy_matter_sector_stability.py`
- `output/audit/toy_matter_sector_stability.json`

Representative parameter choice:

- `J_A = 1.0`
- `J_B = 1.0`
- `h_x = 0.8`
- `h_z = 0.6`
- `lambda_c = 0.7`
- `lambda_l = 0.5`

Result by code sector:

- `A=-1, B=-1`: gas max leakage `0.500`, star max leakage `0.500`
- `A=-1, B=1`: gas max leakage `0.992`, star max leakage `0.008`
- `A=1, B=-1`: gas max leakage `0.004`, star max leakage `0.996`
- `A=1, B=1`: gas max leakage `0.350`, star max leakage `0.650`

## Interpretation

This toy model does not prove that the matter-coupling idea is wrong.

It does prove something important about the next step:

- if gas coherence and stellar localization are modeled by noncommuting observables, they do not both define exact invariant sectors of a closed Hamiltonian once both couplings are turned on.

So a realistic matter-coupling theory will need one of the following:

- an open-system decoherence mechanism selecting the stellar pointer basis,
- a separation of timescales that makes one sector effectively stable,
- or a different algebraic construction in which gas and star observables commute in the relevant subspace.

## Bottom Line

The first toy calculation identifies a new structural constraint on the missing bridge.

A closed code-plus-matter Hamiltonian with simultaneous coherence and localization couplings does **not** automatically give stable gas and stellar sectors. That means the matter-coupling map probably has to be an open-system or effective theory, not just a bare closed Hamiltonian.
