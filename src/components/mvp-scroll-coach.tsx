"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Chapter data
// ─────────────────────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    idx: 0,
    tag: "01",
    surface: "Resume Review",
    accent: "#0D7182",
    accentVar: "var(--brand)",
    headline: "The AI reads every line.",
    body: "Askia scans your entire resume in seconds — scoring every bullet for ATS compatibility, metric density, and impact language. Specific rewrites, not vague suggestions.",
    proof: { before: "52", after: "89", label: "Resume score, one session" },
  },
  {
    idx: 1,
    tag: "02",
    surface: "LinkedIn Overhaul",
    accent: "#4ca7e6",
    accentVar: "var(--cyan-dim)",
    headline: "Make recruiters find you.",
    body: "Your headline, about section, and keyword density rebuilt to rank in recruiter filters. The coach identifies exactly what's suppressing your visibility — and fixes it.",
    proof: { before: "68", after: "91", label: "Profile visibility score" },
  },
  {
    idx: 2,
    tag: "03",
    surface: "Mock Interview",
    accent: "#7a8dff",
    accentVar: "var(--purple)",
    headline: "No vague answers allowed.",
    body: "Every behavioral response is dissected: Situation, Decision, Logic, Outcome, Metric. The coach pushes until your story is sharp enough to land the offer.",
    proof: { before: "3/10", after: "9/10", label: "STAR answer rating" },
  },
  {
    idx: 3,
    tag: "04",
    surface: "Career Direction",
    accent: "#F97316",
    accentVar: "var(--amber)",
    headline: "Stop targeting the wrong roles.",
    body: "Your background mapped against real market demand. Strongest signal identified, targeted company list built, and a concrete 30-day action plan delivered.",
    proof: { before: "0 callbacks", after: "4 interviews", label: "Within 2 weeks" },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────────────────────────────────────
function CoachAvatar() {
  return (
    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--brand)]">
      <span className="text-[9px] font-bold text-white">A</span>
    </div>
  );
}

function CoachBubble({ text, delayMs = 0 }: { text: string; delayMs?: number }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);
  return (
    <div
      className="flex items-start gap-2.5 transition-all duration-300"
      style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(10px)" }}
    >
      <CoachAvatar />
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-3.5 py-2.5 text-[12.5px] leading-[1.6] text-white/80">
        {text}
      </div>
    </div>
  );
}

function UserBubble({ text, delayMs = 0 }: { text: string; delayMs?: number }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);
  return (
    <div
      className="flex justify-end transition-all duration-300"
      style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(10px)" }}
    >
      <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-[var(--brand)]/20 px-3.5 py-2.5 text-[12.5px] leading-[1.6] text-white/75">
        {text}
      </div>
    </div>
  );
}

