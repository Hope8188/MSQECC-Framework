# Codex Local Efficiency Playbook

## Goal
Keep this machine quieter and reduce wasted reruns without overstating what the measurements prove.

## Current Local Constraints
- This workspace should run from one Python environment where possible.
- Heavy numerical scripts should default to single-thread BLAS caps unless a test explicitly needs more parallelism.
- Export generation should remain separate from numerical reruns.
- Branches that fail the triple test or the branch-admission gate should not be promoted to heavier external benchmarking.

## Runtime Defaults
Set these before heavy numerical runs when they are not already present:
- `OMP_NUM_THREADS=1`
- `OPENBLAS_NUM_THREADS=1`
- `MKL_NUM_THREADS=1`
- `NUMEXPR_NUM_THREADS=1`

The current CSR suites already apply these caps.

## Execution Modes
Heavy verification runners should keep two modes:
- `quick`: for local iteration and gating
- `full`: for presentation-grade reruns

Use `quick` until a branch survives the early gate.
Use `full` only for branches that are still live after structural screening.

## Caching and Reuse
Prefer cached or persisted artifacts for:
- SPARC-derived transforms
- THINGS/Leroy alias maps
- direct-gate residual tables
- external benchmark summary JSON

Do not recompute expensive intermediate tables if the branch has already failed a higher-priority gate.

## Quiet-Mode Workflow
For day-to-day development on this machine:
1. run triple-test or branch-admission checks first
2. run direct observed gate second
3. run heavier external or export steps last
4. keep export generation detached from numerical reruns

## Telemetry Path That Actually Works
The environment still has no stable power-telemetry path, but user-space telemetry is now partially available.

Working local probes:
- `Get-Counter '\Processor Information(_Total)\% Processor Utility'`
- `Get-Counter '\Processor Information(_Total)\Processor Frequency'`
- `Get-Counter '\Thermal Zone Information(*)\Temperature'`
- Win32 `GetProcessMemoryInfo` for working-set and private-usage counters

This means the suite can now measure:
- processor utility
- processor frequency
- thermal-zone telemetry
- process working set / peak working set / private usage

It still cannot support:
- power-draw claims
- battery-drain claims
- “heat proves physics” claims

## Current Engineering Read
Under the measured local suite:
- no workload currently shows a verified wall-time gain with non-overlapping confidence intervals
- no workload currently shows a verified thermal reduction under the suite rule
- telemetry is useful for honest local engineering reporting, not for scientific proof

## Practical Rule
If a proposed optimization does not improve:
- wall time,
- jitter,
- or measured process/thermal behavior

under repeated runs, it should not be promoted as a machine-efficiency gain.

## Bottom Line
The right local strategy is:
- gate early,
- rerun less,
- keep thread caps on by default,
- measure user-space telemetry honestly,
- and keep all physics claims separate from machine-performance claims.
