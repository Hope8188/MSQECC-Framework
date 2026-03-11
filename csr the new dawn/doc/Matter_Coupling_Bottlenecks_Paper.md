# Matter-Coupling Bottlenecks in T3 QECC Cosmology

## Abstract

The current MSQECC programme contains a real `T^3` toric-code backbone but lacks a derived matter-coupling layer. This note sharpens that bottleneck rather than evading it. First, the small-integer polynomial coincidence `4*pi^3 + pi^2 + pi` remains uniquely strong under a basic density screen and therefore survives as a legitimate theoretical lead, though not a derivation. Second, the syndrome-measurement channel has now been tested directly in the minimal two-qubit setting. A commuting coupling `Z_edge tensor sigma_z^matter` fails to generate the required Lindblad dephasing and instead produces coherent oscillation. A noncommuting coupling `X_edge tensor sigma_z^matter` does generate the desired `sigma_z` dephasing with the predicted rate `2 g^2 / kappa` for coherence decay. This means the open-system pointer result can in principle be code-derived, but only if the physical matter coupling is to the edge operator conjugate to the measured plaquette basis. The matter-coupling problem is therefore narrowed, not solved.

## 1. Verified Backbone

The verified mathematical backbone is the standard `Z2` toric code on `T^3`, encoding three logical qubits on finite periodic lattices.

What is still missing is a map from that code to gas, stars, charge, stress, and cosmological observables.

## 2. Alpha Lead

The coincidence

`4*pi^3 + pi^2 + pi = 137.0363037758784`

lies extremely close to `alpha^-1 = 137.035999177`.

The density scan over positive small-integer coefficients in the family

`a*pi^3 + b*pi^2 + c*pi`

shows:

- only one hit below `1e-4` relative error up to coefficient box `< 30`
- the best hit is better than the runner-up by about `114.5x`

So the expression survives the first rarity screen. It remains a serious lead, not a derivation.

## 3. Syndrome-Channel Test

The master equation tested is

`d rho / dt = -i [H_int, rho] + kappa D[Z_edge](rho)`

with two coupling choices.

### 3.1 Commuting Coupling

For

`H_int = g Z_edge tensor sigma_z^matter`

exact reduction gives

`d^2 rho_m / dt^2 = -g^2 [sigma_z,[sigma_z,rho_m]]`

The matter coherence oscillates rather than decays exponentially. The syndrome channel does not produce the required Lindblad `sigma_z` dephasing on this branch.

### 3.2 Noncommuting Coupling

For

`H_int = g X_edge tensor sigma_z^matter`

adiabatic elimination at strong measurement gives

`d rho_m / dt = (g^2 / kappa) D[sigma_z](rho_m)`

so the matter coherence decays at rate

`Gamma_coh = 2 g^2 / kappa`

Exact Liouvillian fits match that rate closely over `kappa = 1,2,4,8,16`.

## 4. Consequence

This is the clearest current path forward.

The code can generate the needed dissipator only if matter couples to the edge operator conjugate to the measured plaquette basis.

So the next algebraic target is no longer vague. It is:

- justify or rule out the noncommuting edge-matter coupling inside the full `T^3` stabilizer structure.

## 5. Falsifiability

The QECC-based galaxy interpretation is falsified if no code-derived matter-coupling channel can produce the required pointer-basis dissipator from the `T^3` stabilizer-measurement structure, or if the positivity-enforced frozen SPARC-trained model fails on a held-out non-SPARC sample with published baryonic decompositions.

## 6. Conclusion

The matter-coupling problem is no longer an undefined hole.

It is a concrete channel-construction problem with an explicit negative branch, an explicit viable branch, and a finite list of empirical tests.
