# CSR Fast Solution Funnel

## Purpose

This note records the stage-gated pruning rule for the CSR search.

The machine-readable audit is in `output/audit/csr_fast_solution_funnel.json`.

## Why This Exists

The problem is no longer a shortage of candidate branches.

The problem is spending time on branches that already fail cheap structural gates.

The funnel now enforces this order:

1. structural triple test
2. SPARC holdout gate
3. paired external aggregate gate
4. paired external median stability gate

## Current Gates

Structural triple test:

- RAR low-acceleration slope target `0.5 +/- 0.2`
- MDAR low-acceleration slope target `-0.5 +/- 0.2`
- BTFR slope target `4.0 +/- 0.5`

Benchmark gates:

- holdout minimum: `0.65`
- paired external aggregate minimum: `0.15`
- paired external median floor: `-1.5`

## Current Dispositions

- `jeans`: kill
- `weighted_hodge`: kill
- `tensorial_hodge`: kill
- `retarded_hodge`: kill
- `scale_invariant_operator`: hold as constraint template

## Reading

The important new result is not only that the scale-invariant branch performed well.

It is that the first branch to pass the external aggregate gate is also the first branch to pass the structural triple test.

That means the search bottleneck was structural, not just numerical.

At the same time, the scale-invariant branch is not yet a derived CSR law.
It passes because it hard-wires the MOND-like asymptotics and then modulates them only weakly with CSR response data.

So its role is:

- keep as a design constraint
- do not claim as the derivation

## Bottom Line

The fastest path now is:

- reject candidates quickly if they miss the triple test
- use the scale-invariant branch as a constraint template
- spend serious effort only on candidates that derive the transition structure instead of imposing it
