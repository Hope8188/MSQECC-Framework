# CSR Evidence Pack

## Lay Summary
### What CSR is
CSR is a research program trying to derive galaxy-scale gravity behavior from a more fundamental operator-and-measure structure rather than fitting galaxy curves directly.

### What is actually proved
- there is an internally established bridge result,
- there is an internally established lattice renormalization result on the `T^3` backbone,
- the current best template can reproduce the right low-acceleration scaling pattern structurally,
- the theorem-level target for any real derivation is explicit: the deep-IR action must land on the equivalent of `q = 3` scaling.

### What is not proved
- no fully derived CSR galaxy law exists,
- no model is scientifically live under the current strict suite,
- no hardware result shows a lab-scale CSR emergent galaxy analogue,
- no commercial claim is evidence-backed beyond local machine telemetry and runtime measurements.

### What the current best result means
The current best branch is still the scale-invariant template. Under the upgraded strict suite:
- direct observed main-gate aggregate `R^2 = 0.8776`
- direct observed main-gate median `R^2 = 0.6709`
- beats baryons on `2/3` galaxies
- mean residual lag-1 autocorrelation `0.8273`
- the ablated branch is essentially identical on the same gate

The first derivation-first attempt was not merely incomplete. It was actively wrong at the galaxy level:
- direct observed aggregate `R^2 = 0.8209`
- direct observed median `R^2 = -6.2341`

That means the first derivation attempt fit most galaxies worse than a horizontal-line baseline.
So the template is a useful envelope for what a derived law must resemble. It is not yet the theory.

## Scientific Summary
### Strict Gate
A model is only treated as scientifically live if it:
1. passes the triple test structurally,
2. beats baryons-only clearly on the direct observed external gate,
3. survives shuffled/null controls,
4. is stable across repeated runs,
5. clears per-galaxy shape diagnostics,
6. beats MOND on the same gate if superiority is claimed.

### Current Main Gate
The main external gate is the direct observed 3-galaxy set:
- aliases: `m33`, `n1560`, `n5533`
- source: local direct observed curves with baryonic decomposition from `galaxy_massmodels.dat`

This gate is honest but still too small for beyond-reasonable-doubt validation.
It is a falsification gate first.

### Current Branch Status
- `MOND`: structurally passes, direct observed aggregate `R^2 = 0.8618`, median `R^2 = 0.7552`, beats baryons on `2/3` galaxies, mean lag-1 residual autocorrelation `0.8192`, still not promoted to live under the current CI rule
- `scale_invariant_template`: structurally passes, direct observed aggregate `R^2 = 0.8776`, median `R^2 = 0.6709`, mean lag-1 residual autocorrelation `0.8273`, but remains ablation-equivalent and therefore non-derived
- `constraint_derived_root_law`: first derivation-first closure attempt, direct observed aggregate `R^2 = 0.8209`, median `R^2 = -6.2341`, mean lag-1 residual autocorrelation `0.8891`, not promoted because deriving only the closure is not enough and the branch is worse than MOND on current shape metrics
- `weighted_hodge`, `tensorial_hodge`, `retarded_hodge`: some high aggregates, but still structurally wrong or catastrophically unstable at the per-galaxy level

The direct MOND comparison should be stated plainly:
- on median per-galaxy performance, the best CSR template is currently worse than MOND
- on current radial shape metrics, no CSR branch materially outperforms MOND

### Why ablation-equivalence matters
The scale-invariant template is marked non-derived because its ablated version performs essentially the same. That means the supposedly CSR-specific terms are not contributing anything the simpler version does not already provide.

### Exact Current Bottleneck
The missing objects are explicit:
- a derived quotient normalization,
- a derived transition scale,
- and a theorem-level fixed-point result forcing the deep-IR equivalent of `q = 3`.

### What the new viability audit adds
The `q = 3` target is still not derived from the local `T^3` backbone.

The core `T^3` derivation layer currently shows:
- bridge structure
- full-lattice renormalization geometry
- open-systems reduction

It does not yet show:
- a fixed-point theorem forcing `q = 3`
- an anomalous dimension or beta-function that outputs the deep-IR exponent
- a derived transition scale

### What the new shape diagnostics add
The direct gate now checks whether high scores still hide structured residuals.

Current result:
- no contender leaves residuals that look close to white noise
- the residuals remain low-frequency and serially correlated
- this means the present best branches still match envelope behavior better than radial shape behavior

Visuals generated locally:
- `output/audit/csr_direct_gate_residuals_by_galaxy.svg`
- `output/audit/csr_direct_gate_shape_metrics.svg`

### What the branch-admission gate changes
Future branches are blocked unless they derive:
- transition scale
- quotient normalization
- low-acceleration bend

That removes the old blind-branch-search loophole.

### Sensitivity warning
On the broader THINGS/Leroy 9-galaxy sensitivity set, the current best envelope degrades sharply:
- `scale_invariant_template` aggregate drops from `0.8776` to `0.4170`
- `constraint_derived_root_law` aggregate drops from `0.8209` to `0.1047`

So the current best direct-gate result should not be read as a generalization result.

### Observed-Gate Expansion Status
The local workspace cannot honestly expand the direct observed decomposition-grade main gate beyond three galaxies.
THINGS and LITTLE THINGS expand the clean candidate pool to `29` aliases locally, but the article tables do not provide the paired per-radius baryonic decomposition needed for a larger clean main gate.

## Industry Summary
### What is actually measured on this machine
The local engineering suite now measures:
- wall-clock time
- process CPU time
- peak Python memory
- OS working set / peak working set / private usage
- processor utility
- processor frequency
- thermal-zone telemetry
- thread-count estimate
- run-to-run jitter
- user-space power telemetry when the host exposes nonzero counters

### What is not claimed
- no verified heat reduction claim as physics evidence
- no verified power reduction claim
- no HFT, MedTech, or energy-saving claim is supported by current measurements

### Current local result
- thread caps are active in the new suite
- processor, thermal, and process-memory telemetry are available from user space
- no workload shows a verified wall-time gain with non-overlapping confidence intervals
- no workload shows a verified thermal reduction under the suite rule
- user-space power telemetry is now measurable on this host via `Energy Meter`, but no verified energy-efficiency gain has been established

## VC Summary
### What is evidence-backed
- the program now has a strict falsification workflow,
- a reproducible reality suite,
- a hostile external-review packet,
- a direct observed main gate,
- a shape-diagnostics layer,
- a hard branch-admission policy,
- a telemetry-aware local efficiency suite,
- and a sharply defined theorem-level bottleneck.

This infrastructure exists to ensure that if the fixed-point derivation succeeds, its validity can be verified independently and immediately, and if it fails, the failure is unambiguous.

### What is not evidence-backed
- revenue projections
- valuation claims
- monopoly or platform claims
- claims of a finished theory

### Evidence-based opportunity framing
If CSR becomes real, the first fundable milestone is not a platform story. It is one narrow technical result:
- a typed derivation that produces the correct deep-IR scaling target,
- derives the transition scale,
- derives the quotient normalization,
- and beats the direct observed gate while surviving null, ablation, and shape controls.

That is the only evidence-based frontier worth presenting as a serious technical opportunity today.
