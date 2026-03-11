use lumina_privacy::scrub_pii;
use rusqlite::{params, Connection, Result};
use std::path::Path;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct VaultMemory {
    pub id: String,
    pub timestamp: String,
    pub input: String,
    pub response: String,
    pub latency_ms: u64,
}

pub fn open_vault(app_dir: &Path) -> Result<Connection> {
    let db_path = app_dir.join("lumina_memory.db");
    let db = Connection::open(db_path)?;
    initialize_schema(&db)?;
    Ok(db)
}

pub fn initialize_schema(db: &Connection) -> Result<()> {
    db.execute(
        "CREATE TABLE IF NOT EXISTS memories (
            id TEXT PRIMARY KEY,
            timestamp DATETIME,
            input TEXT,
            response TEXT,
            latency_ms INTEGER
        )",
        [],
    )?;

    db.execute(
        "CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )",
        [],
    )?;

    Ok(())
}

pub fn save_memory(db: &Connection, memory: &VaultMemory) -> Result<u32> {
    let (clean_input, input_pii) = scrub_pii(&memory.input);
    let (clean_response, response_pii) = scrub_pii(&memory.response);
    let scrubbed = input_pii + response_pii;

    db.execute(
        "INSERT INTO memories (id, timestamp, input, response, latency_ms) VALUES (?1, ?2, ?3, ?4, ?5)",
        params![
            memory.id,
            memory.timestamp,
            clean_input,
            clean_response,
            memory.latency_ms,
        ],
    )?;

    Ok(scrubbed)
}

pub fn memory_count(db: &Connection) -> usize {
    db.query_row("SELECT COUNT(*) FROM memories", [], |row| row.get(0))
        .unwrap_or(0)
}

pub fn recent_memories(db: &Connection, limit: usize) -> Result<Vec<(String, String)>> {
    let mut stmt = db.prepare(
        "SELECT input, response FROM memories ORDER BY timestamp DESC LIMIT ?1",
    )?;
    let rows = stmt.query_map(params![limit as i64], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    })?;

    Ok(rows
        .filter_map(|row| row.ok())
        .collect::<Vec<_>>()
        .into_iter()
        .rev()
        .collect())
}

pub fn search_memories(db: &Connection, keyword: &str, limit: usize) -> Result<Vec<(String, String)>> {
    let search = format!("%{}%", keyword);
    let mut stmt = db.prepare(
        "SELECT input, response FROM memories WHERE input LIKE ?1 OR response LIKE ?2 ORDER BY timestamp DESC LIMIT ?3",
    )?;
    let rows = stmt.query_map(params![search, search, limit as i64], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    })?;

    Ok(rows
        .filter_map(|row| row.ok())
        .collect::<Vec<_>>()
        .into_iter()
        .rev()
        .collect())
}

pub fn clear_memories(db: &Connection) -> Result<()> {
    db.execute("DELETE FROM memories", [])?;
    Ok(())
}

pub fn save_setting(db: &Connection, key: &str, value: &str) -> Result<()> {
    db.execute(
        "INSERT OR REPLACE INTO settings (key, value) VALUES (?1, ?2)",
        params![key, value],
    )?;
    Ok(())
}

pub fn get_setting(db: &Connection, key: &str) -> Result<String> {
    db.query_row(
        "SELECT value FROM settings WHERE key = ?1",
        params![key],
        |row| row.get(0),
    )
    .or(Ok(String::new()))
}

pub fn optimize_vault(db: &Connection) -> Result<()> {
    db.execute("VACUUM", [])?;
    db.execute("ANALYZE", [])?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::{clear_memories, get_setting, initialize_schema, memory_count, optimize_vault, recent_memories, save_memory, save_setting, search_memories, VaultMemory};
    use rusqlite::Connection;

    fn memory(id: &str, input: &str, response: &str, latency_ms: u64) -> VaultMemory {
        VaultMemory {
            id: id.to_string(),
            timestamp: format!("2026-03-06T20:00:0{}Z", id),
            input: input.to_string(),
            response: response.to_string(),
            latency_ms,
        }
    }

    #[test]
    fn save_memory_scrubs_pii_before_persisting() {
        let db = Connection::open_in_memory().unwrap();
        initialize_schema(&db).unwrap();

        let scrubbed = save_memory(
            &db,
            &memory("1", "email me at jane@example.com", "call 555-123-4567", 25),
        )
        .unwrap();

        let stored = recent_memories(&db, 1).unwrap();
        assert_eq!(scrubbed, 2);
        assert!(stored[0].0.contains("[EMAIL_REDACTED]"));
        assert!(stored[0].1.contains("[PHONE_REDACTED]"));
    }

    #[test]
    fn search_and_recent_memories_preserve_latest_matches() {
        let db = Connection::open_in_memory().unwrap();
        initialize_schema(&db).unwrap();
        save_memory(&db, &memory("1", "Discuss kernel architecture", "Drafting now", 10)).unwrap();
        save_memory(&db, &memory("2", "Review architecture notes", "Changes queued", 12)).unwrap();
        save_memory(&db, &memory("3", "Unrelated", "No-op", 9)).unwrap();

        let recent = recent_memories(&db, 2).unwrap();
        let matches = search_memories(&db, "architecture", 5).unwrap();

        assert_eq!(recent.len(), 2);
        assert_eq!(matches.len(), 2);
        assert!(matches.iter().all(|(input, _)| input.contains("architecture") || input.contains("Discuss kernel architecture")));
    }

    #[test]
    fn settings_and_maintenance_round_trip_cleanly() {
        let db = Connection::open_in_memory().unwrap();
        initialize_schema(&db).unwrap();

        save_setting(&db, "theme", "aurora").unwrap();
        assert_eq!(get_setting(&db, "theme").unwrap(), "aurora");
        assert_eq!(get_setting(&db, "missing").unwrap(), "");

        save_memory(&db, &memory("1", "local only", "stored", 5)).unwrap();
        assert_eq!(memory_count(&db), 1);
        optimize_vault(&db).unwrap();
        clear_memories(&db).unwrap();
        assert_eq!(memory_count(&db), 0);
    }
}
