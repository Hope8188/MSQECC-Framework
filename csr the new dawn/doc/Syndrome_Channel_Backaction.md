# Syndrome Channel Backaction

## Purpose

The key Stage 1 question is now precise:

- does the toric-code syndrome measurement channel itself produce the `sigma_z` matter dephasing that the open-system toy model needed?

This was tested in the smallest exact setting where the question can be answered cleanly.

## Setup

A matter qubit is coupled to one effective code edge. The measured code observable is the reduced plaquette operator, treated as an effective `Z_edge` measurement at rate `kappa`.

Two couplings were tested.

### Case A: Commuting Coupling

`H_int = g Z_edge tensor sigma_z^matter`

### Case B: Noncommuting Coupling

`H_int = g X_edge tensor sigma_z^matter`

The joint master equation is

`d rho / dt = -i [H_int, rho] + kappa D[Z_edge](rho)`

where

`D[L](rho) = L rho L^dagger - 1/2 {L^dagger L, rho}`

## Case A: What Happens For Z-Edge Coupling

Define

- `rho_m = Tr_edge rho`
- `tau = Tr_edge[(Z_edge tensor I) rho]`

Then the exact reduced equations are

- `d rho_m / dt = -i g [sigma_z, tau]`
- `d tau / dt = -i g [sigma_z, rho_m]`

The measurement term drops out of these two equations because the measured `Z_edge` operator commutes with the coupling and leaves the `Z` sector invariant.

Therefore

`d^2 rho_m / dt^2 = -g^2 [sigma_z, [sigma_z, rho_m]]`

This is oscillatory, not Markovian dephasing.

### Numerical Check

For `g = 0.3`, `kappa = 4`, with both edge and matter initialized in `|+>`:

- `t = 0.0`: coherence `0.500000`
- `t = 0.5`: coherence `0.477668`
- `t = 1.0`: coherence `0.412668`
- `t = 2.0`: coherence `0.181179`
- `t = 4.0`: coherence `0.368697`
- `t = 8.0`: coherence `0.043749`

The coherence does not decay monotonically. It oscillates.

So the literal `Z_edge tensor sigma_z` coupling does not yield the desired Lindblad `sigma_z` dephasing channel.

## Case B: What Happens For X-Edge Coupling

Now take

`H_int = g X_edge tensor sigma_z^matter`

Define

- `rho_m = Tr_edge rho`
- `chi = Tr_edge[(X_edge tensor I) rho]`

Then

- `d rho_m / dt = -i g [sigma_z, chi]`
- `d chi / dt = -i g [sigma_z, rho_m] - 2 kappa chi`

In the fast-measurement limit `kappa >> g`, adiabatic elimination gives

`chi approx -(i g / 2 kappa) [sigma_z, rho_m]`

and therefore

`d rho_m / dt = (g^2 / kappa) D[sigma_z](rho_m)`

So the matter coherence should decay at rate

`Gamma_coh = 2 g^2 / kappa`

## Numerical Check

Using `g = 0.3`, the exact two-qubit Liouvillian fit gives:

- `kappa = 1`: fitted rate `0.184327`, predicted `0.180000`
- `kappa = 2`: fitted rate `0.090781`, predicted `0.090000`
- `kappa = 4`: fitted rate `0.045154`, predicted `0.045000`
- `kappa = 8`: fitted rate `0.022527`, predicted `0.022500`
- `kappa = 16`: fitted rate `0.011254`, predicted `0.011250`

The exact dynamics matches the `2 g^2 / kappa` prediction closely.

## What This Means

This is the cleanest Stage 1 result so far.

- The originally hoped-for commuting `Z_edge tensor sigma_z` coupling does not work.
- A code-measurement-derived `sigma_z` matter dephasing channel does emerge, but only for a noncommuting edge coupling.

So the open-system toy model is not justified by the first naive coupling geometry.

But the syndrome-channel route is still alive in a narrower form:

- matter must couple to the edge operator conjugate to the measured plaquette basis if the code is to generate the stellar-pointer dissipator from first principles.

## File Produced

The full numerical audit is in `output/audit/syndrome_channel_backaction_test.json`.
