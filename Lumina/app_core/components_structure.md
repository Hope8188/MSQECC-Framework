# Lumina App: Component Structure

## Current Architecture (v0.1.0-horizon)

```
Lumina/
├── src/                        ← Tauri frontend (React 19, native app)
│   ├── App.tsx                 ← Main app shell (985 lines):
│   │                             SovereignCursor, ResonanceOrb, StatBar, AppTile,
│   │                             SwarmNode, DropZone, App (root)
│   │                             7 tabs: HUB, SWARM, GHOST, MORPH, VITALS, TASKS, SETTINGS
│   ├── App.css                 ← Glassmorphism tokens, animations, drag regions, scrollbar styles
│   ├── ipc.ts                  ← IPC bridge: Tauri invoke ↔ Native Rust & Web fallback
│   │                             10 functions: getLuminaStatus, processQuery, getSpatialState,
│   │                             captureVision, executeSwarmRecursion, pushIMUAction,
│   │                             sealEventHorizon, executeMotorAction, isTauri
│   └── main.tsx                ← React root mount
├── src-tauri/
│   ├── src/lib.rs              ← Rust core (436 lines):
│   │   ├── SovereignEngine     ← Unified state: DB, HTTP client, spatial tracker, swarm context,
│   │   │                         IMU buffer, resonance history
│   │   ├── get_hardware_state  ← Live CPU%, RAM MB, uptime via sysinfo
│   │   ├── get_spatial_state   ← RuView WiFi CSI variance simulation
│   │   ├── process_query       ← Ollama/Qwen bridge with memory persistence
│   │   ├── execute_swarm_recursion  ← Ouroboros dialectic (Thesis/Antithesis/Synthesis)
│   │   ├── push_imu_action     ← IMU micro-tremor pre-cognition analysis
│   │   ├── seal_event_horizon  ← LoRA conservation of user behavioral resonance
│   │   ├── capture_vision_syndrome  ← Screen capture via xcap
│   │   ├── execute_motor_action     ← Native RPA via enigo
│   │   └── get_lumina_status   ← Aggregated system state
│   ├── Cargo.toml              ← Rust deps: tauri 2, sysinfo, rusqlite, enigo, xcap,
│   │                             rodio, reqwest, tokio, chrono, uuid, rand, zeroize, secrecy
│   └── tauri.conf.json         ← App config: id=com.horizon.lumina, 1280×850, transparent,
│                                  frameless, CSP with Ollama connect-src
├── website/
│   └── src/App.tsx             ← Marketing website (1074 lines): All pages in single file
├── Lumina_AI_Setup.ps1         ← PowerShell script: Ollama install → Qwen pull → lumina-core forge
├── app_core/                   ← Documentation
│   ├── guidelines.md           ← Aesthetic identity & interaction standards
│   ├── components_structure.md ← (this file)
│   ├── research.md             ← Research strategy & competitive analysis
│   ├── resource.md             ← Asset & dependency registry
│   └── tasks.md                ← Phase tracking (12 phases)
└── archive/                    ← 19 architectural blueprints (files 11-29)
```

## Native App Components

### `<App>` — Root Container (985 lines)
- Full-height, `overflow-hidden`, `bg-[#030303]`
- Contains: `<SovereignCursor>`, grain overlay, ambient glows, `<aside>` sidebar, `<main>` content
- State: 14 useState hooks managing status, messages, tabs, swarm, spatial, prediction, ghost, air-gap, toast

### `<SovereignCursor>`
- Hardware-accelerated `translate3d` cursor with `will-change-transform`
- Replaces default OS cursor via `cursor: none` globally
- Mix-blend-mode difference for universal visibility

### `<ResonanceOrb>`
- Animated ambient glow shown in the empty chat state
- `framer-motion` pulsing gradient (cyan → violet) at 7s cycle
- Rotating orbital rings at 18s and 25s periods

### `<StatBar>`
- Reusable animated progress bar for hardware metrics
- Custom color, label, value, and unit display

### `<SwarmNode>`
- Visualizes a single Ouroboros dialectic node
- Color-coded left border: Thesis (cyan), Antithesis (red), Synthesis (violet)
- Entropy progress bar with percentage label

