# CSR Core Framework Line-By-Line Review

## Purpose

This is a line-by-line scientific review of the imported `CSR_Core_Framework.txt` note from the recent zip bundle.

The purpose is not to defend the note.
It is to mark where the imported wording still overstates what CSR has actually derived.

## Review

### Lines 41-42

Claim: the dark sector of gravity is the decoherence back-action of spacetime's syndrome measurement on baryonic matter, described as friction.

Status: `too strong`.

What is actually proved is narrower:

- the anticommuting bridge gives a real matter dephasing channel
- the Hermitian direct-force route does **not** give a deterministic orbital force
- the surviving macroscopic route is stress, not friction in the simple force-law sense

So these lines should be rewritten as a target interpretation, not as an established galaxy mechanism.

### Lines 61-65

Claim: `a_CSR = g^2 / kappa = g^2 / H(z)` and this is the central claim of CSR.

Status: `not derived`.

The bridge gives a coherence-decay rate.
It does not yet give an astrophysical acceleration scale.

That dimensional map is still open.
So these lines currently state a target, not a result.

### Lines 69-70 and 75-77

Claim: CSR currently scores `R^2 = 0.824` on SPARC.

Status: `needs splitting`.

That `0.824` result belongs to the legacy MSQECC-style phenomenology.
It is not the score of the first explicit semiclassical CSR candidate law.

The first explicit semiclassical candidate law currently benchmarks at:

- SPARC holdout `R^2 = 0.7145 +/- 0.0571`
- full-sample SPARC `R^2 = 0.7116`

So the imported text merges legacy phenomenology with current CSR derivation work.
That should be separated.

### Lines 107-108

Claim: the two-qubit result must survive in full `T^3` and has not yet been verified.

Status: `stale`.

That was true earlier.
It is no longer the current state.

The local cubic extension now exists and gives a geometry-renormalized rate:

- `d rho_m / dt = (g^2 / (4 kappa)) D[sigma_z](rho_m)`
- `Gamma_full = g^2 / (2 kappa)`

So the correct statement now is not “unverified.”
It is “verified locally, but not yet lifted to a macroscopic galaxy derivation.”

### Lines 114-115

Claim: the next calculation is the Caldeira-Leggett passage from the Lindblad equation to a force law via `sigma_z -> delta(r)`.

Status: `partly obsolete`.

This step was the right bottleneck when the note was written.
But the direct-force route has since been pressure-tested.

Current state:

- Hermitian bridge to deterministic force: `no-go`
- Hermitian bridge to momentum diffusion/stress source: `alive`

So the next derivation target is no longer a direct force extraction.
It is the closure relation that turns the stress source into `Pi_rr(r)` or `sigma_r^2(r)` in a stationary galaxy model.

### Lines 122-124 and 129-130

Claim: the external benchmark target is THINGS or LITTLE THINGS.

Status: `directionally right, operationally incomplete`.

That remains the right external direction.
But the downloaded article supplements do not yet provide machine-readable per-radius baryonic decomposition tables.

What the current audit shows is:

- THINGS clean non-SPARC candidate pool from downloaded article table: `6` aliases
- LITTLE THINGS clean non-SPARC candidate pool from downloaded article tables: `23` aliases
- combined clean primary-source candidate pool: `29` aliases

So the benchmark target survives.
But it still requires paired baryonic radial profiles from `S4G` / `GALEX-S4G` and an `M/L` calibration path such as `DiskMass`.

## What The Review Changes

The imported CSR core note is still useful.

But it should now be read as:

- one real bridge derivation
- one verified local lattice renormalization
- one failed direct-force route
- one live stress-route programme
- one external-data target that is larger than the local workspace but still requires a baryonic pipeline

## Bottom Line

The imported note is not wrong in spirit.
It is stale at the exact places where CSR has learned the most.

Those places are now explicit:

- acceleration mapping still open
- full-lattice local bridge no longer open
- direct-force route closed
- stress-closure route now the real galaxy-law bottleneck
