# CSR External 20-Galaxy Benchmark

## Result

The workspace now contains an alias-clean external rotation-curve set with `20` galaxies drawn from two local files:

- `RCsmooth.0701.dat`
- `galaxy_massmodels.dat`

The benchmark audit is in [csr_external_20_dataset_benchmark.json](output/audit/csr_external_20_dataset_benchmark.json).

## Critical Caveat

This is a clean external rotation-curve set.

It is **not** yet a clean `20`-galaxy baryonic-decomposition set in the strong sense required by the falsifiability clause.

Only `3` of the `20` galaxies have nonzero published baryonic component terms in the current local files:

- `m33`
- `n1560`
- `n5533`

The other `17` clean `RCsmooth` galaxies are sample-II style entries with luminous terms set to zero in the file.

So the sample is large enough for an external rotation-curve check, but not large enough for the final decomposition-grade falsification test.

## Aggregate Pointwise `R^2`

On the full alias-clean `20`-galaxy set:

- derived CSR zero-force: `-1.1456`
- baryons-only: `-1.1456`
- MOND: `-1.0421`
- legacy frozen MSQECC: `-1.0488`

## Median Per-Galaxy `R^2`

- derived CSR zero-force: `-9.2173`
- baryons-only: `-9.2173`
- MOND: `-8.5282`
- legacy frozen MSQECC: `-8.5282`

## Interpretation

This result is harsh but clean.

At the current derivation order, the benchmarkable CSR kernel is still zero-force, so it reduces to baryons-only and fails badly on the external set.

The legacy frozen MSQECC fit also fails badly here.

MOND is less bad, but still negative overall on this mixed external set.

## What This Does And Does Not Settle

It does settle that the current derived CSR kernel is not externally viable.

It does not settle the final falsifiability clause because the decomposition-grade subset is still only `3` galaxies locally, not `20+`.

## Bottom Line

There is now a real clean external sample for pressure-testing claims.

It does not rescue CSR.

It shows that the next surviving route has to come from a new derivation, not from the current zero-force bridge limit.