### `<AppTile>` — Isomorphic App Card
- Three states: sealing (progress bar), sealed (stats), failed (error)
- Hover-reveal close button
- Stats: Net calls blocked, data leaked

### `<DropZone>` — Drag & Drop Interface
- Drag-over visual feedback with cyan highlight
- File input fallback for click-to-upload
- Supports: `.exe`, `.apk`, `.app`, `.dmg`, `.AppImage`, `.deb`, `.rpm`

### `<aside>` — Sidebar (260px)
- Logo: Command icon + "Lumina / Sovereign OS" wordmark
- 7 navigation buttons: HUB, SWARM, GHOST, MORPH, VITALS, TASKS, SETTINGS
- Live Status mini-panel: CPU/RAM bars + sealed indicator + uptime
- Bottom: User + Settings icon buttons + version number

### `<main>` — Content Area
- **Header bar:** Active tab icon+label + Predicted Intent + Lock icon + "RING-0 SECURE" status
- **7 Tab Panels:**
  1. `HUB` — Neural Hub AI chat with suggested prompts + input bar
  2. `SWARM` — Ouroboros visualization + convergence graph + RuView spatial display
  3. `GHOST` — Event Horizon LoRA sealing with resonance metrics
  4. `MORPH` — Isomorphic Vault with drop zone + app grid + stats
  5. `VITALS` — CPU/RAM cards + security state + runtime log
  6. `TASKS` — 4D Resource Topography three-column Kanban
  7. `SETTINGS` — Air-Gapped toggle + inference engine backend selector

### Toast Notification System
- Auto-Defcon toast appears bottom-center on Air-Gap toggle
- Animated entry/exit via `framer-motion` AnimatePresence
- Context-aware styling: rose (air-gapped) or cyan (online)

## Global State (Native App)
```ts
status: LuminaStatus | null       // polled every 3s via IPC
messages: ChatMessage[]            // AI conversation history
input: string                      // current chat input value
isProcessing: boolean              // blocks double-send during IPC call
activeTab: 'HUB' | 'MORPH' | 'VITALS' | 'SWARM' | 'GHOST' | 'TASKS' | 'SETTINGS'
swarmPulse: SwarmPulse | null      // Ouroboros swarm state
spatial: SpatialState | null       // RuView spatial presence
prediction: PreCognitionSyndrome | null  // IMU pre-cognition intent
ghostStatus: LoRATransform | null  // Event Horizon seal result
resonance: ResonanceProfile        // User behavioral metrics
wrappedApps: WrappedApp[]          // Isomorphic vault app list
totalDropped: number               // Total blocked network calls count
isAirGapped: boolean               // Air-Gapped quarantine mode state
toastMessage: string | null        // Active toast notification text
```

## IPC Contract (lib.rs ↔ ipc.ts)
| Rust Command | TypeScript Function | Return Type |
|---|---|---|
| `get_lumina_status` | `getLuminaStatus()` | `LuminaStatus` |
| `get_hardware_state` | (internal) | `HardwareState` |
| `process_query` | `processQuery(input)` | `string` |
| `get_spatial_state` | `getSpatialState()` | `SpatialState` |
| `capture_vision_syndrome` | `captureVision()` | `VisionSyndrome` |
| `execute_swarm_recursion` | `executeSwarmRecursion(goal)` | `SwarmPulse` |
| `push_imu_action` | `pushIMUAction(data)` | `PreCognitionSyndrome` |
| `seal_event_horizon` | `sealEventHorizon(profile)` | `LoRATransform` |
| `execute_motor_action` | `executeMotorAction(type, x, y, text?)` | `string` |

## Persistent State (SQLite)
- **Database:** `lumina_memory.db` (app data directory)
- **Table: `memories`**
  - `id` TEXT PRIMARY KEY (UUID v4)
  - `timestamp` DATETIME (RFC3339 string)
  - `input` TEXT
  - `response` TEXT
  - `latency_ms` INTEGER

## Design Tokens (from App.css)
```css
--bg-primary: #030303
--bg-secondary: #0a0a0c
--accent-cyan: #00f3ff
--accent-violet: #a78bfa
--glass-border: rgba(255,255,255,0.08)
--radius-xl: 40px
--radius-lg: 32px
--radius-md: 24px
```
