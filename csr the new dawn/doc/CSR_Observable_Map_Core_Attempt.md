# CSR Observable Map (Core Attempt)

Status: attempt. This file tries to derive a spatial observable map from the open-system bridge without inserting MOND.
It is explicitly provisional and must be falsified or promoted.

## Assumptions (Explicit)
A1. The core bridge object is an open-system generator with stabilizer monitoring plus a local coupling on edges.
- Verified: YES (CSR_Bridge_Object_Core.md).

A2. The bridge generator can be coarse-grained into an effective diffusion-like operator on a lattice scalar proxy of local decoherence.
- Verified: NO (this is the core new attempt).

A3. Any observable map must be defined on the lattice variables actually present (edge qubits + stabilizer checks).
- Verified: YES.

## Update
A complete explicit map is now written in:
- CSR_Observable_Map_Core_Definition.md

The Gate 1 result under the explicit map + diffusion closure is recorded in:
- output/audit/observable_map_gate1.json

## 1. Local Scalar Proxy from Bridge Dynamics
We need a scalar quantity defined per edge that is computable from the bridge dynamics.

Define the edge coherence proxy:
- Let rho_e(t) be the reduced density matrix for edge e.
- Define c_e(t) = |rho_e,01(t)|, the off-diagonal magnitude in the X basis.
- Define phi_e(t) = -log(c_e(t) / c0), where c0 is the initial coherence (normalization).

This converts the local dephasing rate into a positive scalar field on edges. It does not insert any MOND scaling.

## 2. Site Scalar Field by Coarse-Graining
Define a site-based scalar field by averaging the adjacent edges:
- For each lattice site x, define E_x as the set of incident edges.
- Define phi(x, t) = (1/|E_x|) * sum_{e in E_x} phi_e(t).

This produces a scalar field on the lattice sites.

## 3. Observable Map to a Gradient Field
Define the observable acceleration proxy as the discrete gradient magnitude:
- g_obs(x, t) = |grad_hat phi(x, t)|

This is a direct lattice object with no inserted interpolation function.

## 4. Effective IR Operator (Attempt)
We now ask: does the bridge dynamics imply an effective operator for phi(x)?

Strict core result:
- The generator yields only local dephasing, which implies an ultralocal kernel (p^0).
- There is no spatial gradient operator from the generator alone.

Minimal closure (assumption):
- If local dephasing is coarse-grained into a diffusion-like term, the implied IR operator is quadratic (p^2).

Either way, the cubic |p|^3 target fails under the current bridge class.

## 5. Gate 1 Check Under This Attempt
Under the explicit map + diffusion closure:
- Derived cubic kinetic operator: NO
- Gate 1: FAIL (n = 2)

Strict-core result:
- Derived operator: p^0
- Gate 1: FAIL (not a |p|^3 check)

## Bottom line
This attempt makes the observable map explicit and shows that, under a minimal diffusion-like interpretation, Gate 1 fails.
To pass Gate 1, the bridge must induce a non-local IR kernel or contain a tree-level cubic-gradient operator on the coarse-grained observable.
Machine check output:
- output/audit/csr_observable_map_core_attempt_check.json
Related core derivations:
- CSR_Bridge_Kernel_Derivation.md (core generator implies ultralocal kernel, p^0)
- CSR_Bridge_Extended_Kernel_Derivation.md (power-law nonlocal kernel still yields p^2, not p^3)
