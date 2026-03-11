# CSR Direct Gate Shape Diagnostics

## Purpose
This audit tests whether high aggregate fit scores are hiding structured radial failure on the direct observed main gate.

## Dataset
The direct observed main gate is:
- `m33`
- `n1560`
- `n5533`

The diagnostics compare:
- `baryons_only`
- `mond`
- `scale_invariant_template`
- `retarded_hodge`
- `constraint_derived_root_law`

## Metrics
Per galaxy and per model, the audit records:
- `R^2`
- lag-1 residual autocorrelation
- residual PSD slope
- low-frequency power fraction

These diagnostics test whether residuals look approximately white or remain serially and spectrally structured.

## Main Result
No contender leaves white-noise-like residuals on the current direct observed gate.

Examples:
- `scale_invariant_template`
  - mean lag-1 residual autocorrelation `0.8273`
  - median lag-1 residual autocorrelation `0.8953`
- `constraint_derived_root_law`
  - mean lag-1 residual autocorrelation `0.8891`
  - median lag-1 residual autocorrelation `0.9781`

That means high aggregate `R^2` is still hiding the wrong radial functional form.

## Per-Galaxy Reading
### M33
- `scale_invariant_template`: `R^2 = -0.4567`, lag-1 autocorrelation `0.9507`
- `constraint_derived_root_law`: `R^2 = 0.7154`, lag-1 autocorrelation `0.9781`

### N1560
- `scale_invariant_template`: `R^2 = 0.8740`, lag-1 autocorrelation `0.8953`
- `constraint_derived_root_law`: `R^2 = -7.0161`, lag-1 autocorrelation `0.9827`

### N5533
- `scale_invariant_template`: `R^2 = 0.6709`, lag-1 autocorrelation `0.6358`
- `constraint_derived_root_law`: `R^2 = -6.2341`, lag-1 autocorrelation `0.7064`

## Visual Outputs
The audit now writes two local visuals:
- `output/audit/csr_direct_gate_residuals_by_galaxy.svg`
- `output/audit/csr_direct_gate_shape_metrics.svg`

These make the same point visually:
- aggregate score can look good,
- while residuals remain serially correlated and low-frequency dominated.

## Data Outputs
- JSON summary: `output/audit/csr_direct_gate_shape_diagnostics.json`
- residual table: `output/audit/csr_direct_gate_residuals.csv`

## Bottom Line
The shape problem is still open.
Current CSR branches match envelope behavior better than galaxy-by-galaxy radial structure.
That is why no branch is promoted even when its aggregate score looks strong.
