# MSQECC Routing Schema & "Living Laboratory" State Machine

**Core Philosophy:** The MSQECC website is NOT a promotional brochure. It is a "Living Laboratory." Its sole purpose is to empower visitors (skeptical physicists, quantum information theorists, astrophysicists) to falsify or validate MSQECC themselves. Transparency, reproducibility, and interactive verification are paramount.

## The Architecture Map (React Router v6)

### `/ (Home: The Empirical Claim)`
- **Headline:** "The Universe Is a Quantum Error-Correcting Code. Here Is the Data."
- **Layout Element:** `<MainLayout>` (Contains the global custom cursor, the `<ReactLenis>` wrapper, the fixed `NavBar`, and the `TelemetryTicker`).
- **Background Element:** The global R3F `<Canvas>` displaying the tensor network (1/D² Noise Torus).
- **Core Components:**
  - **Key Metrics Dashboard:** Live counters for "Galaxies Fit (171)", "Global R² (0.82)", "Universal Constants (2)", "Null Results Confirmed (3)".
  - **Download Zone:** High-visibility magnetic buttons for "Paper v8 (PDF)", "Supplementary Code (ZIP)", and "SPARC Data Pre-processed".

### `/theory (The Axioms)`
- **Content:** The formalized theoretical framework.
- **Core Components:**
  - Embedded / formatted finalized **MSQECC Version VIII: The Empirical Era** paper.
  - **Interactive Derivation Tree:** A visual node graph showing how each equation links back to the Five Foundations.
  - **Appendix B (Open Problems):** An explicit, honest list of what is *not* proven (Hardware Confirmation, First-Principles $k$).

### `/reproducibility (Data & Code)`
- **Content:** The execution layer for independent verification.
- **Core Components:**
  - Links to GitHub/GitLab repositories.
  - Docker container / Google Colab script links for zero-dependency SPARC analysis.
  - Readme/terminal instructions for the `quantum_noise_test.py` script execution on IBM/IonQ hardware.

### `/verification (The Challenge)`
- **Content:** An invitation to the physics community to break the theory.
- **Core Components:**
  - **"How to Falsify MSQECC":** The 3 Kill Switches (Proton Decay, Axion Detection, Lorentz Violation).
  - **Bug/Flaw Submission Form:** For reporting mathematical or empirical errors.
  - **Null Result Tracker:** A live dashboard tracking days since last axion observation, Super-K proton decay limits, and Fermi-LAT LIV results.

### `/lab (Interactive Tests & Scrollytelling)`
This route contains the 5 primary interactive widgets constructed with R3F, GSAP, and standard React state:
1.  **The Galaxy Rotation Curve Calculator:** Dropdown selection for SPARC galaxies. Dynamically plots MSQECC vs. NFW vs. Observed. Includes the `<Slider>` to tune $k$.
2.  **The Quantum Noise Simulator:** Side-by-side heatmaps of Classical vs. MSQECC Noise.
3.  **The Constant Optimizer:** A lightweight, browser-based $k$ and $C$ tuner to challenge the $R² = 0.82$ score.
4.  **Tensor Network Visualizer:** R3F visualization of the HaPPY code edge stress.

## Target Audience Persona: The Skeptical Physicist
- **Who they are:** Researchers, postdocs, quantum computing engineers. They receive crackpot emails daily.
- **What they want:** The data, the math, and the code. They want to see where it fails.
- **Design Response:** Zero marketing speak. "Only knowledge matters." If clicking a button doesn't reveal a dataset, a mathematical derivation, or an empirical graph, the button shouldn't exist. All transitions must feel like accessing a sterile, highly-advanced terminal.
