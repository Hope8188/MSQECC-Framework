# CSR Physical Quotient Filter Scan

## Purpose

This note records a richer quotient-filter scan for the alpha branch.

The machine-readable audit is in `output/audit/csr_physical_quotient_filter_scan.json`.

## Model Family

The scan goes beyond the naive logical filter by allowing:

- single monitored channels
- pair monitored channels
- pair-flip dynamics
- degree bias in the hidden dynamics

The aim is simple: test whether a more physical low-dimensional quotient filter can move the induced degree weights toward the alpha target.

Target:

- `[0.5, 0.25, 0.5]`

## Best Model

Best member:

- name: `strong_dual`
- `k_single = 1.0`
- `k_pair = 1.0`
- `gamma_pair = 0.08`
- `degree_bias = 0.35`

Induced weights:

- `[0.5381, 0.3334, 0.1285]`

L1 distance to target:

- `0.4931`

## Reading

This is better than the naive logical filter in one sense: it moves the degree-1 weight close to `0.5`.

But it still fails badly on:

- the degree-2 suppression
- the degree-3 enhancement

So even a richer quotient filter is still far from the alpha target.

## Bottom Line

A more physical low-dimensional quotient filter still does not recover alpha. The missing canonical measure is more structured than threshold heuristics or small logical filters.
