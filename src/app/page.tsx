import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { DemoStartButton } from "@/components/mvp-session-actions";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { WordCycle } from "@/components/mvp-word-cycle";
import { MvpLiveDemo } from "@/components/mvp-live-demo";

// ── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  { value: "94%", label: "report more callbacks", sub: "within 2 weeks" },
  { value: "4.9★", label: "average rating", sub: "across all sessions" },
  { value: "2,400+", label: "sessions completed", sub: "and growing daily" },
  { value: "<2 hrs", label: "to a better resume", sub: "first session avg" },
];

const marqueeRow1 = [
  "google","meta","microsoft","amazon","stripe","figma",
  "shopify","notion","airbnb","spotify","netflix","slack",
  "databricks","snowflake","salesforce","github",
];
const marqueeRow2 = [
  "coinbase","uber","adobe","atlassian","doordash","dropbox",
  "nvidia","oracle","paypal","pinterest","zoom","intuit",
  "figma","stripe","notion","shopify",
];

const testimonials = [
  {
    quote: "I went from 0 callbacks in three weeks to 4 interview requests in one. The resume rewrites weren't generic — they were specific, metric-driven, and immediately usable.",
    name: "Marcus T.",
    role: "Senior Product Manager",
    context: "Targeting FAANG",
    initials: "MT",
    color: "var(--brand)",
    stars: 5,
  },
  {
    quote: "The mock interview module is scary good. It catches every vague answer and doesn't let you move on until the story is specific and structured. My STAR answers are actually good now.",
    name: "Aisha R.",
    role: "Software Engineer",
    context: "L5 offer in 6 weeks",
    initials: "AR",
    color: "var(--cyan)",
    stars: 5,
  },
  {
    quote: "I had a messy LinkedIn and a resume I was embarrassed to send. One session and both were completely rebuilt. The sections it wrote were better than anything I'd come up with in months.",
    name: "Jordan K.",
    role: "Product Designer",
    context: "Agency → in-house tech",
    initials: "JK",
    color: "var(--purple)",
    stars: 5,
  },
];

const steps = [
  {
    num: "01",
    title: "Start with a real problem",
    body: "Tell the coach whether the issue is callbacks, positioning, interview nerves, or direction. The session builds around what you actually need — not a generic template.",
    accent: "var(--brand)",
    tag: "Intake",
  },
  {
    num: "02",
    title: "Work in the right surface",
    body: "Dedicated workspaces for every mode — resume review, LinkedIn editing, live mock interviews, and career strategy. No more fitting everything into one chat thread.",
    accent: "var(--cyan)",
    tag: "Coaching",
  },
  {
    num: "03",
    title: "Leave with real deliverables",
    body: "Session recap, updated action plan, coaching memory that carries your context forward. Every session builds on the last. Nothing gets lost.",
    accent: "var(--purple)",
    tag: "Output",
  },
];

// ── SVG score ring (circumference = 2π × 30 ≈ 188.5) ─────────────────────────
const CIRC = 188.5;
const SCORE = 72;
const DASH_OFFSET = CIRC * (1 - SCORE / 100); // ≈ 52.78

