# Route B Continuation: Physical Origin, Mapping, and Cutoff

Status: analytical continuation. March 2026.
This updates CSR_Bath_Route_Derivation.md with the direct clarification and fixes.

---

## 0) Spectral density exponent check (explicit)

With linear acoustic phonons (3D):
- dispersion: ω_k = c_s |k|
- coupling: g_k ∝ |k|^{1/2}

Then:

J(ω) = π Σ_k g_k^2 δ(ω - ω_k)
     = π * V ∫ d^3k/(2π)^3 * (λ^2 |k|) δ(ω - c_s |k|)
     = (V λ^2 / (2π)) * ω^3 / c_s^4

Normalization depends on conventions; the key result is the scaling:

J(ω) ∝ ω^3

This confirms that g_k ∝ |k|^{1/2} is the minimal condition for s = 3 with linear phonons.

---

## 1) Physical origin of g_k ∝ |k|^{1/2}

This coupling is standard in 3D acoustic deformation potential coupling.

For a scalar field φ coupled to the local volume change (longitudinal strain):

H_int = D ∫ φ(x) (∇ · u(x)) d^3x

where u is the displacement field and D is the deformation potential.

Mode normalization gives u_k ∝ 1/√ω_k ∝ 1/√|k|, and the divergence contributes a factor |k|,
so the effective coupling scales as:

|k| / √|k| = |k|^{1/2}

This is the correct and physically common realization of the required exponent.

Note: piezoelectric coupling gives g_k ∝ 1/√|k| and yields s = 1 (ohmic), so it does not work here.

---

## 2) Temporal |ω|^3 vs spatial |p|^3 mapping

A Caldeira-Leggett bath with J(ω) ∝ ω^3 produces a nonlocal kernel in time:

S_IF[φ] ∼ ∫ dt dt' φ(t) K(t - t') φ(t')

with K(τ) ∼ |τ|^{-4}, giving |ω|^3 in frequency space.

This is a temporal nonlocality. It does not by itself generate a spatial |p|^3 operator.

To obtain spatial |p|^3, one would need one of the following:

1) Emergent Lorentz invariance at low energy so that ω ∼ c_eff |p|, mapping |ω|^3 → |p|^3.
2) A spatially extended coupling with nonlocal spatial structure that already contains |p|^{3/2} per vertex.
3) A specific critical-point dynamics where time and space scale identically.

Absent one of these, Route B yields temporal |ω|^3 only.

---

## 3) Cutoff ω_c and implied a0 scale

With ω_c set by the bath bandwidth (ω_c ∼ c_s / a), the induced scale is highly sensitive to the UV cutoff.
A common dimensional estimate for the bath-induced acceleration scale is:

   a0_B ∼ ω_c^2 / c_s = c_s / a^2

For condensed-matter parameters (c_s ~ 5 x 10^3 m/s, a ~ 3 x 10^-10 m):

   a0_B ~ 5 x 10^22 m/s^2

This is 30+ orders of magnitude above the MOND scale.

To obtain a0_B ~ 10^-10 m/s^2, one needs:

   a ~ sqrt(c_s / a0) ~ 10^6 to 10^7 m (thousands of km)

Such a bath is not a condensed-matter system. It would have to be a cosmological-scale medium.

---

## Bottom line (Route B, fully pushed)

Route B is only conditionally viable. The hard gates are now explicit:

1) g_k ∝ |k|^{1/2} must arise from a real microscopic coupling (deformation potential is viable).
2) The |ω|^3 kernel must be mapped to spatial |p|^3 by emergent Lorentz scaling or equivalent dynamics.
3) The UV cutoff must be cosmological in scale to yield a0 ~ 10^-10 m/s^2 without tuning.

At present, Route B provides a clean mechanism for temporal |ω|^3,
but does not yet yield the required spatial |p|^3 at the correct scale.
