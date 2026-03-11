# CSR Constant-Dispersion Stress Family

## Result

The first exact stationary CSR stress family has now been benchmarked.

It is weaker than MOND and weaker than the earlier sign-smoothed density-gradient candidate.

The supporting audit is in [csr_constant_dispersion_stress_family.json](output/audit/csr_constant_dispersion_stress_family.json).

## Derived Family

Starting from the stationary Jeans closure with constant radial dispersion and constant anisotropy:

`v_pred^2 = v_bar^2 - sigma_r^2 r d ln rho_b^eff / dr - 2 beta sigma_r^2`

with

`rho_b^eff = (4 pi G r^2)^(-1) d/dr [r v_bar^2]`

This is the first exact family obtained after the stress-source route and stationary closure were written explicitly.

## Fit Results

Full-sample SPARC fit:

- `sigma_r^2 = 656.915 km^2 s^-2`
- `sigma_r = 25.630 km s^-1`
- `beta = -2.0000` at the fit boundary

That boundary-hitting result matters.
It means the best fit is trying to use an extreme constant offset from anisotropy rather than naturally matching the rotation-curve structure.

## SPARC Performance

### 10-fold 80/20 holdout

- constant-dispersion family: `R^2 = 0.6552 +/- 0.0743`
- MOND: `R^2 = 0.9299`
- baryons-only: `R^2 = 0.5469`

### Full sample

- constant-dispersion family: `R^2 = 0.6648`
- MOND: `R^2 = 0.9321`
- baryons-only: `R^2 = 0.5521`

## Local External Benchmark

On the current `3`-galaxy decomposition-grade non-SPARC subset:

- aggregate `R^2`: `0.3207`
- MOND aggregate `R^2`: `0.8618`
- baryons-only aggregate `R^2`: `0.4628`

So this exact stationary family is not externally strong on the current local subset.

## Relation To The Earlier Candidate

The earlier density-gradient CSR candidate is now easier to place.

This family reduces at `beta = 0` to:

`v_pred^2 = v_bar^2 - sigma_r^2 r d ln rho_b^eff / dr`

So the earlier candidate is the `beta = 0`, sign-smoothed cousin of this family.

That means the earlier candidate was not arbitrary.
It was close to a real stationary closure branch.

But the benchmark also shows that the exact unsmoothed stationary family is not yet the right law.

## Bottom Line

The stationary-stress route produced a real derived family.

That family does not rescue CSR.

It improves over baryons-only on SPARC, but it still trails MOND badly and reaches for a boundary anisotropy value to do so.

So the next missing ingredient is not another refit.
It is a better closure for `lambda(r)` and `A(r)` than the constant-dispersion assumption.
