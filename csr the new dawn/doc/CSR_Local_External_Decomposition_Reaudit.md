# CSR Local External Decomposition Re-Audit

## Result

The stricter local re-audit confirms that the workspace still does **not** contain a `20+` alias-clean non-SPARC decomposition-grade sample.

The supporting audit is in [csr_local_external_decomposition_reaudit.json](output/audit/csr_local_external_decomposition_reaudit.json).

## What Was Rechecked

I re-audited all locally available non-SPARC external galaxy files that might carry baryonic decomposition terms:

- `galaxy_massmodels.dat`
- `RCsmooth.0701.dat`
- `KuzioDpak0608.dat`

using one shared alias normalizer and one shared SPARC-overlap filter.

## Counts

### Source-level counts

- `galaxy_massmodels.dat`: `3` non-SPARC aliases
- `RCsmooth.0701.dat`: `17` non-SPARC aliases
- `KuzioDpak0608.dat`: `5` non-SPARC aliases, but observed curves only

### Best alias-resolved clean set

- total clean aliases: `20`
- decomposition-grade aliases: `3`
- rotation-only aliases: `17`
- local `20+` decomposition-grade threshold met: `False`

## The Three Usable Local Decomposition-Grade Galaxies

- `m33`
- `n1560`
- `n5533`

All three come from `galaxy_massmodels.dat` and all three retain nonzero published gas and stellar terms after alias cleaning.

## Why RCSmooth Did Not Rescue The Count

This needed checking carefully.

The clean non-SPARC aliases left in `RCsmooth.0701.dat` are mostly:

- `eso120021g1`
- `eso14004g0`
- `eso187051g0`
- `eso206014g0`
- `eso302012g0`
- `eso305009g0`
- `eso425018g0`
- `eso488004g9`
- `eso84041g1`
- `f730v1`
- `u4115`
- `u11454`
- `u11583`
- `u11616`
- `u11648`
- `u11748`
- `u11819`

For those aliases, the local file carries the observed rotation curve but the published baryonic component columns are zero in the workspace copy. So they are clean rotation-curve rows, not decomposition-grade rows.

## Kuzio Cross-Check

The non-SPARC DensePak file contributes observed curves for:

- `n4395`
- `n7137`
- `n959`
- `u1551`
- `u477`

None of those currently have matching local baryonic decomposition rows in the cleaned workspace set.

## Bottom Line

The earlier suspicion of a parser bug did not survive the line-by-line re-audit.

The harsh result stands:

- clean local non-SPARC set: `20` aliases
- clean local decomposition-grade set: `3` aliases

So the falsifiability-clause external benchmark is still not fully runnable from local files alone.
