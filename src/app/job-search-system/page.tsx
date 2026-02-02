import Link from "next/link";
import { Reveal } from "@/components/reveal";

const logoKey = process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY;

const logoCompanies = [
  ["Google", "google.com"],
  ["Amazon", "amazon.com"],
  ["Microsoft", "microsoft.com"],
  ["Meta", "meta.com"],
  ["Apple", "apple.com"],
  ["Netflix", "netflix.com"],
  ["Stripe", "stripe.com"],
  ["Shopify", "shopify.com"],
  ["Salesforce", "salesforce.com"],
  ["Datadog", "datadoghq.com"],
  ["Cloudflare", "cloudflare.com"],
  ["Snowflake", "snowflake.com"],
];

export default function JobSearchLanding() {
  return (
    <main className="lp-bg">
      <section className="section-shell pb-16 pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <span className="lp-kicker lp-fade-in">Private Command Center</span>
            <div className="space-y-4">
              <h1 className="lp-title lp-fade-in-delay text-4xl font-semibold text-slate-100 md:text-5xl">
                A discreet, high-performance job search system built for serious operators.
              </h1>
              <p className="lp-fade-in-delay-2 max-w-xl text-lg text-slate-300">
                We translate your role, compensation targets, and time constraints into a precision plan with
                coach-grade scripts, proof assets, and a weekly execution cadence. Clear, controlled, and built to win.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/job-search-system/start"
                className="lp-cta rounded-full px-6 py-3 text-sm font-semibold text-slate-950"
              >
                Start the 10-minute assessment
              </Link>
              <Link
                href="#proof"
                className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200"
              >
                See the system
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="rounded-full border border-slate-700 px-3 py-1">No account required</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">Built for high-earning tech talent</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">Private by design</span>
            </div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-slate-400">
              <span>Scroll for clarity</span>
              <span className="lp-arrow">↓</span>
            </div>
          </div>
          <div className="lp-hero-panel lp-glass lp-glow rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-slate-400">Command Center Preview</p>
              <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                Confidential
              </span>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Executive summary</p>
                <p className="mt-2 text-sm text-slate-200">
                  Your fastest path is warm intros + proof assets before scaling applications. Priority: impact
                  narrative and targeted outreach.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Week 1 focus</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-200">
                    <li>- Positioning reset</li>
                    <li>- 20-company target list</li>
                    <li>- 3 outreach scripts</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Proof assets</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-200">
                    <li>- Impact bullets</li>
                    <li>- LinkedIn refresh</li>
                    <li>- 1-page case study</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Signals dashboard</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Readiness", "82"],
                    ["Cadence", "5h/wk"],
                    ["Target fit", "Strong"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2">
                      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
                      <p className="text-sm font-semibold text-slate-100">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-10">
        <Reveal>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 px-6 py-5">
            <p className="mb-3 text-xs uppercase tracking-wide text-slate-400">Trusted outcomes</p>
            <div className="flex flex-wrap items-center gap-3">
              {logoCompanies.map(([name, domain]) => (
                <div
                  key={name}
                  className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-3 py-2"
                >
                  {logoKey ? (
                    <img
                      src={`https://img.logo.dev/${domain}?token=${logoKey}`}
                      alt=""
                      className="h-5 w-5"
                      loading="lazy"
                    />
                  ) : (
                    <span className="h-5 w-5 rounded-full bg-slate-700" />
                  )}
                  <span className="text-xs font-semibold text-slate-200">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="proof" className="section-shell py-12">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="lp-surface rounded-3xl p-6">
              <p className="lp-eyebrow text-xs text-slate-400">Why it works</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-100">
                Precision focus beats volume. Every step is designed to protect your time and signal.
              </h2>
              <div className="mt-5 space-y-4 text-sm text-slate-300">
                <p>
                  We remove distractions, enforce a weekly cadence, and deliver the assets hiring teams actually respond
                  to. The system stays tight, private, and aligned to your level.
                </p>
                <div className="lp-divider" />
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Message match", "Your headline and outreach mirror the exact roles you target."],
                    ["Above-the-fold clarity", "Action, proof, and next steps show immediately."],
                    ["Directional cues", "Guided scan paths keep attention on your CTA."],
                    ["Proof in action", "Real assets, scripts, and plan previews before you commit."],
                  ].map(([title, body]) => (
                    <div key={title} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                      <p className="text-sm font-semibold text-slate-100">{title}</p>
                      <p className="mt-2 text-xs text-slate-300">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lp-glass lp-shimmer rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Proof panel</p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Results that matter</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {[
                      ["3", "on-site loops"],
                      ["2x", "reply rate"],
                      ["4 weeks", "to clarity"],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2">
                        <p className="text-lg font-semibold text-slate-100">{value}</p>
                        <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-200">
                  “I finally had a system that matched my schedule and made recruiters respond.”
                  <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                    Senior platform engineer · 30-day timeline
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Discretion first</p>
                  <p className="mt-2 text-sm text-slate-200">
                    No public profiles, no noise. You control what you share and when.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="lp-glass rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">The environment</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-100">A focused studio for high-stakes decisions.</h3>
              <p className="mt-2 text-sm text-slate-300">
                The command center experience is intentionally quiet—like stepping into a private, precision-built
                studio where every element supports clarity, confidence, and action.
              </p>
              <div className="mt-5 space-y-2 text-sm text-slate-300">
                <p>- High-contrast surfaces with restrained glow.</p>
                <p>- Glass panels that reveal only what matters.</p>
                <p>- A calm cadence that keeps decisions crisp.</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/60">
              <img
                src="/images/command-center-lobby.jpg"
                alt="Modern studio interior with calm lighting and refined materials"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-slate-200">
                Designed for high-signal focus
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Personalized value</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-100">Built around your constraints.</h3>
              <p className="mt-2 text-sm text-slate-300">
                The assessment captures your role, timeline, and availability. Your plan adapts to your actual week,
                not a generic template.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["Role focus", "Align scope, level, and comp guardrails."],
                  ["Time budget", "Cadence that fits 3-8 hours per week."],
                  ["Constraint-aware", "Visa, location, confidentiality, and timing."],
                  ["Signal design", "Assets that prove impact quickly."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                    <p className="text-sm font-semibold text-slate-100">{title}</p>
                    <p className="mt-2 text-xs text-slate-300">{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lp-glass rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Plan anatomy</p>
              <div className="mt-4 space-y-3">
                {[
                  ["Coach read", "A short, direct assessment of your current signal."],
                  ["Weekly cadence", "Exact actions mapped to your timeline."],
                  ["Script pack", "Warm intros, recruiter follow-ups, referrals."],
                  ["Proof assets", "Resume bullets, LinkedIn upgrade, case study prompts."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                    <p className="text-sm font-semibold text-slate-100">{title}</p>
                    <p className="mt-2 text-xs text-slate-300">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12">
        <Reveal>
          <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Frictionless capture</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-100">10 minutes. No fluff. Immediate clarity.</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Your assessment is focused, private, and built to surface your fastest path. You see the preview
                  instantly, then unlock the full system.
                </p>
                <div className="mt-5 space-y-2 text-sm text-slate-300">
                  <p>- Answer 12 targeted prompts.</p>
                  <p>- Receive your coach read and week-one plan.</p>
                  <p>- Unlock scripts, assets, and a full roadmap.</p>
                </div>
              </div>
              <div className="lp-glass rounded-3xl p-6">
                <p className="text-xs uppercase tracking-wide text-slate-400">Discreet by design</p>
                <div className="mt-4 space-y-4 text-sm text-slate-300">
                  <div>
                    <p className="font-semibold text-slate-100">Privacy-first</p>
                    <p className="mt-1">We never sell data. You control what you share.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">Fast delivery</p>
                    <p className="mt-1">Preview instantly. Full plan by secure link.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">Minimal lift</p>
                    <p className="mt-1">Short prompts, no long forms.</p>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-xs text-slate-300">
                  Average completion time: 9 minutes
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-16">
        <Reveal>
          <div className="lp-surface lp-shimmer relative overflow-hidden rounded-3xl p-8 text-center">
            <img
              src="/images/abstract-ribbed-texture.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-30"
              loading="lazy"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950/90" />
            <p className="text-xs uppercase tracking-wide text-slate-400">Decisive next step</p>
            <h3 className="relative mt-3 text-3xl font-semibold text-slate-100">
              Step into the command center and run a job search built for results.
            </h3>
            <p className="relative mt-2 text-sm text-slate-300">
              A confident invitation, not a sales push. Get your plan and move with clarity.
            </p>
            <Link
              href="/job-search-system/start"
              className="lp-cta relative mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Begin the assessment
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
