# QCP Route Draft: Candidate Hamiltonian + Target Operator

Status: draft for explicit derivation. No claims beyond definitions.
March 2026.

## 1. Candidate T3 QCP Hamiltonian (explicit)
We need a tunable Hamiltonian on the 3D toric code that admits a continuous transition.
A standard deformation is the Z2 gauge theory with transverse field:

H(λ) = -J_p * sum_p B_p - J_v * sum_v A_v - λ * sum_e X_e

Where:
- B_p = product_{e in ∂p} Z_e (plaquette)
- A_v = product_{e incident to v} X_e (vertex)
- λ is the transverse field strength

Known expectation: there is a confinement/deconfinement transition at some λ/ J_p, J_v.

## 2. Bridge-relevant operator candidate
The core observable map uses edge coherence (X basis). A bridge-relevant operator must couple to that:

O_e = X_e  (edge operator)
O_v = product_{e incident to v} X_e = A_v  (vertex stabilizer)
O_p = product_{e in ∂p} Z_e = B_p  (plaquette stabilizer)

Candidate for scalar proxy (consistent with current map):
O(x) = average of edge X_e around vertex x.

## 3. Required critical exponent
We need the connected correlator:

⟨O(x) O(0)⟩_c ~ 1/|x|^{2Δ}

Gate condition for White Whale:
2Δ = 3  → Δ = 3/2

## 4. Concrete derivation tasks (hard gates)
A. Establish QCP existence in H(λ):
   - identify phase diagram, show continuous transition, obtain critical fixed point.
B. Compute Δ for O(x):
   - determine scaling dimension for X_e (or A_v) at the QCP.
C. Show kernel non-analyticity:
   - if Δ = 3/2, the Fourier transform gives |p|^3 behavior.
D. Confirm survival under open-system reduction:
   - demonstrate that the Lindblad coupling does not gap the critical mode.

## 5. Immediate next calculation (minimal)
- Choose O(x) (edge vs vertex) and compute its Δ in a known 3D Z2 gauge theory universality class.
- If Δ ≠ 3/2, this loophole closes for that operator.

## Output if successful
- Derived |p|^3 kernel from critical correlations; Gate 1 PASS.

## If it fails
- Record which operator and universality class failed; keep the no-go theorem intact.

## Minimal feasibility check (status)
The scaling dimension Δ for the bridge-relevant operator is not computed here.
To proceed, we must either:
- cite a known universality class result for the 3D Z2 gauge theory operator, or
- run a dedicated Monte Carlo / series-expansion computation.
Until Δ is shown to be 3/2, this loophole remains open but unproven.

## Pipeline validation (synthetic)
A synthetic correlator fit confirms the Δ regression pipeline is numerically stable.
This does NOT compute Δ for the T3 model; it only validates the fitting pipeline.
Machine output: output/audit/csr_qcp_delta_scaffold.json.

## Closure (March 2026)
The T3 toric-code QCP is forced to a Z2 scalar order parameter with z = 1 in 3D.
By universality this is the 3D Ising fixed point:
- Δ_sigma ≈ 0.5181, η ≈ 0.0363
- K(p) ∼ p^{2-η} ≈ p^{1.964}
This does not yield |p|^3. To get |p|^3 would require η = -1, violating unitarity bounds.
Route A is closed.
