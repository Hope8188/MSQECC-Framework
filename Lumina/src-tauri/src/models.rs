use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct HardwareState {
    pub cpu_usage_percent: f32,
    pub ram_used_mb: u64,
    pub ram_total_mb: u64,
    pub ram_usage_percent: f32,
    pub uptime_seconds: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct MemorySyndrome {
    pub id: String,
    pub timestamp: DateTime<Utc>,
    pub input: String,
    pub response: String,
    pub latency_ms: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SpatialState {
    pub entropy_index: f32,
    pub signal_variance: f32,
    pub presence_detected: bool,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub enum DialecticMode {
    Thesis,
    Antithesis,
    Synthesis,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct OuroborosNode {
    pub id: String,
    pub mode: DialecticMode,
    pub payload: String,
    pub entropy: f32,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SwarmPulse {
    pub nodes: Vec<OuroborosNode>,
    pub convergence: f32,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct DocumentExport {
    pub filename: String,
    pub content: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct IMUState {
    pub acc_x: f32,
    pub acc_y: f32,
    pub acc_z: f32,
    pub gyro_x: f32,
    pub gyro_y: f32,
    pub gyro_z: f32,
    pub timestamp: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct PreCognitionSyndrome {
    pub predicted_intent: String,
    pub confidence: f32,
    pub latency_reduction_ms: u32,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct VisionSyndrome {
    pub screen_id: String,
    pub dimensions: (u32, u32),
    pub pixel_entropy: f32,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct QuantumSeed {
    pub public_key: String,
    pub entropy_seal: String,
    pub generation_timestamp: DateTime<Utc>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct GlobalSyndrome {
    pub source_id: String,
    pub breakthrough_type: String,
    pub payload_hash: String,
    pub signature: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct WebSearchResult {
    pub title: String,
    pub link: String,
    pub snippet: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct EvolutionProposal {
    pub file_path: String,
    pub target_pattern: String,
    pub replacement: String,
    pub rationale: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct ResonanceProfile {
    pub typing_cadence_ms: u32,
    pub vocabulary_entropy: f32,
    pub error_correction_rate: f32,
    pub sentimental_resonance: f32,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct LoRATransform {
    pub profile_id: String,
    pub timestamp: DateTime<Utc>,
    pub tensor_hash: String,
    pub status: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct LuminaStatus {
    pub version: String,
    pub mode: String,
    pub security_state: String,
    pub hardware: HardwareState,
    pub spatial: SpatialState,
    pub memory_count: usize,
    pub response_success_rate: f32,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct WasmExecutionResult {
    pub module_name: String,
    pub execution_time_ms: u64,
    pub result_string: String,
    pub sandbox_enforced: bool,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct PrivacyHealth {
    pub memories_stored: usize,
    pub pii_scrubbed_count: u32,
    pub network_calls_blocked: u32,
    pub air_gapped: bool,
    pub quarantine_level: String,
    pub data_leaked_bytes: u64,
    pub vault_integrity: f32,
    pub lattice_mode: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct FileMetadata {
    pub name: String,
    pub path: String,
    pub last_modified: u64,
}
