# Pending Tasks and Future Execution Plan — Lumina AI

## 📊 Project Assessment (2026-03-07)

Lumina has stabilized into a testable Tauri desktop application. The core vision of "Zero-Telemetry, Ring-0 Sovereign Local Intelligence" is functionally present but requires significant optimization to reach production performance targets.

### ✅ Completed Milestones
- **Single-instance launch guard:** Added native single-instance enforcement so relaunch focuses the existing main window instead of appearing unresponsive.
- **Window controls fallback:** Minimize/close/focus now have a backend command fallback when frontend window API fails.
- **Wake command reliability:** Voice wake parser now accepts direct `lumina ...` phrases without greeting prefixes.
- **Branding Rewrite:** Pure black identity, white starburst logo, and removal of cluttered visuals ("black hole") in favor of depth-first aesthetics.
- **Model Stabilization:** Found and aliased `qwen2.5:7b` as `lumina-core` to ensure zero-config first boot.
- **Desktop Vitals:** Functional mini-dash for CPU/RAM and "Event Horizon" identity tracking.
- **IPC Safety:** Framework-isolated command group for file IO, search, and shell execution.
- **Neural tuning controls:** Added Settings controls for context window, max tokens, and thread count persisted through local settings and consumed by backend inference options.

### ⚠️ Critical Friction (Immediate Action Required)
- **High Latency:** Inference is hitting 79s on CPU. Need to implement GPU acceleration layers or aggressive prompt distillation.
- **Resource Pressure:** Frequent `System::new_all()` calls in the backend are causing CPU spikes unrelated to inference.
- **Monolithic Debt:** `lib.rs` and `App.tsx` are still over-extended. 

---

## 🚀 Immediate Roadmap (Phase 2 & 3 Evolution)

### 1. [PERFORMANCE] GPU-Accelerated Inference Path
- **Task:** Update `lib.rs` to detect Vulkan/Metal/CUDA availability.
- **Goal:** Shift from CPU-only generation (1.8 tok/s) to GPU (target 45 tok/s).
- **Sub-task:** Add a "Neural Tuning" settings panel to allow users to toggle quantization (4-bit vs 8-bit) and context window limits.

### 2. [STRUCTURE] Capability-Based Modularization
- **Task:** Split `lib.rs` into `src-tauri/src/ai/`, `src-tauri/src/system/`, and `src-tauri/src/fs/`.
- **Task:** Split `App.tsx` into `/src/panels/` (HubPanel, VitalsPanel, MorphPanel).
- **Impact:** Reduces build times and prevents "App.tsx" from becoming a maintenance bottleneck.

### 3. [UX] Real-Time Response Optimization
- **Task:** Implement 'Thinking' animation that reflects actual model internal reasoning tags (`<thinking>`).
- **Task:** Implement response streaming directly into the `ChatComposer` to reduce perceived latency.

### 4. [SECURITY] Ring-0 Hardening
- **Task:** Implement the "Context-Aware Defcon" logic: sever network handles automatically when sensitive folders (ssh, env, pem) are in focus.
- **Task:** Sandbox all `shell_execute` calls through a confirmation shim unless the app is in "Fused Mode".

---

## 🔮 Future Execution Vector (Phase 4+)

### MSQECC Intelligence Layer
- **Cognitive Shield:** Finalize the H-Neuron suppression algorithm to filter out model hallucinations at the token stream level.
- **Quantum Sovereignty:** Move beyond Kyber seeds to full encrypted session storage where the database key is derived from hardware entropy (the "Lattice Mode").

### Distribution & Packaging
- **Windows CI:** Set up GitHub Actions for automated MSI generation.
- **Update Channel:** Operationalize the `update.json` path for seamless local core patches.

### Measured Baselines
| Metric | Current | Target |
| :--- | :--- | :--- |
| First Token Latency | ~4500ms | <800ms |
| Generation Rate | 1.88 tok/s | 45.0+ tok/s |
| Idle CPU Usage | 12% | <2% |
| Memory Footer | 2GB | <512MB (Base) |

---

## 🛠️ Execution Loop
1. **Optimize Hardware Polling:** Reduce `System` refreshes to save CPU.
2. **Refactor IPC Boundary:** Strictly typed TypeScript interfaces for all responses.
3. **Verify via Benchmark:** Run `scripts/benchmark-ollama.ps1` after every logic change.

---
*Created by Antigravity Autonomous Engineering Unit*
