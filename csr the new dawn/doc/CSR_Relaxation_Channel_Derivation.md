# CSR Relaxation Channel Derivation

## Result

A code-side relaxation channel is now derivable from a damped auxiliary syndrome-reset mode.

The supporting audit is in [csr_relaxation_channel_derivation.json](output/audit/csr_relaxation_channel_derivation.json).

## Model

Take a matter mode `a` coupled resonantly to an auxiliary code mode `b`:

`da/dt = -i J b`

`db/dt = -i J a - (kappa/2) b`

Interpretation:

- `a` is the coarse-grained matter mode
- `b` is an auxiliary syndrome-reset mode
- `kappa` is the reset or damping rate of the auxiliary mode
- `J` is the coupling between the matter mode and the reset mode

## Derived Markov Limit

For `kappa >> J`, adiabatic elimination of the auxiliary mode gives

`da/dt = -(2 J^2 / kappa) a`

So the effective first-moment relaxation rate is

`lambda_eff = 2 J^2 / kappa`

This is the cleanest code-side candidate for the missing stationary-stress relaxation rate.

## Numerical Verification

Using `J = 0.35` and sweeping `kappa`:

- `kappa = 2`: fitted `0.1413`, predicted `0.1225`, relative error `0.1533`
- `kappa = 4`: fitted `0.0632`, predicted `0.0613`, relative error `0.0320`
- `kappa = 8`: fitted `0.0309`, predicted `0.0306`, relative error `0.0078`
- `kappa = 16`: fitted `0.01534`, predicted `0.01531`, relative error `0.0019`
- `kappa = 32`: fitted `0.007660`, predicted `0.007656`, relative error `0.0005`

So the bad-cavity formula becomes quantitatively accurate as `kappa / J` grows.

## What This Changes

The missing stationary CSR quantity `lambda(r)` is no longer a purely abstract placeholder.

There is now a concrete code-side derivation target:

`lambda(r) = 2 J(r)^2 / kappa(r)`

What remains open is the spatial dependence:

- what sets `J(r)`?
- what sets `kappa(r)` on galactic scales?
- do they track the same code-to-matter map that sets the diffusion source?

## Bottom Line

The stationary-stress route is now more constrained than before.

`D_p(r)` comes from the proved Hermitian bridge.
`lambda(r)` now has a clean code-side relaxation candidate.

The remaining gap is turning those rates into a concrete spatial closure.
