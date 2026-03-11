# Open-System Stellar Pointer Test

## Purpose

The closed toy matter model showed that neither the gas nor stellar projector is generically invariant once both coherence and localization couplings are switched on.

This document asks the next narrower question:

- can an open-system extension stabilize an approximate stellar pointer sector,
- and if it can, what has to be inserted by hand to make that happen?

## Model

The Hamiltonian is the same representative two-level block used in the closed test:

`H_ab = -(J_A a + J_B b) I - (h_x + lambda_c a) sigma_x - (h_z + lambda_l b) sigma_z`

with representative parameters:

- `J_A = 1.0`
- `J_B = 1.0`
- `h_x = 0.8`
- `h_z = 0.6`
- `lambda_c = 0.7`
- `lambda_l = 0.5`

The open-system extension adds two Lindblad operators:

- `L_phi = sqrt(gamma_phi) sigma_z`
- `L_relax = sqrt(gamma_relax) sigma_minus`

Interpretation:

- `L_phi` suppresses coherence in the localized `z` basis,
- `L_relax` drives the qubit toward the candidate stellar pointer state `|0_z>`.

## Criterion

An approximate stellar pointer sector is counted as present when, across all four code sectors `(A,B) = (+/-1,+/-1)`, both conditions hold:

- worst-case stellar weight `>= 0.95`
- worst-case `z`-basis coherence `<= 0.10`

This is a practical toy-model criterion, not a theorem.

## Results

### Pure Dephasing Only

At `gamma_phi = 8`, `gamma_relax = 0`:

- worst-case stellar weight `= 0.500`
- worst-case coherence `= 0.000`

Interpretation:

- dephasing alone kills coherence,
- but it does not select a stellar state.

### Balanced Dissipation

At `gamma_phi = 4`, `gamma_relax = 4`:

- worst-case stellar weight `= 0.908`
- worst-case coherence `= 0.122`

Interpretation:

- the sector is partially stabilized,
- but not yet by the criterion above.

### Strong Dissipation

At `gamma_phi = 8`, `gamma_relax = 8`:

- worst-case stellar weight `= 0.973`
- worst-case coherence `= 0.071`

This is the first grid point that satisfies the pointer criterion.

## What This Means

The toy open system does show that a stellar pointer sector can emerge.

But it only emerges because the environment is built to prefer the localized `z` basis from the start. In other words:

- the mechanism can be made to work,
- but the preferred basis is inserted by hand,
- not derived from the toric-code backbone.

So this does not solve the matter-coupling problem. It narrows it.

The next legitimate algebraic question is:

- what code-derived environment, coarse-grained channel, or effective dissipator could justify `sigma_z`-basis selection and relaxation from first principles?

## File Produced

The full sweep is stored in `output/audit/open_system_stellar_pointer_test.json`.
