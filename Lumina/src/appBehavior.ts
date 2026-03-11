export type WakePhraseMatch = {
  wakeDetected: boolean;
  command: string;
};

const WAKE_PATTERN = /^\s*(?:(?:hey|hi|hello|ok|okay)\s+)?lumina(?:[\s,:;.!?-]+|$)/i;

export function extractWakeCommand(transcript: string): WakePhraseMatch {
  const normalized = transcript.trim();
  if (!normalized) {
    return { wakeDetected: false, command: "" };
  }

  if (!WAKE_PATTERN.test(normalized)) {
    return { wakeDetected: false, command: normalized };
  }

  const command = normalized.replace(WAKE_PATTERN, "").trim();
  return { wakeDetected: true, command };
}

export function buildChatTitle(seed: string): string {
  const trimmed = seed.trim().replace(/\s+/g, " ");
  if (!trimmed) {
    return "New Chat";
  }

  return trimmed.slice(0, 36);
}