export default async function HomePage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>

      {/* ════════════════════════════════════════════════
          HERO — animated, cinematic, dark
      ════════════════════════════════════════════════ */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] text-white">

        {/* ── Animated glow orbs ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute left-[-12%] top-[-8%] h-[760px] w-[760px] rounded-full bg-[var(--cyan)] opacity-[0.10] blur-[140px]"
            style={{ animation: "float-a 18s ease-in-out infinite, glow-breathe 6s ease-in-out infinite" }}
          />
          <div
            className="absolute right-[-8%] top-[-10%] h-[660px] w-[660px] rounded-full bg-[var(--purple)] opacity-[0.09] blur-[130px]"
            style={{ animation: "float-b 22s ease-in-out infinite, glow-breathe 8s ease-in-out infinite 2s" }}
          />
          <div
            className="absolute bottom-[-5%] left-[35%] h-[500px] w-[600px] rounded-full bg-[var(--brand)] opacity-[0.08] blur-[110px]"
            style={{ animation: "float-c 16s ease-in-out infinite, glow-breathe 7s ease-in-out infinite 1s" }}
          />
          <div
            className="absolute left-[60%] top-[50%] h-[300px] w-[300px] rounded-full bg-[var(--cyan)] opacity-[0.06] blur-[90px]"
            style={{ animation: "float-a 14s ease-in-out infinite reverse" }}
          />
        </div>

        {/* ── Grid overlay ── */}
        <div className="pointer-events-none absolute inset-0 grid-pattern" />

        {/* ── Thin top border line ── */}
        <div
          className="absolute left-0 right-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(114,214,255,0.4) 40%, rgba(122,141,255,0.3) 60%, transparent 100%)" }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-24 md:pb-36 md:pt-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_480px] lg:items-center">

            {/* ── Left: copy ── */}
            <div className="max-w-2xl">

              {/* Status badge */}
              <div
                className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                style={{ animation: "badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) both" }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs font-medium tracking-wide text-white/60">AI Career Coaching · Powered by Askia</span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">LIVE</span>
              </div>

              {/* Headline */}
              <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.75rem] lg:text-[4rem]">
                Your AI career coach.
                <br />
                <span className="mt-1 block">Built to get you&nbsp;</span>
                <WordCycle />
              </h1>

              <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-white/50">
                Askia Coach reviews your resume, rewrites your LinkedIn, runs live mock interviews,
                and remembers every session — so progress actually compounds.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                {userId ? (
                  <Link
                    href="/dashboard"
                    className="group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-xl bg-[var(--brand)] px-8 text-[15px] font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_8px_32px_rgba(13,113,130,0.50)]"
                  >
                    Open dashboard
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                ) : (
                  <DemoStartButton
                    href="/dashboard"
                    className="group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-xl bg-[var(--brand)] px-8 text-[15px] font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_8px_32px_rgba(13,113,130,0.50)]"
                  >
                    Start coaching free
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </DemoStartButton>
                )}
                <Link
                  href="/platform"
                  className="inline-flex h-13 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 text-[15px] font-medium text-white/65 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                >
                  See how it works
                </Link>
              </div>

              <p className="mt-5 text-xs text-white/22">Free to start · No credit card · Cancel anytime</p>

              {/* Mini stats */}
              <div className="mt-10 grid grid-cols-3 gap-0 divide-x divide-white/[0.07] border-t border-white/[0.07] pt-8">
                {[
                  { val: "4", label: "Coaching modes" },
                  { val: "∞", label: "Session memory" },
                  { val: "Voice", label: "Ready" },
                ].map((s) => (
                  <div key={s.label} className="px-6 first:pl-0 last:pr-0">
                    <p className="text-[1.6rem] font-extrabold tracking-tight text-white">{s.val}</p>
                    <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.15em] text-white/30">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: product card ── */}
            <div className="relative mx-auto w-full max-w-[480px] lg:mx-0">

              {/* Outer glow ring */}
              <div
                className="absolute -inset-px rounded-[20px] opacity-0"
                style={{
                  background: "linear-gradient(135deg, rgba(13,113,130,0.5), rgba(114,214,255,0.3), rgba(122,141,255,0.4))",
                  animation: "badge-pop 1s ease 0.4s both",
                }}
              />

              {/* Card */}
              <div
                className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0D1828]"
                style={{ animation: "card-glow-pulse 5s ease-in-out infinite" }}
              >
                {/* Window chrome */}
                <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#0A1220] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500/50" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="ml-1 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      <span className="text-[11px] text-white/35">Resume Review · Live session</span>
                    </div>
                  </div>
                  <Image src="/askia-logo.png" alt="Askia" width={18} height={18} className="rounded-md opacity-60" />
                </div>

                {/* Score row */}
                <div className="flex items-center gap-4 border-b border-white/[0.06] px-5 py-4">
                  {/* Animated SVG ring */}
                  <div className="relative flex-shrink-0">
                    <svg width="72" height="72" viewBox="0 0 72 72">
                      <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                      <circle
                        cx="36" cy="36" r="30"
                        fill="none"
                        stroke="var(--brand)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={CIRC}
                        strokeDashoffset={DASH_OFFSET}
                        transform="rotate(-90 36 36)"
                        style={{ animation: "score-ring-fill 1.6s cubic-bezier(0.4,0,0.2,1) 0.8s both" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[17px] font-extrabold text-white">72</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Resume score</p>
                    <p className="mt-1 text-[13px] font-semibold leading-snug text-white/80">Strong structure · 4 bullets need rewrites</p>
                    <div className="mt-2.5 flex gap-4">
                      {[{ l: "ATS", v: 85, c: "var(--brand)" }, { l: "Impact", v: 60, c: "var(--cyan)" }, { l: "Clarity", v: 78, c: "var(--purple)" }].map(s => (
                        <div key={s.l}>
                          <p className="text-[9px] uppercase tracking-wider text-white/30">{s.l}</p>
                          <p className="text-xs font-bold text-white/70">{s.v}</p>
                          <div className="mt-1 h-0.5 w-8 rounded-full bg-white/10">
                            <div className="h-full rounded-full" style={{ width: `${s.v}%`, background: s.c }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="space-y-3 px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
                      <Image src="/askia-logo.png" alt="Coach" width={24} height={24} />
                    </div>
                    <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-2.5">
                      <p className="text-[12.5px] leading-relaxed text-white/80">
                        Your experience section is strong — but 4 bullets still read as activities, not achievements. Let&apos;s fix the TPM role first.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start justify-end gap-3">
                    <div className="max-w-[70%] rounded-2xl rounded-tr-sm bg-[var(--brand)]/80 px-4 py-2.5">
                      <p className="text-[12.5px] leading-relaxed text-white">Show me the first rewrite.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
                      <Image src="/askia-logo.png" alt="Coach" width={24} height={24} />
                    </div>
                    <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-2.5">
                      <p className="text-[12.5px] leading-relaxed text-white/80">
                        <span className="text-white/35 line-through">Led cross-functional work</span>
                        <span className="mx-1.5 text-white/30">→</span>
                        <span className="font-medium text-emerald-400">Drove 3 product launches across 4 teams, cutting time-to-ship by 22%</span>
                      </p>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
                      <Image src="/askia-logo.png" alt="Coach" width={24} height={24} />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-white/[0.05] px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 0.2, 0.4].map(d => (
                          <span
                            key={d}
                            className="h-1.5 w-1.5 rounded-full bg-white/40"
                            style={{ animation: `blink 1.2s ease-in-out ${d}s infinite` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action plan footer */}
                <div className="border-t border-white/[0.06] px-5 py-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Action plan · 3 items</p>
                    <span className="rounded-full bg-[var(--brand)]/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[var(--brand)]">Saved</span>
                  </div>
                  <div className="space-y-1.5">
                    {["Rewrite 4 impact bullets with metrics", "Refresh LinkedIn headline + About", "Practice PM story in STAR format"].map((item, i) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-[var(--brand)]/40">
                          <span className="text-[8px] font-bold text-[var(--brand)]">{i + 1}</span>
                        </div>
                        <span className="text-[11.5px] text-white/40">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge — sessions */}
              <div
                className="absolute -left-6 bottom-20 hidden rounded-xl border border-white/10 bg-[var(--dark-2)]/90 px-4 py-3 shadow-xl backdrop-blur-md lg:block"
                style={{ animation: "badge-pop 0.8s cubic-bezier(0.34,1.56,0.64,1) 1.2s both" }}
              >
                <p className="text-[9.5px] uppercase tracking-wider text-white/30">Sessions completed</p>
                <p className="mt-0.5 text-xl font-extrabold text-white">2,400+</p>
                <div className="mt-1 flex -space-x-1.5">
                  {["var(--brand)", "var(--cyan)", "var(--purple)", "var(--amber)"].map((c, i) => (
                    <div key={i} className="h-5 w-5 rounded-full border-2 border-[var(--dark-2)]" style={{ background: c }} />
                  ))}
                </div>
              </div>

              {/* Floating badge — hired */}
              <div
                className="absolute -right-4 top-16 hidden rounded-xl border border-white/10 bg-[var(--dark-2)]/90 px-4 py-3 shadow-xl backdrop-blur-md lg:block"
                style={{ animation: "badge-pop 0.8s cubic-bezier(0.34,1.56,0.64,1) 1.5s both" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎉</span>
                  <div>
                    <p className="text-[10px] font-semibold text-white/70">Marcus T. got hired</p>
                    <p className="text-[9px] text-white/30">Senior PM · 6 weeks in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-14"
        style={{ background: "linear-gradient(135deg, var(--dark) 0%, var(--dark-2) 50%, var(--dark-3) 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-full w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(114,214,255,0.15), transparent)" }} />
          <div className="absolute right-0 top-0 h-full w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(122,141,255,0.15), transparent)" }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="group relative flex flex-col items-center justify-center bg-white/[0.03] px-8 py-10 text-center transition-colors hover:bg-white/[0.055]"
              >
                {i < stats.length - 1 && (
                  <div className="absolute right-0 top-[15%] hidden h-[70%] w-px bg-white/[0.07] lg:block" />
                )}
                <p
                  className="text-[2.6rem] font-extrabold tracking-tight text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.value}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-white/60">{s.label}</p>
                <p className="mt-0.5 text-[11px] text-white/25">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          LOGO MARQUEE — dual direction
      ════════════════════════════════════════════════ */}
      <section className="overflow-hidden border-b border-[var(--border)] bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Candidates targeting
          </p>
        </div>
        <style>{`
          @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          @keyframes marquee-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        `}</style>

        {/* Row 1 — left */}
        <div
          className="relative mb-4 flex gap-10 overflow-hidden"
          style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}
        >
          {[0, 1].map(set => (
            <div
              key={set}
              className="flex flex-shrink-0 items-center gap-10 pr-10"
              style={{ animation: "marquee 30s linear infinite" }}
            >
              {marqueeRow1.map(name => (
                <Image key={`${set}-${name}`} src={`/logos/${name}.svg`} alt={name} width={100} height={26}
                  className="h-5 w-auto opacity-40 grayscale transition-all duration-200 hover:opacity-70 hover:grayscale-0" />
              ))}
            </div>
          ))}
        </div>

        {/* Row 2 — right */}
        <div
          className="relative flex gap-10 overflow-hidden"
          style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}
        >
          {[0, 1].map(set => (
            <div
              key={set}
              className="flex flex-shrink-0 items-center gap-10 pr-10"
              style={{ animation: "marquee-rev 34s linear infinite" }}
            >
              {marqueeRow2.map(name => (
                <Image key={`${set}-${name}`} src={`/logos/${name}.svg`} alt={name} width={100} height={26}
                  className="h-5 w-auto opacity-35 grayscale transition-all duration-200 hover:opacity-65 hover:grayscale-0" />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          LIVE DEMO — AI coaching engine
      ════════════════════════════════════════════════ */}
      <MvpLiveDemo />

      {/* ════════════════════════════════════════════════
          FEATURES — bento grid
      ════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--brand)]">
              Four coaching surfaces
            </div>
            <h2 className="text-[2.6rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-5xl">
              Every stage of your<br />job search, built in.
            </h2>
          </div>
          <p className="max-w-sm text-[16px] leading-relaxed text-[var(--muted)] lg:text-right">
            Good coaching doesn&apos;t fit into a single chat. Each surface has its own workspace so nothing bleeds together.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* LARGE — Resume Review */}
          <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-7 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] md:col-span-2">
            <div className="absolute left-0 right-0 top-0 h-[3px] bg-[var(--brand)]" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-light)] text-[var(--brand)]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">01 · Resume Review</p>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">Fix what&apos;s costing you callbacks</h3>
                <p className="mt-2.5 max-w-sm text-[14px] leading-6 text-[var(--muted)]">Structured feedback on clarity, ATS-readiness, and impact bullets — with specific rewrites you can use immediately.</p>
              </div>
            </div>
            {/* Mini preview */}
            <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]">
              <div className="border-b border-[var(--border)] bg-white px-4 py-2.5 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
                <span className="text-[11px] font-medium text-[var(--muted)]">experience_v3.pdf · Analyzing</span>
              </div>
              <div className="space-y-2 p-4">
                {[
                  { weak: true,  text: "Led cross-functional projects across multiple teams" },
                  { weak: false, text: "Drove 3 launches across 4 teams, cutting time-to-ship by 22%" },
                  { weak: true,  text: "Improved performance metrics significantly" },
                  { weak: false, text: "Reduced API latency by 40% for 2M+ daily active users" },
                ].map((l, i) => (
                  <div key={i} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[11.5px] ${l.weak ? "bg-[var(--danger-soft)] text-[var(--danger)]" : "bg-[var(--success-soft)] text-[var(--success)]"}`}>
                    <span>{l.weak ? "✕" : "✓"}</span>
                    <span className={l.weak ? "line-through opacity-60" : "font-medium"}>{l.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-7 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
            <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: "var(--cyan-dim)" }} />
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(114,214,255,0.12)] text-[var(--cyan-dim)]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">02 · LinkedIn</p>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">Turn your profile into inbound</h3>
            <p className="mt-2.5 text-[14px] leading-6 text-[var(--muted)]">Headline, About, and experience entries rewritten to attract recruiters — with a visibility score and keyword gap analysis.</p>
            {/* Score bar */}
            <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-[var(--muted)]">Profile visibility score</span>
                <span className="text-sm font-bold text-[var(--cyan-dim)]">68 → 91</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--border)]">
                <div className="h-full rounded-full" style={{ width: "91%", background: "linear-gradient(90deg, var(--brand), var(--cyan))" }} />
              </div>
              <p className="mt-2 text-[11px] text-[var(--muted)]">+23 points after headline + About rewrite</p>
            </div>
          </div>

          {/* Mock Interviews */}
          <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-7 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
            <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: "var(--purple)" }} />
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(122,141,255,0.12)] text-[var(--purple)]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">03 · Mock Interview</p>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">Practice until the answers are natural</h3>
            <p className="mt-2.5 text-[14px] leading-6 text-[var(--muted)]">Behavioral, technical, or recruiter-style sessions with granular feedback on structure, evidence, and delivery.</p>
            {/* Feedback chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Too vague", "Add a metric", "Missing impact", "Use STAR", "Strong close ✓"].map((tag, i) => (
                <span key={tag} className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${i < 4 ? "bg-[var(--warning-soft)] text-[var(--warning)]" : "bg-[var(--success-soft)] text-[var(--success)]"}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* LARGE — Career Direction */}
          <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-7 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] md:col-span-2">
            <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: "var(--amber)" }} />
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="flex-1">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--amber-soft)] text-[var(--amber)]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
                  </svg>
                </div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">04 · Career Direction</p>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">Get clear on what to target next</h3>
                <p className="mt-2.5 text-[14px] leading-6 text-[var(--muted)]">The coach analyzes your background, goals, and skill gaps — and gives you a concrete direction, not motivational filler.</p>
              </div>
              {/* Role match grid */}
              <div className="grid grid-cols-2 gap-2.5 lg:w-64">
                {[
                  { role: "Senior PM", match: 92, color: "var(--brand)" },
                  { role: "Product Lead", match: 78, color: "var(--cyan-dim)" },
                  { role: "Group PM", match: 65, color: "var(--purple)" },
                  { role: "Director", match: 48, color: "var(--muted)" },
                ].map(r => (
                  <div key={r.role} className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-[var(--ink-2)]">{r.role}</span>
                      <span className="text-[11px] font-bold" style={{ color: r.color }}>{r.match}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
                      <div className="h-full rounded-full transition-all" style={{ width: `${r.match}%`, background: r.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--brand)]">
              Real results
            </div>
            <h2 className="text-[2.6rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-5xl">
              People actually getting hired.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] text-[var(--muted)]">
              Not motivational stories. Real job-search problems that got solved.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-7 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                {/* Accent top bar */}
                <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: t.color }} />

                {/* Stars */}
                <div className="mb-5 flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="flex-1 text-[14.5px] leading-7 text-[var(--ink-2)]">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3.5 border-t border-[var(--border)] pt-5">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-black text-white"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[13.5px] font-bold text-[var(--ink)]">{t.name}</p>
                    <p className="text-[12px] text-[var(--muted)]">{t.role} · {t.context}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          HOW IT WORKS — visual timeline
      ════════════════════════════════════════════════ */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] py-20 text-white md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute right-0 top-0 h-[550px] w-[550px] rounded-full bg-[var(--cyan)] opacity-[0.06] blur-[130px]"
            style={{ animation: "float-b 20s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-0 left-0 h-[450px] w-[450px] rounded-full bg-[var(--purple)] opacity-[0.07] blur-[110px]"
            style={{ animation: "float-a 24s ease-in-out infinite reverse" }}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
              How it works
            </div>
            <h2 className="text-[2.6rem] font-extrabold tracking-[-0.03em] md:text-5xl">
              From first session<br className="hidden sm:block" /> to job offer.
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative grid gap-5 md:grid-cols-3">
            {/* Connecting line */}
            <div className="absolute left-[50%] top-8 hidden h-px w-[calc(100%-4rem)] -translate-x-1/2 md:block"
              style={{ background: "linear-gradient(90deg, var(--brand), var(--cyan), var(--purple))" }} />

            {steps.map((step) => (
              <div key={step.num} className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 transition-all hover:bg-white/[0.05]">
                {/* Accent left bar */}
                <div className="absolute left-0 top-0 h-full w-[3px]" style={{ background: step.accent }} />

                {/* Step number circle */}
                <div
                  className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm font-black text-white"
                  style={{ background: `${step.accent}22` }}
                >
                  {step.num}
                </div>

                <div className="mb-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/10">
                  {step.tag}
                </div>
                <h3 className="mt-3 text-[17px] font-bold leading-snug tracking-tight text-white">{step.title}</h3>
                <p className="mt-3 text-[13.5px] leading-7 text-white/48">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          BEFORE / AFTER
      ════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mb-12 text-center">
          <h2 className="text-[2.6rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-5xl">
            The difference is&nbsp;
            <span className="text-[var(--brand)]">visible.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] text-[var(--muted)]">
            Most job searches fail silently. Askia Coach makes the issues explicit and fixes them.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Without */}
          <div className="overflow-hidden rounded-2xl border border-[var(--danger)]/20 bg-[var(--danger-soft)]/40">
            <div className="flex items-center gap-3 border-b border-[var(--danger)]/15 px-6 py-4">
              <div className="h-2.5 w-2.5 rounded-full bg-[var(--danger)]" />
              <span className="text-[12px] font-bold uppercase tracking-widest text-[var(--danger)]">Without Askia Coach</span>
            </div>
            <div className="space-y-3 p-6">
              {[
                "Rewriting your resume and still not hearing back",
                "LinkedIn DMs going unanswered by recruiters",
                "Blanking on behavioral questions under pressure",
                "No idea if you're targeting the right roles",
                "Every session starting from zero — no memory",
              ].map(item => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-white/50 px-4 py-3">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[var(--danger)]/20 text-[9px] font-bold text-[var(--danger)]">✕</span>
                  <p className="text-[13.5px] text-[var(--ink-2)]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* With */}
          <div className="overflow-hidden rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand-light)]/50">
            <div className="flex items-center gap-3 border-b border-[var(--brand)]/15 px-6 py-4">
              <div className="h-2.5 w-2.5 rounded-full bg-[var(--brand)]" />
              <span className="text-[12px] font-bold uppercase tracking-widest text-[var(--brand)]">With Askia Coach</span>
            </div>
            <div className="space-y-3 p-6">
              {[
                "Specific bullet rewrites that surface in ATS systems",
                "Headline + About rewritten to match recruiter searches",
                "STAR answers practiced until they're airtight",
                "Role-fit score and target list based on your actual background",
                "Session memory that carries your context forward",
              ].map(item => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-white/60 px-4 py-3">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/20 text-[9px] font-bold text-[var(--brand)]">✓</span>
                  <p className="text-[13.5px] text-[var(--ink-2)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CTA — dramatic, full-bleed
      ════════════════════════════════════════════════ */}
      <section
        className="noise-overlay relative overflow-hidden py-24 text-white md:py-32"
        style={{ background: "linear-gradient(135deg, #052830 0%, var(--brand) 40%, #063844 70%, var(--dark) 100%)" }}
      >
        {/* Glow orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-[-5%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[var(--cyan)] opacity-[0.12] blur-[120px]"
            style={{ animation: "float-b 18s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[var(--purple)] opacity-[0.10] blur-[110px]"
            style={{ animation: "float-a 22s ease-in-out infinite" }}
          />
          <div className="absolute bottom-0 left-[40%] h-[300px] w-[400px] rounded-full bg-white opacity-[0.04] blur-[80px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />

        {/* Top edge glow line */}
        <div
          className="absolute left-0 right-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(114,214,255,0.5) 40%, rgba(255,255,255,0.3) 60%, transparent 100%)" }}
        />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          {/* Logo */}
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-[0_0_40px_rgba(114,214,255,0.2)] backdrop-blur-sm">
            <Image src="/askia-logo.png" alt="Askia" width={40} height={40} className="rounded-xl" />
          </div>

          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em] md:text-[3.5rem]">
            Ready to accelerate<br />your search?
          </h2>

          <p className="mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-white/55">
            Free to start. No credit card. Better coaching from the first conversation.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {userId ? (
              <Link
                href="/dashboard"
                className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] shadow-[0_8px_40px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(255,255,255,0.28)]"
              >
                Open dashboard
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            ) : (
              <DemoStartButton
                href="/dashboard"
                className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] shadow-[0_8px_40px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-[0_12px_48px_rgba(255,255,255,0.28)]"
              >
                Start coaching free
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </DemoStartButton>
            )}
            <Link
              href="/pricing"
              className="inline-flex h-14 items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-8 text-[15px] font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.10] hover:text-white hover:border-white/30"
            >
              View pricing
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[12px] text-white/30">
            {["Free to start", "No credit card", "Cancel anytime", "2,400+ sessions"].map(s => (
              <div key={s} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/25" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

    </PageFrame>
  );
}
