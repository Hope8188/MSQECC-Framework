import { getSetting, invokeCommand, isTauriEnvironment, saveSetting } from "./tauri";

export interface HardwareState {
    cpu_usage_percent: number;
    ram_used_mb: number;
    ram_total_mb: number;
    ram_usage_percent: number;
    uptime_seconds: number;
}

export interface SpatialState {
    entropy_index: number;
    signal_variance: number;
    presence_detected: boolean;
}

export interface VisionSyndrome {
    screen_id: string;
    dimensions: [number, number];
    pixel_entropy: number;
}

export type DialecticMode = 'Thesis' | 'Antithesis' | 'Synthesis';

export interface OuroborosNode {
    id: string;
    mode: DialecticMode;
    payload: string;
    entropy: number;
}

export interface SwarmPulse {
    nodes: OuroborosNode[];
    convergence: number;
}

export interface IMUState {
    acc_x: number;
    acc_y: number;
    acc_z: number;
    gyro_x: number;
    gyro_y: number;
    gyro_z: number;
    timestamp: number;
}

export interface PreCognitionSyndrome {
    predicted_intent: string;
    confidence: number;
    latency_reduction_ms: number;
}

export interface ResonanceProfile {
    typing_cadence_ms: number;
    vocabulary_entropy: number;
    error_correction_rate: number;
    sentimental_resonance: number;
}

export interface LoRATransform {
    profile_id: string;
    timestamp: string;
    tensor_hash: string;
    status: string;
}

export interface WebSearchResult {
    title: string;
    link: string;
    snippet: string;
}

export interface EvolutionProposal {
    file_path: string;
    target_pattern: string;
    replacement: string;
    rationale: string;
}

export interface LuminaStatus {
    version: string;
    mode: string;
    security_state: string;
    hardware: HardwareState;
    spatial: SpatialState;
    memory_count: number;
    response_success_rate: number;
}

export interface PrivacyHealth {
    memories_stored: number;
    pii_scrubbed_count: number;
    network_calls_blocked: number;
    air_gapped: boolean;
    quarantine_level: string;
    data_leaked_bytes: number;
    vault_integrity: number;
    lattice_mode: string;
}

export interface FileMetadata {
    name: string;
    path: string;
    last_modified: number;
}

export interface QuantumSeed {
    public_key: string;
    entropy_seal: string;
    generation_timestamp: string;
}

export interface GlobalSyndrome {
    source_id: string;
    breakthrough_type: string;
    payload_hash: string;
    signature: string;
}

const isTauri = isTauriEnvironment;

export async function getLuminaStatus(): Promise<LuminaStatus> {
    if (isTauri()) {
        try {
            return await invokeCommand<LuminaStatus>("get_lumina_status");
        } catch (e) {
            console.error("Tauri status invoke failed:", e);
        }
    }

    return {
        version: "1.0.0-horizon (Web)",
        mode: "PRODUCTION_EMULATION",
        security_state: "VAULT_SEALED",
        hardware: {
            cpu_usage_percent: 1.5,
            ram_used_mb: 2048,
            ram_total_mb: 16384,
            ram_usage_percent: 12.5,
            uptime_seconds: 43200
        },
        spatial: {
            entropy_index: 0.12,
            signal_variance: 0.05,
            presence_detected: true
        },
        memory_count: 0,
        response_success_rate: 1.0,
    };
}

