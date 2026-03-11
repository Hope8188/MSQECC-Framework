# IBM Spatial Idle-Correlation Preregistration

Date: 2026-03-08

## Question
Do idle-time error correlations on real IBM hardware follow an inverse-square law in graph distance more strongly than a local exponential decay law when measured on a fixed, preregistered spatial layout?

## Primary claim under test
The MSQECC hardware section predicts a nonlocal tail in idle-time correlations. Operationally, that means the pairwise absolute correlation `|corr_ij|` between measurement outcomes should be better described by

`|corr_ij| = A / D_ij^2`

than by

`|corr_ij| = A * exp(-D_ij / L)`

where `D_ij` is the shortest-path distance on the device coupling graph.

## Backends
- Primary backend: `ibm_marrakesh`
- Replication backend: `ibm_torino`

These backends were selected before the new runs because they were available on the IBM open plan and have enough physical qubits to support a 10-qubit sparse layout.

## Fixed layouts
The layouts were chosen before running the new experiment by a deterministic maximin rule applied only to the backend coupling map: start from qubit `0`, then iteratively add the qubit that maximizes the minimum graph distance to the already selected set, breaking ties by larger mean distance.

The resulting fixed layouts are:

- `ibm_marrakesh`: `0,140,75,80,155,13,40,109,120,27`
- `ibm_torino`: `0,128,37,91,64,129,9,90,38,111`

For the 10 selected qubits, this yields 45 pairwise distances per backend.

## Circuit
- One register of 10 qubits.
- No state preparation beyond the backend ground-state reset.
- A single idle delay applied to all selected qubits.
- Full measurement in the computational basis.

## Fixed run settings
- Qubits per run: `10`
- Shots per run: `4000`
- Idle durations in microseconds: `0, 20, 50, 100, 200, 500`
- Same circuit family, same transpilation path, same analysis code for every run.

## Analysis plan
For each backend and idle duration:
- Compute the 10x10 correlation matrix from raw measurement counts.
- Extract the 45 off-diagonal absolute pair correlations `|corr_ij|`.
- Fit two models to the pairwise dataset:
  - inverse-square: `A / D^2`
  - exponential: `A * exp(-D / L)`
- Compare models with BIC.
- Convert `Delta BIC` to a large-sample approximate Bayes factor using `BF = exp(Delta BIC / 2)` in favor of the lower-BIC model.

## Preregistered decision rule
Evidence for the MSQECC-style nonlocal tail requires all of the following:
- On `ibm_marrakesh`, the inverse-square model is preferred over the exponential model with approximate Bayes factor `>= 10` in at least 3 of the 5 nonzero-delay runs.
- On `ibm_torino`, the inverse-square model is preferred over the exponential model with approximate Bayes factor `>= 10` in at least 2 of the 5 nonzero-delay runs.
- The inverse-square preference must not be driven solely by the `0 us` baseline.

If these conditions fail, the hardware test is recorded as negative or inconclusive for the claimed inverse-square signature.

## Interpretation guardrails
- Graph distance, not Euclidean chip-coordinate distance, is the preregistered spatial metric because it is directly defined by the backend coupling graph and is stable across runtime metadata.
- This experiment does not prove a vacuum theory even if positive. It tests only whether a specific distance-law signal is present in idle correlations.
- A negative result counts against the hardware claim and should not be reframed as support.
