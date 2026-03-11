# Repository Intelligence Map

Generated: 2026-03-06 17:50:07 +03:00

## Scope Loaded

- `src/`
- `src-tauri/src/`
- `website/src/`
- `package.json`
- `src-tauri/Cargo.toml`
- `src-tauri/tauri.conf.json`
- `README.md`

`plans/` did not exist during the initial scan, so this file establishes the planning surface referenced by the autonomous workflow.

## Repository Shape

- `src/`: primary Tauri desktop frontend in React 19 + TypeScript.
- `src-tauri/src/`: desktop backend in Rust, currently concentrated in a single large `lib.rs`.
- `website/src/`: separate React marketing/download surface.
- `app_core/`, `os_core/`, `archive/`: product plans, research, and blueprint documentation.

## Runtime Surfaces

- Desktop entry: `src/main.tsx` -> `src/App.tsx`.
- Desktop native entry: `src-tauri/src/main.rs` -> `src-tauri/src/lib.rs::run()`.
- Website entry: `website/src/main.tsx` -> `website/src/App.tsx`.
- IPC bridge: `src/ipc.ts` maps the React desktop UI to Tauri commands.

## Core Dataflows

1. Desktop UI actions call `src/ipc.ts`.
2. `src/ipc.ts` invokes Tauri commands in `src-tauri/src/lib.rs`.
3. `LuminaEngine` persists memory/settings in SQLite under the app data directory.
4. AI inference uses local Ollama over `http://127.0.0.1:11434/api/generate`.
5. Native commands can access clipboard, filesystem, OS launch, screen capture, TTS, and WASM execution.

## Immediate Risks

- Backend command surface is oversized and centralized in one file.
- Frontend UI is concentrated in a single very large `src/App.tsx`.
- No first-party test suite or benchmark harness is present.
- Root workspace contains temporary build logs and timestamped Vite files that obscure the actual working set.
- Git root is the parent folder, so workspace status includes sibling-project noise outside this directory.

## Initial Mission Sequence

1. Preserve current source edits.
2. Remove or ignore obvious local-only noise.
3. Establish docs/reports/CI/PR scaffolding.
4. Add tests-first harness before functional refactors.
