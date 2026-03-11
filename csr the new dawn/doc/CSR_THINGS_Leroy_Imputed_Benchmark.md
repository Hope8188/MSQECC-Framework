# CSR THINGS Leroy Imputed Benchmark

## Purpose

This note records the `11/11` sensitivity benchmark obtained by adding bounded imputed handles for `n4449` and `n3077`.

The machine-readable audit is in `output/audit/csr_things_leroy_imputed_benchmark.json`.

## Dataset

- total target list: `11`
- used: `11`
- imputed handles: `n4449`, `n3077`

This benchmark is for stability checking only. The primary external benchmark remains the `9/11` primary-source set.

## Aggregate Benchmark

- weighted Hodge aggregate `R^2 = 0.2328`
- tensorial Hodge aggregate `R^2 = 0.2350`
- retarded Hodge aggregate `R^2 = 0.1826`
- MOND aggregate `R^2 = 0.4106`
- baryons-only aggregate `R^2 = 0.0972`

## Reading

Adding the two imputed handles changes sensitivity, but not direction.

The operator branches remain well below MOND.

The retarded branch does not become competitive after the added coverage.

So the imputed benchmark is useful as a robustness check, not as a route to a better external claim.

## Bottom Line

The `11/11` sensitivity test confirms the same conclusion as the primary-source `9/11` benchmark: current operator reductions are not yet robust external laws.
