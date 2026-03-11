# CSR Core Observable Map and RG Object (Formal Definitions)

Status: formal definitions for executability only. These are not derived from the core bridge and must be treated as provisional until proven.
March 2026.

## Purpose
The fixed-point program requires explicit definitions of:
- an observable map (from the bridge/open-system object to a coarse-grained field), and
- a coarse-graining / RG object.

This document provides explicit definitions so the computation is well-posed, without inserting MOND or any IR scaling by hand.

## Assumptions (Explicit)
A1. The bridge object is a local open-system generator with stabilizer monitoring and a local edge coupling.
- Verified: YES (CSR_Bridge_Object_Core.md).

A2. A coarse-grained scalar proxy can be defined from local edge coherence without changing the bridge dynamics.
- Verified: NO (definition only).

A3. A block-averaging coarse-graining can be applied to the scalar proxy to define an RG flow.
- Verified: NO (definition only).

These assumptions are formal definitions used to make the computation executable. They do not count as derived results.

## 1. Observable Map (Formal Definition)
Define a scalar proxy on edges from the bridge dynamics:
- Let rho_e(t) be the reduced density matrix of edge e in the X basis.
- Define c_e(t) = |rho_e,01(t)|.
- Define phi_e(t) = -log(c_e(t) / c0), where c0 is the initial coherence.

Define a site field by averaging incident edges:
- For each lattice site x, define E_x as the set of edges incident on x.
- Define phi(x, t) = (1/|E_x|) * sum_{e in E_x} phi_e(t).

Define the observable acceleration proxy as a discrete gradient magnitude:
- g_obs(x, t) = |grad_hat phi(x, t)|.

This is a formal map from the bridge object to a lattice observable. It does not insert MOND asymptotics.

## 2. Coarse-Graining / RG Object (Formal Definition)
Define a block-averaging coarse-graining operator R_b:
- Partition the cubic lattice into blocks of size b x b x b.
- For each block B, define
  phi_b(B, t) = (1/|B|) * sum_{x in B} phi(x, t).

Define the induced flow of the effective operator under b -> b':
- The RG object is the family of coarse-grained fields {phi_b} and the induced kernel/operator K_b on phi_b.

This is a formal RG definition. The kernel K_b must be derived from the bridge generator; that derivation is not yet in the core record.

## 3. Status and Constraints
- These definitions make Gate 1 executable under explicit assumptions.
- Strict core generator: ultralocal p^0; no spatial kernel (CSR_Bridge_Kernel_Derivation.md).
- Minimal diffusion closure yields p^2 and fails Gate 1 (output/audit/observable_map_gate1.json).
- Any result obtained using these definitions must be labeled "assumption-bound" until the mapping is derived from the bridge algebra.
