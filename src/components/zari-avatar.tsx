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
  const barHeights = external
    ? [3,5,9,14,10,16,12,8,13,18,14,9,5,10,15,11,7,13,17,10,7,14,9,5,11,15,8,4]
    : [10, 18, 14, 24, 18, 28, 20, 26, 16, 22, 12];

  return (
    <div className="flex items-center justify-center" style={{ gap: external ? 3 : 3, height: external ? 32 : size * 0.3 }}>
      {barHeights.map((h, i) => (
        <div
          key={i}
          style={{
            width: external ? 3 : Math.max(3, size * 0.038),
            height: h,
            minHeight: 3,
            borderRadius: 99,
            background: external
              ? `rgba(67,97,238,${0.35 + (i % 4) * 0.15})`
              : "linear-gradient(to top, #3451D1, #818CF8, #06B6D4)",
            animation: `voice-wave ${0.45 + (i % 6) * 0.1}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.035}s`,
            transformOrigin: "center",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Orbiting neural particles (thinking) ─── */
function NeuralParticles({ size }: { size: number }) {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <div key={`a${i}`} style={{ position:"absolute", top:"50%", left:"50%", width:6, height:6, marginTop:-3, marginLeft:-3, borderRadius:"50%", background: i%2===0?"#818CF8":"#06B6D4", boxShadow:`0 0 8px ${i%2===0?"#818CF8":"#06B6D4"}`, animation:`neural-orbit-a ${1.6+i*0.2}s linear infinite`, animationDelay:`${i*0.4}s`, transformOrigin:"0 0" }} />
      ))}
      {[0, 1, 2].map((i) => (
        <div key={`b${i}`} style={{ position:"absolute", top:"50%", left:"50%", width:5, height:5, marginTop:-2.5, marginLeft:-2.5, borderRadius:"50%", background:"#A78BFA", boxShadow:"0 0 10px #A78BFA", animation:`neural-orbit-b ${2.2+i*0.2}s linear infinite`, animationDelay:`${i*0.55}s`, transformOrigin:"0 0" }} />
      ))}
      <div style={{ position:"absolute", inset:`${size*0.08}px`, borderRadius:"50%", border:"1px solid rgba(129,140,248,0.15)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:`-${size*0.04}px`, borderRadius:"50%", border:"1px dashed rgba(6,182,212,0.10)", pointerEvents:"none" }} />
    </>
  );
}

/* ─── Listening ripple rings ─── */
function ListenRipples({ size }: { size: number }) {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position:"absolute", inset:-(size*0.1+i*12), borderRadius:"50%", border:`${i===0?2:1.5}px solid rgba(6,182,212,${0.45-i*0.08})`, animation:`listen-ripple 2s ease-out infinite`, animationDelay:`${i*0.45}s` }} />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN AVATAR COMPONENT
═══════════════════════════════════════════════════ */
export function ZariAvatar({ state = "idle", size = 120, className = "", interactive = false }: ZariAvatarProps) {
  const sphereSize = size * 0.58;
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  }, [interactive]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !interactive) return;
    const onMove  = (e: MouseEvent) => handleMouseMove(e);
    const onLeave = () => { setTilt({ x:0, y:0 }); setHovered(false); };
    const onEnter = () => setHovered(true);
    el.addEventListener("mousemove",  onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); el.removeEventListener("mouseenter", onEnter); };
  }, [interactive, handleMouseMove]);

  const glowColor =
    state === "speaking"  ? "rgba(67,97,238,0.50)"  :
    state === "listening" ? "rgba(6,182,212,0.45)"   :
    state === "thinking"  ? "rgba(167,139,250,0.40)" :
    "rgba(67,97,238,0.28)";

  return (
    /* ── outer container: explicit size, overflow visible for glow ── */
    <div
      ref={containerRef}
      className={`select-none ${className}`}
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        cursor: interactive ? "pointer" : "default",
      }}
    >
      {/* Ambient outer glow — blurred blob behind everything */}
      <div style={{
        position: "absolute",
        inset: -(hovered ? size*0.18 : size*0.12),
        borderRadius: "50%",
        background: glowColor,
        filter: `blur(${size * 0.2}px)`,
        transition: "all 0.5s ease",
        animation: "aurora-pulse 3.5s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* ── 3D tilting layer: fills container exactly via inset:0 ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: interactive ? "transform 0.1s ease-out" : "transform 0.7s ease",
        transformStyle: "preserve-3d",
        zIndex: 1,
      }}>

        {/* Rotating conic halo ring */}
        <div style={{
          position: "absolute",
          inset: -(size*0.05),
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, #4361EE44, #818CF870, #06B6D444, transparent, #4361EE44)",
          animation: "spin-slow 7s linear infinite",
          mask: "radial-gradient(circle, transparent 70%, black 78%)",
          WebkitMask: "radial-gradient(circle, transparent 70%, black 78%)",
          opacity: state === "idle" ? 0.55 : 0.85,
        }} />

        {/* Pulse rings (idle + listening) */}
        {(state === "idle" || state === "listening") && [0,1,2].map(i => (
          <div key={i} style={{ position:"absolute", inset:-8, borderRadius:"50%", background:`rgba(67,97,238,${0.10-i*0.03})`, animation:"ring-pulse 2.5s ease-out infinite", animationDelay:`${i*0.8}s` }} />
        ))}

        {/* Listening ripples */}
        {state === "listening" && <ListenRipples size={sphereSize} />}

        {/* Thinking neural orbits */}
        {state === "thinking" && <NeuralParticles size={size} />}

        {/* ── CORE SPHERE — centered via flex (no absolute pos needed) ── */}
        <div
          style={{
            position: "relative",        /* for inner children */
            zIndex: 2,
            width: sphereSize,
            height: sphereSize,
            borderRadius: "50%",
            background: "radial-gradient(circle at 33% 28%, #B4BEFF 0%, #818CF8 18%, #4361EE 52%, #1E3A8A 80%, #0D1B4B 100%)",
            boxShadow: `
              inset -${size*0.045}px -${size*0.045}px ${size*0.14}px rgba(0,0,0,0.45),
              inset  ${size*0.025}px  ${size*0.025}px ${size*0.10}px rgba(180,190,255,0.30),
              0 0 ${size*0.22}px ${glowColor},
              0 ${size*0.04}px ${size*0.16}px rgba(0,0,0,0.28)
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
          {/* Specular highlight top-left */}
          <div style={{ position:"absolute", top:"7%", left:"12%", width:"36%", height:"26%", borderRadius:"50%", background:"radial-gradient(ellipse, rgba(255,255,255,0.38) 0%, transparent 100%)", filter:"blur(3px)", pointerEvents:"none" }} />
          {/* Rim light bottom-right */}
          <div style={{ position:"absolute", bottom:"9%", right:"10%", width:"18%", height:"13%", borderRadius:"50%", background:"rgba(6,182,212,0.22)", filter:"blur(5px)", pointerEvents:"none" }} />
          {/* Inner ring */}
          <div style={{ position:"absolute", inset:"8%", borderRadius:"50%", border:"1px solid rgba(6,182,212,0.18)", pointerEvents:"none" }} />

          {/* Eyes */}
          <div style={{ display:"flex", gap: sphereSize * 0.24, position:"relative", zIndex:1 }}>
            {[0,1].map(i => (
              <div key={i} style={{ position:"relative" }}>
                <div style={{ position:"absolute", inset:-(sphereSize*0.04), borderRadius:"50%", background:"rgba(129,140,248,0.35)", filter:"blur(4px)" }} />
                <div style={{ position:"relative", width:sphereSize*0.13, height:sphereSize*0.13, borderRadius:"50%", background:"radial-gradient(circle at 33% 33%, #E0E7FF, #818CF8)", boxShadow:`0 0 ${sphereSize*0.08}px #818CF8, 0 0 ${sphereSize*0.16}px rgba(6,182,212,0.45)`, animation:"eye-glow 2.8s ease-in-out infinite", animationDelay:`${i*0.35}s` }} />
              </div>
            ))}
          </div>

          {/* Speaking waveform inside sphere */}
          {state === "speaking" && (
            <div style={{ position:"relative", zIndex:1, marginTop: -(sphereSize*0.04) }}>
              <WaveformBars size={sphereSize} />
            </div>
          )}
        </div>

        {/* External waveform arc below sphere (speaking) */}
        {state === "speaking" && (
          <div style={{ position:"absolute", bottom: size*0.04, left:"50%", transform:"translateX(-50%)" }}>
            <WaveformBars size={sphereSize} external />
          </div>
        )}

      </div>

      {/* ── State badge — outside 3D layer, anchored to bottom of container ── */}
      <div style={{ position:"absolute", bottom: -(size*0.07), left:"50%", transform:"translateX(-50%)", whiteSpace:"nowrap", zIndex:3, pointerEvents:"none" }}>
        {state === "speaking" && (
          <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 11px", borderRadius:99, background:"rgba(67,97,238,0.12)", border:"1px solid rgba(67,97,238,0.28)", backdropFilter:"blur(8px)", fontSize:10, fontWeight:700, color:"#818CF8", letterSpacing:"0.1em", textTransform:"uppercase" }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#4361EE", animation:"blink 1s step-end infinite" }} />Speaking
          </span>
        )}
        {state === "listening" && (
          <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 11px", borderRadius:99, background:"rgba(6,182,212,0.10)", border:"1px solid rgba(6,182,212,0.28)", backdropFilter:"blur(8px)", fontSize:10, fontWeight:700, color:"#06B6D4", letterSpacing:"0.1em", textTransform:"uppercase" }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#06B6D4", animation:"blink 0.7s step-end infinite" }} />Listening
          </span>
        )}
        {state === "thinking" && (
          <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 11px", borderRadius:99, background:"rgba(167,139,250,0.10)", border:"1px solid rgba(167,139,250,0.28)", backdropFilter:"blur(8px)", fontSize:10, fontWeight:700, color:"#A78BFA", letterSpacing:"0.1em", textTransform:"uppercase" }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#A78BFA", animation:"blink 1.2s ease infinite" }} />Thinking
          </span>
        )}
        {state === "idle" && (
          <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 11px", borderRadius:99, background:"rgba(67,97,238,0.06)", border:"1px solid rgba(67,97,238,0.14)", backdropFilter:"blur(8px)", fontSize:10, fontWeight:600, color:"rgba(129,140,248,0.7)", letterSpacing:"0.08em", textTransform:"uppercase" }}>
            Ready
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Demo: auto-cycles states ─── */
export function ZariAvatarDemo({ size = 120 }: { size?: number }) {
  const STATES: AvatarState[] = ["idle","listening","thinking","speaking"];
  const DURATIONS = [2200, 1800, 2000, 2800];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setIdx(i => (i+1) % STATES.length), DURATIONS[idx]);
    return () => clearTimeout(t);
  }, [idx]);
  return <ZariAvatar state={STATES[idx]} size={size} interactive />;
}
