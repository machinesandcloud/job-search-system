"use client";

import { useEffect, useRef, useState } from "react";

export type AvatarState = "idle" | "thinking" | "speaking" | "listening";

interface ZariAvatarProps {
  state?: AvatarState;
  size?: number;
  className?: string;
}

/* ─── Voice equalizer bars (speaking state) ─── */
function VoiceBars() {
  return (
    <div className="flex items-end justify-center gap-[3px]" style={{ height: 32 }}>
      {[
        { anim: "voice-bar-1 0.9s ease-in-out infinite", delay: "0ms" },
        { anim: "voice-bar-2 0.7s ease-in-out infinite", delay: "80ms" },
        { anim: "voice-bar-3 0.8s ease-in-out infinite", delay: "40ms" },
        { anim: "voice-bar-4 0.6s ease-in-out infinite", delay: "120ms" },
        { anim: "voice-bar-5 0.75s ease-in-out infinite", delay: "20ms" },
      ].map((bar, i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: 12,
            borderRadius: 3,
            background: "linear-gradient(to top, #4361EE, #818CF8)",
            animation: bar.anim,
            animationDelay: bar.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Thinking particle dots ─── */
function ThinkingDots({ size }: { size: number }) {
  const r = size * 0.56;
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 7,
            height: 7,
            marginTop: -3.5,
            marginLeft: -3.5,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#818CF8" : "#93C5FD",
            animation: i % 2 === 0
              ? `orbit-particle ${1.4 + i * 0.3}s linear infinite`
              : `orbit-particle-rev ${1.6 + i * 0.25}s linear infinite`,
            animationDelay: `${i * 0.18}s`,
            transformOrigin: "center center",
          }}
        />
      ))}
    </>
  );
}

/* ─── Listening ripple rings ─── */
function ListenRipples({ size }: { size: number }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: -(size * 0.05 + i * 12),
            borderRadius: "50%",
            border: "1.5px solid rgba(34,211,238,0.45)",
            animation: `listen-ripple 1.8s ease-out infinite`,
            animationDelay: `${i * 0.55}s`,
          }}
        />
      ))}
    </>
  );
}

export function ZariAvatar({ state = "idle", size = 120, className = "" }: ZariAvatarProps) {
  const sphereSize = size * 0.58;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ambient ring — slow rotation */}
      <div
        style={{
          position: "absolute",
          inset: -size * 0.04,
          borderRadius: "50%",
          border: "1.5px solid transparent",
          background: "conic-gradient(from 0deg, #4361EE33, #818CF855, #4361EE33) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out" as React.CSSProperties["WebkitMaskComposite"],
          maskComposite: "exclude",
          animation: "spin-slow 8s linear infinite",
          opacity: state === "idle" ? 0.5 : 0.85,
        }}
      />

      {/* Pulse rings */}
      {(state === "idle" || state === "listening") && (
        <>
          <div style={{ position:"absolute", inset:-6, borderRadius:"50%", background:"rgba(67,97,238,0.12)", animation:"ring-pulse 2.2s ease-out infinite", animationDelay:"0s" }} />
          <div style={{ position:"absolute", inset:-6, borderRadius:"50%", background:"rgba(67,97,238,0.09)", animation:"ring-pulse 2.2s ease-out infinite", animationDelay:"0.7s" }} />
          <div style={{ position:"absolute", inset:-6, borderRadius:"50%", background:"rgba(67,97,238,0.06)", animation:"ring-pulse 2.2s ease-out infinite", animationDelay:"1.4s" }} />
        </>
      )}

      {/* Listening ripples */}
      {state === "listening" && <ListenRipples size={sphereSize} />}

      {/* Thinking particles */}
      {state === "thinking" && <ThinkingDots size={size} />}

      {/* Core sphere */}
      <div
        className="zari-glow"
        style={{
          width: sphereSize,
          height: sphereSize,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #818CF8 0%, #4361EE 45%, #1E3A8A 100%)",
          animation: state === "idle" ? "sphere-breathe 3s ease-in-out infinite" : undefined,
          boxShadow: "inset -6px -6px 20px rgba(0,0,0,0.35), inset 4px 4px 16px rgba(129,140,248,0.3)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 4,
          overflow: "hidden",
        }}
      >
        {/* Sphere highlight shimmer */}
        <div style={{
          position: "absolute",
          top: "12%",
          left: "18%",
          width: "30%",
          height: "22%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.22)",
          filter: "blur(4px)",
        }} />

        {/* Cyan inner ring */}
        <div style={{
          position: "absolute",
          inset: "10%",
          borderRadius: "50%",
          border: "1px solid rgba(34,211,238,0.20)",
        }} />

        {/* Eyes */}
        <div style={{ display:"flex", gap: sphereSize * 0.22, position:"relative", zIndex:1 }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: sphereSize * 0.12,
                height: sphereSize * 0.12,
                borderRadius: "50%",
                background: "#818CF8",
                boxShadow: "0 0 8px #818CF8, 0 0 16px rgba(34,211,238,0.6)",
                animation: `eye-glow 2.4s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Speaking bars shown inside sphere */}
        {state === "speaking" && (
          <div style={{ position:"relative", zIndex:1 }}>
            <VoiceBars />
          </div>
        )}
      </div>

      {/* Below-sphere state indicator */}
      <div
        style={{
          position: "absolute",
          bottom: -4,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        {state === "speaking" && (
          <div style={{
            padding: "3px 10px",
            borderRadius: 99,
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.30)",
            backdropFilter: "blur(8px)",
          }}>
            <VoiceBars />
          </div>
        )}
        {state === "listening" && (
          <div style={{
            padding: "4px 12px",
            borderRadius: 99,
            background: "rgba(34,211,238,0.10)",
            border: "1px solid rgba(34,211,238,0.30)",
            backdropFilter: "blur(8px)",
            fontSize: 10,
            fontWeight: 700,
            color: "#818CF8",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}>
            Listening…
          </div>
        )}
        {state === "thinking" && (
          <div style={{
            padding: "4px 12px",
            borderRadius: 99,
            background: "rgba(167,139,250,0.10)",
            border: "1px solid rgba(167,139,250,0.25)",
            backdropFilter: "blur(8px)",
            fontSize: 10,
            fontWeight: 700,
            color: "#93C5FD",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}>
            Thinking…
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Demo cycle: rotates through states automatically ─── */
export function ZariAvatarDemo({ size = 120 }: { size?: number }) {
  const states: AvatarState[] = ["idle", "listening", "thinking", "speaking"];
  const durations = [2500, 2000, 2200, 2800];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setIdx((i) => (i + 1) % states.length), durations[idx]);
    return () => clearTimeout(t);
  }, [idx]);

  return <ZariAvatar state={states[idx]} size={size} />;
}
