# CSR Orbital-Mixing Transition Family

## Result

The first timescale-derived transition family is now benchmarked.

It collapses to the baryons-only limit.

The supporting audit is in [csr_orbital_mixing_transition_family.json](output/audit/csr_orbital_mixing_transition_family.json).

## Family Tested

I introduced the simplest mechanistic transition factor based on competition between CSR stress buildup and orbital mixing:

`sigma_r^2(r) = C (d ln rho_b^eff / dr)^2 / (1 + Omega(r)/lambda0)`

where

- `Omega(r) = v_bar / r`
- `lambda0` is a constant CSR relaxation scale

This is not a guessed MOND interpolation function.
It is the first transition-bearing CSR family built directly from timescale competition.

## Fit Result

Full-sample fit:

- `C = 0.1181`
- `lambda0 = 1.0000e-4 km s^-1 kpc^-1`

That `lambda0` value is at the lower bound of the fit.

So the optimizer is driving the transition factor toward complete suppression of the CSR correction.

## Performance

### SPARC holdout

- transition family `R^2 = 0.5469 +/- 0.1117`
- MOND `R^2 = 0.9299`
- baryons-only `R^2 = 0.5469`

### Full sample

- transition family `R^2 = 0.5521`
- baryons-only `R^2 = 0.5521`

### Local external subset

- transition family aggregate `R^2 = 0.4628`
- baryons-only aggregate `R^2 = 0.4628`

## Interpretation

This is a strong negative result.

A simple orbital-mixing suppression factor is not the missing MOND-like transition structure.
The data prefer to turn it off.

## Bottom Line

The first transition-bearing CSR family failed cleanly.

That means the remaining missing ingredient is not just a transition factor added onto the existing closure.
It points instead to a qualitatively different macroscopic closure than the one currently being explored.
