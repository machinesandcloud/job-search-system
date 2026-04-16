import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { StarField, CursorGlow, HeroChatPreview } from "@/components/mvp-hero-extras";
import { MvpScrollCoach } from "@/components/mvp-scroll-coach";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { ZariAvatarDemo } from "@/components/zari-avatar";

// ── Marquee data ──────────────────────────────────────────────────────────────
const marqueeRow1 = ["google","meta","microsoft","amazon","stripe","figma","shopify","notion","airbnb","spotify","netflix","slack","databricks","snowflake","salesforce","github"];
const marqueeRow2 = ["coinbase","uber","adobe","atlassian","doordash","dropbox","nvidia","oracle","paypal","pinterest","zoom","intuit","figma","stripe","notion","shopify"];

// ── Capabilities highlight (voice/avatar/uploads) ─────────────────────────────
const CAPABILITIES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
        <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.20)",
    title: "Voice coaching",
    body: "Talk to Zari like a real coach. Voice mode lets you rehearse interviews out loud, get real-time tone feedback, and practice natural delivery — not just bullet points.",
    badge: "Live now",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
      </svg>
    ),
    color: "#22D3EE",
    glow: "rgba(34,211,238,0.18)",
    title: "Live avatar coach",
    body: "Zari has a face. An animated AI presence that listens, thinks, and responds — making every session feel like a real coaching conversation, not a chatbot.",
    badge: "Interactive",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
    ),
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.18)",
    title: "Upload anything",
    body: "Drop in your resume, job description, or LinkedIn profile. Zari reads it, analyzes it against real hiring criteria, and gives you a concrete action plan in under 60 seconds.",
    badge: "PDF · DOCX · URL",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.18)",
    title: "Coaching memory",
    body: "Session 5 picks up exactly where session 4 ended. Zari remembers your target role, your blockers, and your progress — so you never re-explain yourself.",
    badge: "Always evolving",
  },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 94,  suffix: "%",  label: "Interview call-back rate after resume session" },
  { value: 3,   suffix: "×+", label: "More recruiter views after LinkedIn overhaul" },
  { value: 87,  suffix: "%",  label: "Of users feel more confident after mock interview" },
  { value: 14,  suffix: "k+", label: "Coaching sessions completed" },
];

// ── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Zari gave me the harshest, most useful feedback I've ever gotten. My resume went from getting zero callbacks to 4 in one week.",
    name: "Priya M.",
    role: "Senior PM → Director of Product",
    company: "Accepted at Notion",
    accentColor: "#7C3AED",
    initials: "PM",
    bg: "linear-gradient(135deg, #4C1D95, #1E1B4B)",
  },
  {
    quote: "I did 6 mock interviews with Zari before my loop at Google. The real thing felt easier. I got the offer.",
    name: "Marcus J.",
    role: "Backend Engineer L4 → L5",
    company: "Accepted at Google",
    accentColor: "#22D3EE",
    initials: "MJ",
    bg: "linear-gradient(135deg, #0C4A6E, #0A0A1C)",
  },
  {
    quote: "The LinkedIn session was insane. Zari rebuilt my headline from scratch. I got 3 recruiter DMs in 48 hours from companies I'd been targeting.",
    name: "Aaliyah R.",
    role: "Data Scientist → ML Engineer",
    company: "Joined Stripe",
    accentColor: "#F59E0B",
    initials: "AR",
    bg: "linear-gradient(135deg, #451A03, #0A0A1C)",
  },
  {
    quote: "I was out of the workforce for 2 years. Zari helped me reframe my gap, nail my story, and land a better role than the one I left.",
    name: "Sofia K.",
    role: "Career Returner",
    company: "Accepted at Salesforce",
    accentColor: "#A78BFA",
    initials: "SK",
    bg: "linear-gradient(135deg, #2E1065, #0A0A1C)",
  },
];

// ── How it works ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "Create your account",
    body: "Sign up in 30 seconds. No credit card required. Zari sets up your coaching profile from day one.",
    color: "#7C3AED",
  },
  {
    num: "02",
    title: "Drop in your materials",
    body: "Upload your resume, paste your LinkedIn URL, or describe the role you're targeting. Zari handles the rest.",
    color: "#22D3EE",
  },
  {
    num: "03",
    title: "Start your first session",
    body: "Talk or type. Get feedback on your resume, LinkedIn, interview answers, or career strategy — all in one place.",
    color: "#A78BFA",
  },
  {
    num: "04",
    title: "Land the role",
    body: "Walk into every interview with a coach who's already prepped you. Then negotiate the offer you deserve.",
    color: "#F59E0B",
  },
];

