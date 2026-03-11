# Lumina AI: Cognitive Operating System

**Lumina AI** is a localized cognitive operating system built on MSQECC principles. It runs **100% offline**, maintains absolute data sovereignty, and targets deployment across all hardware tiers — from modern desktops to absolute edge environments.

## Core Architecture

| Layer | Technology | Purpose |
|---|---|---|
| **Backend** | Rust + Tauri v2 | Hardware interface, process isolation, local LLM bridge |
| **Frontend** | React 19 + TypeScript | High-performance UI for local task management |
| **AI Engine** | Ollama + Qwen 2.5:7b | Local inference with isolated profile scaling |
| **Security** | Process Quarantine | Mandatory isolation of all data streams |
| **Storage** | SQLite | Persistent interaction memory and system state |

## Functional Modules

| Module | Description |
|---|---|
| **Intelligence Hub** | Local chat interface with persistent memory |
| **Task Swarm** | Goal-oriented task decomposition and reasoning |
| **Session Identity** | Behavioral profile synchronization for local adaptation |
| **App Container** | Sandboxed execution layer for local binaries |
| **System Vitals** | Real-time hardware telemetry and resource monitoring |
| **Workflow Logic** | Autonomous task tracking and execution visualization |
| **Motor Cortex** | Native OS-level control (Search, Recent, Click, Type) |
| **Settings** | Privacy configuration and local engine controls |

## Documentation
The architectural specifications are located in `archive/` (files 11–29).

## Project Structure

```
Lumina/
├── src/            ← Tauri frontend (React 19)
├── src-tauri/      ← Rust backend (LuminaEngine)
├── website/        ← Marketing gateway (React + Three.js)
├── app_core/       ← App documentation (guidelines, tasks, research, resources)
├── os_core/        ← OS-level documentation (future LuminaOS)
└── archive/        ← 19 architectural blueprint documents
```

## License

Proprietary. All architectural engines and mathematical frameworks are confidential.
