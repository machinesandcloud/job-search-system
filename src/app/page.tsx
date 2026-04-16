import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { Reveal } from "@/components/reveal";
import { ZariAvatarDemo } from "@/components/zari-avatar";
import { ZariLogo } from "@/components/zari-logo";
import { PortalPreview } from "@/components/portal-preview";

// ── Marquee logos ─────────────────────────────────────────────────────────────
const MARQUEE_LOGOS = [
  { src: "/logos/google.svg",     alt: "Google" },
  { src: "/logos/meta.svg",       alt: "Meta" },
  { src: "/logos/microsoft.svg",  alt: "Microsoft" },
  { src: "/logos/amazon.svg",     alt: "Amazon" },
  { src: "/logos/stripe.svg",     alt: "Stripe" },
  { src: "/logos/figma.svg",      alt: "Figma" },
  { src: "/logos/shopify.svg",    alt: "Shopify" },
  { src: "/logos/notion.svg",     alt: "Notion" },
  { src: "/logos/netflix.svg",    alt: "Netflix" },
  { src: "/logos/slack.svg",      alt: "Slack" },
  { src: "/logos/github.svg",     alt: "GitHub" },
  { src: "/logos/salesforce.svg", alt: "Salesforce" },
  { src: "/logos/adobe.svg",      alt: "Adobe" },
  { src: "/logos/nvidia.svg",     alt: "Nvidia" },
  { src: "/logos/databricks.svg", alt: "Databricks" },
];

// ── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "I signed up for a bunch of AI tools. Zari is the one I actually kept. The resume feedback was specific to the point of being uncomfortable — it knew exactly what was wrong.",
    name: "Priya M.",
    role: "Product Manager",
    company: "Now at Notion",
    initials: "PM",
    stars: 5,
  },
  {
    quote: "I just did 6 mock interviews with Zari before my Google loop. The real thing felt easier. I got the offer. There is nothing else out there that prepares you this well.",
    name: "Marcus J.",
    role: "Backend Engineer",
    company: "Now at Google",
    initials: "MJ",
    stars: 5,
  },
  {
    quote: "I'm incredibly excited with what Zari has built. The LinkedIn session rebuilt my headline from scratch and I got 3 recruiter DMs the same week.",
    name: "Aaliyah R.",
    role: "Data Scientist",
    company: "Now at Stripe",
    initials: "AR",
    stars: 5,
  },
];

// ── Before / After ────────────────────────────────────────────────────────────
const BEFORE_AFTER = [
  {
    before: "Led cross-functional projects across teams.",
    after:  "Drove 3 product launches · cut time-to-ship 22% · $2.4M revenue impact.",
  },
  {
    before: "Managed supply chain redesign across 5 units.",
    after:  "Led end-to-end supply chain redesign · 22% faster fulfilment · £340K saved.",
  },
];

// ── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
      </svg>
    ),
    title: "Voice coaching",
    body: "Talk to Zari like a real coach. Real-time feedback on tone, pacing, filler words, and STAR structure as you practice out loud.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
      </svg>
    ),
    title: "Resume overhaul",
    body: "Upload your resume. Get an ATS score, bullet-by-bullet rewrites with metrics, and a final version you can send tonight.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <circle cx="16" cy="8" r="4"/><path d="M4 20c0-4 2.7-7 8-7"/>
        <path d="M16 12v8m-4-4h8"/>
      </svg>
    ),
    title: "LinkedIn rebuild",
    body: "Recruiter search ranking, keyword density, headline rewrites. Visibility score from 61 to 91 in one session.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Mock interview",
    body: "STAR-structured practice with scoring on structure, evidence, concision, and stakeholder influence — the things panels actually score.",
  },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  { val: "94%",  label: "Call-back rate after resume session" },
  { val: "3×",   label: "More recruiter views after LinkedIn overhaul" },
  { val: "87%",  label: "Feel more confident after mock interviews" },
  { val: "14k+", label: "Coaching sessions completed" },
];

