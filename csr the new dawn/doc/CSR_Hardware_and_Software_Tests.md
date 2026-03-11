# CSR Hardware and Software Tests

## Purpose
This document separates two questions:
- `Software tests` ask whether a CSR branch is scientifically live.
- `Hardware tests` ask whether local workloads run more efficiently on this machine.

Those are different claims.

## Software Tests
### Gate Definition
A model is only treated as scientifically live if it:
1. passes the triple test structurally,
2. beats baryons-only clearly on the direct observed external gate,
3. survives shuffled/null controls,
4. is stable across repeated runs,
5. clears per-galaxy shape diagnostics,
6. beats MOND on the same gate if superiority is claimed.

### Main External Gate
The main external gate is the direct observed 3-galaxy set:
- `m33`
- `n1560`
- `n5533`

This is the honest local decomposition-grade gate.
The parametric 9/11 Leroy sets remain sensitivity-only.

### Null-Control Definition
`Shuffled-radius null` means the observed radial samples are randomly reassigned within each galaxy before scoring, so any model that only exploits smooth radius ordering should still score well while a physically informative law should degrade.

### Why Each Branch Was Tried
- `weighted_hodge`: first quotient/Green surrogate built to test whether a simple projected response operator could outperform local closures.
- `tensorial_hodge`: same quotient/Green idea, but with disk-geometry and anisotropy corrections added to see whether scalar reduction was the problem.
- `retarded_hodge`: memory and retardation test, motivated by the possibility that the missing physics was delayed response rather than static closure.
- `scale_invariant_template`: empirical envelope only, used to encode the observed low-acceleration bend that any real derivation must eventually reproduce.
- `constraint_derived_root_law`: first derivation-first closure attempt, intended to generate the bend from the closure itself instead of importing a MOND-shaped template.

### Current Scientific Record
- `baryons_only`
  - fails structural gate
  - direct observed aggregate `R^2 = 0.4628`
- `MOND`
  - passes structural gate
  - direct observed aggregate `R^2 = 0.8618`
  - direct observed median `R^2 = 0.7552`
  - beats baryons on `2/3` galaxies
  - mean residual lag-1 autocorrelation `0.8192`
  - not promoted to live under the current evidence-over-baryons rule
- `weighted_hodge`
  - fails structural gate
  - direct observed aggregate `R^2 = 0.7550`
  - median `R^2 = -7.9332`
- `tensorial_hodge`
  - fails structural gate
  - direct observed aggregate `R^2 = 0.7584`
  - median `R^2 = -7.6748`
- `retarded_hodge`
  - fails structural gate
  - direct observed aggregate `R^2 = 0.8688`
  - median `R^2 = -2.4103`
  - this is not a borderline miss; it means the functional form is catastrophically wrong on individual galaxies even when aggregate score looks competitive
- `scale_invariant_template`
  - passes structural gate
  - direct observed aggregate `R^2 = 0.8776`
  - direct observed median `R^2 = 0.6709`
  - ablated main-gate aggregate `R^2 = 0.8786`
  - beats baryons on `2/3` galaxies
  - mean residual lag-1 autocorrelation `0.8273`
  - survives shuffled-radius null controls on the direct gate
  - still not accepted as a live derivation because the ablated version performs identically and the CSR-specific terms are not doing visible work
- `constraint_derived_root_law`
  - first derivation-first closure attempt
  - direct observed aggregate `R^2 = 0.8209`
  - direct observed median `R^2 = -6.2341`
  - beats baryons on `3/3` galaxies
  - mean residual lag-1 autocorrelation `0.8891`
  - fails the structural gate

### MOND Comparison
No current CSR branch materially outperforms MOND on this gate.

The key shape result is explicit:
- `MOND` mean lag-1 residual autocorrelation: `0.8192`
- `scale_invariant_template`: `0.8273`
- `constraint_derived_root_law`: `0.8891`

So on radial shape, the current CSR branches are indistinguishable from MOND at best and worse in the derivation-first case.

### Sensitivity Collapse
The broader THINGS/Leroy sensitivity set is a warning, not a validation:
- `scale_invariant_template` drops from direct-gate aggregate `0.8776` to 9-gal sensitivity aggregate `0.4170`
- `constraint_derived_root_law` drops from direct-gate aggregate `0.8209` to 9-gal sensitivity aggregate `0.1047`

