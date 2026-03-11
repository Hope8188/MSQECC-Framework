# CSR Observed Gate Expansion Audit

## Scope
This note answers one narrow question:

Can the direct observed external main gate be honestly expanded using only the local workspace data?

## Current answer
No.

The current workspace supports a clean direct observed decomposition-grade main gate of only three non-SPARC galaxies:

- `m33`
- `n1560`
- `n5533`

These are the only local cases that currently combine:

- direct observed rotation curves
- machine-readable baryonic decomposition
- non-SPARC status

## What exists locally
### Direct observed decomposition-grade files
- `galaxy_massmodels.dat`
- `RCsmooth.0701.dat`

These provide the current 3-gal main gate after alias cleaning and best-source selection.

### Observed-only file
- `KuzioDpak0608.dat`

This adds observed curves but not paired baryonic decomposition, so it cannot expand the main gate honestly.

### Primary-source candidate surveys
- THINGS article tables
- LITTLE THINGS article tables

These expand the clean non-SPARC candidate pool to `29` aliases locally.
But they do not provide the per-radius baryonic decomposition needed for a direct observed decomposition-grade gate.

## Why the gate cannot be expanded honestly
The missing object is not more galaxy names.
It is paired radial baryonic structure.

Without per-radius gas and stellar decomposition, any larger "observed gate" would rely on:

- interpolation,
- imputation,
- or new fitted assumptions.

That would weaken the benchmark instead of strengthening it.

## Correct benchmark policy
Use:

- the 3-gal direct observed gate as the main adversarial benchmark
- THINGS/Leroy 9-gal and 11-gal sets as sensitivity-only

Do not promote a larger direct observed gate until new paired baryonic profiles are added.

## Bottom line
The current workspace can falsify weak branches on real observed data.
It cannot yet validate a galaxy law beyond reasonable doubt because the honest direct observed gate is still only three galaxies.