export async function processQuery(input: string, language: string): Promise<string> {
    if (isTauri()) {
        try {
            return await invokeCommand<string>("lumina_process_query", { input, language });
        } catch (e) {
            return `[ ENGINE ERROR ]\n\n${e}\n\nI could not reach your local model runtime. Ensure Ollama is running, then try again.`;
        }
    }

    const endpoints = ["http://127.0.0.1:11434", "http://localhost:11434"];
    const models = ["lumina-core", "lumina-core:latest", "qwen2.5:7b"];
    let lastError = "Inference engine offline";

    for (const endpoint of endpoints) {
        for (const model of models) {
            try {
                const response = await fetch(`${endpoint}/api/generate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        model,
                        prompt: input,
                        stream: false
                    })
                });

                if (!response.ok) {
                    lastError = `HTTP ${response.status} at ${endpoint} (${model})`;
                    continue;
                }

                const data = await response.json();
                return `${String(data.response ?? "").trim()}\n\n─────────────────────────────────\n[ Processed via Local Web Bridge ]\n[ Endpoint: ${endpoint} | Model: ${model} ]`;
            } catch (error) {
                lastError = String(error);
            }
        }
    }

    return `[ WEB PREVIEW ERROR ]\n\nI am running in browser mode and cannot reach the local Ollama engine.\nLast error: ${lastError}\n\nPlease run the .\\Lumina_AI_Setup.ps1 script or start Ollama manually.`;
}

export async function getSpatialState(): Promise<SpatialState> {
    if (isTauri()) {
        return await invokeCommand<SpatialState>("get_spatial_state");
    }
    return {
        entropy_index: Math.random() * 0.2,
        signal_variance: Math.random() * 0.1,
        presence_detected: true
    };
}

export async function captureVision(): Promise<VisionSyndrome> {
    if (isTauri()) {
        return await invokeCommand<VisionSyndrome>("capture_vision_syndrome");
    }
    return {
        screen_id: "Web_Display_0",
        dimensions: [1920, 1080],
        pixel_entropy: 0.35
    };
}

export async function executeSwarmRecursion(goal: string): Promise<SwarmPulse> {
    if (isTauri()) {
        return await invokeCommand<SwarmPulse>("execute_swarm_recursion", { goal });
    }
    return {
        nodes: [
            { id: "1", mode: "Thesis", payload: "Drafting...", entropy: 0.9 },
            { id: "2", mode: "Antithesis", payload: "Attacking...", entropy: 0.5 },
            { id: "3", mode: "Synthesis", payload: "Finalizing...", entropy: 0.1 }
        ],
        convergence: 0.95
    };
}

export async function pushIMUAction(data: IMUState): Promise<PreCognitionSyndrome> {
    if (isTauri()) {
        return await invokeCommand<PreCognitionSyndrome>("push_imu_action", { data });
    }
    return {
        predicted_intent: "PRE_MOTOR_ACCELERATION",
        confidence: 0.98,
        latency_reduction_ms: 150
    };
}

export async function sealEventHorizon(profile: ResonanceProfile): Promise<LoRATransform> {
    if (isTauri()) {
        return await invokeCommand<LoRATransform>("seal_event_horizon", { profile });
    }
    return {
        profile_id: "WEB_GHOST_BETA",
        timestamp: new Date().toISOString(),
        tensor_hash: "MOCK_TOPOLOGICAL_INVARIANT",
        status: "SEALING_IDENTITY"
    };
}

export async function executeMotorAction(actionType: 'CLICK' | 'TYPE', x: number, y: number, text?: string): Promise<string> {
    if (isTauri()) {
        return await invokeCommand<string>("execute_motor_action", { actionType, x, y, text });
    }
    return "[ MOTOR CORTEX ] Action blocked: Native hardware access required.";
}

export async function speakText(text: string): Promise<string> {
    if (isTauri()) {
        return await invokeCommand<string>("speak_text", { text });
    }
    return "[ TTS SIMULATION ] " + text;
}

export async function readClipboard(): Promise<string> {
    if (isTauri()) {
        return await invokeCommand<string>("read_clipboard");
    }
    return "[ WEB ] Clipboard read ignored natively.";
}

export async function writeClipboard(text: string): Promise<string> {
    if (isTauri()) {
        return await invokeCommand<string>("write_clipboard", { text });
    }
    return "[ WEB ] Virtual clipboard copied.";
}

export async function shellExecute(pathOrUrl: string): Promise<string> {
    if (isTauri()) {
        return await invokeCommand<string>("shell_execute", { command: pathOrUrl });
    }
    return `[ SECURE WEB ] External execution blocked: ${pathOrUrl}`;
}

export async function toggleAirGap(enabled: boolean): Promise<PrivacyHealth> {
    if (isTauri()) {
        return await invokeCommand<PrivacyHealth>("toggle_air_gap", { enabled });
    }
    return {
        memories_stored: 0,
        pii_scrubbed_count: 0,
        network_calls_blocked: 0,
        air_gapped: enabled,
        quarantine_level: enabled ? "AIR_GAPPED" : "OPEN",
        data_leaked_bytes: 0,
        vault_integrity: 1.0,
        lattice_mode: "FULL",
    };
}

export async function getPrivacyHealth(): Promise<PrivacyHealth> {
    if (isTauri()) {
        return await invokeCommand<PrivacyHealth>("get_privacy_health");
    }
    return {
        memories_stored: 0,
        pii_scrubbed_count: 0,
        network_calls_blocked: 0,
        air_gapped: false,
        quarantine_level: "OPEN",
        data_leaked_bytes: 0,
        vault_integrity: 1.0,
        lattice_mode: "FULL",
    };
}

export async function clearMemoryVault(): Promise<string> {
    if (isTauri()) {
        return await invokeCommand<string>("clear_memory_vault");
    }
    return "Memory Vault cleared in Web Memory.";
}

export interface WasmExecutionResult {
    module_name: string;
    execution_time_ms: number;
    result_string: string;
    sandbox_enforced: boolean;
}

export async function executeWasmPlugin(pluginName: string, wasmBytes: Uint8Array): Promise<WasmExecutionResult> {
    if (isTauri()) {
        const byteArr = Array.from(wasmBytes);
        return await invokeCommand<WasmExecutionResult>("execute_wasm_plugin", { pluginName, wasmBytes: byteArr });
    }
    return {
        module_name: pluginName,
        execution_time_ms: 0,
        result_string: "[ WEB PREVIEW ] Execution blocked: Native WebAssembly runtime required.",
        sandbox_enforced: false
    };
}

export async function exportDocument(filename: string, content: string): Promise<string> {
    if (isTauri()) {
        return await invokeCommand<string>("export_document", { payload: { filename, content } });
    }
    return `[ WEB ] Document Synthesis Ignored: ${filename}`;
}

export async function getRecentFiles(): Promise<FileMetadata[]> {
    if (isTauri()) {
        return await invokeCommand<FileMetadata[]>("get_recent_files");
    }
    return [
        { name: "msqecc_benchmark_analysis.md", path: "/mock/msqecc_benchmark_analysis.md", last_modified: Date.now() },
        { name: "Lumina_AI_Setup.ps1", path: "/mock/Lumina_AI_Setup.ps1", last_modified: Date.now() - 3600 }
    ];
}

export async function searchFiles(query: string): Promise<FileMetadata[]> {
    if (isTauri()) {
        return await invokeCommand<FileMetadata[]>("search_files", { query });
    }
    return [];
}

export async function optimizeVault(): Promise<string> {
    if (isTauri()) {
        return await invokeCommand<string>("optimize_vault");
    }
    return "[ WEB ] Vault optimization skipped.";
}

export async function webSearch(query: string): Promise<WebSearchResult[]> {
    if (isTauri()) {
        return await invokeCommand<WebSearchResult[]>("lumina_web_search", { query });
    }
    return [];
}

export async function evolveApp(proposal: EvolutionProposal): Promise<string> {
    if (isTauri()) {
        return await invokeCommand<string>("lumina_evolve_app", { proposal });
    }
    return "[ WEB ] App evolution blocked in browser mode.";
}

export async function resonanceChime(): Promise<void> {
    if (isTauri()) {
        await invokeCommand("lumina_resonance_chime");
    }
}

export async function checkForUpdates(): Promise<string> {
    if (isTauri()) {
        return await invokeCommand<string>("lumina_check_for_updates");
    }
    return "Check for updates skipped (Web).";
}

export async function globalSync(breakthrough?: GlobalSyndrome): Promise<SwarmPulse> {
    if (isTauri()) {
        return await invokeCommand<SwarmPulse>("lumina_global_sync", { breakthrough });
    }
    return { nodes: [], convergence: 1.0 };
}

export async function generateQuantumSeed(): Promise<QuantumSeed> {
    if (isTauri()) {
        return await invokeCommand<QuantumSeed>("lumina_generate_quantum_seed");
    }
    return { public_key: "MOCK_PK", entropy_seal: "MOCK_SEAL", generation_timestamp: new Date().toISOString() };
}

export { getSetting, isTauri, saveSetting };


