# Findings

## Executive Summary

The project now has a narrower and more defensible shape.

What is real:

- the SPARC galaxy ansatz is nontrivial and reproducible,
- the standard `T^3` toric-code backbone is real,
- the alpha coincidence survives a basic rarity screen,
- and the syndrome-measurement route can generate the needed `sigma_z` matter dephasing, but only for a noncommuting edge coupling.

What is not yet real:

- a derivation of `k = 3*pi`,
- a positive-density global galaxy law,
- a fully externalised galaxy success stronger than MOND,
- or a first-principles derivation of alpha, Lambda, or three generations.

## 1. Alpha Lead

The scan over small positive integers in

`a*pi^3 + b*pi^2 + c*pi`

found:

- only one hit below `1e-4` relative error up to coefficient box `< 30`
- best hit: `(4,1,1)`
- relative error: `2.2227654e-06`
- runner-up gap: about `114.5x`

Correct status:

- not a derivation,
- but not cheap numerology either.

## 2. Galaxy Ansatz Physics

The ansatz can be written as a static radial potential, so it is not ruled out by energy conservation alone.

But the effective density is

`rho_dm = C/(4*pi*G) [2u/r + 4u' + r u'']`

with `u = v_star^2 + k v_gas^2`.

This yields the exact positive-density condition

`A(r) + k B(r) >= 0` for all radii when `C > 0`.

SPARC audit at the fitted parameters:

- negative `v_dm^2` in `66/171` galaxies
- negative `rho_dm` in `123/171` galaxies
- only `55/171` galaxies admit any positive-`C` feasible interval in `k`
- no single global positive-density `k` exists for the full sample

So the current ansatz cannot be fixed by retuning `k` alone.

## 3. Syndrome Channel

The minimal code-plus-matter channel test gives the clearest Stage 1 result.

### Commuting Coupling

For

`H_int = g Z_edge tensor sigma_z^matter`

under `Z_edge` syndrome measurement:

- the matter coherence oscillates,
- there is no emergent Lindblad `sigma_z` dephasing channel.

### Noncommuting Coupling

For

`H_int = g X_edge tensor sigma_z^matter`

under the same measurement channel:

- the reduced matter dynamics become `d rho_m / dt = (g^2 / kappa) D[sigma_z](rho_m)` in the fast-measurement limit,
- and the exact coherence-decay rate matches `2 g^2 / kappa`.

This means the matter-coupling route is alive, but only on the noncommuting branch.

## 4. External Non-SPARC Benchmark

A new external benchmark on `47` galaxies from an independent mass-model file gives:

Aggregate pointwise `R^2`:

- MSQECC: `0.6819`
- MOND: `0.8482`
- baryons-only: `-0.1808`

Per-galaxy median `R^2`:

- MSQECC: `-7.2578`
- MOND: `-3.3669`
- baryons-only: `-39.8371`

Counts:

- MSQECC positive on `9/47` galaxies
- MSQECC beats MOND on `10/47`
- MSQECC beats baryons-only on `44/47`

Interpretation:

- the model is externally nontrivial,
- but not externally validated,
- and MOND remains stronger.

## 5. a0(z) Correction

The two-point fit of

`a0(z) / a0(0) = [H(z) / H0]^n`

gives:

- `n = 10.2620 +/- 2.1023`
- deviation from `n = 1`: `4.41 sigma`

So the current data do not support keeping `a0 proportional H` as a validated prediction.

## 6. What Does This Mean

The shortest defensible path is now explicit.

MSQECC only becomes a serious theory if all three of these happen:

- the noncommuting syndrome channel is justified from the full `T^3` code,
- the galaxy law is positivity-safe or reformulated,
- and the frozen model survives a stronger external benchmark after that reformulation.

Without those three, the honest residual result is still valuable but narrower:

- galaxy phenomenology,
- toric-code mathematics,
- and a precise list of algebraic bottlenecks.

## 7. Best Successor Direction

A first positivity-safe successor candidate was tested.

It uses the positive source

`max(0, 2u/r + 4u' + r u'')`

instead of the current sign-indefinite extra term.

Results:

- SPARC aggregate `R^2 = 0.8480`
- current MSQECC aggregate `R^2 = 0.8204`
- MOND aggregate `R^2 = 0.9321`

But on the external non-SPARC benchmark:

- positivity-safe candidate `R^2 = 0.5842`
- current MSQECC `R^2 = 0.6819`
- MOND `R^2 = 0.8482`

So the best successor direction is not this first positivity-safe law by itself.

The best direction is narrower:

- keep the `T^3` code backbone,
- keep the anticommuting syndrome-to-matter bridge,
- and derive a positive-definite macroscopic response kernel from that bridge instead of clipping the old law by hand.
