"use client";

import { useEffect, useMemo, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// StarField — random twinkling particles, pure CSS animation
// ─────────────────────────────────────────────────────────────────────────────
export function StarField({ count = 110 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.6 + 0.4,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 2,
        opacity: Math.random() * 0.45 + 0.08,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out infinite ${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CursorGlow — large radial glow that follows the mouse within its parent
// ─────────────────────────────────────────────────────────────────────────────
export function CursorGlow({
  color = "rgba(13,113,130,0.13)",
  size = 680,
}: {
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement as HTMLElement | null;
    if (!parent) return;

    let raf = 0;
    let tx = 0, ty = 0;
    let cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      el.style.opacity = "1";
    };
    const onLeave = () => { el.style.opacity = "0"; };

    // Smooth follow via rAF
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.left = `${cx}px`;
      el.style.top  = `${cy}px`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    parent.addEventListener("mousemove", onMove, { passive: true });
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        transform: "translate(-50%,-50%)",
        background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
        opacity: 0,
        transition: "opacity 0.4s ease",
        willChange: "left, top, opacity",
        zIndex: 1,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroChatPreview — live typewriter coaching conversation for the hero right panel
// ─────────────────────────────────────────────────────────────────────────────
const BUBBLES: Array<{
  kind: "coach" | "user" | "rewrite" | "score";
  text?: string;
  bad?: string;
  good?: string;
  score?: number;
  delay: number; // css animation-delay in seconds
}> = [
  { kind: "coach",   text: "Scanning your resume…",                                                                    delay: 0.4  },
  { kind: "coach",   text: "Found it. Bullet 3 has no metric and won't pass ATS filters.",                             delay: 1.4  },
  { kind: "rewrite", bad: "Led cross-functional projects across teams", good: "Drove 3 launches · cut time-to-ship 22%", delay: 2.6 },
  { kind: "user",    text: "Show me the next one.",                                                                     delay: 4.0  },
  { kind: "coach",   text: "Score jumped from 52 → 89. Two more bullets left — continue?",                             delay: 5.0  },
  { kind: "score",   score: 89,                                                                                         delay: 5.8  },
];

export function HeroChatPreview() {
  return (
    <div className="coach-panel flex h-full flex-col overflow-hidden rounded-2xl">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
        <div className="flex gap-1.5">
          {["#ff5f57","#febc2e","#28c840"].map((c) => (
            <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex-1 rounded-md bg-white/[0.05] px-3 py-1 text-center text-[10.5px] text-white/25">
          askia.coach · Resume Review
        </div>
        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[10px] font-medium text-emerald-400/70">LIVE</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 space-y-3 overflow-hidden p-4">
        {BUBBLES.map((b, i) => (
          <div
            key={i}
            style={{
              animation: `bubble-appear 0.45s cubic-bezier(0.16,1,0.3,1) both`,
              animationDelay: `${b.delay}s`,
            }}
          >
            {b.kind === "coach" && (
              <div className="flex items-start gap-2">
                <div className="h-5 w-5 flex-shrink-0 overflow-hidden rounded-full bg-[var(--brand)]">
                  <div className="flex h-full w-full items-center justify-center text-[8px] font-bold text-white">A</div>
                </div>
                <div className="max-w-[84%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-3 py-2 text-[12px] leading-[1.55] text-white/80">
                  {b.text}
                </div>
              </div>
            )}
            {b.kind === "user" && (
              <div className="flex justify-end">
                <div className="max-w-[78%] rounded-2xl rounded-tr-sm bg-[var(--brand)]/25 px-3 py-2 text-[12px] leading-[1.55] text-white/75">
                  {b.text}
                </div>
              </div>
            )}
            {b.kind === "rewrite" && (
              <div className="ml-7 space-y-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/25">Rewrite</p>
                <p className="rounded-md bg-red-500/10 px-2.5 py-1.5 text-[11px] text-red-300/70 line-through">
                  {b.bad}
                </p>
                <div
                  className="flex items-center justify-center py-0.5"
                  style={{ animation: `bubble-appear 0.3s ease both`, animationDelay: `${b.delay + 0.5}s` }}
                >
                  <svg className="h-3 w-3 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
                <p
                  className="rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-medium text-emerald-300"
                  style={{ animation: `bubble-appear 0.3s ease both`, animationDelay: `${b.delay + 0.7}s`, opacity: 0 }}
                >
                  {b.good}
                </p>
              </div>
            )}
            {b.kind === "score" && (
              <div className="ml-7 flex items-center gap-3 rounded-xl border border-[var(--brand)]/25 bg-[var(--brand)]/10 px-3 py-2.5">
                <ScoreRingSmall score={b.score!} delayMs={(b.delay + 0.3) * 1000} />
                <div>
                  <p className="text-[12px] font-bold text-white">
                    52 → <span className="text-[var(--cyan)]">89</span>
                  </p>
                  <p className="text-[10.5px] text-white/40">+37 pts · one session</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="border-t border-white/[0.07] p-3">
        <div className="flex items-center gap-2 rounded-xl bg-white/[0.05] px-3 py-2">
          <span className="flex-1 text-[12px] text-white/20">Ask your coach anything…</span>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand)]/50">
            <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Small score ring for the chat preview
function ScoreRingSmall({ score, delayMs = 0 }: { score: number; delayMs?: number }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => {
      el.style.strokeDashoffset = String(circ * (1 - score / 100));
    }, delayMs);
    return () => clearTimeout(t);
  }, [circ, delayMs, score]);

  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
      <circle
        ref={ref}
        cx="22" cy="22" r={r}
        fill="none"
        stroke="var(--cyan)"
        strokeWidth="4"
        strokeDasharray={circ}
        strokeDashoffset={circ}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
        style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)" }}
      />
      <text x="22" y="22" textAnchor="middle" dy="0.35em" fill="white" fontSize="9" fontWeight="800">
        {score}
      </text>
    </svg>
  );
}
