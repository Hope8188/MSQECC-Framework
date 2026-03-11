# CSR Full-Lattice Bridge Derivation

## Core Result

The anticommuting bridge survives the cubic `T^3` toric-code extension locally.

It does not keep the two-qubit rate unchanged. The lattice geometry renormalizes the rate by a factor of four.

The supporting audit is in [csr_full_lattice_bridge_derivation.json](output/audit/csr_full_lattice_bridge_derivation.json).

## Setup

Take the cubic `T^3` toric code with qubits on edges and `Z`-type plaquette stabilizers

`B_p = product_e in boundary(p) Z_e`

monitored at uniform rate `kappa`.

Let matter couple to one selected edge `e` through the conjugate operator

`H_int = g X_e tensor sigma_z`

The question is whether the two-qubit bridge result survives once the full plaquette structure of the lattice is included.

## Geometry

For a cubic `T^3` lattice, each edge lies on exactly four plaquettes.

This was checked explicitly for periodic sizes `L = 2, 3, 4`:

- `L = 2`: all `24` edges touch `4` plaquettes
- `L = 3`: all `81` edges touch `4` plaquettes
- `L = 4`: all `192` edges touch `4` plaquettes

So the relevant local multiplicity is not a fitted choice. It is fixed by the lattice.

## Algebra

For any plaquette `p` incident on `e`,

`{B_p, X_e} = 0`

and for all other plaquettes,

`[B_p, X_e] = 0`

Under the adjoint dissipator,

`D^dagger[B_p](X_e) = B_p X_e B_p - X_e = -2 X_e`

for each anticommuting plaquette.

Because there are four such plaquettes,

`sum_p kappa D^dagger[B_p](X_e) = -8 kappa X_e`

So the fast code variable damps at rate `8 kappa`.

Adiabatic elimination of that damped edge sector gives the local matter equation

`d rho_m / dt = (g^2 / (4 kappa)) D[sigma_z](rho_m)`

Therefore the matter coherence decays at

`Gamma_full = g^2 / (2 kappa)`

## Numerical Check

The rate law was checked in the reduced effective model by replacing one measured plaquette with multiplicity `m` identical anticommuting measurement channels.

The fitted coherence decay rates matched

`Gamma(m) = 2 g^2 / (m kappa)`

with small errors:

- `m = 1`: fit `0.045211`, prediction `0.045000`
- `m = 2`: fit `0.022530`, prediction `0.022500`
- `m = 4`: fit `0.011254`, prediction `0.011250`

The `m = 4` row is the cubic `T^3` case.

## What This Proves

It proves one narrow but important thing.

The bridge does not wash out simply because the edge is shared by four simultaneous plaquette measurements. The channel survives with a geometry-controlled renormalization.

That is the binary outcome this calculation needed to settle.

## What It Does Not Yet Prove

It does not yet prove a full many-body matter theory.

Open pieces remain:

- a spatially extended matter sector, not a single probe qubit
- a coarse-grained constitutive map from the matter channel to orbital dynamics
- a derivation of any galaxy kernel from this bridge

## Bottom Line

The local full-lattice bridge is alive.

The correct cubic-`T^3` rate is not `Gamma = 2 g^2 / kappa`.

It is

`Gamma_full = g^2 / (2 kappa)`

for uniform `Z`-plaquette monitoring of an `X`-coupled edge in the cubic `T^3` toric code.
