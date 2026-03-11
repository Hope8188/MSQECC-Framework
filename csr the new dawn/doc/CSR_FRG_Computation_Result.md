# CSR Fixed-Point Computation - Results

FRG-side analysis of the `eta*` target for a `q=3` deep-IR claim in `d=3`.
March 2026.

Machine-readable output:
- `output/audit/frg_computation_result.json`

Scope note:
- The core `T^3` record is a toric-code/open-system backbone.
- This computation analyzes a specific effective-mechanism class: a local Yukawa/Dirac-style bridge treated in standard equilibrium QFT/FRG language.
- It therefore constrains that class of bridges. It does not yet constitute a derivation from the actual open-system bridge unless a precise mapping is supplied.

This report records three results:
1. the exact `q` to `eta` relation for a scale-invariant `|grad phi|^q` kinetic term,
2. why the GNY/Yukawa bridge route is directionally wrong for `eta = -1`,
3. the concrete non-analytic requirement (`|p|^3`) the bridge would have to produce.

## Part 1: Dimensional Analysis (Exact)
For a scale-invariant action density `L ~ |grad phi|^q` in `d=3`, the relation is:
- `eta = 6/q - 3`

Key implications:
- `q = 2` -> `eta = 0` (Newtonian/free-field point; scalar unitarity bound saturated)
- `q = 3` -> `eta = -1` and `Delta_phi = 0`

Interpretation:
- In a unitary `d=3` CFT, a scalar has `Delta_phi >= 0.5` (equivalently `eta >= 0`)
- The `q=3` target therefore implies a non-unitary fixed point or a non-standard kinetic operator rather than a standard propagating scalar with a small anomalous dimension

## Part 2: GNY Fixed Point (Yukawa Route)
If the bridge sector reduces to a local Yukawa coupling to Dirac fermions, it maps to the Gross-Neveu-Yukawa (GNY) class.

Known/recorded values (see JSON):
- `eta_phi* > 0` across `N_f` in the recorded range, and approaches `0+` at large `N_f`

Consequence:
- The Yukawa/GNY mechanism pushes `eta` upward, away from the `eta = -1` target
- the GNY route is closed as a mechanism for reaching `q=3` via anomalous dimension

## Part 3: Bridge Self-Energy Requirement
A standard local Yukawa loop produces an analytic expansion in `p^2`:
- `Sigma(p) = Sigma(0) + A p^2 + O(p^4)`

To obtain an effective propagator `G(p) ~ 1/|p|^3` (equivalently `eta_std = -1`), the bridge would have to induce a non-analytic term:
- `Sigma(p) ~ B |p|^3` in the IR

This defines a finite computation gate (for any proposed mapping to an effective scalar):
1. write the bridge object explicitly (or the mapping to `G_bridge(q)`)
2. compute/derive the IR scaling of `Sigma(p)`
3. if `|p|^3` is absent (analytic `p^2` only), the bridge cannot reach the cubic-gradient target through perturbative loops

## Updated Gate Status (From This Computation)
- `eta_star_equals_minus1_from_GNY = false`
- `mechanism_from_Yukawa_alone = false`
- New constraint: the bridge must generate a `|p|^3` kinetic term (or contain `|grad phi|^3` at tree level)
- `pivot_executable_now = false` because the bridge object/mapping is not yet written in the core layer
