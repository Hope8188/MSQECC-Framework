# CSR Density-Gradient Galaxy Law

## Result

The first direct benchmark of the semiclassical density-gradient CSR law is now complete.

The supporting audit is in [csr_density_gradient_galaxy_law.json](output/audit/csr_density_gradient_galaxy_law.json).

## Candidate Law

The tested candidate is the law stated in the recent semiclassical derivation note:

`v_pred^2 = v_bar^2 + A r |d ln rho_b^eff / dr|`

with the sphericalized baryonic density proxy

`rho_b^eff = (4 pi G r^2)^(-1) d/dr [r v_bar^2]`

This is not a fully derived CSR law yet.

It still depends on the unproved Step 3 identification `sigma_z -> baryon density contrast` and on using `rho_b^eff` as a practical cross-dataset proxy.

## Fitted Scale

Full-sample SPARC fit:

- `A = 1356.422 km^2 s^-2`

## SPARC Performance

### 10-fold 80/20 holdout

- density-gradient CSR: `R^2 = 0.7145 +/- 0.0571`
- MOND: `R^2 = 0.9299 +/- 0.0133`
- baryons-only: `R^2 = 0.5469 +/- 0.1117`

### Full sample

- density-gradient CSR: `R^2 = 0.7116`
- MOND: `R^2 = 0.9321`
- baryons-only: `R^2 = 0.5521`

## Local External Benchmark

The clean local decomposition-grade sample still has only `3` galaxies:

- `m33`
- `n1560`
- `n5533`

On that subset:

### Aggregate `R^2`

- density-gradient CSR: `0.0600`
- MOND: `0.8618`
- baryons-only: `0.4628`

### Median per-galaxy `R^2`

- density-gradient CSR: `-21.5506`
- MOND: `0.7552`
- baryons-only: `-10.8818`

### Per-galaxy

- `m33`: CSR `-2.8418`, MOND `-0.6620`, baryons `0.3855`
- `n1560`: CSR `-43.0661`, MOND `0.8272`, baryons `-10.8818`
- `n5533`: CSR `-21.5506`, MOND `0.7552`, baryons `-29.0877`

## What This Means

This candidate law is physically cleaner than the legacy derivative ansatz in one narrow sense:

- it is positive-definite by construction
- it comes from a named semiclassical candidate step rather than a guessed velocity correction

But the benchmark is not strong enough.

It improves substantially over baryons-only on SPARC.
It does not come close to MOND on SPARC.
It transfers only weakly on the tiny local external decomposition-grade subset.

So this is not the derived galaxy law that CSR needs.

## Bottom Line

The density-gradient law survives as a candidate, not as a winner.

Its role now is diagnostic:

- it shows the semiclassical note can be turned into an explicit benchmarkable kernel
- it also shows that this first kernel is not good enough

That narrows the next derivation target rather than settling it.
