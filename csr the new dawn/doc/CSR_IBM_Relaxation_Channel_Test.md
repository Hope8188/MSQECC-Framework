# CSR IBM Relaxation Channel Test

## Purpose

This hardware test targets the surviving reset-channel clue, not the dead inverse-square noise claim.

The question is whether repeated ancilla measurement and reset, combined with an exchange-type entangling branch, produces selective population decay of the system qubit.

## Circuit Branches

Three branches were run for rounds `0, 1, 2, 4, 8`:

- `baseline`
- `zz_reset`
- `exchange_reset`

The system qubit starts in `|1>`.

The exchange branch applies `RXX(theta)` and `RYY(theta)` before ancilla measurement/reset each round.

The control branch applies `RZZ(2 theta)` before ancilla measurement/reset.

## Backend Runs

### `ibm_fez`

- job id: `d6ms74obfi7c73a3uo00`
- physical qubits: `[0, 1]`
- shots: `2000`
- `theta = 0.22`

Measured excited-state population:

- baseline: `0.9755, 0.9665, 0.9690, 0.9695, 0.9685`
- `zz_reset`: `0.9620, 0.8745, 0.6615, 0.3420, 0.7410`
- `exchange_reset`: `0.9615, 0.8810, 0.7670, 0.5630, 0.5925`

Fitted exchange decay per round:

- `0.0541`

Ideal discrete-step exchange decay per round:

- `0.0488`

### `ibm_marrakesh`

- job id: `d6msc6e9td6c73anda9g`
- physical qubits: `[0, 1]`
- shots: `2000`
- `theta = 0.22`

Measured excited-state population:

- baseline: `0.9915, 0.9855, 0.9870, 0.9815, 0.9780`
- `zz_reset`: `0.9895, 0.9565, 0.9375, 0.8755, 0.8310`
- `exchange_reset`: `0.9905, 0.8940, 0.8260, 0.6910, 0.5225`

Fitted exchange decay per round:

- `0.0768`

Ideal discrete-step exchange decay per round:

- `0.0488`

## Interpretation

This is a real positive clue, but not yet a clean measurement of the CSR relaxation rate.

What the data supports:

- baseline remains near unit excited-state population on both backends
- the exchange-plus-reset branch shows strong selective decay on both backends

What the data does not support cleanly:

- the `zz_reset` control is not inert
- `ibm_fez` is visibly noisy and nonmonotonic in the control branch
- even `ibm_marrakesh` shows substantial control-branch loss by `8` rounds

So the correct statement is narrow:

- the exchange-plus-reset mechanism is physically realizable on real hardware
- the present hardware data gives an excess-relaxation clue
- it does not yet isolate `lambda_eff` as a clean backend-independent quantity

## Outputs

Primary audit files:

- `output/audit/csr_ibm_relaxation_channel_test_ibm_fez.json`
- `output/audit/csr_ibm_relaxation_channel_test_ibm_marrakesh.json`
