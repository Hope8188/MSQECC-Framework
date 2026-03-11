# CSR T^3 Typed Theory Object

Step 0: the self-contained object that must exist before the fixed-point computation can run.
March 2026.

Status:
- `pivot_directionally_correct = true`
- `pivot_executable_now = false`

This document is not an audit note listing what is missing. It is a first draft of the typed `T^3` theory object the program needs. Every section that still says TBD is a real gap that blocks execution.

Scope note (to avoid category errors):
- The current core record anchors `T^3` in a `Z2` toric-code backbone with an explicit stabilizer algebra (`MSQECC_T3_Foundation_Audit.md`).
- The galaxy-law `q=3` target is naturally expressed in a coarse-grained continuum language (a scalar `phi` with an effective kinetic operator).
- The typed object must therefore include both: (1) the explicit lattice/open-system object, and (2) the explicit map to any effective field `phi` used for fixed-point claims.

Bridge core spec and current Gate 1 check:
- Bridge object (generator + coupling): `CSR_Bridge_Object_Core.md`
- Gate 1 core check output: `output/audit/csr_bridge_gate1_core_check.json`
- Observable map proposal (not core): `CSR_Observable_Map_Proposal.md`
- Core quotient + measure: `MSQECC_T3_Foundation_Audit.md` (Section 1.9)
- Core observable map + RG definitions (provisional): `CSR_Core_Observable_Map_and_RG.md`

## 1. Lattice Backbone

### 1.1 Spatial complex
The backbone is a three-torus `T^3` realized as a periodic cubic lattice on a box of side `L` with `N^3` sites.

Lattice spacing:
- `a_lat = L / N`

Baseline core record (already exists):
- a `Z2` toric-code stabilizer algebra on the periodic cubic lattice

### 1.2 Discrete gradient (only if a scalar field is introduced)
If a coarse-grained scalar `phi` is part of the program, define the discrete gradient explicitly.

Forward finite-difference gradient in direction `mu = 1,2,3`:
- `(dhat_mu phi)_x = (phi_{x+e_mu} - phi_x) / a_lat`

Discrete gradient magnitude squared:
- `|grad_hat phi|^2_x = sum_mu (dhat_mu phi)_x^2`

## 2. Field Content

### 2.1 Core lattice variables (toric-code backbone)
TBD (but must be explicit in the typed object):
- where qubits live (edges in the standard construction)
- which stabilizers are used (vertex and plaquette operators)
- any monitoring / measurement channels if the bridge is open-system

### 2.2 Bridge sector
The program contains a bridge claim, but it must be written in one explicit form compatible with the core record:
- an open-system generator (e.g. a Lindblad operator set / measurement channels) acting on the lattice degrees of freedom, or
- an explicit auxiliary/Grassmann/operator sector coupled to the coarse-grained field `phi`, if the program truly uses that mapping.

TBD:
- the bridge object and its coupling must be written down explicitly

Until this is written, the bridge cannot be connected to any fixed-point computation.

## 3. Action or Generator

This section must contain at least one explicit dynamics object:
- Euclidean lattice action `S[...]`, or
- Hamiltonian `H`, or
- open-system generator `L` / Lindbladian.

### 3.1 Effective scalar action (candidate, derived object)
If the galaxy-law claim is made in scalar-field language, that scalar must be defined as a coarse-grained observable and the effective action must be derived.

A minimal kinetic ansatz used to state the `q` target is:
- `S_eff[phi; q, lambda] = (1/lambda) * sum_x |grad_hat phi|^q_x + sum_x phi_x J_x`

Constraints:
- UV/Newtonian limit requires `q -> 2` at high gradients
- the MOND deep-IR target corresponds to an effective `q = 3`

### 3.2 AQUAL baseline (for clarity)
The standard MOND/AQUAL structure can be written as:
- `S_AQUAL[phi; a0] = sum_x f(|grad_hat phi|^2_x / a0^2) + sum_x phi_x J_x`

with limits:
- deep IR: `f(y) -> y^(3/2)` as `y -> 0`
- UV: `f(y) -> y` as `y -> infinity`

The `T^3` program must not take `f(y) ~ y^(3/2)` as an input and call it a derivation. The derivation target is to obtain this (or an equivalent cubic-gradient IR operator) from the backbone + bridge.

### 3.3 Bridge-modified dynamics (TBD)
TBD (must be explicit):
- write the bridge generator/action and its coupling
- derive the IR effective operator on the coarse-grained observable used for galaxy claims

## 4. Renormalization / Coarse-Graining Object

This section must say what "flows" and under what coarse-graining.

Options (choose one and make it explicit):
- equilibrium RG on an effective action (e.g. Wetterich FRG), or
- a nonequilibrium/open-system RG appropriate to the actual bridge generator.

### 4.1 FRG setup (only after an effective action exists)
If (and only if) the program has an effective Euclidean action for the coarse-grained field, the Wetterich FRG can be used:
- `dt Gamma_k[phi] = (1/2) Tr[(Gamma_k^(2)[phi] + R_k)^(-1) * dt R_k]`

### 4.2 Fixed-point target and sign convention
For a scale-invariant `|grad phi|^q` kinetic term in `d=3`, dimensional analysis gives:
- `eta = 6/q - 3`

So the `q=3` target implies:
- `eta_std* = -1`
- `Delta_phi = 0`

This violates the unitary `d=3` scalar bound (`Delta_phi >= 0.5`, `eta >= 0`). If the target exists, it is non-unitary or not a standard propagating scalar.

## 5. Transition Scale a0
A genuine derivation must produce `a0` from `T^3` parameters alone (no galaxy fitting):
- `a0 = F(a_lat, lambda, bridge couplings, ...)`

TBD:
- derive `a0` and show the order of magnitude matches `~ 1.2e-10 m/s^2`

## 6. Observable Map
The theory must specify an explicit map from internal objects to galaxy observables.

Minimum requirement:
- define what `phi` is (if used) as a coarse-grained observable of the core lattice/open-system object
- define how `g_obs(r)` or `v(r)` is computed from it

UV limit (Newtonian coupling form):
- `laplacian phi = 4 pi G rho_bar`

IR effective equation form (target structure):
- `div(mu(|grad phi|/a0) * grad phi) = 4 pi G rho_bar`

TBD:
- specify the observable map precisely
- derive `mu` from the fixed-point object (do not insert it)

## 7. Computation Target (Executable Steps)
This section states exactly what must be computed to make `pivot_executable_now = true`.

Step 1 (writing):
- write the explicit bridge generator/action and coupling

Step 2 (hard gate, prerequisite):
- determine whether the IR effective operator contains a cubic kinetic term (`|grad phi|^3` or `|p|^3`) without insertion

Step 3 (only if Step 2 passes):
- set up the appropriate RG/coarse-graining flow and compute the fixed-point quantity used to justify `q=3`

Step 4 (binary comparison):
- PASS only if the computation forces the `q=3` target (not just fits it)

Step 5 (only if Step 4 passes):
- derive `a0` from `T^3` parameters
- finalize the observable map
- only then run galaxy benchmarking

## 8. Pass/Fail Criteria
PASS requires all of the following:
- bridge object written explicitly
- cubic IR kinetic operator is real and derived (not inserted)
- fixed-point quantity forcing `q=3` is computed reproducibly
- `a0` derived (not fitted)
- observable map written explicitly

FAIL if any of the following holds:
- the bridge object cannot be written in closed form
- the cubic IR operator is only obtained by inserting AQUAL/MOND structure
- `a0` remains a fitted constant
- observable map remains unspecified
