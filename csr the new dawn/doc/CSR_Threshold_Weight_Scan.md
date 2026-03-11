# CSR Threshold Weight Scan

## Purpose

This note records a bounded check on the claim that a threshold condition alone can fix the alpha-sector weights.

The machine-readable summary is in `output/audit/csr_threshold_weight_scan.json`.

## Tested Families

The scan compared simple one-parameter candidate weight families against the target raw weights

`{1/2, 1/4, 1/2}`

Families tested:

- `symmetric_monomial`: `{p, p^2, p}`
- `symmetric_complement`: `{p, p(1-p), p}`
- `binomial_middle`: `{p, 2 p (1-p), p}`
- `count_weighted_monomial`: `{3p, 3p^2, p}`
- `count_weighted_complement`: `{3p, 3p(1-p), p}`

## Result

Exact hits occur for more than one family:

- `symmetric_monomial` at `p = 0.5`
- `symmetric_complement` at `p = 0.5`

The other tested families do not match exactly.

## Meaning

This is a useful negative result.

It shows that a threshold condition by itself does not uniquely determine the alpha coefficients.

Reaching `{1/2, 1/4, 1/2}` at `p = 0.5` is not enough, because multiple simple families can do it.

So the threshold story is still underdetermined until the operator, measure, or sector-counting mechanism selects one family canonically.

## Bottom Line

Threshold alone is not yet a derivation mechanism for alpha.

The alpha branch remains alive, but it still needs a canonical operator/measure story rather than a bare threshold identification.
