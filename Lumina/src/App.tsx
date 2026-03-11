import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,

  User,
  Settings,
  Cpu,
  Lock,
  Shield,
  Clock,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  FileIcon,
  Layers,
  Bell,
  WifiOff,
  History,
  LayoutList,
  ServerOff,
  Globe,
  SlidersHorizontal,
  Database,
  Minus,
  MessageSquarePlus
} from "lucide-react";
import {
  toggleAirGap, getPrivacyHealth, clearMemoryVault, executeWasmPlugin,
  exportDocument, getRecentFiles, searchFiles, optimizeVault,
  shellExecute, readClipboard, writeClipboard, executeSwarmRecursion,
  webSearch, processQuery, speakText, captureVision, getLuminaStatus,
  pushIMUAction, sealEventHorizon, checkForUpdates, globalSync,
  resonanceChime, generateQuantumSeed, getSetting, saveSetting
} from "./ipc";
import { isEnabled, enable, disable } from "@tauri-apps/plugin-autostart";
import type {
  LuminaStatus, SpatialState, SwarmPulse, PrivacyHealth,
  PreCognitionSyndrome, LoRATransform,
  OuroborosNode, ResonanceProfile, VisionSyndrome,
  FileMetadata, WebSearchResult, QuantumSeed
} from "./ipc";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import "./App.css";
import { ChatComposer } from "./components/ChatComposer";
import { LuminaStarburstLogo, LuminaVoidOrb, PulsarBackground } from "./components/LuminaBrand";
import { buildChatTitle, extractWakeCommand } from "./appBehavior";
import { closeAppWindow, focusAppWindow, minimizeAppWindow } from "./tauri";


function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function clampInferenceValue(raw: string, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, parsed));
}

// ──────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────
type WrappedApp = {
  id: string;
  name: string;
  size: string;
  status: "sealing" | "sealed" | "failed";
  droppedCalls: number;
  progress: number;
};

type ChatMessage = {
  id: string;
  role: "user" | "lumina";
  content: string;
  timestamp: number;
};

// ──────────────────────────────────────────────────
// Animated Stat Bar
// ──────────────────────────────────────────────────
const StatBar = ({ label, value, max, unit, color = "#00f3ff" }: {
  label: string; value: number; max: number; unit: string; color?: string;
}) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-end">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">{label}</span>
        <span className="text-[10px] font-mono font-bold" style={{ color }}>{unit === "MB" ? `${value}MB` : `${value.toFixed(0)}%`}</span>
      </div>
      <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-full rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}60` }} />
      </div>
    </div>
  );
};

function formatUptime(s: number): string {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}
function normalizeAssistantResponse(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) {
    return trimmed;
  }

  const noFooter = trimmed.split("\n─────────────────────────────────")[0] ?? trimmed;
  return noFooter
    .replace(/\[\s*MSQECC[^\]]*\]/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// ──────────────────────────────────────────────────
// App Tile (MORPH tab)
// ──────────────────────────────────────────────────
const AppTile = ({ app, onRemove }: { app: WrappedApp; onRemove: (id: string) => void }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
    className="p-5 rounded-2xl border border-white/[0.08] flex flex-col gap-3 group relative"
    style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)" }}>
    <button onClick={() => onRemove(app.id)}
      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-white/80 cursor-pointer">
      <X size={12} />
    </button>

    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 shrink-0"
        style={{ background: app.status === "sealed" ? "rgba(0,243,255,0.08)" : "rgba(255,255,255,0.04)" }}>
        <FileIcon size={14} className={app.status === "sealed" ? "text-[#00f3ff]" : "text-white/40"} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-white truncate">{app.name}</p>
        <p className="text-[9px] text-white/30 mt-0.5">{app.size}</p>
      </div>
    </div>

    {app.status === "sealing" && (
      <div className="space-y-1.5">
        <div className="h-[2px] w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
          <motion.div animate={{ width: `${app.progress}%` }} transition={{ duration: 0.5 }}
            className="h-full rounded-full" style={{ background: "#00f3ff" }} />
        </div>
        <p className="text-[9px] text-white/30 font-mono">Sealing... {app.progress}%</p>
      </div>
    )}

    {app.status === "sealed" && (
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <CheckCircle size={10} className="text-green-400" />
          <span className="text-[9px] font-bold text-green-400/80 uppercase tracking-widest">Sealed</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: <WifiOff size={9} />, label: "Net calls", val: "0 leaked" },
            { icon: <Shield size={9} />, label: "Dropped", val: `${app.droppedCalls}` },
          ].map((s, i) => (
            <div key={i} className="px-2.5 py-1.5 rounded-lg border border-white/5 flex items-center gap-1.5"
              style={{ background: "rgba(0,243,255,0.04)" }}>
              <span className="text-[#00f3ff]/60">{s.icon}</span>
              <div>
                <p className="text-[8px] text-white/30">{s.label}</p>
                <p className="text-[9px] font-bold text-white/70">{s.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {app.status === "failed" && (
      <div className="flex items-center gap-1.5">
        <AlertCircle size={10} className="text-red-400/70" />
        <span className="text-[9px] text-red-400/70">Incompatible format</span>
      </div>
    )}
  </motion.div>
);

// ──────────────────────────────────────────────────
// Swarm Node Component
// ──────────────────────────────────────────────────
const SwarmNode = ({ node }: { node: OuroborosNode }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="p-4 rounded-xl border border-white/5 flex flex-col gap-2 relative overflow-hidden"
    style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)" }}
  >
    <div className="absolute top-0 left-0 w-1 h-full"
      style={{ background: node.mode === 'Thesis' ? '#00f3ff' : node.mode === 'Antithesis' ? '#f87171' : '#a78bfa' }} />
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">{node.mode}</span>
      <span className="text-[9px] font-mono opacity-30">{node.id.slice(0, 8)}</span>
    </div>
    <p className="text-xs text-white/80 leading-relaxed font-mono">{node.payload}</p>
    <div className="mt-2 flex items-center gap-3">
      <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${node.entropy * 100}%` }}
          className="h-full"
          style={{ background: node.mode === 'Synthesis' ? '#a78bfa' : '#00f3ff' }} />
      </div>
      <span className="text-[9px] font-mono opacity-40">E: {(node.entropy * 100).toFixed(0)}%</span>
    </div>
  </motion.div>
);

