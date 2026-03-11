# White Whale Plan B: Non-Markovian Bath (J(omega) ~ omega^3)

Goal: derive a super-ohmic bath with spectral density J(omega) ~ omega^3 that yields |p|^3 in the IR.
Status: plan only. No new physics inserted.
March 2026.

## Why this route is viable
- The no-go theorem assumes Markovian Lindblad (white noise, s=0).
- A super-ohmic bath (s=3) produces non-analytic temporal kernels and is physically realizable.

## Assumption audit (must be verified before any claim)
A1. The bridge environment can be modeled by a Caldeira-Leggett bath with tunable spectral density.
- Verified: NO.
A2. The physical system admits an s=3 bath at relevant scales.
- Minimal condition: g_k ∝ |k|^{1/2} with linear dispersion (ω = c_s |k|).
- Physical realization: deformation-potential coupling to longitudinal strain (∇·u).
- Verified: NO.
A3. The bath memory time tau satisfies tau >> 1/kappa (non-Markovian regime).
- Verified: NO.
A4. The temporal |ω|^3 kernel can be mapped to spatial |p|^3.
- Requires emergent Lorentz scaling or a nonlocal spatial coupling.
- Verified: NO.
A5. The cutoff scale can yield a0 without tuning.
- For ω_c ~ c_s/a, a0_B ~ c_s/a^2 is microscopic unless a is cosmological.
- Verified: NO.

## Required derivations (hard gates)
1. **Derive the bath spectral density**
   - Identify the physical degrees of freedom that couple to the bridge.
   - Compute J(omega) from the microscopic coupling.
   - Gate A: show J(omega) ~ omega^3 over the IR band of interest.

2. **Compute the influence functional**
   - Use the Caldeira-Leggett formalism to derive the nonlocal kernel.
   - Gate B: determine whether the kernel is temporal only or yields spatial |p|^3.

3. **Match to the observable map**
   - Show that the derived kernel acts on the same phi(x) defined in the core map.
   - Gate C: kernel survives the bridge-to-phi reduction without insertion.

4. **Check consistency with T3 geometry**
   - Verify that lattice spacing and finite range do not regularize away the non-analyticity.
   - Gate D: |p|^3 survives coarse-graining.

5. **Scale check**
   - Gate E: the UV cutoff and coupling produce a0 ~ 10^-10 m/s^2 without tuning.

## Outputs if successful
- A derived non-analytic kernel from a non-Markovian bath.
- Gate 1 PASS without insertion.
- Permission to attempt the fixed-point computation.

## If any gate fails
- Record as a closed loophole and keep the no-go theorem intact.

## Immediate next work (if you want me to proceed)
- Draft a microscopic bath model compatible with the stabilizer monitor.
- Compute J(omega) for that model with g_k ∝ |k|^{1/2}.
- Determine whether the kernel is temporal-only or maps to spatial |p|^3.
