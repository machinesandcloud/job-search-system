import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { DemoStartButton } from "@/components/mvp-session-actions";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { WordCycle } from "@/components/mvp-word-cycle";
import { StarField, CursorGlow, HeroChatPreview } from "@/components/mvp-hero-extras";
import { MvpScrollCoach } from "@/components/mvp-scroll-coach";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";

// ── Marquee data ──────────────────────────────────────────────────────────────
const marqueeRow1 = ["google","meta","microsoft","amazon","stripe","figma","shopify","notion","airbnb","spotify","netflix","slack","databricks","snowflake","salesforce","github"];
const marqueeRow2 = ["coinbase","uber","adobe","atlassian","doordash","dropbox","nvidia","oracle","paypal","pinterest","zoom","intuit","figma","stripe","notion","shopify"];

// ── Feature deep-dive sections ────────────────────────────────────────────────
const FEATURES = [
  {
    tag: "Resume Review",
    accent: "var(--brand)",
    accentHex: "#0D7182",
    headline: "Your resume is costing you interviews.",
    sub: "Most resumes fail silently — not because of typos but because 87% of hiring systems reject them before a human reads them. Askia fixes the underlying issues.",
    points: [
      "ATS keyword gap analysis against real job descriptions",
      "Bullet-by-bullet metric injection and impact rewrites",
      "Before/after score comparison you can see and measure",
      "Paste-ready output — no copy-editing needed",
    ],
    preview: {
      label: "Resume score",
      before: 52, after: 89,
      bullets: [
        { bad: "Led cross-functional projects across teams", good: "Drove 3 launches · cut time-to-ship 22%", color: "var(--brand)" },
        { bad: "Improved performance metrics significantly", good: "Cut API latency 4.2s → 340ms · +2M DAU", color: "var(--cyan-dim)" },
      ],
    },
    dir: "left" as const,
  },
  {
    tag: "LinkedIn Overhaul",
    accent: "var(--cyan-dim)",
    accentHex: "#4ca7e6",
    headline: "Recruiters can't find you. That's fixable.",
    sub: "LinkedIn's algorithm ranks profiles by keyword density, headline structure, and activity signals. Askia rebuilds yours to surface in the exact searches where you need to appear.",
    points: [
      "Headline rebuilt for recruiter search filters",
      "About section rewritten with target role keywords",
      "Skill endorsement strategy for L5+ positioning",
      "Visibility score from 68 → 91 in one session",
    ],
    preview: {
      bars: [
        { label: "Search ranking",   from: 52, to: 91, color: "var(--cyan-dim)" },
        { label: "Keyword density",  from: 44, to: 88, color: "var(--brand)" },
        { label: "Headline strength",from: 38, to: 94, color: "var(--purple)" },
      ],
    },
    dir: "right" as const,
  },
  {
    tag: "Mock Interview",
    accent: "var(--purple)",
    accentHex: "#7a8dff",
    headline: "Vague answers are killing your chances.",
    sub: "Most candidates have decent stories buried under generic phrasing. Askia excavates the specifics — scope, decision logic, metric, outcome — and rebuilds the narrative until it lands.",
    points: [
      "Behavioral, technical, and case question modes",
      "Real-time STAR framework feedback mid-answer",
      "Session memory — each round builds on the last",
      "Voice-enabled coaching for realistic practice",
    ],
    preview: {
      question: "Tell me about a high-stakes decision with incomplete data.",
      tags: [
        { t: "✕ No metric",       ok: false },
        { t: "✕ Missing outcome", ok: false },
        { t: "✓ Situation clear", ok: true  },
        { t: "✓ Decision stated", ok: true  },
      ],
      improved: "Conversion +18%, adding $2.4M ARR the following quarter.",
    },
    dir: "left" as const,
  },
  {
    tag: "Career Direction",
    accent: "var(--amber)",
    accentHex: "#F97316",
    headline: "Applying everywhere is the same as applying nowhere.",
    sub: "Spray-and-pray job searches produce anxiety, not offers. Askia maps your background against current market demand, identifies your strongest signal, and builds a focused strategy.",
    points: [
      "Role fit analysis across 4 target categories",
      "Gap identification between your background and target roles",
      "Targeted company shortlist based on your profile",
      "30-day action plan with weekly milestones",
    ],
    preview: {
      roles: [
        { name: "Senior PM (B2B SaaS)", pct: 94, color: "var(--brand)" },
        { name: "Product Lead (Infra)", pct: 82, color: "var(--cyan-dim)" },
        { name: "Group PM",             pct: 71, color: "var(--purple)" },
        { name: "Director of Product",  pct: 58, color: "var(--muted)" },
      ],
    },
    dir: "right" as const,
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "I went from 0 callbacks in three weeks to 4 interview requests in one. The resume rewrites weren't generic — they were specific, metric-driven, and immediately usable.",
    name: "Marcus T.", role: "Senior Product Manager", context: "Targeting FAANG",
    initials: "MT", color: "#0D7182", stars: 5,
  },
  {
    quote: "The mock interview module is scary good. It catches every vague answer and doesn't let you move on until the story is specific and structured. My STAR answers are actually good now.",
    name: "Aisha R.", role: "Software Engineer", context: "L5 offer in 6 weeks",
    initials: "AR", color: "#4ca7e6", stars: 5,
  },
  {
    quote: "I had a messy LinkedIn and a resume I was embarrassed to send. One session and both were completely rebuilt. The sections it wrote were better than anything I'd produced in months.",
    name: "Jordan K.", role: "Product Designer", context: "FAANG offer accepted",
    initials: "JK", color: "#7a8dff", stars: 5,
  },
];