export default async function HomePage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>

      {/* ══════ HERO ══════ */}
      <section className="kleo-hero relative overflow-hidden pb-0 pt-20">
        <style>{`
          @keyframes marquee-logos { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        `}</style>

        {/* Aurora blobs — always animating */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"700px", height:"700px", top:"-15%", left:"50%", transform:"translateX(-50%)", background:"radial-gradient(ellipse, rgba(67,97,238,0.09) 0%, transparent 65%)", animation:"aurora-a 18s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"500px", height:"400px", top:"10%", right:"-5%", background:"radial-gradient(ellipse, rgba(129,140,248,0.07) 0%, transparent 65%)", animation:"aurora-b 22s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"400px", height:"500px", bottom:"0%", left:"-5%", background:"radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 65%)", animation:"aurora-c 16s ease-in-out infinite" }} />
        </div>

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {[
            { top:"8%",  left:"12%", size:6, color:"rgba(67,97,238,0.5)", anim:"particle-float-1", dur:"8s", delay:"0s" },
            { top:"18%", left:"78%", size:5, color:"rgba(6,182,212,0.5)",  anim:"particle-float-2", dur:"11s", delay:"1.5s" },
            { top:"35%", left:"4%",  size:4, color:"rgba(129,140,248,0.4)",anim:"particle-float-3", dur:"9s",  delay:"0.8s" },
            { top:"60%", left:"90%", size:5, color:"rgba(67,97,238,0.4)",  anim:"particle-float-1", dur:"12s", delay:"3s" },
            { top:"72%", left:"22%", size:4, color:"rgba(6,182,212,0.4)",  anim:"particle-float-2", dur:"10s", delay:"2s" },
            { top:"5%",  left:"55%", size:3, color:"rgba(139,92,246,0.45)",anim:"particle-float-3", dur:"7s",  delay:"4s" },
            { top:"45%", left:"65%", size:4, color:"rgba(67,97,238,0.35)", anim:"particle-float-1", dur:"13s", delay:"1s" },
            { top:"80%", left:"50%", size:3, color:"rgba(129,140,248,0.4)",anim:"particle-float-2", dur:"9.5s", delay:"5s" },
          ].map((p, i) => (
            <div key={i} style={{
              position:"absolute", top:p.top, left:p.left,
              width:p.size, height:p.size, borderRadius:"50%",
              background:p.color,
              boxShadow:`0 0 ${p.size*3}px ${p.color}`,
              animation:`${p.anim} ${p.dur} ease-in-out ${p.delay} infinite`,
            }} />
          ))}
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">

          {/* Eyebrow badge */}
          <div className="mb-6 flex justify-center">
            <span className="kleo-badge">
              <ZariLogo size={16} />
              #1 AI Career Coach
            </span>
          </div>

          <h1 className="text-[3.2rem] font-extrabold leading-[1.06] tracking-[-0.04em] text-[var(--ink)] md:text-[4.2rem] lg:text-[5rem]">
            Landing your next role<br />
            has{" "}
            <span className="gradient-text-zari">never been easier.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-relaxed text-[var(--muted)]">
            Zari reviews your resume, rebuilds your LinkedIn, runs live mock interviews, and talks you through your career strategy — with voice, an animated avatar, and memory that builds across every session.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={userId ? "/dashboard" : "/signup"}
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14.5px] font-bold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover)]"
            >
              {userId ? "Open dashboard" : "Get started free"}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            {!userId && (
              <Link href="/login" className="inline-flex h-12 items-center rounded-xl border border-[var(--border)] bg-white px-7 text-[14.5px] font-semibold text-[var(--ink)] transition-all hover:border-[var(--brand)] hover:text-[var(--brand)]">
                Sign in
              </Link>
            )}
          </div>

          {/* Social proof */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-6 text-[13px] text-[var(--muted)]">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-3.5 w-3.5 fill-[var(--gold)]" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
              <span className="ml-1">Loved by 1,200+ candidates</span>
            </div>
            <span className="text-[var(--border)]">·</span>
            <span>No credit card required</span>
            <span className="text-[var(--border)]">·</span>
            <span>Free tier forever</span>
          </div>
        </div>

        {/* Interactive platform preview */}
        <div className="relative mx-auto mt-14 max-w-6xl px-4 sm:px-6">
          <PortalPreview />
        </div>
      </section>

      {/* ══════ LOGO MARQUEE ══════ */}
      <section className="overflow-hidden border-y border-[var(--border)] bg-white py-8 mt-16">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          Used by candidates targeting
        </p>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div style={{ display:"flex", alignItems:"center", gap:56, animation:"marquee-logos 32s linear infinite", whiteSpace:"nowrap" }}>
            {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, i) => (
              <Image key={i} src={logo.src} alt={logo.alt} width={110} height={28} className="h-6 w-auto opacity-40 grayscale transition-all hover:opacity-70 hover:grayscale-0" style={{ objectFit:"contain" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS (kleo-style white cards) ══════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[3rem]">
                Candidates who showed up differently.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[16px] text-[var(--muted)]">
                Real sessions. Real results. Real offers.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, ti) => (
              <Reveal key={t.name} data-delay={String(ti + 1) as "1"|"2"|"3"}>
                <div className="kleo-testimonial flex h-full flex-col">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <svg key={i} className="h-4 w-4 fill-[var(--gold)]" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </div>
                  <blockquote className="mb-5 flex-1 text-[14.5px] leading-7 text-[var(--ink-2)]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 border-t border-[var(--border)] pt-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-light)] text-[11px] font-bold text-[var(--brand)]">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[var(--ink)]">{t.name}</p>
                      <p className="text-[11px] text-[var(--muted)]">{t.role}</p>
                      <p className="text-[11px] font-semibold text-[var(--brand)]">{t.company}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ BEFORE / AFTER ══════ */}
      <section className="bg-[var(--bg-alt)] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="kleo-badge mx-auto mb-4">Before &amp; After Zari</p>
              <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[3rem]">
                The difference is specific.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[16px] text-[var(--muted)]">
                Generic feedback doesn&apos;t get you hired. Zari tells you exactly which bullet to fix and how.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <Reveal>
              <div className="before-card">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Before Zari</p>
                <div className="mb-3 flex items-start gap-3 rounded-lg bg-white p-3.5 text-[13.5px] text-[var(--muted)] line-through opacity-60">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--danger)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M18 6L6 18M6 6l12 12" /></svg>
                  Resume score 52/100 · 0 callbacks in 3 weeks
                </div>
                {BEFORE_AFTER.map((item) => (
                  <div key={item.before} className="mb-2 rounded-lg bg-[#FEF2F2] p-3 text-[13px] text-[#991B1B]">
                    {item.before}
                  </div>
                ))}
                <p className="mt-4 text-[12px] text-[var(--muted)]">Task-focused bullets. No metrics. Fails ATS.</p>
              </div>
            </Reveal>
            <Reveal data-delay="2">
              <div className="after-card">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">After Zari</p>
                <div className="mb-3 flex items-start gap-3 rounded-lg p-3.5 text-[13.5px] font-medium text-[#14532D]" style={{ background:"#F0FFF4" }}>
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                  Resume score 89/100 · 4 callbacks in 1 week
                </div>
                {BEFORE_AFTER.map((item) => (
                  <div key={item.after} className="mb-2 rounded-lg p-3 text-[13px] font-medium text-[#14532D]" style={{ background:"#F0FFF4" }}>
                    {item.after}
                  </div>
                ))}
                <p className="mt-4 text-[12px] text-[var(--brand)]">Impact-led bullets. Metrics injected. ATS-optimized.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════ FEATURES (kleo-style left list + right visual) ══════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="kleo-badge mx-auto mb-4">Everything in one place</p>
              <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[3rem]">
                Every tool you need to land the role.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, fi) => (
              <Reveal key={f.title} data-delay={String((fi % 4) + 1) as "1"|"2"|"3"|"4"}>
                <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)] hover:border-[var(--brand)]">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-light)] text-[var(--brand)]">
                    {f.icon}
                  </div>
                  <h3 className="mb-2 text-[15px] font-bold text-[var(--ink)]">{f.title}</h3>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ LIVE AVATAR SHOWCASE ══════ */}
      <section className="overflow-hidden bg-[var(--dark)] py-20 md:py-28 text-white relative">
        <div className="pointer-events-none absolute inset-0 mesh-bg" />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-25" />
        {/* Aurora orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"500px", height:"500px", top:"-10%", left:"15%", background:"rgba(67,97,238,0.14)", filter:"blur(120px)", borderRadius:"50%", animation:"aurora-a 20s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"400px", height:"400px", bottom:"-10%", right:"10%", background:"rgba(6,182,212,0.10)", filter:"blur(100px)", borderRadius:"50%", animation:"aurora-b 24s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"300px", height:"300px", top:"30%", right:"5%", background:"rgba(139,92,246,0.10)", filter:"blur(80px)", borderRadius:"50%", animation:"aurora-c 14s ease-in-out infinite" }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#818CF8]">Live avatar coaching</p>
                <h2 className="text-[2.4rem] font-extrabold leading-tight tracking-[-0.03em] md:text-[3rem]">
                  Talk to a coach,<br />not a chatbot.
                </h2>
                <p className="mt-5 text-[16px] leading-7 text-white/50">
                  Zari has a face, a voice, and four emotional states. It listens, thinks, and responds in real time — every session feels like you&apos;re sitting across from a real coach.
                </p>
                <ul className="mt-7 space-y-3">
                  {["Real-time voice analysis — tone, pace, filler words", "Animated avatar that reacts as you speak", "Session memory that builds across every coaching call", "Switch between text and voice at any point"].map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-[14px] text-white/65">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover)]">
                    Try live coaching →
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal data-delay="2">
              <div className="relative flex items-center justify-center">
                <div className="pointer-events-none absolute inset-0" style={{ background:"radial-gradient(ellipse 70% 60% at 50% 50%, rgba(67,97,238,0.15) 0%, transparent 70%)" }} />
                <div className="relative flex flex-col items-center gap-6">
                  <ZariAvatarDemo size={150} />
                  {/* Live coaching transcript mock */}
                  <div className="w-full max-w-sm">
                    <div className="coach-panel rounded-2xl p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Live session</span>
                      </div>
                      {[
                        { speaker: "You", text: "I want to transition from ops to Senior PM.", you: true },
                        { speaker: "Zari", text: "Your ops background is a differentiator. The gap we need to close is product strategy ownership. Let me ask — have you led any cross-functional initiatives?", you: false },
                      ].map((msg) => (
                        <div key={msg.text} className={`mb-2 rounded-xl px-3 py-2 text-[12px] leading-5 ${msg.you ? "ml-8 bg-[var(--brand)] text-white" : "mr-8 bg-white/08 text-white/70"}`}>
                          <span className="font-semibold text-white/40">{msg.speaker}: </span>
                          {msg.text}
                        </div>
                      ))}
                      {/* Voice bars */}
                      <div className="mt-3 flex items-end justify-center gap-1 py-1">
                        {[12, 20, 28, 16, 24, 18, 12].map((h, i) => (
                          <div key={i} className="w-1 rounded-full bg-[var(--brand)] opacity-70" style={{ height: h, animation:`voice-bar-${(i % 5) + 1} ${0.7 + i * 0.1}s ease-in-out infinite` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════ STATS ══════ */}
      <section className="bg-[var(--bg-alt)] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, si) => (
              <Reveal key={s.label} data-delay={String((si % 4) + 1) as "1"|"2"|"3"|"4"}>
                <div className={`px-8 py-8 text-center ${si < 3 ? "border-b sm:border-b-0 sm:border-r border-[var(--border)]" : ""}`}>
                  <p className="text-[3.2rem] font-extrabold leading-none tracking-tight text-[var(--brand)]">{s.val}</p>
                  <p className="mt-2 text-[13px] leading-5 text-[var(--muted)]">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
                You have questions,<br />we have answers.
              </h2>
            </div>
          </Reveal>
          {[
            { q: "Is the free tier actually useful?", a: "Yes. One session per coaching surface is enough to see whether Zari works for you. Most users have their strongest insight in that first session." },
            { q: "How is this different from ChatGPT?", a: "ChatGPT is a general assistant. Zari is a specialized career coach with four dedicated surfaces, session memory that persists, voice mode, an animated avatar, and outputs designed for job searching — not just a chat window." },
            { q: "What does session memory mean?", a: "Every session is summarized and stored. Session 5 knows exactly what happened in sessions 1–4 — your target role, your blockers, your materials — without you re-explaining anything." },
            { q: "Can I cancel Pro anytime?", a: "Yes. No lock-in. Your history and documents stay accessible on the free tier after you cancel." },
            { q: "Does it work for career changers?", a: "It was built for them. Zari has a dedicated career direction surface and is trained on hundreds of career transition narratives — it can help you reframe your background for a new industry, not just polish an existing one." },
          ].map((faq) => (
            <Reveal key={faq.q}>
              <details className="group border-b border-[var(--border)] py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4">
                  <span className="text-[15px] font-semibold text-[var(--ink)]">{faq.q}</span>
                  <svg className="h-5 w-5 flex-shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="pb-5 text-[14.5px] leading-7 text-[var(--muted)]">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="relative overflow-hidden bg-[var(--brand)] py-20 md:py-24 text-white">
        {/* Animated aurora inside CTA */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"600px", height:"600px", top:"-30%", left:"50%", transform:"translateX(-50%)", background:"rgba(255,255,255,0.12)", filter:"blur(100px)", borderRadius:"50%", animation:"aurora-a 15s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"300px", height:"300px", bottom:"-10%", left:"10%", background:"rgba(6,182,212,0.20)", filter:"blur(80px)", borderRadius:"50%", animation:"aurora-b 18s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"250px", height:"250px", bottom:"-5%", right:"10%", background:"rgba(139,92,246,0.18)", filter:"blur(70px)", borderRadius:"50%", animation:"aurora-c 12s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-10" />
        <div className="mx-auto max-w-2xl px-6 text-center">
          <ZariAvatarDemo size={80} />
          <h2 className="mt-6 text-[2.6rem] font-extrabold tracking-[-0.035em] md:text-[3.2rem]">
            Start coaching today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] text-white/70">
            No card. No friction. Zari is ready when you are.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={userId ? "/dashboard" : "/signup"}
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-[14.5px] font-bold text-[var(--brand)] shadow-[0_4px_24px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5"
            >
              {userId ? "Go to dashboard" : "Get started free"}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/pricing" className="inline-flex h-12 items-center rounded-xl border border-white/30 bg-white/10 px-7 text-[14.5px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              See pricing
            </Link>
          </div>
          <p className="mt-5 text-[12px] text-white/50">Free forever · No credit card · Cancel Pro anytime</p>
        </div>
      </section>

    </PageFrame>

  );
}
