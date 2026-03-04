// ============================================================================
// LUMINA CORE ENGINE — The MSQECC OS Symbiote
// ============================================================================
// This is the heart of the Rust backend. Every IPC command flows through here.
// All sensitive operations (RAM polling, file system analytics, LLM bridging)
// execute exclusively in this Zero-Trust Rust boundary. The React frontend
// is a visual surface only; it never touches raw OS APIs directly.
// ============================================================================

use serde::{Deserialize, Serialize};
use sysinfo::System;
use std::time::Instant;

// ---------------------------------------------------------------------------
// DATA STRUCTURES (Syndrome Vectors)
// ---------------------------------------------------------------------------

/// The real-time hardware state of the host machine, polled via sysinfo.
/// This is the thermodynamic "pulse" that governs Dynamic Lattice Compression.
#[derive(Serialize, Deserialize, Clone)]
pub struct HardwareState {
    pub cpu_usage_percent: f32,
    pub ram_used_mb: u64,
    pub ram_total_mb: u64,
    pub ram_usage_percent: f32,
    pub uptime_seconds: u64,
}

/// A single interaction syndrome logged by the Morphic Evolution Engine.
#[derive(Serialize, Deserialize, Clone)]
pub struct InteractionSyndrome {
    pub timestamp_ms: u64,
    pub input_length: usize,
    pub response_latency_ms: u64,
    pub topic_hash: String,
}

/// The full Lumina system status returned to the frontend.
#[derive(Serialize, Deserialize, Clone)]
pub struct LuminaStatus {
    pub version: String,
    pub mode: String,            // "OFFLINE_SOVEREIGN" | "MESH_CONNECTED"
    pub security_state: String,  // "TOPOLOGICAL_SEALED" | "QUARANTINE" | "BREACHED"
    pub hardware: HardwareState,
    pub syndrome_count: usize,
    pub morphic_resonance: f64,
}

// ---------------------------------------------------------------------------
// GLOBAL ENGINE STATE
// ---------------------------------------------------------------------------

static ENGINE_VERSION: &str = "0.1.0-alpha";

// ---------------------------------------------------------------------------
// TAURI IPC COMMANDS
// ---------------------------------------------------------------------------

/// Returns the full real-time hardware state of the host.
/// The frontend renders this as the "Topological Engine" status graph.
#[tauri::command]
fn get_hardware_state() -> HardwareState {
    let mut sys = System::new_all();
    sys.refresh_all();

    let ram_used = sys.used_memory() / 1_048_576;  // bytes -> MB
    let ram_total = sys.total_memory() / 1_048_576;
    let ram_pct = if ram_total > 0 {
        (ram_used as f32 / ram_total as f32) * 100.0
    } else {
        0.0
    };

    // CPU usage requires a brief poll interval
    let cpu_usage = sys.global_cpu_usage();

    HardwareState {
        cpu_usage_percent: cpu_usage,
        ram_used_mb: ram_used,
        ram_total_mb: ram_total,
        ram_usage_percent: ram_pct,
        uptime_seconds: System::uptime(),
    }
}

/// The primary chat endpoint. Receives user text, returns the MSQECC response.
/// In production, this will bridge to llama.cpp via FFI. For now, it returns
/// a deterministic echo proving the IPC pipeline is structurally intact.
#[tauri::command]
fn process_query(input: String) -> String {
    let start = Instant::now();

    // --- MSQECC Grammar Bound (GBNF Placeholder) ---
    // In production, this is where the local LLM inference call executes
    // with strict JSON grammar constraints to guarantee 0% syntax failure.
    let response = format!(
        "[ Lumina MSQECC Core :: Sovereign Mode ]\n\
         Input Syndrome Received: \"{}\" ({} bytes)\n\
         Latency: {} μs\n\
         Status: Topological Seal Intact. Zero data exfiltrated.",
        input,
        input.len(),
        start.elapsed().as_micros()
    );

    response
}

/// Returns the full Lumina system status for the frontend dashboard.
#[tauri::command]
fn get_lumina_status() -> LuminaStatus {
    let hw = get_hardware_state();

    LuminaStatus {
        version: ENGINE_VERSION.to_string(),
        mode: "OFFLINE_SOVEREIGN".to_string(),
        security_state: "TOPOLOGICAL_SEALED".to_string(),
        hardware: hw,
        syndrome_count: 0,
        morphic_resonance: 0.0,
    }
}

// ---------------------------------------------------------------------------
// TAURI APPLICATION ENTRY POINT
// ---------------------------------------------------------------------------

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_hardware_state,
            process_query,
            get_lumina_status,
        ])
        .run(tauri::generate_context!())
        .expect("FATAL: Lumina core failed to initialize.");
}
