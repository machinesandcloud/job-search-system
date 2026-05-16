import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { Reveal } from "@/components/reveal";
import { StarField, CursorGlow } from "@/components/mvp-hero-extras";

export const metadata: Metadata = {
  title: "Who It's For — AI Career Coaching for Every Job Search Situation",
  description:
    "Returning after a gap, pivoting industries, breaking through ATS silence, or leveling up to the next role — Zari's AI career coach is built for your specific situation.",
  alternates: { canonical: "/use-cases" },
  openGraph: {
    title: "Zari Use Cases — Career Coaching for Every Situation",
    description: "Career changers, job seekers, returners, and level-up candidates all use Zari. See how AI coaching adapts to your specific challenge.",
    url: "/use-cases",
  },
};

const USE_CASES = [
  {
    id: "returning",
    tag: "01",
    audience: "The returner",
    accent: "#0D7182",
    accentLight: "rgba(13,113,130,0.12)",
    headline: "Back in the market after years away.",
    context: "Your resume has gaps. Your LinkedIn is stale. You're not sure what your skills are worth now or how to position them. And every job listing feels like it's written for someone else.",
    friction: ["Resume format is 5 years out of date", "LinkedIn hasn't been touched since last role", "Unsure how to frame the gap or the growth"],
    how: "Zari starts with a full resume audit — not to judge the gap, but to reposition what's there. It identifies every transferable signal, rewrites the narrative for current market patterns, and rebuilds LinkedIn to surface in the searches that match where you're going, not where you've been.",
    outcome: "Resume repositioned for current market · LinkedIn rebuilt · Clarity on target role and tier · 30-day reentry plan",
    quote: { text: "I'd been out of work for 14 months after my maternity leave. Zari didn't just fix my resume — it helped me understand how to talk about my experience in a way that landed me 3 interviews in the first week.", name: "Rachel M.", role: "Senior PM, fintech" },
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
  {
    id: "pivoting",
    tag: "02",
    audience: "The pivoter",
    accent: "#4ca7e6",
    accentLight: "rgba(76,167,230,0.10)",
    headline: "Changing industries. Your story doesn't translate yet.",
    context: "You have solid experience — but in the wrong domain. You're applying to roles where you have 70% of the skills, and you keep getting filtered out before anyone reads your actual background.",
    friction: ["Resume framed for old industry, not target one", "Lack 'required' keywords from job descriptions", "Interviewers see the switch as a risk, not an asset"],
    how: "The coach analyzes the gap between your background and your target role — precisely. It rewrites your resume to lead with transferable evidence, identifies the 3–4 keywords you're missing, and builds an interview narrative that positions the switch as intentional and strategic rather than desperate.",
    outcome: "Resume reframed for target industry · Gap analysis and closing plan · Interview story built for skeptical interviewers",
    quote: { text: "I was moving from consulting to product. Every application felt like I was speaking a different language. One session with Zari and my resume suddenly made sense for PM roles. First FAANG interview within 10 days.", name: "Daniel W.", role: "Product Manager" },
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    id: "stuck",
    tag: "03",
    audience: "The ghost",
    accent: "#7a8dff",
    accentLight: "rgba(122,141,255,0.10)",
    headline: "Applying consistently. Getting silence.",
    context: "You've sent 40+ applications. You're getting through to screens occasionally, but most of the time — nothing. No rejection, no feedback. Just silence. The problem isn't your background. It's the signal you're sending before anyone talks to you.",
    friction: ["Applications disappear into ATS systems", "LinkedIn profile not surfacing in recruiter searches", "No way to identify what's being filtered and why"],
    how: "Zari runs a full signal audit — resume ATS score, LinkedIn visibility rank, and keyword gap analysis against 10 live job descriptions in your target category. It identifies exactly what's being filtered and why, then rebuilds each surface to pass the filters that were blocking you.",
    outcome: "ATS score from 52 → 89 · LinkedIn visibility rebuilt · Keyword gaps closed · More human eyes on your application",
    quote: { text: "I was applying every day and hearing nothing. Zari showed me my resume was scoring 48 on ATS — most of my applications never reached a human. After one session, the silence stopped.", name: "James T.", role: "Software Engineer" },
    icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  },
  {
    id: "senior",
    tag: "04",
    audience: "The level-up",
    accent: "#F97316",
    accentLight: "rgba(249,115,22,0.10)",
    headline: "Ready for the next level. Materials don't reflect it.",
    context: "You're performing at the next level but your resume, LinkedIn, and interview answers are still calibrated for where you've been. You need to signal readiness for a role you haven't held yet.",
    friction: ["Resume reads as individual contributor, not leader", "Interview answers lack scope and strategic narrative", "LinkedIn positioned for current level, not target level"],
    how: "The coach re-calibrates everything for the tier you're targeting. Resume bullets rewritten to show scope, scale, and business impact at the next level. LinkedIn headline and About rebuilt for senior/staff positioning. Interview coaching focused on executive presence, systems thinking, and cross-functional influence — the signals that separate L5 from L6.",
    outcome: "Materials calibrated for target level · Interview story built for leadership signals · Clear narrative for the promotion or external move",
    quote: { text: "I was performing at Staff but interviewing like a Senior. Zari completely changed how I talked about my work — from tactical execution to systems and scale. I got the Staff offer in 6 weeks.", name: "Priya K.", role: "Staff Engineer" },
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];

export default async function UseCasesPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>

      {/* ══════ HERO ══════ */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <StarField count={80} />
        <CursorGlow color="rgba(114,214,255,0.08)" size={600} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"600px", height:"600px", top:"-10%", left:"-8%", background:"var(--brand)", opacity:.08, filter:"blur(130px)", borderRadius:"50%", animation:"float-a 20s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"480px", height:"480px", top:"-6%", right:"-6%", background:"var(--purple)", opacity:.07, filter:"blur(120px)", borderRadius:"50%", animation:"float-b 24s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Who it&apos;s for
          </div>
          <h1 className="text-[3.2rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            Every job search<br />
            <span className="gradient-text-animated">looks different.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/48">
            Returning after a break, pivoting to a new industry, breaking through silence, or leveling up —
            Zari Coach is built for the specific problem you&apos;re actually facing.
          </p>
        </div>
      </section>

      {/* ══════ USE CASES ══════ */}
      {USE_CASES.map((uc, uci) => (
        <section
          key={uc.id}
          className={`overflow-hidden py-20 md:py-28 ${uci % 2 === 0 ? "bg-[var(--bg)]" : "bg-white"}`}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className={`grid items-start gap-14 lg:grid-cols-2 ${uci % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>

              {/* Left: narrative */}
              <Reveal className={uci % 2 === 1 ? "[direction:ltr]" : ""}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ background: uc.accentLight, color: uc.accent, border: `1px solid ${uc.accent}28` }}>
                  {uc.tag} — {uc.audience}
                </div>
                <h2 className="mb-5 text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--ink)] md:text-[2.8rem]">
                  {uc.headline}
                </h2>
                <p className="mb-7 text-[15.5px] leading-relaxed text-[var(--muted)]">{uc.context}</p>

                {/* Friction list */}
                <div className="mb-7 space-y-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">What you&apos;re up against</p>
                  {uc.friction.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--danger)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M6 18L18 6M6 6l12 12" /></svg>
                      <span className="text-[14px] text-[var(--ink-2)]">{f}</span>
                    </div>
                  ))}
                </div>

                {/* How Zari helps */}
                <div className="mb-7 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-5">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: uc.accent }}>How Zari helps</p>
                  <p className="text-[14px] leading-7 text-[var(--ink-2)]">{uc.how}</p>
                </div>

                {/* Outcome */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Typical outcome</p>
                  {uc.outcome.split(" · ").map((o) => (
                    <div key={o} className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: uc.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                      <span className="text-[14px] text-[var(--ink-2)]">{o}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Right: testimonial + icon panel */}
              <Reveal data-delay="2" className={uci % 2 === 1 ? "[direction:ltr]" : ""}>
                <div className="space-y-5">
                  {/* Large icon + surface badge */}
                  <div className="overflow-hidden rounded-2xl border border-[var(--dark)]/10 bg-[var(--dark)] p-8" style={{ boxShadow: `0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px ${uc.accent}18` }}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${uc.accent}20` }}>
                        <svg className="h-6 w-6" style={{ color: uc.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d={uc.icon} /></svg>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: uc.accent }}>Coaching path</p>
                        <p className="text-[15px] font-bold text-white">{uc.audience.charAt(0).toUpperCase() + uc.audience.slice(1)} journey</p>
                      </div>
                    </div>

                    {/* Session path visualization */}
                    <div className="space-y-2.5">
                      {["Resume audit + rewrite", "LinkedIn rebuild", "Interview coaching", "30-day action plan"].map((step, si) => (
                        <div key={step} className="flex items-center gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: si === 0 ? uc.accent : "rgba(255,255,255,0.12)" }}>
                            {si + 1}
                          </div>
                          <div className="flex-1 rounded-lg px-3 py-2" style={{ background: si === 0 ? `${uc.accent}18` : "rgba(255,255,255,0.04)", border: `1px solid ${si === 0 ? uc.accent + "30" : "rgba(255,255,255,0.07)"}` }}>
                            <p className="text-[12.5px] font-medium" style={{ color: si === 0 ? "white" : "rgba(255,255,255,0.45)" }}>{step}</p>
                          </div>
                          {si === 0 && (
                            <div className="flex items-center gap-1">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                              <span className="text-[10px] text-emerald-400/70">Active</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="testimonial-card rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]"
                    style={{ "--accent-color": uc.accent } as React.CSSProperties}>
                    <div className="mb-3 flex">
                      {[1,2,3,4,5].map((j) => <svg key={j} className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                    </div>
                    <p className="mb-5 text-[14px] leading-7 text-[var(--ink-2)]">&ldquo;{uc.quote.text}&rdquo;</p>
                    <div className="flex items-center gap-3 border-t border-[var(--border)] pt-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: uc.accent }}>
                        {uc.quote.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[var(--ink)]">{uc.quote.name}</p>
                        <p className="text-[12px] text-[var(--muted)]">{uc.quote.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
          {uci < USE_CASES.length - 1 && <div className="separator-glow mx-auto mt-20 max-w-7xl md:mt-28" />}
        </section>
      ))}

      {/* ══════ CTA ══════ */}
      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", right:"-5%", top:"-10%", width:"500px", height:"500px", background:"var(--cyan)", opacity:.12, filter:"blur(120px)", borderRadius:"50%", animation:"float-b 18s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
            <Image src="/askia-logo.png" alt="Zari" width={40} height={40} className="rounded-xl" />
          </div>
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em] md:text-[3.4rem]">
            Find your situation.<br />Start your session.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/50">
            One free session per coaching surface. No card required.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] shadow-[0_8px_40px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Get started free"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/platform" className="inline-flex h-14 items-center rounded-xl border border-white/20 bg-white/[0.06] px-8 text-[15px] font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.11] hover:text-white">
              See the platform
            </Link>
          </div>
        </div>
      </section>

    </PageFrame>
  );
}
