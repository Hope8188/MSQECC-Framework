# Alpha Coincidence Density Test

## Purpose

The expression

`4*pi^3 + pi^2 + pi = 137.0363037758784`

is extremely close to `alpha^-1 = 137.035999177`.

The right first question is not whether this is profound. The right first question is whether it is rare.

## Search Family

The scan tests the family

`a*pi^3 + b*pi^2 + c*pi`

for integers:

- `a >= 1`
- `b >= 0`
- `c >= 0`

Three search boxes were checked:

- coefficients `< 10`
- coefficients `< 20`
- coefficients `< 30`

## Results

### Search Box `< 10`

- hits below `1e-3` relative error: `2`
- hits below `1e-4` relative error: `1`

### Search Box `< 20`

- hits below `1e-3` relative error: `4`
- hits below `1e-4` relative error: `1`

### Search Box `< 30`

- hits below `1e-3` relative error: `4`
- hits below `1e-4` relative error: `1`

The best hit across the full tested range is:

- `(a,b,c) = (4,1,1)`
- relative error `= 2.2227654e-06`

The runner-up in the `< 30` box is:

- `(a,b,c) = (3,0,14)`
- relative error `= 2.5447318e-04`

So the best hit is better than the runner-up by about `114.5x` in relative error.

## What This Means

This does not derive `alpha`.

It does do something important:

- it rules out the simplest version of the numerology objection,
- because `4*pi^3 + pi^2 + pi` is not one of dozens of equally good nearby small-integer hits,
- and it remains the unique hit below `1e-4` relative error in the tested positive-coefficient search boxes up to `< 30`.

So the correct status is now:

- striking coincidence,
- survives the first density screen,
- still not a derivation.

## File Produced

The full scan output is in `output/audit/alpha_pi_polynomial_density_test.json`.
