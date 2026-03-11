# CSR Open-Systems Audit

## Scope

This note freezes the surviving effective open-systems statements in CSR and the assumptions they actually depend on.

The full machine-readable audit is in `output/audit/csr_open_systems_audit.json`.

## Surviving Effective Generators

### Bridge channel

The local bridge generator remains

`L_bridge = (g^2 / (4 kappa)) D[sigma_z]`

with coherence decay rate

`Gamma_full = g^2 / (2 kappa)`

For the audit reference values `g = 0.3` and `kappa = 4`, this gives

- generator coefficient: `0.005625`
- coherence decay rate: `0.01125`

### Relaxation channel

The code-side relaxation candidate remains

`L_relax = lambda_eff D[a]`

with

`lambda_eff = 2 J^2 / kappa`

The bad-cavity reduction remains numerically accurate on the tested grid.

## Brutal Validity Checks

### Bridge channel

Across the tested times `0.1, 0.5, 1.0, 2.0, 5.0`:

- trace-preservation error: `0.0`
- unitality error: `0.0`
- minimum Choi eigenvalue: `0.0`
- semigroup error at `0.7 + 1.3`: `0.0`

So the effective bridge channel passes the finite-time GKLS checks exactly in this audit.

### Relaxation channel

Across the same tested times:

- trace-preservation error: `0.0` up to numerical roundoff
- minimum Choi eigenvalue: near `0`, with only numerical negative noise at `~1e-16`
- semigroup error at `0.4 + 1.1`: `1.59e-16`

The important correction is this:

The relaxation channel is not unital. A nonzero `E(I) - I` is expected for an amplitude-damping-type channel and is not a validity failure.

The audit therefore now records unitality separately instead of confusing it with trace preservation.

## Reduction Accuracy

For the damped auxiliary-mode reduction:

- `kappa = 8` gives max post-`t=2` amplitude error `0.00692`
- `kappa = 16` gives `0.00181`
- `kappa = 32` gives `0.000465`

This is consistent with the claimed bad-cavity limit.

## Assumptions Frozen

1. Markovian monitored bath is assumed at the effective starting point.
2. Born-style factorization before elimination is used effectively, not derived microscopically.
3. No separate secular approximation is needed in the minimal local bridge reduction.
4. The cubic `T^3` factor-of-four multiplicity is geometric and exact for the local edge-plaquette incidence.
5. The thermodynamic-limit claim is still local only. What survives is a local channel, not a full many-body macroscopic derivation.

## What This Does And Does Not Prove

What is now supported:

- the effective bridge and relaxation generators are internally consistent GKLS channels at the level tested here
- the local `T^3` multiplicity factor is not a hand-wave
- the relaxation branch is validly non-unital rather than suspect

What is still missing:

- a microscopic derivation of the monitored bath itself
- a full many-body coarse-graining
- a conservative macroscopic orbital kernel

## Bottom Line

The open-systems side is now cleaner than before.

The bridge math is not the current weak point. The weak point is the macroscopic closure that would turn these valid local channels into a stationary galaxy law.
