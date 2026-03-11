# A0 Redshift Literature Audit

**Date:** March 8, 2026

## Question

Does the published galaxy-dynamics literature currently support the specific law

`a0(z) = c H(z) / 2pi`

in the sense that the MOND/RAR acceleration scale clearly increases with redshift in step with `H(z)`?

## Short Answer

Not yet.

The current literature gives:

- a strong local RAR baseline,
- one new direct RAR study out to `z = 0.08` reporting **tentative** evidence for redshift evolution,
- and indirect higher-redshift Tully-Fisher evidence that galaxy kinematics evolve with cosmic time.

That is enough to say the question is live.
It is not enough to claim that the specific law `a0(z) = c H(z) / 2pi` has been observationally confirmed.

## 1. Local Baseline

The local anchor remains the RAR literature built from nearby rotation-curve samples.

McGaugh, Lelli, and Schombert (2016) established the local radial acceleration relation as a tight empirical law across 153 rotationally supported galaxies. This is the observational baseline from which any redshift evolution must be measured.

## 2. Direct RAR Evidence Beyond The Very Local Universe

The key new paper is:

- Vărăşteanu et al. (2025), `MIGHTEE-HI: the radial acceleration relation with resolved stellar mass measurements`, MNRAS 541, 2366-2392, DOI `10.1093/mnras/staf1079`.

What it contributes:

- a homogeneous H i-selected sample of 19 galaxies,
- direct RAR analysis out to `z = 0.08`,
- and the paper's own conclusion that it finds the **first tentative evidence for redshift evolution in the acceleration scale**.

That is real progress. It is also still tentative by the authors' own wording.

## 3. My Reproducible Low-z Check

A reproducible check is archived in:

- `verification/a0_redshift_literature_check.py`
- `output/audit/a0_redshift_literature_check.json`

Using the published SPARC-scale value `a0 = 1.15e-10 m/s^2`, the MIGHTEE value `a0 = 1.69e-10 m/s^2`, the MIGHTEE linear coefficient `a1 = 4.47e-10 m/s^2`, and a flat low-z cosmology with `Omega_m = 0.3`, `Omega_L = 0.7`, the audit gives:

- `H(z=0.08) / H0 = 1.038`
- predicted ratio from `a0 proportional H(z)`: `1.038`
- observed direct MIGHTEE/SPARC ratio: `1.470`
- predicted low-z linear slope from `a0 proportional H(z)`: `5.175e-11 m/s^2`
- observed MIGHTEE linear slope: `4.47e-10 m/s^2`

Interpretation:

- if the published SPARC and MIGHTEE `a0` values are compared literally, the observed shift is much larger than naive low-redshift `H(z)` scaling predicts,
- so the available direct evidence does **not** yet cleanly validate the specific law `a0(z) = c H(z) / 2pi`.

There are important caveats:

- the SPARC and MIGHTEE samples are not identical,
- the measurement pipelines are not identical,
- and MIGHTEE only reaches `z = 0.08`, where the expected change in `H(z)` is intrinsically small.

So this mismatch is not a falsification of the law. It is a sign that the present data are not yet a clean apples-to-apples test of it.

## 4. Higher-Redshift Evidence

Direct resolved RAR measurements at substantially higher redshift remain sparse.

What does exist is mostly indirect evidence from Tully-Fisher analyses rather than direct RAR fits.

One example is:

- Sharma et al. (2024), A&A, `Tully-Fisher relation of late-type galaxies at 0.6 <= z <= 2.5`.

That study finds subtle deviation of the stellar and baryonic Tully-Fisher relation relative to local samples over `0.6 <= z <= 2.5`.

This matters because it shows galaxy dynamical scaling relations do evolve.

But it is **not** a direct measurement of the MOND/RAR acceleration scale `a0`, so it cannot by itself confirm the specific `a0(z)` law.

## 5. Current Best Scientific Reading

The literature currently supports these statements:

- The local RAR is well established.
- The first direct extension beyond the very local universe now exists and reports tentative redshift evolution.
- Higher-redshift galaxy kinematic relations do evolve in general.
- There is not yet a clean direct observational sequence of `a0` measurements across redshift that would decisively confirm `a0(z) = c H(z) / 2pi`.

## 6. What Would Count As A Clean Test

A cleaner test would require:

- direct resolved RAR measurements in multiple redshift bins,
- matched mass-to-light methodology across bins,
- matched galaxy selection across bins,
- and explicit fitting of `a0(z)` against the predicted `H(z)` scaling.

That test is not in hand yet.

## Constraint Table

A source-backed summary table is archived in:

- `output/audit/a0_redshift_published_constraints.csv`
## Bottom Line

The `a0(z)` prediction is still worth pursuing because the literature is no longer silent: there is now tentative observational evidence that the acceleration scale may evolve.

But the current state of the evidence is:

- suggestive,
- not decisive,
- and not yet a confirmation of the specific formula `a0(z) = c H(z) / 2pi`.

## Sources

- McGaugh, Lelli, Schombert (2016), `Radial Acceleration Relation in Rotationally Supported Galaxies`, Phys. Rev. Lett. 117, 201101. DOI: `10.1103/PhysRevLett.117.201101`.
- Vărăşteanu et al. (2025), `MIGHTEE-HI: the radial acceleration relation with resolved stellar mass measurements`, MNRAS 541, 2366-2392. DOI: `10.1093/mnras/staf1079`.
- Sharma et al. (2024), `Tully-Fisher relation of late-type galaxies at 0.6 <= z <= 2.5`, A&A. Available at the Astronomy & Astrophysics journal site.
- Planck Collaboration (2020), `Planck 2018 results. VI. Cosmological parameters`, A&A 641, A6.

