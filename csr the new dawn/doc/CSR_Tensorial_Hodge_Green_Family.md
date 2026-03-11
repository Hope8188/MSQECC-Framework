# CSR Tensorial Hodge Green Family

## Purpose

This note records the first tensorial quotient/Green operator branch beyond the radial scalar weighted-Hodge surrogate.

The machine-readable audit is in `output/audit/csr_tensorial_hodge_green_family.json`.

## Family

The family solves two screened quotient/Green equations on the radial reduction,

`[-d/dr (w d/dr) + ell_r^-2] phi_r = J`

`[-d/dr (w d/dr) + ell_t^-2] phi_t = J`

and defines

`Pi_rr = C_r phi_r`

`Pi_tt = C_t phi_t`

with orbit-level prediction

`v_pred^2 = v_bar^2 - r dPi_rr/dr - r Pi_rr d ln rho_b^eff/dr - 2 Pi_rr + 2 Pi_tt`

This is still a surrogate reduction of a fuller physical quotient/Green response. The goal here is to test whether the first tensorial lift improves materially over the scalar operator branch.

## Best Family

Best fit in the scan:

- source map: `g_n`
- weight map: `unit`
- `ell_r = 48.0 kpc`
- `ell_t = 24.0 kpc`
- `C_r = 2.2943e-4`
- `C_t = 1.6832e-2`

## Benchmark

### SPARC

- holdout mean `R^2 = 0.7241 +/- 0.0859`
- full-sample `R^2 = 0.7548`
- MOND holdout mean `R^2 = 0.9299`
- baryons-only holdout mean `R^2 = 0.5469`

### Local three-galaxy decomposition-grade fallback

Aliases:

- `m33`
- `n1560`
- `n5533`

Results:

- aggregate `R^2 = 0.7584`
- median per-galaxy `R^2 = -7.6748`
- MOND aggregate `R^2 = 0.8618`

## Reading

This is the first tensorial operator-level CSR family.

It does improve very slightly over the scalar weighted-Hodge surrogate:

- scalar holdout `R^2 = 0.7231`
- tensorial holdout `R^2 = 0.7241`

That is not a rescue. It is a clue.

The operator move remains directionally right, but the current radial tensorial reduction is still too crude to count as the derived kernel.

## Bottom Line

The first tensorial quotient/Green lift survives as a live direction, but only marginally improves the scalar operator surrogate. The next improvement must come from a fuller physical quotient/Green response, not from expecting this reduced tensorial family to close the problem by itself.
