import Image from "next/image";
import Link from "next/link";
import { PageFrame, Section } from "@/components/mvp";
import { DemoStartButton } from "@/components/mvp-session-actions";
import { getCurrentUserId } from "@/lib/mvp/auth";

// ── Feature cards ──────────────────────────────────────────────────────────────
const features = [
  {
    num: "01",
    label: "Resume Review",
    title: "Fix what's costing you callbacks",
    desc: "Structured feedback on clarity, ATS readiness, and impact bullets — with rewrites you can use immediately.",
    accent: "brand",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    num: "02",
    label: "LinkedIn Optimization",
    title: "Turn your profile into inbound leads",
    desc: "Headline, About, and experience entries rewritten to attract recruiters — with a visibility score and keyword gaps.",
    accent: "cyan",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    num: "03",
    label: "Mock Interviews",
    title: "Practice until the answers are natural",
    desc: "Behavioral, technical, or recruiter-style sessions with granular feedback on structure, evidence, and concision.",
    accent: "purple",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    num: "04",
    label: "Career Direction",
    title: "Get clear on what to target next",
    desc: "The coach analyzes your background, goals, and gaps — and gives you concrete direction, not motivational filler.",
    accent: "amber",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
      </svg>
    ),
  },
];

const accentMap = {
  brand: { bg: "bg-[var(--brand-light)]", text: "text-[var(--brand)]", bar: "bg-[var(--brand)]" },
  cyan:  { bg: "bg-[rgba(114,214,255,0.12)]", text: "text-[var(--cyan-dim)]", bar: "bg-[var(--cyan-dim)]" },
  purple:{ bg: "bg-[rgba(122,141,255,0.12)]", text: "text-[var(--purple)]", bar: "bg-[var(--purple)]" },
  amber: { bg: "bg-[var(--amber-soft)]", text: "text-[var(--amber)]", bar: "bg-[var(--amber)]" },
} as const;

// ── What you keep ──────────────────────────────────────────────────────────────
const outcomes = [
  { icon: "📄", text: "Resume rewrites with quantified impact bullets" },
  { icon: "🔗", text: "LinkedIn sections tuned to your target role" },
  { icon: "🎤", text: "Interview feedback saved to your session recap" },
  { icon: "✅", text: "Action plan updated after every session" },
  { icon: "🧠", text: "Coaching memory that carries your goals forward" },
];

// ── More logos for marquee ─────────────────────────────────────────────────────
const marqueeLogos = [
  "google","meta","microsoft","amazon","stripe","figma",
  "shopify","notion","airbnb","spotify","netflix","slack",
  "databricks","snowflake","salesforce","coinbase","uber","github",
];

