use crate::models::{IMUState, MemorySyndrome, OuroborosNode, PrivacyHealth, ResonanceProfile};
use crate::system_metrics::current_lattice_mode;
use reqwest::Client;
use rusqlite::Connection;
use std::sync::Mutex;
use lumina_vault::{
    clear_memories as vault_clear_memories,
    memory_count as vault_memory_count,
    open_vault,
    recent_memories as vault_recent_memories,
    save_memory as vault_save_memory,
    search_memories as vault_search_memories,
    VaultMemory,
};

pub struct LuminaEngine {
    pub version: String,
    pub db: Mutex<Connection>,
    pub client: Client,
    pub sys_tracker: Mutex<sysinfo::System>,
    pub spatial_tracker: Mutex<Vec<f32>>,
    pub swarm_context: Mutex<Vec<OuroborosNode>>,
    pub imu_buffer: Mutex<Vec<IMUState>>,
    pub resonance_history: Mutex<Vec<ResonanceProfile>>,
    pub is_air_gapped: Mutex<bool>,
    pub pii_scrubbed_count: Mutex<u32>,
    pub network_calls_blocked: Mutex<u32>,
}

impl LuminaEngine {
    pub fn new(app_dir: std::path::PathBuf) -> Self {
        let db = open_vault(&app_dir).expect("FATAL: Failed to initialize SQLite vault.");
        let mut sys = sysinfo::System::new_all();
        sys.refresh_all();

        Self {
            version: "1.0.0-horizon".to_string(),
            db: Mutex::new(db),
            client: Client::new(),
            sys_tracker: Mutex::new(sys),
            spatial_tracker: Mutex::new(Vec::with_capacity(100)),
            swarm_context: Mutex::new(Vec::new()),
            imu_buffer: Mutex::new(Vec::with_capacity(50)),
            resonance_history: Mutex::new(Vec::new()),
            is_air_gapped: Mutex::new(false),
            pii_scrubbed_count: Mutex::new(0),
            network_calls_blocked: Mutex::new(0),
        }
    }

    pub fn save_memory(&self, syndrome: &MemorySyndrome) -> rusqlite::Result<()> {
        let db = self.db.lock().unwrap();
        let scrubbed = vault_save_memory(
            &db,
            &VaultMemory {
                id: syndrome.id.clone(),
                timestamp: syndrome.timestamp.to_rfc3339(),
                input: syndrome.input.clone(),
                response: syndrome.response.clone(),
                latency_ms: syndrome.latency_ms,
            },
        )?;

        if scrubbed > 0 {
            let mut counter = self.pii_scrubbed_count.lock().unwrap();
            *counter += scrubbed;
        }

        Ok(())
    }

    pub fn get_memory_count(&self) -> usize {
        let db = self.db.lock().unwrap();
        vault_memory_count(&db)
    }

    pub fn get_recent_memories(&self, limit: usize) -> Vec<(String, String)> {
        let db = self.db.lock().unwrap();
        vault_recent_memories(&db, limit).unwrap_or_default()
    }

    pub fn search_memories(&self, keyword: &str, limit: usize) -> Vec<(String, String)> {
        let db = self.db.lock().unwrap();
        vault_search_memories(&db, keyword, limit).unwrap_or_default()
    }

    pub fn clear_memories(&self) -> rusqlite::Result<()> {
        let db = self.db.lock().unwrap();
        vault_clear_memories(&db)
    }

    pub fn get_privacy_health(&self) -> PrivacyHealth {
        let air_gapped = *self.is_air_gapped.lock().unwrap();
        let pii_count = *self.pii_scrubbed_count.lock().unwrap();
        let blocked = *self.network_calls_blocked.lock().unwrap();
        let mem_count = self.get_memory_count();

        let quarantine = if air_gapped {
            "AIR_GAPPED".to_string()
        } else if pii_count > 0 {
            "GUARDED".to_string()
        } else {
            "OPEN".to_string()
        };

        PrivacyHealth {
            memories_stored: mem_count,
            pii_scrubbed_count: pii_count,
            network_calls_blocked: blocked,
            air_gapped,
            quarantine_level: quarantine,
            data_leaked_bytes: 0,
            vault_integrity: 1.0,
            lattice_mode: current_lattice_mode(&mut *self.sys_tracker.lock().unwrap()),
        }
    }
}
