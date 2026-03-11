# CSR Observable Map (Core Definition)

Status: core definition with an explicit bridge-to-observable map.
This map makes Gate 1 executable under stated assumptions, but it does not insert MOND.
March 2026.

## Purpose
Write an explicit bridge-to-observable map in core form and make Gate 1 executable under explicit assumptions.
This is a definitional step; it is not yet a derived fixed-point result.

## Assumptions (Explicit)
A1. The bridge generator is local stabilizer monitoring with a local edge coupling.
- Verified: YES (CSR_Bridge_Object_Core.md; output/audit/csr_full_lattice_bridge_derivation.json).

A2. Independent-plaquette / Markovian closure (kappa >> J) is valid for the edge coherence proxy.
- Verified: NO (assumption; standard open-system limit).

A3. A scalar proxy can be defined from local edge coherence without adding new dynamics.
- Verified: NO (definition only).

A4. Each vertex has 6 incident edges on the cubic T3 lattice.
- Verified: YES (output/audit/t3_vertex_edge_incidence.json).

A5. a0 is not derived from the core bridge parameters.
- Verified: NO (still free).

## 1. Core Scalar Proxy (Edge Level)
Let rho_e(t) be the reduced density matrix of edge e in the X basis.
Define the off-diagonal coherence magnitude:
- c_e(t) = |rho_e,01(t)|
Define a scalar proxy on edges:
- phi_e(t) = -log(c_e(t) / c0)
where c0 is the initial coherence at t = 0.

This uses only the bridge observable (decoherence) and introduces no MOND scaling.

## 2. Site Field (Lattice Level)
For each lattice site x, let E_x be the set of edges incident on x.
Define the site field:
- phi(x, t) = (1/|E_x|) * sum_{e in E_x} phi_e(t)

This produces a scalar field on lattice sites.

## 3. Observable Map (Acceleration Proxy)
Define the discrete gradient on the cubic lattice:
- (dhat_mu phi)_x = (phi_{x+e_mu} - phi_x) / a_lat
- |grad_hat phi|^2_x = sum_mu (dhat_mu phi)_x^2

Define the observable acceleration proxy:
- g_obs(x, t) = |grad_hat phi|_x

This is a direct map from bridge coherence to a lattice acceleration proxy.

## 4. Derived Local Dynamics from the Core Generator (Strict)
From the core generator alone (CSR_Bridge_Kernel_Derivation.md), the adjoint Lindblad action damps X_e locally:
- d_t c_e = -4 kappa * c_e + ...
- d_t phi_e = 4 kappa + ... (local, no spatial coupling)

Therefore the kernel implied by the bridge generator is ultralocal:
- K(p) = const (p^0), not p^2 or p^3.

This is a hard obstruction: the core generator by itself cannot produce a cubic spatial kinetic operator.

## 5. Minimal Diffusion Closure (Assumption)
If we adopt a standard diffusion closure for the coarse-grained scalar field:
- d_t phi = -4 kappa * phi + J_eff * Laplacian(phi) + source
- J_eff = g^2 / (4 kappa)

Then the momentum-space inverse propagator is:
- G_phi^{-1}(p) = 4 kappa + J_eff * p^2

This yields a quadratic kinetic term (p^2). Under this closure, Gate 1 fails with n = 2.
Machine record:
- output/audit/observable_map_gate1.json

## 6. Gate 1 Status
- Strict core generator: FAIL (ultralocal p^0; no spatial kernel).
- Under the explicit map + diffusion closure: executable, FAIL (n = 2 != 3).

## Bottom Line
The bridge-to-observable map is now explicit.
Gate 1 is executable under stated assumptions, but the bridge still cannot yield |p|^3 in the IR.

This cleanly upgrades the status from "not executable" to "executable under explicit assumptions" while preserving the strict-core obstruction.
