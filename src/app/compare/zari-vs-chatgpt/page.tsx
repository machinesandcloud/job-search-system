import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs ChatGPT for Career Coaching — Which Is Better? (2025)",
  description:
    "Comparing Zari and ChatGPT for resume writing, interview prep, and career coaching. ChatGPT is a general AI. Zari is purpose-built for career coaching with session memory and real-time feedback.",
  keywords: ["Zari vs ChatGPT", "ChatGPT for career coaching", "ChatGPT resume help", "ChatGPT career advice", "AI career coach vs ChatGPT", "ChatGPT for job search", "ChatGPT resume writing", "ChatGPT interview prep"],
  alternates: { canonical: "/compare/zari-vs-chatgpt" },
  openGraph: { title: "Zari vs ChatGPT for Career Coaching — Which Is Better? (2025)", description: "ChatGPT is a general-purpose AI. Zari is built specifically for career coaching. Here's what that difference means in practice.", url: "/compare/zari-vs-chatgpt" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Can ChatGPT help with resumes and job interviews?", answer: "Yes — ChatGPT can write resume bullets, suggest improvements, and give you mock interview questions. The limitation is that it's a general-purpose AI: it doesn't know your specific job target, it doesn't have session memory, it can't score your resume against a specific job description in real-time, and it doesn't give structured STAR evaluation on your interview answers. You can get useful output from ChatGPT with skilled prompting, but it requires significant manual work to use well." },
  { question: "What does Zari do that ChatGPT can't?", answer: "Zari is purpose-built for career coaching: it reads your resume and the specific job description together and tells you exactly what's missing. It scores your ATS match against that job. It remembers your career history across sessions so you don't have to re-explain yourself every time. It gives structured STAR evaluation on your interview answers (not just 'here's a better version'). And it tracks your coaching progress across resume, LinkedIn, interviews, and negotiation in one place." },
  { question: "Which should I use — Zari or ChatGPT?", answer: "They're complementary but serve different purposes. Use ChatGPT for general writing help, brainstorming, and quick drafts. Use Zari when you need structured career coaching: ATS analysis, live interview coaching, LinkedIn optimization scored against recruiter search patterns, and salary negotiation preparation. For job search specifically, Zari is the focused tool." },
];

const ROWS = [
  { feature: "Resume ATS scoring vs specific JD", zari: true, gpt: false },
  { feature: "Resume rewriting (not just feedback)", zari: true, gpt: "Manual" },
  { feature: "Session memory (knows your history)", zari: true, gpt: false },
  { feature: "Mock interview with STAR evaluation", zari: true, gpt: "Partial" },
  { feature: "Live interview answer coaching", zari: true, gpt: "Partial" },
  { feature: "LinkedIn profile scoring", zari: true, gpt: false },
  { feature: "Salary negotiation coaching", zari: true, gpt: "Partial" },
  { feature: "Career-specific question banks", zari: true, gpt: false },
  { feature: "Progress tracking across sessions", zari: true, gpt: false },
  { feature: "General writing and content help", zari: false, gpt: true },
  { feature: "Code generation", zari: false, gpt: true },
  { feature: "Free tier", zari: true, gpt: true },
];

export default async function ZariVsChatGPTPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs ChatGPT", url: `${BASE_URL}/compare/zari-vs-chatgpt` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Zari vs ChatGPT · 2025 Comparison
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">
            Zari vs ChatGPT for Career Coaching
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            ChatGPT is a general-purpose AI that can help with career tasks if you know how to prompt it. Zari is built specifically for career coaching. Here&apos;s what that difference means in practice.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">ChatGPT (OpenAI)</div>
              <h2 className="mb-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">General-purpose AI</h2>
              <p className="text-[14px] leading-7 text-[var(--muted)]">
                ChatGPT can write resume bullets, suggest edits, and answer interview questions if you give it the right context. The gap: it doesn&apos;t remember your career history between sessions, it can&apos;t score your resume against a specific job description, and it gives general feedback rather than structured STAR coaching. You can get useful output — but the prompting and context management is your job.
              </p>
              <div className="mt-5 text-[13px] font-semibold text-[var(--muted)]">Best for: General writing, brainstorming, quick drafts</div>
            </div>
            <div className="rounded-2xl border-2 border-[var(--brand)] bg-[var(--brand)]/[0.03] p-8">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari AI Career Coach</div>
              <h2 className="mb-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Purpose-built for job search</h2>
              <p className="text-[14px] leading-7 text-[var(--muted)]">
                Zari is trained specifically for career coaching: it reads your resume and the job description together, scores your ATS match, remembers your history across sessions, runs structured mock interviews with STAR evaluation, and coaches you through salary negotiation. No prompting required — just talk to it like a career coach.
              </p>
              <div className="mt-5 text-[13px] font-semibold text-[var(--brand)]">Best for: Resume, interviews, LinkedIn, negotiation, career strategy</div>
            </div>
          </div>

          <h2 className="mb-6 mt-16 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">The key differences</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { title: "Session memory", body: "Zari remembers your career history, target roles, and coaching progress across sessions. ChatGPT starts fresh every conversation — you have to re-explain your background every time you want career help.", advantage: "Zari" },
              { title: "ATS scoring against the job", body: "Zari reads your resume and a specific job description together and tells you exactly which keywords are missing and why your match score is what it is. ChatGPT gives general resume advice — it doesn't score against a specific JD.", advantage: "Zari" },
              { title: "STAR interview evaluation", body: "Zari evaluates your interview answers against the STAR framework and gives specific feedback on what's missing. ChatGPT can rewrite your answer — but it doesn't tell you where your Situation was too vague or your Result was missing.", advantage: "Zari" },
              { title: "General flexibility", body: "ChatGPT can help with almost anything: emails, code, research, creative writing. Zari is focused on career coaching. If you need a general-purpose AI, ChatGPT has the broader range.", advantage: "ChatGPT" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-bold text-[var(--ink)]">{item.title}</p>
                  <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: item.advantage === "Zari" ? "rgba(13,113,130,0.1)" : "rgba(16,185,129,0.1)", color: item.advantage === "Zari" ? "var(--brand)" : "#10B981" }}>
                    {item.advantage} wins
                  </span>
                </div>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-8 mt-16 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Feature comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-5 py-4 text-left font-semibold text-[var(--muted)]">Feature</th>
                  <th className="px-5 py-4 text-center font-bold text-[var(--brand)]">Zari</th>
                  <th className="px-5 py-4 text-center font-semibold text-[var(--muted)]">ChatGPT</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-[var(--bg)]"}>
                    <td className="px-5 py-3.5 text-[var(--ink)]">{row.feature}</td>
                    <td className="px-5 py-3.5 text-center">
                      {row.zari === true ? <span className="text-[var(--brand)]">✓</span> : row.zari === false ? <span className="text-[var(--muted)] opacity-30">—</span> : <span className="text-[12px] text-[var(--muted)]">{row.zari}</span>}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {row.gpt === true ? <span className="text-emerald-600">✓</span> : row.gpt === false ? <span className="text-[var(--muted)] opacity-30">—</span> : <span className="text-[12px] text-[var(--muted)]">{row.gpt}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mb-6 mt-16 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-2 text-[14px] font-bold text-[var(--ink)]">{f.question}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Try the AI career coach built for your job search — free.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] text-white/55">No prompting required. Resume, LinkedIn, interviews, and salary negotiation — all in one place.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
