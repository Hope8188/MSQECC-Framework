# Galaxy Ansatz Physical Consistency

## Purpose

The current galaxy ansatz must satisfy two different standards.

One is empirical fit quality.

The other is physical admissibility. If the extra term implies negative effective dark density for large parts of the sample, then it cannot be interpreted as a literal positive dark component without reformulation.

## Ansatz

Define

`u(r) = v_star^2(r) + k v_gas^2(r)`

and the extra term

`v_dm^2(r) = C r [u(r) + r u'(r)]`

The total prediction is

`v_pred^2(r) = u(r) + v_dm^2(r)`

## Potential-Level Check

The extra force term is

`v_dm^2 / r = C [u + r u']`

This does come from a static central potential, because

`d/dr [C r u(r)] = C [u + r u']`

So the ansatz is not automatically ruled out by energy conservation alone. It can be embedded in a static radial potential.

## Density-Level Check

Under the standard spherical effective-density interpretation,

`M_dm(r) = r v_dm^2(r) / G`

and therefore

`rho_dm(r) = (1 / 4*pi*G*r^2) d/dr [r v_dm^2(r)]`

Substituting the ansatz gives

`rho_dm(r) = C/(4*pi*G) [2u/r + 4u' + r u'']`

Now write

- `s(r) = v_star^2(r)`
- `g(r) = v_gas^2(r)`
- `u = s + k g`

Then

`rho_dm(r) = C/(4*pi*G) [A(r) + k B(r)]`

with

- `A(r) = 2s/r + 4s' + r s''`
- `B(r) = 2g/r + 4g' + r g''`

## Positivity Constraint

This gives the exact positivity rule.

For positive `C`, the model requires

`A(r) + k B(r) >= 0` for every radius.

For negative `C`, it requires

`A(r) + k B(r) <= 0` for every radius.

So positivity is not a vague preference. It is a direct inequality constraint on `k` and the sign of `C`.

## SPARC Results At The Fitted Parameters

Using the full-sample SPARC fit:

- `k = 9.500861`
- `C = 0.005409`

The physical-admissibility audit finds:

- negative `v_dm^2` in `66/171` galaxies and `211/3375` radial points
- negative `rho_dm` in `123/171` galaxies and `733/3375` radial points

So the current best-fit ansatz does not define a globally positive effective density on the SPARC sample.

## Feasible Positivity Interval For k

For each galaxy, the inequality above defines an allowed interval in `k` for the positive-`C` branch.

Results:

- only `55/171` galaxies admit any positive-`C` feasible interval at all
- only `43/171` galaxies have intervals containing the fitted `k`
- only `43/171` galaxies have intervals containing `3*pi`

The global intersection is empty:

- global lower bound `= 17.7222`
- global upper bound `= 0.0472`

So there is no single global positive-`C` value of `k` that makes the effective density nonnegative across the full SPARC sample.

## What This Means

This is the real structural result.

The negative-density problem is not fixed by retuning `k` within the current global ansatz. The feasible global interval does not exist.

So one of the following must change:

- the density interpretation,
- the sign structure of the extra term,
- the ansatz itself,
- or the assumption that one global `(k,C)` pair should describe all galaxies in this form.

## File Produced

The full audit is in `output/audit/galaxy_ansatz_physical_consistency.json`.
