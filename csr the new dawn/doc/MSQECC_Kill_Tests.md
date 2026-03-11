# MSQECC Kill Tests

## Purpose

A serious framework needs named tests that can kill specific claims cleanly.

This document records the current status of the highest-leverage kill tests.

## 1. Cheap Numerology Kill Test

Question:

- is `4*pi^3 + pi^2 + pi` just one of many equally good small-integer hits near `alpha^-1`?

Result:

- no
- it is the unique hit below `1e-4` relative error in the tested boxes up to coefficient limit `< 30`

Status:

- survives the cheap-numerology kill test
- still not a derivation

## 2. Commuting Syndrome Coupling Kill Test

Question:

- does the literal `Z_edge tensor sigma_z` matter coupling generate the needed pointer-basis dephasing under plaquette measurement?

Result:

- no
- it produces coherent oscillation, not Lindblad dephasing

Status:

- that coupling geometry is killed

## 3. Anticommuting Bridge Test

Question:

- can the syndrome channel produce the needed matter dephasing on any natural branch?

Result:

- yes
- the anticommuting branch yields the exact `2 g^2 / kappa` coherence-decay law

Status:

- surviving bridge candidate

## 4. Positive-Density Galaxy-Law Kill Test

Question:

- can the current global ansatz define a positive effective density across the full SPARC sample?

Result:

- no
- the global positive-`C` feasible interval in `k` is empty

Status:

- the literal positive-density global form of the current ansatz is killed

## 5. External Generalisation Kill Test

Question:

- does the frozen SPARC model generalize positively to independent non-SPARC galaxies?

Result:

- mixed
- aggregate pointwise `R^2` is positive, but median per-galaxy `R^2` remains negative and MOND is stronger

Status:

- not killed
- not validated

## 6. a0 Proportional H Kill Test

Question:

- does the current low-z comparison support `a0 proportional H`?

Result:

- no
- the literal two-point fit prefers `n = 10.26 +/- 2.10`, not `n = 1`

Status:

- the simple `n = 1` law is provisionally killed as a validated claim

## Bottom Line

The programme did not survive unchanged.

What survived is narrower:

- the alpha lead,
- the noncommuting syndrome bridge,
- and the empirical claim that the galaxy model is not trivial.

What died:

- the commuting matter-coupling route,
- the globally positive-density reading of the present ansatz,
- and the claim that `a0 proportional H` is already supported.
