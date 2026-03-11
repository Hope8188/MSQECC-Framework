# System Map

Generated: 2026-03-06 17:50:07 +03:00

## Stack

- Desktop app: Tauri v2 + React 19 + TypeScript
- Native backend: Rust (`src-tauri/src/lib.rs`)
- Website: React 18 + Three.js marketing/download surface
- Persistence: SQLite in the Tauri app data directory
- Local AI runtime: Ollama on `127.0.0.1:11434`

## Entrypoints

- Desktop UI: `src/main.tsx` -> `src/App.tsx`
- Desktop native runtime: `src-tauri/src/main.rs` -> `lumina_lib::run()`
- Website: `website/src/main.tsx` -> `website/src/App.tsx`
- IPC boundary: `src/ipc.ts`

## Desktop Architecture

1. React UI renders the desktop shell and drives all user actions from `src/App.tsx`.
2. `src/ipc.ts` exposes typed wrappers over Tauri `invoke(...)`.
3. Rust commands in `src-tauri/src/lib.rs` implement hardware state, privacy controls, AI inference, OS actions, WASM execution, clipboard, file search/export, updater checks, and search commands.
4. `LuminaEngine` owns SQLite state, memory buffers, HTTP client access, and privacy counters.
5. Tauri events stream token updates and status back to the UI.

## AI Call Graph

- `processQuery()` -> `lumina_process_query`
- `executeSwarmRecursion()` -> `execute_swarm_recursion`
- `pushIMUAction()` -> `push_imu_action`
- `sealEventHorizon()` -> `seal_event_horizon`
- `webSearch()` -> `lumina_web_search`
- `executeWasmPlugin()` -> `execute_wasm_plugin`

## Sensitive Native Surfaces

- `shell_execute`: opens arbitrary commands/URLs through the OS shell
- `lumina_evolve_app`: performs direct file content replacement
- `execute_motor_action`: native mouse and typing control
- `capture_vision_syndrome`: screen capture
- `get_recent_files` and `search_files`: filesystem inspection
- `lumina_check_for_updates`: external update endpoint
- `lumina_web_search`: external network fetch and HTML scraping

## Windows Packaging Notes

- Tauri config targets `all` bundles with a transparent undecorated desktop window.
- Packaging expects Tauri/Rust prerequisites plus the web frontend build to populate `dist/`.
- The app presents itself as offline-first, but config currently allows updater traffic and an optional web-search path.This is intentional as what if ai needs to pull uptodate info from the web

## Repo Hygiene Notes

- No `plans/` directory existed before this pass.
- The current git worktree root is above this workspace, so `git status` shows sibling-project changes that this directory alone cannot fully normalize.
- Temporary build logs and Vite timestamp files were present and should remain ignored going forward.
