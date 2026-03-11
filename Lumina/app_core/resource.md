# Lumina Horizon: Resource Registry

## 1. Core Intelligence Assets
- **Foundational Model:** `qwen2.5:7b` (4.7GB GGUF, local Ollama managed)
- **Personality Layer:** `lumina-core` (Forged via LuminaModelfile after download)
- **Database Vault:** `lumina_memory.db` (SQLite, auto-created in app data dir)
- **Setup Script:** `Lumina_AI_Setup.ps1` (PowerShell: Ollama install → Qwen pull → personality forge)

## 2. Native Rust Dependencies (Ring-0 Binding)
| Crate | Version | Purpose |
|---|---|---|
| `tauri` | 2.x | Application framework (desktop + mobile) |
| `tauri-plugin-opener` | 2.x | URL/file opening plugin |
| `tokio` | 1.x (full) | Async runtime for concurrent operations |
| `sysinfo` | 0.33 | Live CPU/RAM/uptime hardware telemetry |
| `rusqlite` | 0.32 (bundled) | SQLite memory vault persistence |
| `enigo` | 0.2 | Native mouse/keyboard RPA automation |
| `xcap` | 0.0.12 | Screen capture for Vision Syndrome |
| `rodio` | 0.19 | Audio playback for resonance signals |
| `reqwest` | 0.12 (json) | HTTP client for Ollama API bridge |
| `chrono` | 0.4 (serde) | Timestamp serialization (RFC3339) |
| `uuid` | 1.x (v4, serde) | Unique ID generation for memories/nodes |
| `rand` | 0.9 | RNG for RuView spatial variance simulation |
| `zeroize` | 1.x | Secure memory wiping (Zero-Trust) |
| `secrecy` | 0.8 | Secret value containers |
| `serde` | 1.x (derive) | Serialization/deserialization of IPC structs |
| `serde_json` | 1.x | JSON encoding/decoding |

## 3. Frontend Visual Manifold
| Dependency | Version | Purpose |
|---|---|---|
| React | 19 | UI component framework |
| TypeScript | 5.8 | Type safety |
| Vite | 7.3 | Build tool & dev server |
| Tailwind CSS | 4.x | Utility-first styling |
| Framer Motion | 11.x | Animations & transitions |
| Lucide React | 0.454 | Icon library (27 icons used) |
| clsx + tailwind-merge | 2.x | Conditional class merging |

## 4. Typography Stack
- **Primary Display:** `Inter` (Sans-serif, weights 300-700)
- **Data/Telemetry:** `JetBrains Mono` (Monospace, weights 400-500)
- **Scientific Backing:** `Cormorant Garamond` (Serif, italic accents)

## 5. Distribution Manifest
| Platform | Format | Status |
|---|---|---|
| Windows | `Lumina_0.1.0_x64_en-US.msi` | ✅ Compiled |
| Android | `Lumina_Android.apk` | 🔲 Requires ANDROID_HOME SDK |
| macOS | `Lumina_macOS.dmg` | 🔲 Requires macOS build env |
| Linux | `Lumina.AppImage` | 🔲 Requires Linux runner |

## 6. External Services
| Service | Endpoint | Mode |
|---|---|---|
| Ollama API | `http://127.0.0.1:11434/api/generate` | Local only, never external |
| Google Fonts | `fonts.googleapis.com` | CDN (Inter, JetBrains Mono) |
| Grain Texture | `grainy-gradients.vercel.app/noise.svg` | Static asset |
