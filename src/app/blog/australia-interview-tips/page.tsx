import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Australia Interview Tips 2025 — How to Ace Job Interviews in Australia",
  description: "How to interview successfully in Australia: cultural norms, common questions, what Aussie employers actually want, and how Australian interviews differ from the US and UK.",
  keywords: ["australia interview tips", "job interview Australia", "how to interview in Australia", "Australian interview tips", "Australia job interview questions", "interview culture Australia", "Australian workplace culture interview", "job interview tips Australia 2025"],
  alternates: { canonical: "/blog/australia-interview-tips" },
  openGraph: { title: "Australia Interview Tips 2025 — Ace Job Interviews in Australia", description: "Cultural norms, common questions, and what Australian employers actually want in 2025.", url: "/blog/australia-interview-tips" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Are Australian job interviews formal or casual?", answer: "More casual than the US or UK, but still professional. Australian interviewers tend to build rapport quickly, use first names, and don't expect excessive formality. The culture is direct — they'll ask clear questions and expect clear answers. Don't mistake the relaxed tone for a relaxed standard; Aussie interviewers are still evaluating you rigorously, just without ceremony." },
  { question: "What is a selection criteria response in Australian government interviews?", answer: "Australian public service roles require written selection criteria responses — short structured statements (usually 300–500 words each) addressing each key selection criterion (KSC). Each response should follow a STAR-like format: context, specific actions you took, and the quantified result. These are read before the interview and often revisited in it." },
  { question: "How long do Australian job interviews typically last?", answer: "For standard roles: 30–60 minutes. Panel interviews (common in government, healthcare, and education) typically run 45–90 minutes. Structured behavioural interviews at large Australian companies like the Big Four banks, BHP, Telstra, or Woolworths can run 60–90 minutes with structured scoring sheets." },
  { question: "Do Australian employers check references before or after the interview?", answer: "After. The standard process in Australia is: application → phone screen → interview(s) → reference checks → offer. References are taken seriously — two professional referees are typically required, and some employers call all of them. Never list someone who will give a lukewarm reference." },
];

const CULTURAL_TIPS = [
  { icon: "🤝", title: "Directness is respected", body: "Australians value straightforward communication. Waffle and padding are noticed negatively. Get to the point — give your example, state the outcome, stop." },
  { icon: "🧑‍🤝‍🧑", title: "Humility over self-promotion", body: "Heavy self-promotion can read as arrogance. Frame achievements as team contributions or problems solved — not personal brand statements. 'We achieved X' with your specific role described lands better than 'I single-handedly delivered X.'" },
  { icon: "😄", title: "Warmth and humour are welcome", body: "Appropriate light humour and a genuine smile are assets in Australian interviews. The interviewer often wants to know if you're someone the team will enjoy working with — fit matters as much as credentials." },
  { icon: "⚡", title: "Preparation is expected but not performed", body: "Showing you've researched the company matters. But reciting facts robotically comes across poorly. Weave your knowledge naturally into your answers." },
  { icon: "🎯", title: "Behavioural questions dominate", body: "STAR-format behavioural questions are the backbone of Australian structured interviews. Prepare 8–10 strong stories covering leadership, conflict, results, failure, and collaboration." },
  { icon: "💬", title: "Ask questions — it's expected", body: "Not asking questions signals low interest. Prepare 3–4 thoughtful questions about the role, team culture, and what success looks like in the first 90 days." },
];

