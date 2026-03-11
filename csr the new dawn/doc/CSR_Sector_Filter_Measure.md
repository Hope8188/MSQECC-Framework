# CSR Sector Filter Measure

## Purpose

This note records the first explicit filter-induced canonical-measure surrogate for the alpha branch.

The machine-readable audit is in `output/audit/csr_sector_filter_measure.json`.

## Model

The surrogate works on the logical quotient sectors `(Z2)^3`.

Hidden dynamics:

- independent logical-bit flips at rate `gamma`

Observation model:

- three noisy monitored parity channels with strength `kappa`

This is a Wonham or Belavkin-style logical filter surrogate, not yet the final monitored field-theory measure.

## Parameters

- `dt = 0.02`
- `steps = 40000`
- `burn_in = 5000`
- `kappa = 1.0`
- `gamma = 0.08`
- `8` random seeds

## Result

Mean nontrivial degree weights:

- degree 1: `0.4539`
- degree 2: `0.4234`
- degree 3: `0.1227`

Target alpha weights:

- degree 1: `0.5`
- degree 2: `0.25`
- degree 3: `0.5`

## Reading

This first explicit filter-induced measure does not recover the alpha weights.

What it does recover is closer to logical multiplicity structure on the quotient than to the alpha target. That means a naive monitored logical filter is not the missing canonical measure.

This is useful negative evidence:

- threshold heuristics alone fail
- multiplicity-like logical filtering also fails

So the alpha branch still needs a richer operator-measure pair than either of those shortcuts.

## Bottom Line

The first explicit filter surrogate misses alpha badly. The canonical measure for the alpha branch, if it exists, is more structured than a naive logical quotient filter.
