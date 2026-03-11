# CSR Next Branch Admission Gate

## Purpose
This note freezes the promotion rule for future CSR branches.

The project has spent enough time exploring branches that looked interesting but were never eligible to become real derivations.
That stops here.

## Admission policy
No future branch should be promoted as the next serious CSR derivation branch unless it does all of the following:

- derives the transition scale
- derives the quotient normalization
- derives the low-acceleration bend
- does not rely on a hand-wired interpolation law

This is now a hard gate, not a suggestion.

## Why this gate exists
The current record already established three things:

1. the scale-invariant template is only a constraint envelope
2. the derivation-first root law shows that deriving the closure alone is not enough
3. high aggregate score without derived normalization and scale still produces dead-end branches

That means the next branch has to derive the missing objects together or it is just another fit family.

## Current branch audit
### `scale_invariant_template`
- derives transition scale: `false`
- derives quotient normalization: `false`
- derives low-acceleration bend: `false`
- hand-wired interpolation: `true`
- eligible for promotion: `false`

### `constraint_derived_root_law`
- derives transition scale: `false`
- derives quotient normalization: `false`
- derives low-acceleration bend: `true`
- hand-wired interpolation: `false`
- eligible for promotion: `false`

### `weighted_hodge`
- eligible for promotion: `false`

### `tensorial_hodge`
- eligible for promotion: `false`

### `retarded_hodge`
- eligible for promotion: `false`

### `MOND`
- hand-wired interpolation: `true`
- eligible for promotion: `false`

## What this means operationally
The next branch should not start from:

- another Hodge variant
- another retarded kernel
- another scale-invariant wrapper
- another closure-only law

The next branch should start only from a derivation candidate that has a typed answer for:

1. where the transition scale comes from
2. where the quotient normalization comes from
3. why the deep-IR bend has the required form

## Bottom line
Under this admission gate, every current branch is ineligible for promotion.

That is not a setback.
It is the first point in the program where branch selection is finally aligned with the actual missing physics.
