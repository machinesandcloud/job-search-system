import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { Reveal } from "@/components/reveal";
import { StarField, CursorGlow } from "@/components/mvp-hero-extras";

const SURFACES = [
  {
    id: "resume",
    tag: "01",
    title: "Resume Review",
    tagline: "From silent rejection to callback-ready.",
    accent: "#0D7182",
    accentVar: "var(--brand)",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    problem: "87% of resumes are rejected by ATS systems before a human reads them. Most candidates don't know why — and generic resume advice makes it worse.",
    what: [
      { label: "ATS keyword scan", body: "Every bullet checked against real job description keyword patterns — not guesses." },
      { label: "Impact scoring", body: "Bullets rated for metric density, scope, and business outcome. Specific score per bullet." },
      { label: "Direct rewrite", body: "The coach writes the improved version for you. No suggestions, no vague edits — paste it in." },
      { label: "Before / after score", body: "Overall resume score before and after rewrites, so you can see measurable progress." },
    ],
    stat: { from: "52", to: "89", label: "Score in one session" },
  },
  {
    id: "linkedin",
    tag: "02",
    title: "LinkedIn Overhaul",
    tagline: "Recruiter-searchable in one session.",
    accent: "#4ca7e6",
    accentVar: "var(--cyan-dim)",
    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
    problem: "LinkedIn's ranking algorithm favors specific keyword patterns and headline structure. Most profiles score under 60 on recruiter visibility — and their owners have no idea.",
    what: [
      { label: "Headline rewrite", body: "Built for search: target role, seniority, specialty, and openness — not a job title." },
      { label: "About section rebuild", body: "Keyword-dense narrative that surfaces in recruiter Boolean searches." },
      { label: "Visibility scoring", body: "Profile scored before and after with specific attribution for what changed." },
      { label: "Skills & positioning", body: "Skill stack aligned to your target level and filtered for what matters at your tier." },
    ],
    stat: { from: "68", to: "91", label: "Visibility score" },
  },
  {
    id: "interview",
    tag: "03",
    title: "Mock Interview",
    tagline: "Every vague answer caught before the real thing.",
    accent: "#7a8dff",
    accentVar: "var(--purple)",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    problem: "Most candidates have good stories buried under vague language. 'Led a team' and 'improved performance' are invisible to interviewers. The coach excavates the specifics.",
    what: [
      { label: "Behavioral questions", body: "STAR framework enforced mid-answer — situation, decision, outcome, metric required." },
      { label: "Technical deep-dives", body: "Probing follow-ups to expose gaps in reasoning before your interviewer does." },
      { label: "Real-time feedback", body: "Each answer scored immediately with specific language fixes and missing elements." },
      { label: "Voice coaching mode", body: "Speak your answers out loud. The coach evaluates filler words, pacing, and structure." },
    ],
    stat: { from: "3/10", to: "9/10", label: "STAR answer quality" },
  },
  {
    id: "career",
    tag: "04",
    title: "Career Direction",
    tagline: "Stop applying broadly. Start targeting precisely.",
    accent: "#F97316",
    accentVar: "var(--amber)",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    problem: "Spray-and-pray job searches produce anxiety and burnout, not offers. The candidates who land fastest are the ones with a focused target list and a clear narrative for each company.",
    what: [
      { label: "Role fit mapping", body: "Your background scored across 4 target role categories with specific match reasoning." },
      { label: "Gap identification", body: "Precise gaps between your profile and your target roles — with actionable paths to close them." },
      { label: "Target company shortlist", body: "3–5 companies where your profile is strongest, based on your stage and specialty." },
      { label: "30-day action plan", body: "Weekly milestones across resume, LinkedIn, outreach, and interview prep." },
    ],
    stat: { from: "0", to: "4", label: "Interviews in 2 weeks" },
  },
];

