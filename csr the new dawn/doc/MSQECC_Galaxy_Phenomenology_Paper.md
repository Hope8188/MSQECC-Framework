# MSQECC Galaxy Phenomenology Under Positivity and External Validation

## Abstract

The MSQECC galaxy ansatz remains empirically nontrivial on the SPARC sample, but its physical and external status is narrower than earlier versions of the programme claimed. Repeated SPARC holdout testing gives `R^2 = 0.8159 +/- 0.0377` for the optimized global ansatz and `R^2 = 0.8240 +/- 0.0338` for the morphology-aware three-bin extension, both clearly above baryons-only baselines and below MOND. However, the fitted extra term implies negative effective dark density in much of the SPARC sample, and the exact positivity constraint on the model shows that no single positive-`C` global value of `k` can make the effective density nonnegative across all 171 galaxies. A non-SPARC external benchmark on 47 galaxies from an independent mass-model file gives positive aggregate pointwise `R^2 = 0.6819` for the frozen SPARC-trained model, but MOND remains stronger at `0.8482`, and the median per-galaxy `R^2` remains negative. The correct interpretation is therefore a constrained phenomenology result, not a validated physical law.

## 1. Model

The ansatz uses

`u(r) = v_star^2(r) + k v_gas^2(r)`

and

`v_pred^2(r) = u(r) + C r [u(r) + r u'(r)]`

with global parameters `(k,C)` fitted once on SPARC.

## 2. SPARC Performance

On 171 usable SPARC galaxies:

- optimized MSQECC: `R^2 = 0.8159 +/- 0.0377`
- fixed `k = 3*pi`: `R^2 = 0.8179 +/- 0.0390`
- morphology-aware three-bin MSQECC: `R^2 = 0.8240 +/- 0.0338`
- MOND: `R^2 = 0.9299 +/- 0.0133`
- baryons-only: `R^2 = 0.5469 +/- 0.1117`

Morphology reduces the `C`-mass correlation from `r = 0.292` to `0.086` in the three-bin conditioning and to `0.026` at exact T-type conditioning.

## 3. Physical Consistency

The extra term can be embedded in a static radial potential, since

`d/dr [C r u(r)] = C [u + r u']`

But under the standard spherical effective-density interpretation the implied density is

`rho_dm(r) = C/(4*pi*G) [2u/r + 4u' + r u'']`

This produces the exact positivity condition

`A(r) + k B(r) >= 0` for all radii when `C > 0`

with

- `A(r) = 2s/r + 4s' + r s''`
- `B(r) = 2g/r + 4g' + r g''`
- `s = v_star^2`
- `g = v_gas^2`

At the fitted SPARC parameters:

- negative `v_dm^2` appears in `66/171` galaxies
- negative `rho_dm` appears in `123/171` galaxies
- only `55/171` galaxies admit any positive-`C` feasible interval in `k`
- the global positive-density interval is empty

So the current global ansatz cannot be interpreted as a literal everywhere-positive dark component without reformulation.

## 4. External Benchmark

A non-SPARC benchmark was built from the independent mass-model file `galaxy_massmodels.dat` after removing exact-name overlaps with SPARC and requiring at least five radial points per galaxy. This yields 47 galaxies.

Using the frozen SPARC-trained model:

Aggregate pointwise `R^2`:

- MSQECC: `0.6819`
- MOND: `0.8482`
- baryons-only: `-0.1808`

Per-galaxy median `R^2`:

- MSQECC: `-7.2578`
- MOND: `-3.3669`
- baryons-only: `-39.8371`

Counts:

- MSQECC positive on `9/47` galaxies
- MSQECC beats baryons-only on `44/47`
- MSQECC beats MOND on `10/47`

This external result is mixed: positive in the aggregate, but not robust per galaxy and still weaker than MOND.

## 5. Conclusion

The galaxy programme survives as phenomenology.

It does not yet survive as a physically admissible and externally validated law.

The next empirical step is not a new fit. It is a positivity-enforced reformulation followed by a rerun on the external non-SPARC benchmark.
