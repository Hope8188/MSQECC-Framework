# CSR Semiclassical Derivation

## Result

The minimal Hermitian CSR bridge does not derive a galaxy force law.

It derives dephasing. With spatial weighting, it derives diffusion. It does not derive a conservative radial component or a Caldeira-Leggett friction term.

The supporting audit is in [csr_semiclassical_no_go_test.json](output/audit/csr_semiclassical_no_go_test.json).

## Starting Point

From the local full-lattice bridge,

`d rho_m / dt = (g^2 / (4 kappa)) D[sigma_z](rho_m)`

with coherence decay rate

`Gamma_full = g^2 / (2 kappa)`

This is a matter-internal dephasing channel.

The real semiclassical question is whether that channel produces a deterministic correction to orbital dynamics.

## Observable-Level Test

Let `x` and `p` be the center-of-mass position and momentum observables of a coarse-grained matter degree of freedom.

### Case 1: Pure Internal Dephasing

If the jump operator is

`L = sqrt(gamma) I tensor sigma_z`

then the adjoint dissipator gives

`D^dagger[L](x) = 0`

`D^dagger[L](p) = 0`

exactly.

So pure internal dephasing does not produce drift, friction, or mean force in orbital space.

The numerical check gives

- `d<x>/dt = -9.95e-18`
- `d<p>/dt = -3.40e-21`
- `d<p^2>/dt = 6.04e-17`
- `d(coherence)/dt = -0.400000`

That is the expected pattern: coherence decays while orbital moments do not move.

### Case 2: Hermitian Spatial Weighting

A more generous coarse-grained test is

`L = sqrt(gamma) A(x) tensor sigma_z`

with `A(x)` Hermitian. The script used `A(x) = x` as the simplest probe.

In that class,

`D^dagger[L](p) = 0`

but

`D^dagger[L](p^2) >= 0`

So the channel can generate momentum diffusion, not deterministic drift.

The numerical check gives

- `d<x>/dt = -6.30e-17`
- `d<p>/dt = -1.05e-06`
- `d<p^2>/dt = 0.399997`
- `d(coherence)/dt = -1.167999`

The tiny `d<p>/dt` value is numerical truncation noise around zero. The nonzero effect is the growth of `p^2`, not the mean momentum.

## Consequence

This closes an important door.

The proved CSR bridge does not automatically become a galaxy kernel under the semiclassical limit. A Hermitian dephasing channel is not the Caldeira-Leggett equation.

The current derivation therefore stops here:

- bridge-derived internal dephasing: `proved`
- deterministic radial force law: `not derived`
- MOND-like transition function from the current Lindbladian alone: `not derived`

## What This Means For Benchmarking

At the current honest derivation order, the benchmarkable CSR mean-force correction is zero.

That means the first derived CSR galaxy benchmark is the baryons-only baseline.

This is not a rhetorical choice. It is what the algebra currently gives.

## What Would Have To Change

A nontrivial CSR galaxy law now requires at least one new ingredient beyond the current Hermitian bridge. Examples:

- a non-Hermitian jump operator after deeper bath elimination
- a retarded memory kernel rather than Markovian pure dephasing
- an explicit Hamiltonian backreaction coupling the syndrome sector to spatial degrees of freedom
- a many-body collective field whose coarse-grained adjoint action does not vanish on `p`

None of these has been derived yet.

## Bottom Line

This is a no-go result, and it is useful.

The minimal CSR bridge is real, but its first honest semiclassical limit does not produce a galaxy force kernel. It produces decoherence and, under Hermitian spatial weighting, diffusion only.
