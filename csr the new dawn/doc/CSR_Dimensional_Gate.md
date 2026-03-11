# CSR Dimensional Gate

## Purpose

This is the gate between finding a nonzero `D^dagger(p)` and touching galaxy data.

A channel does not become a viable galaxy law just because it moves momentum. It has to have the right dimensions and the right physical dependence.

## Tested Classes

### 1. Local Damping

From

`L = sqrt(gamma) a`

one gets

`dp/dt = -(gamma/2) p`

so

`a = (1/m) dp/dt = -(gamma/2) v`

Units:

- `gamma`: `s^-1`
- `a`: `m s^-2`

So the units are fine.

The problem is physical form. This is velocity drag, not an extra conservative inward acceleration.

### 2. Translation Kick

From

`L = sqrt(gamma) exp(i k x)`

one gets

`dp/dt = gamma hbar k`

so

`a = gamma hbar k / m`

Units:

- `gamma`: `s^-1`
- `hbar k`: momentum
- `a`: `m s^-2`

Again the units are fine.

The problem is worse:

- the acceleration scales as `1/m`
- so a universal gravitational response is lost unless the coupling is made mass-dependent by hand

That is an equivalence-principle problem.

### 3. Collective Damping

From a collective lowering channel,

`dP_cm/dt = -(gamma/2) P_cm`

so

`a_cm = -(gamma/2) v_cm`

Units are fine.

The problem is the same as the local case: it is collective drag, not a static gravitational enhancement.

### 4. Retarded Auxiliary Channel

After eliminating the damped auxiliary mode, the effective reduced equation is of the form

`dp/dt = - integral K(t-s) p(s) ds`

In the Markov limit this becomes

`dp/dt = -eta p`

so

`a = -eta v`

Units are again fine.

But this is still friction.

## Gate Outcome

The dimensional gate does not kill the tested channels on unit grounds.

It kills them on physical-form grounds.

They do not produce:

- a conservative radial law
- a stationary circular-orbit support term
- a mass-universal MOND-like acceleration scale

## Operational Rule

No channel goes to galaxy benchmarking unless it passes both tests:

1. dimensional consistency
2. physical-form consistency with stationary galaxy dynamics

The current tested classes pass the first and fail the second.

## Bottom Line

The programme's old failure mode was benchmarking before doing units.

The current gate prevents that.

The tested non-Hermitian, retarded, and collective classes are dimensionally admissible but not yet physically admissible as galaxy kernels.