function TypingDots({ delayMs = 0 }: { delayMs?: number }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);
  return (
    <div
      className="flex items-start gap-2.5 transition-all duration-300"
      style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(10px)" }}
    >
      <CoachAvatar />
      <div className="flex gap-1.5 rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-white/40"
            style={{ animation: "dot-bounce 1.4s ease-in-out infinite", animationDelay: `${i * 0.22}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function ScoreRing({
  score,
  color = "#0D7182",
  delayMs = 0,
}: {
  score: number;
  color?: string;
  delayMs?: number;
}) {
  const r = 24;
  const circ = 2 * Math.PI * r;
  const circRef = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const el = circRef.current;
    if (!el) return;
    const t = setTimeout(() => {
      el.style.strokeDashoffset = String(circ * (1 - score / 100));
    }, delayMs);
    return () => clearTimeout(t);
  }, [circ, delayMs, score]);
  return (
    <svg width="58" height="58" viewBox="0 0 58 58">
      <circle cx="29" cy="29" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4.5" />
      <circle
        ref={circRef}
        cx="29" cy="29" r={r}
        fill="none"
        stroke={color}
        strokeWidth="4.5"
        strokeDasharray={circ}
        strokeDashoffset={circ}
        strokeLinecap="round"
        transform="rotate(-90 29 29)"
        style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)" }}
      />
      <text x="29" y="29" textAnchor="middle" dy="0.35em" fill="white" fontSize="11" fontWeight="800">
        {score}
      </text>
    </svg>
  );
}

function ScoreBar({
  label,
  from,
  to,
  color,
  delayMs = 0,
}: {
  label: string;
  from: number;
  to: number;
  color: string;
  delayMs?: number;
}) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    const t = setTimeout(() => setVal(to), delayMs);
    return () => clearTimeout(t);
  }, [delayMs, to]);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11.5px]">
        <span className="text-white/50">{label}</span>
        <span className="font-bold text-white">{val}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${val}%`,
            background: color,
            transition: "width 1.3s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-chapter demo content (key=chapter causes full remount → re-animates)
// ─────────────────────────────────────────────────────────────────────────────
function Chapter0Demo() {
  return (
    <div className="space-y-3 p-4">
      <TypingDots delayMs={0} />
      <CoachBubble text="Resume scanned. Overall score: 52/100. Found 4 bullets missing metrics and 2 ATS keyword gaps." delayMs={1200} />
      <div
        className="ml-9 transition-all duration-500"
        style={{ opacity: 0, animation: "bubble-appear 0.4s ease 2.2s both" }}
      >
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
          <ScoreRing score={52} color="#F97316" delayMs={2400} />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/30">Resume score</p>
            <p className="mt-0.5 text-[12px] text-white/55">4 bullets need metrics · 2 ATS gaps</p>
          </div>
        </div>
      </div>
      <CoachBubble text="Let's fix bullet 3 first — it reads like a job description, not an achievement." delayMs={3400} />
      <div
        className="ml-9 space-y-2 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3"
        style={{ opacity: 0, animation: "bubble-appear 0.4s ease 4.4s both" }}
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/25">Bullet 3 — Rewrite</p>
        <div className="rounded-lg bg-red-500/10 px-3 py-2">
          <p className="text-[12px] text-red-300/70 line-through">Led cross-functional projects across multiple teams</p>
        </div>
        <div className="flex justify-center py-0.5">
          <svg className="h-3.5 w-3.5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
        <div
          className="rounded-lg bg-emerald-500/10 px-3 py-2"
          style={{ opacity: 0, animation: "bubble-appear 0.35s ease 5s both" }}
        >
          <p className="text-[12px] font-medium text-emerald-300">Drove 3 product launches across 4 teams, cutting time-to-ship by <strong>22%</strong></p>
        </div>
      </div>
      <div
        className="ml-9"
        style={{ opacity: 0, animation: "bubble-appear 0.4s ease 6.2s both" }}
      >
        <div className="flex items-center gap-3 rounded-xl border border-[var(--brand)]/30 bg-[var(--brand)]/10 p-3">
          <ScoreRing score={89} color="#0D7182" delayMs={6500} />
          <div>
            <p className="text-[13px] font-bold text-white">Score: 52 → <span className="text-[var(--cyan)]">89</span></p>
            <p className="text-[11.5px] text-white/40 mt-0.5">+37 points · one session</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chapter1Demo() {
  return (
    <div className="space-y-3 p-4">
      <TypingDots delayMs={0} />
      <CoachBubble text="Scanning your LinkedIn. Your headline is suppressing recruiter visibility by 40%." delayMs={1100} />
      <div
        className="ml-9 space-y-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5"
        style={{ opacity: 0, animation: "bubble-appear 0.4s ease 2.2s both" }}
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/25">Profile visibility</p>
        <ScoreBar label="Search ranking" from={68} to={91} color="linear-gradient(90deg,var(--brand),var(--cyan))" delayMs={2600} />
        <ScoreBar label="Keyword density" from={52} to={88} color="var(--purple)" delayMs={3100} />
        <ScoreBar label="Headline strength" from={44} to={95} color="var(--cyan-dim)" delayMs={3600} />
      </div>
      <CoachBubble text="Your headline reads like a job title. Recruiters search for skills + target levels. Here's the fix:" delayMs={4600} />
      <div
        className="ml-9 space-y-2 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3"
        style={{ opacity: 0, animation: "bubble-appear 0.4s ease 5.8s both" }}
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/25">Headline rewrite</p>
        <div className="rounded-lg bg-red-500/10 px-3 py-2">
          <p className="text-[12px] text-red-300/70 line-through">Product Manager at TechCorp | Building products users love</p>
        </div>
        <div className="flex justify-center py-0.5">
          <svg className="h-3.5 w-3.5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
        <div
          className="rounded-lg bg-emerald-500/10 px-3 py-2"
          style={{ opacity: 0, animation: "bubble-appear 0.35s ease 6.5s both" }}
        >
          <p className="text-[12px] font-medium text-emerald-300">Senior PM · B2B SaaS & Growth · Ex-Stripe · Open to Staff / L5+ roles</p>
        </div>
      </div>
    </div>
  );
}

function Chapter2Demo() {
  const tags = [
    { t: "✕ No metric",          ok: false },
    { t: "✕ Outcome missing",    ok: false },
    { t: "✓ Situation clear",    ok: true  },
    { t: "✕ Decision logic vague", ok: false },
  ];
  return (
    <div className="space-y-3 p-4">
      <div style={{ opacity: 0, animation: "bubble-appear 0.4s ease 0.2s both" }}>
        <div className="rounded-xl border border-[var(--purple)]/30 bg-[var(--purple)]/10 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--purple)]/70 mb-1.5">Interview question</p>
          <p className="text-[12.5px] leading-relaxed text-white/80">
            "Tell me about a time you made a high-stakes product decision with incomplete data."
          </p>
        </div>
      </div>
      <UserBubble text="I was leading our checkout redesign. We had to decide whether to ship a partial feature or delay the launch. I went with ship — based on the data we had." delayMs={1200} />
      <div
        className="ml-9 flex flex-wrap gap-1.5"
        style={{ opacity: 0, animation: "bubble-appear 0.4s ease 2.4s both" }}
      >
        {tags.map((tag, i) => (
          <span
            key={tag.t}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium border ${
              tag.ok
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-red-500/30 bg-red-500/10 text-red-300"
            }`}
            style={{ opacity: 0, animation: `bubble-appear 0.3s ease ${2.4 + i * 0.15}s both` }}
          >
            {tag.t}
          </span>
        ))}
      </div>
      <CoachBubble text="Solid setup — but you skipped the outcome entirely. What actually happened after you shipped?" delayMs={3600} />
      <UserBubble text="Conversion went up 18%, adding $2.4M ARR in the following quarter." delayMs={5000} />
      <CoachBubble text="That's the answer. Situation clear, decision justified, outcome quantified. That's a 9/10 STAR response." delayMs={6000} />
    </div>
  );
}

function Chapter3Demo() {
  const roles = [
    { name: "Senior PM (B2B SaaS)", sub: "Best fit · your core", pct: 94, color: "#0D7182" },
    { name: "Product Lead (Infra)", sub: "Strong signal", pct: 82, color: "#4ca7e6" },
    { name: "Group PM",             sub: "Reachable in 6–12mo", pct: 71, color: "#7a8dff" },
    { name: "Director of Product",  sub: "Stretch — 12+ mo",   pct: 58, color: "#64698A" },
  ];
  const plan = [
    "Reframe 2 engineering bullets to show product thinking",
    "Add B2B metric to LinkedIn About section",
    "Practice PM story: scope + data + outcome",
    "Target 3 companies in Series B–D B2B SaaS",
  ];
  return (
    <div className="space-y-3 p-4">
      <TypingDots delayMs={0} />
      <CoachBubble text="Mapping your background against current market demand. Give me a second." delayMs={1100} />
      <div
        className="ml-9 space-y-2 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3"
        style={{ opacity: 0, animation: "bubble-appear 0.4s ease 2.2s both" }}
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/25">Role fit analysis</p>
        {roles.map((role, i) => (
          <div key={role.name} className="space-y-1" style={{ opacity: 0, animation: `bubble-appear 0.3s ease ${2.4 + i * 0.2}s both` }}>
            <div className="flex justify-between text-[11.5px]">
              <div>
                <span className="font-semibold text-white">{role.name}</span>
                <span className="ml-2 text-white/35">{role.sub}</span>
              </div>
              <span className="font-bold" style={{ color: role.color }}>{role.pct}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
              <ScoreBar label="" from={0} to={role.pct} color={role.color} delayMs={(2600 + i * 200)} />
            </div>
          </div>
        ))}
      </div>
      <CoachBubble text="B2B SaaS PM is your strongest signal. But your current narrative undersells the infrastructure work — here's your 30-day fix:" delayMs={4000} />
      <div
        className="ml-9 space-y-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3"
        style={{ opacity: 0, animation: "bubble-appear 0.4s ease 5s both" }}
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/25 mb-2">30-day action plan</p>
        {plan.map((item, i) => (
          <div
            key={item}
            className="flex items-start gap-2.5"
            style={{ opacity: 0, animation: `bubble-appear 0.3s ease ${5.2 + i * 0.25}s both` }}
          >
            <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/30 text-[8px] font-bold text-[var(--cyan)]">
              {i + 1}
            </span>
            <p className="text-[12px] text-white/65">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const DEMOS = [Chapter0Demo, Chapter1Demo, Chapter2Demo, Chapter3Demo];

// ─────────────────────────────────────────────────────────────────────────────
// Coaching window
// ─────────────────────────────────────────────────────────────────────────────
function CoachingWindow({ chapter }: { chapter: number }) {
  const Demo = DEMOS[chapter];
  const ch = CHAPTERS[chapter];
  return (
    <div className="coach-panel flex h-full flex-col overflow-hidden rounded-2xl">
      {/* Chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
        <div className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex-1 rounded-md bg-white/[0.05] px-3 py-1 text-center">
          <span className="text-[10.5px] text-white/25">askia.coach · </span>
          <span className="text-[10.5px] font-semibold" style={{ color: ch.accent }}>{ch.surface}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[10px] font-medium text-emerald-400/70">LIVE</span>
        </div>
      </div>
      {/* Scrollable chat — key forces full remount on chapter change */}
      <div key={chapter} className="flex-1 overflow-y-auto">
        <Demo />
      </div>
      {/* Input bar */}
      <div className="border-t border-white/[0.07] p-3">
        <div className="flex items-center gap-2 rounded-xl bg-white/[0.05] px-3 py-2.5">
          <span className="flex-1 text-[12px] text-white/18">Ask your coach anything…</span>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand)]/50">
            <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export — sticky scroll coaching demo
// ─────────────────────────────────────────────────────────────────────────────
export function MvpScrollCoach() {
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = chapterRefs.current.map((el, idx) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(idx); },
        { threshold: 0.4, rootMargin: "-15% 0px -15% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const ch = CHAPTERS[active];

  return (
    <section className="noise-overlay relative overflow-hidden bg-[var(--dark)]">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{ position: "absolute", top: "10%", left: "-5%", width: "500px", height: "500px", background: "var(--brand)", opacity: .06, filter: "blur(120px)", borderRadius: "50%", animation: "float-a 22s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: "400px", height: "400px", background: "var(--purple)", opacity: .06, filter: "blur(100px)", borderRadius: "50%", animation: "float-b 18s ease-in-out infinite" }} />
      </div>
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />

      {/* Section header */}
      <div className="relative mx-auto max-w-7xl px-6 pb-0 pt-20 md:pt-28">
        <div className="mb-14 flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live session replay
            </div>
            <h2 className="text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-[3.2rem]">
              Watch a full coaching<br />
              <span className="gradient-text-animated">session unfold.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-white/40 lg:text-right">
            Scroll through each surface. The coaching window on the left shows exactly what happens inside a session.
          </p>
        </div>

        {/* Tab pills */}
        <div className="mb-0 flex gap-2 overflow-x-auto pb-2 lg:overflow-visible">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.idx}
              onClick={() => {
                setActive(i);
                chapterRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="flex-shrink-0 rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-all duration-200"
              style={{
                borderColor: active === i ? c.accent : "rgba(170,205,255,0.10)",
                background: active === i ? `${c.accent}22` : "transparent",
                color: active === i ? c.accent : "rgba(255,255,255,0.35)",
              }}
            >
              {c.tag} {c.surface}
            </button>
          ))}
        </div>
      </div>

      {/* Sticky scroll layout */}
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex gap-8 lg:gap-12">

          {/* ── Left: sticky coaching window ── */}
          <div className="hidden w-[420px] flex-shrink-0 lg:block">
            <div className="sticky top-8 pt-8 pb-20" style={{ height: "calc(100vh - 2rem)" }}>
              <div
                className="h-full overflow-hidden rounded-2xl transition-all duration-500"
                style={{ boxShadow: `0 0 0 1px ${ch.accent}30, 0 32px 80px rgba(0,0,0,0.5), 0 0 60px ${ch.accent}18` }}
              >
                <CoachingWindow chapter={active} />
              </div>
            </div>
          </div>

          {/* ── Right: scroll chapters ── */}
          <div className="flex-1 py-8">
            {CHAPTERS.map((c, i) => (
              <div
                key={c.idx}
                ref={(el) => { chapterRefs.current[i] = el; }}
                className="flex min-h-[80vh] flex-col justify-center py-12 lg:py-16"
              >
                {/* Chapter tag */}
                <div
                  className="mb-5 inline-flex items-center gap-2.5 self-start rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    background: `${c.accent}18`,
                    color: c.accent,
                    border: `1px solid ${c.accent}35`,
                    transition: "all 0.4s ease",
                    opacity: active === i ? 1 : 0.4,
                  }}
                >
                  {c.tag} — {c.surface}
                </div>

                {/* Headline */}
                <h3
                  className="mb-5 text-[2.2rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-white md:text-[2.8rem]"
                  style={{ transition: "opacity 0.4s ease", opacity: active === i ? 1 : 0.35 }}
                >
                  {c.headline}
                </h3>

                {/* Body */}
                <p
                  className="mb-8 max-w-lg text-[16px] leading-relaxed text-white/45"
                  style={{ transition: "opacity 0.4s ease", opacity: active === i ? 0.8 : 0.3 }}
                >
                  {c.body}
                </p>

                {/* Proof stat */}
                <div
                  className="inline-flex items-center gap-5 self-start rounded-2xl px-5 py-4"
                  style={{
                    border: `1px solid ${c.accent}30`,
                    background: `${c.accent}0f`,
                    transition: "all 0.4s ease",
                    opacity: active === i ? 1 : 0.25,
                  }}
                >
                  <div className="text-center">
                    <p className="text-[11px] uppercase tracking-wider" style={{ color: c.accent, opacity: 0.7 }}>Before</p>
                    <p className="text-[1.6rem] font-extrabold text-white/50">{c.proof.before}</p>
                  </div>
                  <svg className="h-5 w-5 flex-shrink-0" style={{ color: c.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  <div className="text-center">
                    <p className="text-[11px] uppercase tracking-wider" style={{ color: c.accent, opacity: 0.7 }}>After</p>
                    <p className="text-[1.6rem] font-extrabold text-white">{c.proof.after}</p>
                  </div>
                  <div className="border-l pl-4" style={{ borderColor: `${c.accent}25` }}>
                    <p className="text-[12px] text-white/40">{c.proof.label}</p>
                  </div>
                </div>

                {/* Mobile: inline coaching window */}
                <div
                  className="mt-8 block lg:hidden"
                  style={{ height: "380px" }}
                >
                  <CoachingWindow chapter={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="separator-glow mx-auto max-w-7xl" />
    </section>
  );
}
