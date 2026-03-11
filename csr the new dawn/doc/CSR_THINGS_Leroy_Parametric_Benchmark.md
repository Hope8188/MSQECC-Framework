# CSR THINGS Leroy Parametric Benchmark

## Purpose

This note records the first benchmark on the frozen clean THINGS/Leroy target list using the exact published two-parameter rotation-curve form.

The machine-readable audit is in `output/audit/csr_things_leroy_parametric_benchmark.json`.

## Frozen Rotation-Curve Model

The benchmark uses the Leroy parametric form

`v_rot(r) = v_flat * (1 - exp(-r / l_flat))`

with `v_flat` and `l_flat` taken from Leroy 2008 `table4.dat`.

## Dataset

Frozen targets:

- `hoi`
- `hoii`
- `n4449`
- `n3077`
- `n925`
- `n628`
- `n3184`
- `n4736`
- `n3351`
- `n3627`
- `n5194`

Usable now:

- `9 / 11`

Used aliases:

- `hoi`
- `hoii`
- `n925`
- `n628`
- `n3184`
- `n4736`
- `n3351`
- `n3627`
- `n5194`

Still missing local handles:

- `n4449`
- `n3077`

## Aggregate Benchmark

- weighted Hodge aggregate `R^2 = 0.1682`
- tensorial Hodge aggregate `R^2 = 0.1707`
- MOND aggregate `R^2 = 0.4123`
- baryons-only aggregate `R^2 = -0.0019`

Median per-galaxy `R^2`:

- weighted Hodge `-1.7606`
- tensorial Hodge `-1.7312`
- MOND `-1.3924`
- baryons-only `-1.4586`

## Reading

This is the first paired non-SPARC benchmark that is actually strong enough to matter.

The result is harsher than the earlier three-galaxy decomposition-grade fallback:

- scalar weighted-Hodge fell from local fallback aggregate `0.7550` to THINGS/Leroy aggregate `0.1682`
- tensorial Hodge fell from local fallback aggregate `0.7584` to THINGS/Leroy aggregate `0.1707`

That means the earlier fallback set was too optimistic about external generalization.

The operator branch still beats baryons-only on aggregate, but it does not come close to MOND on this first real paired non-SPARC test.

## Notable Per-Galaxy Behavior

- `hoii` is fit well by both operator branches and badly by MOND.
- `n925` shows a small positive operator signal.
- `n628`, `n4736`, `n3627`, and `n5194` remain difficult for all current CSR operator branches.

## Bottom Line

The exact THINGS/Leroy benchmark did what it was supposed to do. It removed the optimism of the fallback set and showed that the current quotient/Green reductions are still far from a robust external law.
