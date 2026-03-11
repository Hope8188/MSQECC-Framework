# CSR Disk Tensor Stress Family

## Purpose

This is the first explicitly disk-geometric tensor closure tested in CSR.

It replaces the earlier sphericalized density proxy with a thin-disk effective surface-density stress law.

## Law Tested

The family tested was

`v_pred^2 = v_bar^2 - sigma_R^2 R d ln Sigma_b^eff / dR - (1-chi) sigma_R^2`

with the closure

- `Pi_RR = -Sigma_b^eff sigma_R^2`
- `Pi_phiphi = -chi Sigma_b^eff sigma_R^2`

The effective surface-density proxy was built from the baryonic rotation contribution through

`Sigma_b^eff ~ (2 pi R)^(-1) dM_bar / dR`

with

`M_bar(R) ~ R v_bar^2 / G`

## Best Fit

Full-sample fit:

- `sigma_R = 27.39 km/s`
- `chi = 4.0`

The anisotropy ratio runs to the upper fit boundary.

## Performance

- SPARC holdout mean `R^2 = 0.6248 +/- 0.0933`
- full-sample SPARC `R^2 = 0.6384`
- local decomposition-grade external aggregate `R^2 = 0.2840`
- local external median per-galaxy `R^2 = -20.1745`
- MOND holdout mean `R^2 = 0.9299`
- baryons-only holdout mean `R^2 = 0.5469`

## Interpretation

This family is informative but negative.

It does outperform baryons-only on SPARC. It does not compete with MOND, and it does not hold up externally on the current local clean subset.

The fit also saturates the anisotropy boundary:

- `chi = 4.0`

That is another sign that the closure is missing structure rather than merely needing a better scalar parameter value.

## What This Means

The next macroscopic object is probably not just a more careful disk anisotropy term.

The stronger candidates now are:

- explicitly nonlocal tensor closures
- retarded metric/stress response kernels
- or geometry-aware closures tied to disk structure rather than to a single local `Sigma_b^eff` proxy

## Output

Primary audit file:

- `output/audit/csr_disk_tensor_stress_family.json`
