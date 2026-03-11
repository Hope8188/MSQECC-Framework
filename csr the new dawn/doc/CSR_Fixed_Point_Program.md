# CSR Fixed-Point Program

Execution plan: from typed T3 theory object to the first binary result.
March 2026.

Program status:
- pivot_directionally_correct = true
- pivot_executable_now = true (Gate 1 now executable under explicit map assumptions)
- eta_computable_from_current_record = false

Scope note:
- The core T3 record is a toric-code/open-system backbone.
- The fixed-point q=3 target is naturally stated in a coarse-grained effective field language.
- This program is therefore written in terms of an explicit bridge object plus an explicit map to whatever effective IR operator is claimed.

This document is intentionally gate-driven: each gate has a pass condition and an explicit stop condition.

## Gate 0: Write the Typed Theory Object
This gate is writing, not new physics. The goal is an externally legible object that makes the computation well-posed.

What must be written (in one place, self-contained):
- Explicit dynamics object: action S[...], Hamiltonian H, or open-system generator L.
- Explicit equivalence relation ~ and quotient Q = X/~ with a physical motivation.
- Explicit measure mu with domain, invariances, and normalization rule (if used).
- Explicit observable map Obs: (core object) -> (coarse-grained phi) -> g_obs(r).
- Explicit coarse-graining / RG object.

Pass condition:
- A third party can answer (without hidden context): what is the object, what flows under coarse-graining, what is the observable, and what computation confirms/denies the fixed-point target.

## Gate 1: Bridge Kinetic Exponent Gate (Prerequisite to FRG)
The fixed-point target q = 3 corresponds to an effective scalar propagator G(p) ~ 1/|p|^3 (equivalently eta_std = -1 under the standard FRG convention G ~ 1/p^{2-eta_std}).

Key prerequisite from the computation record:
- for local Yukawa-style mechanisms, loop corrections are analytic in p^2 and do not change the kinetic exponent from 2 to 3
- a viable bridge must generate a non-analytic |p|^3 term, or contain the cubic-gradient operator at tree level

### Gate 1a: Write the bridge object (required)
Write the bridge generator/action and coupling explicitly. From this, obtain:
- the bridge propagator (or open-system correlator object) in momentum space or its lattice analogue
- the effective IR operator acting on the coarse-grained observable used for galaxy claims

### Gate 1b: Check for a cubic kinetic term in the IR (binary)
Pass if either of the following is demonstrated from the explicit bridge algebra:
- Tree-level: the IR effective operator contains an explicit |grad phi|^3 (or equivalent |p|^3) term without insertion.
- Nonlocal/Nonperturbative: the bridge induces a genuine non-analytic Sigma(p) ~ B |p|^3 in the IR.

Fail if:
- the induced operator is analytic (equivalent to A p^2 + O(p^4) only), or
- the only way to obtain |grad phi|^3 is by choosing an AQUAL/MOND kinetic function as an input.

Notes (what the current computation already closes for a local Yukawa/Dirac toy bridge):
- Standard GNY/Yukawa route gives eta_phi* > 0 for all Nf (wrong direction).
- For power-law bubbles G(q) ~ 1/|q|^beta in d=3, scaling gives Sigma(p) ~ |p|^{3-2 beta} so |p|^3 requires beta = 0 (unphysical constant propagator).
- Derivative edge-coupling self-energy is killed exactly by the Ward identity (zero).
- Two-derivative vertices can give n=3 only in the UV regime, not the galactic IR regime.
- Designer kernel attempt K(p) = |p|^3 shows a long-range sign-changing kernel; it is an insertion, not a derivation (see CSR_Bridge_Nonanalytic_Kernel_Attempt.md).

Bottom line for Gate 1:
- if the bridge does not contain a tree-level cubic operator (or an explicitly nonlocal kernel yielding |p|^3), the perturbative loop route is closed

Current status (core record check):
- Strict core generator: ultralocal p^0 (see CSR_Bridge_Kernel_Derivation.md).
- Explicit map + diffusion closure: executable, FAIL with n = 2 (see output/audit/observable_map_gate1.json).

## Gate 2: Fixed-Point Computation (Only If Gate 1 Passes)
Setup:
- apply an explicit coarse-graining/RG flow to the bridge-modified effective object
- if an effective Euclidean action exists, FRG (e.g. Wetterich) is one option

Target:
- q* = 6/(3 + eta_std*) should equal 3, which requires eta_std* = -1

Pass/fail:
- PASS: eta_std* in [-1.1, -0.9] with a reproducible computation
- FAIL: outside that band -> stop claiming T3 forces q = 3

## Gate 3: Transition Scale Derivation
Only reached if Gate 2 passes.

What must be derived:
- express a0 in terms of T3 lattice/bridge parameters without using galaxy data

Pass/fail:
- PASS: a0 = F(a_lat, lambda, bridge couplings, ...) and order-of-magnitude matches ~ 1.2e-10 m/s^2
- FAIL: a0 still requires fitting -> the program has (at best) a shape result, not a full law

## Gate 4: Observable Map and Benchmarking
Only reached if Gates 2 and 3 pass.

Pass condition (all of the following):
- Structural triple test passes (RAR/MDAR/BTFR targets)
- Direct observed main gate: aggregate R^2 > 0.87, median R^2 > 0.75
- Beats MOND on the same gate if superiority is claimed
- Residual lag-1 autocorrelation below 0.50
- 9-galaxy sensitivity aggregate R^2 > 0.60
- a0 not fitted to any benchmark galaxy

## What Stays Frozen Until Gate 1 Passes
- No new galaxy branch families
- No expansion of the direct observed gate
- No further external model audits
- No engineering or hardware claims based on physics
- IBM hardware tests remain limited to bridge/channel behavior verification only

## If Gate 1 or Gate 2 Fails: Honest Exit Protocol
If the bridge/FRG result does not support the q=3 target:
- publish the typed object and bridge analysis as stand-alone notes
- state explicitly that the T3 program does not force the deep-IR galaxy law
- only then evaluate successor candidates (not before)

## Bottom Line
The program is executable now that the observable map is explicit, but Gate 1 currently FAILS.
The first hard binary check remains: does the bridge generate (or already contain) a cubic kinetic operator in the IR?
