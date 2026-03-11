# CSR Constraint-Derived Root Law

## Purpose
This branch is the first explicit attempt to derive the low-acceleration bend analytically instead of fitting a MOND-shaped interpolation template.

It is not presented as a finished CSR law. It is a derivation-first test law designed to answer a narrower question:

Can a quotient-normalized closure produce the square-root regime analytically with only one global scale left to fit?

## Law
The branch uses the best current weighted Hodge source as its quotient-response input and imposes a quadratic closure:

- `Q(r) = sqrt(1 + (response(r) / response_scale)^2)`
- `a_eff(r) = a_* Q(r)`
- `g(g - g_bar) = a_eff g_bar`
- `g_pred(r) = 0.5 * [g_bar + sqrt(g_bar^2 + 4 a_eff g_bar)]`
- `v_pred^2 = r g_pred`

## What Is Actually Derived Here
Derived:
- the low-acceleration square-root bend comes from the quadratic closure,
- the high-acceleration Newtonian limit comes from the same closure,
- the shape is not inserted through a hand-chosen MOND interpolation function.

Not yet derived:
- the quotient norm `Q(r)` itself,
- the transition scale `a_*`,
- any proof that this closure follows from the monitored quotient measure rather than being an admissible constraint-driven guess.

## Fitted Quantity
- global transition scale `a_* = 124.7433` in internal acceleration units

## Results
### SPARC
- holdout mean `R^2 = 0.6664`
- holdout std `= 0.1621`
- full-sample `R^2 = 0.8172`
- full-sample median `R^2 = -1.4101`

### Direct Observed External Gate
- aggregate `R^2 = 0.8209`
- median `R^2 = -6.2341`
- MOND aggregate `R^2 = 0.8618`
- baryons-only aggregate `R^2 = 0.4628`

### THINGS/Leroy Sensitivity Sets
- 9-gal parametric sensitivity aggregate `R^2 = 0.1047`
- 11-gal imputed sensitivity aggregate `R^2 = 0.1978`

### Analytic Structure Check
- low-acceleration RAR slope `= 0.6226`

This single slope is not enough. The full triple-test still fails because the branch misses the full BTFR and MDAR structure under the strict suite.

## Interpretation
This branch matters because it cleanly separates two problems that had been mixed together:

1. deriving the bend shape,
2. deriving the quotient normalization.

The root-law branch partially solves only the first.

It shows that a derivation-first closure can recover the right low-acceleration bend tendency without directly fitting a MOND interpolation function. But the external median collapse shows that deriving the closure while leaving the quotient normalization underived is still insufficient.

## Bottom Line
This is useful negative progress.

It rules out the hope that the current program only needed a better closure algebra. The next branch must derive the quotient normalization itself, not just the square-root asymptotic closure.
