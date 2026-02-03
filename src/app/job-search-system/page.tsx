import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { LandingAnalytics } from "@/components/landing-analytics";
import { StickyCTA } from "@/components/sticky-cta";
import { CountUp } from "@/components/count-up";
import { TickerMarquee } from "@/components/ticker-marquee";
import { LiveCounter } from "@/components/live-counter";

export const metadata: Metadata = {
  title: "Tech Career Coaching System | Land Senior Roles Faster | Steve Ngoumnai",
  description:
    "Free 10-min assessment + personalized job search plan for experienced engineers. Built by a DevOps leader who's placed 300+ into top tech companies.",
  alternates: {
    canonical: "https://askiacoaching.com",
  },
  openGraph: {
    title: "Tech Career Coaching System | Askia Coaching",
    description:
      "Get your free career readiness score. Built for senior engineers and managers. 300+ placements, 40% avg comp increase.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Career Coaching System | Askia Coaching",
    description:
      "Get your free career readiness score. Built for senior engineers and managers.",
    images: ["/og-image.png"],
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
  ["Datadog", "datadoghq.com"],
  ["Snowflake", "snowflake.com"],
  ["Airbnb", "airbnb.com"],
  ["Uber", "uber.com"],
  ["LinkedIn", "linkedin.com"],
];

const tickerItems = [
  "Devon just scored 82/100",
  "Platform Lead → Staff at Stripe • 45 days",
  "Maria unlocked her execution plan",
  "$165k → $240k offer accepted",
  "SRE Manager completed assessment",
  "John started his 30-day system",
];

export default function JobSearchLanding() {
  return (
    <main className="lp-bg">
      <LandingAnalytics />
      <StickyCTA />

      <div className="border-b border-slate-800/60 bg-slate-950/40 text-xs text-slate-300">
        <div className="cmd-shell flex items-center gap-6 overflow-hidden py-2">
          <span className="cmd-eyebrow text-slate-400">Live signals</span>
          <TickerMarquee items={tickerItems} />
        </div>
      </div>

      <section className="cmd-shell relative min-h-screen cmd-gap-hero" data-section="hero">
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
            <Link href="#problem">Problem</Link>
            <Link href="#system">System</Link>
            <Link href="#offer">Assessment</Link>
          </div>
          <Link
            href="/job-search-system/start"
            data-cta="nav"
            aria-label="Start free assessment"
            className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-100"
          >
            Start free
          </Link>
        </nav>

        <div className="relative z-10 mt-16 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <span className="cmd-kicker">AI career command center</span>
            <div className="space-y-6">
              <h1 className="cmd-title cmd-hero-title max-w-2xl text-[clamp(2.4rem,6vw,4rem)] font-semibold text-slate-100 md:text-[clamp(3.2rem,5vw,4.2rem)]">
                Senior engineers don’t need more skills. They need a career{" "}
                <span className="cmd-gradient-strong">operating system</span>.
              </h1>
              <p className="max-w-[36rem] text-lg text-slate-300">
                I work with experienced engineers and managers to break through plateaus, land stronger
                roles, and increase compensation 30–60% using a deliberate, repeatable system — not mass applications.
              </p>
              <p className="max-w-lg text-sm text-slate-400 cmd-glow-soft">
                300+ placements (2023–2025) • 10+ years leading DevOps &amp; platform teams
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/job-search-system/start"
                data-cta="hero"
                aria-label="Start free assessment"
                className="cmd-cta cmd-cta-animated cmd-cta-pulse cmd-cta-primary"
              >
                Start Free Assessment
              </Link>
              <Link
                href="#offer"
                data-cta="hero-secondary"
                aria-label="See the assessment"
                className="cmd-ghost cmd-cta-secondary"
              >
                See the assessment
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-slate-400">
              <span className="cmd-pill">8-question assessment</span>
              <span className="cmd-pill">10 minutes</span>
              <span className="cmd-pill">No credit card</span>
            </div>
          </div>

          <div data-preview-card className="cmd-panel cmd-glow cmd-preview rounded-3xl p-6 text-center sm:text-left">
            <p className="text-xs uppercase tracking-wide text-slate-400">Preview</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Career readiness score</p>
                <p className="mt-2 flex items-baseline gap-2 text-xl font-semibold text-slate-100 cmd-score-pulse cmd-score-text sm:text-2xl">
                  <CountUp
                    value={78}
                    duration={1200}
                    startOnMount
                    easing="bounce"
                  />
                  <span className="text-slate-400">/ 100</span>
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-wide text-slate-400">Week 1 focus</p>
                <ul className="mt-2 space-y-1">
                  <li>- Positioning reset for Staff-level roles</li>
                  <li>- 20-company target list</li>
                  <li>- 3 outreach scripts</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-wide text-slate-400">Primary blocker</p>
                <p className="mt-2">Strong skills, low response rate. Fix signal + targeting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="cmd-shell cmd-gap-problem cmd-vignette" data-section="problem">
        <Reveal>
          <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_auto_0.95fr]">
            <div className="cmd-panel cmd-bad rounded-3xl p-6">
              <p className="cmd-eyebrow">The broken playbook</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-100">
                Most job search advice optimizes for volume, not outcomes.
              </h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>❌ Spray 200 applications → 2% response rate</p>
                <p>❌ Generic LinkedIn tweaks → lost in noise</p>
                <p>❌ “Just keep trying” → burnout and desperation</p>
              </div>
            </div>
            <div className="mx-auto hidden lg:block">
              <div className="cmd-arrow">→</div>
            </div>
            <div className="cmd-panel cmd-good rounded-3xl p-6">
              <p className="cmd-eyebrow">The system</p>
              <div className="mt-3 space-y-3 text-sm text-slate-300">
                <p>✓ Targeted positioning (not shotgun applying)</p>
                <p>✓ Narrative control (not resume spam)</p>
                <p>✓ System design (not chaos)</p>
              </div>
              <div className="cmd-divider-animated mt-5" />
              <p className="mt-4 text-sm text-slate-300">
                This is how systems engineers think. It’s also how careers should work.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="system" className="cmd-shell cmd-gap-system" data-section="system">
        <Reveal>
          <div className="text-center">
            <p className="cmd-eyebrow">The system</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-100">Four Levers. One Repeatable System.</h2>
            <p className="mt-3 text-sm text-slate-300">
              Designed for senior ICs and managers who want leverage, not noise.
            </p>
          </div>
            <div className="cmd-system-wrap mt-10">
              <div className="cmd-system-grid flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:overflow-visible">
                {[
                  ["01", "Positioning", "3x higher response rates vs generic profiles"],
                  ["02", "Targeting", "Most land offers within first 15 companies"],
                  ["03", "Assets", "ATS + human optimized (87% pass rate)"],
                  ["04", "Execution", "14-day cycles, not 90-day chaos"],
                ].map(([number, title, stat], index) => (
                  <div
                    key={title}
                    className={`cmd-panel cmd-card-link cmd-system-card snap-start min-w-[82%] rounded-3xl p-6 sm:min-w-[60%] lg:min-w-0 ${
                      index % 2 === 0 ? "translate-y-0" : "translate-y-4"
                    }`}
                  >
                    <span className="cmd-number-badge">{number}</span>
                    <p className="mt-10 text-base font-semibold text-slate-100">{title}</p>
                    <p className="mt-3 text-sm text-slate-300">{stat}</p>
                  </div>
                ))}
              </div>
              <div className="cmd-carousel-dots lg:hidden">
                <span />
                <span />
                <span />
                <span />
              </div>
              <svg className="cmd-system-connector" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
                <path
                  className="cmd-system-path"
                  d="M80 60 L310 60 L310 60 L540 60 L540 60 L770 60"
                  fill="none"
                  stroke="rgba(99, 179, 237, 0.3)"
                  strokeWidth="2"
                />
              <polygon points="770,54 786,60 770,66" fill="rgba(99, 179, 237, 0.3)" />
            </svg>
          </div>
        </Reveal>
      </section>

      <section id="proof" className="cmd-shell cmd-gap-proof cmd-vignette" data-section="proof">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="cmd-panel rounded-3xl p-6">
            <p className="cmd-eyebrow cmd-logo-label">Clients placed at:</p>
            <div className="cmd-logo-carousel mt-4">
              <div className="cmd-logo-track">
                {logoCompanies.concat(logoCompanies).map(([name, domain], index) => (
                  <div key={`${name}-${index}`} className="cmd-logo-pill">
                      <img
                        src={
                          logoKey
                            ? `https://img.logo.dev/${domain}?token=${logoKey}`
                            : `https://logo.clearbit.com/${domain}`
                        }
                        alt={`${name} logo`}
                        className="h-5 w-5"
                        loading="lazy"
                      />
                      <span className="text-xs font-semibold text-slate-200">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="cmd-swipe-hint">Swipe to see more</p>
            <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-center">
                  <CountUp
                    value={300}
                    suffix="+"
                    revealSuffix
                    delay={0}
                    duration={1500}
                    className="text-2xl font-semibold text-slate-100"
                  />
                  <p className="text-xs uppercase tracking-wide text-slate-400">placements</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-center">
                  <CountUp value={40} suffix="%" delay={200} duration={1800} className="text-2xl font-semibold text-slate-100" />
                  <p className="text-xs uppercase tracking-wide text-slate-400">avg comp increase</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-center">
                  <CountUp value={87} suffix="%" delay={400} duration={2000} className="text-2xl font-semibold text-slate-100" />
                  <p className="text-xs uppercase tracking-wide text-slate-400">interview→offer conversion</p>
                </div>
              </div>
            </div>
            <div className="cmd-panel cmd-panel-strong rounded-3xl p-6">
              <p className="cmd-eyebrow">Mini case studies</p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                {["60 days", "45 days", "30 days"].map((timeline, idx) => (
                  <div key={timeline} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-2 font-semibold text-slate-100">
                        {idx === 0 && (
                          <img
                            src={
                              logoKey
                                ? `https://img.logo.dev/datadoghq.com?token=${logoKey}`
                                : "https://logo.clearbit.com/datadoghq.com"
                            }
                            alt="Datadog logo"
                            className="h-5 w-5"
                            loading="lazy"
                          />
                        )}
                        {idx === 1 && (
                          <img
                            src={
                              logoKey ? `https://img.logo.dev/stripe.com?token=${logoKey}` : "https://logo.clearbit.com/stripe.com"
                            }
                            alt="Stripe logo"
                            className="h-5 w-5"
                            loading="lazy"
                          />
                        )}
                        {idx === 2 && (
                          <img
                            src={
                              logoKey ? `https://img.logo.dev/meta.com?token=${logoKey}` : "https://logo.clearbit.com/meta.com"
                            }
                            alt="Meta logo"
                            className="h-5 w-5"
                            loading="lazy"
                          />
                        )}
                        {idx === 0
                          ? "Mid-level → Senior SRE"
                          : idx === 1
                          ? "Platform Lead → Staff Engineer"
                          : "Engineering Manager → Director"}
                      </p>
                      <span className="cmd-time-badge">
                        ⏱️ {timeline}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                      {idx === 0 && (
                        <>
                          <img
                            src={
                              logoKey ? `https://img.logo.dev/kohls.com?token=${logoKey}` : "https://logo.clearbit.com/kohls.com"
                            }
                            alt="Kohl's logo"
                            className="h-4 w-4"
                            loading="lazy"
                          />
                          <span>Kohl’s</span>
                          <span>→</span>
                          <img
                            src={
                              logoKey
                                ? `https://img.logo.dev/datadoghq.com?token=${logoKey}`
                                : "https://logo.clearbit.com/datadoghq.com"
                            }
                            alt="Datadog logo"
                            className="h-4 w-4"
                            loading="lazy"
                          />
                          <span>Datadog</span>
                          <span>•</span>
                          <span>$145k → $220k</span>
                          <span>•</span>
                          <span>60 days</span>
                        </>
                      )}
                      {idx === 1 && (
                        <>
                          <img
                            src={
                              logoKey ? `https://img.logo.dev/iseatz.com?token=${logoKey}` : "https://logo.clearbit.com/iseatz.com"
                            }
                            alt="iSeatz logo"
                            className="h-4 w-4"
                            loading="lazy"
                          />
                          <span>iSeatz</span>
                          <span>→</span>
                          <img
                            src={
                              logoKey ? `https://img.logo.dev/stripe.com?token=${logoKey}` : "https://logo.clearbit.com/stripe.com"
                            }
                            alt="Stripe logo"
                            className="h-4 w-4"
                            loading="lazy"
                          />
                          <span>Stripe</span>
                          <span>•</span>
                          <span>3 loops</span>
                          <span>•</span>
                          <span>45 days</span>
                        </>
                      )}
                      {idx === 2 && (
                        <>
                          <img
                            src={logoKey ? `https://img.logo.dev/meta.com?token=${logoKey}` : "https://logo.clearbit.com/meta.com"}
                            alt="Meta logo"
                            className="h-4 w-4"
                            loading="lazy"
                          />
                          <span>Meta</span>
                          <span>→</span>
                          <span>Director</span>
                          <span>•</span>
                          <span>Offer comp +45%</span>
                          <span>•</span>
                          <span>30 days</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="offer" className="cmd-shell cmd-gap-offer" data-section="offer">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="cmd-panel rounded-3xl p-6">
              <p className="cmd-eyebrow">Your 10-Minute Career System Audit</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-100">Answer 8 questions. Get clarity fast.</h2>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p>1. Career Readiness Score (0-100)</p>
                <p>2. Customized 30-day execution plan</p>
                <p>3. Role-specific templates (outreach, interview prep)</p>
                <p>4. Company targeting strategy</p>
              </div>
              <Link
                href="/job-search-system/start"
                data-cta="offer"
                aria-label="Start my assessment"
              className="cmd-cta cmd-cta-animated cmd-cta-pulse mt-6 inline-flex h-[70px] px-10 text-base font-semibold text-slate-950"
              >
                Start My Assessment
              </Link>
              <p className="mt-3 text-xs text-slate-400">No sales call. No payment. Clarity.</p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/60">
              <img
                src="/images/command-center-office.jpg"
                alt="Career readiness score dashboard preview"
                className="h-full w-full object-cover blur-[2px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-slate-200">
                Preview of your dashboard
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="about" className="cmd-shell cmd-gap-about cmd-vignette" data-section="about">
        <Reveal>
          <div className="cmd-panel rounded-3xl p-6">
            <p className="cmd-eyebrow">About Steve J. Ngoumnai</p>
            <div className="cmd-quote">
              Careers work like systems: clarity beats chaos, leverage beats volume, good inputs compound.
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="space-y-4">
                <div className="cmd-panel cmd-panel-strong rounded-3xl p-4 text-center">
                  <img
                    src="/images/steve.jpg"
                    alt="Steve J. Ngoumnai, tech career coach"
                    className="cmd-avatar mx-auto h-56 w-56 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-4 text-sm text-slate-300">
                <div className="cmd-panel rounded-3xl p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Operator background</p>
                  <p className="mt-2 text-slate-200">10+ years leading DevOps &amp; platform teams.</p>
                </div>
                <div className="cmd-panel rounded-3xl p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Systems mindset</p>
                  <p className="mt-2 text-slate-200">
                    Built and scaled real production systems. Makes hiring decisions in high-stakes environments.
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-sm text-slate-300">
                <div className="cmd-panel rounded-3xl p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Coaching results</p>
                  <p className="mt-2 text-slate-200">300+ professionals placed since 2023.</p>
                </div>
                <div className="cmd-panel rounded-3xl p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Current work</p>
                  <p className="mt-2 text-slate-200">Agentic AI consulting + workflow automation for startups.</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="cmd-shell cmd-gap-final" data-section="final-cta">
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
            <p className="cmd-eyebrow">Final invite</p>
            <h3 className="relative mt-3 text-3xl font-semibold text-slate-100">Your System Is Waiting. Start Now.</h3>
            <p className="relative mt-2 text-sm text-slate-300">
              No credit card. No catch. Clarity. Results delivered instantly.
            </p>
            <p className="relative mt-4 text-sm text-slate-400">
              <LiveCounter start={381} className="font-semibold text-slate-100" /> engineers already building their
              systems. Join them.
            </p>
            <Link
              href="/job-search-system/start"
              data-cta="footer"
              aria-label="Start free assessment"
              className="cmd-cta cmd-cta-animated cmd-cta-pulse relative mt-6 inline-flex h-[70px] px-10 text-base font-semibold text-slate-950"
            >
              Start Free Assessment
            </Link>
          </div>
        </Reveal>
      </section>

      <footer className="cmd-shell pb-10 text-xs text-slate-500">
        <div className="cmd-divider mb-4" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Askia Coaching. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4">
            <span>
              <a className="underline decoration-slate-600 underline-offset-4 hover:text-slate-300" href="#">
                Privacy Policy
              </a>
            </span>
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
        </div>
      </footer>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": "#steve-ngoumnai",
                name: "Steve J Ngoumnai",
                jobTitle: "Tech Career Coach",
                description:
                  "DevOps and platform leader helping experienced engineers build repeatable career systems.",
              },
              {
                "@type": "Service",
                name: "Tech Career Coaching System",
                description:
                  "Free 10-min assessment + personalized job search plan for experienced engineers by Steve J Ngoumnai.",
                provider: { "@id": "#steve-ngoumnai" },
                areaServed: "US",
                serviceType: "Career Coaching",
              },
            ],
          }),
        }}
      />
    </main>
  );
}
