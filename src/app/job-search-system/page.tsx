import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Tech Career Coaching System | Land Senior Roles Faster | Steve Ngoumnai",
  description:
    "Free 10-min assessment + personalized job search plan for experienced engineers. Built by a DevOps leader who's placed 300+ into top tech companies.",
  openGraph: {
    title: "Tech Career Coaching System | Steve Ngoumnai",
    description:
      "Free 10-min assessment + personalized job search plan for experienced engineers. Build your 30-day system now.",
    type: "website",
    images: ["/images/command-center-office.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Career Coaching System | Steve Ngoumnai",
    description:
      "Free 10-min assessment + personalized job search plan for experienced engineers.",
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
];

export default function JobSearchLanding() {
  return (
    <main className="lp-bg">
      <section className="cmd-shell relative min-h-screen pb-20 pt-16">
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
            className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-100"
          >
            Start free
          </Link>
        </nav>

        <div className="relative z-10 mt-16 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <span className="cmd-kicker">AI career command center</span>
            <div className="space-y-4">
              <h1 className="cmd-title text-4xl font-semibold text-slate-100 md:text-6xl">
                Senior engineers don’t need more skills. They need a career <span className="cmd-gradient-text">operating system</span>.
              </h1>
              <p className="max-w-xl text-lg text-slate-300">
                I help experienced engineers, managers, and operators break through plateaus, land stronger roles, and
                increase compensation 30–60% using a deliberate, repeatable system — not mass applications.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/job-search-system/start"
                className="cmd-cta rounded-full px-6 py-3 text-sm font-semibold text-slate-950"
              >
                Start Free Assessment
              </Link>
              <Link
                href="#offer"
                className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200"
              >
                See the assessment
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="cmd-pill">8-question assessment</span>
              <span className="cmd-pill">10 minutes</span>
              <span className="cmd-pill">No credit card</span>
            </div>
            <div className="text-sm text-slate-400">
              300+ placements · 10+ years leading DevOps &amp; platform teams
            </div>
          </div>

          <div className="cmd-panel cmd-glow rounded-3xl p-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">Preview</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Career readiness score</p>
                <p className="mt-2 text-2xl font-semibold text-slate-100">78 / 100</p>
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

      <section id="problem" className="cmd-shell cmd-section-tight">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="cmd-panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">The broken playbook</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-100">
                Most job search advice is optimized for volume, not outcomes.
              </h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>❌ Spray 200 applications → 2% response rate</p>
                <p>❌ Generic LinkedIn tweaks → lost in noise</p>
                <p>❌ “Just keep trying” → burnout and desperation</p>
                <div className="cmd-divider my-4" />
                <p className="text-slate-200">What works instead:</p>
                <p>✓ Targeted positioning (not shotgun applying)</p>
                <p>✓ Narrative control (not resume spam)</p>
                <p>✓ System design (not chaos)</p>
              </div>
            </div>
            <div className="cmd-panel cmd-panel-strong rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Systems thinking</p>
              <p className="mt-4 text-sm text-slate-300">
                Careers work like systems: clarity beats chaos, leverage beats volume, and good inputs compound. This is
                how experienced operators win markets and hiring loops.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Signal", "Your story is tuned to the level you want."],
                  ["Leverage", "Warm intros + proof assets beat volume."],
                  ["Cadence", "Weekly execution avoids drop-off."],
                  ["Decision", "Offer strategy before offer time."],
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

      <section id="system" className="cmd-shell cmd-section">
        <Reveal>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">The system</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-100">Four levers. One repeatable system.</h2>
            <p className="mt-3 text-sm text-slate-300">
              This is the same framework I used to coach 300+ professionals into senior, staff, and leadership roles.
            </p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {[
              ["Positioning", "Define your narrative by level and scope."],
              ["Targeting", "5–30 dream companies, not 500 postings."],
              ["Assets", "Resume, LinkedIn, proof of work tuned to ATS + humans."],
              ["Execution", "Weekly cadence, outreach scripts, negotiation playbooks."],
            ].map(([title, body]) => (
              <div key={title} className="cmd-panel rounded-3xl p-6">
                <p className="text-sm font-semibold text-slate-100">{title}</p>
                <p className="mt-3 text-xs text-slate-300">{body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="proof" className="cmd-shell cmd-section-tight">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="cmd-panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Results that matter</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  ["300+", "placements"],
                  ["40%", "avg comp increase"],
                  ["87%", "interview-to-offer"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-center">
                    <p className="text-2xl font-semibold text-slate-100">{value}</p>
                    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {logoCompanies.map(([name, domain]) => (
                  <div key={name} className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-3 py-2">
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
            <div className="cmd-panel cmd-panel-strong rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Mini case studies</p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="font-semibold text-slate-100">Mid-level → Senior SRE at Datadog</p>
                  <p className="mt-2">$145k → $220k + equity in 60 days.</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="font-semibold text-slate-100">Platform Lead → Staff at Stripe</p>
                  <p className="mt-2">3 loops in 4 weeks after narrative reset.</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="font-semibold text-slate-100">Engineering Manager → Director</p>
                  <p className="mt-2">Increased comp 45% with offer strategy.</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="offer" className="cmd-shell cmd-section">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="cmd-panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Your 10-minute career system audit</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-100">Answer 8 questions. Get clarity fast.</h2>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p>✓ Career readiness score (0–100)</p>
                <p>✓ Customized 30-day execution plan</p>
                <p>✓ Role-specific templates (outreach + interview prep)</p>
                <p>✓ Company targeting strategy</p>
              </div>
              <Link
                href="/job-search-system/start"
                className="cmd-cta mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-slate-950"
              >
                Start Free Assessment
              </Link>
              <p className="mt-3 text-xs text-slate-400">No sales call. No payment. Just clarity.</p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/60">
              <img
                src="/images/command-center-office.jpg"
                alt="Career readiness score dashboard preview"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-slate-200">
                Preview of your dashboard
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="about" className="cmd-shell cmd-section-tight">
        <Reveal>
          <div className="cmd-panel rounded-3xl p-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">About Steve J. Ngoumnai</p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="text-sm text-slate-300">
                <p>
                  10 years leading DevOps, platform, and engineering teams. Made hiring decisions. Built real systems in
                  production. Since 2023, I’ve coached 300+ professionals into senior, staff, and leadership roles.
                </p>
                <div className="mt-4 space-y-2">
                  <p>• Career Coach · Askia Coaching</p>
                  <p>• Agentic AI Solutions Consultant · Machines &amp; Cloud</p>
                  <p>• Sr. DevOps Manager · Foundation Finance</p>
                  <p>• DevOps Manager · iSeatz</p>
                  <p>• Lead Platform Engineer · Kohl’s</p>
                </div>
              </div>
              <div className="cmd-panel cmd-panel-strong rounded-3xl p-6 text-sm text-slate-300">
                <p className="font-semibold text-slate-100">Systems thinking for careers:</p>
                <p className="mt-2">→ clarity beats chaos</p>
                <p>→ leverage beats volume</p>
                <p>→ good inputs compound</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="cmd-shell pb-20">
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
            <p className="text-xs uppercase tracking-wide text-slate-400">Ready to build your system?</p>
            <h3 className="relative mt-3 text-3xl font-semibold text-slate-100">
              Start the assessment now. See your plan in 10 minutes.
            </h3>
            <p className="relative mt-2 text-sm text-slate-300">
              No credit card. No catch. Just results.
            </p>
            <Link
              href="/job-search-system/start"
              className="cmd-cta relative mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Start Free Assessment
            </Link>
            <p className="relative mt-4 text-xs text-slate-400">Join 300+ professionals who already leveled up.</p>
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
            name: "Tech Career Coaching System",
            description:
              "Free 10-min assessment + personalized job search plan for experienced engineers by Steve J Ngoumnai.",
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
