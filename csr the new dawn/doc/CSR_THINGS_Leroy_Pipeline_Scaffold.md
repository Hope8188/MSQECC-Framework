# CSR THINGS Leroy Pipeline Scaffold

## Purpose

This scaffold checks whether the workspace already contains a usable non-SPARC external set with:

- radial baryonic profiles
- matching aliases
- and observed rotation curves

The immediate target was the Leroy et al. 2008 THINGS companion tables.

## Inputs

- `data/external/things_candidates/leroy_2008/table2.dat`
- `data/external/things_candidates/leroy_2008/table7.dat`
- `data/external/mcgaugh_massmodels/galaxy_massmodels.dat`
- `data/external/mcgaugh_massmodels/RCsmooth.0701.dat`

## Counts

- Leroy sample total: `23`
- Leroy radial-profile tables present: `23`
- SPARC overlaps after alias resolution: `12`
- clean non-SPARC aliases: `11`
- clean non-SPARC aliases with radial baryonic profiles: `11`
- clean non-SPARC aliases with automatic local rotation-curve pairings: `0`

Clean non-SPARC aliases with Leroy radial profiles:

- `hoi`
- `hoii`
- `n4449`
- `n3077`
- `n925`
- `n628`
- `n3184`
- `n4736`
- `n3351`
- `n3627`
- `n5194`

## Interpretation

This is the most important dataset result from the current pass.

The name-count problem is effectively solved for this branch. The workspace already has a real machine-readable baryonic-profile layer for `11` clean non-SPARC THINGS/Leroy galaxies.

The remaining problem is narrower:

- there are currently `0` automatic pairings to local rotation-curve tables for those same aliases

So the bottleneck is no longer "find galaxies." It is:

- fetch or build the matching primary-source rotation-curve tables for these exact aliases
- then keep the alias map frozen

## What This Means

The next external benchmark should not begin by casting around for more sample lists.

It should begin by completing the paired pipeline for these `11` exact targets. That is the shortest path to a true non-SPARC decomposition-grade CSR benchmark.

## Output

Primary audit file:

- `output/audit/csr_things_leroy_pipeline_scaffold.json`
