# MSQECC Algebraic Failure Modes

**Date:** March 8, 2026

## Purpose

This memo does not ask whether MSQECC is inspiring, plausible, or close.

It asks a narrower question:

For each flagship claim, what algebraic object would have to exist for the claim to be meaningful, where exactly does the current framework fail to provide that object, and what would a valid resolution require?

That is the right Stage 0 document because it replaces verdicts with failure anatomy.

## Gap Types

This memo uses three gap types.

- `Definitional`: the required mathematical object has not been defined.
- `Computational`: the object is defined, but the calculation has not been carried out.
- `Logical`: the argument makes a leap between non-equivalent objects or assumptions.

## Claim 1: k = 3*pi

### Algebraic Requirement

The claim requires a code on a fixed manifold, with a fixed Hilbert space and stabilizer algebra, plus a matter embedding in which:

- gas degrees of freedom define one algebraic sector,
- stellar degrees of freedom define another algebraic sector,
- each sector has a computable entanglement or syndrome weight,
- and the ratio of those weights evaluates to `3*pi`.

Symbolically, the framework would need something like

`k = W_gas / W_star`

where `W_gas` and `W_star` are explicitly defined code-space objects.

### Exact Failure Point

The failure occurs before any calculation begins.

No algebraic map from gas or stellar matter into the toric-code Hilbert space has been defined. There is no operator, projector, syndrome class, or superselection sector in the current `T^3` stabilizer algebra labeled "gas" or "star".

So the missing step is:

- the definition of `W_gas` and `W_star` as algebraic objects.

The code currently has edge qubits, star checks, plaquette checks, logical loops, and membranes. It does not have baryonic phase sectors.

### Gap Type

`Definitional`

### What A Valid Resolution Would Require

A valid resolution would need all of the following:

- an explicit matter Hilbert space or effective matter sector,
- a coupling from matter states into code operators,
- a non-circular rule assigning gas and stars to distinct code sectors,
- and a derivation of `W_gas / W_star` with no inserted numerical factor chosen to force `3*pi`.

### Status

Unknown whether such an embedding exists.

Not proved impossible.
Not carried out in the current framework.

## Claim 2: Inverse-Square Quantum Noise

### Algebraic Requirement

The claim requires an explicit operator `T^ent_{mu nu}` or equivalent code-space observable whose off-diagonal matrix elements between relevant states decay as `1 / D^2` with graph distance `D`, with a computable amplitude.

Operationally, the theory would need to specify

`C(D) = C0 / D^2`

with `C0` derived from code parameters rather than guessed after the fact.

### Exact Failure Point

There are two failures.

First failure:

- `T^ent_{mu nu}` has never been written as an operator in the code Hilbert space.

That means there are no matrix elements to calculate.

Second failure:

- because the operator is undefined, the amplitude `C0` was never derived.

So the missing algebraic step is earlier than the experiment. The theory never defined the object whose correlations were supposed to be measured.

### Gap Type

Primary gap: `Definitional`

Secondary gap: `Computational`

### What A Valid Resolution Would Require

A valid resolution would need:

- an explicit operator formula for `T^ent_{mu nu}` in the code Hilbert space,
- matrix elements `⟨psi|T^ent_{mu nu}|phi⟩` between specified code states,
- a derivation of both the distance dependence and the amplitude,
- and an experimental threshold tied to the derived amplitude.

### Status

In the plain local `T^3` toric code, the advertised long-range `1 / D^2` law is not implied.

So the current prediction fails before hardware sensitivity is even discussed.

## Claim 3: alpha from 4*pi^3 + pi^2 + pi

### Algebraic Requirement

The claim requires a code-theoretic object whose value is the electromagnetic coupling constant or its inverse, and a derivation in which that object evaluates to

`alpha^-1 = 4*pi^3 + pi^2 + pi`

without starting from the known numerical value of `alpha^-1`.

This would require at minimum:

- an explicit `U(1)` sector or effective electromagnetic sector,
- a definition of the code observable corresponding to `alpha`,
- and a derivation whose intermediate steps naturally generate the powers `pi^3`, `pi^2`, and `pi`.

### Exact Failure Point

The current framework has no defined `U(1)` coupling object in the stabilizer algebra.

The plain toric code on `T^3` is a `Z2` code over `GF(2)`. Its natural invariants are parity, homology rank, and stabilizer relations. The polynomial `4*pi^3 + pi^2 + pi` was identified numerically and then read as meaningful. The algebraic object that should equal `alpha` was never defined.

So the missing step is:

- the definition of the code observable whose value is `alpha`.

### Gap Type

`Definitional`

### What A Valid Resolution Would Require

A valid resolution would need:

