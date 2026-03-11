# CSR Weighted Hodge Green Kernel

## Purpose

This note records the first CSR galaxy family built as a quotient/Green response operator rather than a local closure formula.

The machine-readable summary is in `output/audit/csr_weighted_hodge_green_family.json`.

## Family

The tested surrogate solves the radial operator problem

`[-d/dr (w(r) d/dr) + ell^-2] phi(r) = J(r)`

with harmonic zero-mode removal in the unscreened limit.

The orbit-level correction is then

`a_CSR(r) = -d phi / dr`

`v_pred^2 = v_bar^2 + C r a_CSR(r)`

This is not yet a full `T^3` continuum derivation. It is the first operator-level quotient/Green surrogate.

## Best Family Found

Best member in the bounded scan:

- operator family: `screened_hodge`
- source map: `g_n`
- weight map: `unit`
- screening length: `24.0 kpc`
- fitted scale: `C = 0.03454`

The screening-length scan for the best source/weight pair peaks at `24 kpc`, not at the old `16 kpc` grid boundary, so this branch is not just a trivial boundary artifact.

## Benchmark

SPARC:

- holdout mean `R^2 = 0.7231 +/- 0.0857`
- full sample `R^2 = 0.7531`
- baryons-only full sample `R^2 = 0.5521`
- MOND full sample `R^2 = 0.9321`

Local external decomposition-grade set (`m33`, `n1560`, `n5533`):

- aggregate `R^2 = 0.7550`
- MOND aggregate `R^2 = 0.8618`
- baryons-only aggregate `R^2 = 0.4628`

## Important Caveat

The aggregate external score hides a real failure mode.

Per-galaxy local external `R^2`:

- `m33`: CSR `0.5100`, MOND `-0.6620`
- `n1560`: CSR `-10.5758`, MOND `0.8272`
- `n5533`: CSR `-7.9332`, MOND `0.7552`

So the family helps strongly on one galaxy and fails badly on two others.

This is why the local external median remains strongly negative:

- weighted Hodge family median `R^2 = -7.9332`
- MOND median `R^2 = 0.7552`

## What This Means

This branch matters because it changes the diagnosis.

Before this scan, every derived family looked like another failed local closure.

After this scan, the stronger statement is:

- moving from local closure formulas to a quotient/Green operator is directionally correct
- the present radial scalar reduction is still too crude to be the final law

That is progress, not a rescue.

## Bottom Line

The first operator-level conservative surrogate is the best derived CSR family so far.

It is still below MOND and still fails as a final law.

The remaining live route is not another local ansatz. It is a fuller open quotient/Green response beyond this radial scalar surrogate.