export default async function AustraliaInterviewTipsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Australia Interview Tips 2025" description="How to ace job interviews in Australia — cultural norms, common questions, and what Aussie employers want." url={`${BASE_URL}/blog/australia-interview-tips`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Australia Interview Tips", url: `${BASE_URL}/blog/australia-interview-tips` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #002244 0%, #00843D 55%, #FFCD00 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Interview Prep · Australia</span>
            <span className="text-[12px] text-white/35">14 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Australia Interview Tips 2025</h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">Aussie interview culture is friendlier than you expect — but the bar is just as high. Here&apos;s what actually matters when interviewing in Australia.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">Australian interview culture — what&apos;s different</h2>
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CULTURAL_TIPS.map(({ icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mb-2 text-2xl">{icon}</div>
                <h3 className="mb-1 font-bold text-[14px] text-[#00843D]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Common Australian interview questions</h2>
          <div className="mb-12 space-y-3">
            {[
              { q: "Tell me about yourself.", tip: "Keep it to 90 seconds. Career arc → why this role → why now. Don't start from childhood or your first job." },
              { q: "Why do you want to work for [company]?", tip: "Specific and researched. Reference their recent initiatives, values, or industry position — not generic reasons." },
              { q: "Tell me about a time you dealt with a difficult stakeholder.", tip: "Classic Aussie behavioural. Show you didn't avoid conflict — you navigated it professionally and maintained the relationship." },
              { q: "What are your salary expectations?", tip: "Research market rates on SEEK and Glassdoor. Give a range anchored to the top of market: 'Based on my research and experience, I'm targeting $X–$Y.' Don't lowball." },
              { q: "Where do you see yourself in five years?", tip: "Show ambition aligned with the company's growth. Mention skills you want to build, not just titles you want." },
              { q: "What's your greatest weakness?", tip: "Real weakness + what you've actively done to address it. Never 'I work too hard' — Australians find that kind of non-answer patronising." },
              { q: "Do you have the right to work in Australia?", tip: "This is asked routinely for compliance, especially for roles requiring security clearance or citizenship. Answer clearly and upfront." },
            ].map(({ q, tip }, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-start gap-3 border-b border-[var(--border)] p-4">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#00843D]/10 text-[11px] font-extrabold text-[#00843D]">{i + 1}</span>
                  <p className="font-semibold text-[14px]">{q}</p>
                </div>
                <div className="flex items-start gap-2 px-4 py-3">
                  <span className="mt-0.5 flex-shrink-0 text-[10px] font-bold uppercase text-[var(--muted)]">Tip</span>
                  <p className="text-[13px] leading-5 text-[var(--muted)]">{tip}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Government & public sector selection criteria</h2>
          <p className="mb-5 text-[14px] leading-7 text-[var(--muted)]">Australian Public Service (APS) roles and many state government positions use a formal selection criteria framework. Applications require written responses to Key Selection Criteria (KSC) before you get an interview — and interview questions directly reference these responses.</p>
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            {[
              { phase: "Written application", detail: "Address each KSC in 300–500 words using STAR structure. This is read before you're shortlisted." },
              { phase: "Shortlisting", detail: "Panel scores written responses. Only candidates above threshold are interviewed." },
              { phase: "Panel interview", detail: "2–4 interviewers, typically from different levels. Questions directly reference KSC. Answers are scored against a matrix." },
              { phase: "Reference checks", detail: "2–3 referees contacted, often with structured questions mapped to the same KSC criteria." },
            ].map(({ phase, detail }) => (
              <div key={phase} className="grid grid-cols-[180px_1fr] border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold text-[#002244]">{phase}</span>
                <span className="text-[var(--muted)]">{detail}</span>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Industry-specific tips</h2>
          <div className="mb-10 space-y-3">
            {[
              { sector: "Big Four banks (ANZ, CBA, NAB, Westpac)", tip: "Structured competency interviews with scoring rubrics. Research the specific bank's values and prepare examples mapped to each. Expect a values alignment component." },
              { sector: "Mining & Resources (BHP, Rio Tinto, Fortescue)", tip: "Safety culture is non-negotiable. Expect questions on safety incidents, near-misses you've observed, and how you've contributed to a safety-first environment. Never understate safety awareness." },
              { sector: "Tech (Atlassian, Canva, Afterpay, etc.)", tip: "Similar to US tech interviews — systems design, algorithmic thinking for engineering, product sense for PM roles. Aussie tech startups value outcome stories over credential recitation." },
              { sector: "Healthcare & aged care", tip: "Person-centred care values dominate. Expect scenarios testing empathy, ethical decision-making, and compliance with Australian aged care standards." },
            ].map(({ sector, tip }) => (
              <div key={sector} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 font-bold text-[14px]">{sector}</div>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #002244 0%, #00843D 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold">Practice for your Australian interview.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari simulates Australian-style behavioural interviews with STAR scoring, cultural context feedback, and government selection criteria prep.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#002244]">Start interview prep free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
