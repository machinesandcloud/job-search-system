import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

const cases = [
  {
    num: "01",
    tag: "Resume Review",
    headline: "Stop sending resumes that don't get read.",
    problem: "Your resume gets 6 seconds. If the first bullet doesn't prove scope and impact, the recruiter moves on. Most candidates never know why they're not hearing back.",
    solution: "Askia Coach reads every bullet for specificity, ATS signal, and measurable impact. Weak bullets get concrete rewrites — not vague suggestions. You leave with a version you can send tonight.",
    outcomes: ["Specific, quantified bullet rewrites","ATS keyword gap analysis","Clarity + structure scoring","Full resume scored on 3 axes"],
    href: "/workspaces/resume",
    accent: "var(--brand)",
    accentBg: "rgba(13,113,130,0.10)",
    dark: false,
    quote: { text: "The coach rewrote 6 bullets in 20 minutes. I went from no callbacks to 4 interview requests in one week.", name: "Marcus T.", role: "Senior PM" },
  },
  {
    num: "02",
    tag: "LinkedIn Optimization",
    headline: "Make recruiters find you — without cold-applying.",
    problem: "LinkedIn works for passive candidates who are findable. If your headline reads like a job description and your About section is a paragraph you've been embarrassed by for 3 years, you're invisible.",
    solution: "Headline, About, and experience sections rebuilt for your target role. The coach gives you a visibility score before and after — and explains exactly what's suppressing recruiter search results.",
    outcomes: ["Headline rewritten for search visibility","About section rebuilt from scratch","Experience re-framed by target role","Visibility score + keyword gaps"],
    href: "/workspaces/linkedin",
    accent: "var(--cyan-dim)",
    accentBg: "rgba(114,214,255,0.08)",
    dark: true,
    quote: { text: "My LinkedIn views went up 3.4× in two weeks. Three recruiter messages I actually wanted.", name: "Kezia M.", role: "Data Engineer" },
  },
  {
    num: "03",
    tag: "Mock Interviews",
    headline: "Practice until the right answer feels instinctive.",
    problem: "Everyone blanks under pressure. The issue isn't nerves — it's that your answers aren't practiced enough to survive them. Generic prep doesn't fix specific delivery problems.",
    solution: "The coach asks real questions, captures your answer, and immediately tells you what was vague, what lacked evidence, and what was strong. You iterate until the answer is actually good.",
    outcomes: ["Behavioral, technical & recruiter modes","STAR structure feedback per answer","Transcript saved to recap","Specific rewrite suggestions on weak answers"],
    href: "/interview",
    accent: "var(--purple)",
    accentBg: "rgba(122,141,255,0.08)",
    dark: false,
    quote: { text: "I'd been giving vague answers for months and didn't know it. After 2 mock sessions I could tell immediately when an answer was missing a metric.", name: "Jordan K.", role: "Product Designer" },
  },
  {
    num: "04",
    tag: "Career Direction",
    headline: "Stop applying everywhere. Get clear on the right target.",
    problem: "Spray-and-pray job searching is exhausting and demoralizing. Most candidates apply to the wrong roles, with the wrong narrative, wondering why nothing is working.",
    solution: "The coach maps your background to specific role types, identifies where your narrative breaks, and builds you a target list with a 30-day focus plan. No vague advice.",
    outcomes: ["Role-fit scoring from your background","Narrative gap identification","30-day focus plan","Target company list by fit level"],
    href: "/coach",
    accent: "var(--amber)",
    accentBg: "rgba(249,115,22,0.08)",
    dark: true,
    quote: { text: "I had been applying to the wrong roles for 3 months. One career direction session clarified exactly what I should be targeting and why.", name: "Daniel A.", role: "Engineering Manager" },
  },
];

