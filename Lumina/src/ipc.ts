// ============================================================================
// TAURI IPC BRIDGE — WITH WEB FALLBACK FOR VERCEL DEPLOYMENT
// ============================================================================
// When running inside Tauri (desktop/mobile), this uses real Rust IPC.
// When running in a browser (Vercel), this gracefully returns mock data
// so the UI renders correctly as a live demo / showcase.
// ============================================================================

interface HardwareState {
    cpu_usage_percent: number;
    ram_used_mb: number;
    ram_total_mb: number;
    ram_usage_percent: number;
    uptime_seconds: number;
}

interface LuminaStatus {
    version: string;
    mode: string;
    security_state: string;
    hardware: HardwareState;
    syndrome_count: number;
    morphic_resonance: number;
}

// Detect if we're running inside Tauri or in a standard browser
function isTauri(): boolean {
    return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

// ---------------------------------------------------------------------------
// Web Demo Fallback (for Vercel / browser preview)
// ---------------------------------------------------------------------------

let mockUptime = 0;
const MOCK_RESPONSES = [
    "[ Lumina MSQECC Core :: Web Demo Mode ]\nThis is a browser preview. In the native desktop/mobile app, this response comes from the local Rust LLM engine running 100% offline.\n\nNo data was transmitted to any server.",
    "[ Lumina MSQECC Core :: Sovereign Architecture ]\nThe full Lumina Symbiote operates on a Tauri v2 framework:\n• Rust backend: Zero-Trust IPC boundary\n• React frontend: Glassmorphism UI\n• llama.cpp: Local LLM inference (GBNF grammar-bounded)\n• SQLite: Syndrome vector storage\n\nAll computation happens on YOUR device. Zero cloud dependency.",
    "[ Lumina MSQECC Core :: MSQECC Topology ]\nMSQECC (Multi-Scale Quantum Error Correction Code) applies the mathematics of black hole information theory to classical software:\n\n• O(N) attention scaling (vs O(N²) standard transformers)\n• Topological process scheduling (0ms perceived app launch)\n• Syndrome-based security (mathematical impossibility of data breach)\n• Overnight LoRA self-evolution (AI adapts to YOU over years)",
];
let responseIndex = 0;

function getMockHardwareState(): HardwareState {
    mockUptime += 2;
    return {
        cpu_usage_percent: 8 + Math.random() * 15,
        ram_used_mb: 280 + Math.floor(Math.random() * 40),
        ram_total_mb: 2048,
        ram_usage_percent: (280 + Math.random() * 40) / 2048 * 100,
        uptime_seconds: mockUptime,
    };
}

function getMockStatus(): LuminaStatus {
    return {
        version: "0.1.0-web-demo",
        mode: "WEB_PREVIEW",
        security_state: "TOPOLOGICAL_SEALED",
        hardware: getMockHardwareState(),
        syndrome_count: Math.floor(Math.random() * 50),
        morphic_resonance: Math.random() * 0.3,
    };
}

function getMockResponse(input: string): string {
    const r = MOCK_RESPONSES[responseIndex % MOCK_RESPONSES.length];
    responseIndex++;
    return `${r}\n\nYour query: "${input}" (${input.length} bytes)\nLatency: ${Math.floor(Math.random() * 50 + 10)} μs (simulated)`;
}

// ---------------------------------------------------------------------------
// PUBLIC API (auto-switches between Tauri and Web)
// ---------------------------------------------------------------------------

export async function getLuminaStatus(): Promise<LuminaStatus> {
    if (isTauri()) {
        const { invoke } = await import("@tauri-apps/api/core");
        return invoke<LuminaStatus>("get_lumina_status");
    }
    return getMockStatus();
}

export async function processQuery(input: string): Promise<string> {
    if (isTauri()) {
        const { invoke } = await import("@tauri-apps/api/core");
        return invoke<string>("process_query", { input });
    }
    // Simulate processing delay for web demo
    await new Promise((r) => setTimeout(r, 300 + Math.random() * 400));
    return getMockResponse(input);
}

export { isTauri };
export type { HardwareState, LuminaStatus };
