# CSR IBM Threshold Kink Check

## Purpose

This note checks whether the current IBM hardware datasets already show a threshold-like kink rather than a single decay law.

The machine-readable summary is in `output/audit/csr_ibm_threshold_kink_check.json`.

## Tested Idea

A strong threshold story would need the current branch-relative hardware decays to prefer a broken-slope or kinked law over a single exponential-like decay.

The check compares:

- a single log-linear decay
- a piecewise log-linear decay with one breakpoint

## Result

### Bridge anticommuting branch

For the `ibm_fez` anticommuting bridge decay, the piecewise model is disfavored:

`Delta AICc = +14.76`

Positive `Delta AICc` here means the broken-slope model is worse than the single-slope model.

### Relaxation branch-relative decay

For the `ibm_marrakesh` exchange-relative decay observables, the current round ladder has only three nonzero points.

That is too little data to fit and compare a meaningful kink model.

## Meaning

The current IBM data support the bridge and the branch-relative excess decay clue.

They do not support a threshold-kink interpretation.

So any threshold claim still has to come from a better code-level derivation or from a properly scaled threshold experiment, not from the present hardware curves.

## Bottom Line

The current hardware record does not reveal a threshold kink.

The bridge result stays alive. The threshold-kink shortcut does not.
