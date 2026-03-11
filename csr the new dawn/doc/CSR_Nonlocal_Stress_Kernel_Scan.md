# CSR Nonlocal Stress Kernel Scan

## Purpose

This scan tests the first explicitly nonlocal stationary closure class for CSR.

The goal was to move beyond local scalar closures and ask whether a finite radial memory length can rescue the stress-route galaxy law.

## Law Tested

The family tested was

`sigma_r^2(r) = C ∫ dr' exp(-|r-r'| / ell) (A'(r'))^2 / (2 ell)`

with

`v_pred^2 = v_bar^2 - r d sigma_r^2 / dr - r sigma_r^2 d ln rho_b^eff / dr - 2 beta sigma_r^2`

Source maps tested:

- `log_rho`
- `log_surface_density`
- `log_acceleration`

Grid:

- `ell = 0.1, 0.25, 0.5, 1, 2, 4, 8, 16 kpc`
- `beta = -2, -1.5, -1, -0.5, 0, 0.5`

## Main Result

Best family member:

- source map: `log_rho`
- `C = 207.8269`
- `ell = 16.0 kpc`
- `beta = -2.0`

Performance:

- full-sample SPARC `R^2 = 0.5749`
- SPARC holdout mean `R^2 = 0.5537 +/- 0.1100`
- local decomposition-grade external aggregate `R^2 = 0.4391`
- local external median per-galaxy `R^2 = -7.3621`
- MOND holdout mean `R^2 = 0.9299`
- baryons-only holdout mean `R^2 = 0.5469`

## Interpretation

This is a real negative narrowing result.

The first nonlocal scalar closure only marginally improves over baryons-only on SPARC and remains weak externally. The fit also runs to the edge of the scanned parameter box:

- maximum memory scale `ell = 16 kpc`
- extreme anisotropy boundary `beta = -2`

That is not the signature of a stable derived law. It is the signature of a family trying to imitate missing structure.

## What This Means

The remaining bottleneck is probably not a better scalar field `sigma_r^2(r)` with a longer kernel.

The next viable closure class is more likely to be:

- tensorial rather than scalar
- disk-geometric rather than sphericalized
- or explicitly nonlocal in a metric/stress sense instead of a smoothed local source map

## Output

Primary audit file:

- `output/audit/csr_nonlocal_stress_kernel_scan.json`
