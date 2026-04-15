import Link from "next/link";
import { LogoCloud, PageFrame, Section } from "@/components/mvp";
import { DemoStartButton } from "@/components/mvp-session-actions";
import { getCurrentUserId } from "@/lib/mvp/auth";

const features = [
  {
    label: "Resume Review",
    title: "Fix the resume before it costs you callbacks",
    desc: "Structured feedback on clarity, ATS readiness, impact bullets, and positioning gaps — with prioritized rewrites.",
    color: "brand",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    label: "LinkedIn Optimization",
    title: "Turn your profile into an inbound engine",
    desc: "Sharpen your headline, About section, and experience entries with keyword alignment and a visibility score.",
    color: "teal",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Mock Interviews",
    title: "Practice answers that actually land",
    desc: "Run behavioral, technical, or recruiter-style sessions with granular feedback on structure, evidence, and confidence.",
    color: "amber",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    label: "Career Direction",
    title: "Get clear on what fits you next",
    desc: "Analyze background, goals, and positioning gaps — and get concrete next steps, not generic motivational language.",
    color: "purple",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
      </svg>
    ),
  },
];

const steps = [
  {
    num: "01",
    title: "Start with a real problem",
    desc: "Tell the coach whether the issue is callbacks, positioning, interview nerves, or direction. No scripted questions — just an honest conversation.",
  },
  {
    num: "02",
    title: "Work in the right surface",
    desc: "Use dedicated workspaces for resume review, LinkedIn editing, and interview prep — not one generic chat thread for everything.",
  },
  {
    num: "03",
    title: "Leave with your next actions",
    desc: "Every session saves a recap, action plan, and updated coaching memory. Come back and continue without starting from zero.",
  },
];

const outcomes = [
  "Rewritten resume bullets with quantified impact",
  "LinkedIn sections tuned for your target role",
  "Mock interview feedback saved to your recap",
  "Action plan updated after every session",
  "Coaching memory that carries context forward",
];

