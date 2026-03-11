# CSR IBM Bridge Hardware Test

## Result

A real IBM hardware run now exists for the direct CSR bridge question.

The audit is in [csr_ibm_bridge_hardware_test_ibm_fez.json](output/audit/csr_ibm_bridge_hardware_test_ibm_fez.json).

This is not the old inverse-square-noise experiment.

It is a direct commuting-vs-anticommuting bridge test.

## Protocol

Backend:

- `ibm_fez`

Physical qubits:

- `[0, 1]`

Shots:

- `2000`

Branches tested across rounds `0, 1, 2, 4, 8`:

- baseline: repeated ancilla measure/reset with no entangling interaction
- commuting: repeated `ZZ`-type interaction with deterministic phase compensation
- anticommuting: repeated `XZ`-equivalent interaction implemented by basis-rotated `ZZ` plus ancilla measurement/reset

Observable:

- final system-qubit `X` expectation as a coherence proxy

## Observed Hardware Values

Baseline:

- `0`: `0.9650`
- `1`: `0.9620`
- `2`: `0.9690`
- `4`: `0.9730`
- `8`: `0.9610`

Commuting compensated branch:

- `0`: `0.9740`
- `1`: `0.9500`
- `2`: `0.8010`
- `4`: `0.0820`
- `8`: `0.2980`

Anticommuting branch:

- `0`: `0.9740`
- `1`: `0.7520` with ideal `0.7648`
- `2`: `0.5890` with ideal `0.5850`
- `4`: `0.3660` with ideal `0.3422`
- `8`: `0.1520` with ideal `0.1171`

## Interpretation

The main positive result is narrow but real.

The anticommuting branch shows the expected repeated-measurement coherence loss on real hardware, and the observed values track the ideal dephasing curve closely across all tested round counts.

The commuting compensated branch is not clean. Its behavior is much worse than the ideal compensated prediction and is likely dominated by hardware control error, gate compilation, or imperfect phase cancellation.

So the hardware result is:

- positive evidence for the anticommuting bridge signature
- not yet a clean hardware discrimination between commuting and anticommuting branches under compensation

## What This Means

The old IBM spatial-noise claim failed.

This new IBM test is different and materially better aligned with the surviving theory.

It does not prove CSR as a galaxy theory.

It does support the narrower statement that the anticommuting repeated-measurement bridge is a physically realizable channel and not just a simulator artifact.

## Bottom Line

The direct CSR bridge has now been seen on real IBM hardware in the only sense that currently matters:

the anticommuting branch produces the expected coherence decay pattern under repeated ancilla measurement.
