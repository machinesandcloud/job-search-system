import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

const CIRC = 188.5;

const surfaces = [
  {
    num: "01",
    label: "Resume Review",
    headline: "Turn your resume from a liability into a weapon.",
    body: "The coach reads every bullet and scores it on three axes: specificity, ATS signal, and impact. Weak bullets get specific rewrites you can copy immediately. The session doesn't end until your resume is actually better.",
    accent: "var(--brand)",
    accentBg: "rgba(13,113,130,0.12)",
    dark: false,
    tags: ["ATS scoring","Impact bullets","Quantified rewrites","Keyword gaps"],
    preview: (
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[var(--shadow-md)]">
        <div className="border-b border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2.5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
          <span className="text-[11px] font-medium text-[var(--muted)]">resume_final_v3.pdf</span>
          <span className="ml-auto rounded-full bg-[var(--warning-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--warning)]">Score: 72</span>
        </div>
        <div className="space-y-2 p-4">
          {[
            { w:true, t:"Managed team and delivered projects on time" },
            { w:false, t:"Led 8-person eng team shipping 3 features/sprint at 96% uptime" },
            { w:true, t:"Worked with stakeholders to improve performance" },
            { w:false, t:"Cut API p99 latency from 4.2s → 340ms, enabling 2M new users" },
            { w:true, t:"Responsible for data pipeline maintenance" },
            { w:false, t:"Built Kafka pipeline processing 40M events/day at $0.003/1K msgs" },
          ].map((l, i) => (
            <div key={i} className={`flex items-start gap-2 rounded-lg px-3 py-2 text-[11.5px] leading-5 ${l.w ? "bg-[var(--danger-soft)] text-[var(--danger)]" : "bg-[var(--success-soft)] text-[var(--success)]"}`}>
              <span className="mt-0.5 flex-shrink-0 font-bold">{l.w ? "✕" : "✓"}</span>
              <span className={l.w ? "line-through opacity-70" : "font-medium"}>{l.t}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "02",
    label: "LinkedIn Optimization",
    headline: "Make recruiters find you. Not the other way around.",
    body: "Your LinkedIn headline is the most underutilized asset in a job search. The coach rewrites it, rebuilds your About section, and re-frames your experience entries around the role you're targeting. Then gives you a visibility score.",
    accent: "var(--cyan-dim)",
    accentBg: "rgba(114,214,255,0.10)",
    dark: true,
    tags: ["Headline rewrite","About section","Experience framing","Visibility score"],
    preview: null,
  },
  {
    num: "03",
    label: "Mock Interviews",
    headline: "Practice until the story tells itself.",
    body: "Behavioral, technical, or recruiter-style sessions. The coach asks questions, captures your answer, and gives immediate feedback on structure, specificity, and delivery. Weak answers don't pass — you iterate until the STAR is airtight.",
    accent: "var(--purple)",
    accentBg: "rgba(122,141,255,0.10)",
    dark: false,
    tags: ["STAR structure","Behavioral & technical","Transcript saved","Granular feedback"],
    preview: null,
  },
  {
    num: "04",
    label: "Career Direction",
    headline: "Stop guessing what to target next.",
    body: "Tell the coach your background, goals, and blockers. It maps you to the right roles, identifies narrative gaps, and gives you a concrete next-step plan — not motivational platitudes.",
    accent: "var(--amber)",
    accentBg: "rgba(249,115,22,0.10)",
    dark: true,
    tags: ["Role-fit scoring","Narrative gaps","Action plan","Target list"],
    preview: null,
  },
];

export default async function PlatformPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--dark)] pb-28 pt-24 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"700px", height:"700px", top:"-10%", left:"-8%", background:"var(--cyan)", opacity:.09, filter:"blur(150px)", borderRadius:"50%", animation:"float-a 20s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"600px", height:"600px", top:"-5%", right:"-5%", background:"var(--purple)", opacity:.08, filter:"blur(130px)", borderRadius:"50%", animation:"float-b 24s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="absolute left-0 right-0 top-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(114,214,255,0.4) 40%,rgba(122,141,255,0.3) 60%,transparent)" }} />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur-sm">
              Platform
            </div>
            <h1 className="text-[3.2rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
              Four workspaces.<br />
              <span className="gradient-text-animated">One coaching system.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/50">
              Most AI tools give you one generic chat and call it coaching. Askia Coach is built around four dedicated surfaces — each designed for a specific job-to-be-done — with persistent memory that ties every session together.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup" className="group inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_8px_32px_rgba(13,113,130,0.45)]">
                Start free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/use-cases" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 text-[14px] font-medium text-white/65 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white">
                Explore use cases
              </Link>
            </div>
          </div>

          {/* Surface pills */}
          <div className="mt-14 flex flex-wrap gap-3">
            {surfaces.map(s => (
              <div key={s.num} className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
                <span className="text-[11px] font-bold text-white/30">{s.num}</span>
                <span className="text-[13px] font-medium text-white/70">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SURFACE DEEP-DIVES ══════════════════ */}
      {surfaces.map((s, idx) => (
        <section
          key={s.num}
          className={`relative overflow-hidden py-20 md:py-28 ${s.dark ? "noise-overlay bg-[var(--dark)] text-white" : "bg-white"}`}
        >
          {s.dark && (
            <>
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div style={{ position:"absolute", width:"500px", height:"500px", top:idx % 2 === 0 ? "-5%" : "auto", bottom:idx % 2 === 0 ? "auto" : "-5%", left:idx % 2 === 0 ? "-5%" : "auto", right:idx % 2 === 0 ? "auto" : "-5%", background:s.accent, opacity:.08, filter:"blur(120px)", borderRadius:"50%", animation:"float-a 18s ease-in-out infinite" }} />
              </div>
              <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
            </>
          )}

          <div className="relative mx-auto max-w-7xl px-6">
            <div className={`grid gap-14 lg:grid-cols-2 lg:items-center ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>

              {/* Copy */}
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className={`text-[11px] font-bold uppercase tracking-[0.25em] ${s.dark ? "text-white/30" : "text-[var(--muted)]"}`}>{s.num}</span>
                  <div className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide" style={{ background:s.accentBg, color:s.accent }}>{s.label}</div>
                </div>
                <h2 className={`text-[2.4rem] font-extrabold leading-[1.07] tracking-[-0.03em] md:text-[2.8rem] ${s.dark ? "text-white" : "text-[var(--ink)]"}`}>
                  {s.headline}
                </h2>
                <p className={`mt-5 text-[16px] leading-relaxed ${s.dark ? "text-white/48" : "text-[var(--muted)]"}`}>
                  {s.body}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {s.tags.map(tag => (
                    <span key={tag} className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${s.dark ? "border border-white/10 bg-white/[0.06] text-white/60" : "border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--ink-2)]"}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/signup" className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold transition-colors" style={{ color: s.accent }}>
                  Try {s.label} →
                </Link>
              </div>

              {/* Preview / visual */}
              <div className="flex justify-center lg:justify-end">
                {s.preview ? (
                  <div className="w-full max-w-[480px]">{s.preview}</div>
                ) : (
                  <div className="w-full max-w-[480px] overflow-hidden rounded-2xl border p-8" style={{ borderColor: `${s.accent}22`, background: s.accentBg }}>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background:`${s.accent}22` }}>
                        <div className="h-5 w-5 rounded-full" style={{ background: s.accent }} />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold uppercase tracking-wider" style={{ color: s.accent }}>{s.label}</p>
                        <p className={`text-[11px] ${s.dark ? "text-white/30" : "text-[var(--muted)]"}`}>Active session</p>
                      </div>
                      <span className="ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background:`${s.accent}22`, color:s.accent }}>
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background:s.accent }} />
                        Live
                      </span>
                    </div>
                    {/* Chat preview */}
                    <div className="space-y-3">
                      {[
                        { r:"coach", m:"What's the main outcome you need from this session?" },
                        { r:"user",  m: s.num === "02" ? "My LinkedIn gets no traction from recruiters." : s.num === "03" ? "I keep blanking on behavioral questions under pressure." : "I don't know which roles to target next." },
                        { r:"coach", m: s.num === "02" ? "Got it. Let's look at your headline first — what are you targeting?" : s.num === "03" ? "Let's start with a PM story. Tell me about a time you drove a product decision with incomplete data." : "Walk me through your background in 2 minutes. I'll tell you exactly where your narrative breaks." },
                      ].map((msg, i) => (
                        <div key={i} className={`flex ${msg.r === "user" ? "justify-end" : ""}`}>
                          {msg.r === "coach" && <div className="mr-2.5 flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full mt-0.5"><Image src="/askia-logo.png" alt="A" width={24} height={24} /></div>}
                          <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[12.5px] leading-relaxed ${msg.r === "coach" ? (s.dark ? "bg-white/[0.07] text-white/80 rounded-tl-sm" : "bg-[var(--surface-muted)] text-[var(--ink-2)] rounded-tl-sm") : "rounded-tr-sm text-white"}`} style={msg.r === "user" ? { background: s.accent } : {}}>
                            {msg.m}
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full"><Image src="/askia-logo.png" alt="A" width={24} height={24} /></div>
                        <div className={`rounded-2xl rounded-tl-sm px-4 py-3 ${s.dark ? "bg-white/[0.05]" : "bg-[var(--surface-muted)]"}`}>
                          <div className="flex gap-1">{[0,.2,.4].map(d=><span key={d} className={`h-1.5 w-1.5 rounded-full ${s.dark ? "bg-white/40" : "bg-[var(--muted)]"}`} style={{ animation:`blink 1.2s ease-in-out ${d}s infinite` }} />)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ══════════════════ MEMORY SYSTEM ══════════════════ */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--brand)]">Coaching memory</div>
            <h2 className="text-[2.6rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-5xl">Every session builds on the last.</h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] text-[var(--muted)]">Askia Coach doesn&apos;t forget. Your goals, context, uploaded documents, and session recaps persist between every conversation.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon:"🎯", title:"Goals & context", body:"Target roles, blockers, and background captured at onboarding and updated each session.", color:"var(--brand)" },
              { icon:"📄", title:"Uploaded documents", body:"Your resume and LinkedIn drafts live in dedicated workspaces, always available and always versioned.", color:"var(--cyan-dim)" },
              { icon:"📋", title:"Session recaps", body:"Every session ends with a recap, action plan, and coaching notes — visible on your dashboard.", color:"var(--purple)" },
            ].map(card => (
              <div key={card.title} className="group hover-lift rounded-2xl border border-[var(--border)] bg-white p-7 shadow-[var(--shadow)]">
                <div className="mb-5 text-3xl">{card.icon}</div>
                <h3 className="text-[16px] font-bold text-[var(--ink)]">{card.title}</h3>
                <p className="mt-2.5 text-[14px] leading-6 text-[var(--muted)]">{card.body}</p>
                <div className="mt-5 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-16" style={{ background: card.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background:"linear-gradient(135deg, #052830 0%, var(--brand) 40%, #063844 70%, var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0">
          <div style={{ position:"absolute", left:"-5%", top:"-10%", width:"500px", height:"500px", background:"var(--cyan)", opacity:.12, filter:"blur(120px)", borderRadius:"50%", animation:"float-b 18s ease-in-out infinite" }} />
          <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:"450px", height:"450px", background:"var(--purple)", opacity:.10, filter:"blur(110px)", borderRadius:"50%", animation:"float-a 22s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute left-0 right-0 top-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(114,214,255,0.5) 40%,transparent)" }} />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm">
            <Image src="/askia-logo.png" alt="Askia" width={40} height={40} className="rounded-xl" />
          </div>
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em] md:text-[3.5rem]">Ready to start?</h2>
          <p className="mx-auto mt-5 max-w-md text-[17px] text-white/55">Free to start. No credit card. Better coaching from the first session.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/signup" className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] shadow-[0_8px_40px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(255,255,255,0.28)]">
              Start coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/pricing" className="inline-flex h-14 items-center rounded-xl border border-white/20 bg-white/[0.05] px-8 text-[15px] font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.10] hover:text-white">
              View pricing
            </Link>
          </div>
        </div>
      </section>

    </PageFrame>
  );
}
