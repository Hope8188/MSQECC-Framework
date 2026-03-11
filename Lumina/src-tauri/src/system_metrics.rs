use crate::models::HardwareState;
use sysinfo::System;

pub fn capture_hardware_state(sys: &mut System) -> HardwareState {
    sys.refresh_cpu_all();
    sys.refresh_memory();

    let ram_used = sys.used_memory() / (1024 * 1024);
    let ram_total = sys.total_memory() / (1024 * 1024);
    let ram_pct = (ram_used as f32 / ram_total as f32) * 100.0;
    let cpu_usage = sys.global_cpu_usage();

    HardwareState {
        cpu_usage_percent: cpu_usage,
        ram_used_mb: ram_used,
        ram_total_mb: ram_total,
        ram_usage_percent: ram_pct,
        uptime_seconds: System::uptime(),
    }
}

pub fn current_lattice_mode(sys: &mut System) -> String {
    sys.refresh_cpu_all();
    let cpu = sys.global_cpu_usage();

    if cpu > 80.0 {
        "MINIMAL".to_string()
    } else if cpu > 50.0 {
        "ADAPTIVE".to_string()
    } else {
        "FULL".to_string()
    }
}
