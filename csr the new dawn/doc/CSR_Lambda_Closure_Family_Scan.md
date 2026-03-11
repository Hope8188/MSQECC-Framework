# CSR Lambda Closure Family Scan

## Result

The first non-arbitrary `lambda(r)` closure scan is complete.

It does **not** rescue CSR.

The supporting audit is in [csr_lambda_closure_family_scan.json](output/audit/csr_lambda_closure_family_scan.json).

## Setup

I fixed the spatial map to the current canonical information-load proxy:

`A(r) = ln rho_b^eff(r) - median[ln rho_b^eff]`

and scanned five code-side closure families for the stationary Jeans route.

## Families Tested

- `constant_q`: `lambda(r) = lambda0`
- `q_eq_aprime`: `J(r) proportional to |A'(r)|`, so `lambda(r) proportional to (A'(r))^2`
- `q_eq_a`: `J(r) proportional to |A(r)|`
- `q_eq_omega`: `J(r) proportional to Omega(r) = v_bar/r`
- `q_eq_freefall`: `J(r) proportional to sqrt(4 pi G rho_b^eff)`

## Best Family

The best of the tested set was `q_eq_aprime`.

Its benchmark was:

- SPARC holdout `R^2 = 0.5609 +/- 0.1114`
- full-sample SPARC `R^2 = 0.5685`
- local external aggregate `R^2 = 0.3235`

That is still substantially below MOND and below the earlier sign-smoothed density-gradient candidate.

## Important Failures

Two scanned families fail catastrophically:

- `q_eq_a`
- `q_eq_omega`

Those families produce numerically unstable or physically poor kernels in this closure and should not be treated as promising directions in their current form.

## What This Means

This is a useful negative result.

It means the next missing ingredient is not simply a better spatial dependence in `lambda(r)` while keeping the same `A(r)` map and the same stationary closure family.

The closure problem is deeper than that.

## Bottom Line

The `lambda(r)` scan narrows CSR again:

- closure-family variation alone does not close the MOND gap
- the next bottleneck is either the spatial map `A(r)` or the macroscopic closure class itself
