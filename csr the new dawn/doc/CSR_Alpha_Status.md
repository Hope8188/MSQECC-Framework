# CSR Alpha Status

## Result

The alpha lead survives as a structured coincidence.

It is not yet a derivation.

The supporting density screen is in [alpha_pi_polynomial_density_test.json](output/audit/alpha_pi_polynomial_density_test.json).

## What Survives

The numerical fact is real:

`4 pi^3 + pi^2 + pi = 137.0363037758784`

against

`alpha^-1 = 137.035999177`

with relative error `2.22e-6`.

Within the tested family

`a pi^3 + b pi^2 + c pi`

for nonnegative small integers up to coefficient limit `30`, this is the only hit below `1e-4` relative error and it beats the runner-up by a factor of about `114.5` in error.

So the alpha formula is not cheap numerology.

## What Is Killed

The current derivation claim is not valid.

The decomposition

`4 pi^3 + pi^2 + pi = (2 pi)^3 / 2 + (2 pi)^2 / 4 + (2 pi) / 2`

is mathematically true, but the weights `{1/2, 1/4, 1/2}` are not yet derived from the `T^3` toric-code stabilizer algebra.

The obvious candidate sources do not close the argument:

- Betti numbers of `T^3` are `(1, 3, 3, 1)`, not `(4, 1, 1)`
- plaquette weight is `4`, star weight is `6`
- each edge touches `4` plaquettes
- each plaquette has `4` edges

Those facts do not naturally produce the pair of `1/2` weights together with the `1/4` weight.

So the present status is:

- coincidence: `alive`
- code-theoretic derivation: `not achieved`
- any claim that alpha is already derived from CSR: `killed`

## What Would Count As Success

A real derivation would need all three of these:

1. a code-theoretic object whose value is `alpha^-1`
2. a chain of algebraic steps starting from `T^3` stabilizer data, not a backward numerical fit
3. a natural emergence of the coefficients without inserting them because they match the answer

Until that exists, alpha remains a strong target and not a result.

## Bottom Line

Do not throw the alpha lead away.

Do not claim it is solved.

The honest statement is narrower: `4 pi^3 + pi^2 + pi` is an unusually strong structured hit that survives the first density screen, but the CSR derivation does not exist yet.
