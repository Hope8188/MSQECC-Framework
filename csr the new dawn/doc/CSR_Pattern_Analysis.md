# CSR Pattern Analysis

## Purpose

This note records the structured patterns across the CSR scans.

The goal is not to list failures one by one. The goal is to identify what the failures have in common and what the newest operator and measure branches changed.

The machine-readable summary is in `output/audit/csr_pattern_analysis.json`.

## Pattern 1: Micro Survives, Macro Still Fails

The microscopic bridge side keeps surviving.

- bridge rate is stable
- bridge semigroup error is effectively zero in the audit split test
- the local channel remains CP, trace preserving, and geometry-controlled

What keeps failing is not the local bridge derivation.

What keeps failing is the macroscopic orbital response and the induced sector measure.

## Pattern 2: The Operator Move Is Real

Moving from local closures to quotient or Green operators materially helped.

On SPARC holdout:

- local Jeans closure: `0.5800`
- scalar weighted Hodge: `0.7231`
- tensorial Hodge: `0.7241`
- retarded Hodge: `0.8042`
- scale-invariant constraint template: `0.9215`

So operator structure is necessary.

## Pattern 3: Retardation Changes The Shape Of The Failure, Not The Outcome

The retarded branch is the first operator family that changes the failure pattern meaningfully.

Compared with the scalar and tensorial static operator reductions:

- it raises SPARC holdout strongly
- it improves paired external median stability
- but it fails the paired external aggregate gate

So memory helps the structure.

It is not enough to solve the operator problem.

## Pattern 4: The Three-Galaxy Fallback Was Too Optimistic

The earlier alias-clean fallback set overstated external viability.

On the fallback set, operator branches looked much stronger.

On the first real paired THINGS/Leroy benchmark, they dropped sharply.

That remains the main empirical correction of this stage.

## Pattern 5: Handle Recovery Changes Sensitivity, Not Direction

The bounded `11/11` imputed-handle check is useful, but it does not change the direction of the benchmark.

The operator branches remain below MOND:

- weighted Hodge aggregate `0.2328`
- tensorial Hodge aggregate `0.2350`
- retarded Hodge aggregate `0.1826`
- MOND aggregate `0.4106`

So the handle-recovery branch is a robustness check, not a rescue.

## Pattern 6: Alpha Shortcuts Keep Failing

Threshold heuristics fail.

The naive logical filter fails.

A richer dual monitored quotient filter also fails.

Best richer-filter weights:

- `[0.5381, 0.3334, 0.1285]`

Target:

- `[0.5, 0.25, 0.5]`

So the alpha branch still lacks the right canonical measure.

## Pattern 7: Current IBM Data Do Not Hide A Threshold Signature

The present hardware datasets support the bridge and the branch-relative excess decay clue.

They do not support a threshold-kink interpretation.

## Pattern 8: Constraint-First Search Beats Blind Operator Search

The biggest new pattern is operational.

The first branch to materially close the external aggregate gap is the branch that imposes the right structural constraints explicitly:

- Newtonian high-acceleration behavior
- MOND-like low-acceleration bend
- correct RAR, BTFR, and MDAR geometry

This is stronger evidence than any blind kernel tweak so far.

## Pattern 9: The Current Winner Is A Template, Not A Derivation

The scale-invariant branch performs well because it hard-wires the MOND-like asymptotic structure and only modulates it weakly with CSR response data.

The fitted CSR modulation is small:

- `eta = 0.00363`

So the right reading is not:

- CSR has derived the correct galaxy law

The right reading is:

- the missing object is now explicit: a derived transition scale and low-acceleration bending law coming from the quotient/measure structure

## Bottom Line

The pattern is sharper again.

- local bridge physics keeps surviving
- blind operator search was wasting time
- the real empirical gap is structural
- the triple test should come before heavy benchmarking
- the scale-invariant branch is the best constraint template so far
- the live target is now explicit: derive the transition scale and low-acceleration bend from the quotient/measure structure instead of imposing them