- a genuine electromagnetic sector beyond the bare `Z2` toric code,
- a derivation of a dimensionless coupling from that sector,
- and a calculation producing the exact polynomial without reverse-engineering from CODATA.

### Status

The numerical coincidence is real.
The derivation does not exist.

## Claim 4: N_gen = 3

### Algebraic Requirement

The claim requires two separate proofs.

First:

- a proof that the physically selected compact flat 3-manifold is `T^3` rather than one of the other nine compact flat 3-manifolds.

Second:

- a non-circular algebraic map from the three independent topological structures on `T^3` to the three fermion generations.

### Exact Failure Point

There are two precise failures.

First failure:

- `T^3` is assumed for convenience and consistency, not selected uniquely by the current theory.

Second failure:

- even granting `T^3`, the statement `b1(T^3) = 3` is only a topological count. No functor, representation map, or operator correspondence is defined taking those three cycles to generation labels in the Standard Model.

So the missing step is not the arithmetic `3`. The missing step is the map from topological cycles to generation quantum numbers.

### Gap Type

Primary gap: `Logical`

Secondary gap: `Definitional`

### What A Valid Resolution Would Require

A valid resolution would need:

- a uniqueness proof selecting `T^3`,
- a representation-theoretic map from topological sectors to generation labels,
- and non-circular observables showing how generation mixing or mass structure descends from that map.

### Status

Open on both fronts.

## Claim 5: Cosmological Constant from Code Rate

### Algebraic Requirement

The claim requires an explicit physical identification of:

- `N`, the number of physical qubits,
- `K`, the number of logical qubits,
- and a dynamical or thermodynamic rule mapping `K / N` to the vacuum-energy suppression.

The required output is the observed suppression scale of `Lambda` relative to Planck density.

### Exact Failure Point

The toric-code rate on `T^3` can be computed abstractly as `K / N = 1 / L^3` on an `L x L x L` lattice.

The failure is in the physical interpretation step.

The framework never defines, from first principles:

- what the cosmological `L` is,
- why the horizon discretization should be identified with the code lattice in that specific way,
- or how `K / N` becomes the observed vacuum-energy density rather than some other suppressed quantity.

So the missing step is:

- the explicit physical identification of the abstract code-rate variables with cosmological observables.

### Gap Type

Primary gap: `Logical`

Secondary gap: `Computational`

### What A Valid Resolution Would Require

A valid resolution would need:

- a first-principles definition of `N` for the observable universe,
- a first-principles definition of `K` for the same system,
- and a derivation linking the resulting rate to `Lambda` with no fitted exponent.

### Status

The code-rate analogy is plausible.
The cosmological derivation is not yet there.

## Claim 6: Morphology as Missing Physics

### Algebraic Requirement

If morphology is to become part of the theory rather than just part of the fit, the framework requires a code-space quantity that changes systematically with galaxy structural class.

That means the theory needs an algebraic object whose value differs for early-, mid-, and late-type systems in a way that feeds into the `C` parameter or its replacement.

### Exact Failure Point

The empirical side is real:

- morphology reduces the `C`-mass correlation.

The algebraic side is missing:

- no code-space operator or topological invariant has been defined whose value corresponds to morphology.

So the missing step is:

- the definition of a structural observable in the theory that could explain why morphology matters.

### Gap Type

`Definitional`

### What A Valid Resolution Would Require

A valid resolution would need:

- a mathematically defined structural observable,
- a map from galaxy morphology to that observable,
- and a prediction for how the observable changes the rotation-curve response.

### Status

Empirically supported as a fitting clue.
Not yet part of the theory.

## Global Bottleneck

All of the major failures above collapse to one shared bottleneck.

The code backbone exists.
The matter map does not.

More precisely, the framework still lacks a mathematically explicit map from physical matter variables to code-space variables.

Without that map:

- gas and stars cannot become algebraic sectors,
- `T^ent` cannot become an operator,
- `alpha` cannot become a code observable,
- morphology cannot become a structural invariant,
- and cosmological suppression cannot become a physical calculation.

This is the exact place where the programme currently stops.

## Resolution Hierarchy

The right order of work is now forced by the failure structure.

1. Define the matter-coupling map.
2. Use it to define gas and stellar sectors.
3. Use it to define `T^ent` as an operator.
4. Only then revisit `k`, IBM amplitudes, alpha, and cosmological suppression.

Everything else depends on Step 1.

## Bottom Line

The most important sentence in this memo is the simplest one:

MSQECC does not currently fail at the final numerical step. It fails earlier, at the point where the algebraic objects required by its flagship claims have not yet been defined.

That is the correct Stage 0 diagnosis.
