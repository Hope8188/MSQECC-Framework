# Build Prerequisites

Validated on 2026-03-06 from the checked-in manifests and successful local build commands below.

## Desktop App

- Node.js 20.x
- npm 10.x
- Rust stable MSVC toolchain
- Visual Studio C++ Build Tools on Windows
- WebView2 runtime
- Tauri CLI v2 via `@tauri-apps/cli`
- Microsoft Edge installed locally for the Playwright smoke lane
- WiX Toolset and NSIS available on PATH for Windows bundle generation

## Desktop Verification Commands

```powershell
Set-Location Lumina
npm ci
npm test
npm run test:e2e
npm run build
cargo test --manifest-path src-tauri/crates/lumina-privacy/Cargo.toml
cargo test --manifest-path src-tauri/crates/lumina-vault/Cargo.toml
cargo test --manifest-path src-tauri/Cargo.toml --lib
$env:CARGO_TARGET_DIR = "C:\Users\HomePC\Desktop\New folder\msqecc\Lumina\Lumina\src-tauri\target"
npm run tauri build
```

## Packaging Prerequisite

The current repo layout stores the actual Tauri project under `Lumina/src-tauri`, while the Git root sits one level higher. Tauri v2 plugin permission generation resolved one intermediate path against the outer repo root during Windows packaging, so a root-level `src-tauri` alias is required before `npm run tauri build`.

```powershell
Set-Location C:\Users\HomePC\Desktop\New folder\msqecc\Lumina
if (-not (Test-Path src-tauri)) {
  New-Item -ItemType Junction -Path src-tauri -Target (Join-Path $PWD 'Lumina\src-tauri') | Out-Null
}
```

With that alias in place, the validated bundle outputs are:

- `Lumina/src-tauri/target/release/lumina.exe`
- `Lumina/src-tauri/target/release/bundle/msi/Lumina AI_1.0.0_x64_en-US.msi`
- `Lumina/src-tauri/target/release/bundle/nsis/Lumina AI_1.0.0_x64-setup.exe`

## Website

- Node.js 20.x
- npm 10.x

```powershell
Set-Location Lumina\website
npm ci
npm run build
```

## AI Runtime

- Ollama running locally on `http://127.0.0.1:11434`
- A locally available model matching the app expectation (`lumina-core`; README also references Qwen 2.5:7b)

## Native Dependencies Used by the Rust Backend

- SQLite via bundled `rusqlite`
- TTS subsystem support
- Screen capture support
- Input automation support
- WebAssembly runtime support via `wasmtime`

## Packaging Notes

- Tauri config targets all bundle formats, with WiX and NSIS validated locally on Windows.
- The updater plugin is enabled and references a remote JSON endpoint.
- The desktop smoke test uses the installed Edge channel instead of downloading a Playwright-managed browser.
- The website build currently emits a large-chunk warning only; it does not fail the production build.
