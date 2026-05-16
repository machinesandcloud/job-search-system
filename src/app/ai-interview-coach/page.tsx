import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Interview Coach — Practice & Ace Any Job Interview",
  description:
    "Zari's AI interview coach runs realistic mock interviews with STAR scoring, live feedback, and voice coaching mode. Behavioral, technical, and panel questions — for any role, any time.",
  keywords: [
    "AI interview coach",
    "mock interview AI",
    "interview preparation",
    "job interview coaching",
    "AI interview practice",
    "interview prep tool",
    "STAR method coaching",
    "behavioral interview prep",
    "interview simulator",
    "online interview coach",
  ],
  alternates: { canonical: "/ai-interview-coach" },
  openGraph: {
    title: "Zari AI Interview Coach — Practice Until You're Unbreakable",
    description: "Behavioral, technical, and panel mock interviews with live scoring and voice coaching. Every vague answer caught before the real thing.",
    url: "/ai-interview-coach",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is an AI interview coach?", answer: "An AI interview coach is a software system that conducts realistic mock interviews, evaluates your answers in real time, and delivers specific coaching on structure, evidence, and communication — available 24/7, for any role or seniority level." },
  { question: "What types of interview questions does Zari cover?", answer: "Zari covers behavioral (STAR-method), situational, competency-based, case-study, and technical deep-dive questions. It adapts question difficulty and focus based on your target role and seniority level." },
  { question: "How does Zari score my interview answers?", answer: "Zari uses a 6-dimension STAR scoring framework: Situation clarity, Task defined, Action specificity, Result with metric, Leadership signal, and Communication quality. Each answer gets a score per dimension with specific language fixes." },
  { question: "Can Zari do voice interview coaching?", answer: "Yes. Zari's voice coaching mode lets you speak your answers out loud. The AI evaluates filler words, pacing, structure, and content — mirroring the conditions of a real interview." },
  { question: "Does Zari help with promotion pitches and performance reviews?", answer: "Yes. Beyond job interview prep, Zari coaches promotion pitches, manager conversations, and 360-review narratives — scoring them on leadership signal, scope demonstration, and executive presence." },
];

export default async function AiInterviewCoachPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Interview Coach", url: `${BASE_URL}/ai-interview-coach` }]} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", left: "-8%", background: "#7a8dff", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Interview Coach · Behavioral · Technical · Voice Mode
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            Practice until your answers<br />
            <span style={{ background: "linear-gradient(135deg,#7a8dff,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>are impossible to shake.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Zari's AI interview coach runs realistic mock interviews — behavioral, technical, and panel — with live STAR scoring, specific language fixes, and voice coaching mode. Available 24/7, for any role.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(122,141,255,0.40)] transition-all hover:-translate-y-0.5" style={{ background: "#7a8dff" }}>
              Start interview prep free
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/platform" className="inline-flex h-14 items-center rounded-xl border border-white/15 bg-white/[0.05] px-8 text-[15px] font-semibold text-white/70 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white">
              See the platform
            </Link>
          </div>
          {/* Score visual */}
          <div className="mt-12 inline-flex items-center gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-8 py-5">
            <div className="text-center"><p className="text-[2rem] font-extrabold text-white/30">3/10</p><p className="text-[11px] text-white/25">First answer</p></div>
            <svg className="h-5 w-5 text-[#7a8dff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            <div className="text-center"><p className="text-[2rem] font-extrabold" style={{ color: "#7a8dff" }}>9/10</p><p className="text-[11px] text-white/40">STAR score</p></div>
            <div className="border-l border-white/10 pl-6 text-left"><p className="text-[12px] font-semibold text-white">One session</p><p className="text-[11px] text-white/35">Average improvement</p></div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari's AI interview coach delivers</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#7a8dff", title: "Behavioral interview questions", body: "STAR-framework questions matched to your role and seniority. The coach enforces Situation, Action, and measurable Result mid-answer." },
              { accent: "#0D7182", title: "Technical deep-dives", body: "Probing follow-up questions that expose gaps in reasoning before your interviewer does — adapted to software, product, finance, or any domain." },
              { accent: "#F97316", title: "6-dimension STAR scoring", body: "Every answer is scored immediately on clarity, specificity, result quality, leadership signal, and communication. Specific language to fix, right now." },
              { accent: "#10B981", title: "Voice coaching mode", body: "Speak your answers out loud. Zari evaluates filler words, pacing, confidence, and answer structure — exactly as a live interviewer would." },
              { accent: "#EC4899", title: "Panel interview simulation", body: "Multi-interviewer scenarios where different voices ask from different angles — engineering, product, leadership, cross-functional." },
              { accent: "#4ca7e6", title: "Promotion pitch coaching", body: "Not just job interviews. Zari prepares you for manager conversations, promotion pitches, and skip-level check-ins with the same rigor." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${item.accent}18` }}>
                  <div className="h-2 w-2 rounded-full" style={{ background: item.accent }} />
                </div>
                <h3 className="mb-2 text-[14.5px] font-bold text-[var(--ink)]">{item.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-5">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-3 text-[15px] font-bold text-[var(--ink)]">{f.question}</h3>
                <p className="text-[14px] leading-7 text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#0d0d2b 0%,#3d4a99 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your interview coach is ready now.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">One free interview session. Voice or text. No card required.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#3d4a99] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
