# Route B Derivation: Acoustic Phonon Bath => J(ω) ∝ ω^3

Status: derived explicitly. No new physics inserted.
March 2026.

## Setup
Bath Hamiltonian (3D acoustic phonons):
- H_bath = sum_k ħ ω_k b_k^† b_k
- dispersion: ω_k = c_s |k|

System-bath coupling (derivative-like):
- H_int = φ * sum_k g_k (b_k + b_k^†)
- choose g_k = λ |k|^{3/2}

Goal: compute spectral density
- J(ω) = π * sum_k g_k^2 δ(ω - ω_k)

Continuum limit:
- sum_k → V ∫ d^3k/(2π)^3

## Derivation
J(ω) = π V ∫ d^3k/(2π)^3 * (λ^2 |k|^3) δ(ω - c_s |k|)

Use spherical k:
- d^3k = 4π k^2 dk
- δ(ω - c_s k) = (1/c_s) δ(k - ω/c_s)

Therefore:
J(ω) = π V * (4π/(2π)^3) * λ^2 ∫ dk k^5 * (1/c_s) δ(k - ω/c_s)

Evaluate:
J(ω) = π V * (4π/(2π)^3) * λ^2 * (1/c_s) * (ω/c_s)^5

Simplify prefactor:
(4π)/(2π)^3 = 4π / (8π^3) = 1/(2π^2)

So:
J(ω) = π V * (1/(2π^2)) * λ^2 * ω^5 / c_s^6
     = (V λ^2 / (2π)) * ω^5 / c_s^6

This is **super-ohmic of order s=5**, not s=3.

## Implication
Derivative coupling g_k ∝ |k|^{3/2} with linear phonons yields J(ω) ∝ ω^5, not ω^3.

To obtain J(ω) ∝ ω^3 with linear phonons, we require:
- g_k ∝ |k|^{1/2}

Then g_k^2 ∝ k, and:
J(ω) ∝ ∫ k^3 δ(ω - c_s k) dk ∝ ω^3

So the **minimal condition** for s=3 is:
- dispersion: ω_k = c_s |k|
- coupling: g_k ∝ |k|^{1/2}

## Clean formula for s=3 coupling
Let g_k = λ |k|^{1/2}
Then:
J(ω) = (V λ^2 / (2π)) * ω^3 / c_s^4

## Cutoff scale
Introduce ω_c via lattice spacing a or bath bandwidth:
- ω_c ~ c_s / a
Then the coefficient sets the effective kernel strength and the implied a0 scale.

## Bottom line
- Acoustic phonon bath can give s=3 **only** with g_k ∝ |k|^{1/2} coupling.
- The previously suggested g_k ∝ |k|^{3/2} overshoots to s=5.
- The route remains viable but requires a specific derivative coupling form and a physical origin for it.

## Update (direct clarification)
The required g_k ∝ |k|^{1/2} coupling arises naturally from **3D deformation-potential coupling**:
H_int = D ∫ φ(x) (∇ · u(x)) d^3x, with u_k ∝ 1/√ω_k and ∇·u → |k| u_k, giving |k|^{1/2}.

However, this bath yields a **temporal** |ω|^3 kernel. A spatial |p|^3 operator requires
emergent Lorentz scaling (ω ∼ c_eff |p|) or a nonlocal spatial coupling that already inserts |p|^{3/2} per vertex.

The cutoff scale ω_c ∼ c_s / a implies a0_B ∼ c_s / a^2, which is microscopic for condensed-matter a.
A cosmological-scale cutoff would be required to reach a0 ~ 10^-10 m/s^2.

Full continuation: CSR_Bath_Route_Derivation_Continuation.md
