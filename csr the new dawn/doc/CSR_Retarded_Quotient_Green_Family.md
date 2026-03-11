# CSR Retarded Quotient Green Family

## Purpose

This note records the first retarded quotient or Green operator surrogate built on top of the CSR operator branch.

The machine-readable audit is in `output/audit/csr_retarded_quotient_green_family.json`.

## Family

The branch combines:

- the scalar screened quotient or Green response
- an inward memory term

with

`memory_q(r) = integral_0^r exp(-(r-rp)/ell_ret) J(rp) drp`

and prediction

`v_pred^2 = v_bar^2 + c_h response_hodge + c_m r memory_q`

## Best Family

Best scan member:

- source map: `g_n`
- `ell_ret = 24.0 kpc`
- `c_h = -0.0129`
- `c_m = 0.0325`

## Benchmark

### SPARC

- holdout mean `R^2 = 0.8042 +/- 0.0593`
- full-sample `R^2 = 0.8251`

### Local three-galaxy fallback

- aggregate `R^2 = 0.8688`
- median `R^2 = -2.4103`

### Frozen THINGS/Leroy paired benchmark

- aggregate `R^2 = 0.1182`
- median `R^2 = -1.2401`
- MOND aggregate `R^2 = 0.4123`

## Reading

This is the first branch where retardation changes the shape of the failure.

Compared with the scalar and tensorial static operator branches:

- SPARC holdout is stronger
- paired external median is less bad
- but paired external aggregate drops below the gate

So memory helps structure.

It is not enough to solve the problem.

## Bottom Line

Retardation is not the missing ingredient by itself. It improves the shape of the operator branch but still fails the real paired external aggregate gate.
