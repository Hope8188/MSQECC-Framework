# CSR Alias-Resolved External Audit

## Result

The public `galaxy_massmodels.dat` file is not a clean external validation set for CSR once aliases are normalized correctly.

Using the stronger alias map:

- total usable galaxy tags in `galaxy_massmodels.dat`: `50`
- resolved overlaps with SPARC: `47`
- remaining clean names: `3`
- clean names: `n5533`, `m33`, `n1560`

The earlier `4`-galaxy count was too generous because `5631` is the same object as `F563-1`, which is already in SPARC.

## Why This Matters

This file can no longer be treated as an independent external dataset in bulk.

Its correct use is much narrower:

- contamination control
- a small three-galaxy decomposition-grade stress test

## External Data Status After Correction

The workspace now contains two different clean external sets:

1. a clean `20`-galaxy rotation-curve set formed by merging alias-clean objects from `RCsmooth.0701.dat` and `galaxy_massmodels.dat`
2. only a clean `3`-galaxy decomposition-grade set with nonzero published baryonic component terms

That means:

- the workspace now has a real clean external rotation-curve sample
- it still does **not** have a final `20+` decomposition-grade sample for the falsifiability clause

## Bottom Line

The alias audit remains a hard constraint.

Any future external benchmark has to distinguish between:

- alias-clean rotation curves
- alias-clean galaxies with usable published baryonic decompositions

Those are not the same thing in the current workspace.
