# CSR Primary-Source External Data Audit

## Result

The primary-source THINGS and LITTLE THINGS article tables materially expand the clean non-SPARC candidate pool.

They do **not** by themselves create a machine-readable decomposition-grade benchmark set.

The supporting audit is in [csr_primary_source_external_data_audit.json](output/audit/csr_primary_source_external_data_audit.json).

## Counts From Downloaded Article Tables

### THINGS

Using the downloaded THINGS table in `tmp/aj266574t2_ascii.txt`:

- total sample aliases in the article table: `19`
- SPARC overlaps: `13`
- clean non-SPARC aliases: `6`

Clean THINGS aliases from the local article table:

- `n925`
- `n3031`
- `n3621`
- `n3627`
- `n4736`
- `n4826`

### LITTLE THINGS

Using the downloaded LITTLE THINGS tables in `tmp/aj513259t1_ascii.txt` and `tmp/aj513259t2_ascii.txt`:

- total sample aliases: `26`
- SPARC overlaps: `3`
- clean non-SPARC aliases: `23`

The clean LITTLE THINGS alias list is now recorded in the JSON audit.

### Combined Candidate Pool

Across the two primary-source article supplements:

- unique clean non-SPARC candidate aliases: `29`

That is the real immediate expansion path for the external programme.

## What The Downloaded Tables Actually Contain

### THINGS article table

The local downloaded ASCII table is a tilted-ring/sample summary table.

It does **not** contain per-radius gas and stellar decomposition columns in the downloaded article supplement.

### LITTLE THINGS article tables

The local downloaded ASCII tables contain:

- sample/tilted-ring parameters
- galaxy-level mass-model summary values, including gas and stellar masses

They do **not** contain per-radius gas-plus-stellar decomposition columns in the downloaded article supplement.

So both surveys are real external rotation-curve candidate pools, but not ready-made clause-3 baryonic benchmark tables in the form currently downloaded.

## What This Means For The Real Mission

The dataset bottleneck is narrower than it first looked.

The problem is no longer “find more galaxies.”

The problem is:

- keep rotation curves from THINGS and LITTLE THINGS
- pair them with radial stellar profiles from `S4G` or `GALEX/S4G`
- anchor `M/L` with `DiskMass` or comparable calibration
- only after that move to larger-scale catalogues like `Persic-Salucci`, `WHISP`, or `LVHIS`

So the next acquisition path is not random dataset hunting. It is a specific pipeline build.

## Bottom Line

Primary-source THINGS and LITTLE THINGS data already show that the clean non-SPARC candidate pool is large enough to matter.

What is still missing is not more names.

What is missing is a paired baryonic radial-profile pipeline that turns those surveys into a real decomposition-grade benchmark set.
