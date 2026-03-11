# CSR Jeans Stress Closure

## Purpose

This is the first concrete calculation inside the CSR kernel gate.

It takes the proved bridge diffusion source, applies the simplest stationary isotropic Jeans closure, and tests the resulting galaxy law directly.

The full machine-readable audit is in `output/audit/csr_jeans_stress_closure.json`.

## Derivation

Start from the stationary bridge-plus-relaxation picture:

- diffusion source: `D_p = g^2 hbar^2 / (4 kappa)`
- stationary variance: `sigma_r^2 = D_p / (m^2 lambda)`
- isotropic pressure closure: `Pi_rr = rho sigma_r^2`

Use the isotropic Jeans balance

`v_pred^2 / r = g_bar - (1/rho) d(rho sigma_r^2)/dr`

For constant `sigma_r^2`, this gives the explicit law

`v_pred^2 = v_bar^2 - sigma_r^2 r d ln rho_b^eff / dr`

Define the fitted effective parameter

`xi = sigma_r^2 = D_p / (m^2 lambda)`

This is the beta=`0` member of the already known constant-dispersion family, but here it is written directly from the bridge-plus-relaxation logic rather than from an abstract ansatz.

## Fit Result

Full-sample SPARC fit:

- `xi = 732.422 km^2/s^2`
- `sigma_r = 27.063 km/s`

## Benchmark

### SPARC cross-validation

- Jeans closure mean test `R^2 = 0.5800 +/- 0.1096`
- MOND mean test `R^2 = 0.9299`
- baryons-only mean test `R^2 = 0.5469`

### Full-sample SPARC

- Jeans closure `R^2 = 0.5948`
- MOND `R^2 = 0.9321`
- baryons-only `R^2 = 0.5521`

### Local external decomposition-grade subset

Aliases:

- `m33`
- `n1560`
- `n5533`

Aggregate results:

- Jeans closure `R^2 = 0.2576`
- MOND `R^2 = 0.8618`
- baryons-only `R^2 = 0.4628`

So the first explicit Jeans closure is not just below MOND. On the tiny local external decomposition-grade subset, it is also below baryons-only.

## What This Means

This branch is useful because it answers a specific question cleanly.

Question:

Can the simplest isotropic stationary closure already turn the proved bridge into a viable galaxy law?

Answer:

No.

The law is real, explicit, and benchmarked. It does not rescue CSR.

## Pattern Position

This result matters because it removes a whole family efficiently.

What it rules against is not just one fit. It rules against the idea that a local isotropic stationary closure is enough.

That pushes the next surviving target class toward:

- nonlocal tensorial stress
- or retarded metric/stress response

## Bottom Line

The first exact Jeans closure now exists and fails honestly.

That is progress because the kernel gate is now more concrete: another local isotropic closure is not the missing ingredient.