export default async function HomePage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>

      {/* ════════════════════════════════════════════════
          HERO — dark, cinematic, on-brand
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--dark)] text-white">
        {/* Layered radial glow background — matches askia.tech aesthetic */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[-5%] h-[700px] w-[700px] rounded-full bg-[var(--cyan)] opacity-[0.11] blur-[130px]" />
          <div className="absolute right-[-5%] top-[-8%] h-[600px] w-[600px] rounded-full bg-[var(--purple)] opacity-[0.09] blur-[120px]" />
          <div className="absolute bottom-0 left-[40%] h-[400px] w-[500px] rounded-full bg-[var(--brand)] opacity-[0.08] blur-[100px]" />
        </div>

        {/* Subtle grid overlay */}
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-100" />

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-24 md:pb-32 md:pt-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">

            {/* ── Left: copy ── */}
            <div className="max-w-xl">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs font-medium tracking-wide text-white/65">AI Career Coaching · Powered by Askia</span>
              </div>

              {/* Headline */}
              <h1 className="text-[2.85rem] font-extrabold leading-[1.07] tracking-[-0.03em] md:text-[3.5rem]">
                Your AI career coach.{" "}
                <span className="gradient-text">Built to get you hired.</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-white/55 max-w-lg">
                Askia Coach reviews your resume, sharpens your LinkedIn, runs mock interviews, and
                maintains session memory so every conversation builds on the last.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {userId ? (
                  <Link href="/dashboard" className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:bg-[var(--brand-hover)] hover:-translate-y-px">
                    Open dashboard →
                  </Link>
                ) : (
                  <DemoStartButton href="/dashboard" className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:bg-[var(--brand-hover)] hover:-translate-y-px">
                    Start coaching free →
                  </DemoStartButton>
                )}
                <Link href="/platform" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 text-sm font-medium text-white/70 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white">
                  See how it works
                </Link>
              </div>

              <p className="mt-5 text-xs text-white/25">Free to start · No credit card required</p>

              {/* Mini stats row */}
              <div className="mt-10 flex flex-wrap gap-7 border-t border-white/[0.07] pt-7">
                {[
                  { val: "4", label: "Coaching surfaces" },
                  { val: "∞", label: "Session memory" },
                  { val: "Voice", label: "Ready" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-extrabold tracking-tight text-white">{s.val}</p>
                    <p className="mt-0.5 text-[11px] text-white/35 uppercase tracking-[0.16em]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: product preview ── */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Main card */}
              <div className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0D1828] shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                {/* Window chrome */}
                <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#0A1220] px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500/50" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      <span className="text-[11px] text-white/35">Resume Review · Active</span>
                    </div>
                  </div>
                  <Image src="/askia-logo.png" alt="Askia" width={18} height={18} className="rounded-md opacity-60" />
                </div>

                {/* Score display */}
                <div className="flex items-center gap-5 border-b border-white/[0.06] px-5 py-4">
                  <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 border-[var(--brand)]/30" style={{ background: "conic-gradient(var(--brand) 72%, rgba(255,255,255,0.06) 0)" }}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D1828]">
                      <span className="text-base font-extrabold text-white">72</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">Resume score</p>
                    <p className="mt-1 text-sm font-semibold text-white/80">Strong structure · 4 bullets need rewrites</p>
                    <div className="mt-2 flex gap-3">
                      {[{ l: "ATS", v: 85 }, { l: "Impact", v: 60 }, { l: "Clarity", v: 78 }].map(s => (
                        <div key={s.l} className="text-center">
                          <p className="text-[10px] text-white/30">{s.l}</p>
                          <p className="text-xs font-bold text-white/70">{s.v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="space-y-3.5 px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
                      <Image src="/askia-logo.png" alt="Coach" width={24} height={24} />
                    </div>
                    <div className="max-w-[280px] rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-2.5">
                      <p className="text-[12.5px] leading-relaxed text-white/80">
                        Your experience section is strong — but 4 bullets still read as activities, not achievements. Let&apos;s fix the TPM role first.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end gap-3">
                    <div className="max-w-[220px] rounded-2xl rounded-tr-sm bg-[var(--brand)]/75 px-4 py-2.5">
                      <p className="text-[12.5px] leading-relaxed text-white">Show me the first rewrite.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
                      <Image src="/askia-logo.png" alt="Coach" width={24} height={24} />
                    </div>
                    <div className="max-w-[280px] rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-2.5">
                      <p className="text-[12.5px] leading-relaxed text-white/80">
                        <span className="text-white/45 line-through">Led cross-functional work</span>
                        {" → "}
                        <span className="text-emerald-400">Drove 3 product launches across 4 teams, reducing time-to-ship by 22%</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action items */}
                <div className="border-t border-white/[0.06] px-5 py-3.5">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">3 items saved to action plan</p>
                  <div className="space-y-1.5">
                    {["Rewrite 4 impact bullets with metrics","Refresh LinkedIn headline","Practice PM story (STAR format)"].map(item => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand)]" />
                        <span className="text-[11.5px] text-white/40">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -left-4 bottom-12 hidden rounded-xl border border-white/10 bg-[var(--dark-2)] px-4 py-3 shadow-xl backdrop-blur-md lg:block">
                <p className="text-[10px] uppercase tracking-wider text-white/30">Sessions completed</p>
                <p className="mt-0.5 text-xl font-extrabold text-white">2,400+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          LOGO MARQUEE — infinite scroll
      ════════════════════════════════════════════════ */}
      <section className="overflow-hidden border-b border-[var(--border)] bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Candidates aim at companies like
          </p>
        </div>
        {/* Marquee row */}
        <div className="relative flex gap-10 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
          {[0, 1].map(set => (
            <div key={set} className="flex flex-shrink-0 items-center gap-10 pr-10" style={{ animation: "marquee 28s linear infinite" }}>
              {marqueeLogos.map(name => (
                <Image key={`${set}-${name}`} src={`/logos/${name}.svg`} alt={name} width={100} height={26} className="h-5 w-auto opacity-45 grayscale transition-opacity hover:opacity-70" />
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURES — clean cards with accent bars
      ════════════════════════════════════════════════ */}
      <Section>
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-12 mb-12">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-3.5 py-1.5 text-xs font-semibold text-[var(--brand)]">
              Four coaching surfaces
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-[var(--ink)] md:text-5xl">
              Every stage of the job<br />search, built in.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-[var(--muted)]">
            Good coaching doesn&apos;t fit into a single chat. Askia Coach gives each job its own dedicated workspace so nothing bleeds together.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((f) => {
            const colors = accentMap[f.accent as keyof typeof accentMap];
            return (
              <div key={f.label} className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                {/* Top accent line */}
                <div className={`absolute left-0 right-0 top-0 h-[3px] ${colors.bar}`} />

                <div className="mt-2">
                  <div className={`mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}>
                    {f.icon}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{f.label}</p>
                  <p className="mt-2 text-[15px] font-bold leading-snug tracking-tight text-[var(--ink)]">{f.title}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{f.desc}</p>
                </div>

                <div className="mt-6 flex items-center gap-1.5">
                  <span className={`text-[11px] font-semibold ${colors.text}`}>{f.num}</span>
                  <span className="text-[11px] text-[var(--muted)]">·</span>
                  <span className="text-[11px] text-[var(--muted)]">{f.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════
          HOW IT WORKS — dark, numbered steps
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--dark)] py-20 text-white md:py-28">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[var(--cyan)] opacity-[0.06] blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[var(--purple)] opacity-[0.07] blur-[100px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white/55">
              How Askia Coach works
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              From first session<br />
              to job offer.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Start with a real problem",
                desc: "Tell the coach whether the issue is callbacks, positioning, interview nerves, or direction. The session adapts to what you actually need.",
                accent: "var(--brand)",
              },
              {
                num: "02",
                title: "Work in the right surface",
                desc: "Dedicated workspaces for resume review, LinkedIn editing, and interview prep — instead of forcing everything into one chat thread.",
                accent: "var(--cyan)",
              },
              {
                num: "03",
                title: "Leave with action items",
                desc: "Every session saves a recap, action plan, and updated coaching memory. Come back and pick up exactly where you left off.",
                accent: "var(--purple)",
              },
            ].map((step) => (
              <div key={step.num} className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7">
                <div className="absolute left-0 top-0 h-full w-[3px]" style={{ background: step.accent }} />
                <span className="text-5xl font-black leading-none text-white/[0.07]">{step.num}</span>
                <h3 className="mt-5 text-[17px] font-bold tracking-tight text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          OUTCOMES — what users keep
      ════════════════════════════════════════════════ */}
      <Section className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--teal-soft)] px-3.5 py-1.5 text-xs font-semibold text-[var(--brand)]">
            What you keep
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--ink)] md:text-5xl">
            Better materials, stronger stories,<br />
            <span className="text-[var(--brand)]">real continuity.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
            The product doesn&apos;t pretend one chat can fix everything. Each session builds on the last, and everything you produce is saved.
          </p>
        </div>

        <div className="space-y-3">
          {outcomes.map((item) => (
            <div key={item.text} className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow)] transition-all hover:border-[var(--brand)]/30 hover:shadow-[var(--shadow-md)]">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-[15px] leading-6 text-[var(--ink-2)]">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════
          CTA BANNER — gradient brand
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 text-white md:py-24" style={{ background: "linear-gradient(135deg, var(--brand) 0%, #0B5C6B 50%, #094F5D 100%)" }}>
        {/* Glow overlay */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[var(--cyan)] opacity-[0.12] blur-[100px]" />
          <div className="absolute bottom-0 left-[30%] h-[300px] w-[300px] rounded-full bg-white opacity-[0.04] blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <Image src="/askia-logo.png" alt="Askia" width={36} height={36} className="rounded-lg" />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Ready to accelerate your search?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/65">
            Free to start. No credit card. Just better coaching from the first conversation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {userId ? (
              <Link href="/dashboard" className="inline-flex h-12 items-center rounded-xl bg-white px-8 text-sm font-bold text-[var(--brand)] shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all hover:bg-white/90 hover:-translate-y-px">
                Open dashboard →
              </Link>
            ) : (
              <DemoStartButton href="/dashboard" className="inline-flex h-12 items-center rounded-xl bg-white px-8 text-sm font-bold text-[var(--brand)] shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all hover:bg-white/90 hover:-translate-y-px">
                Start coaching free →
              </DemoStartButton>
            )}
            <Link href="/pricing" className="inline-flex h-12 items-center rounded-xl border border-white/20 px-8 text-sm font-semibold text-white transition-all hover:bg-white/10">
              View pricing
            </Link>
          </div>
        </div>
      </section>

    </PageFrame>
  );
}
