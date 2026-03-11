# New Bridge Object Route Draft: Triple-CS / Factorized Operator

Status: draft for explicit derivation. No claims beyond definitions.
March 2026.

## 1. Candidate bridge object
Define a factorized fractional operator:

K = (-∂_x^2)^{1/2} (-∂_y^2)^{1/2} (-∂_z^2)^{1/2}

Momentum space:
K(p) = |p_x||p_y||p_z|

This has cubic scaling but is anisotropic.

## 2. Required isotropization mechanism
To match the MOND target, we require either:
- RG flow to isotropic |p|^3 in the IR, or
- a symmetry restoration / averaging mechanism (disorder, dynamical isotropization), or
- a falsifiable anisotropy signature in galaxy data (preferred axes).

## 3. Concrete derivation tasks (hard gates)
A. Provide an explicit action/generator that yields K(p) = |p_x||p_y||p_z|.
   - candidate: triple Chern-Simons coupling on the three T3 cycles.
B. Compute the real-space Green's function and compare to (-∇^2)^{3/2}.
C. Determine whether isotropy is restored or whether anisotropy survives.
D. Connect to the bridge-to-phi observable map without inserting MOND.

## 4. Immediate next calculation (minimal)
- Derive G(x) for K(p) = |p_x||p_y||p_z| and quantify anisotropy.
- If anisotropy is large and no isotropization mechanism exists, this route closes for MOND.

## Output if successful
- New bridge object yields isotropized |p|^3 kernel; Gate 1 PASS.

## If it fails
- Record anisotropy signature and treat as falsifiable constraint.

## Measured anisotropy (supporting check)
The angular ratio |px||py||pz| / |p|^3 has large spread (std ~ 0.0565) and ranges from ~1e-9 to ~0.192.
This confirms strong cubic anisotropy unless an isotropization mechanism exists.
Machine output: output/audit/csr_factorized_operator_anisotropy.json.

## Real-space anisotropy check (finite lattice)
A direct discrete sum for the kernel shows direction-dependent ratios between factorized and isotropic kernels at the same radius.
Example (r = 0.1, N = 10):
- axis ratio ≈ 0.164
- face-diagonal ratio ≈ 0.076
- body-diagonal ratio ≈ 0.048
Machine output: output/audit/csr_factorized_kernel_realspace.json.

## Closure (March 2026)
The factored operator K(p) = |p_x||p_y||p_z| is strongly anisotropic.
Angular PDF shows a large high-tail and predicts a visible outlier population in RAR;
this is not observed. Minimal triple Chern-Simons coupling yields no |p|^3 term at all
(antisymmetry kills scalar self-energy), leaving K(p) = p^2 unchanged.
No isotropization mechanism has been identified. Route C is closed.
