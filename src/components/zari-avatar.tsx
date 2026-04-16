"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export type AvatarState = "idle" | "thinking" | "speaking" | "listening";

interface ZariAvatarProps {
  state?: AvatarState;
  size?: number;
  className?: string;
  interactive?: boolean;
}

/* ─── Audio waveform bars (speaking) ─── */
function WaveformBars({ size, external = false }: { size: number; external?: boolean }) {
  const count = external ? 28 : 7;
  const barHeights = external
    ? [3,5,8,12,9,14,10,7,11,15,12,8,5,9,13,10,6,11,14,9,7,12,8,5,10,13,7,4]
    : [14,22,18,28,20,26,16];

  return (
    <div
      className="flex items-center justify-center"
      style={{ gap: external ? 3 : 4, height: external ? 36 : size * 0.28 }}
    >
      {barHeights.map((h, i) => (
        <div
          key={i}
          style={{
            width: external ? 3 : Math.max(3, size * 0.045),
            height: h,
            borderRadius: 99,
            background: external
              ? `rgba(67,97,238,${0.4 + (i % 3) * 0.2})`
              : `linear-gradient(to top, #4361EE, #818CF8, #06B6D4)`,
            animation: `voice-wave ${0.5 + (i % 5) * 0.12}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.04}s`,
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Orbiting neural particles (thinking) ─── */
function NeuralParticles({ size }: { size: number }) {
  const r1 = size * 0.52;
  const r2 = size * 0.68;
  return (
    <>
      {/* Inner orbit */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`inner-${i}`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 6,
            height: 6,
            marginTop: -3,
            marginLeft: -3,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#818CF8" : "#06B6D4",
            boxShadow: `0 0 8px ${i % 2 === 0 ? "#818CF8" : "#06B6D4"}`,
            animation: `neural-orbit-a ${1.8 + i * 0.15}s linear infinite`,
            animationDelay: `${i * 0.45}s`,
            transformOrigin: `0 0`,
          }}
        />
      ))}
      {/* Outer orbit — reverse */}
      {[0, 1, 2].map((i) => (
        <div
          key={`outer-${i}`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 5,
            height: 5,
            marginTop: -2.5,
            marginLeft: -2.5,
            borderRadius: "50%",
            background: "#A78BFA",
            boxShadow: "0 0 10px #A78BFA",
            animation: `neural-orbit-b ${2.4 + i * 0.2}s linear infinite`,
            animationDelay: `${i * 0.6}s`,
            transformOrigin: "0 0",
          }}
        />
      ))}
      {/* Orbit rings */}
      <div style={{ position:"absolute", inset: -(r1 - size * 0.29), borderRadius:"50%", border:"1px solid rgba(129,140,248,0.18)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset: -(r2 - size * 0.29), borderRadius:"50%", border:"1px dashed rgba(6,182,212,0.12)", pointerEvents:"none" }} />
    </>
  );
}

/* ─── Listening ripple rings ─── */
function ListenRipples({ size }: { size: number }) {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: -(size * 0.08 + i * 14),
            borderRadius: "50%",
            border: `${i === 0 ? 2 : 1.5}px solid rgba(6,182,212,${0.5 - i * 0.1})`,
            animation: `listen-ripple 2s ease-out infinite`,
            animationDelay: `${i * 0.45}s`,
          }}
        />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN AVATAR COMPONENT
═══════════════════════════════════════════════════ */
export function ZariAvatar({ state = "idle", size = 120, className = "", interactive = false }: ZariAvatarProps) {
  const sphereSize = size * 0.6;
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -12, y: dx * 12 });
  }, [interactive]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !interactive) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", () => { setTilt({ x: 0, y: 0 }); setHovered(false); });
    el.addEventListener("mouseenter", () => setHovered(true));
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [interactive, handleMouseMove]);

  /* State-based glow colors */
  const glowColor =
    state === "speaking"  ? "rgba(67,97,238,0.55)"  :
    state === "listening" ? "rgba(6,182,212,0.50)"   :
    state === "thinking"  ? "rgba(167,139,250,0.45)" :
    "rgba(67,97,238,0.30)";

  const outerGlowSize = hovered ? size * 0.22 : size * 0.14;

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
        perspective: 600,
        cursor: interactive ? "pointer" : "default",
      }}
    >
      {/* Deep outer ambient glow — state-reactive */}
      <div
        style={{
          position: "absolute",
          inset: -outerGlowSize,
          borderRadius: "50%",
          background: glowColor,
          filter: `blur(${size * 0.22}px)`,
          transition: "all 0.6s ease",
          opacity: state === "idle" ? 0.7 : 1,
          animation: "aurora-pulse 3s ease-in-out infinite",
        }}
      />

      {/* 3D tilting inner container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: interactive ? "transform 0.1s ease-out" : "transform 0.6s ease",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Rotating conic halo ring */}
        <div
          style={{
            position: "absolute",
            inset: -size * 0.06,
            borderRadius: "50%",
            background: "conic-gradient(from 0deg, #4361EE44, #818CF866, #06B6D444, #4361EE44)",
            animation: "spin-slow 6s linear infinite",
            opacity: state === "idle" ? 0.6 : 0.9,
            mask: "radial-gradient(circle, transparent 72%, black 80%)",
            WebkitMask: "radial-gradient(circle, transparent 72%, black 80%)",
          }}
        />

        {/* Pulse rings — idle / listening */}
        {(state === "idle" || state === "listening") && (
          <>
            <div style={{ position:"absolute", inset:-8, borderRadius:"50%", background:"rgba(67,97,238,0.10)", animation:"ring-pulse 2.4s ease-out infinite", animationDelay:"0s" }} />
            <div style={{ position:"absolute", inset:-8, borderRadius:"50%", background:"rgba(67,97,238,0.07)", animation:"ring-pulse 2.4s ease-out infinite", animationDelay:"0.8s" }} />
            <div style={{ position:"absolute", inset:-8, borderRadius:"50%", background:"rgba(67,97,238,0.04)", animation:"ring-pulse 2.4s ease-out infinite", animationDelay:"1.6s" }} />
          </>
        )}

        {/* Listening: cyan ripple rings */}
        {state === "listening" && <ListenRipples size={sphereSize} />}

        {/* Thinking: neural particle orbits */}
        {state === "thinking" && <NeuralParticles size={size} />}

        {/* ── CORE SPHERE ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: sphereSize,
            height: sphereSize,
            borderRadius: "50%",
            background: "radial-gradient(circle at 32% 30%, #A5B4FC 0%, #818CF8 18%, #4361EE 50%, #1E3A8A 78%, #0D1B4B 100%)",
            boxShadow: `
              inset -${size*0.05}px -${size*0.05}px ${size*0.15}px rgba(0,0,0,0.45),
              inset ${size*0.03}px ${size*0.03}px ${size*0.12}px rgba(165,180,252,0.35),
              0 0 ${size*0.25}px ${glowColor},
              0 ${size*0.05}px ${size*0.2}px rgba(0,0,0,0.3)
            `,
            animation: state === "idle" ? "sphere-breathe 3.2s ease-in-out infinite" : undefined,
            transition: "box-shadow 0.5s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: sphereSize * 0.06,
            overflow: "hidden",
          }}
        >
          {/* Primary specular highlight */}
          <div style={{
            position: "absolute",
            top: "8%",
            left: "14%",
            width: "38%",
            height: "28%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.35) 0%, transparent 100%)",
            filter: "blur(3px)",
            pointerEvents: "none",
          }} />

          {/* Secondary rim highlight */}
          <div style={{
            position: "absolute",
            bottom: "10%",
            right: "12%",
            width: "20%",
            height: "14%",
            borderRadius: "50%",
            background: "rgba(6,182,212,0.25)",
            filter: "blur(5px)",
            pointerEvents: "none",
          }} />

          {/* Inner cyan ring */}
          <div style={{
            position: "absolute",
            inset: "8%",
            borderRadius: "50%",
            border: "1px solid rgba(6,182,212,0.22)",
            pointerEvents: "none",
          }} />

          {/* ── Eyes ── */}
          <div style={{ display:"flex", gap: sphereSize * 0.24, position:"relative", zIndex:1 }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ position:"relative" }}>
                {/* Eye glow halo */}
                <div style={{
                  position: "absolute",
                  inset: -sphereSize * 0.04,
                  borderRadius: "50%",
                  background: "rgba(129,140,248,0.4)",
                  filter: "blur(4px)",
                }} />
                {/* Eye pupil */}
                <div style={{
                  position: "relative",
                  width: sphereSize * 0.13,
                  height: sphereSize * 0.13,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%, #E0E7FF, #818CF8)",
                  boxShadow: `0 0 ${sphereSize*0.1}px #818CF8, 0 0 ${sphereSize*0.18}px rgba(6,182,212,0.5)`,
                  animation: `eye-glow 2.8s ease-in-out infinite`,
                  animationDelay: `${i * 0.35}s`,
                }} />
              </div>
            ))}
          </div>

          {/* Speaking waveform inside sphere */}
          {state === "speaking" && (
            <div style={{ position:"relative", zIndex:1, marginTop: -sphereSize*0.05 }}>
              <WaveformBars size={sphereSize} />
            </div>
          )}
        </div>

        {/* External waveform ring (speaking) */}
        {state === "speaking" && (
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, calc(-50% + " + sphereSize * 0.55 + "px))" }}>
            <WaveformBars size={sphereSize} external />
          </div>
        )}
      </div>

      {/* ── State badge below sphere ── */}
      <div style={{ position:"absolute", bottom: -size * 0.04, left:"50%", transform:"translateX(-50%)", whiteSpace:"nowrap" }}>
        {state === "speaking" && (
          <span style={{
            display:"inline-flex", alignItems:"center", gap:5,
            padding:"3px 11px", borderRadius:99,
            background:"rgba(67,97,238,0.12)", border:"1px solid rgba(67,97,238,0.28)",
            backdropFilter:"blur(8px)",
            fontSize:10, fontWeight:700, color:"#818CF8", letterSpacing:"0.1em", textTransform:"uppercase",
          }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#4361EE", animation:"blink 1s step-end infinite" }} />
            Speaking
          </span>
        )}
        {state === "listening" && (
          <span style={{
            display:"inline-flex", alignItems:"center", gap:5,
            padding:"3px 11px", borderRadius:99,
            background:"rgba(6,182,212,0.10)", border:"1px solid rgba(6,182,212,0.30)",
            backdropFilter:"blur(8px)",
            fontSize:10, fontWeight:700, color:"#06B6D4", letterSpacing:"0.1em", textTransform:"uppercase",
          }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#06B6D4", animation:"blink 0.7s step-end infinite" }} />
            Listening
          </span>
        )}
        {state === "thinking" && (
          <span style={{
            display:"inline-flex", alignItems:"center", gap:5,
            padding:"3px 11px", borderRadius:99,
            background:"rgba(167,139,250,0.10)", border:"1px solid rgba(167,139,250,0.28)",
            backdropFilter:"blur(8px)",
            fontSize:10, fontWeight:700, color:"#A78BFA", letterSpacing:"0.1em", textTransform:"uppercase",
          }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#A78BFA", animation:"blink 1.2s ease infinite" }} />
            Thinking
          </span>
        )}
        {state === "idle" && (
          <span style={{
            display:"inline-flex", alignItems:"center", gap:5,
            padding:"3px 11px", borderRadius:99,
            background:"rgba(67,97,238,0.06)", border:"1px solid rgba(67,97,238,0.14)",
            backdropFilter:"blur(8px)",
            fontSize:10, fontWeight:600, color:"rgba(129,140,248,0.7)", letterSpacing:"0.08em", textTransform:"uppercase",
          }}>
            Ready
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Demo cycle ─── */
export function ZariAvatarDemo({ size = 120 }: { size?: number }) {
  const states: AvatarState[] = ["idle", "listening", "thinking", "speaking"];
  const durations = [2200, 1800, 2000, 2600];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setIdx((i) => (i + 1) % states.length), durations[idx]);
    return () => clearTimeout(t);
  }, [idx]);

  return <ZariAvatar state={states[idx]} size={size} interactive />;
}
