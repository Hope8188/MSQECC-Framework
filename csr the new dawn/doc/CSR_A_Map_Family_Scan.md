# CSR A-Map Family Scan

## Result

The first scan over dimensionless `A(r)` information-load maps under a fixed stationary closure is complete.

It also does **not** rescue CSR.

The supporting audit is in [csr_a_map_family_scan.json](output/audit/csr_a_map_family_scan.json).

## Fixed Closure

I fixed the closure to the constant-`q` stationary stress family:

`lambda(r) = lambda0`

`sigma_r^2(r) proportional to (A'(r))^2`

and varied only the dimensionless code-to-matter map `A(r)`.

## A-Maps Tested

- `log_rho`: `A(r) = ln rho_b^eff(r) - median`
- `log_mass`: `A(r) = ln M_b^eff(<r) - median`
- `log_surface_density`: `A(r) = ln Sigma_b^eff(r) - median`
- `log_acceleration`: `A(r) = ln a_bar(r) - median`

## Results

Best map: `log_rho`

Benchmark:

- SPARC holdout `R^2 = 0.5473 +/- 0.1116`
- full-sample SPARC `R^2 = 0.5523`
- local external aggregate `R^2 = 0.4345`

The other maps are essentially tied with baryons-only or only trivially different.

## What This Means

This is another clean narrowing.

Within this closure class, changing the information-load map from density to mass, surface density, or acceleration does not create a meaningful improvement.

So the next missing ingredient is probably not a different scalar `A(r)` chosen from the same local baryonic observables.

## Bottom Line

The `A(r)` scan says the same thing as the `lambda(r)` scan from the other side:

- small local substitutions do not fix the galaxy law
- CSR likely needs a different macroscopic closure class, not just a different local observable inside the same closure
