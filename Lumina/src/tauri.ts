declare global {
  interface Window {
    __TAURI_INTERNALS__?: unknown;
    __TAURI__?: unknown;
  }
}

let invokePromise: Promise<typeof import("@tauri-apps/api/core").invoke> | null = null;
let currentWindowPromise: Promise<ReturnType<typeof import("@tauri-apps/api/window").getCurrentWindow>> | null = null;

export function isTauriEnvironment(): boolean {
  return typeof window !== "undefined" && ("__TAURI_INTERNALS__" in window || "__TAURI__" in window);
}

async function getInvoke() {
  if (!invokePromise) {
    invokePromise = import("@tauri-apps/api/core").then((module) => module.invoke);
  }

  return invokePromise;
}

async function getCurrentAppWindow() {
  if (!currentWindowPromise) {
    currentWindowPromise = import("@tauri-apps/api/window").then((module) => module.getCurrentWindow());
  }

  return currentWindowPromise;
}

export async function invokeCommand<T>(command: string, args?: Record<string, unknown>): Promise<T> {
  if (!isTauriEnvironment()) {
    throw new Error(`Tauri runtime unavailable for command '${command}'.`);
  }

  const invoke = await getInvoke();
  return args ? invoke<T>(command, args) : invoke<T>(command);
}

export async function saveSetting(key: string, value: string): Promise<string> {
  if (!isTauriEnvironment()) {
    return `[ WEB ] Setting '${key}' cached locally.`;
  }

  return invokeCommand<string>("save_setting", { key, value });
}

export async function getSetting(key: string): Promise<string | null> {
  if (!isTauriEnvironment()) {
    return null;
  }

  return invokeCommand<string>("get_setting", { key });
}

async function withCurrentWindow(
  actionName: "minimize" | "close" | "focus",
  action: (window: Awaited<ReturnType<typeof getCurrentAppWindow>>) => Promise<void>,
) {
  if (!isTauriEnvironment()) {
    return;
  }

  try {
    const currentWindow = await getCurrentAppWindow();
    await action(currentWindow);
    return;
  } catch (error) {
    console.error(`Window API failed for '${actionName}'. Falling back to backend command.`, error);
  }

  try {
    await invokeCommand<void>("window_control", { action: actionName });
  } catch (fallbackError) {
    console.error(`Window fallback failed for '${actionName}'.`, fallbackError);
  }
}

export async function minimizeAppWindow(): Promise<void> {
  await withCurrentWindow("minimize", async (currentWindow) => {
    await currentWindow.minimize();
  });
}

export async function closeAppWindow(): Promise<void> {
  await withCurrentWindow("close", async (currentWindow) => {
    await currentWindow.close();
  });
}

export async function focusAppWindow(): Promise<void> {
  await withCurrentWindow("focus", async (currentWindow) => {
    await currentWindow.show();
    await currentWindow.setFocus();
  });
}
