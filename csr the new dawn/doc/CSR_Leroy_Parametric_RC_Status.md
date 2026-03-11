# CSR Leroy Parametric RC Status

## Purpose

This note freezes the status of the THINGS/Leroy external data branch after the exact RC parameterization has been fixed.

The machine-readable audit is in `output/audit/csr_leroy_parametric_rc_status.json`.

## Frozen Target List

The current non-SPARC THINGS/Leroy target set is:

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

## Frozen RC Form

The exact published parametric form used for this branch is:

`v_rot(r) = v_flat * (1 - exp(-r / l_flat))`

Parameters come from Leroy 2008 `table4.dat`.

## Current Coverage

### Radial baryonic profiles

All `11/11` targets have radial baryonic-profile coverage in the Leroy companion tables.

### Parametric rotation-curve handles

`9/11` targets have usable local `v_flat` and `l_flat` values.

Available now:

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

## What This Means

The THINGS/Leroy branch is no longer waiting on a fit-form decision.

The remaining work is only:

- recover the last two local handles if possible
- keep the benchmark fixed on this list
- use this as the real paired non-SPARC test for future operator branches

## Bottom Line

The external-data branch is now materially cleaner than before. The benchmark target list and the exact RC form are frozen.
