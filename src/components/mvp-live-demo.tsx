"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type Tab = "resume" | "linkedin" | "interview" | "career";

type ItemInit =
  | { kind: "dots" }
  | { kind: "coach"; text: string; typed: string; done: boolean }
  | { kind: "user"; text: string }
  | { kind: "rewrite"; bad: string; good: string; revealed: boolean }
  | { kind: "score-ring"; score: number; animated: boolean; subs: { l: string; v: number; c: string }[] }
  | { kind: "score-bar"; label: string; from: number; to: number; animated: boolean }
  | { kind: "headline"; before: string; after: string }
  | { kind: "tags"; tags: { t: string; ok: boolean | null }[]; shown: number }
  | { kind: "question"; text: string }
  | { kind: "role-cards"; roles: { name: string; sub: string; pct: number; color: string }[]; shown: number }
  | { kind: "plan"; items: string[]; shown: number };

type Item = ItemInit & { id: number };

type Script = Array<{ at: number; fn: (addItem: (i: ItemInit) => void, mutate: (id: number, patch: Partial<ItemInit & { id: number }>) => void) => void }>;

// ─────────────────────────────────────────────────────────────────────────────
// Scripts — one per tab, timing in ms
// ─────────────────────────────────────────────────────────────────────────────
const SCRIPTS: Record<Tab, Script> = {
  resume: [
    { at: 0,    fn: (a) => a({ kind: "dots" }) },
    { at: 1100, fn: (a, m) => { m(-1, {}); a({ kind: "coach", text: "Let me scan your resume and score every bullet.", typed: "", done: false }) } },
    { at: 2600, fn: (a) => a({ kind: "score-ring", score: 72, animated: false, subs: [{ l: "ATS", v: 85, c: "var(--brand)" }, { l: "Impact", v: 60, c: "var(--cyan)" }, { l: "Clarity", v: 78, c: "var(--purple)" }] }) },
    { at: 2700, fn: (_, m) => m(-1, { animated: true }) },
    { at: 3800, fn: (a) => a({ kind: "dots" }) },
    { at: 5100, fn: (a, m) => { m(-1, {}); a({ kind: "coach", text: "Strong structure — but 4 bullets read like job descriptions, not achievements. Here's the first rewrite:", typed: "", done: false }) } },
    { at: 6200, fn: (a) => a({ kind: "rewrite", bad: "Led cross-functional projects across multiple teams", good: "Drove 3 product launches across 4 teams, cutting time-to-ship by 22%", revealed: false }) },
    { at: 6350, fn: (_, m) => m(-1, { revealed: true }) },
    { at: 8200, fn: (a) => a({ kind: "user", text: "Show me the next one." }) },
    { at: 9000, fn: (a) => a({ kind: "dots" }) },
    { at: 10200, fn: (a, m) => { m(-1, {}); a({ kind: "rewrite", bad: "Improved performance metrics significantly", good: "Cut API latency from 4.2s → 340ms, enabling 2M new daily active users", revealed: false }) } },
    { at: 10400, fn: (_, m) => m(-1, { revealed: true }) },
    { at: 11600, fn: (a) => a({ kind: "score-ring", score: 89, animated: false, subs: [{ l: "ATS", v: 92, c: "var(--brand)" }, { l: "Impact", v: 84, c: "var(--cyan)" }, { l: "Clarity", v: 91, c: "var(--purple)" }] }) },
    { at: 11700, fn: (_, m) => m(-1, { animated: true }) },
    { at: 12400, fn: (a) => a({ kind: "dots" }) },
    { at: 13500, fn: (a, m) => { m(-1, {}); a({ kind: "coach", text: "Score jumped from 72 → 89. Two more bullets to go — want to continue?", typed: "", done: false }) } },
  ],

  linkedin: [
    { at: 0,    fn: (a) => a({ kind: "dots" }) },
    { at: 1100, fn: (a, m) => { m(-1, {}); a({ kind: "coach", text: "Scanning your LinkedIn. I'll score it and tell you exactly what's suppressing recruiter searches.", typed: "", done: false }) } },
    { at: 2800, fn: (a) => a({ kind: "score-bar", label: "Profile visibility", from: 68, to: 91, animated: false }) },
    { at: 2900, fn: (_, m) => m(-1, { animated: true }) },
    { at: 4200, fn: (a) => a({ kind: "dots" }) },
    { at: 5600, fn: (a, m) => { m(-1, {}); a({ kind: "coach", text: "Your headline reads like a job title. Recruiters search for skills and target levels — not company names.", typed: "", done: false }) } },
    { at: 7000, fn: (a) => a({ kind: "headline", before: "Product Manager at TechCorp | Building products users love", after: "Senior PM · B2B SaaS & Growth · Ex-Stripe · Open to Staff / L5+ roles" }) },
    { at: 8800, fn: (a) => a({ kind: "dots" }) },
    { at: 10000, fn: (a, m) => { m(-1, {}); a({ kind: "coach", text: "About section rebuilt. Profile now surfaces for 'senior PM B2B SaaS' across recruiter filters.", typed: "", done: false }) } },
    { at: 11600, fn: (a) => a({ kind: "tags", shown: 0, tags: [{ t: "B2B SaaS ✓", ok: true }, { t: "Growth ✓", ok: true }, { t: "Ex-Stripe ✓", ok: true }, { t: "L5+ Ready ✓", ok: true }, { t: "Open to Work ✓", ok: true }] }) },
    { at: 11700, fn: (_, m) => m(-1, { shown: 1 }) },
    { at: 11900, fn: (_, m) => m(-1, { shown: 2 }) },
    { at: 12100, fn: (_, m) => m(-1, { shown: 3 }) },
    { at: 12300, fn: (_, m) => m(-1, { shown: 4 }) },
    { at: 12500, fn: (_, m) => m(-1, { shown: 5 }) },
  ],

  interview: [
    { at: 0,    fn: (a) => a({ kind: "dots" }) },
    { at: 1000, fn: (a, m) => { m(-1, {}); a({ kind: "coach", text: "Let's run a behavioral question. Answer naturally — I'll catch what's missing.", typed: "", done: false }) } },
    { at: 2800, fn: (a) => a({ kind: "question", text: "Tell me about a time you made a high-stakes product decision with incomplete data." }) },
    { at: 4800, fn: (a) => a({ kind: "user", text: "I was leading our checkout redesign. We had to decide whether to ship a partial feature or delay the launch. I went with ship — based on the data we had at the time." }) },
    { at: 6800, fn: (a) => a({ kind: "tags", shown: 0, tags: [{ t: "✕ No metric", ok: false }, { t: "✕ Missing outcome", ok: false }, { t: "✓ Situation clear", ok: true }, { t: "✕ Decision logic vague", ok: false }] }) },
    { at: 6900, fn: (_, m) => m(-1, { shown: 1 }) },
    { at: 7100, fn: (_, m) => m(-1, { shown: 2 }) },
    { at: 7300, fn: (_, m) => m(-1, { shown: 3 }) },
    { at: 7500, fn: (_, m) => m(-1, { shown: 4 }) },
    { at: 8200, fn: (a) => a({ kind: "dots" }) },
    { at: 9400, fn: (a, m) => { m(-1, {}); a({ kind: "coach", text: "Solid setup — but you skipped the outcome entirely. What actually happened after you shipped?", typed: "", done: false }) } },
    { at: 11000, fn: (a) => a({ kind: "user", text: "Conversion went up 18%, adding $2.4M ARR in the following quarter." }) },
    { at: 12000, fn: (a) => a({ kind: "dots" }) },
    { at: 13000, fn: (a, m) => { m(-1, {}); a({ kind: "coach", text: "That's the answer. Situation clear, decision justified, outcome quantified. That's a 9/10 STAR response.", typed: "", done: false }) } },
  ],

  career: [
    { at: 0,    fn: (a) => a({ kind: "dots" }) },
    { at: 1200, fn: (a, m) => { m(-1, {}); a({ kind: "coach", text: "Mapping your background against current market demand. Give me a second.", typed: "", done: false }) } },
    { at: 2800, fn: (a) => a({ kind: "role-cards", shown: 0, roles: [
      { name: "Senior PM (B2B SaaS)", sub: "Best fit · Your core", pct: 94, color: "var(--brand)" },
      { name: "Product Lead (Infra)", sub: "Strong signal", pct: 82, color: "var(--cyan-dim)" },
      { name: "Group PM", sub: "Reachable in 6–12mo", pct: 71, color: "var(--purple)" },
      { name: "Director of Product", sub: "Stretch goal", pct: 58, color: "var(--muted)" },
    ]}) },
    { at: 2900, fn: (_, m) => m(-1, { shown: 1 }) },
    { at: 3300, fn: (_, m) => m(-1, { shown: 2 }) },
    { at: 3700, fn: (_, m) => m(-1, { shown: 3 }) },
    { at: 4100, fn: (_, m) => m(-1, { shown: 4 }) },
    { at: 5200, fn: (a) => a({ kind: "dots" }) },
    { at: 6600, fn: (a, m) => { m(-1, {}); a({ kind: "coach", text: "Your strongest signal is B2B SaaS. But your current narrative undersells the infrastructure work — recruiters are missing it. Here's what to fix:", typed: "", done: false }) } },
    { at: 8400, fn: (a) => a({ kind: "plan", shown: 0, items: ["Reframe 2 engineering bullets to show product thinking", "Add B2B metric to LinkedIn About section", "Practice PM story: scope + data + outcome", "Target 3 companies in Series B–D B2B SaaS"] }) },
    { at: 8500, fn: (_, m) => m(-1, { shown: 1 }) },
    { at: 8900, fn: (_, m) => m(-1, { shown: 2 }) },
    { at: 9300, fn: (_, m) => m(-1, { shown: 3 }) },
    { at: 9700, fn: (_, m) => m(-1, { shown: 4 }) },
  ],
};

