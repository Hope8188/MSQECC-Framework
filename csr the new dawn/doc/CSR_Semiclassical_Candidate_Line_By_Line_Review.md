# CSR Semiclassical Candidate Line-By-Line Review

## Purpose

This is a line-by-line scientific review of the recent semiclassical candidate note that proposed the density-gradient CSR galaxy law.

The goal is not to defend the note.
It is to mark, claim by claim, what is proved, what is conditional, and what fails against the new benchmark.

## Line-By-Line Review

### Step 1: `d rho_m / dt = (g / kappa) D[sigma_z] rho_m`

Status: `proved in the minimal anticommuting bridge calculation`, though the later full-lattice note sharpens the coefficient structure.

This is the strongest part of the note.
The existence of the bridge channel is real.
The exact many-body coefficient still depends on which reduction is being used, but the channel itself survives.

### Step 2: Wigner-function passage to a classical transport equation

Status: `structurally reasonable, not fully executed in the note`.

The note is right that a Lindblad channel can be carried into phase-space language.
It moves too quickly from that general statement to a force-form expression.
The exact classical term depends on what observable `sigma_z` maps to and how the coarse-graining is done.

So Step 2 is not wrong, but it is underived in the note.

### Step 3: `sigma_z -> delta(r)` or baryon-density contrast

Status: `candidate, not derived`.

This is the key definitional gap.
The note labels it as a candidate and that is correct.
Nothing in the current stabilizer algebra forces `sigma_z` to equal a baryon-density contrast field.

This is the line where the argument stops being code-derived and starts being an interpretive proposal.

### Step 4: `a_CSR(r) = (g / kappa) |d ln rho_b / dr|`

Status: `conditional on Step 3`.

This is the first explicit candidate galaxy law produced by the CSR programme.
That is scientifically useful.
But it is only as valid as the Step 3 mapping.

The new benchmark shows what this conditional law actually does:

- SPARC holdout `R^2 = 0.7145 +/- 0.0571`
- full-sample SPARC `R^2 = 0.7116`
- local external aggregate `R^2 = 0.0600` on `m33`, `n1560`, `n5533`

So the line is benchmarkable, but not strong enough.

### Step 4 claim: positive-definite and fixes the negative-density problem

Status: `true in the narrow algebraic sense`.

Because the law uses `|d ln rho / dr|`, the correction term is nonnegative.
So it does eliminate the old sign problem of the legacy derivative ansatz.

But fixing sign alone is not enough.
The benchmark shows that a positive-definite correction can still be dynamically inadequate.

### Step 5: transition scale and MOND connection

Status: `not derived`.

The note is correct to flag the dimensional gap.
The fitted law introduces a scale `A = 1356.422 km^2 s^-2` in the practical benchmark, but the code-to-units map that would tie this to `g / kappa` is not closed.

So the note does not yet derive the MOND scale.
It identifies where that derivation would have to happen.

### Step 7: alpha decomposition

Status: `independent candidate lead, not support for the galaxy law`.

The alpha section does not strengthen the density-gradient galaxy claim directly.
It belongs to a separate theoretical track.
Keeping it in the same note risks making the galaxy law look more complete than it is.

## What The Review Changes

The note should now be read as containing:

- one proved bridge result
- one plausible but underived Wigner bridge step
- one unproved matter-field identification
- one explicit candidate galaxy law that has now been benchmarked and found weaker than MOND

That is a narrower and more accurate reading than the original progression in the note suggested.

## Bottom Line

The note was scientifically worth writing because it produced a testable kernel.

That kernel has now been tested.
It is not enough.

So the next CSR galaxy-law attempt should not reuse this candidate as if it were merely awaiting more data.
It should be treated as an explored branch:

- cleaner than the legacy ansatz
- weaker than MOND
- not yet the law CSR needs