const PLATFORM_FEATURES = [
  { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", title: "Session memory", body: "Every session you run is summarized and stored. The next session picks up where the last one ended — your coach knows your target role, your materials, and your blockers without re-explaining." },
  { icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582 4-8 4s8 1.79 8 4", title: "Document library", body: "Upload your resume and LinkedIn once. Every coaching session references your actual materials — not hypothetical scenarios." },
  { icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Recap & action plans", body: "Every session produces a recap document: what was reviewed, what changed, and what to do next. Your progress is visible and trackable." },
  { icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z", title: "Voice coaching mode", body: "Speak your answers out loud. The coach analyzes structure, catches filler words, and evaluates pacing — preparation that mirrors the real interview." },
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Four dedicated surfaces", body: "Resume, LinkedIn, interview, and career strategy each have their own workspace. No cramming everything into a single thread that loses context." },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Coaching that compounds", body: "Session 4 builds on sessions 1–3. The coach tracks your open action items, your score history, and your target role evolution across every interaction." },
];

export default async function PlatformPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>

      {/* ══════ HERO ══════ */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <StarField count={90} />
        <CursorGlow color="rgba(13,113,130,0.10)" size={600} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"600px", height:"600px", top:"-10%", left:"-8%", background:"var(--cyan)", opacity:.08, filter:"blur(130px)", borderRadius:"50%", animation:"float-a 20s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"500px", height:"500px", top:"-6%", right:"-6%", background:"var(--purple)", opacity:.07, filter:"blur(120px)", borderRadius:"50%", animation:"float-b 24s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur-sm">
            The platform
          </div>
          <h1 className="text-[3.2rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            Four coaching surfaces.<br />
            <span className="gradient-text-animated">One focused product.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/48">
            Resume review, LinkedIn optimization, mock interviews, and career strategy — each with its own
            dedicated workspace, session memory, and actionable output. Not a chatbot. A coaching system.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-13 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[15px] font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(13,113,130,0.50)]">
              {userId ? "Open dashboard" : "Start free"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/pricing" className="inline-flex h-13 items-center rounded-xl border border-white/10 bg-white/[0.04] px-7 text-[15px] font-medium text-white/60 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ SURFACE DEEP DIVES ══════ */}
      {SURFACES.map((s, si) => (
        <section
          key={s.id}
          className={`py-20 md:py-28 ${si % 2 === 0 ? "feature-glow-left bg-[var(--bg)]" : "feature-glow-right bg-white"}`}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className={`grid items-center gap-14 lg:grid-cols-2 ${si % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>

              {/* Copy */}
              <Reveal className={si % 2 === 1 ? "[direction:ltr]" : ""}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ background: `${s.accent}14`, color: s.accent, border: `1px solid ${s.accent}28` }}>
                  {s.tag} — {s.title}
                </div>
                <h2 className="mb-3 text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--ink)] md:text-[2.8rem]">
                  {s.tagline}
                </h2>
                <p className="mb-8 text-[15.5px] leading-relaxed text-[var(--muted)]">{s.problem}</p>

                <div className="space-y-5">
                  {s.what.map((w) => (
                    <div key={w.label} className="flex gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: `${s.accent}20` }}>
                        <div className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-[var(--ink)]">{w.label}</p>
                        <p className="mt-0.5 text-[13.5px] leading-6 text-[var(--muted)]">{w.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stat pill */}
                <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border px-5 py-3"
                  style={{ borderColor: `${s.accent}30`, background: `${s.accent}0c` }}>
                  <span className="text-[1.5rem] font-extrabold text-white/40">{s.stat.from}</span>
                  <svg className="h-4 w-4" style={{ color: s.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  <span className="text-[1.5rem] font-extrabold" style={{ color: s.accent }}>{s.stat.to}</span>
                  <span className="border-l pl-3 text-[12px] text-[var(--muted)]" style={{ borderColor: `${s.accent}25` }}>{s.stat.label}</span>
                </div>
              </Reveal>

              {/* Preview panel */}
              <Reveal data-delay="2" className={si % 2 === 1 ? "[direction:ltr]" : ""}>
                <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--dark)] shadow-[var(--shadow-lg)]"
                  style={{ boxShadow: `0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px ${s.accent}18` }}>
                  {/* Chrome */}
                  <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-4 py-3">
                    {["#ff5f57","#febc2e","#28c840"].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
                    <div className="ml-1 flex-1 rounded bg-white/[0.05] px-2.5 py-0.5 text-center text-[10px] text-white/22">
                      zaricoach.com · {s.title}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      <span className="text-[9.5px] text-emerald-400/60">LIVE</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    {/* Typing dots */}
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: s.accent }}>A</div>
                      <div className="flex gap-1.5 rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-3">
                        {[0,1,2].map((j) => <span key={j} className="h-1.5 w-1.5 rounded-full bg-white/40" style={{ animation: `dot-bounce 1.4s ease-in-out infinite ${j * 0.2}s` }} />)}
                      </div>
                    </div>
                    {/* Mock chat content per surface */}
                    {s.id === "resume" && (
                      <>
                        <div className="flex items-start gap-2.5" style={{ animation: "bubble-appear 0.4s ease 1.2s both", opacity: 0 }}>
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: s.accent }}>A</div>
                          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-white/80">Score: <span className="font-bold text-yellow-400">52/100</span>. Bullet 3 has no metric and fails ATS filters.</div>
                        </div>
                        <div className="ml-8 space-y-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3" style={{ animation: "bubble-appear 0.4s ease 2.4s both", opacity: 0 }}>
                          <div className="rounded-lg bg-red-500/10 px-3 py-2 text-[12px] text-red-300/70 line-through">Led cross-functional projects across multiple teams</div>
                          <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-[12px] font-medium text-emerald-300" style={{ animation: "bubble-appear 0.35s ease 3.2s both", opacity: 0 }}>Drove 3 launches across 4 teams · cut time-to-ship 22%</div>
                        </div>
                      </>
                    )}
                    {s.id === "linkedin" && (
                      <div className="ml-8 space-y-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5" style={{ animation: "bubble-appear 0.4s ease 1.4s both", opacity: 0 }}>
                        {[{ l: "Search ranking", v: 91 }, { l: "Headline strength", v: 95 }, { l: "Keyword density", v: 88 }].map((bar, bi) => (
                          <div key={bar.l} className="space-y-1">
                            <div className="flex justify-between text-[11.5px]"><span className="text-white/50">{bar.l}</span><span className="font-bold text-white">{bar.v}</span></div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                              <div className="h-full rounded-full" style={{ width: `${bar.v}%`, background: s.accent, animation: `bubble-appear 0s ease ${1.6 + bi * 0.3}s both`, transition: "width 0s" }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {s.id === "interview" && (
                      <>
                        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3" style={{ animation: "bubble-appear 0.4s ease 1s both", opacity: 0 }}>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-white/25 mb-1.5">Question</p>
                          <p className="text-[12.5px] leading-relaxed text-white/70">Tell me about a time you made a high-stakes decision with incomplete data.</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5" style={{ animation: "bubble-appear 0.4s ease 2.2s both", opacity: 0 }}>
                          {[{ t:"✕ No metric",ok:false},{t:"✕ Missing outcome",ok:false},{t:"✓ Situation clear",ok:true},{t:"✓ Decision stated",ok:true}].map((tag) => (
                            <span key={tag.t} className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${tag.ok ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-red-500/30 bg-red-500/10 text-red-300"}`}>{tag.t}</span>
                          ))}
                        </div>
                      </>
                    )}
                    {s.id === "career" && (
                      <div className="ml-8 space-y-2 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3" style={{ animation: "bubble-appear 0.4s ease 1.4s both", opacity: 0 }}>
                        {[{ n:"Senior PM (B2B SaaS)",pct:94,c:s.accent},{n:"Product Lead (Infra)",pct:82,c:"#4ca7e6"},{n:"Group PM",pct:71,c:"#7a8dff"},{n:"Director of Product",pct:58,c:"#64698A"}].map((r) => (
                          <div key={r.n} className="space-y-1">
                            <div className="flex justify-between text-[12px]"><span className="text-white/65">{r.n}</span><span className="font-bold" style={{ color: r.c }}>{r.pct}%</span></div>
                            <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]"><div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.c }} /></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
          {si < SURFACES.length - 1 && <div className="separator-glow mx-auto mt-20 max-w-7xl md:mt-28" />}
        </section>
      ))}

      {/* ══════ PLATFORM FEATURES GRID ══════ */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] py-20 text-white md:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", top:0, right:0, width:"500px", height:"500px", background:"var(--cyan)", opacity:.06, filter:"blur(120px)", borderRadius:"50%", animation:"float-b 20s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />

        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em] md:text-[3rem]">
                Built around how coaching<br />
                <span className="gradient-text-animated">actually works.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[16px] text-white/40">
                Session memory, document context, actionable outputs. Not just a smart chatbot.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_FEATURES.map((feat, fi) => (
              <Reveal key={feat.title} data-delay={String((fi % 3) + 1) as "1" | "2" | "3"}>
                <div className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand)]/20">
                    <svg className="h-5 w-5 text-[var(--cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d={feat.icon} /></svg>
                  </div>
                  <h3 className="mb-2 text-[15px] font-bold text-white">{feat.title}</h3>
                  <p className="text-[13.5px] leading-6 text-white/45">{feat.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", left:"-5%", top:"-20%", width:"500px", height:"500px", background:"var(--cyan)", opacity:.12, filter:"blur(120px)", borderRadius:"50%", animation:"float-b 18s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em] md:text-[3.4rem]">
            Experience it yourself.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[17px] text-white/50">
            One free session per surface. No card. No lock-in. See exactly what Zari does before you decide.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/pricing" className="inline-flex h-14 items-center rounded-xl border border-white/20 bg-white/[0.06] px-8 text-[15px] font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.11] hover:text-white">
              View pricing
            </Link>
          </div>
        </div>
      </section>

    </PageFrame>
  );
}
