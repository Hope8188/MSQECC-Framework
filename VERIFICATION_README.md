# MSQECC Independent Verification Suite

Consistent with the requirement for rigorous mathematical falsifiability, this directory contains explicit zero-stochasticity proof scripts for the MSQECC (Macroscopic Space Quantum Error Correction Code) hypothesis.

Independent researchers are invited to run these scripts to verify our claimed $82.05\%$ global variance capture on the SPARC dataset, using strictly derived theoretical constants.

## Requirements
```bash
pip install numpy pandas scipy
```

## 1. Theoretical Derivation of the Gas Coherence Weight ($k$)
Instead of parameter-hunting, the thermodynamic boundary parameter $k$ is established explicitly from theoretical bounds (the thermal de Broglie wavelength boundary mapped by the holographic saturation rule).
**Run:**
```bash
python derive_k_theoretical.py
```
**Output:** Computes and verifies $k = 9.575$.

## 2. Empirical Verification on 171 Galaxies (SPARC)
This script applies the theoretical constant ($k = 9.575$) universally across all 171 SPARC galaxies and optimizes the singular global geometric scale parameter ($C$). 
*It intentionally restricts any per-galaxy fine-tuning.*
**Run:**
```bash
python verify_sparc_msqecc.py
```
**Anticipated Output:**
*   **Total Galaxies Processed:** 171
*   **Free Parameters per Galaxy:** 0
*   **Global Variance Capture ($R^2$):** $82.05\%$
*   **Variance Attributed to Environment:** $17.95\%$

## 3. Dissecting the 18% Residual (Environment Boundary Terms)
By running the environment diagnostics, researchers can evaluate the claim that the 18% residual error correlates with known galaxy clusters and local cosmic web entanglement (Environment Boundary terms), isolating "bad fits" from universal predictions.
**Run:**
```bash
python test_environmental_variance.py
```

## 4. Quantum Hardware Simulation (Active Falsifiability)
Provides visual and empirical confirmation of the MSQECC $1/D^2$ topological noise threshold. Simulates the classical noise dropout versus the macroscopic vacuum tail, establishing the required test parameters for upcoming IBM/IonQ superconducting arrays.
**Run:**
```bash
python simulate_3d_vs_2d_qecc.py
```
*Outputs: `quantum_breakthrough_simulation.png`*

---
*No numerology. No random bounds. Reproducible physics entirely defined by the topological error constraints of the $SU(3) \times SU(2) \times U(1)$ lattice phase.*
