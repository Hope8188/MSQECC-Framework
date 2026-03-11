# CSR IBM Relaxation Clue Analysis

## Purpose

This note compresses the two IBM relaxation-channel runs into the one quantity that matters for theory guidance:

- how much extra decay the `exchange_reset` branch shows above baseline and above the `zz_reset` control

## Aggregate Result

Across the two hardware runs, the mean fitted excess decay per round is:

- exchange vs baseline: `0.0649`
- exchange vs `zz_reset`: `0.0475`

Those numbers come from normalized branch populations, not raw excited-state populations.

## Backend Detail

### `ibm_fez`

Effective decay per round from normalized populations:

- baseline: `-0.0002`
- `zz_reset`: `0.0157`
- `exchange_reset`: `0.0541`
- exchange vs baseline: `0.0543`
- exchange vs `zz_reset`: `0.0384`

Caveat:

- neither control nor exchange branch is monotonic on this backend
- `zz_reset` shows a large nonphysical rebound by `8` rounds

### `ibm_marrakesh`

Effective decay per round from normalized populations:

- baseline: `0.0013`
- `zz_reset`: `0.0203`
- `exchange_reset`: `0.0768`
- exchange vs baseline: `0.0756`
- exchange vs `zz_reset`: `0.0565`

This backend is much cleaner:

- `zz_reset` is monotonic
- `exchange_reset` is monotonic
- the excess decay signal survives the control branch clearly

## Interpretation

This is enough to keep the reset-induced relaxation clue alive.

It is not enough to claim a clean measurement of the CSR relaxation law.

The defensible statement is:

- repeated exchange-plus-reset induces extra system population decay on real IBM hardware
- that excess survives at least one cleaner backend (`ibm_marrakesh`) after accounting for baseline and control-branch loss
- current open-hardware noise is still large enough that the experiment remains a clue test, not a precision extraction of `lambda_eff`

## What This Means

The hardware branch should now target robustness, not breadth.

The right next IBM experiment is:

- same mechanism
- shorter round ladder
- more shots
- backend-specific control calibration
- branch-relative decay as the primary observable

## Output

Primary audit file:

- `output/audit/csr_ibm_relaxation_clue_analysis.json`
