import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getLuminaStatus,
  processQuery,
  toggleAirGap,
  saveSetting,
  type PrivacyHealth,
} from "./ipc";

const originalFetch = globalThis.fetch;

describe("ipc web fallbacks", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    globalThis.fetch = originalFetch;
    delete (window as Window & { __TAURI_INTERNALS__?: unknown }).__TAURI_INTERNALS__;
  });

  it("returns deterministic desktop status when Tauri is unavailable", async () => {
    const status = await getLuminaStatus();

    expect(status.version).toContain("(Web)");
    expect(status.mode).toBe("PRODUCTION_EMULATION");
    expect(status.hardware.ram_total_mb).toBeGreaterThan(0);
  });

  it("returns a stable privacy contract in web mode", async () => {
    const health: PrivacyHealth = await toggleAirGap(true);

    expect(health.air_gapped).toBe(true);
    expect(health.quarantine_level).toBe("AIR_GAPPED");
    expect(health.data_leaked_bytes).toBe(0);
  });

  it("sends the expected Ollama payload in web mode", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ response: "Local response" }),
    } as Response);

    const result = await processQuery("diagnose vault", "en-US");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:11434/api/generate",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );
    const [, init] = vi.mocked(globalThis.fetch).mock.calls[0];
    expect(JSON.parse(String(init?.body))).toEqual({
      model: "lumina-core",
      prompt: "diagnose vault",
      stream: false,
    });
    expect(result).toContain("Local response");
    expect(result).toContain("[ Processed via Local Web Bridge ]");
  });

  it("returns a clear fallback error when the local engine is unreachable", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("offline"));

    const result = await processQuery("diagnose vault", "en-US");

    expect(result).toContain("[ WEB PREVIEW ERROR ]");
    expect(result).toContain("start Ollama manually");
  });

  it("caches settings safely in web mode", async () => {
    const result = await saveSetting("language", "en-US");

    expect(result).toContain("cached locally");
    expect(result).toContain("language");
  });
});
