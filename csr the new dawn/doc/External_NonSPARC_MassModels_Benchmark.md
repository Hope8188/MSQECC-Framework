# External Non-SPARC Massmodels Benchmark

## Purpose

The project needed a real external test that is not the Milky Way reconstruction and not the SPARC training set.

This benchmark uses a public multi-galaxy mass-model file with exact-name SPARC overlaps removed.

## Dataset

The source file is `data/external/mcgaugh_massmodels/galaxy_massmodels.dat`.

After removing exact-name overlaps with the local SPARC catalog and requiring at least five radial points per galaxy, the benchmark uses `47` galaxies.

For each galaxy the file supplies:

- radius `R`
- observed velocity `Vobs`
- gas contribution `Vgas`
- stellar contribution `Vst`
- stellar scaling factors `Qmax` and `Qpop`

The benchmark uses the population-synthesis branch:

`v_star^2 = Qpop * Vst * |Vst|`

with

`v_bar^2 = v_gas^2 + v_star^2`

## Frozen Model

The MSQECC model is trained only on SPARC, then frozen.

The fitted global SPARC parameters are:

- `k = 9.500861`
- `C = 0.005409`

No external refit is performed.

## Aggregate Pointwise Results

Across all external points combined:

- MSQECC: `R^2 = 0.6819`
- MOND: `R^2 = 0.8482`
- baryons-only: `R^2 = -0.1808`

So the external aggregate signal is positive for MSQECC and substantially better than baryons-only.

## Per-Galaxy Results

The per-galaxy picture is much harsher.

Median `R^2`:

- MSQECC: `-7.2578`
- MOND: `-3.3669`
- baryons-only: `-39.8371`

Counts:

- MSQECC positive on `9/47` galaxies
- MOND positive on `15/47` galaxies
- MSQECC beats MOND on `10/47` galaxies
- MSQECC beats baryons-only on `44/47` galaxies

## Interpretation

This is not a clean win or a clean failure.

What survives:

- the frozen SPARC model does capture enough real structure to produce a positive aggregate external `R^2`,
- and it decisively beats baryons-only in the aggregate and on most galaxies.

What does not survive:

- the model is not robust at the per-galaxy level,
- MOND remains clearly stronger in the aggregate and on more individual galaxies,
- and the median per-galaxy performance is still negative.

So the honest external status is now:

- better than the earlier Milky Way-only stress test suggested,
- but still not strong enough to claim external validation.

## Important Caution

This overlap removal used exact catalog-name matching. It is therefore a strong external test, but not yet a perfect alias-resolved de-duplication against every historical naming convention.

## File Produced

The full benchmark is in `output/audit/external_non_sparc_massmodels_benchmark.json`.
