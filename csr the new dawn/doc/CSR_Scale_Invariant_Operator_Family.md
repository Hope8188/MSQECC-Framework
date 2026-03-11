# CSR Scale-Invariant Operator Family

## Purpose

This note records the first constraint-driven operator family built from the empirical structure that successful galaxy theories actually need:

- Newtonian behavior at high acceleration
- MOND-like square-root scaling at low acceleration
- local modulation from the CSR quotient response

The machine-readable audit is in `output/audit/csr_scale_invariant_operator_family.json`.

## Law

The tested family was

- `q(r) = clip(1 + eta * q_raw(r), 0.05, 20)`
- `a_eff(r) = a0 * q(r)`
- `g_pred = g_bar / (1 - exp(-sqrt(g_bar / a_eff)))`
- `v_pred^2 = r g_pred`

Here `q_raw` comes from the best scalar weighted-Hodge quotient response.

## Results

- SPARC holdout mean `R^2 = 0.9215 +/- 0.0161`
- full SPARC aggregate `R^2 = 0.9330`
- local 3-gal fallback aggregate `R^2 = 0.8776`
- paired THINGS/Leroy 9-gal aggregate `R^2 = 0.4170`
- paired THINGS/Leroy median `R^2 = -1.2556`

Best fit:

- `a0 = 3519.93`
- `eta = 0.00363`

## Reading

This branch is the first one to match MOND-level aggregate external performance on the frozen THINGS/Leroy benchmark.

That is important.

It means your friend's advice was directionally correct:

- searching blind through kernels was wasting time
- the winning branch is the first one that imposes the right low-acceleration structure explicitly

But the same result also imposes a hard caution.

The fitted CSR modulation is tiny:

- `eta` is close to zero

So the current success is not evidence that CSR has derived the law.
It is evidence that the missing ingredient is the transition-scale structure embodied in the RAR/BTFR/MDAR triple test.

## Bottom Line

This is not yet a derived CSR galaxy law.

It is the best constraint template so far.

The live task is now narrower:

derive the scale-setting and low-acceleration bend from the quotient/measure structure instead of hard-wiring the MOND-like asymptotics.
