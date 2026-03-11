# CSR IBM Relaxation Rate Measurement

## Purpose

This note records the narrowed hardware experiment for the reset-channel branch.

The question was not broad spatial noise. The question was whether the exchange-plus-reset branch shows backend-robust excess relaxation after subtracting baseline and control loss.

The machine-readable audit is in `output/audit/csr_ibm_relaxation_rate_measurement_ibm_marrakesh.json`.

## Protocol

Backend:

- `ibm_marrakesh`

Physical qubits:

- `[0, 1]`

Shots:

- `4000`

Control branches:

- baseline
- `zz_reset`
- `exchange_reset`

Rounds tested:

- `0`
- `1`
- `2`
- `4`

Primary observable:

- branch-relative excited-state decay

## Result

Measured relative rates:

- exchange over baseline: `0.051176`
- exchange over `zz_reset`: `0.025269`

These are positive in both normalizations.

So the current hardware status is:

- there is a real excess-relaxation clue in the exchange branch
- but this is still not a precision extraction of `lambda_eff`

## Why It Is Still A Clue, Not A Final Rate

The control branch itself remains lossy.

That means the hardware result supports the existence of excess exchange relaxation, but not yet a clean backend-independent measurement of the microscopic rate.

## Bottom Line

The narrowed reset-channel experiment is worth keeping, but the stronger standalone hardware result in CSR remains the bridge/dephasing experiment rather than the reset-rate branch.
