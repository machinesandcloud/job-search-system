import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "UK Interview Tips 2025 — How to Ace a British Job Interview",
  description: "UK-specific interview tips covering competency-based interviews, NHS interviews, assessment centres, City firm interviews, and how UK interview culture differs from the US.",
  keywords: ["UK interview tips", "job interview UK", "how to ace a UK interview", "competency based interview UK", "NHS interview tips", "assessment centre UK", "UK interview questions 2025", "interview tips UK 2025"],
  alternates: { canonical: "/blog/uk-interview-tips" },
  openGraph: { title: "UK Interview Tips 2025 — Ace Your British Job Interview", description: "Competency interviews, NHS coaching, assessment centres, and the UK vs US interview culture gap.", url: "/blog/uk-interview-tips" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is a competency-based interview?", answer: "A competency-based interview asks you to demonstrate specific skills using real examples from your past. Rather than 'what would you do if...', they ask 'tell me about a time when...'. Common UK competency frameworks include: NHS Leadership Framework, Civil Service Success Profiles, and employer-specific competency models (like HSBC's 9 strengths or Deloitte's consulting competencies). The STAR structure (Situation, Task, Action, Result) is the standard format for answering these questions." },
  { question: "How do UK interviews differ from American interviews?", answer: "UK interviews are typically more formal, less self-promotional, and more focused on evidence-based assessment. In the US, it's expected to 'sell yourself'; in the UK, excessive self-promotion can read as arrogance. UK employers value understatement, collegiality, and humility alongside competence. UK panel interviews (2–3 interviewers) are more common than in the US." },
  { question: "What should I wear to a UK job interview?", answer: "The standard for most UK professional roles is business professional (suit, or smart formal wear). For tech startups and creative agencies, smart casual (no tie, no suit, but clean and professional) is acceptable. When in doubt, overdress. The NHS and public sector trend formal. City finance firms trend very formal (dark suit, white shirt)." },
  { question: "How do I prepare for an NHS interview?", answer: "NHS interviews are competency-based, structured around the NHS's 6 Core Values: Working Together for Patients, Respect and Dignity, Commitment to Quality, Compassion, Improving Lives, and Everybody Counts. For each value, prepare a specific real story that demonstrates it. Use STAR structure. NHS hiring panels typically have 2–3 interviewers and will ask exactly one question per competency — your full STAR story is the expected response." },
];

const INTERVIEW_TYPES = [
  {
    type: "Competency-Based Interview",
    usage: "NHS, Civil Service, Big 4 consulting, banking",
    format: "Panel of 2–3 interviewers, 4–8 structured questions, 20–30 min",
    prep: "Prepare 6–8 STAR stories covering leadership, teamwork, problem-solving, and client/patient interaction.",
    color: "#0D7182",
  },
  {
    type: "Strengths-Based Interview",
    usage: "Unilever, Deloitte, EY, National Grid",
    format: "Rapid-fire questions about what you enjoy, what energises you — no STAR expected",
    prep: "Be authentic. These interviews are designed to detect rehearsed STAR answers. Know what genuinely motivates you.",
    color: "#7C3AED",
  },
  {
    type: "Assessment Centre",
    usage: "Graduate schemes, civil service, banking",
    format: "Half or full-day with group exercises, written exercises, presentations, and interviews",
    prep: "Practise group exercises, prepare a 5-min presentation, do a psychometric test (SHL, Cubiks) simulation.",
    color: "#D97706",
  },
  {
    type: "Case Interview",
    usage: "Management consulting (McKinsey, BCG, Bain, KPMG)",
    format: "1-hour structured problem-solving exercise with business case + numerical analysis",
    prep: "Practise 20+ cases. The structure matters as much as the answer.",
    color: "#059669",
  },
  {
    type: "Telephone / Video Screen",
    usage: "Almost all employers — first-round filter",
    format: "20–30 min, 4–6 questions, conversational tone",
    prep: "Prepare your 60-second pitch, research the company, have 2 questions ready.",
    color: "#6B7280",
  },
];

