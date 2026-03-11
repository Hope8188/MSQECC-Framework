# CSR Stationary Stress Closure

## Result

The next galaxy-law bottleneck is now exact in equations.

The proved Hermitian CSR bridge gives a momentum-diffusion source.
A stationary galaxy law exists only after deriving a second relaxation rate `lambda(r)` and a concrete map for the spatial operator `A(r)`.

The supporting audit is in [csr_stationary_stress_closure.json](output/audit/csr_stationary_stress_closure.json).

## Starting Point

From the proved Hermitian bridge route, the Wigner-limit source term is

`partial_t W = D_p(r) partial_p^2 W`

with

`D_p(r) = gamma hbar^2 (A'(r))^2 / 2`

So the bridge supplies momentum diffusion.

It does **not** by itself supply a stationary distribution.

## No-Go That Follows Immediately

If there is no sink or relaxation term, then momentum variance grows linearly in time.

So for `lambda = 0` there is no stationary galaxy law.

That is the clean theoretical consequence of the earlier force no-go and stress-source result.

## Minimal Stationary Extension

The smallest stationary extension is an Ornstein-Uhlenbeck style Fokker-Planck equation:

`partial_t W + (p/m) partial_r W = lambda(r) partial_p[p W] + D_p(r) partial_p^2 W`

Then the local stationary momentum variance is

`sigma_r^2(r) = D_p(r) / (m^2 lambda(r))`

This means every stationary CSR galaxy law is at minimum a two-rate theory:

- diffusion source `D_p(r)` from the proved bridge
- relaxation rate `lambda(r)` from a second physical process

## Derived Jeans Family

Define the radial pressure in the standard way:

`P_r(r) = rho(r) sigma_r^2(r)`

Then the spherical Jeans balance gives

`v_pred^2 / r = g_bar - (1/rho) dP_r/dr - 2 beta P_r / (rho r)`

or equivalently

`v_pred^2 = v_bar^2 - r d sigma_r^2 / dr - r sigma_r^2 d ln rho / dr - 2 beta sigma_r^2`

Substituting the CSR diffusion source gives the first exact stationary CSR family:

`sigma_r^2(r) = gamma hbar^2 (A'(r))^2 / (2 m^2 lambda(r))`

and therefore

`v_pred^2 = v_bar^2 - r d/dr [gamma hbar^2 (A'(r))^2 / (2 m^2 lambda(r))] - r [gamma hbar^2 (A'(r))^2 / (2 m^2 lambda(r))] d ln rho / dr - beta gamma hbar^2 (A'(r))^2 / (m^2 lambda(r))`

## What This Changes

The problem is now sharper than before.

CSR does **not** need another vague galaxy ansatz.
It needs two concrete derivations:

- the relaxation rate `lambda(r)`
- the code-to-matter map for `A(r)`

Without those two objects, there is no stationary galaxy law.
With them, the Jeans family above is the exact place where the law appears.

## Bottom Line

This is the cleanest theory-side narrowing so far.

The proved bridge already fixes the diffusion source.
The next missing quantity is not “dark matter” in general.
It is `lambda(r)`.
