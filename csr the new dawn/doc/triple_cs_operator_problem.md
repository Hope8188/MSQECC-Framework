# The Triple Chern-Simons Operator Problem on T³
### A Precisely Stated Open Question
**Version 1.0 — March 2026**

---

## Background

MOND phenomenology requires a modified Poisson equation with an effective kinetic operator that scales as $|p|^3$ in the deep IR. The question is whether this operator can be derived from a topological field theory on a three-torus $T^3 = S^1 \times S^1 \times S^1$ without inserting the asymptotics by hand.

---

## The Construction

Let $A^{(i)}$ be a U(1) gauge field associated with the $i$-th cycle of $T^3$, for $i = 1, 2, 3$. Consider the action:

$$S_{\text{CS}} = \sum_{i=1}^{3} \frac{k_i}{4\pi} \int_{T^3} A^{(i)} \wedge dA^{(i)} + \int_{T^3} \bar{\phi}\left(\partial_\mu - i\sum_{i=1}^3 A^{(i)}_\mu\right)^2 \phi \, d^3x$$

where $\phi$ is a scalar field coupling to all three gauge fields simultaneously, and $k_i \in \mathbb{Z}$ are the Chern-Simons levels.

---

## The Central Question

**After integrating out the three gauge fields $A^{(1)}, A^{(2)}, A^{(3)}$, what is the effective kinetic operator for $\phi$?**

Specifically: does the resulting effective action take the form

$$S_{\text{eff}} \stackrel{?}{=} \int \frac{d^3p}{(2\pi)^3} \, \phi(-p) \, \mathcal{K}(p) \, \phi(p)$$

where $\mathcal{K}(p)$ is:

**(A) The factored operator:**
$$\mathcal{K}_A(p) = |p_1| \cdot |p_2| \cdot |p_3|$$

**(B) The isotropic operator:**
$$\mathcal{K}_B(p) = \left(p_1^2 + p_2^2 + p_3^2\right)^{3/2} = |p|^3$$

**(C) Neither — some other form with distinct symmetry properties.**

---

## Why This Question Is Precise

The two candidate operators are **physically distinguishable** by an already-completed Monte Carlo computation:

| Property | $\mathcal{K}_A = |p_x||p_y||p_z|$ | $\mathcal{K}_B = |p|^3$ |
|---|---|---|
| Rotational symmetry | Cubic only | Full SO(3) |
| mode/mean on $S^2$ | 0.012 | 1.000 |
| $P(X > 2\langle X\rangle)$ | 12.1% | 0% |
| RAR outlier prediction | ~21/175 galaxies | 0 |
| Observed SPARC RAR | No outlier population | ✓ Consistent |

**$\mathcal{K}_A$ is falsified by SPARC data. $\mathcal{K}_B$ is consistent with SPARC data.**

The field theory computation therefore has a **binary observable consequence** that has already been tested.

---

## The Computation Required

The effective action is obtained by the Gaussian functional integral over the gauge fields:

$$e^{-S_{\text{eff}}[\phi]} = \int \mathcal{D}A^{(1)}\mathcal{D}A^{(2)}\mathcal{D}A^{(3)} \, e^{-S_{\text{CS}}[A^{(i)}, \phi]}$$

Since $S_{\text{CS}}$ is quadratic in the gauge fields (Chern-Simons is linear in derivatives), this integral is formally Gaussian in $A^{(i)}$ after gauge fixing. The result is:

$$S_{\text{eff}}[\phi] = S_{\text{matter}}[\phi] - \frac{1}{2}\text{Tr}\ln\left[\hat{M}(k_i, \phi)\right]$$

where $\hat{M}$ is the operator matrix of the quadratic form in $A^{(i)}$.

**The key object is the functional determinant** $\det[\hat{M}]$.

The question reduces to: **does $\det[\hat{M}]$ respect the full cubic symmetry of $T^3$ and produce an isotropic result, or does the independent coupling of each $A^{(i)}$ to a single cycle break isotropy and produce the factored form?**

---

## Known Constraints on the Answer

**Constraint 1 — Symmetry argument for $\mathcal{K}_B$:**

The action $S_{\text{CS}}$ is invariant under the cubic symmetry group of $T^3$, which includes permutations of the three cycles and reflections within each cycle. The effective action must respect this symmetry. $\mathcal{K}_A = |p_x||p_y||p_z|$ is invariant under permutations of axes and sign flips — it respects cubic symmetry $O_h$. $\mathcal{K}_B = |p|^3$ respects full spherical symmetry $SO(3)$. **Both operators are consistent with $T^3$ cubic symmetry.** Symmetry alone does not discriminate.

**Constraint 2 — Dimensional analysis:**

In 3D Euclidean space, a kinetic operator with mass dimension 3 (in units where $\hbar = c = 1$, $[p] = 1$) requires a coefficient with dimension $[m]^{-3}$ or equivalently $[\ell]^3$. Both $\mathcal{K}_A$ and $\mathcal{K}_B$ have the correct dimension. Not discriminating.

**Constraint 3 — Analogy with 2+1D CS theory:**

In 2+1D, integrating a single U(1) CS gauge field coupled to a scalar produces an effective action with kinetic term $|p|$ — the **isotropic** fractional Laplacian, not a factored form. This is because the CS propagator $\sim \epsilon^{\mu\nu\rho}p_\rho/p^2$ does not factorize by direction. By analogy, three independent CS fields on $T^3$ likely produce $|p|^3$ isotropically, not $|p_1||p_2||p_3|$.