export default async function UseCasesPage() {
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
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur-sm">
            Use Cases
          </div>
          <h1 className="max-w-3xl text-[3.2rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            Every job search problem.<br />
            <span className="gradient-text-animated">A specific solution.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/50">
            Askia Coach doesn&apos;t treat every job search problem the same. Four dedicated surfaces, each built around a specific candidate need.
          </p>
          {/* Use case quick nav */}
          <div className="mt-10 flex flex-wrap gap-3">
            {cases.map(c => (
              <Link key={c.num} href={c.href} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white/60 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white">
                <span className="text-[10px] text-white/25">{c.num}</span>
                {c.tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ USE CASE STRIPS ══════════════════ */}
      {cases.map((c, idx) => (
        <section
          key={c.num}
          className={`relative overflow-hidden py-20 md:py-28 ${c.dark ? "noise-overlay bg-[var(--dark)] text-white" : "bg-white"}`}
        >
          {c.dark && (
            <>
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div style={{ position:"absolute", width:"500px", height:"500px", top:"-5%", right:"-5%", background:c.accent, opacity:.08, filter:"blur(120px)", borderRadius:"50%", animation:"float-b 18s ease-in-out infinite" }} />
              </div>
              <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
            </>
          )}

          <div className="relative mx-auto max-w-7xl px-6">
            <div className={`grid gap-14 lg:grid-cols-[1fr_480px] lg:items-start ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>

              {/* Copy side */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className={`text-[11px] font-bold uppercase tracking-[0.25em] ${c.dark ? "text-white/25" : "text-[var(--muted)]"}`}>{c.num}</span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide" style={{ background:c.accentBg, color:c.accent }}>{c.tag}</span>
                </div>
                <h2 className={`text-[2.4rem] font-extrabold leading-[1.07] tracking-[-0.03em] md:text-[2.8rem] ${c.dark ? "text-white" : "text-[var(--ink)]"}`}>
                  {c.headline}
                </h2>

                {/* Problem / Solution */}
                <div className="mt-8 space-y-5">
                  <div className={`rounded-2xl border p-5 ${c.dark ? "border-white/[0.08] bg-white/[0.03]" : "border-[var(--danger)]/15 bg-[var(--danger-soft)]/40"}`}>
                    <p className={`mb-2 text-[10px] font-bold uppercase tracking-wider ${c.dark ? "text-white/30" : "text-[var(--danger)]"}`}>The problem</p>
                    <p className={`text-[14px] leading-7 ${c.dark ? "text-white/55" : "text-[var(--ink-2)]"}`}>{c.problem}</p>
                  </div>
                  <div className={`rounded-2xl border p-5 ${c.dark ? "border-white/[0.08] bg-white/[0.05]" : "border-[var(--brand)]/15 bg-[var(--brand-light)]/60"}`}>
                    <p className={`mb-2 text-[10px] font-bold uppercase tracking-wider ${c.dark ? "text-white/30" : "text-[var(--brand)]"}`}>The solution</p>
                    <p className={`text-[14px] leading-7 ${c.dark ? "text-white/70" : "text-[var(--ink-2)]"}`}>{c.solution}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href={c.href} className="group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[14px] font-semibold text-white shadow-md transition-all hover:-translate-y-0.5" style={{ background:c.accent, boxShadow:`0 4px 20px ${c.accentBg}` }}>
                    Open {c.tag} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>

              {/* Visual side */}
              <div>
                {/* Outcome list */}
                <div className={`mb-5 overflow-hidden rounded-2xl border ${c.dark ? "border-white/[0.08] bg-white/[0.04]" : "border-[var(--border)] bg-[var(--surface-muted)]"}`}>
                  <div className={`border-b px-5 py-3.5 ${c.dark ? "border-white/[0.07]" : "border-[var(--border)]"}`}>
                    <p className={`text-[11px] font-semibold uppercase tracking-wider ${c.dark ? "text-white/30" : "text-[var(--muted)]"}`}>What you walk away with</p>
                  </div>
                  <div className="space-y-0 divide-y" style={{ borderColor: c.dark ? "rgba(255,255,255,0.05)" : "var(--border)" }}>
                    {c.outcomes.map((o, i) => (
                      <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background:`${c.accentBg}` }}>
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color:c.accent }}><polyline points="20,6 9,17 4,12" /></svg>
                        </div>
                        <span className={`text-[13.5px] ${c.dark ? "text-white/65" : "text-[var(--ink-2)]"}`}>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className={`rounded-2xl border p-5 ${c.dark ? "border-white/[0.08] bg-white/[0.04]" : "border-[var(--border)] bg-white shadow-[var(--shadow)]"}`}>
                  <div className="mb-3 flex gap-1">
                    {[...Array(5)].map((_, i) => <svg key={i} className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <p className={`text-[13px] leading-6 italic ${c.dark ? "text-white/60" : "text-[var(--ink-2)]"}`}>&ldquo;{c.quote.text}&rdquo;</p>
                  <div className="mt-3 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black text-white" style={{ background:c.accent }}>
                      {c.quote.name.split(" ").map(p=>p[0]).join("")}
                    </div>
                    <div>
                      <p className={`text-[12px] font-semibold ${c.dark ? "text-white/70" : "text-[var(--ink)]"}`}>{c.quote.name}</p>
                      <p className={`text-[10.5px] ${c.dark ? "text-white/30" : "text-[var(--muted)]"}`}>{c.quote.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background:"linear-gradient(135deg,#052830 0%,var(--brand) 40%,#063844 70%,var(--dark) 100%)" }}>
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
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em] md:text-[3.5rem]">Pick your first use case.</h2>
          <p className="mx-auto mt-5 max-w-md text-[17px] text-white/55">Free to start. The first session is always the most clarifying.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {[
              { label:"Resume Review", href:"/workspaces/resume" },
              { label:"LinkedIn", href:"/workspaces/linkedin" },
              { label:"Mock Interview", href:"/interview" },
              { label:"Career Direction", href:"/coach" },
            ].map(btn => (
              <Link key={btn.label} href={btn.href} className="inline-flex h-12 items-center rounded-xl border border-white/15 bg-white/[0.07] px-5 text-[13.5px] font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.14] hover:text-white">
                {btn.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

    </PageFrame>
  );
}
