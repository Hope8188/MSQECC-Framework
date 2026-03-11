# Lumina App: The User Portal Guidelines (Liquid Sovereignty)

## 0. The Mission: Human-Centric Sovereignty
The **Lumina Horizon App** is the interface for the modern elite—users who demand the privacy of a vault with the fluidity of a high-end luxury watch. We move away from "scary" terminology toward **Human-Centric Sovereignty**.

## 1. Aesthetic Identity: "Liquid Sovereignty"
1.  **Palette: The Horizon System**
    *   **Void Ground:** `#030303` (Deep, ergonomic black).
    *   **Electric Cyan:** `#00f3ff` (Clarity, Energy — Primary accent).
    *   **Soft Violet:** `#a78bfa` (Intelligence, Depth — Secondary accent).
    *   **Emerald Signal:** `#10b981` (Completion, Stability — Success states).
    *   **Rose Quarantine:** `#f43f5e` (Alert, Air-Gap — Danger states).
    *   **Amber Shield:** `#f59e0b` (Isomorphic Vault — Protection states).
    *   **Indigo Core:** `#6366f1` (System Vitals — Hardware metrics).
    *   **Fuchsia Control:** `#ec4899` (Settings — Configuration states).

2.  **Typography Strategy (The Prestige Stack)**
    *   **Primary Display:** `Inter` (Sans-serif) — Bold, tracking `-0.04em`.
    *   **Scientific Backing:** `Cormorant Garamond` (Italic) — For neural insights.
    *   **Data/Telemetry:** `JetBrains Mono` — For all IPC streams, hashes, and metrics.

3.  **Micro-Typography**
    *   Section labels: `text-[9px] font-bold uppercase tracking-[0.25em] text-white/30`
    *   Data values: `text-[10px] font-mono font-bold` with accent color
    *   Descriptive text: `text-[11px] text-white/35 leading-relaxed`

## 2. Interactive Standards: "Digital Mercury"
1.  **The "Resonance Orb":** Animated ambient glow (cyan → violet gradient) shown in empty chat state. Pulsing at 7s cycle with 25s/18s orbital rings.
2.  **Sovereign Cursor:** Custom hardware-accelerated cursor replacing OS default. 4px white dot with 20px orbital ring, mix-blend-difference for universal visibility.
3.  **Tab Transitions:** All panel switches use `framer-motion` AnimatePresence with Y-axis micro-slides (6px offset, 220ms duration).
4.  **Toast Notifications:** Auto-Defcon system — context-aware rose/cyan pill notifications with 3s auto-dismiss.

## 3. Visual Depth & "Lunar Frost" Glass
- **Morphic Glass:** `backdrop-filter: blur(40px) saturate(200%)`.
- **Surface Texture:** 3.5% opacity grain overlay (`grainy-gradients.vercel.app/noise.svg`).
- **Ambient Glows:** Radial gradients in top-left (cyan) and bottom-right (violet) corners.
- **Glass Borders:** `rgba(255,255,255,0.08)` — Never solid white borders.
- **Card Backgrounds:** `rgba(255,255,255,0.02)` — Nearly invisible glass panels.

## 4. Navigation Architecture
7 primary tabs in sidebar, each with unique color identity:
| Tab | Icon | Color | Purpose |
|---|---|---|---|
| Neural Hub | Activity | `#00f3ff` | AI chat + inference |
| Ouroboros Swarm | Layers | `#4ade80` | Recursive dialectic agency |
| Event Horizon | User | `#a78bfa` | LoRA identity sealing |
| Isomorphic Apps | Shield | `#f59e0b` | App isolation vault |
| System Vitals | Cpu | `#6366f1` | Hardware telemetry |
| 4D Resources | LayoutList | `#10b981` | Task topography |
| Settings | SlidersHorizontal | `#ec4899` | Air-gap & engine config |

## 5. Psychology: "Security is a Luxury"
*   **Minimalism is Power:** Only show what is necessary.
*   **Tactile Reassurance:** Every action triggers a subtle visual "echo" (glow, toast, animation).
*   **Zero Fear:** Security status shown as green "SEALED" badges, not red warnings.
*   **Confidence Through Transparency:** Runtime logs, entropy scores, and convergence percentages visible but unobtrusive.

## 6. The Silicon Synthesis Rules
- **Local Autonomy:** No component may initiate a network request without passing through the Rust-boundary syndrome seal.
- **Hardware-Native State:** UI metrics must reflect real hardware polls (Vitals tab), never mock data in Tauri mode.
- **Persistent Context:** Every user session is logged as a Syndrome in the SQLite vault.
- **Air-Gap Compliance:** When isAirGapped is true, no network requests are permitted from any UI component.
- **Zero Telemetry:** The phrase "ZERO TELEMETRY" must appear in the chat input footer.
