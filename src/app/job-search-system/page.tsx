import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Askia Coaching Command Center | Build a 30-day job search plan in 10 minutes",
  description:
    "A private, premium job search command center for high-earning tech professionals. Build your 30-day job search plan in 10 minutes with AI-guided strategy, scripts, and proof assets.",
  openGraph: {
    title: "Askia Coaching Command Center",
    description:
      "Build a 30-day job search plan in 10 minutes. A private, premium command center for experienced tech professionals.",
    type: "website",
    images: ["/images/command-center-office.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Askia Coaching Command Center",
    description:
      "Build a 30-day job search plan in 10 minutes with a private, premium career command center.",
    images: ["/images/command-center-office.jpg"],
  },
};

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
      <section className="cmd-shell relative pb-16 pt-14">
        <div className="cmd-hero-orb cmd-hero-orb-left" />
        <div className="cmd-hero-orb cmd-hero-orb-right" />

        <nav className="relative z-10 flex items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
              Askia Coaching
            </span>
            <span className="text-xs text-slate-400">Command Center</span>
          </div>
          <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] text-slate-400 md:flex">
            <Link href="#proof">Proof</Link>
            <Link href="#personalized">Personalized</Link>
            <Link href="#capture">Get plan</Link>
          </div>
          <Link
            href="/job-search-system/start"
            className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-100"
          >
            Start free
          </Link>
        </nav>

        <div className="relative z-10 mt-12 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <span className="cmd-kicker">Private command center</span>
            <div className="space-y-4">
              <h1 className="cmd-title text-4xl font-semibold text-slate-100 md:text-6xl">
                Build your 30-day job search plan in 10 minutes — with a system that compounds.
              </h1>
              <p className="max-w-xl text-lg text-slate-300">
                Most talented tech professionals don’t struggle because they lack skills. They struggle because they
                don’t have a system. This command center combines AI-guided strategy with human coaching insight to
                turn your role, targets, and constraints into a precise plan with scripts, proof assets, and a weekly
                cadence.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/job-search-system/start"
                className="cmd-cta rounded-full px-6 py-3 text-sm font-semibold text-slate-950"
              >
                Start free assessment
              </Link>
              <Link
                href="#proof"
                className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200"
              >
                See how it works
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="cmd-pill">No account required for preview</span>
              <span className="cmd-pill">Private by design</span>
              <span className="cmd-pill">Built for 30–90 day searches</span>
            </div>
          </div>

          <div className="cmd-panel cmd-glow rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-slate-400">Command Center Preview</p>
              <span className="cmd-pill text-xs">Confidential</span>
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
            </div>
            <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Command log</p>
              <div className="mt-2 space-y-2">
                <p className="cmd-terminal-line">
                  <span className="cmd-terminal-key">&gt;</span> calibrate(role="Staff Platform Engineer", timeline="30 days", hours=5)
                </p>
                <p className="cmd-terminal-line">
                  <span className="cmd-terminal-key">&gt;</span> output: weekly plan + scripts + proof assets
                </p>
                <p className="cmd-terminal-line">
                  <span className="cmd-terminal-accent">status:</span> ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmd-shell pb-8">
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
                      alt={`${name} logo`}
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

      <section id="proof" className="cmd-shell py-12">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="cmd-panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Proof of leverage</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-100">
                300+ professionals coached into stronger roles by focusing on what actually moves the needle.
              </h2>
              <p className="mt-3 text-sm text-slate-300">
                Positioning. Narrative. Targeting. Interview execution. Decision-making under pressure. Not generic
                advice—deliberate, repeatable systems.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["2x reply rates", "From precision targeting + proof assets."],
                  ["3 on-site loops", "Typical within the first 4–6 weeks."],
                  ["Clarity in 10 min", "Plan delivered immediately after assessment."],
                  ["Private by design", "No public profiles or noise."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                    <p className="text-sm font-semibold text-slate-100">{title}</p>
                    <p className="mt-2 text-xs text-slate-300">{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="cmd-panel cmd-panel-strong rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Mini case studies</p>
              <div className="mt-4 space-y-4 text-sm text-slate-300">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="font-semibold text-slate-100">Senior Platform Engineer · 30 days</p>
                  <p className="mt-2">Reframed narrative, built proof asset, landed 3 loops in 4 weeks.</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="font-semibold text-slate-100">Engineering Manager · 60 days</p>
                  <p className="mt-2">Targeted outreach and leadership framing lifted interview conversion.</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="font-semibold text-slate-100">SRE Lead · 45 days</p>
                  <p className="mt-2">Negotiated from strength, secured a comp increase + scope upgrade.</p>
                </div>
              </div>
              <div className="mt-6 cmd-divider" />
              <p className="mt-4 text-xs uppercase tracking-wide text-slate-400">Who this is for</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-xs text-slate-300">
                  Experienced engineers, managers, and operators with real production impact.
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-xs text-slate-300">
                  Professionals ready to invest time in a deliberate, repeatable system.
                </div>
              </div>
              <p className="mt-4 text-xs uppercase tracking-wide text-slate-400">Not for</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-xs text-slate-300">
                  Anyone chasing mass applications or shortcuts without strategy.
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-xs text-slate-300">
                  Early-career candidates without foundational experience.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="personalized" className="cmd-shell py-12">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="cmd-panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Personalized value</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-100">Your plan is calibrated to your reality.</h3>
              <p className="mt-2 text-sm text-slate-300">
                We map your role, level, compensation targets, and time constraints into a cadence you can actually run.
                The output is precise, not generic.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["Role clarity", "Define scope + next-step targets."],
                  ["Signal design", "Craft proof assets that trigger interviews."],
                  ["Targeting", "Build a company list and outreach plan."],
                  ["Execution", "Weekly cadence tied to hours available."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                    <p className="text-sm font-semibold text-slate-100">{title}</p>
                    <p className="mt-2 text-xs text-slate-300">{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="cmd-panel cmd-panel-strong rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">About Steve J. Ngoumnai</p>
              <p className="mt-3 text-sm text-slate-300">
                10+ years leading DevOps, platform, and engineering teams in production. 300+ professionals coached into
                stronger roles by focusing on leverage, signal, and decisive execution.
              </p>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• Career Coach · Askia Coaching (2023–present)</p>
                <p>• Agentic AI Solutions Consultant · Machines &amp; Cloud (2022–present)</p>
                <p>• Sr. DevOps Manager · Foundation Finance Company</p>
                <p>• DevOps Manager · iSeatz</p>
                <p>• Lead Platform Engineer · Kohl’s</p>
              </div>
              <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-xs text-slate-300">
                Systems thinking for careers: clarity beats chaos, leverage beats volume, good inputs compound.
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="cmd-shell py-12">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="cmd-panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Designed environment</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-100">
                A calm, premium studio for focused decisions.
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                The experience feels like a private command room: quiet, deliberate, and built to keep your attention
                on what matters—clarity, leverage, and action.
              </p>
              <div className="mt-5 space-y-2 text-sm text-slate-300">
                <p>- High-contrast surfaces with subtle glow.</p>
                <p>- Glass panels that reveal only the essentials.</p>
                <p>- A clean narrative flow that reduces decision fatigue.</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/60">
              <img
                src="/images/command-center-office.jpg"
                alt="Modern studio workspace with refined lighting and minimal design"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-slate-200">
                Precision-focused space
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="capture" className="cmd-shell py-12">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="cmd-panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Frictionless capture</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-100">10 minutes to clarity. 30 days to momentum.</h3>
              <p className="mt-2 text-sm text-slate-300">
                Complete a focused assessment, get a preview instantly, then create an account to unlock the full
                command center with scripts, proof assets, and your weekly cadence.
              </p>
              <div className="mt-5 space-y-2 text-sm text-slate-300">
                <p>- Answer 10–12 targeted prompts.</p>
                <p>- See your score + first-week cadence immediately.</p>
                <p>- Create your account to unlock the full plan + templates.</p>
              </div>
            </div>
            <div className="cmd-terminal p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">How it works</p>
              <div className="mt-4 space-y-3">
                <p className="cmd-terminal-line">
                  <span className="cmd-terminal-key">$</span> assess --role "SRE" --timeline 60d
                </p>
                <p className="cmd-terminal-line">
                  <span className="cmd-terminal-key">$</span> score --clarity 18 --assets 20
                </p>
                <p className="cmd-terminal-line">
                  <span className="cmd-terminal-key">$</span> unlock --account
                </p>
                <p className="cmd-terminal-line">
                  <span className="cmd-terminal-accent">✓</span> full plan · scripts · proof assets
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="cmd-shell pb-16">
        <Reveal>
          <div className="cmd-panel cmd-panel-strong relative overflow-hidden rounded-3xl p-8 text-center">
            <img
              src="/images/command-texture.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-30"
              loading="lazy"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950/90" />
            <p className="text-xs uppercase tracking-wide text-slate-400">Decisive next step</p>
            <h3 className="relative mt-3 text-3xl font-semibold text-slate-100">
              Step into a command center designed for serious career outcomes.
            </h3>
            <p className="relative mt-2 text-sm text-slate-300">
              A confident invitation, not a sales push. Get your plan and move with clarity.
            </p>
            <Link
              href="/job-search-system/start"
              className="cmd-cta relative mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Start the assessment
            </Link>
          </div>
        </Reveal>
      </section>

      <footer className="cmd-shell pb-10 text-xs text-slate-500">
        <div className="cmd-divider mb-4" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Askia Coaching. All rights reserved.</span>
          <span>
            Imagery by{" "}
            <a
              className="underline decoration-slate-600 underline-offset-4 hover:text-slate-300"
              href="https://unsplash.com"
              target="_blank"
              rel="noreferrer"
            >
              Unsplash contributors
            </a>
            .
          </span>
        </div>
      </footer>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Askia Coaching Command Center",
            description:
              "Private, premium job search command center that builds a 30-day plan in 10 minutes for experienced tech professionals.",
            provider: {
              "@type": "Person",
              name: "Steve J Ngoumnai",
              jobTitle: "Tech Career Coach",
            },
            areaServed: "US",
            serviceType: "Career Coaching",
          }),
        }}
      />
    </main>
  );
}