export default async function HomePage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>

      {/* ══════ HERO ══════ */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] pb-0 pt-20 text-white md:pt-24">
        <StarField count={140} />
        <CursorGlow color="rgba(124,58,237,0.10)" size={650} />

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"700px", height:"700px", top:"-15%", left:"-10%", background:"var(--brand)", opacity:.09, filter:"blur(160px)", borderRadius:"50%", animation:"float-a 20s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"500px", height:"500px", top:"-5%", right:"-8%", background:"var(--cyan)", opacity:.07, filter:"blur(140px)", borderRadius:"50%", animation:"float-b 25s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"400px", height:"400px", bottom:"0%", left:"35%", background:"var(--purple)", opacity:.06, filter:"blur(120px)", borderRadius:"50%", animation:"float-c 18s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left: copy */}
            <div className="pb-16 pt-4 lg:pb-24 lg:pt-8">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur-sm">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--cyan)]" style={{ boxShadow: "0 0 6px var(--cyan)" }} />
                Meet your AI coach
              </div>

              <h1 className="text-[3.4rem] font-extrabold leading-[1.03] tracking-[-0.04em] md:text-[4.2rem] lg:text-[4.8rem]">
                Your career<br />
                coach is{" "}
                <span className="gradient-text-zari">always on.</span>
              </h1>

              <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-white/50">
                Zari is an AI coach that reviews your resume, rebuilds your LinkedIn, runs mock interviews, and talks you through your strategy — with voice, avatar, and memory that compounds across every session.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href={userId ? "/dashboard" : "/signup"}
                  className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-8 text-[15px] font-bold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_8px_32px_rgba(124,58,237,0.45)]"
                >
                  {userId ? "Open dashboard" : "Start coaching free"}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                {!userId && (
                  <Link href="/login" className="inline-flex h-14 items-center rounded-xl border border-white/15 bg-white/[0.05] px-7 text-[15px] font-semibold text-white/70 backdrop-blur-sm transition-all hover:bg-white/[0.10] hover:text-white">
                    Sign in
                  </Link>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-5 text-[12.5px] text-white/35">
                {["No credit card", "Free tier forever", "Voice + avatar + uploads"].map((s) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-[var(--cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: avatar + chat */}
            <div className="relative flex flex-col items-center pb-0 lg:pb-0">
              {/* Avatar glow backdrop */}
              <div style={{ position:"absolute", width:"420px", height:"420px", top:"50%", left:"50%", transform:"translate(-50%,-50%)", background:"radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 65%)", pointerEvents:"none" }} />

              {/* Floating capability badges */}
              <div className="absolute left-0 top-16 hidden xl:block" style={{ animation:"float-badge 3.5s ease-in-out infinite" }}>
                <div className="glass rounded-2xl border border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background:"rgba(34,211,238,0.15)" }}>
                      <svg className="h-4 w-4 text-[var(--cyan)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white">Voice mode</p>
                      <p className="text-[10px] text-white/45">Real-time coaching</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute right-0 top-28 hidden xl:block" style={{ animation:"float-badge 4s ease-in-out infinite", animationDelay:"1.2s" }}>
                <div className="glass rounded-2xl border border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background:"rgba(245,158,11,0.15)" }}>
                      <svg className="h-4 w-4 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white">Resume analyzed</p>
                      <p className="text-[10px] text-white/45">Score: 89/100</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central avatar */}
              <div className="relative flex flex-col items-center">
                <ZariAvatarDemo size={180} />

                {/* Chat preview below avatar */}
                <div className="relative mt-8 w-full max-w-sm">
                  <div className="absolute -inset-[1.5px] rounded-[22px] spin-border-zari" style={{ zIndex:0 }} />
                  <div className="relative rounded-[20px] p-1" style={{ background:"rgba(7,7,15,0.95)", zIndex:1 }}>
                    <HeroChatPreview />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="relative flex justify-center pb-6 pt-2">
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, opacity:0.35 }}>
            <div style={{ width:1, height:40, background:"linear-gradient(to bottom, transparent, rgba(167,139,250,0.6))" }} />
            <svg className="h-4 w-4 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </section>

      {/* ══════ LOGO MARQUEE ══════ */}
      <section className="overflow-hidden border-y border-[var(--border)] bg-[var(--bg)] py-6">
        <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-widest text-[var(--muted)]">
          Used by candidates targeting
        </p>
        <style>{`
          @keyframes marquee-fwd { from{transform:translateX(0)} to{transform:translateX(-50%)} }
          @keyframes marquee-rev { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        `}</style>
        <div className="mb-2 flex overflow-hidden">
          <div style={{ display:"flex", gap:32, animation:"marquee-fwd 28s linear infinite", whiteSpace:"nowrap" }}>
            {[...marqueeRow1, ...marqueeRow1].map((s, i) => (
              <span key={i} className="text-[13px] font-semibold uppercase tracking-widest text-[var(--muted)] opacity-50">{s}</span>
            ))}
          </div>
        </div>
        <div className="flex overflow-hidden">
          <div style={{ display:"flex", gap:32, animation:"marquee-rev 24s linear infinite", whiteSpace:"nowrap" }}>
            {[...marqueeRow2, ...marqueeRow2].map((s, i) => (
              <span key={i} className="text-[13px] font-semibold uppercase tracking-widest text-[var(--muted)] opacity-40">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ LIVE COACHING DEMO ══════ */}
      <section id="demo" className="bg-[var(--bg)]">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-0">
          <Reveal>
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--brand)] shadow-[var(--shadow)]">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                Live coaching demo
              </div>
              <h2 className="text-[2.6rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[3.2rem]">
                See what a session{" "}
                <span style={{ background:"linear-gradient(135deg, var(--brand), var(--cyan))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  actually looks like.
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--muted)]">
                Scroll through four coaching surfaces and watch Zari work in real time. This is exactly what you get from session one.
              </p>
            </div>
          </Reveal>
        </div>
        <MvpScrollCoach />
      </section>

      {/* ══════ CAPABILITIES ══════ */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] py-24 text-white md:py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"600px", height:"600px", top:"-10%", right:"-5%", background:"var(--brand)", opacity:.08, filter:"blur(150px)", borderRadius:"50%", animation:"float-a 22s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"400px", height:"400px", bottom:"0%", left:"-5%", background:"var(--cyan)", opacity:.06, filter:"blur(120px)", borderRadius:"50%", animation:"float-b 18s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-25" />

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur-sm">
                Built different
              </div>
              <h2 className="text-[2.6rem] font-extrabold tracking-[-0.03em] md:text-[3.2rem]">
                A coaching platform built for{" "}
                <span className="gradient-text-zari">how humans actually learn.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-white/45">
                Not another AI chatbot. Zari combines voice, memory, an animated presence, and four specialized coaching surfaces to create something genuinely new.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((cap, ci) => (
              <Reveal key={cap.title} data-delay={String((ci % 4) + 1) as "1"|"2"|"3"|"4"}>
                <div
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${cap.color}22`,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Glow corner */}
                  <div style={{ position:"absolute", top:0, left:0, width:"80px", height:"80px", background:cap.glow, filter:"blur(30px)", borderRadius:"0 0 100% 0", pointerEvents:"none" }} />

                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `${cap.color}18`, color: cap.color }}
                  >
                    {cap.icon}
                  </div>
                  <div
                    className="mb-3 self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{ background:`${cap.color}18`, color: cap.color }}
                  >
                    {cap.badge}
                  </div>
                  <h3 className="mb-2 text-[16px] font-bold text-white">{cap.title}</h3>
                  <p className="flex-1 text-[13.5px] leading-6 text-white/45">{cap.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Voice showcase */}
          <Reveal>
            <div className="mt-10 overflow-hidden rounded-3xl border border-white/08" style={{ background:"rgba(255,255,255,0.03)" }}>
              <div className="grid lg:grid-cols-2">
                <div className="p-10 lg:p-12">
                  <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--brand)]" style={{ boxShadow:"0 0 6px var(--brand)" }} />
                    Voice coaching — live
                  </div>
                  <h3 className="mb-4 text-[2rem] font-extrabold leading-tight tracking-[-0.03em]">
                    Talk your way through<br />
                    <span className="gradient-text-zari">every interview.</span>
                  </h3>
                  <p className="mb-6 text-[15px] leading-7 text-white/45">
                    Zari listens as you speak, detects filler words, pacing issues, and confidence signals — then coaches you in real time. You can't practice this by typing.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Real-time filler word detection",
                      "Pacing and pause analysis",
                      "STAR structure coaching mid-answer",
                      "Natural conversation — no scripts",
                    ].map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-[13.5px] text-white/65">
                        <svg className="h-4 w-4 flex-shrink-0 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative flex items-center justify-center border-l border-white/05 p-10">
                  <div className="pointer-events-none absolute inset-0" style={{ background:"radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />
                  <div className="relative flex flex-col items-center gap-8">
                    <ZariAvatarDemo size={140} />
                    {/* Transcription mock */}
                    <div className="w-full max-w-xs">
                      <div className="coach-panel rounded-2xl p-4">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">Zari is analyzing…</p>
                        {[
                          { label: "Confidence", pct: 82, color:"#7C3AED" },
                          { label: "Pacing",      pct: 71, color:"#22D3EE" },
                          { label: "STAR usage",  pct: 94, color:"#A78BFA" },
                        ].map((m) => (
                          <div key={m.label} className="mb-2">
                            <div className="mb-1 flex justify-between text-[11px]">
                              <span className="text-white/50">{m.label}</span>
                              <span className="font-bold" style={{ color: m.color }}>{m.pct}%</span>
                            </div>
                            <div className="h-1 overflow-hidden rounded-full bg-white/08">
                              <div className="h-full rounded-full" style={{ width:`${m.pct}%`, background:`linear-gradient(90deg, ${m.color}66, ${m.color})` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ METRICS WALL ══════ */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="mb-14 text-center text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.8rem]">
              The results speak for themselves.
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, si) => (
              <Reveal key={stat.label} data-delay={String((si % 4) + 1) as "1"|"2"|"3"|"4"}>
                <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-7 shadow-[var(--shadow)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                  <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full" style={{ background:"radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
                  <div className="relative">
                    <p className="text-[3rem] font-extrabold leading-none tracking-[-0.05em] text-[var(--ink)]">
                      <CountUp value={stat.value} suffix={stat.suffix} easing="bounce" />
                    </p>
                    <p className="mt-3 text-[13px] leading-5 text-[var(--muted)]">{stat.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] py-24 text-white md:py-32">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"500px", height:"500px", top:"20%", left:"50%", transform:"translateX(-50%)", background:"var(--brand)", opacity:.07, filter:"blur(140px)", borderRadius:"50%" }} />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em] md:text-[3rem]">
                From signup to offer in{" "}
                <span className="gradient-text-zari">four moves.</span>
              </h2>
            </div>
          </Reveal>
          <div className="relative grid gap-8 md:grid-cols-4">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-10 hidden h-px md:block" style={{ background:"linear-gradient(90deg, transparent, rgba(167,139,250,0.25) 20%, rgba(34,211,238,0.20) 50%, rgba(167,139,250,0.25) 80%, transparent)" }} />
            {STEPS.map((step, si) => (
              <Reveal key={step.num} data-delay={String((si + 1) as 1|2|3|4)}>
                <div className="relative flex flex-col items-center text-center">
                  <div
                    className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-2xl"
                    style={{ background:`${step.color}15`, border:`1.5px solid ${step.color}30` }}
                  >
                    <span className="text-[1.6rem] font-extrabold tracking-tight" style={{ color: step.color }}>{step.num}</span>
                  </div>
                  <h3 className="mb-2 text-[16px] font-bold text-white">{step.title}</h3>
                  <p className="text-[13.5px] leading-6 text-white/45">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="bg-[var(--bg)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[3rem]">
                Candidates who showed up differently.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[16px] text-[var(--muted)]">
                Real sessions. Real results. Real offers.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t, ti) => (
              <Reveal key={t.name} data-delay={String((ti % 4) + 1) as "1"|"2"|"3"|"4"}>
                <div
                  className="testimonial-card flex h-full flex-col overflow-hidden rounded-2xl p-6 text-white"
                  style={{ background: t.bg, "--accent-color": t.accentColor } as React.CSSProperties}
                >
                  {/* Stars */}
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" style={{ color: t.accentColor }}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mb-5 flex-1 text-[14px] leading-7 text-white/75">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ background: `${t.accentColor}40` }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white">{t.name}</p>
                      <p className="text-[11px] text-white/45">{t.role}</p>
                      <p className="text-[11px] font-semibold" style={{ color: t.accentColor }}>{t.company}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section
        className="noise-overlay relative overflow-hidden py-28 text-white"
        style={{ background: "linear-gradient(135deg, #1A0A3C 0%, #7C3AED 45%, #0D1A3C 75%, #07070F 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", left:"-5%", top:"-20%", width:"500px", height:"500px", background:"var(--cyan)", opacity:.10, filter:"blur(130px)", borderRadius:"50%", animation:"float-b 20s ease-in-out infinite" }} />
          <div style={{ position:"absolute", right:"-5%", bottom:"-10%", width:"400px", height:"400px", background:"var(--purple)", opacity:.12, filter:"blur(110px)", borderRadius:"50%", animation:"float-a 16s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto mb-8 flex items-center justify-center">
            <ZariAvatarDemo size={100} />
          </div>
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.035em] md:text-[3.8rem]">
            Your next interview<br />
            <span className="gradient-text-zari">starts right now.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-white/50">
            No card. No friction. Zari is ready when you are.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={userId ? "/dashboard" : "/signup"}
              className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] shadow-[0_8px_40px_rgba(255,255,255,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(255,255,255,0.25)]"
            >
              {userId ? "Go to dashboard" : "Start coaching free"}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/pricing" className="inline-flex h-14 items-center rounded-xl border border-white/20 bg-white/[0.06] px-8 text-[15px] font-semibold text-white/75 backdrop-blur-sm transition-all hover:bg-white/[0.12] hover:text-white">
              See pricing
            </Link>
          </div>
          <p className="mt-6 text-[12px] text-white/30">
            Free forever · No credit card · Cancel Pro anytime
          </p>
        </div>
      </section>

    </PageFrame>
  );
}
