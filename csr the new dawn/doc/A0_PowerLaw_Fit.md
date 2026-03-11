# A0 Power-Law Fit

## Purpose

The current redshift-evolution claim `a0(z) proportional H(z)` corresponds to a power-law index `n = 1` in

`a0(z) / a0(0) = [H(z) / H0]^n`

The quickest empirical correction is to fit `n` directly from the currently audited SPARC and MIGHTEE numbers.

## Inputs

From the existing literature audit:

- SPARC `a0 = 1.15e-10 m/s^2`
- MIGHTEE `a0 = 1.69e-10 m/s^2`
- `H(z=0.08) / H0 = 1.038226`

## Result

The literal two-point fit gives:

- `n = 10.2620 +/- 2.1023`

This differs from `n = 1` by:

- `4.41 sigma`

## Interpretation

This does not validate `n approx 10` as a new law.

It means one of two things must be true:

- the current SPARC and MIGHTEE values are not directly comparable as a clean power-law dataset,
- or the naive `a0 proportional H` claim is incomplete or wrong.

Either way, the current data do not support keeping `n = 1` as a validated prediction.

## File Produced

The fit output is in `output/audit/a0_powerlaw_fit.json`.
