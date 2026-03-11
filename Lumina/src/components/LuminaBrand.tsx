import { AnimatePresence, motion } from "framer-motion";

const STARBURST_RAYS = [
  "rotate-0",
  "rotate-45",
  "rotate-90",
  "rotate-[135deg]",
];

export function PulsarBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* Subtle Starfield */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 4 + 3}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />
    </div>
  );
}

export function LuminaStarburstLogo({ size = 20 }: { size?: number }) {
  const frame = size * 2.6;
  const core = size * 1.55;

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/10 bg-black shadow-[0_0_24px_rgba(255,255,255,0.06)]"
      style={{ width: frame, height: frame }}
    >
      <div
        className="absolute inset-[12%] rounded-[1.1rem] border border-white/6"
        style={{ boxShadow: "inset 0 0 22px rgba(255,255,255,0.05)" }}
      />
      <div className="relative flex items-center justify-center" style={{ width: core, height: core }}>
        <div className="absolute inset-[24%] rounded-full bg-white/95 blur-[0.6px]" />
        {STARBURST_RAYS.map((rotation) => (
          <div key={rotation} className={`absolute flex items-center justify-center ${rotation} inset-0`}>
            <div className="h-[12%] w-full rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.7)]" />
          </div>
        ))}
        <div className="absolute inset-[30%] rotate-[22.5deg] rounded-full border border-white/35" />
        <div className="absolute inset-[35%] rounded-full bg-black shadow-[inset_0_0_16px_rgba(255,255,255,0.24)]" />
      </div>
    </div>
  );
}

export function LuminaVoidOrb({
  isListening = false,
  size = 224,
  interactive = false,
  className = "",
}: {
  isListening?: boolean;
  size?: number;
  interactive?: boolean;
  className?: string;
}) {
  const waveCount = isListening ? 5 : 3;
  const glowIntensity = isListening ? 0.65 : 0.28;
  const pulseScale = isListening ? 1.12 : 1.04;

  return (
    <div
      className={`relative flex items-center justify-center ${interactive ? "" : "pointer-events-none"} ${className}`}
      style={{ width: size, height: size }}
    >
      <AnimatePresence>
        {Array.from({ length: waveCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.3 + i * 0.18, 1],
              opacity: [0.08, 0.28 - i * 0.035, 0.08],
              rotate: [0, i % 2 === 0 ? 360 : -360],
              borderRadius: [
                "46% 54% 50% 50%",
                "62% 38% 58% 42%",
                "46% 54% 50% 50%",
              ],
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 2.4 + i * 0.35, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-white/10 blur-[1px]"
            style={{
              background: `radial-gradient(circle, transparent 66%, rgba(0,243,255,${0.05 + i * 0.02}) 84%, rgba(0,122,255,${0.04 + i * 0.015}) 100%)`,
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: [1, pulseScale, 1], opacity: [glowIntensity * 0.4, glowIntensity, glowIntensity * 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[18%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.65) 0%, rgba(0,243,255,0.2) 42%, rgba(0,122,255,0.18) 68%, transparent 100%)",
          boxShadow: "0 0 140px rgba(0,243,255,0.2)",
        }}
      />

      <motion.div
        animate={isListening ? { scale: [1, 1.07, 1], rotate: [0, 4, -4, 0] } : { scale: [1, 1.03, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex items-center justify-center rounded-full border border-white/10 bg-black shadow-[inset_0_0_35px_rgba(255,255,255,0.18)]"
        style={{ width: size * 0.44, height: size * 0.44 }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, rgba(0,243,255,0.35) 40%, rgba(0,122,255,0.2) 70%, rgba(0,0,0,0.9) 100%)",
          }}
        />
        <div className="absolute inset-[18%] rounded-full border border-white/15" />
        <div className="absolute inset-[32%] rounded-full border border-white/10" />
        <LuminaStarburstLogo size={16} />
      </motion.div>
    </div>
  );
}
