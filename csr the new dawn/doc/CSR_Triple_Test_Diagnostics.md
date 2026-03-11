# CSR Triple Test Diagnostics

## Purpose

This note records the fast structural diagnostic for galaxy-law candidates.

Instead of going straight to full rotation-curve benchmarking, a candidate is first checked against the three empirical relations that any serious galaxy-scale theory must reproduce:

- RAR: Radial Acceleration Relation
- BTFR: baryonic Tully-Fisher relation
- MDAR: Mass Discrepancy-Acceleration Relation

The machine-readable audit is in `output/audit/csr_triple_test_diagnostics.json`.

## Target Structure

In the low-acceleration regime, the target signatures are approximately:

- RAR low-acceleration slope near `0.5`
- MDAR low-acceleration slope near `-0.5`
- BTFR slope near `4`

These are not arbitrary fit metrics.
They encode the scale-invariant, MOND-like bending that successful galaxy models must reproduce.

## Results

### Baryons only

- RAR low slope `1.000`
- BTFR slope `2.946`
- MDAR low slope `-0.000`

### MOND

- RAR low slope `0.593`
- BTFR slope `3.764`
- MDAR low slope `-0.407`

### Weighted Hodge

- RAR low slope `1.088`
- BTFR slope `2.723`
- MDAR low slope `0.088`

### Tensorial Hodge

- RAR low slope `1.085`
- BTFR slope `2.708`
- MDAR low slope `0.085`

### Retarded Hodge

- RAR low slope `1.009`
- BTFR slope `2.327`
- MDAR low slope `0.009`

### Scale-invariant operator

- RAR low slope `0.598`
- BTFR slope `3.749`
- MDAR low slope `-0.402`

## Reading

This is the fastest new clue in the whole galaxy branch.

The earlier operator families were not mainly failing because their kernels were too simple.
They were failing because they stayed effectively linear in the low-acceleration regime.

That is why they plateaued around weak external performance even when the operator structure became more sophisticated.

The first branch to match the triple test is the first branch to reach MOND-level aggregate external performance.

So the main empirical gap is now explicit:

CSR must derive a transition scale and low-acceleration bending law.
Without that, no amount of kernel tweaking is likely to beat the plateau.

## Bottom Line

The triple test should now be the first gate in the search.

If a candidate misses the RAR/BTFR/MDAR structure, it should be killed before more expensive external benchmarking.
