# Non-Markovian Bath Route Draft: Microscopic Model + J(ω) Test

Status: draft for explicit derivation. No claims beyond definitions.
March 2026.

## 1. Minimal microscopic bath model
We model the bridge environment as a continuum of harmonic modes coupled to edge operator X_e:

H = H_bridge + sum_k (p_k^2/2m_k + 1/2 m_k ω_k^2 q_k^2) + X_e * sum_k c_k q_k

This yields the standard Caldeira-Leggett influence functional with spectral density:

J(ω) = (π/2) * sum_k (c_k^2 / (m_k ω_k)) δ(ω - ω_k)

## 2. Required spectral behavior (revised)
We need:
- J(ω) ~ ω^3 (super-ohmic, s=3)
- memory time τ >> 1/κ
- a mapping from temporal |ω|^3 to spatial |p|^3 if the goal is a spatial kernel

## 3. Concrete derivation tasks (hard gates)
A. Identify a physical mechanism that gives J(ω) ~ ω^3 with linear dispersion.
   - The minimal condition is g_k ∝ |k|^{1/2} for ω_k = c_s |k|.
   - A physical realization is deformation-potential coupling to longitudinal strain (∇·u).
B. Compute the influence functional and show whether the kernel is temporal only or also spatial.
   - |ω|^3 by itself is temporal; spatial |p|^3 requires emergent Lorentz scaling or a nonlocal spatial coupling.
C. Verify the cutoff scale can yield a0 without tuning.
   - For ω_c ~ c_s/a, a0_B ~ c_s / a^2 is microscopic unless a is cosmological.
D. Verify lattice spacing does not regularize the non-analyticity away.

## 4. Immediate next calculation (minimal)
- Propose a specific bath coupling form and compute J(ω) explicitly.
- Confirm whether the resulting kernel is temporal or spatial in the observable map.

## Output if successful
- Derived non-analytic |p|^3 kernel via super-ohmic bath; Gate 1 PASS.

## If it fails
- Record the bath class and scaling; keep the no-go theorem intact.

## Minimal scaling check (corrected)
For a 3D bosonic bath with linear dispersion ω = c_s k and density of states D(ω) ∝ ω^2:
- Coordinate-like / piezoelectric-style coupling (g_k ∝ 1/√k) → J(ω) ∝ ω^1 (ohmic).
- Deformation-potential / divergence coupling (g_k ∝ √k) → J(ω) ∝ ω^3 (super-ohmic, s=3).
- Stronger derivative coupling (g_k ∝ k^{3/2}) → J(ω) ∝ ω^5 (s=5).

This shows s=3 is possible in principle, but only with the specific √k coupling.

## Scaling check output (mechanical)
Dimensional test confirms expected slopes when the correct exponent is used.
Machine output: output/audit/csr_bath_spectral_density_check.json.

## Closure (March 2026)
Gate A passes only in the narrow sense that J(ω) ∼ ω^3 is achievable with g_k ∝ |k|^{1/2}
(deformation-potential coupling). The route fails on structure and scale:
- The bath yields a temporal |ω|^3 kernel; spatial |p|^3 requires emergent Lorentz scaling, not present.
- De Sitter vacuum gives ohmic scaling (J(ω) ∼ ω^1), not s=3.
- The stochastic-gravity noise kernel does not generate a nonanalytic spatial |p|^3 term in the Newtonian limit.
- Cutoff scale a0_B ∼ c_s / a^2 is microscopic unless a is cosmological.
Route B is closed.