export default async function HomePage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--dark)] text-white">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-48 -top-48 h-[700px] w-[700px] rounded-full bg-[var(--brand)] opacity-[0.10] blur-[140px]" />
          <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[var(--teal)] opacity-[0.07] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-white/65">AI-Powered Career Coaching</span>
              </div>

              <h1 className="mt-6 text-5xl font-extrabold leading-[1.07] tracking-[-0.03em] md:text-6xl lg:text-[3.75rem]">
                Land your next role{" "}
                <span className="text-[var(--brand)]">with an AI coach</span>{" "}
                that actually helps.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/55">
                Askia Coach reviews your resume, sharpens your LinkedIn, runs mock interviews, and
                maintains coaching memory between every session.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {userId ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-6 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(67,97,238,0.4)] transition-colors hover:bg-[var(--brand-hover)]"
                  >
                    Open dashboard →
                  </Link>
                ) : (
                  <DemoStartButton
                    href="/dashboard"
                    className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-6 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(67,97,238,0.4)] transition-colors hover:bg-[var(--brand-hover)]"
                  >
                    Start coaching free →
                  </DemoStartButton>
                )}
                <Link
                  href="/platform"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white/75 backdrop-blur-sm transition-colors hover:border-white/20 hover:text-white"
                >
                  See how it works
                </Link>
              </div>

              <p className="mt-5 text-xs text-white/30">
                Free to start · No credit card required
              </p>
            </div>

            {/* Right: Product mockup */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111830] shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                {/* Window bar */}
                <div className="flex items-center gap-2 border-b border-white/[0.07] bg-[#0D1428] px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="ml-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-white/35">Resume Review · Active Session</span>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="space-y-3 p-5">
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[9px] font-black text-white">
                      A
                    </div>
                    <div className="max-w-[270px] rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-3">
                      <p className="text-[12.5px] leading-relaxed text-white/80">
                        Your resume has solid structure — but 4 bullets lack quantified impact.
                        Let&apos;s rewrite the strongest section first.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start justify-end gap-2.5">
                    <div className="max-w-[230px] rounded-2xl rounded-tr-sm bg-[var(--brand)]/75 px-4 py-3">
                      <p className="text-[12.5px] leading-relaxed text-white">
                        Which role should we start with?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[9px] font-black text-white">
                      A
                    </div>
                    <div className="max-w-[270px] rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-3">
                      <p className="text-[12.5px] leading-relaxed text-white/80">
                        Start with your last 3 years — that&apos;s where the strongest interview
                        proof lives. I&apos;ll draft 3 rewrites now.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Session actions */}
                <div className="border-t border-white/[0.07] px-5 py-4">
                  <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                    Session action items
                  </p>
                  <div className="space-y-2">
                    {[
                      "Rewrite 4 impact bullets with metrics",
                      "Refresh summary headline",
                      "Practice PM interview story",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--teal)]" />
                        <span className="text-[11.5px] text-white/40">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating stat */}
              <div className="absolute -bottom-4 -left-5 rounded-xl border border-white/10 bg-[var(--dark-2)] px-4 py-3 shadow-xl">
                <p className="text-[10px] uppercase tracking-wider text-white/35">Sessions saved</p>
                <p className="mt-0.5 text-2xl font-extrabold text-white">2,400+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo strip ────────────────────────────────────────── */}
      <section className="border-b border-[var(--border)] bg-white py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Candidates aim at companies like
          </p>
          <LogoCloud />
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <Section>
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-3.5 py-1.5 text-xs font-semibold text-[var(--brand)]">
            Four coaching surfaces
          </div>
          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-5xl">
            Every stage of the job search, built in.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
            Good coaching doesn&apos;t fit into a single chat. Askia gives each use case its own
            dedicated workspace.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.label}
              className="group rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
            >
              <div
                className={`mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                  f.color === "brand"
                    ? "bg-[var(--brand-light)] text-[var(--brand)]"
                    : f.color === "teal"
                      ? "bg-[var(--teal-soft)] text-[var(--teal)]"
                      : f.color === "amber"
                        ? "bg-[var(--amber-soft)] text-[var(--amber)]"
                        : "bg-purple-50 text-purple-600"
                }`}
              >
                {f.icon}
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {f.label}
              </p>
              <p className="mt-2 text-[15px] font-bold leading-snug tracking-tight text-[var(--ink)]">
                {f.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── How it works ──────────────────────────────────────── */}
      <section className="bg-[var(--dark)] py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/55">
              How it works
            </div>
            <h2 className="text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">
              From first session
              <br />
              to saved recap.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-7"
              >
                <span className="text-5xl font-black leading-none text-white/[0.08]">
                  {step.num}
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outcomes ──────────────────────────────────────────── */}
      <Section className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--teal-soft)] px-3.5 py-1.5 text-xs font-semibold text-[var(--teal)]">
            What you keep
          </div>
          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-5xl">
            Better materials, stronger stories, real continuity.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
            The product does not pretend one generic chat can handle every stage of the job search.
            Each session builds on the last.
          </p>
        </div>

        <div className="space-y-3">
          {outcomes.map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow)]"
            >
              <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--teal-soft)]">
                <svg
                  className="h-3.5 w-3.5 text-[var(--teal)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <p className="text-[15px] leading-6 text-[var(--ink-2)]">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA banner ────────────────────────────────────────── */}
      <section className="bg-[var(--brand)] py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">
            Ready to accelerate your job search?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/65">
            Start with a free session. No credit card. No setup. Just better coaching from the first
            conversation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {userId ? (
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center rounded-xl bg-white px-8 text-sm font-bold text-[var(--brand)] shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-colors hover:bg-white/90"
              >
                Open dashboard →
              </Link>
            ) : (
              <DemoStartButton
                href="/dashboard"
                className="inline-flex h-12 items-center rounded-xl bg-white px-8 text-sm font-bold text-[var(--brand)] shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-colors hover:bg-white/90"
              >
                Start coaching free →
              </DemoStartButton>
            )}
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center rounded-xl border border-white/25 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