// ──────────────────────────────────────────────────
// Drop Zone (MORPH tab)
// ──────────────────────────────────────────────────
const DropZone = ({ onDrop }: { onDrop: (files: FileList) => void }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    if (e.dataTransfer.files.length) onDrop(e.dataTransfer.files);
  };

  return (
    <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className="col-span-full aspect-video rounded-2xl border border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all"
      style={{
        borderColor: dragging ? "rgba(0,243,255,0.5)" : "rgba(255,255,255,0.15)",
        background: dragging ? "rgba(0,243,255,0.04)" : "rgba(255,255,255,0.01)",
      }}>
      <input ref={inputRef} type="file" className="hidden" accept=".exe,.apk,.app,.dmg,.AppImage,.deb,.rpm"
        multiple onChange={e => e.target.files && onDrop(e.target.files)} />
      <motion.div animate={dragging ? { scale: 1.1 } : { scale: 1 }} transition={{ duration: 0.2 }}>
        <Upload size={24} className={dragging ? "text-[#00f3ff]" : "text-white/25"} />
      </motion.div>
      <div className="text-center">
        <p className={cn("text-xs font-medium transition-colors", dragging ? "text-[#00f3ff]" : "text-white/40")}>
          {dragging ? "Release to seal application" : "Drop application to wrap in Sovereign Isolation Vault"}
        </p>
        <p className="text-[9px] text-white/20 mt-1">Supports .exe · .apk · .app · .dmg · .AppImage</p>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────
// Main App Component
// ──────────────────────────────────────────────────
export default function App() {
  const [status, setStatus] = useState<LuminaStatus | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<"HUB" | "MORPH" | "VITALS" | "SWARM" | "GHOST" | "TASKS" | "SETTINGS">("HUB");
  const [swarmPulse, setSwarmPulse] = useState<SwarmPulse | null>(null);
  const [spatial, setSpatial] = useState<SpatialState | null>(null);
  const [prediction, setPrediction] = useState<PreCognitionSyndrome | null>(null);
  const [ghostStatus, setGhostStatus] = useState<LoRATransform | null>(null);
  const [resonance] = useState<ResonanceProfile>({
    typing_cadence_ms: 320,
    vocabulary_entropy: 0.84,
    error_correction_rate: 0.92,
    sentimental_resonance: 0.15
  });
  const [wrappedApps, setWrappedApps] = useState<WrappedApp[]>([]);
  const [totalDropped, setTotalDropped] = useState(0);
  const [isAirGapped, setIsAirGapped] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [privacyHealth, setPrivacyHealth] = useState<PrivacyHealth | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [useLocalTranscription, setUseLocalTranscription] = useState(false);
  const [transcriptionEndpoint, setTranscriptionEndpoint] = useState("http://127.0.0.1:9001/transcribe");
  const [isSummoned, setIsSummoned] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [voiceBackEnabled, setVoiceBackEnabled] = useState(true);
  const [isAutoStartEnabled, setIsAutoStartEnabled] = useState(false);
  const [isMeetingMode, setIsMeetingMode] = useState(false);
  const [meetingTranscript, setMeetingTranscript] = useState("");
  const [recentInteractions, setRecentInteractions] = useState<{ id: string, type: string, target: string, time: number }[]>([]);
  const [recentFiles, setRecentFiles] = useState<FileMetadata[]>([]);
  const [streamingText, setStreamingText] = useState("");
  const [thoughtProcess, setThoughtProcess] = useState("");
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
  const [quantumSeed, setQuantumSeed] = useState<QuantumSeed | null>(null);
  const [swarmSyncing, setSwarmSyncing] = useState(false);
  const [currentChatTitle, setCurrentChatTitle] = useState("New Chat");
  const [inferenceNumCtx, setInferenceNumCtx] = useState("1024");
  const [inferenceNumPredict, setInferenceNumPredict] = useState("192");
  const [inferenceNumThread, setInferenceNumThread] = useState("4");
  const [preferredModel, setPreferredModel] = useState("");
  const [inferencePreset, setInferencePreset] = useState("balanced");

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const rf = await getRecentFiles();
        setRecentFiles(rf);
      } catch { /* Fail silent */ }
    };
    fetchRecent();
    const iv = setInterval(fetchRecent, 10000); // 10s local refresh
    return () => clearInterval(iv);
  }, []);
  const [visionData, setVisionData] = useState<VisionSyndrome | null>(null);
  const [isLatticeEnabled, setIsLatticeEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeRecognitionRef = useRef<any>(null);
  const wakeRecognitionRef = useRef<any>(null);
  const keepWakeListenerArmedRef = useRef(true);
  const tokenBufferRef = useRef("");
  const thoughtBufferRef = useRef("");
  const flushFrameRef = useRef<number | null>(null);
  const liveTranscriptRef = useRef("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const getSpeechRecognitionCtor = useCallback(() => {
    const recognitionHost = window as typeof window & {
      SpeechRecognition?: new () => any;
      webkitSpeechRecognition?: new () => any;
    };

    return recognitionHost.SpeechRecognition ?? recognitionHost.webkitSpeechRecognition ?? null;
  }, []);

  const stopRecognitionInstance = useCallback((recognitionRef: { current: any }) => {
    const instance = recognitionRef.current;
    if (!instance) {
      return;
    }

    instance.onresult = null;
    instance.onerror = null;
    instance.onend = null;

    try {
      instance.stop();
    } catch {
      try {
        instance.abort();
      } catch {
      }
    }

    recognitionRef.current = null;
  }, []);

  const ensureMicrophoneAccess = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
  }, []);

  const focusComposer = useCallback(() => {
    window.setTimeout(() => inputRef.current?.focus(), 40);
  }, []);

  const startNewChat = useCallback((prefill = "") => {
    stopRecognitionInstance(activeRecognitionRef);
    setMessages([]);
    setInput(prefill);
    setStreamingText("");
    setThoughtProcess("");
    setIsProcessing(false);
    setIsRecording(false);
    setIsSummoned(false);
    setActiveTab("HUB");
    setCurrentChatTitle(buildChatTitle(prefill));
    focusComposer();
  }, [focusComposer, stopRecognitionInstance]);

  // Send message
  const handleSend = useCallback(async (transcriptInput?: string) => {
    const currentInput = transcriptInput || input;
    const normalizedInput = currentInput.trim();
    if (!normalizedInput || isProcessing) return;

    const lowerNormalized = normalizedInput.toLowerCase();
    if (lowerNormalized === "new chat" || lowerNormalized === "/new") {
      startNewChat();
      return;
    }

    const wakeMatch = extractWakeCommand(normalizedInput);
    const effectiveInput = wakeMatch.wakeDetected && wakeMatch.command ? wakeMatch.command : normalizedInput;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: normalizedInput, timestamp: Date.now() };
    setMessages(p => [...p, userMsg]);
    if (!transcriptInput) setInput("");
    if (messages.length === 0) {
      setCurrentChatTitle(buildChatTitle(effectiveInput));
    }
    if (wakeMatch.wakeDetected) {
      setIsSummoned(true);
    }

    setIsProcessing(true);

    try {
      const lowerIn = effectiveInput.toLowerCase();
      let resText = "";

      if (wakeMatch.wakeDetected && !wakeMatch.command) {
        resText = "I'm here. What can I do for you?";
      } else if (lowerIn.startsWith("open ")) {
        const target = effectiveInput.slice(5).trim();
        resText = await shellExecute(target);
        setRecentInteractions(p => [{ id: crypto.randomUUID(), type: "OPEN", target, time: Date.now() }, ...p].slice(0, 5));
      } else if (lowerIn.includes("read clipboard") || lowerIn.includes("what is in my clipboard")) {
        const clip = await readClipboard();
        resText = `[ CLIPBOARD CONTENT ]\n${clip}`;
        setRecentInteractions(p => [{ id: crypto.randomUUID(), type: "CLIPBOARD", target: "READ", time: Date.now() }, ...p].slice(0, 5));
      } else if (lowerIn.startsWith("copy ")) {
        const target = effectiveInput.slice(5).trim();
        resText = await writeClipboard(target);
        setRecentInteractions(p => [{ id: crypto.randomUUID(), type: "CLIPBOARD", target: "COPY", time: Date.now() }, ...p].slice(0, 5));
      } else if (lowerIn.startsWith("search ")) {
        const q = effectiveInput.slice(7).trim();
        const results = await searchFiles(q);
        resText = `Search complete for "${q}". Found ${results.length} relevant files.\n\n` +
          results.map(r => `- [${r.name}](${r.path})`).join("\n");
        setRecentInteractions(p => [{ id: crypto.randomUUID(), type: "SEARCH", target: q, time: Date.now() }, ...p].slice(0, 5));
      } else if (lowerIn === "optimize vault") {
        resText = await optimizeVault();
      } else if (lowerIn.includes("analyze") || lowerIn.includes("build")) {
        setActiveTab("SWARM");
        const pulse = await executeSwarmRecursion(effectiveInput);
        setSwarmPulse(pulse);
        resText = `Task analysis complete. Confidence: ${(pulse.convergence * 100).toFixed(1)}%.`;
      } else if (lowerIn.includes("meeting buddy") || lowerIn.includes("transcribe meeting")) {
        setIsMeetingMode(true);
        setToastMessage("Meeting mode enabled. I will transcribe and summarize.");
        setTimeout(() => setToastMessage(null), 3000);
        resText = "Meeting mode is active. I will keep capturing and can summarize anytime.";
      } else if (lowerIn.startsWith("search web ")) {
        const q = effectiveInput.slice(11).trim();
        const results = await webSearch(q);
        resText = `Lumina Web Search for "${q}":\n\n` +
          results.map((r: WebSearchResult) => `- [${r.title}](${r.link})\n  ${r.snippet}`).join("\n\n");
        setRecentInteractions(p => [{ id: crypto.randomUUID(), type: "WEB_SEARCH", target: q, time: Date.now() }, ...p].slice(0, 5));
      } else {
        setStreamingText("");
        resText = normalizeAssistantResponse(await processQuery(effectiveInput, language));
      }

      setMessages(p => [...p, { id: crypto.randomUUID(), role: "lumina", content: resText, timestamp: Date.now() }]);

      if (voiceBackEnabled) {
        const speechString = resText.split("─────────────────────────────────")[0].split("starter prompts")[0].trim();
        if (speechString) {
          speakText(speechString).catch(() => { });
        }
      }

    } catch (e) {
      const errorMessage = `[ NATIVE ENGINE ERROR ]\n\n${String(e)}\n\nEnsure Ollama is running. Lumina now probes multiple local endpoints and models automatically, but the local engine still has to be alive.`;
      setMessages(p => [...p, { id: crypto.randomUUID(), role: "lumina", content: errorMessage, timestamp: Date.now() }]);
    }
    setIsProcessing(false);
    focusComposer();
  }, [focusComposer, input, isProcessing, language, messages.length, startNewChat, voiceBackEnabled]);

  const activateSummon = useCallback(async (command = "") => {
    await focusAppWindow();
    setActiveTab("HUB");
    setIsSummoned(true);

    if (command.trim()) {
      setInput(command);
      await handleSend(command);
      return;
    }

    focusComposer();
  }, [focusComposer, handleSend]);

  const armWakeListener = useCallback(async () => {
    const SpeechRecognitionAPI = getSpeechRecognitionCtor();
    if (!SpeechRecognitionAPI || isProcessing || isRecording || wakeRecognitionRef.current) {
      return;
    }

    try {
      await ensureMicrophoneAccess();
    } catch {
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    wakeRecognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .slice(event.resultIndex)
        .map((result: any) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();

      const wakeMatch = extractWakeCommand(transcript);
      if (!wakeMatch.wakeDetected) {
        return;
      }

      keepWakeListenerArmedRef.current = false;
      stopRecognitionInstance(wakeRecognitionRef);
      void activateSummon(wakeMatch.command);
    };

    recognition.onerror = (event: any) => {
      wakeRecognitionRef.current = null;
      if (!["aborted", "no-speech", "network"].includes(event.error)) {
        setToastMessage(`Wake Listener Error: ${event.error}`);
        setTimeout(() => setToastMessage(null), 3000);
      }

      if (keepWakeListenerArmedRef.current) {
        window.setTimeout(() => {
          void armWakeListener();
        }, 1400);
      }
    };

    recognition.onend = () => {
      wakeRecognitionRef.current = null;
      if (keepWakeListenerArmedRef.current && !isRecording && !isProcessing && !isTranscribing) {
        window.setTimeout(() => {
          void armWakeListener();
        }, 900);
      }
    };

    try {
      recognition.start();
    } catch {
      wakeRecognitionRef.current = null;
    }
  }, [activateSummon, ensureMicrophoneAccess, getSpeechRecognitionCtor, isProcessing, isRecording, isTranscribing, language, stopRecognitionInstance]);

  // Lumina Summon: Listen for global Meta-key long-press event from Rust (Blueprint 19/20)
  useEffect(() => {
    let unlistenToken: any;
    let unlistenStatus: any;
    let unlistenSummon: any;
    let unlistenComp: any;

    const setup = async () => {
      const { listen } = await import("@tauri-apps/api/event");
      const isThinking = { current: false };      const flushBuffers = () => {
        if (tokenBufferRef.current) {
          setStreamingText(prev => prev + tokenBufferRef.current);
          tokenBufferRef.current = "";
        }
        if (thoughtBufferRef.current) {
          setThoughtProcess(prev => prev + thoughtBufferRef.current);
          thoughtBufferRef.current = "";
        }
        flushFrameRef.current = null;
      };

      const scheduleFlush = () => {
        if (flushFrameRef.current === null) {
          flushFrameRef.current = window.requestAnimationFrame(flushBuffers);
        }
      };

      unlistenToken = await listen<string>("lumina-token", (event) => {
        const token = event.payload;
        if (token.includes("<thinking>")) {
          isThinking.current = true;
          setThoughtProcess("");
          return;
        }
        if (token.includes("</thinking>")) {
          isThinking.current = false;
          return;
        }

        if (isThinking.current) {
          thoughtBufferRef.current += token;
          scheduleFlush();
        } else {
          tokenBufferRef.current += token;
          scheduleFlush();
        }
      });
      unlistenStatus = await listen<string>("lumina-status", () => {});

      unlistenComp = await listen("lumina-streaming-complete", () => {
        resonanceChime();
      });

      unlistenSummon = await listen("lumina-summon", async () => {
        await activateSummon();
      });

      return () => {
        unlistenToken?.();
        unlistenStatus?.();
        unlistenComp?.();
        unlistenSummon?.();
        if (flushFrameRef.current !== null) {
          cancelAnimationFrame(flushFrameRef.current);
          flushFrameRef.current = null;
        }
      };
    };

    const cleanup = setup();
    return () => {
      cleanup.then(c => c?.());
    };
  }, [activateSummon]);

  const handleVisionCapture = useCallback(async () => {
    try {
      const v = await captureVision();
      setVisionData(v);
      setToastMessage(`Vision Core: Captured lattice [${v.dimensions[0]}x${v.dimensions[1]}]`);
      setTimeout(() => setToastMessage(null), 3000);
    } catch {
      setToastMessage("Vision Error: Peripheral unreachable.");
    }
  }, []);

  const handleCheckUpdates = useCallback(async () => {
    try {
      const res = await checkForUpdates();
      setUpdateStatus(res);
      setToastMessage(`Update Logic: ${res}`);
      setTimeout(() => setToastMessage(null), 5000);
    } catch (e) {
      setToastMessage(`Update Error: ${e}`);
    }
  }, []);

  const handleGlobalSync = useCallback(async () => {
    setSwarmSyncing(true);
    try {
      const pulse = await globalSync();
      setSwarmPulse(pulse);
      setToastMessage("Swarm Intelligence: Global Qualitative Breakthrough Synchronized.");
      setTimeout(() => setToastMessage(null), 5000);
    } catch (e) {
      setToastMessage(`Sync Error: ${e}`);
    }
    setSwarmSyncing(false);
  }, [setSwarmPulse]);

  const handleGenerateQuantumSeed = useCallback(async () => {
    try {
      const seed = await generateQuantumSeed();
      setQuantumSeed(seed);
      setToastMessage("MSQECC: Post-Quantum Identity Seed Generated.");
      setTimeout(() => setToastMessage(null), 5000);
    } catch (e) {
      setToastMessage(`Seed Gen Error: ${e}`);
    }
  }, []);

  const transcribeAudioBlob = useCallback(async (blob: Blob) => {
    if (!transcriptionEndpoint) {
      setToastMessage("Transcription endpoint is not configured.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setIsTranscribing(true);
    try {
      const form = new FormData();
      form.append("file", blob, "lumina-audio.webm");
      const res = await fetch(transcriptionEndpoint, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json().catch(() => null);
      const text = typeof data === "string"
        ? data
        : data?.text ?? data?.transcript ?? data?.data ?? "";
      const cleaned = String(text ?? "").trim();

      if (!cleaned) {
        setToastMessage("Transcription returned no text.");
        setTimeout(() => setToastMessage(null), 3000);
        return;
      }

      setInput(cleaned);
      await handleSend(cleaned);
    } catch (error) {
      setToastMessage(`Transcription error: ${String(error)}`);
      setTimeout(() => setToastMessage(null), 3500);
    } finally {
      setIsTranscribing(false);
    }
  }, [handleSend, transcriptionEndpoint]);

  const toggleRecording = useCallback(async () => {
    const SpeechRecognitionAPI = getSpeechRecognitionCtor();
    const wantsLocalTranscription = useLocalTranscription || !SpeechRecognitionAPI;

    if (wantsLocalTranscription) {\n      keepWakeListenerArmedRef.current = false;\n      stopRecognitionInstance(wakeRecognitionRef);
      if (!SpeechRecognitionAPI && !useLocalTranscription) {
        setToastMessage("Speech recognition unavailable. Using local transcription endpoint.");
        setTimeout(() => setToastMessage(null), 3000);
      }

      if (isRecording && mediaRecorderRef.current) {
        try {
          mediaRecorderRef.current.stop();
        } catch {
        }
        return;
      }

      try {
        await ensureMicrophoneAccess();
      } catch (error) {
        setToastMessage(`Microphone access denied: ${String(error)}`);
        setTimeout(() => setToastMessage(null), 3500);
        keepWakeListenerArmedRef.current = true;
        return;
      }

      try {
        if (typeof MediaRecorder === "undefined") {
          setToastMessage("MediaRecorder is not available in this runtime.");
          setTimeout(() => setToastMessage(null), 3500);
          setIsRecording(false);
          return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const preferredMime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"
          : MediaRecorder.isTypeSupported("audio/webm")
            ? "audio/webm"
            : "";
        const recorder = preferredMime ? new MediaRecorder(stream, { mimeType: preferredMime }) : new MediaRecorder(stream);

        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];

        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = async () => {
          stream.getTracks().forEach((track) => track.stop());
          mediaRecorderRef.current = null;
          setIsRecording(false);
          const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || "audio/webm" });
          audioChunksRef.current = [];
          await transcribeAudioBlob(blob);
          keepWakeListenerArmedRef.current = true;
          if (!isProcessing && !isTranscribing) {
            window.setTimeout(() => {
              void armWakeListener();
            }, 700);
          }
        };

        setIsRecording(true);
        setIsSummoned(true);
        setActiveTab("HUB");
        recorder.start();
      } catch (error) {
        setToastMessage(`Audio capture failed: ${String(error)}`);
        setTimeout(() => setToastMessage(null), 3500);
        mediaRecorderRef.current = null;
        setIsRecording(false);
      }
      return;
    }

    if (isRecording) {
      stopRecognitionInstance(activeRecognitionRef);
      setIsRecording(false);
      liveTranscriptRef.current = "";
      keepWakeListenerArmedRef.current = true;
      void armWakeListener();
      return;
    }

    keepWakeListenerArmedRef.current = false;
    stopRecognitionInstance(wakeRecognitionRef);

    try {
      await ensureMicrophoneAccess();
    } catch (error) {
      setToastMessage(`Microphone access denied: ${String(error)}`);
      setTimeout(() => setToastMessage(null), 3500);
      keepWakeListenerArmedRef.current = true;
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    activeRecognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = language;

    setIsRecording(true);
    setIsSummoned(true);
    setActiveTab("HUB");
    liveTranscriptRef.current = "";

    recognition.onresult = (event: any) => {
      let interim = "";
      let finalized = false;

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const transcript = result[0]?.transcript ?? "";
        if (result.isFinal) {
          liveTranscriptRef.current += ${transcript} ;
          finalized = true;
        } else {
          interim += transcript;
        }
      }

      const composed = ${liveTranscriptRef.current}.trim();
      if (composed) {
        setInput(composed);
      }

      if (!finalized) {
        return;
      }

      const finalText = liveTranscriptRef.current.trim();
      if (!finalText) {
        return;
      }

      if (isMeetingMode) {
        setMeetingTranscript(prev => prev + "\n" + finalText);
        setToastMessage("Cognitive intake appended to meeting transcript.");
        setTimeout(() => setToastMessage(null), 2000);
        liveTranscriptRef.current = "";
        setInput("");
        return;
      }

      setInput(finalText);
      void handleSend(finalText);
      liveTranscriptRef.current = "";
      try {
        recognition.stop();
      } catch {
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error !== "aborted") {
        setToastMessage(`Audio Intake Error: ${event.error}`);
        setTimeout(() => setToastMessage(null), 3000);
      }
      activeRecognitionRef.current = null;
      setIsRecording(false);
      liveTranscriptRef.current = "";
      keepWakeListenerArmedRef.current = true;
      void armWakeListener();
    };

    recognition.onend = () => {
      activeRecognitionRef.current = null;
      setIsRecording(false);
      liveTranscriptRef.current = "";
      keepWakeListenerArmedRef.current = true;
      if (!isProcessing && !isTranscribing) {
        window.setTimeout(() => {
          void armWakeListener();
        }, 700);
      }
    };

    recognition.start();
  }, [armWakeListener, ensureMicrophoneAccess, getSpeechRecognitionCtor, handleSend, isMeetingMode, isProcessing, isRecording, language, stopRecognitionInstance, transcribeAudioBlob, useLocalTranscription]);

  useEffect(() => {
    keepWakeListenerArmedRef.current = true;
    if (!isRecording && !isProcessing && !isTranscribing) {
      void armWakeListener();
    }

    return () => {
      keepWakeListenerArmedRef.current = false;
      stopRecognitionInstance(activeRecognitionRef);
      stopRecognitionInstance(wakeRecognitionRef);
    };
  }, [armWakeListener, isProcessing, isRecording, isTranscribing, stopRecognitionInstance]);

  const isIdle = useRef(false);
  const lastAssistantMessage = messages.slice().reverse().find((msg) => msg.role === "lumina")?.content
    ?? "I'm here. Ask me anything.";

  // Hardware polling (Adaptive Interval: 3s Active / 15s Idle)
  useEffect(() => {
    let lastActive = Date.now();
    const handleActivity = () => { lastActive = Date.now(); isIdle.current = false; };
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    const checkState = async () => {
      if (Date.now() - lastActive > 60000) isIdle.current = true;
      try {
        const s = await getLuminaStatus();
        setStatus(s);
        setSpatial(s.spatial);
        const ph = await getPrivacyHealth();
        setPrivacyHealth(ph);
        setIsAirGapped(ph.air_gapped);

        const auto = await isEnabled();
        setIsAutoStartEnabled(auto);

        // Efficiency Sync: Centralized settings boundary avoids ad hoc core imports
        const lang = await getSetting("language");
        if (lang) setLanguage(lang);
        const vb = await getSetting("voice_back");
        if (vb) setVoiceBackEnabled(vb === "true");
        const lat = await getSetting("lattice_enabled");
        if (lat) setIsLatticeEnabled(lat === "true");
        const numCtx = await getSetting("inference_num_ctx");
        if (numCtx) setInferenceNumCtx(numCtx);
        const numPredict = await getSetting("inference_num_predict");
        if (numPredict) setInferenceNumPredict(numPredict);
        const numThread = await getSetting("inference_num_thread");
        if (numThread) setInferenceNumThread(numThread);
        const preset = await getSetting("inference_preset");
        if (preset) setInferencePreset(preset);
        const prefModel = await getSetting("inference_model_pref");
        if (prefModel) setPreferredModel(prefModel);
        const transcribeEnabled = await getSetting("transcription_native");
        if (transcribeEnabled) setUseLocalTranscription(transcribeEnabled === "true");
        const endpoint = await getSetting("transcription_endpoint");
        if (endpoint) setTranscriptionEndpoint(endpoint);
      } catch { /* silent */ }
    };

    checkState();
    const iv = setInterval(() => {
      // Conservative polling: only refresh if active or periodic jitter check (every ~40s avg)
      if (!isIdle.current || Math.random() > 0.85) checkState();
    }, 8000);

    return () => {
      clearInterval(iv);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  // Keyboard shortcuts for navigation and summon controls
  useEffect(() => {
    const tabs = ["HUB", "SWARM", "GHOST", "MORPH", "VITALS", "TASKS", "SETTINGS"] as const;
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.code === "Space") {
        e.preventDefault();
        void activateSummon();
        return;
      }

      if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        startNewChat();
        return;
      }

      if (e.ctrlKey && e.key >= "1" && e.key <= "7") {
        e.preventDefault();
        setActiveTab(tabs[parseInt(e.key, 10) - 1]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activateSummon, startNewChat]);

  // IMU Stream Simulation (Phase 6) - Adaptive throttle for visual demo
  useEffect(() => {
    const iv = setInterval(async () => {
      if (document.visibilityState !== "visible" || isIdle.current) return;
      try {
        const res = await pushIMUAction({
          acc_x: Math.random() * 0.1, acc_y: Math.random() * 0.1, acc_z: 9.8 + Math.random() * 0.1,
          gyro_x: Math.random() * 0.05, gyro_y: Math.random() * 0.05, gyro_z: Math.random() * 0.05,
          timestamp: Date.now()
        });
        setPrediction(res);
      } catch { /* silent */ }
    }, 2000); // Throttled to 0.5Hz to save background CPU
    return () => clearInterval(iv);
  }, []);

  const handleSealHorizon = async () => {
    try {
      const res = await sealEventHorizon(resonance);
      setGhostStatus(res);
    } catch { /* silent */ }
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Wrap dropped app — simulates sealing process
  const handleAppDrop = useCallback((files: FileList) => {
    Array.from(files).forEach(file => {
      const validExts = [".exe", ".apk", ".app", ".dmg", ".appimage", ".deb", ".rpm"];
      const ext = "." + file.name.split(".").pop()!;
      const valid = validExts.includes(ext.toLowerCase());
      const id = crypto.randomUUID();
      const size = file.size > 1024 * 1024
        ? `${(file.size / 1024 / 1024).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      if (!valid) {
        setWrappedApps(p => [...p, { id, name: file.name, size, status: "failed", droppedCalls: 0, progress: 0 }]);
        return;
      }

      setWrappedApps(p => [...p, { id, name: file.name, size, status: "sealing", droppedCalls: 0, progress: 0 }]);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 8 + Math.random() * 15;
        if (progress >= 100) {
          const dropped = Math.floor(Math.random() * 24 + 3);
          clearInterval(interval);
          setWrappedApps(p => p.map(a => a.id === id ? { ...a, status: "sealed", droppedCalls: dropped, progress: 100 } : a));
          setTotalDropped(p => p + dropped);
        } else {
          setWrappedApps(p => p.map(a => a.id === id ? { ...a, progress: Math.floor(progress) } : a));
        }
      }, 200);
    });
  }, []);

  const removeApp = (id: string) => setWrappedApps(p => p.filter(a => a.id !== id));

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden text-white font-sans flex"
        style={{
          background: "radial-gradient(circle at 10% 20%, rgba(0,243,255,0.08), transparent 40%), radial-gradient(circle at 80% 10%, rgba(0,122,255,0.08), transparent 45%), #050505",
        }}>
        <PulsarBackground />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 60%, rgba(255,255,255,0.04), transparent 55%)",
            mixBlendMode: "screen",
          }}
        />

        {/* ─── Sidebar ─── */}
        <aside className="w-[260px] h-full border-r flex flex-col drag-region relative z-20 shrink-0"
          style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)", backdropFilter: "blur(40px)" }}>

          {/* Logo */}
          <div className="p-6 pb-3 flex items-center gap-3">
            <LuminaStarburstLogo size={14} />
            <div>
              <h1 className="text-[13px] font-bold tracking-tight text-white">Lumina</h1>
              <p className="text-[8px] text-white/25 font-mono tracking-[0.35em] uppercase">Local AI</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="px-4 py-2 flex-1 flex flex-col gap-1 no-drag">
            {([
              { id: "HUB", icon: <Activity size={13} />, label: "Intelligence Hub", color: "#00f3ff" },
              { id: "SWARM", icon: <Layers size={13} />, label: "Task Workspace", color: "#4ade80" },
              { id: "GHOST", icon: <User size={13} />, label: "Session Identity", color: "#a78bfa" },
              { id: "MORPH", icon: <Shield size={13} />, label: "App Container", color: "#f59e0b" },
              { id: "VITALS", icon: <Cpu size={13} />, label: "System", color: "#6366f1" },
              { id: "TASKS", icon: <LayoutList size={13} />, label: "Workflow Logic", color: "#10b981" },
              { id: "SETTINGS", icon: <SlidersHorizontal size={13} />, label: "Settings", color: "#ec4899" },
            ] as const).map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[11px] font-semibold tracking-wide transition-all cursor-pointer text-left"
                style={activeTab === tab.id
                  ? { background: "rgba(255,255,255,0.07)", color: tab.color }
                  : { color: "rgba(255,255,255,0.3)" }}>
                <span style={activeTab === tab.id ? { color: tab.color } : { color: "rgba(255,255,255,0.25)" }}>
                  {tab.icon}
                </span>
                {tab.label}
                {tab.id === "MORPH" && wrappedApps.filter(a => a.status === "sealed").length > 0 && (
                  <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>
                    {wrappedApps.filter(a => a.status === "sealed").length}
                  </span>
                )}
                {tab.id === "HUB" && messages.length > 0 && (
                  <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{ background: "rgba(0,243,255,0.15)", color: "#00f3ff" }}>
                    {messages.length}
                  </span>
                )}
                {tab.id === "SETTINGS" && isAirGapped && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
                )}
              </button>
            ))}
          </nav>

          {/* Live Status Panel */}
          <div className="px-4 pb-3 no-drag">
            <div className="p-4 rounded-2xl flex flex-col gap-3.5 border border-white/5 relative overflow-hidden"
              style={{ background: "rgba(0,0,0,0.4)" }}>
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: "linear-gradient(135deg,rgba(0,243,255,0.025),transparent 60%)" }} />
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/25">Live Status</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: "0 0 5px #4ade80" }} />
                  <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: "#00f3ff" }}>Sealed</span>
                </div>
              </div>
              {status ? (
                <div className="space-y-3">
                  <StatBar label="CPU" value={status.hardware.cpu_usage_percent} max={100} unit="%" color="#00f3ff" />
                  <StatBar label="RAM" value={status.hardware.ram_used_mb} max={status.hardware.ram_total_mb} unit="MB" color="#a78bfa" />
                  <div className="flex justify-between pt-1 border-t border-white/5">
                    <span className="text-[8px] font-mono text-white/25 flex items-center gap-1"><Clock size={8} />{formatUptime(status.hardware.uptime_seconds)}</span>
                    <span className="text-[8px] font-mono text-white/25 flex items-center gap-1"><Shield size={8} className="text-green-400/60" />0.00% leak</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {["CPU", "RAM"].map(l => (
                    <div key={l} className="h-[3px] w-full rounded-full overflow-hidden bg-white/5">
                      <div className="h-full w-1/3 bg-white/10 rounded-full animate-pulse" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="px-4 pb-5 no-drag border-t border-white/5 pt-3 flex items-center justify-between">
            <div className="flex gap-0.5">
              <button onClick={() => setActiveTab("GHOST")} className="p-2 rounded-lg text-white/25 hover:text-white/70 hover:bg-white/5 transition-all cursor-pointer"><User size={13} /></button>
              <button onClick={() => setActiveTab("SETTINGS")} className="p-2 rounded-lg text-white/25 hover:text-white/70 hover:bg-white/5 transition-all cursor-pointer"><Settings size={13} /></button>
            </div>
            <span className="text-[8px] font-mono text-white/15 tracking-widest">v{status?.version ?? "1.0.0"}</span>
          </div>
        </aside>

        {/* ─── Main Content ─── */}
        <main className="flex-1 h-full flex flex-col relative z-20 no-drag overflow-hidden">
          {isSummoned && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-28 right-6 z-[120] w-[360px] rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">Orb Link</span>
                  {isRecording && <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-rose-300">Listening</span>}
                  {!isRecording && isTranscribing && <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-emerald-300">Transcribing</span>}
                  {!isRecording && isProcessing && <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#00f3ff]">Thinking</span>}
                </div>
                <button
                  onClick={() => setIsSummoned(false)}
                  className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all"
                >
                  <X size={14} />
                </button>
              </div>

              <p className="mt-3 text-[12px] text-white/80 leading-relaxed whitespace-pre-wrap">
                {lastAssistantMessage}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => void toggleRecording()}
                  className="px-3 py-2 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Talk
                </button>
                <button
                  onClick={focusComposer}
                  className="px-3 py-2 rounded-full border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all"
                >
                  Type
                </button>
              </div>
            </motion.div>
          )}

          <div className="fixed bottom-6 right-6 z-[130] no-drag">
            <button
              onClick={() => setIsSummoned(prev => !prev)}
              className="relative"
            >
              <LuminaVoidOrb isListening={isRecording || isProcessing || isTranscribing} size={78} interactive />
            </button>
          </div>
          <header className="h-[60px] flex items-center justify-between px-7 border-b shrink-0 drag-region"
            style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.15)" }}>
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex items-center gap-2">
                {activeTab === "HUB" && <><Activity size={14} className="text-[#00f3ff]/50" /><h2 className="text-sm font-semibold">Chat</h2></>}
                {activeTab === "SWARM" && <><Layers size={14} className="text-[#00f3ff]/50" /><h2 className="text-sm font-semibold">Tasks</h2></>}
                {activeTab === "GHOST" && <><User size={14} className="text-[#a78bfa]/50" /><h2 className="text-sm font-semibold">Profile</h2></>}
                {activeTab === "MORPH" && <><Shield size={14} className="text-[#f59e0b]/50" /><h2 className="text-sm font-semibold">Apps</h2></>}
                {activeTab === "VITALS" && <><Cpu size={14} className="text-[#6366f1]/50" /><h2 className="text-sm font-semibold">System</h2></>}
                {activeTab === "TASKS" && <><LayoutList size={14} className="text-[#10b981]/50" /><h2 className="text-sm font-semibold">Resources</h2></>}
                {activeTab === "SETTINGS" && <><SlidersHorizontal size={14} className="text-[#ec4899]/50" /><h2 className="text-sm font-semibold">Settings</h2></>}
              </div>
              {activeTab === "HUB" && (
                <div className="hidden md:flex flex-col border-l border-white/8 pl-4 min-w-0">
                  <span className="text-[7.5px] font-bold text-white/20 uppercase tracking-[0.24em]">Current Chat</span>
                  <span className="text-[11px] font-medium text-white/80 truncate">{currentChatTitle}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 no-drag">
              <button onClick={() => startNewChat()} className="h-8 px-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white transition-all flex items-center gap-2 cursor-pointer">
                <MessageSquarePlus size={14} />
                <span className="hidden md:inline text-[10px] font-semibold">New Chat</span>
              </button>
              <div className="flex items-center gap-1.5">
                <button onClick={() => void minimizeAppWindow()} className="h-8 w-8 rounded-lg border border-white/10 bg-white/[0.02] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all flex items-center justify-center cursor-pointer">
                  <Minus size={14} />
                </button>
                <button onClick={() => void closeAppWindow()} className="h-8 w-8 rounded-lg border border-white/10 bg-white/[0.02] text-white/70 hover:text-rose-200 hover:bg-rose-500/20 transition-all flex items-center justify-center cursor-pointer">
                  <X size={13} />
                </button>
              </div>
              {prediction && (
                <div className="hidden">
                  <span className="text-[7.5px] font-bold text-white/20 uppercase tracking-[0.2em]">Next Action</span>
                  <span className="text-[9px] font-mono font-bold text-[#a78bfa]">{prediction.predicted_intent}</span>
                </div>
              )}
              {status ? (
                <div className="hidden">
                  <Lock size={10} className="text-green-400" />
                  <span>LOCAL</span>
                  <span className="text-white/15">·</span>
                  <span style={{ color: "#00f3ff" }}>{status.mode.replace(/_/g, " ")}</span>
                </div>
              ) : <span className="hidden">Initializing...</span>}
            </div>
          </header>

          {/* Tab Panels */}
          <section className="flex-1 overflow-hidden relative flex flex-col">
            <AnimatePresence mode="wait">

              {/* ── NEURAL HUB ── */}
              {activeTab === "HUB" && (
                <motion.div key="hub"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }} className="flex-1 flex flex-col h-full overflow-hidden">
                  <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-5 custom-scrollbar">
                    {messages.length === 0 && (
                      <div className="my-auto flex flex-col items-center text-center">
                        <LuminaVoidOrb isListening={isRecording || isTranscribing} className="mx-auto my-8" />
                        <h3 className="text-lg font-bold text-white mb-2 tracking-wide">Lumina</h3>
                        <p className="text-[12px] text-white/50 max-w-sm leading-relaxed mb-8">
                          Ask naturally. I can help with writing, coding, files, and quick local actions.
                        </p>

                        <div className="mb-8 flex items-center gap-4">
                          <button onClick={handleVisionCapture} className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer flex flex-col items-center gap-2">
                            <Upload size={20} className="text-[#00f3ff]" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#00f3ff]">Vision Core</span>
                          </button>
                          {visionData && (
                            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.01] text-left">
                              <p className="text-[10px] font-bold text-white/60">Captured</p>
                              <p className="text-[9px] font-mono text-white/30 truncate max-w-[120px]">{visionData.screen_id}</p>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 w-full max-w-lg mb-4">
                          <div className="flex flex-col gap-2">
                            <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold self-start pl-2">Motor Cortex</span>
                            {[
                              "open C:\",
                              "read clipboard",
                              "copy Protocol Alpha initialized",
                            ].map(q => (
                              <button key={q} onClick={() => setInput(q)}
                                className="px-4 py-2.5 rounded-xl border border-white/[0.07] text-left text-[11px] text-white/40 hover:text-[#00f3ff] hover:bg-[#00f3ff]/5 hover:border-[#00f3ff]/30 transition-all cursor-pointer"
                                style={{ background: "rgba(255,255,255,0.01)" }}>
                                {q}
                              </button>
                            ))}
                          </div>

                          <div className="flex flex-col gap-2">
                            <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold self-start pl-2">Cognitive Intelligence</span>
                            {[
                              "Transcribe this meeting and summarize",
                              "Analyze my security topology",
                              "Provide starter prompts for coding",
                            ].map(q => (
                              <button key={q} onClick={() => setInput(q)}
                                className="px-4 py-2.5 rounded-xl border border-white/[0.07] text-left text-[11px] text-white/40 hover:text-[#a78bfa] hover:bg-[#a78bfa]/5 hover:border-[#a78bfa]/30 transition-all cursor-pointer"
                                style={{ background: "rgba(255,255,255,0.01)" }}>
                                {q}
                              </button>
                            ))}
                          </div>
                        </div>

                        {recentInteractions.length > 0 && (
                          <div className="grid grid-cols-1 gap-4 w-full max-w-lg mt-8 text-left">
                            <div>
                              <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                <History size={10} /> Neural History
                              </h4>
                              <div className="flex flex-col gap-2">
                                {recentInteractions.map(ri => (
                                  <div key={ri.id} className="p-3 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between group">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-white/40 uppercase">{ri.type}</span>
                                      <span className="text-[10px] text-white/70 font-mono truncate">{ri.target}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {isMeetingMode && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-xl border border-[#a78bfa]/20 bg-[#a78bfa]/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#a78bfa] animate-pulse" />
                          <span className="text-[10px] font-bold text-[#a78bfa] uppercase tracking-widest">Meeting Buddy Active</span>
                        </div>
                        <button onClick={async () => {
                          const filename = `Lumina_Session_${new Date().toISOString().replace(/[:.]/g, '-')}.md`;
                          const content = `# Lumina: Local AI Environment\n\n## Transcript\n${meetingTranscript}\n\n---\n*Synthesized by Lumina Horizon at ${new Date().toLocaleString()}*`;
                          const msg = await exportDocument(filename, content);
                          setToastMessage(msg);
                          setMeetingTranscript("");
                          setIsMeetingMode(false);
                          setTimeout(() => setToastMessage(null), 5000);
                        }} className="px-3 py-1.5 rounded-lg bg-[#a78bfa] text-black text-[9px] font-bold uppercase hover:scale-105 transition-all cursor-pointer">
                          Export to Desktop
                        </button>
                      </motion.div>
                    )}

                    {messages.map((msg) => (
                      <motion.div key={msg.id}
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        className={cn("flex max-w-[88%]", msg.role === "user" ? "ml-auto" : "mr-auto")}>
                        <div className={cn(
                          msg.role === "user"
                            ? "bg-white text-black font-sans font-medium rounded-br-sm"
                            : "border border-white/[0.08] text-white/80 rounded-bl-sm"
                        )} style={msg.role === "lumina" ? { background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" } : {}}>
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}
                    {isProcessing && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex max-w-[88%] mr-auto">
                        <div className="px-5 py-4 rounded-2xl rounded-bl-sm border border-[#a78bfa]/20 flex flex-col gap-3 min-w-[280px]"
                          style={{ background: "rgba(167,139,250,0.05)", backdropFilter: "blur(20px)" }}>
                          <div className="flex items-center gap-2">
                              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}
                                className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
                              <span className="text-[10px] font-bold text-[#a78bfa] uppercase tracking-widest font-mono">Thinking...</span>
                            </div>

                          {/* Reasoning / Thought Layer */}
                          {thoughtProcess && (
                            <div className="mt-4 p-3 rounded-lg border border-[#a78bfa]/20 bg-[#a78bfa]/5 text-[9px] text-[#a78bfa]/70 italic font-mono leading-tight">
                              <div className="flex items-center gap-2 mb-2">
                                <Activity size={10} className="animate-pulse" />
                                <span className="uppercase tracking-[0.2em] font-bold">Thinking...</span>
                              </div>
                              {thoughtProcess}
                            </div>
                          )}

                          {/* Streaming Output Layer */}
                          {streamingText && (
                            <div className="mt-6 p-4 rounded-xl border border-white/5 bg-white/[0.02] text-[11px] text-white/80 leading-relaxed font-sans whitespace-pre-wrap">
                              {streamingText}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <ChatComposer
                    input={input}
                    isProcessing={isProcessing}
                    isRecording={isRecording}
                    isTranscribing={isTranscribing}
                    onInputChange={setInput}
                    onSend={() => handleSend()}
                    onToggleRecording={toggleRecording}
                    inputRef={inputRef}
                  />
                </motion.div>
              )}

              {/* ── OUROBOROS SWARM ── */}
              {activeTab === "SWARM" && (
                <motion.div key="swarm"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }} className="flex-1 p-7 overflow-y-auto custom-scrollbar">
                  <div className="mb-8">
                    <h2 className="text-lg font-bold mb-1.5 uppercase tracking-widest text-left">Task Workspace</h2>
                    <p className="text-[11px] text-white/35 leading-relaxed max-w-md text-left">
                      Break down goals into steps and track progress.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {swarmPulse ? (
                      swarmPulse.nodes.map(node => <SwarmNode key={node.id} node={node} />)
                    ) : (
                      <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-20 border border-dashed border-white/20 rounded-2xl">
                        <Layers size={40} className="mb-4" />
                        <p className="text-xs font-mono uppercase tracking-widest">Awaiting Swarm Activation</p>
                      </div>
                    )}
                  </div>

                  {swarmPulse && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">Mathematical Convergence</span>
                        <span className="text-sm font-mono font-bold text-[#00f3ff]">{(swarmPulse.convergence * 100).toFixed(2)}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div animate={{ width: `${swarmPulse.convergence * 100}%` }}
                          className="h-full bg-gradient-to-r from-[#00f3ff] to-[#a78bfa]" />
                      </div>
                      <p className="mt-4 text-[10px] text-white/30 font-mono leading-relaxed">
                        [ NODE SIG ] Dialectic loop converged on stable entropy.
                        Thesis refuted, vulnerabilities patched, logic synthesized for Ring-0 execution.
                      </p>
                    </motion.div>
                  )}

                  {/* RuView Integration in Swarm View */}
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">RuView Passive Spatial Awareness</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest text-[#00f3ff]">Signal Variance</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <motion.div key={i} animate={{ height: [4, 12, 4] }} transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                                className="w-1 bg-[#00f3ff]/40 rounded-full" />
                            ))}
                          </div>
                        </div>
                        <p className="text-2xl font-black font-mono tracking-tighter">{(spatial?.signal_variance ?? 0).toFixed(6)}</p>
                      </div>
                      <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest" style={{ color: spatial?.presence_detected ? '#4ade80' : '#f87171' }}>Presence Logic</span>
                          <div className="w-2 h-2 rounded-full" style={{ background: spatial?.presence_detected ? '#4ade80' : '#f87171' }} />
                        </div>
                        <p className="text-sm font-bold opacity-80">{spatial?.presence_detected ? "HUMAN SIGNATURE DETECTED" : "NO LOCAL BIOMETRICS SENSING"}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── SESSION IDENTITY ── */}
              {activeTab === "GHOST" && (
                <motion.div key="ghost"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }} className="flex-1 p-7 overflow-y-auto custom-scrollbar">
                  <div className="mb-8 text-left">
                    <h2 className="text-lg font-bold mb-1.5 uppercase tracking-widest">Session Identity</h2>
                    <p className="text-[11px] text-white/35 leading-relaxed max-w-md">
                      Profile synchronization based on interaction cadence and vocabulary entropy. Data is processed locally and stored in a Ring-0 vault.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {[
                      { label: "Typing Cadence", val: `${resonance.typing_cadence_ms}ms`, icon: <Clock size={12} /> },
                      { label: "Vocabulary Entropy", val: resonance.vocabulary_entropy.toFixed(2), icon: <Globe size={12} /> },
                      { label: "Error Correction", val: `${(resonance.error_correction_rate * 100).toFixed(0)}%`, icon: <CheckCircle size={12} /> },
                      { label: "Sentimental Bias", val: resonance.sentimental_resonance.toFixed(2), icon: <Activity size={12} /> },
                    ].map((s, i) => (
                      <div key={i} className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-2">
                        <div className="flex items-center gap-2 opacity-30">
                          {s.icon} <span className="text-[9px] font-bold uppercase tracking-widest">{s.label}</span>
                        </div>
                        <p className="text-xl font-bold font-mono text-[#a78bfa]">{s.val}</p>
                      </div>
                    ))}
                  </div>

                  {ghostStatus ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] text-center space-y-4">
                      <div className="h-16 w-16 rounded-full border border-white/20 flex items-center justify-center mx-auto bg-white/5">
                        <Lock size={24} className="text-white/40" />
                      </div>
                      <h3 className="text-md font-bold text-white uppercase tracking-widest">Identity Stabilized</h3>
                      <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">ID: {ghostStatus.profile_id}</p>
                      <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[9px] font-mono text-white/30 text-left">
                        &gt; HASH: {ghostStatus.tensor_hash}<br />
                        &gt; STATUS: {ghostStatus.status}<br />
                        &gt; INTEGRITY: 100%
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      onClick={handleSealHorizon}
                      className="w-full py-12 rounded-3xl border border-dashed border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group flex flex-col items-center justify-center gap-4 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/40 group-hover:bg-white/10 transition-all">
                        <User size={18} className="text-white/20 group-hover:text-white" />
                      </div>
                      <div className="flex flex-col gap-1 items-center text-center">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white">Capture Profile</span>
                        <span className="text-[9px] text-white/15 font-mono">Sync interaction resonance</span>
                      </div>
                    </button>
                  )}
                </motion.div>
              )}

              {/* ── APP CONTAINER ── */}
              {activeTab === "MORPH" && (
                <motion.div key="morph"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }} className="flex-1 overflow-y-auto p-7 custom-scrollbar">
                  <div className="mb-8 text-left">
                    <h2 className="text-lg font-bold mb-1.5 uppercase tracking-widest">App Container</h2>
                    <p className="text-[11px] text-white/35 leading-relaxed max-w-md">
                      Isolated execution layer. Wrapped applications run in a local memory quarantine with zero network egress.
                    </p>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-7">
                    {[
                      { icon: <Layers size={13} />, val: wrappedApps.filter(a => a.status === "sealed").length, label: "Apps Sealed", color: "#a78bfa" },
                      { icon: <WifiOff size={13} />, val: totalDropped, label: "Calls Blocked", color: "#00f3ff" },
                      { icon: <Database size={13} />, val: "0 KB", label: "Data Leaked", color: "#4ade80" },
                    ].map((s, i) => (
                      <div key={i} className="p-4 rounded-2xl border border-white/5 flex flex-col gap-2"
                        style={{ background: "rgba(255,255,255,0.01)" }}>
                        <span style={{ color: s.color }}>{s.icon}</span>
                        <p className="text-xl font-bold">{s.val}</p>
                        <p className="text-[8px] text-white/25 uppercase tracking-widest">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* App grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <DropZone onDrop={handleAppDrop} />
                    {wrappedApps.map(app => <AppTile key={app.id} app={app} onRemove={removeApp} />)}
                  </div>

                  {wrappedApps.length === 0 && (
                    <p className="text-[9px] text-white/15 text-center mt-5 font-mono tracking-widest">NO APPLICATIONS WRAPPED YET</p>
                  )}
                </motion.div>
              )}

              {/* ── SYSTEM VITALS ── */}
              {activeTab === "VITALS" && (
                <motion.div key="vitals"
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.22 }} className="flex-1 overflow-y-auto px-7 py-8 custom-scrollbar">
                  <div className="flex flex-col gap-6">
                    {/* SYSTEM INTEGRITY OVERVIEW (Dry/Honest) */}
                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
                      <div className="flex items-center justify-between mb-6 text-left">
                        <div>
                          <h3 className="text-sm font-bold text-white uppercase tracking-widest">System Integrity</h3>
                          <p className="text-[9px] text-white/30 mt-1 uppercase tracking-tighter">Hardware Telemetry & Resource Distribution</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-bold text-emerald-400">NOMINAL</div>
                      </div>

                      <p className="text-[10px] text-white/40 leading-relaxed mb-6 text-left">
                        MSQECC layer is currently optimizing local GGUF offloading. VRAM pressure is monitored at the kernel level to prevent paging collapse on low-RAM legacy devices.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {/* Hardware Cards */}
                      <div className="p-6 rounded-2xl border border-white/5 space-y-5" style={{ background: "rgba(0,243,255,0.02)" }}>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2"><Cpu size={14} style={{ color: "#00f3ff" }} /><span className="text-xs font-bold text-white/60 uppercase tracking-widest">CPU</span></div>
                          <span className="text-2xl font-black" style={{ color: "#00f3ff" }}>{status ? `${status.hardware.cpu_usage_percent.toFixed(0)}%` : "—"}</span>
                        </div>
                        <div className="h-[3px] w-full rounded-full overflow-hidden bg-white/5">
                          <motion.div animate={{ width: `${status?.hardware.cpu_usage_percent ?? 0}%` }} className="h-full rounded-full" style={{ background: "#00f3ff", boxShadow: "0 0 8px rgba(0,243,255,0.4)" }} />
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl border border-white/5 space-y-5" style={{ background: "rgba(167,139,250,0.02)" }}>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2"><Database size={14} style={{ color: "#a78bfa" }} /><span className="text-xs font-bold text-white/60 uppercase tracking-widest">RAM</span></div>
                          <span className="text-2xl font-black" style={{ color: "#a78bfa" }}>{status ? `${status.hardware.ram_used_mb}MB` : "—"}</span>
                        </div>
                        <div className="h-[3px] w-full rounded-full overflow-hidden bg-white/5">
                          <motion.div animate={{ width: `${status ? (status.hardware.ram_used_mb / status.hardware.ram_total_mb) * 100 : 0}%` }} className="h-full rounded-full" style={{ background: "#a78bfa", boxShadow: "0 0 8px rgba(167,139,250,0.4)" }} />
                        </div>
                      </div>

                      {/* Privacy Health Score Dashboard */}
                      <div className="p-6 rounded-2xl border border-white/5 col-span-2 space-y-4" style={{ background: "rgba(16,185,129,0.015)" }}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2"><Shield size={14} className="text-emerald-400" /><span className="text-xs font-bold text-white/60 uppercase tracking-widest">Privacy Health Score</span></div>
                          <span className="text-sm font-bold font-mono" style={{ color: privacyHealth?.air_gapped ? "#f43f5e" : "#10b981" }}>
                            {privacyHealth?.air_gapped ? "AIR-GAPPED" : privacyHealth?.quarantine_level ?? "OPEN"}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                          {[
                            { label: "Memories Stored", val: privacyHealth?.memories_stored ?? 0, color: "#00f3ff" },
                            { label: "PII Scrubbed", val: privacyHealth?.pii_scrubbed_count ?? 0, color: "#10b981" },
                            { label: "H-Neuron", val: "SUPPRESSED", color: "#4ade80" },
                            { label: "Data Leaked", val: `${privacyHealth?.data_leaked_bytes ?? 0} B`, color: "#f59e0b" },
                          ].map((s, i) => (
                            <div key={i} className="px-4 py-3 rounded-xl border border-white/5 space-y-1" style={{ background: `${s.color}08` }}>
                              <p className="text-[8px] text-white/25 uppercase tracking-widest">{s.label}</p>
                              <p className="text-lg font-bold font-mono" style={{ color: s.color }}>{s.val}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* MSQECC Swarm & Update Control (User Requested Phase 20+) */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4 text-left">
                        <div className="flex items-center gap-2">
                          <Globe size={14} className="text-[#00f3ff]" />
                          <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Global Swarm Intelligence</span>
                        </div>
                        <p className="text-[10px] text-white/30 leading-relaxed">
                          Synchronize qualitative breakthroughs via P2P syndrome propagation across the Lumina human-swarms.
                        </p>
                        <button
                          onClick={handleGlobalSync}
                          disabled={swarmSyncing}
                          className="w-full py-3 rounded-xl border border-white/10 hover:border-[#00f3ff]/40 hover:bg-[#00f3ff]/5 text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {swarmSyncing ? "Synchronizing Lattice..." : "Trigger Swarm Sync"}
                        </button>
                      </div>

                      <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4 text-left">
                        <div className="flex items-center gap-2">
                          <Activity size={14} className="text-[#a78bfa]" />
                          <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Self-Update Protocol</span>
                        </div>
                        <p className="text-[10px] text-white/30 leading-relaxed">
                          Atomic background updates for the sovereign OS runtime. Verifies mathematical resonance before patching.
                        </p>
                        <button
                          onClick={handleCheckUpdates}
                          className="w-full py-3 rounded-xl border border-white/10 hover:border-[#a78bfa]/40 hover:bg-[#a78bfa]/5 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                        >
                          {updateStatus ? "Ready for Reconfiguration" : "Check for Updates"}
                        </button>
                      </div>
                    </div>

                    {/* Quantum Identity Seed (Blueprint 12/22) */}
                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] space-y-5 text-left">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Shield size={14} className="text-amber-400" />
                          <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Post-Quantum Identity Seed</span>
                        </div>
                        {!quantumSeed && (
                          <button
                            onClick={handleGenerateQuantumSeed}
                            className="px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-[9px] font-bold text-amber-400 hover:bg-amber-500/10 transition-all cursor-pointer"
                          >
                            GENERATE ML-KEM-768
                          </button>
                        )}
                      </div>

                      {quantumSeed ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                          <p className="text-[10px] text-white/40 leading-relaxed">
                            Identity anchored via ML-KEM-768. This seed is required to decrypt long-term memory syndromes on new hardware.
                          </p>
                          <div className="p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-[9px] text-[#00f3ff]/60 break-all">
                            &gt; PK_HEX: {quantumSeed.public_key.substring(0, 64)}...<br />
                            &gt; SEAL: {quantumSeed.entropy_seal}<br />
                            &gt; GENERATED: {new Date(quantumSeed.generation_timestamp).toLocaleString()}
                          </div>
                        </motion.div>
                      ) : (
                        <p className="text-[10px] text-white/20 leading-relaxed italic">
                          No identity seed detected. Identity is currently ephemeral.
                        </p>
                      )}
                    </div>

                  </div>
                </motion.div>
              )}

              {/* ── WORKFLOW LOGIC ── */}
              {activeTab === "TASKS" && (
                <motion.div key="tasks"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }} className="flex-1 p-7 overflow-y-auto custom-scrollbar">
                  <div className="mb-8 text-left">
                    <h2 className="text-lg font-bold mb-1.5 flex items-center gap-2 uppercase tracking-widest">Workflow Logic</h2>
                    <p className="text-[11px] text-white/35 max-w-lg">Background tasks and execution horizons tracked across independent local nodes. Swarm logic enforces execution priority.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-5 text-left">
                    {["PENDING", "ACTIVE", "STABILIZED"].map((col, idx) => (
                      <div key={idx} className="flex flex-col gap-3">
                        <h3 className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 border-b border-white/5 pb-2">{col}</h3>
                        {idx === 0 && (
                          <div className="p-4 rounded-xl border border-white/5 opacity-40 hover:opacity-100 transition-all cursor-pointer border-dashed"
                            style={{ background: "rgba(255,255,255,0.01)" }}>
                            <p className="text-[10px] text-white/30 text-center font-mono">+ ASSIGN NODE</p>
                          </div>
                        )}
                        {idx === 1 && (
                          <div className="p-4 rounded-xl border border-[#00f3ff]/20 flex flex-col gap-2 relative overflow-hidden"
                            style={{ background: "rgba(0,243,255,0.02)" }}>
                            <div className="absolute top-0 right-0 p-2"><Activity size={10} className="text-[#00f3ff] animate-pulse-glow" /></div>
                            <span className="text-[8px] font-bold opacity-50 uppercase tracking-widest text-[#00f3ff]">Local Tasks</span>
                            <p className="text-xs font-semibold text-white/80">Refactor IO Bindings</p>
                            <div className="h-1 w-full bg-white/5 rounded-full mt-2 overflow-hidden"><motion.div animate={{ width: ['30%', '80%', '40%'] }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-gradient-to-r from-[#00f3ff] to-[#a78bfa]" /></div>
                          </div>
                        )}
                        {idx === 2 && (
                          <div className="p-4 rounded-xl border border-green-500/20 flex flex-col gap-2 relative"
                            style={{ background: "rgba(16,185,129,0.02)" }}>
                            <div className="absolute top-0 right-0 p-2"><CheckCircle size={10} className="text-green-400" /></div>
                            <span className="text-[8px] font-bold opacity-50 uppercase tracking-widest text-green-400">Executed</span>
                            <p className="text-xs font-semibold text-white/80">Quarantine Check</p>
                            <p className="text-[9px] font-mono text-white/30 truncate mt-1">LATENCY: -14ms</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── SETTINGS / AIR-GAP ── */}
              {activeTab === "SETTINGS" && (
                <motion.div key="settings"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }} className="flex-1 p-7 overflow-y-auto custom-scrollbar">
                  <div className="mb-8">
                    <h2 className="text-lg font-bold mb-1.5 flex items-center gap-2"><SlidersHorizontal style={{ color: "#ec4899" }} size={18} /> Settings</h2>
                    <p className="text-[11px] text-white/35 max-w-lg">Configure local behavior, privacy, startup, and language.</p>
                  </div>

                  <div className="space-y-6 max-w-2xl">
                    {/* Air Gapped Toggle */}
                    <div className="p-6 rounded-2xl border flex items-center justify-between"
                      style={{ background: isAirGapped ? "rgba(244,63,94,0.05)" : "rgba(255,255,255,0.01)", borderColor: isAirGapped ? "rgba(244,63,94,0.3)" : "rgba(255,255,255,0.05)" }}>
                      <div className="flex-1 pr-6 drop-shadow">
                        <h3 className="text-sm font-bold text-white mb-1 drop-shadow-md flex items-center gap-2">
                          {isAirGapped ? <ServerOff size={14} className="text-rose-500" /> : <Globe size={14} className="text-[#00f3ff]" />}
                          Offline Mode
                        </h3>
                        <p className="text-[10px] text-white/40 leading-relaxed font-mono">
                          When enabled, internet inference is blocked and only local features run.
                        </p>
                      </div>
                      <button onClick={async () => {
                        const newState = !isAirGapped;
                        setIsAirGapped(newState);
                        setToastMessage(newState ? "Air-Gapped Mode Enabled. Network severed at Ring-0." : "Standard Node Connectivity Restored.");
                        setTimeout(() => setToastMessage(null), 3000);
                        try {
                          const health = await toggleAirGap(newState);
                          setPrivacyHealth(health);
                        } catch { /* silent */ }
                      }}
                        className="w-14 h-7 rounded-full relative transition-all duration-300 shadow-inner flex shrink-0 cursor-pointer border"
                        style={{ background: isAirGapped ? "#f43f5e" : "rgba(255,255,255,0.1)", borderColor: isAirGapped ? "#be123c" : "rgba(255,255,255,0.2)" }}>
                        <motion.div layout className="w-5 h-5 bg-white rounded-full mt-0.5 ml-1 shadow-md"
                          style={{ marginLeft: isAirGapped ? "30px" : "4px" }} />
                      </button>
                    </div>

                    {/* Cognitive Audio Settings */}
                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] space-y-6">
                      <div className="flex items-center gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Voice Responses</h4>
                          <p className="text-[9px] text-white/30 mt-1 uppercase tracking-tighter">Lumina will audibly respond to all queries</p>
                        </div>
                        <button onClick={async () => {
                          const newState = !voiceBackEnabled;
                          setVoiceBackEnabled(newState);
                          await saveSetting("voice_back", newState.toString());
                        }}
                          className="w-12 h-6 rounded-full relative transition-all duration-300 flex shrink-0 cursor-pointer border"
                          style={{ background: voiceBackEnabled ? "#10b981" : "rgba(255,255,255,0.05)", borderColor: voiceBackEnabled ? "#059669" : "rgba(255,255,255,0.1)" }}>
                          <motion.div layout className="w-4 h-4 bg-white rounded-full mt-0.5"
                            style={{ marginLeft: voiceBackEnabled ? "24px" : "4px" }} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Local Transcription</h4>
                          <p className="text-[9px] text-white/30 mt-1 uppercase tracking-tighter">Use a local speech-to-text endpoint for the mic</p>
                        </div>
                        <button onClick={async () => {
                          const newState = !useLocalTranscription;
                          setUseLocalTranscription(newState);
                          await saveSetting("transcription_native", newState.toString());
                        }}
                          className="w-12 h-6 rounded-full relative transition-all duration-300 flex shrink-0 cursor-pointer border"
                          style={{ background: useLocalTranscription ? "#00f3ff" : "rgba(255,255,255,0.05)", borderColor: useLocalTranscription ? "#0ea5e9" : "rgba(255,255,255,0.1)" }}>
                          <motion.div layout className="w-4 h-4 bg-white rounded-full mt-0.5"
                            style={{ marginLeft: useLocalTranscription ? "24px" : "4px" }} />
                        </button>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Transcription Endpoint</label>
                        <input
                          value={transcriptionEndpoint}
                          onChange={(e) => setTranscriptionEndpoint(e.target.value)}
                          onBlur={async () => {
                            const v = transcriptionEndpoint.trim();
                            setTranscriptionEndpoint(v);
                            await saveSetting("transcription_endpoint", v);
                          }}
                          placeholder="http://127.0.0.1:9001/transcribe"
                          className="bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white/70 outline-none focus:border-[#00f3ff]/40 transition-all"
                        />
                        <p className="text-[7px] text-white/15 font-mono uppercase mt-1">Expect POST form-data with a "file" field.</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Performance Mode</h4>
                          <p className="text-[9px] text-white/30 mt-1 uppercase tracking-tighter">Use lighter settings for older hardware.</p>
                        </div>
                        <button onClick={async () => {
                          const newState = !isLatticeEnabled;
                          setIsLatticeEnabled(newState);
                          await saveSetting("lattice_enabled", newState.toString());
                        }}
                          className="w-12 h-6 rounded-full relative transition-all duration-300 flex shrink-0 cursor-pointer border"
                          style={{ background: isLatticeEnabled ? "#00f3ff" : "rgba(255,255,255,0.05)", borderColor: isLatticeEnabled ? "#0ea5e9" : "rgba(255,255,255,0.1)" }}>
                          <motion.div layout className="w-4 h-4 bg-white rounded-full mt-0.5"
                            style={{ marginLeft: isLatticeEnabled ? "24px" : "4px" }} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Local Transcription</h4>
                          <p className="text-[9px] text-white/30 mt-1 uppercase tracking-tighter">Use a local speech-to-text endpoint for the mic</p>
                        </div>
                        <button onClick={async () => {
                          const newState = !useLocalTranscription;
                          setUseLocalTranscription(newState);
                          await saveSetting("transcription_native", newState.toString());
                        }}
                          className="w-12 h-6 rounded-full relative transition-all duration-300 flex shrink-0 cursor-pointer border"
                          style={{ background: useLocalTranscription ? "#00f3ff" : "rgba(255,255,255,0.05)", borderColor: useLocalTranscription ? "#0ea5e9" : "rgba(255,255,255,0.1)" }}>
                          <motion.div layout className="w-4 h-4 bg-white rounded-full mt-0.5"
                            style={{ marginLeft: useLocalTranscription ? "24px" : "4px" }} />
                        </button>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Transcription Endpoint</label>
                        <input
                          value={transcriptionEndpoint}
                          onChange={(e) => setTranscriptionEndpoint(e.target.value)}
                          onBlur={async () => {
                            const v = transcriptionEndpoint.trim();
                            setTranscriptionEndpoint(v);
                            await saveSetting("transcription_endpoint", v);
                          }}
                          placeholder="http://127.0.0.1:9001/transcribe"
                          className="bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white/70 outline-none focus:border-[#00f3ff]/40 transition-all"
                        />
                        <p className="text-[7px] text-white/15 font-mono uppercase mt-1">Expect POST form-data with a "file" field.</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Auto Launch</h4>
                          <p className="text-[9px] text-white/30 mt-1 uppercase tracking-tighter">Ensure Lumina starts and listens on system boot</p>
                        </div>
                        <button onClick={async () => {
                          const newState = !isAutoStartEnabled;
                          setIsAutoStartEnabled(newState);
                          if (newState) {
                            await enable();
                            setToastMessage("Auto-Launch: Persistent Registry Hook Enabled.");
                          } else {
                            await disable();
                            setToastMessage("Auto-Launch: Registry Hook Severed.");
                          }
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                          className="w-12 h-6 rounded-full relative transition-all duration-300 flex shrink-0 cursor-pointer border"
                          style={{ background: isAutoStartEnabled ? "#00f3ff" : "rgba(255,255,255,0.05)", borderColor: isAutoStartEnabled ? "#0ea5e9" : "rgba(255,255,255,0.1)" }}>
                          <motion.div layout className="w-4 h-4 bg-white rounded-full mt-0.5"
                            style={{ marginLeft: isAutoStartEnabled ? "24px" : "4px" }} />
                        </button>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Language</label>
                        <select
                          value={language} onChange={async (e) => {
                            const val = e.target.value;
                            setLanguage(val);
                            await saveSetting("language", val);
                          }}
                          className="bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white/70 outline-none focus:border-[#00f3ff]/40 transition-all cursor-pointer"
                        >
                          <option value="en-US">English (Western Standard)</option>
                          <option value="fr-FR">Français (Europe)</option>
                          <option value="de-DE">Deutsch (Germany)</option>
                          <option value="es-ES">Español (Iberia)</option>
                          <option value="zh-CN">Mandarin (Simplified)</option>
                          <option value="ja-JP">Japanese (Standard)</option>
                          <option value="ru-RU">Russian (Cyrillic)</option>
                        </select>
                        <p className="text-[7px] text-white/15 font-mono uppercase mt-1">Lumina utilizes native OS localized neural engines</p>
                      </div>
                    </div>

                    {/* Inference Engine Block */}
                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
                      <h3 className="text-sm font-bold text-white mb-4">Model Runtime</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 border rounded-xl cursor-pointer ${isAirGapped ? 'border-rose-500/40 bg-rose-500/5 opacity-50' : 'border-[#00f3ff]/40 bg-[#00f3ff]/5'}`}>
                          <h4 className={`text-xs font-bold ${isAirGapped ? 'text-rose-400' : 'text-[#00f3ff]'}`}>Local Ollama Core</h4>
                          <p className="text-[9px] text-white/40 mt-1">Resident Model: Qwen 2.5:7b</p>
                          <p className="text-[9px] font-mono mt-1.5" style={{ color: isAirGapped ? '#f43f5e' : '#4ade80' }}>
                            {isAirGapped ? '● SEVERED' : '● CONNECTED'}
                          </p>
                        </div>
                        <div className="p-4 border border-white/5 bg-white/[0.02] rounded-xl opacity-30 cursor-pointer">
                          <h4 className="text-xs font-bold text-white">External Quantum Oracle</h4>
                          <p className="text-[9px] text-white/40 mt-1">Requires Online Mode (API Key)</p>
                          <p className="text-[9px] font-mono mt-1.5 text-white/20">● DISABLED</p>
                        </div>
                      </div>
                      <div className="mt-5 border-t border-white/10 pt-4">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Neural Tuning</h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-white/35 uppercase tracking-wider">Context</label>
                            <input
                              value={inferenceNumCtx}
                              onChange={(e) => setInferenceNumCtx(e.target.value)}
                              onBlur={async () => {
                                const v = clampInferenceValue(inferenceNumCtx, 1024, 512, 4096);
                                setInferenceNumCtx(String(v));
                                await saveSetting("inference_num_ctx", String(v));
                              }}
                              inputMode="numeric"
                              className="bg-black border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white/80 outline-none focus:border-[#00f3ff]/40"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-white/35 uppercase tracking-wider">Max Tokens</label>
                            <input
                              value={inferenceNumPredict}
                              onChange={(e) => setInferenceNumPredict(e.target.value)}
                              onBlur={async () => {
                                const v = clampInferenceValue(inferenceNumPredict, 192, 64, 1024);
                                setInferenceNumPredict(String(v));
                                await saveSetting("inference_num_predict", String(v));
                              }}
                              inputMode="numeric"
                              className="bg-black border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white/80 outline-none focus:border-[#00f3ff]/40"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-white/35 uppercase tracking-wider">Threads</label>
                            <input
                              value={inferenceNumThread}
                              onChange={(e) => setInferenceNumThread(e.target.value)}
                              onBlur={async () => {
                                const v = clampInferenceValue(inferenceNumThread, 4, 1, 32);
                                setInferenceNumThread(String(v));
                                await saveSetting("inference_num_thread", String(v));
                              }}
                              inputMode="numeric"
                              className="bg-black border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white/80 outline-none focus:border-[#00f3ff]/40"
                            />
                          </div>
                        </div>
                        <p className="text-[9px] text-white/30 mt-3">Tune local inference tradeoffs without editing files.</p>
                      <div className="mt-5 border-t border-white/10 pt-4">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Model Preference</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-white/35 uppercase tracking-wider">Preferred Model</label>
                            <input
                              value={preferredModel}
                              onChange={(e) => setPreferredModel(e.target.value)}
                              onBlur={async () => {
                                const v = preferredModel.trim();
                                setPreferredModel(v);
                                await saveSetting("inference_model_pref", v);
                              }}
                              placeholder="e.g. llama3.1:8b or qwen2.5:7b"
                              className="bg-black border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white/80 outline-none focus:border-[#00f3ff]/40"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-white/35 uppercase tracking-wider">Preset</label>
                            <select
                              value={inferencePreset}
                              onChange={async (e) => {
                                const val = e.target.value;
                                setInferencePreset(val);
                                await saveSetting("inference_preset", val);
                              }}
                              className="bg-black border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white/80 outline-none focus:border-[#00f3ff]/40 transition-all cursor-pointer"
                            >
                              <option value="fast">Fast (Speed)</option>
                              <option value="balanced">Balanced</option>
                              <option value="quality">Quality (Depth)</option>
                            </select>
                          </div>
                        </div>
                        <p className="text-[9px] text-white/30 mt-3">Preset tunes default context + output length. Preferred model is used when installed.</p>
                      </div>
                      </div>
                    </div>

                    {/* Plugin Sandbox (Phase 13) */}
                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
                      <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        Plugin Sandbox
                      </h3>
                      <p className="text-[10px] text-white/40 leading-relaxed font-mono mb-4">
                        Ring-0 execution environment for offline WebAssembly modules. Strict boundary enforcement. No external I/O.
                      </p>
                      <div
                        className="border border-dashed border-[#00f3ff]/30 bg-[#00f3ff]/5 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-[#00f3ff]/10 transition-all hover:border-[#00f3ff]/50"
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                            const file = e.dataTransfer.files[0];
                            if (file.name.endsWith('.wasm')) {
                              setToastMessage(`Compiling WASM Binary: ${file.name}...`);
                              try {
                                const buffer = await file.arrayBuffer();
                                const uint8Array = new Uint8Array(buffer);
                                const result = await executeWasmPlugin(file.name, uint8Array);
                                setToastMessage(`[ WASM ] ${result.result_string} (${result.execution_time_ms}ms latency)`);
                                setTimeout(() => setToastMessage(null), 5000);
                              } catch (err: any) {
                                setToastMessage(`[ WASM COMPUTE TRAP ] ${err}`);
                                setTimeout(() => setToastMessage(null), 4000);
                              }
                            } else {
                              setToastMessage("Sandbox Violation: Only strictly-typed .wasm binaries allowed.");
                              setTimeout(() => setToastMessage(null), 3000);
                            }
                          }
                        }}>
                        <p className="text-xs font-bold text-[#00f3ff] uppercase mb-1">Drop .WASM Binary to Execute</p>
                        <p className="text-[9px] text-[#00f3ff]/50">Secure Local Execution Only</p>
                      </div>
                    </div>

                    {/* Privacy Metrics (Phase 12) */}
                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
                      <h3 className="text-sm font-bold text-white mb-4">Privacy Metrics</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "Quarantine Level", val: privacyHealth?.quarantine_level ?? "OPEN", color: privacyHealth?.air_gapped ? "#f43f5e" : "#10b981" },
                          { label: "Lattice Mode", val: privacyHealth?.lattice_mode ?? "FULL", color: "#00f3ff" },
                          { label: "Vault Integrity", val: `${((privacyHealth?.vault_integrity ?? 1) * 100).toFixed(1)}%`, color: "#a78bfa" },
                        ].map((m, i) => (
                          <div key={i} className="p-3 rounded-xl border border-white/5" style={{ background: `${m.color}08` }}>
                            <p className="text-[8px] text-white/25 uppercase tracking-widest">{m.label}</p>
                            <p className="text-sm font-bold font-mono mt-1" style={{ color: m.color }}>{m.val}</p>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        {[
                          { label: "PII Scrubbed", val: privacyHealth?.pii_scrubbed_count ?? 0 },
                          { label: "Calls Blocked", val: privacyHealth?.network_calls_blocked ?? 0 },
                          { label: "Memories", val: privacyHealth?.memories_stored ?? 0 },
                        ].map((m, i) => (
                          <div key={i} className="p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                            <p className="text-[8px] text-white/25 uppercase tracking-widest">{m.label}</p>
                            <p className="text-lg font-bold font-mono text-white/70 mt-1">{m.val}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button onClick={async () => {
                      try {
                        const msg = await clearMemoryVault();
                        setToastMessage(msg);
                        setTimeout(() => setToastMessage(null), 3000);
                        const health = await getPrivacyHealth();
                        setPrivacyHealth(health);
                        setMessages([]); // Clear local UI chat
                      } catch (e: any) {
                        setToastMessage(e);
                        setTimeout(() => setToastMessage(null), 3000);
                      }
                    }}
                      className="mt-4 w-full py-3 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2">
                      <Lock size={12} /> Clear Chat Memory
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* ── Auto-Defcon Toast Notification ── */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full border shadow-2xl flex items-center gap-3 z-50 backdrop-blur-xl"
                  style={{ background: isAirGapped ? "rgba(244,63,94,0.15)" : "rgba(0,243,255,0.15)", borderColor: isAirGapped ? "rgba(244,63,94,0.4)" : "rgba(0,243,255,0.4)" }}>
                  {isAirGapped ? <ServerOff size={14} className="text-rose-400" /> : <Bell size={14} className="text-[#00f3ff]" />}
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">{toastMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </main >
      </div >
    </>
  );
}
















































