export default async function HomePage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>

      {/* ══════════════════════════════════════════════════════
          HERO — cinematic full-screen dark
      ══════════════════════════════════════════════════════ */}
      <section className="noise-overlay relative min-h-screen overflow-hidden bg-[var(--dark)] text-white">
        {/* Star field */}
        <StarField count={120} />
        {/* Cursor glow */}
        <CursorGlow color="rgba(13,113,130,0.11)" size={700} />

        {/* Animated orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"760px", height:"760px", top:"-12%", left:"-10%", background:"var(--cyan)", opacity:.09, filter:"blur(140px)", borderRadius:"50%", animation:"float-a 20s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"640px", height:"640px", top:"-8%", right:"-8%", background:"var(--purple)", opacity:.08, filter:"blur(130px)", borderRadius:"50%", animation:"float-b 24s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"500px", height:"500px", bottom:"-5%", left:"38%", background:"var(--brand)", opacity:.07, filter:"blur(110px)", borderRadius:"50%", animation:"float-c 17s ease-in-out infinite" }} />
        </div>

        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_460px] lg:items-center">

            {/* Left copy */}
            <div className="max-w-2xl">
              <div
                className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                style={{ animation: "badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) both" }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs font-medium tracking-wide text-white/55">AI Career Coaching · Powered by Askia</span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">LIVE</span>
              </div>

              <h1 className="text-[3rem] font-extrabold leading-[1.04] tracking-[-0.035em] md:text-[3.8rem] lg:text-[4.2rem]">
                Your AI career coach.<br />
                <span className="block mt-1">Built to get you&nbsp;</span>
                <WordCycle />
              </h1>

              <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-white/48">
                Askia Coach reviews your resume, rewrites your LinkedIn, runs live mock interviews,
                and remembers every session — so progress actually compounds.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                {userId ? (
                  <Link href="/dashboard" className="group inline-flex h-13 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[15px] font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(13,113,130,0.50)]">
                    Open dashboard <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                ) : (
                  <DemoStartButton href="/signup" className="group inline-flex h-13 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[15px] font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(13,113,130,0.50)]">
                    Start coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </DemoStartButton>
                )}
                <Link href="#demo" className="inline-flex h-13 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 text-[15px] font-medium text-white/60 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
                  Watch it work
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </Link>
              </div>

              <p className="mt-5 text-[12px] text-white/22">Free to start · No credit card · Cancel anytime</p>

              {/* Mini stats */}
              <div className="mt-10 grid grid-cols-3 divide-x divide-white/[0.07] border-t border-white/[0.07] pt-8">
                {[
                  { val: "94%", label: "report more callbacks" },
                  { val: "4.9★", label: "avg session rating" },
                  { val: "2,400+", label: "sessions completed" },
                ].map((s) => (
                  <div key={s.label} className="px-6 first:pl-0 last:pr-0">
                    <p className="text-[1.5rem] font-extrabold tracking-tight text-white">{s.val}</p>
                    <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.14em] text-white/28">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: live chat preview */}
            <div
              className="relative hidden lg:block"
              style={{ height: "520px", animation: "reveal-right 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
            >
              {/* Glow behind window */}
              <div className="absolute -inset-8 rounded-3xl" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(13,113,130,0.15) 0%, transparent 70%)" }} />
              {/* Spin border wrapper */}
              <div className="absolute -inset-[1px] rounded-2xl spin-border-slow" />
              <div className="relative h-full overflow-hidden rounded-2xl" style={{ zIndex: 1 }}>
                <HeroChatPreview />
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ animation: "float-c 3s ease-in-out infinite" }}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">scroll</span>
              <div className="h-8 w-5 rounded-full border border-white/15 p-1">
                <div className="h-2 w-full animate-bounce rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LOGO MARQUEE
      ══════════════════════════════════════════════════════ */}
      <section className="overflow-hidden border-y border-[var(--border)] bg-white py-10">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          Candidates targeting roles at
        </p>
        <style>{`
          @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
          @keyframes marquee-rev { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        `}</style>
        <div className="overflow-hidden">
          <div className="flex">
            {[0, 1].map((set) => (
              <div key={set} className="flex flex-shrink-0 items-center gap-10 pr-10" style={{ animation: "marquee 32s linear infinite" }}>
                {marqueeRow1.map((name) => (
                  <Image key={`${set}-${name}`} src={`/logos/${name}.svg`} alt={name} width={100} height={26} className="h-5 w-auto opacity-35 grayscale transition-all duration-200 hover:opacity-65 hover:grayscale-0" />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-6 flex">
            {[0, 1].map((set) => (
              <div key={set} className="flex flex-shrink-0 items-center gap-10 pr-10" style={{ animation: "marquee-rev 36s linear infinite" }}>
                {marqueeRow2.map((name) => (
                  <Image key={`${set}-${name}`} src={`/logos/${name}.svg`} alt={name} width={100} height={26} className="h-5 w-auto opacity-30 grayscale transition-all duration-200 hover:opacity-60 hover:grayscale-0" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SCROLL COACHING DEMO — THE MAIN EVENT
      ══════════════════════════════════════════════════════ */}
      <div id="demo">
        <MvpScrollCoach />
      </div>

      {/* ══════════════════════════════════════════════════════
          FEATURE DEEP DIVES — 4 alternating full sections
      ══════════════════════════════════════════════════════ */}
      {FEATURES.map((f, fi) => (
        <section
          key={f.tag}
          className={`overflow-hidden py-20 md:py-28 ${f.dir === "left" ? "feature-glow-left" : "feature-glow-right"}`}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className={`grid items-center gap-12 lg:grid-cols-2 ${f.dir === "right" ? "lg:[direction:rtl]" : ""}`}>

              {/* Copy */}
              <Reveal className={f.dir === "right" ? "[direction:ltr]" : ""}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ background: `${f.accentHex}14`, color: f.accentHex, border: `1px solid ${f.accentHex}28` }}>
                  {f.tag}
                </div>
                <h2 className="mb-5 text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--ink)] md:text-[2.9rem]">
                  {f.headline}
                </h2>
                <p className="mb-8 text-[16px] leading-relaxed text-[var(--muted)]">{f.sub}</p>
                <ul className="space-y-3">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: f.accentHex }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                      <span className="text-[14.5px] leading-6 text-[var(--ink-2)]">{pt}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Preview card */}
              <Reveal data-delay="2" className={f.dir === "right" ? "[direction:ltr]" : ""}>
                <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--dark)] p-6 shadow-[var(--shadow-lg)]"
                  style={{ boxShadow: `0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px ${f.accentHex}20` }}>
                  {/* Orb */}
                  <div className="pointer-events-none absolute -top-16 right-8 h-48 w-48 rounded-full blur-[60px]" style={{ background: f.accentHex, opacity: 0.2 }} />

                  {/* Browser chrome */}
                  <div className="mb-4 flex items-center gap-2.5">
                    {["#ff5f57","#febc2e","#28c840"].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
                    <div className="ml-2 flex-1 rounded-md bg-white/[0.05] px-3 py-1 text-center text-[10px] text-white/25">
                      askia.coach · {f.tag}
                    </div>
                  </div>

                  {/* Resume preview */}
                  {f.preview && "bullets" in f.preview && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-white/30">Resume analysis</p>
                        <div className="flex items-center gap-1.5">
                          <ScoreRingInline score={f.preview.before!} color="#F97316" label="Before" />
                          <svg className="h-4 w-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          <ScoreRingInline score={f.preview.after!} color={f.accentHex} label="After" />
                        </div>
                      </div>
                      {f.preview.bullets!.map((b) => (
                        <div key={b.bad} className="space-y-1.5">
                          <div className="rounded-lg bg-red-500/10 px-3 py-2">
                            <p className="text-[12px] text-red-300/65 line-through">{b.bad}</p>
                          </div>
                          <div className="rounded-lg bg-emerald-500/10 px-3 py-2">
                            <p className="text-[12px] font-medium text-emerald-300">{b.good}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* LinkedIn preview */}
                  {f.preview && "bars" in f.preview && (
                    <div className="space-y-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-white/30">Profile visibility</p>
                      {f.preview.bars!.map((b) => (
                        <div key={b.label} className="space-y-1.5">
                          <div className="flex justify-between text-[12px]">
                            <span className="text-white/50">{b.label}</span>
                            <span className="font-bold text-white">{b.to}</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                            <div className="h-full rounded-full" style={{ width: `${b.to}%`, background: b.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interview preview */}
                  {f.preview && "question" in f.preview && (
                    <div className="space-y-3">
                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/25 mb-1.5">Question</p>
                        <p className="text-[12.5px] leading-relaxed text-white/70">{f.preview.question}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {f.preview.tags!.map((tag) => (
                          <span key={tag.t} className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${tag.ok ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-red-500/30 bg-red-500/10 text-red-300"}`}>
                            {tag.t}
                          </span>
                        ))}
                      </div>
                      <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/60 mb-1">Improved outcome</p>
                        <p className="text-[12.5px] font-medium text-emerald-300">{f.preview.improved}</p>
                      </div>
                    </div>
                  )}

                  {/* Career preview */}
                  {f.preview && "roles" in f.preview && (
                    <div className="space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-white/30">Role fit analysis</p>
                      {f.preview.roles!.map((role) => (
                        <div key={role.name} className="space-y-1.5">
                          <div className="flex justify-between text-[12.5px]">
                            <span className="text-white/70">{role.name}</span>
                            <span className="font-bold" style={{ color: role.color }}>{role.pct}%</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${role.pct}%`, background: role.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Section divider */}
          {fi < FEATURES.length - 1 && <div className="separator-glow mx-auto mt-20 max-w-7xl md:mt-28" />}
        </section>
      ))}

      {/* ══════════════════════════════════════════════════════
          METRICS WALL
      ══════════════════════════════════════════════════════ */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] py-20 text-white md:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"600px", height:"600px", top:"-15%", right:"-5%", background:"var(--brand)", opacity:.07, filter:"blur(130px)", borderRadius:"50%", animation:"float-b 22s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"500px", height:"500px", bottom:"-10%", left:"-5%", background:"var(--purple)", opacity:.07, filter:"blur(110px)", borderRadius:"50%", animation:"float-a 18s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-25" />

        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <h2 className="text-[2.6rem] font-extrabold tracking-[-0.03em] md:text-[3.2rem]">
                The numbers don&apos;t<br />
                <span className="gradient-text-animated">lie.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-px border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
            {[
              { value: 94, suffix: "%", label: "Report more callbacks", sub: "Within 2 weeks of first session", color: "var(--brand)" },
              { value: 4.9, suffix: "★", label: "Average session rating", sub: "Across 2,400+ sessions", color: "var(--cyan)" },
              { value: 87, suffix: "%", label: "Fewer ATS rejections", sub: "After resume review session", color: "var(--purple)" },
              { value: 6, suffix: "wk", label: "Avg time to offer", sub: "From first session to signed offer", color: "var(--amber)" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col justify-between bg-[var(--dark)] p-7">
                <p className="text-[3rem] font-extrabold tracking-tight text-white md:text-[3.5rem]">
                  <CountUp value={stat.value} suffix={stat.suffix} duration={1200} easing="bounce" />
                </p>
                <div>
                  <p className="mt-2 text-[14px] font-semibold text-white/80">{stat.label}</p>
                  <p className="mt-1 text-[12px] text-white/35">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--brand)]">
                From real candidates
              </div>
              <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.9rem]">
                They got hired. Here&apos;s what happened.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} data-delay={String(i + 1) as "1" | "2" | "3"}>
                <div
                  className="testimonial-card hover-lift flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white p-7 shadow-[var(--shadow)]"
                  style={{ "--accent-color": t.color } as React.CSSProperties}
                >
                  <div className="mb-4 flex">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <svg key={j} className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="flex-1 text-[14.5px] leading-7 text-[var(--ink-2)]">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: t.color }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-[var(--ink)]">{t.name}</p>
                      <p className="text-[12px] text-[var(--muted)]">{t.role} · {t.context}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
                How it works
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[16px] text-[var(--muted)]">
                Three steps, one session, real progress.
              </p>
            </div>
          </Reveal>

          <div className="relative grid gap-8 md:grid-cols-3">
            {/* Connecting line (desktop) */}
            <div className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-gradient-to-r from-[var(--brand-light)] via-[var(--brand)]/30 to-[var(--brand-light)] md:block" />

            {[
              { n: "1", title: "Pick a coaching surface", body: "Resume, LinkedIn, interview, or career direction. Each surface has its own focused workspace.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
              { n: "2", title: "Work with your coach", body: "The AI asks the right questions, identifies the gaps, and delivers specific actionable outputs — not generic advice.", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
              { n: "3", title: "Leave with something real", body: "Every session ends with a tangible output — a rewritten bullet, a revised headline, a stronger answer, or a 30-day plan.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            ].map((step, i) => (
              <Reveal key={step.n} data-delay={String(i + 1) as "1" | "2" | "3"}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-light)]">
                    <svg className="h-5 w-5 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d={step.icon} /></svg>
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand)] text-[9px] font-bold text-white">{step.n}</span>
                  </div>
                  <h3 className="mb-2 text-[16px] font-bold text-[var(--ink)]">{step.title}</h3>
                  <p className="text-[14px] leading-6 text-[var(--muted)]">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,#063844 75%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", left:"-5%", top:"-10%", width:"500px", height:"500px", background:"var(--cyan)", opacity:.13, filter:"blur(120px)", borderRadius:"50%", animation:"float-b 18s ease-in-out infinite" }} />
          <div style={{ position:"absolute", right:"-5%", bottom:"-10%", width:"400px", height:"400px", background:"var(--purple)", opacity:.10, filter:"blur(100px)", borderRadius:"50%", animation:"float-a 22s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm">
            <Image src="/askia-logo.png" alt="Askia" width={40} height={40} className="rounded-xl" />
          </div>
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em] md:text-[3.5rem]">
            Start free today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/50">
            No credit card. No friction. Real coaching from session one.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            {userId ? (
              <Link href="/dashboard" className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] shadow-[0_8px_40px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5">
                Open dashboard <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            ) : (
              <Link href="/signup" className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] shadow-[0_8px_40px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5">
                Get started free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            )}
            <Link href="/platform" className="inline-flex h-14 items-center rounded-xl border border-white/20 bg-white/[0.06] px-8 text-[15px] font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.11] hover:text-white">
              See the platform
            </Link>
          </div>
          <p className="mt-6 text-[12px] text-white/30">Free to start · Cancel Pro anytime · Session data always yours</p>
        </div>
      </section>

    </PageFrame>
  );
}

// ── Inline score ring for feature preview cards ───────────────────────────────
function ScoreRingInline({ score, color, label }: { score: number; color: string; label: string }) {
  const r = 18; const circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3.5" />
        <circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="3.5"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - score / 100)}
          strokeLinecap="round" transform="rotate(-90 20 20)" />
        <text x="20" y="20" textAnchor="middle" dy="0.35em" fill="white" fontSize="8" fontWeight="800">{score}</text>
      </svg>
      <span className="text-[9px] text-white/30">{label}</span>
    </div>
  );
}