export default async function UkInterviewTipsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="UK Interview Tips 2025" description="UK-specific interview coaching covering competency-based interviews, NHS, assessment centres, and the UK vs US gap." url={`${BASE_URL}/blog/uk-interview-tips`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "UK Interview Tips", url: `${BASE_URL}/blog/uk-interview-tips` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #012169 0%, #0D4C8E 55%, #052830 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">🇬🇧 UK Guide</span>
            <span className="text-[12px] text-white/35">13 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">UK Interview Tips 2025:<br /><span className="text-white/55">How to Ace a British Job Interview</span></h1>
          <p className="mt-5 text-[15px] leading-7 text-white/50">Competency-based interviews, NHS coaching, assessment centres, City firm formats, and how British interview culture differs from what most guides teach.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={68} suffix="%" label="of UK interviews use competency-based questions" accent="#012169" />
            <StatCard value={3} label="panel interviewers on average for UK corporate roles" accent="#0D7182" />
            <StatCard value={85} suffix="%" label="of UK assessment centres involve group exercises" accent="#7C3AED" />
            <StatCard value={6} label="NHS core values — basis for all NHS competency interviews" accent="#059669" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15px] leading-8 text-[var(--muted)]">

          <div className="rounded-2xl border border-[#012169]/15 bg-[#012169]/[0.04] p-5">
            <p className="text-[14px] font-medium text-[#012169]">UK job interviews operate by different rules than US or Australian interviews. This guide is written specifically for UK employer formats. For general interview prep, see our <Link href="/blog/how-to-prepare-for-job-interview" className="underline">interview preparation guide</Link>.</p>
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">UK interview formats — what to expect</h2>
          <div className="space-y-4">
            {INTERVIEW_TYPES.map((t) => (
              <div key={t.type} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-5 py-4">
                  <p className="font-extrabold text-[var(--ink)]">{t.type}</p>
                  <span className="rounded-full px-3 py-1 text-[10px] font-bold" style={{ background: `${t.color}15`, color: t.color }}>
                    {t.usage.split(",")[0]}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Format</p>
                    <p className="text-[13.5px] leading-6">{t.format}</p>
                    <p className="mt-2 text-[12px] text-[var(--muted)]">Used by: {t.usage}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: t.color }}>How to prepare</p>
                    <p className="text-[13.5px] leading-6">{t.prep}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">The UK vs US interview culture gap</h2>
          <p>If you&apos;ve prepared using American interview guides, you may be overconfident in ways that backfire in UK interviews.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Dimension</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#012169]">🇬🇧 UK style</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">🇺🇸 US style</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Self-promotion", "Understated — let achievements speak for themselves", "Explicit — 'I am excellent at X'"],
                  ["Team vs. individual", "'We achieved X — my contribution was Y'", "'I achieved X'"],
                  ["Formality", "More formal — title use, structured questions", "More casual — first names, flexible"],
                  ["Small talk", "Expected and valued — shows cultural fit", "Optional — often skipped"],
                  ["Questions at end", "2–3 thoughtful questions expected", "1–3 questions expected"],
                  ["Follow-up", "Thank-you email: nice but not expected", "Thank-you email: expected within 24h"],
                ].map(([dim, uk, us], i) => (
                  <tr key={dim} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--bg)]/50" : "bg-white"}`}>
                    <td className="px-5 py-3.5 font-medium text-[var(--ink)]">{dim}</td>
                    <td className="px-4 py-3.5 text-[#012169]">{uk}</td>
                    <td className="px-5 py-3.5 text-[var(--muted)]">{us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">NHS interviews: the complete guide</h2>
          <p>NHS interviews are among the most structured in the UK. Every question maps directly to one of the NHS core values.</p>
          <div className="space-y-3">
            {[
              { value: "Working Together for Patients", q: "Tell me about a time you collaborated with others to improve patient/client outcomes", tip: "Show cross-team collaboration — ideally with non-clinical staff or other departments" },
              { value: "Respect and Dignity", q: "Describe a time you maintained dignity and respect for someone in a challenging situation", tip: "Use a specific patient/client example — vague answers don&apos;t score well" },
              { value: "Commitment to Quality", q: "Give an example of when you identified a quality or safety issue and what you did about it", tip: "Include the escalation process and outcome — panels want to see judgment + process" },
              { value: "Compassion", q: "Tell me about a time you showed compassion to someone who was distressed", tip: "Emotional authenticity matters here — don&apos;t make this clinical and process-heavy" },
              { value: "Improving Lives", q: "Describe a time you contributed to improving care or outcomes for a patient/service user", tip: "Quantify the improvement if possible — even 'reduced wait time by 20%' adds weight" },
              { value: "Everybody Counts", q: "Tell me about a time you ensured fair and equitable treatment for all", tip: "Include diversity/inclusion angle — NHS panels explicitly score this dimension" },
            ].map((item) => (
              <div key={item.value} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-[#0D7182]/10 px-2 py-0.5 text-[10px] font-bold text-[#0D7182] uppercase tracking-wider">{item.value}</span>
                </div>
                <p className="text-[13px] font-semibold text-[var(--ink)] italic">&ldquo;{item.q}&rdquo;</p>
                <p className="mt-2 text-[12.5px] leading-5 text-[var(--muted)]"><span className="font-bold">Tip:</span> {item.tip}</p>
              </div>
            ))}
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">Common UK interview questions — with answers</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#012169]/20 bg-[#012169]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practise UK-format interviews with AI coaching — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">STAR scoring, competency framework coaching, NHS value-based interviews, and assessment centre prep. Free first session.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl px-8 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: "#012169" }}>
              Practise UK interviews free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-[14px] font-bold text-[var(--ink)]">Related UK guides</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/blog/uk-cv-writing-tips", label: "UK CV Writing Tips" },
                { href: "/blog/graduate-jobs-uk", label: "Graduate Jobs UK" },
                { href: "/blog/star-method-interview", label: "STAR Method" },
                { href: "/blog/behavioral-interview-questions", label: "Behavioural Interview Questions" },
                { href: "/ai-career-coach-uk", label: "AI Career Coach UK" },
                { href: "/blog/how-to-prepare-for-job-interview", label: "Interview Prep Guide" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-[12px] font-medium text-[#4361EE] hover:bg-[var(--brand)]/5 transition-all">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
