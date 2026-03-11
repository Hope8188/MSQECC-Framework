# Master Project Plan

Generated: 2026-03-06 17:50:07 +03:00
Updated: 2026-03-07 07:45:00 +03:00

## Mission

Stabilize Lumina as a testable Tauri desktop product with explicit repo intelligence, enforceable quality gates, and a clear separation between product code, generated artifacts, and research collateral.

## Current State

- Desktop runtime builds, tests, and packages successfully.
- The backend is partially modularized: storage/privacy moved into crates and the Tauri shell now splits shared models, engine state, and system metrics.
- The frontend now has extracted branding primitives (`LuminaBrand`) and `ChatComposer`, plus a centralized Tauri settings boundary, but `src/App.tsx` is still large.
- The website now builds with manual chunking and smoke coverage remains green, but the `three` chunk is still oversized.

## Measured Acceptance Baselines

- Desktop TS/Vite warm build: 28.2s
- Desktop TS/Vite cold-ish build: 57.6s
- Desktop UI smoke test: 36.0s
- Rust backend warm `cargo check -j 1`: 17.4s
- Full Windows packaging wall clock: 11m 03s
- Website production build: 41.6s

## Immediate Work Queue

1. `TD-001` Controlled Ollama benchmark harness is now in place.
   Owner: QA / Systems
   Deliver next: extend the harness to capture first-token latency, CPU, and memory, then publish multi-run baselines.

2. `TD-002` Continue splitting the Rust backend by capability.
   Owner: Backend
   Deliver: separate modules for AI, native actions, web search, and update surfaces.

3. `TD-003` Continue splitting the React desktop shell.
   Owner: Frontend
   Deliver: panel-level components and shared hooks for HUB, VITALS, and SETTINGS.

4. `TD-004` Lock down sensitive operations.
   Owner: Security
   Deliver: tests and policy around shell execution, self-editing, filesystem access, and network egress.

5. `TD-008` Reduce website bundle size and add smoke coverage.
   Owner: Frontend
   Deliver: manual chunking, smoke tests, and CI protection for the gateway app.

## Roadmap

### Phase 1

- Repo intelligence and cleanup
- Build prerequisites documentation
- Technical debt tracking
- Hygiene guardrails for logs/temp files

### Phase 2

- Tests-first harness
- Contract coverage on the IPC boundary
- Unit coverage for PII scrubbing, settings, and memory persistence
- Desktop UI smoke coverage

### Phase 3

- Modularization of `src/App.tsx` and `src-tauri/src/lib.rs`
- Benchmark harness and thresholds
- UI latency tests under mocked slow inference

### Phase 4

- Windows packaging validation in CI
- Release artifact discipline
- Measured benchmark baselines and regression gates

## Active Blockers

- Current app claims and actual network-capable features still need a product-level policy decision.
- The website bundle remains oversized.
- Full repo cleanliness is still constrained by the larger outer repo state and legacy deletions outside the app-only focus.


## 2026-03-07 Product Notes

- The desktop shell now has a proper new-chat action, frameless window controls, stronger keyboard shortcuts, and restored native pointer behavior.
- Wake phrase handling now exists in the app shell, with explicit microphone permission checks and typed wake-phrase interception for `hi/hey/ok lumina`.
- Current local inference is CPU-only (`size_vram: 0` from Ollama runtime inspection). That is the main blocker against the `45 tokens/sec` target.

## 2026-03-07 Execution Update (Current Session)

- Fixed IPC command contract mismatch for native shell execution (`shell_execute` now receives `command` from the frontend boundary).
- Added keyboard productivity shortcuts in desktop shell:
  - `Ctrl+N` for new chat
  - `Ctrl+Shift+Space` for summon/focus
- Normalized composer shortcut hint text to match actual behavior.
- Hardened web-preview inference fallback to probe both localhost endpoints and model aliases (`lumina-core`, `lumina-core:latest`, `qwen2.5:7b`) before failing.
- Upgraded Ollama benchmark harness with tunable runtime knobs and explicit timeout diagnostics.
- Restored a clean check lane for the modular Rust backend after fixing async command result typing.