**This analogy strongly favors $\mathcal{K}_B$.**

**Constraint 4 — From the Monte Carlo:**

$\mathcal{K}_A$ is falsified empirically. If the field theory produces $\mathcal{K}_A$, the T³ program is ruled out. If it produces $\mathcal{K}_B$, the program survives and the T³ construction provides a topological motivation for the MOND operator.

---

## The Minimal Derivation Path

**Step 1.** Fix Lorenz gauge $\partial_\mu A^{(i)\mu} = 0$ for each $i$.

**Step 2.** Write the CS propagator for each gauge field:

$$\langle A^{(i)}_\mu(p) A^{(i)}_\nu(-p) \rangle = \frac{2\pi}{k_i} \cdot \frac{\epsilon_{\mu\nu\rho}p^\rho}{p^2}$$

**Step 3.** Compute the one-loop correction to the $\phi$ propagator from each gauge field:

$$\Pi^{(i)}(p) = \int \frac{d^3q}{(2\pi)^3} \frac{\epsilon_{\mu\nu\rho}q^\rho}{q^2} \cdot \frac{\epsilon^{\mu\nu}{}_\sigma(p-q)^\sigma}{(p-q)^2}$$

**Step 4.** Sum over $i = 1, 2, 3$ and extract the IR behavior of $\sum_i \Pi^{(i)}(p)$ as $|p| \to 0$.

**Step 5.** Determine whether $\sum_i \Pi^{(i)}(p) \propto |p|^3$ (isotropic) or $\propto |p_1||p_2||p_3|$ (factored) at leading IR order.

This is a **standard one-loop Feynman diagram computation** in 3D CS theory. It is tractable by hand or with a CAS in approximately one to two days of focused work.

---

## Success Criteria

The computation succeeds — in either direction — if it produces:

**If $\mathcal{K}_B$:** A derivation showing the T³ triple CS theory generates the isotropic $|p|^3$ operator, providing a topological origin for the MOND kinetic term. The $a_0$ prediction problem and the RAR consistency both survive. Genuine progress.

**If $\mathcal{K}_A$:** A proof that the factored form is unavoidable, combined with the Monte Carlo falsification, constitutes a **clean kill** of the T³ MOND program. The route is closed, the reason is precise, and the computation record is complete.

**Either outcome is publishable.** A clean negative result with a precise falsification mechanism is more valuable than an unchecked positive claim.

---

## Resolution
Deepest reason: integrating out A_mu under minimal coupling generates current-current interactions quartic in phi, not quadratic. The kill is structural, not perturbative.

**Result (March 2026):** The one-loop computation yields $\Pi^{(i)}_{\text{scalar}} = 0$ for all three CS gauge fields under minimal coupling. The effective scalar kinetic operator remains $p^2$. Neither $\mathcal{K}_A$ nor $\mathcal{K}_B$ is generated. The route is closed. The Monte Carlo characterization of $|p_x||p_y||p_z|$ remains valid as a geometric result but is not connected to this field theory. A modified construction with multiplicative gauge coupling would generate $\mathcal{K}_A$, which is independently falsified by the angular PDF computation. No viable path to $\mathcal{K}_B = |p|^3$ from this action has been identified.

**Deepest reason (from audit):** Integrating out $A_\mu$ under minimal coupling generates current-current interactions quartic in $\phi$, not quadratic. No modification to the quadratic kinetic operator is possible at any loop order under minimal coupling alone. The kill is structural, not perturbative.

---

## What Is Not Required

- No galaxy data
- No SPARC fitting
- No free parameter tuning
- No new physics beyond standard CS theory in 3D

The computation is pure field theory. The observable consequence has already been established by the Monte Carlo. The field theory derivation either validates or kills the program at the operator level.

---

## Competing Programs for Context

If this route fails (i.e., $\mathcal{K}_A$ is derived and confirmed falsified), the closest surviving alternative with similar motivation is the Skordis-Złośnik covariant MOND theory, which produces $|p|^3$-type behavior in the non-relativistic limit from a scalar-vector-tensor action without the factorization problem. The T³ program would be superseded by but not unrelated to that framework.

---

*This document records the precise state of a computational thought experiment conducted March 2026. All Monte Carlo results are reproducible from* `triple_cs_rotavg.py`. *The field theory computation in Steps 1–5 above is the outstanding task.*

---

## Computation Provenance

All numerical results in this document were produced by iterative Monte Carlo computation in pure Python, no external dependencies. The key results and their derivation sequence:

| Result | How obtained | Verifiable? |
|---|---|---|
| $\mathcal{C}_\infty = 1/4\pi$ | Monte Carlo + analytical confirmation | Yes — closed form |
| $k_{\text{var}}^\infty = 4\pi/\sqrt{70}$ | Monte Carlo + analytical derivation | Yes — closed form |
| $\alpha = 0.916$ | Binned avg_nz power-law fit | Numerical, reproducible |
| $P(X > 2\langle X\rangle) = 0.121$ | Angular PDF sampling | Numerical, reproducible |
| $a_0$ prediction within 9–17% | Candidate 2 formula, avg_all IR factor | Numerical, reproducible |

Script: `triple_cs_rotavg.py`  
CSV outputs: `triple_cs_rotavg.csv`, `_shells.csv`, `_bins.csv`, `_hist.csv`  
Conducted: March 2026

---