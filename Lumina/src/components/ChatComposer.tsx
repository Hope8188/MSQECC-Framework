import type { RefObject } from "react";
import { ChevronRight, Mic, MicOff } from "lucide-react";

type ChatComposerProps = {
  input: string;
  isProcessing: boolean;
  isRecording: boolean;
  isTranscribing: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onToggleRecording: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

export function ChatComposer({
  input,
  isProcessing,
  isRecording,
  isTranscribing,
  onInputChange,
  onSend,
  onToggleRecording,
  inputRef,
}: ChatComposerProps) {
  return (
    <div className="px-7 pb-7 pt-2">
      <div
        className="flex items-center border rounded-2xl p-2 transition-all"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderColor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(40px)",
        }}
      >
        <input
          data-testid="chat-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
          placeholder={isRecording || isTranscribing ? "Transcribing local audio..." : "Input query..."}
          disabled={isProcessing || isRecording || isTranscribing}
          className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-[12px] text-white placeholder:text-white/20 font-mono disabled:opacity-40"
        />
        <button
          onClick={onToggleRecording}
          disabled={isProcessing || isTranscribing}
          className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer shrink-0 mr-2 ${isRecording ? "animate-pulse" : ""}`}
          style={{ background: isRecording ? "rgba(244,63,94,0.8)" : "rgba(255,255,255,0.05)" }}
        >
          {isRecording ? <MicOff size={15} className="text-white" /> : <Mic size={15} className="text-white" />}
        </button>
        <button
          data-testid="send-button"
          onClick={onSend}
          disabled={isProcessing || isTranscribing || (!input.trim() && !isRecording)}
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer shrink-0 disabled:opacity-25"
          style={{ background: input.trim() && !isProcessing ? "#00f3ff" : "rgba(255,255,255,0.05)" }}
        >
          <ChevronRight size={15} style={{ color: input.trim() && !isProcessing ? "#000" : "#fff" }} />
        </button>
      </div>
      <p className="text-center text-[8px] text-white/15 font-mono mt-1.5 tracking-widest">
        ENTER SENDS | CTRL+N NEW CHAT | CTRL+SHIFT+SPACE SUMMON | CTRL+1-7 TABS
      </p>
    </div>
  );
}






