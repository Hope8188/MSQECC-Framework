# CSR Bridge Object (Core)

This document writes the bridge object in the core form required by the fixed-point program: an explicit generator (or action) plus an explicit coupling.
March 2026.

## 0. What This Is (and Is Not)
This is the current bridge object that exists in the local T3 record.

It is:
- an open-system (measurement-induced) bridge on a Z2 toric-code backbone on T3
- stated as an explicit generator for a density matrix

It is not yet:
- a spatially extended matter field theory
- a coarse-grained effective scalar action S_eff[phi] with a derived observable map to galaxy dynamics

Those missing pieces are exactly why the fixed-point computation is currently blocked.

## 1. Backbone: Cubic T3 Toric Code (Local Form)
Consider a periodic cubic lattice on T3 with qubits on edges.

Define Z-type plaquette stabilizers:
- B_p = product_{e in boundary(p)} Z_e

Key local geometric fact (verified in the local audit code):
- each edge lies on exactly four plaquettes in the cubic periodic lattice

## 2. Bridge Generator: Uniform Stabilizer Monitoring
Model the bridge as uniform continuous monitoring of the relevant Z-plaquette stabilizers.

A minimal Lindblad form for monitoring hermitian unitary checks uses jump operators proportional to B_p.
The induced dissipator has the form:
- D[B_p](rho) = B_p rho B_p - rho

Define the bridge generator (code sector) schematically as:
- d rho / dt = sum_p kappa * D[B_p](rho)

This is the bridge object in generator form.

## 3. Coupling: Matter Probe to a Selected Edge
Couple a matter/probe qubit to a selected edge e through the conjugate operator X_e:
- H_int = g * X_e tensor sigma_z

This is the bridge coupling in explicit Hamiltonian form.

The combined dynamics (minimal local model) is:
- d rho / dt = -i [H_int, rho] + sum_p kappa * D[B_p](rho)

where the sum is over plaquettes incident on the selected edge.

## 4. Derived Local Result: Effective Matter Dephasing
For each plaquette p incident on e:
- {B_p, X_e} = 0

and for all other plaquettes:
- [B_p, X_e] = 0

Because there are four incident plaquettes, the coupled edge sector damps faster by a factor of four relative to the single-plaquette toy model.

Adiabatic elimination of the damped edge sector yields an effective matter master equation of the form:
- d rho_m / dt = (g^2 / (4 kappa)) D[sigma_z](rho_m)

Equivalently, the matter coherence decays at:
- Gamma_full = g^2 / (2 kappa)

This statement is verified numerically in:
- verification/csr_full_lattice_bridge_derivation.py

and generalized symmetry checks are verified in:
- verification/generalized_bridge_symmetry_test.py

## 5. Binary Gate 1 Check: Does This Bridge Produce a Cubic IR Kinetic Operator?
Reference observable map:
- CSR_Observable_Map_Core_Definition.md

Gate 1 asks whether the bridge yields a cubic IR kinetic operator for the coarse-grained observable used for galaxy claims:
- |grad phi|^3 in real space or |p|^3 in momentum space

Strict core result (generator alone):
- derived operator is ultralocal (p^0), with no spatial kernel
- see CSR_Bridge_Kernel_Derivation.md and output/audit/csr_bridge_kernel_derivation.json

Explicit map result (assumption-bound):
- with the defined map and minimal diffusion closure, the induced operator is p^2
- Gate 1 is executable under stated assumptions and FAILS (n = 2)
- see output/audit/observable_map_gate1.json

Therefore:
- Gate 1 fails both strictly (p^0) and under the minimal diffusion closure (p^2)

## 6. Bridge Kernel (Derived from Core Generator)
The core generator implies an ultralocal kernel (p^0), not a spatial gradient operator.
See CSR_Bridge_Kernel_Derivation.md and output/audit/csr_bridge_kernel_derivation.json.

## 6b. Extended Nonlocal Bridge Attempt (Feasibility Test)
A designed nonlocal extension using power-law kernels was tested and does not yield |p|^3.
See CSR_Bridge_Extended_Kernel_Derivation.md and output/audit/csr_bridge_extended_kernel_derivation.json.

## 6c. Nonanalytic |p|^3 Kernel Attempt (Designer Insertion)
A designer kernel that enforces K(p) = |p|^3 was inverse-FFT'd to real space.
It is long-range and sign-changing (tail ratio ~0.56; 81 mean sign changes).
This demonstrates the structure required for a cubic operator but is an insertion, not a derivation.
See CSR_Bridge_Nonanalytic_Kernel_Attempt.md and output/audit/csr_bridge_nonanalytic_kernel_attempt.json.
Bridge-to-observable map reference: CSR_Observable_Map_Core_Definition.md.

## 7. What Would Make Gate 1 Executable (Next Work)
The observable map is now explicit. The remaining requirement is to derive a nonlocal kernel from the bridge algebra
(or a tree-level |grad phi|^3 term) without insertion.

Only after that exists can we compute/fit the small-p scaling and ask whether a cubic kinetic operator is genuinely derived.
