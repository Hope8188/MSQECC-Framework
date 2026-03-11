# CSR Cleaned External Benchmark

## Result

The first honest derived CSR benchmark on the alias-clean local decomposition-grade sample collapses to baryons-only.

That is because the current semiclassical derivation does not produce a deterministic orbital kernel. The derived mean-force correction is zero at this order.

The machine-readable result is in [csr_cleaned_external_benchmark.json](output/audit/csr_cleaned_external_benchmark.json).

## Sample

After alias cleaning and SPARC-overlap removal, the local decomposition-grade external sample contains only `3` galaxies:

- `m33`
- `n1560`
- `n5533`

All three come from `galaxy_massmodels.dat`.

This is useful as a contamination-controlled stress test. It is not enough for the falsifiability clause.

## Aggregate Pointwise `R^2`

- derived CSR zero-force: `0.4628`
- baryons-only: `0.4628`
- MOND: `0.8618`
- legacy frozen MSQECC law: `0.8362`

## Median Per-Galaxy `R^2`

- derived CSR zero-force: `-10.8818`
- baryons-only: `-10.8818`
- MOND: `0.7552`
- legacy frozen MSQECC law: `-2.0692`

## Per-Galaxy

- `m33`: derived CSR `0.3855`, MOND `-0.6620`, legacy `0.2104`
- `n1560`: derived CSR `-10.8818`, MOND `0.8272`, legacy `-2.0692`
- `n5533`: derived CSR `-29.0877`, MOND `0.7552`, legacy `-4.8346`

## Interpretation

This is not evidence against the bridge.

It is evidence against pretending that the bridge has already produced a viable galaxy law.

At the current derivation order, the benchmarkable CSR kernel is just baryons-only. Once that is admitted, the decomposition-grade local benchmark becomes a narrow contamination-controlled baseline, not a competition result.

## Bottom Line

The correct empirical reading is narrow:

- the alias-clean local decomposition-grade sample is only `3` galaxies
- the currently derived CSR kernel is not competitive because it is just baryons-only
- any stronger galaxy claim now requires a new derived mechanism, not a restatement of the same Hermitian dephasing channel
