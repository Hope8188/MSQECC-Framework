# Lumina UI: Strategic Design & Enhancement Plan

This document tracks planned UI/UX improvements to be executed in the final phase of development. **DO NOT MODIFY ACTUAL UI FILES UNTIL BACKEND STABILITY IS ACHIEVED.**

## 1. Visual Representation Upgrades
*   **Lumina Void Orb (COMPLETED):**
    *   Renamed from Siri Void Orb.
    *   Integrated spectral wave pattern.
*   **Reasoning Co-efficient (RC) Bar (COMPLETED):**
    *   Implemented dynamic oscillation during inference (100.0% - 104.2%).
    *   Visualizes the **RRV Protocol** (Recursive Resonance Verification).

## 2. Information Density & Modules
*   **Recent Files Module (COMPLETED):**
    *   Logic: Hooked into `get_recent_files()` IPC.
    *   UI: Integrated in Sidebar/Intelligence Hub.
*   **RC Progress Visualization (COMPLETED):**
    *   Real-time spectral pulse during LLM processing.

## 3. Navigation & Context
*   **Tab Transitions:**
    *   Implement Framer Motion "Lattice Transitions" (bitwise dissolves) between Hub, Swarm, and Vitals.
    *   Ensure the "Session Identity" tab shows a live visualization of the LoRA status.
*   **System Vitals (Global View):**
    *   Replace the adversarial dashboard with a "privacy-first" telemetry view.
    *   Visualize blocked network calls and PII scrubbed counts as "Safe Zones".

## 4. Branding & Aesthetics
*   **Logo Rebranding (COMPLETED):**
    *   Concept: White starburst on absolute black.
    *   Implementation: High-res sharp technical lines.
*   **Pulsar/Black Hole Background (COMPLETED):**
    *   Central gas rings and star dust effects.
*   **Spectral Orb Wave (COMPLETED):**
    *   Multi-layered cyan/violet waves during listening state.

## 5. Intelligence & Interaction
*   **Obsidian Streaming Layer (IMPLEMENTED):**
    *   Dynamic token-by-token surfacing in the Reasoning Module.
    *   Avoids block-wait latency; provides immediate visual feedback.
*   **Web Search Results (IMPLEMENTED):**
    *   Search hits displayed as `[WEB_REFERENCE]` nodes within the chat flow.
    *   Includes snippets and direct shell-execution links.
*   **Warm Personality Integration (IMPLEMENTED):**
    *   Shift from "Direct/Dry" to "Collaborative Technical Expert."
    *   UI labels to reflect partnership (e.g., "Our Current Logic Atoms").
*   **Surgical Efficiency (NEW):**
    *   Constraint: Avoid verbose outputs.
    *   UI: "Condensed Logic" mode for high-speed iterations.

---

---
*Note: This plan adheres to the 'Technical Empathy' directive. Lumina Horizon 1.0 is now in Brutal Build state.*
