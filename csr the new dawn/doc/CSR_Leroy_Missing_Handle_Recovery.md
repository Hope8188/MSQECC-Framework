# CSR Leroy Missing Handle Recovery

## Purpose

This note records the bounded local recovery of the two Leroy galaxies with missing published parametric rotation-curve handles.

The machine-readable audit is in `output/audit/csr_leroy_missing_handle_recovery.json`.

## Situation

In Leroy 2008 `table4.dat`:

- `n4449` has missing `v_flat` and `l_flat`
- `n3077` has missing `v_flat` and `l_flat`

This is a real data gap in the local tables, not a parser bug.

## Recovery Method

A bounded imputation was run from the rest of `table4` using inverse-distance weighted kNN on the numeric galaxy properties:

- distance
- inclination
- `B` magnitude
- `r25`
- `log M*`
- `log MHI`
- `log MH2`
- SFR
- `l*`
- `lSFR`
- `lCO`

Training size:

- `21` galaxies with non-missing `v_flat` and `l_flat`

Cross-validation error:

- `v_flat` MAE `31.21 km/s`
- `l_flat` MAE `1.56 kpc`

## Recovered Handles

- `n4449`: `v_flat = 84.36 km/s`, `l_flat = 1.16 kpc`
- `n3077`: `v_flat = 74.81 km/s`, `l_flat = 1.07 kpc`

These are explicitly marked as imputed, not primary-source fit values.

## Reading

This recovery is useful for sensitivity tests only.

It is not strong enough to replace the primary-source `9/11` benchmark with an `11/11` benchmark as the main result.

## Bottom Line

The two missing Leroy handles can be filled locally only by bounded imputation. That closes the coverage gap for sensitivity testing, but not for the primary benchmark claim.