const TAB_DURATION = 15500; // ms before auto-advancing

const TABS: Array<{ id: Tab; label: string; accent: string }> = [
  { id: "resume",    label: "Resume Review",  accent: "var(--brand)" },
  { id: "linkedin",  label: "LinkedIn",        accent: "var(--cyan-dim)" },
  { id: "interview", label: "Mock Interview",  accent: "var(--purple)" },
  { id: "career",    label: "Career Direction", accent: "var(--amber)" },
];

// Circumference for SVG ring
const CIRC_R = 28;
const CIRC_C = 2 * Math.PI * CIRC_R; // ≈ 175.9

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export function MvpLiveDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("resume");
  const [items, setItems]         = useState<Item[]>([]);
  const [progress, setProgress]   = useState(0);
  const counterRef  = useRef(0);
  const timersRef   = useRef<ReturnType<typeof setTimeout>[]>([]);
  const typeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom whenever items change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [items]);

  // Typewrite the latest unfinished coach message
  useEffect(() => {
    if (typeTimerRef.current) clearInterval(typeTimerRef.current);
    const lastCoach = [...items].reverse().find(i => i.kind === "coach" && !i.done);
    if (!lastCoach || lastCoach.kind !== "coach") return;
    const { id, text } = lastCoach;
    let idx = lastCoach.typed.length;
    typeTimerRef.current = setInterval(() => {
      idx += 2;
      setItems(prev => prev.map(i => i.id === id && i.kind === "coach" ? { ...i, typed: text.slice(0, idx), done: idx >= text.length } : i));
      if (idx >= text.length) { clearInterval(typeTimerRef.current!); typeTimerRef.current = null; }
    }, 20);
    return () => { if (typeTimerRef.current) clearInterval(typeTimerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const addItem = useCallback((partial: ItemInit) => {
    const id = ++counterRef.current;
    // If adding a message, remove any typing indicators
    setItems(prev => {
      const next = partial.kind === "dots" ? prev : prev.filter(i => i.kind !== "dots");
      return [...next, { ...partial, id } as Item];
    });
  }, []);

  const mutateItem = useCallback((relIdx: number, patch: Partial<Item>) => {
    setItems(prev => {
      if (prev.length === 0) return prev;
      const idx = relIdx < 0 ? prev.length + relIdx : relIdx;
      if (idx < 0 || idx >= prev.length) return prev;
      return prev.map((item, i) => i === idx ? { ...item, ...patch } as Item : item);
    });
  }, []);

  const runTab = useCallback((tab: Tab) => {
    // Clear all existing timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (progressRef.current) clearInterval(progressRef.current);
    setItems([]);
    setProgress(0);

    const script = SCRIPTS[tab];
    script.forEach(({ at, fn }) => {
      const t = setTimeout(() => fn(addItem, mutateItem), at);
      timersRef.current.push(t);
    });

    // Progress bar
    const startTime = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / TAB_DURATION) * 100, 100));
    }, 50);

    // Auto-advance
    const advance = setTimeout(() => {
      setActiveTab(prev => {
        const tabs: Tab[] = ["resume", "linkedin", "interview", "career"];
        const nextIdx = (tabs.indexOf(prev) + 1) % tabs.length;
        return tabs[nextIdx];
      });
    }, TAB_DURATION);
    timersRef.current.push(advance);
  }, [addItem, mutateItem]);

  useEffect(() => {
    runTab(activeTab);
    return () => {
      timersRef.current.forEach(clearTimeout);
      if (progressRef.current) clearInterval(progressRef.current);
      if (typeTimerRef.current) clearInterval(typeTimerRef.current);
    };
  }, [activeTab, runTab]);

  const activeColor = TABS.find(t => t.id === activeTab)?.accent ?? "var(--brand)";

  return (
    <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] py-20 text-white md:py-28">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{ position:"absolute", width:"700px", height:"700px", top:"-10%", left:"-10%", background:"var(--brand)", opacity:.07, filter:"blur(140px)", borderRadius:"50%", animation:"float-a 20s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:"600px", height:"600px", bottom:"-10%", right:"-8%", background:"var(--purple)", opacity:.07, filter:"blur(130px)", borderRadius:"50%", animation:"float-b 24s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:"400px", height:"400px", top:"50%", left:"50%", transform:"translate(-50%,-50%)", background:"var(--cyan)", opacity:.04, filter:"blur(100px)", borderRadius:"50%", animation:"float-c 18s ease-in-out infinite" }} />
      </div>
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live demo
            </div>
            <h2 className="text-[2.6rem] font-extrabold tracking-[-0.03em] md:text-[3.2rem]">
              Watch it coach<br />
              <span className="gradient-text-animated">in real time.</span>
            </h2>
          </div>
          <p className="text-[16px] leading-relaxed text-white/45 lg:text-right">
            This is exactly what a session looks like. No slides, no screenshots — the AI is running the scenarios live as you read this page.
          </p>
        </div>

        {/* Tab bar */}
        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition-all"
              style={{
                borderColor: activeTab === tab.id ? `${tab.accent}50` : "rgba(255,255,255,0.08)",
                background:  activeTab === tab.id ? `${tab.accent}18` : "rgba(255,255,255,0.03)",
                color:       activeTab === tab.id ? tab.accent : "rgba(255,255,255,0.5)",
              }}
            >
              {activeTab === tab.id && <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: tab.accent }} />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Demo window */}
        <div
          className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0A1220]"
          style={{ boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)` }}
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#070F1A] px-5 py-3.5">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500/50" />
                <div className="h-3 w-3 rounded-full bg-amber-500/50" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
              </div>
              <div className="flex items-center gap-2.5 ml-1">
                <Image src="/askia-logo.png" alt="Zari" width={16} height={16} className="rounded opacity-60" />
                <span className="text-[12px] font-medium text-white/40">
                  Zari · {TABS.find(t => t.id === activeTab)?.label}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live
              </span>
            </div>
          </div>

          {/* Chat area */}
          <div ref={scrollRef} className="h-[440px] overflow-y-auto px-5 py-5 md:h-[480px]" style={{ scrollBehavior: "smooth" }}>
            <div className="space-y-4">
              {items.map(item => <DemoItemRenderer key={item.id} item={item} accentColor={activeColor} />)}
            </div>
          </div>

          {/* Progress bar */}
          <div className="border-t border-white/[0.06] px-5 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10.5px] text-white/25">Session in progress</span>
              <span className="text-[10.5px] text-white/25">auto-advancing</span>
            </div>
            <div className="h-0.5 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${activeColor}, var(--cyan))` }}
              />
            </div>
          </div>
        </div>

        {/* CTA below demo */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <p className="text-[15px] text-white/45">
            Every session produces real rewrites, real feedback, real next steps.
          </p>
          <Link href="/signup" className="group inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(13,113,130,0.45)]">
            Try it yourself — free
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Item renderers
// ─────────────────────────────────────────────────────────────────────────────
function DemoItemRenderer({ item, accentColor }: { item: Item; accentColor: string }) {
  switch (item.kind) {

    case "dots":
      return (
        <div className="flex items-center gap-3" style={{ animation: "badge-pop 0.25s ease both" }}>
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
            <Image src="/askia-logo.png" alt="Zari" width={28} height={28} />
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-3">
            <div className="flex gap-1">
              {[0, 0.2, 0.4].map(d => (
                <span key={d} className="h-1.5 w-1.5 rounded-full bg-white/45" style={{ animation: `blink 1.2s ease-in-out ${d}s infinite` }} />
              ))}
            </div>
          </div>
        </div>
      );

    case "coach":
      return (
        <div className="flex items-start gap-3" style={{ animation: "badge-pop 0.3s ease both" }}>
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-full mt-0.5">
            <Image src="/askia-logo.png" alt="Zari" width={28} height={28} />
          </div>
          <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-3">
            <p className="text-[13px] leading-relaxed text-white/85">
              {item.done ? item.text : item.typed}
              {!item.done && <span className="ml-0.5 inline-block h-3.5 w-0.5 align-middle bg-white/70" style={{ animation: "blink 0.7s ease infinite" }} />}
            </p>
          </div>
        </div>
      );

    case "user":
      return (
        <div className="flex justify-end" style={{ animation: "badge-pop 0.3s ease both" }}>
          <div className="max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-3" style={{ background: accentColor }}>
            <p className="text-[13px] leading-relaxed text-white">{item.text}</p>
          </div>
        </div>
      );

    case "rewrite":
      return (
        <div className="ml-10 space-y-2" style={{ animation: "badge-pop 0.4s ease both" }}>
          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3">
            <p className="mb-1 text-[9.5px] font-bold uppercase tracking-wider text-red-400/70">Before</p>
            <p className="text-[12.5px] leading-5 text-red-300/70 line-through">{item.bad}</p>
          </div>
          <div
            className="rounded-xl border border-emerald-500/25 px-4 py-3 transition-all duration-500"
            style={{ background: item.revealed ? "rgba(16,185,129,0.10)" : "transparent", borderColor: item.revealed ? "rgba(16,185,129,0.25)" : "transparent" }}
          >
            <p className="mb-1 text-[9.5px] font-bold uppercase tracking-wider text-emerald-400/70">After</p>
            <p className="text-[12.5px] font-medium leading-5 text-emerald-400">{item.good}</p>
          </div>
        </div>
      );

    case "score-ring": {
      const dashOffset = CIRC_C * (1 - item.score / 100);
      return (
        <div className="ml-10 flex items-center gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4" style={{ animation: "badge-pop 0.4s ease both" }}>
          <div className="relative flex-shrink-0">
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r={CIRC_R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
              <circle
                cx="32" cy="32" r={CIRC_R}
                fill="none" stroke={accentColor} strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={CIRC_C}
                strokeDashoffset={item.animated ? dashOffset : CIRC_C}
                transform="rotate(-90 32 32)"
                style={{ transition: item.animated ? "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" : "none" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[17px] font-extrabold text-white">{item.score}</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="mb-2 text-[10px] uppercase tracking-wider text-white/30">Resume score</p>
            <div className="flex gap-4">
              {item.subs.map(s => (
                <div key={s.l}>
                  <p className="text-[9px] uppercase tracking-wider text-white/25">{s.l}</p>
                  <p className="text-[13px] font-bold" style={{ color: s.c }}>{s.v}</p>
                  <div className="mt-1 h-0.5 w-8 rounded-full bg-white/10">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: item.animated ? `${s.v}%` : "0%", background: s.c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "score-bar":
      return (
        <div className="ml-10 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4" style={{ animation: "badge-pop 0.4s ease both" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-medium text-white/55">{item.label}</p>
            <div className="flex items-center gap-1.5 text-[12px] font-bold">
              <span className="text-red-400/70 line-through">{item.from}</span>
              <span className="text-white/25">→</span>
              <span style={{ color: "var(--cyan)" }}>{item.to}</span>
            </div>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: item.animated ? `${item.to}%` : `${item.from}%`, background: "linear-gradient(90deg, var(--brand), var(--cyan))" }}
            />
          </div>
          <p className="mt-2 text-[10.5px] text-white/30">+{item.to - item.from} points after profile rewrite</p>
        </div>
      );

    case "headline":
      return (
        <div className="ml-10 space-y-2" style={{ animation: "badge-pop 0.4s ease both" }}>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3">
            <p className="mb-1.5 text-[9.5px] font-bold uppercase tracking-wider text-white/25">Current headline</p>
            <p className="text-[12.5px] leading-5 text-white/45 line-through">{item.before}</p>
          </div>
          <div className="rounded-xl border border-[var(--cyan)]/25 bg-[var(--cyan)]/[0.08] px-4 py-3">
            <p className="mb-1.5 text-[9.5px] font-bold uppercase tracking-wider text-[var(--cyan)]/70">Rewritten headline</p>
            <p className="text-[12.5px] font-medium leading-5 text-[var(--cyan)]">{item.after}</p>
          </div>
        </div>
      );

    case "tags":
      return (
        <div className="ml-10 flex flex-wrap gap-2" style={{ animation: "badge-pop 0.3s ease both" }}>
          {item.tags.slice(0, item.shown).map((tag, i) => (
            <span
              key={i}
              className="rounded-full px-3 py-1.5 text-[12px] font-semibold"
              style={{
                animation: "badge-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
                background: tag.ok === true ? "rgba(16,185,129,0.15)" : tag.ok === false ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.07)",
                color:      tag.ok === true ? "#34d399" : tag.ok === false ? "#f87171" : "rgba(255,255,255,0.6)",
                border:     `1px solid ${tag.ok === true ? "rgba(52,211,153,0.25)" : tag.ok === false ? "rgba(248,113,113,0.25)" : "rgba(255,255,255,0.10)"}`,
              }}
            >
              {tag.t}
            </span>
          ))}
        </div>
      );

    case "question":
      return (
        <div
          className="mx-2 rounded-2xl border px-5 py-4"
          style={{ animation: "badge-pop 0.4s ease both", borderColor: "rgba(122,141,255,0.2)", background: "rgba(122,141,255,0.08)" }}
        >
          <p className="mb-2 text-[9.5px] font-bold uppercase tracking-wider" style={{ color: "rgba(122,141,255,0.7)" }}>Interview question</p>
          <p className="text-[14px] font-semibold leading-6 text-white/90">{item.text}</p>
        </div>
      );

    case "role-cards":
      return (
        <div className="ml-10 space-y-2" style={{ animation: "badge-pop 0.3s ease both" }}>
          {item.roles.slice(0, item.shown).map((role, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3"
              style={{ animation: "badge-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white">{role.name}</p>
                <p className="text-[11px] text-white/35">{role.sub}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.08]">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${role.pct}%`, background: role.color }} />
                </div>
                <span className="text-[13px] font-bold w-10 text-right" style={{ color: role.color }}>{role.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      );

    case "plan":
      return (
        <div className="ml-10 space-y-2" style={{ animation: "badge-pop 0.3s ease both" }}>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-white/25">30-day action plan</p>
          {item.items.slice(0, item.shown).map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3"
              style={{ animation: "badge-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
            >
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/25 text-[10px] font-bold text-[var(--brand)]">{i + 1}</span>
              <p className="text-[12.5px] leading-5 text-white/70">{step}</p>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
