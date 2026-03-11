# External Milky Way Blind Test

**Date:** March 8, 2026

## Purpose

The morphology-aware SPARC model was trained only on SPARC. The next honest step was a blind application to an external dataset with published baryonic component curves.

The external target used here is:

- McGaugh (2019), Milky Way mass-model table and circular-speed table,
- downloaded in machine-readable form from CDS,
- treated as a single-object external check.

## Setup

Training set:

- the full SPARC working sample only

External evaluation object:

- Milky Way mass model from `J/ApJ/885/87`

Assumption:

- the Milky Way is placed in the `mid` morphology bin, consistent with an approximate `SBbc/Sbc` classification.

Model application:

- fit the global SPARC model on SPARC only,
- fit the 3-bin morphology model on SPARC only,
- freeze those parameters,
- interpolate the external component curves to the published Milky Way circular-speed radii,
- evaluate out of sample.

## Reproducible Artifact

- `verification/external_milky_way_blind_test.py`
- `output/audit/external_milky_way_blind_test.json`

## Result

Out-of-sample `R^2` on the Milky Way tables:

- MSQECC global SPARC fit: `R^2 = -8.1390`
- MSQECC morphology-bin SPARC fit: `R^2 = -8.7625`
- MOND baseline: `R^2 = -3.9237`
- baryons-only baseline: `R^2 = -41.8897`

## Interpretation

Three things are true at once.

- The blind transfer is poor. The SPARC-trained model does not generalize cleanly to this external Milky Way dataset.
- The failure is not unique to MSQECC. MOND is also poor on this specific one-object check under the same comparison rule.
- Both theory-motivated fits still outperform baryons-only, which means the external target is not trivial but the current transfer is not good enough.

## Limitations

This is a useful external check, but it is not the final word.

- It is only one galaxy.
- The Milky Way dataset is itself a model-based reconstruction, not the same style of external-galaxy resolved rotation-curve dataset as SPARC.
- The morphology-bin assumption for the Milky Way is reasonable but not exact.

So the correct reading is not "the theory is dead on external data." The correct reading is:

- one available machine-readable external check is negative for clean generalization.

## Bottom Line

The SPARC morphology fit does not yet demonstrate robust external validity.

That is the point of a blind test. It forces the model to earn transferability instead of assuming it.
