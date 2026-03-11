# CSR Alpha Bounded Derivation Attempt

## Purpose

This note records one time-boxed attempt to derive the candidate alpha decomposition weights from bounded `T^3` stabilizer and CSS-incidence data.

The machine-readable audit is in `output/audit/csr_alpha_bounded_derivation_attempt.json`.

## Target Decomposition

The candidate identity tested was

`(2 pi)^3 / 2 + (2 pi)^2 / 4 + (2 pi) / 2`

with target weights:

- 1D sector: `1/2`
- 2D sector: `1/4`
- 3D sector: `1/2`

## What Was Checked

The bounded attempt searched for those weights in simple `T^3` code data such as:

- Betti numbers
- plaquettes per edge
- edges per face
- cubes per face
- faces per cube
- star-generator weight

## Result

The `2D` weight `1/4` does appear naturally from face-related counts.

Examples:

- inverse of `edges_per_face = 4`
- inverse-half transform of `cubes_per_face = 2`

The problem is the two `1/2` weights.

They do not close uniquely onto the intended `1D` and `3D` sectors within this bounded attempt.

So the coefficient pattern remains underdetermined.

## Decision

- derivation status: `failed cleanly`
- structured-coincidence status: `survives`

This is the right outcome to record.

It neither rescues alpha as a derivation nor kills the lead entirely.

## Bottom Line

The bounded derivation attempt does not close.

The alpha expression remains a structured coincidence rather than a derived CSR result.