That collapse means the 3-gal gate is useful for falsification but not enough for any generalizability claim.

### Fixed-Point Target
The theorem-level target is explicit:
- if the deep-IR action density scales as `L_IR ~ |grad(phi)|^q`, then the unique exponent that gives:
  - RAR slope `0.5`
  - MDAR slope `-0.5`
  - flat asymptotic rotation curves
  - BTFR slope `4`
  is `q = 3`

That is the correct next target for the `T^3` program.
It is not yet derived.

### T3 Viability Check
The current local `T^3` derivation layer does not yet contain a fixed-point, anomalous-dimension, or beta-function result that forces `q = 3`.

So the present record supports:
- bridge result
- lattice renormalization geometry

It does not yet support:
- a derived deep-IR exponent
- a derived transition scale

### Shape Diagnostics
The direct observed gate now includes:
- lag-1 residual autocorrelation
- residual PSD slope
- low-frequency power fraction

No current contender leaves white-noise-like residuals.

Examples:
- `MOND`
  - mean residual lag-1 autocorrelation `0.8192`
  - `shape_pass = false`
- `scale_invariant_template`
  - mean residual lag-1 autocorrelation `0.8273`
  - beats baryons on `2/3` galaxies
  - `shape_pass = false`
- `constraint_derived_root_law`
  - mean residual lag-1 autocorrelation `0.8891`
  - beats baryons on `3/3` galaxies
  - `shape_pass = false`

Generated visuals:
- `output/audit/csr_direct_gate_residuals_by_galaxy.svg`
- `output/audit/csr_direct_gate_shape_metrics.svg`

### Branch Admission Gate
Future branch promotion is frozen by a hard rule:
- derive transition scale,
- derive quotient normalization,
- derive the low-acceleration bend,
- avoid hand-wired interpolation.

Under that gate, every current branch is ineligible for promotion.

### Main External-Gate Limitation
The local workspace cannot honestly expand the direct observed decomposition-grade gate beyond three galaxies.
THINGS and LITTLE THINGS increase the candidate alias pool, but the local article tables do not provide the paired per-radius baryonic decomposition needed for a larger clean observed gate.

### Bottom Line
No branch is scientifically live.

No current CSR branch materially outperforms MOND on this gate, and the derivation-first branch is worse than MOND on all current shape metrics while also failing the structural test.

## Hardware Tests
### Purpose
These are local engineering tests only. They do not prove CSR physics.

### Measured Metrics
- wall-clock time
- process CPU time
- peak Python memory
- OS working set / peak working set / private usage
- processor utility
- processor frequency
- thermal-zone telemetry
- user-space power telemetry when the host exposes it
- thread-count estimate
- jitter

### Sensor Status
- processor counters: `measured`
- thermal zones: `measured`
- process memory: `measured`
- power: `measured` when `Energy Meter` or equivalent counters expose nonzero readings, otherwise `unavailable`

The telemetry path is user-space only:
- `Get-Counter` for processor, thermal, and power counters
- `GetProcessMemoryInfo` for process working-set counters

### Current Result
- thread caps are active in the suite
- no workload shows a verified wall-time gain with non-overlapping confidence intervals
- no workload shows a verified thermal reduction under the suite rule
- user-space power telemetry is now measurable on this host via `Energy Meter`, but no verified energy-efficiency gain has been established
- power telemetry remains a local engineering metric only and does not support any physics claim

### Engineering Reading
The current suite supports narrow local claims only:
- this machine can now measure processor, thermal, process-memory, and user-space power telemetry during CSR workloads when the host exposes them
- those measurements do not currently justify any runtime-efficiency, thermal-efficiency, or energy-efficiency claim
- current power telemetry comes from `Energy Meter` counters and should be treated as a host-specific engineering reading, not a cross-machine benchmark

## Interpretation
The software suite gives the scientific status.
The hardware suite keeps local engineering claims honest.

That separation matters:
- a runtime, thermal, or power change would not prove physics,
- and a physically interesting branch still has to clear the direct observed, null-control, and shape gates.
