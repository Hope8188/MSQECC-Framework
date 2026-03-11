import { describe, expect, it } from "vitest";

import { buildChatTitle, extractWakeCommand } from "./appBehavior";

describe("app behavior helpers", () => {
  it("detects a wake phrase and extracts the remaining command", () => {
    expect(extractWakeCommand("hi lumina open settings")).toEqual({
      wakeDetected: true,
      command: "open settings",
    });
  });

  it("treats a standalone wake phrase as wake-only", () => {
    expect(extractWakeCommand("hey lumina")).toEqual({
      wakeDetected: true,
      command: "",
    });
  });

  it("accepts direct wake-word phrases without a greeting", () => {
    expect(extractWakeCommand("lumina open settings")).toEqual({
      wakeDetected: true,
      command: "open settings",
    });
    expect(extractWakeCommand("lumina")).toEqual({
      wakeDetected: true,
      command: "",
    });
  });

  it("leaves non-wake text intact", () => {
    expect(extractWakeCommand("search project files")).toEqual({
      wakeDetected: false,
      command: "search project files",
    });
  });

  it("builds stable chat titles", () => {
    expect(buildChatTitle("  Audit the vault and summarize findings  ")).toBe("Audit the vault and summarize findin");
    expect(buildChatTitle("   ")).toBe("New Chat");
  });
});


