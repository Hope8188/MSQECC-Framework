# CSR Direct Observed External Gate

## Purpose
This document replaces the earlier parametric 9-galaxy THINGS/Leroy curve as the main observed external gate in the strict CSR evidence workflow.

The new main gate uses direct observed rotation curves with local baryonic decomposition from `galaxy_massmodels.dat`. It is smaller than the parametric Leroy set, but it is cleaner because it compares model predictions directly against observed velocity tables rather than a published two-parameter surrogate curve.

## Dataset
- Galaxy count: `3`
- Aliases: `m33`, `n1560`, `n5533`
- Source: `data/external/mcgaugh_massmodels/galaxy_massmodels.dat`
- Condition: non-SPARC, machine-local, direct observed `Vobs` plus baryonic decomposition

## Aggregate Results
- `baryons_only`: aggregate `R^2 = 0.4628`, median `R^2 = -10.8818`
- `MOND`: aggregate `R^2 = 0.8618`, median `R^2 = 0.7552`
- `weighted_hodge`: aggregate `R^2 = 0.7550`, median `R^2 = -7.9332`
- `tensorial_hodge`: aggregate `R^2 = 0.7584`, median `R^2 = -7.6748`
- `retarded_hodge`: aggregate `R^2 = 0.8688`, median `R^2 = -2.4103`
- `scale_invariant_template`: aggregate `R^2 = 0.8776`, median `R^2 = 0.6709`
- `constraint_derived_root_law`: aggregate `R^2 = 0.8209`, median `R^2 = -6.2341`

## Per-Galaxy Pattern
### `m33`
- Strongest aggregate scorers do not all transfer cleanly.
- `retarded_hodge` does best here with `R^2 = 0.9111`.
- `MOND` is negative here with `R^2 = -0.6620`.

### `n1560`
- `scale_invariant_template` and `MOND` both do well.
- `constraint_derived_root_law` remains strongly negative.

### `n5533`
- `MOND` and `scale_invariant_template` stay positive.
- All Hodge-style structural branches remain negative.

## Interpretation
The direct observed gate exposes two distinct failure modes:

1. The Hodge/retarded CSR structural branches can post high aggregate `R^2` while still failing on median shape quality. That means they are not capturing the per-galaxy curve structure robustly.
2. The scale-invariant template remains the strongest constraint envelope, but it is still not a derived CSR law.

The new derivation-first root-law branch is important because it fails differently:
- it improves aggregate score over baryons-only,
- but it remains structurally wrong on the triple test and collapses on median external quality,
- so deriving only the closure without deriving the quotient normalization is not enough.

## Bottom Line
The direct observed gate is the correct adversarial main gate on the current machine-local external data.

It sharpens the program in three ways:
- it demotes the old parametric 9-galaxy gate to sensitivity-only,
- it confirms that aggregate score alone is not enough,
- and it shows that the next real target is a derived operator-measure law with positive per-galaxy transfer, not another high-aggregate surrogate.
