import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs interviewing.io — Mock Interviews vs AI Career Coach (2025)",
  description:
    "interviewing.io connects you with anonymous mock technical interviews from real FAANG engineers. Zari coaches your resume, behavioral prep, and salary negotiation. They serve different stages — here's when to use each.",
  keywords: ["zari vs interviewing.io", "interviewing.io alternative", "interviewing.io review 2025", "mock technical interview platform", "AI interview coach vs real interviewer", "interview practice 2025"],
  alternates: { canonical: "/compare/zari-vs-interview-io" },
  openGraph: {
    title: "Zari vs interviewing.io — Mock Interviews vs AI Career Coach (2025)",
    description: "interviewing.io gives you real practice with real engineers. Zari coaches everything around the interview. They complement each other.",
    url: "/compare/zari-vs-interview-io",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_TASKS = [
  {
    task: "Realistic mock technical interviews",
    iio: { verdict: "interviewing.io wins", score: "win", detail: "interviewing.io's core product is anonymous mock technical interviews with real engineers from top companies — Google, Meta, Amazon, and other FAANG. The anonymous format removes social pressure, and the feedback from real engineers who conduct actual interviews is qualitatively different from AI feedback. For coding interview practice where you need to experience the real interview dynamic — thinking out loud, writing code while talking, handling clarifying questions — interviewing.io is best-in-class." },
    zari: { verdict: "Different approach", score: "partial", detail: "Zari provides AI-based interview coaching — behavioral question practice with STAR feedback, system design guidance, and company-specific prep. The AI format allows unlimited practice without scheduling, cost per session, or availability constraints. For behavioral and soft-skill interview prep, Zari's AI coaching is highly effective. For technical coding under realistic conditions, human mock interviews with real engineers provide a different signal." },
  },
  {
    task: "Behavioral interview preparation",
    iio: { verdict: "Not the focus", score: "partial", detail: "interviewing.io focuses primarily on technical mock interviews — coding and system design. Behavioral interview practice is available but not the platform's strength." },
    zari: { verdict: "Zari wins", score: "win", detail: "Behavioral prep is a core Zari strength — STAR story coaching, company-specific behavioral question sets (Amazon LP, Netflix culture questions, Google Googleyness), and real-time feedback on answer structure, specificity, and impact framing. Unlimited practice sessions without scheduling." },
  },
  {
    task: "System design interview preparation",
    iio: { verdict: "interviewing.io wins for live practice", score: "win", detail: "interviewing.io's system design mock interviews with senior engineers provide real-time feedback on your architectural thinking, trade-off articulation, and communication. The live dynamic — being challenged in real-time — prepares you for the actual interview in ways that solo studying can't fully replicate." },
    zari: { verdict: "Complements for preparation", score: "partial", detail: "Zari helps you structure your system design approach, learn the communication framework (requirements → architecture → deep dive → bottlenecks), and prepare for specific companies' system design focuses. Use Zari to prepare the foundation, then test it live on interviewing.io." },
  },
  {
    task: "Resume optimization",
    iio: { verdict: "interviewing.io doesn't help", score: "loss", detail: "interviewing.io is an interview practice platform. Resume optimization is outside its scope — it starts when you're already preparing for interviews, not before." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari reviews and rewrites your resume before you get to the interview stage — tailoring bullets to specific job descriptions, surfacing ATS keyword gaps, and rewriting experience descriptions to show measurable impact. Strong resume quality affects what companies you interview at, which changes what mock interviews you need." },
  },
  {
    task: "Salary negotiation coaching",
    iio: { verdict: "interviewing.io doesn't help", score: "loss", detail: "No negotiation features. interviewing.io's scope ends when the interview ends." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches the full negotiation after you get the offer — counter offer scripting, handling pushback, equity and signing bonus strategy. This is where coaching ROI is highest." },
  },
  {
    task: "Anonymity and ego-safe practice",
    iio: { verdict: "interviewing.io wins", score: "win", detail: "Anonymous interviews with real engineers mean you get honest, unfiltered feedback without the social cost of a bad performance with someone who knows you. This format is uniquely valuable for candidates who want realistic practice without network exposure." },
    zari: { verdict: "Different dynamic", score: "partial", detail: "AI coaching with Zari has zero social stakes — you can make mistakes, restart, and practice the same scenario 10 times without any judgment. For candidates who feel performance anxiety in mock interviews, starting with Zari before moving to interviewing.io is a natural progression." },
  },
];

const FAQS = [
  { question: "Is interviewing.io worth the cost?", answer: "For candidates targeting FAANG or other top-tier engineering roles, yes — the signal quality from a real engineer's feedback is difficult to replicate otherwise. The cost per session is significant, which makes interviewing.io most valuable when you're 2-4 weeks from actual interviews and want to stress-test your preparation. Earlier in your prep (building foundations, practicing behavioral questions), lower-cost alternatives including Zari are more cost-effective per hour of practice." },
  { question: "Can AI interview coaching replace human mock interviews?", answer: "For behavioral prep, AI coaching is highly effective and often better than human mock interviews — more structured feedback, unlimited practice, no scheduling friction. For coding interviews, AI coaching helps with approach and explanation, but the real-time dynamic of writing code while explaining your thinking to a human interviewer is harder to replicate. The ideal preparation combines both: AI coaching for unlimited behavioral and conceptual practice, human mock interviews for realistic technical simulation close to the actual interview." },
  { question: "When should I use interviewing.io vs Zari in my job search timeline?", answer: "Zari is useful throughout — resume optimization from day one, behavioral prep as soon as you start interviewing, and negotiation coaching at the end. interviewing.io is most valuable in the 3-6 weeks immediately before your actual interview loop, when you have the foundations down and need live testing under realistic conditions. Many candidates use Zari first to build the preparation framework, then use interviewing.io to test it." },
];

export default async function ZariVsInterviewIOPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs interviewing.io", url: `${BASE_URL}/compare/zari-vs-interview-io` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · Interview Prep</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs interviewing.io</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            interviewing.io connects you with real FAANG engineers for anonymous mock interviews. Zari coaches everything around the interview — resume, behavioral prep, and negotiation. Sequential, not competing.
          </p>
          <div className="mt-8 flex justify-center">
            <WinScore zariWins={3} total={6} competitorName="interviewing.io" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Task-by-task comparison</h2>
          <div className="mt-6 space-y-5">
            {COMPARISON_TASKS.map((row) => (
              <div key={row.task} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-2.5">
                  <p className="font-bold text-[var(--ink)]">{row.task}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.iio.score === "win" ? "text-emerald-600" : row.iio.score === "partial" ? "text-amber-500" : "text-red-500"}`}>interviewing.io — {row.iio.verdict}</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.iio.detail}</p>
                  </div>
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.zari.score === "win" ? "text-[#4361EE]" : row.zari.score === "partial" ? "text-amber-500" : "text-[var(--muted)]"}`}>Zari — {row.zari.verdict}</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Start your interview prep with Zari — then stress-test it on interviewing.io.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari builds your behavioral foundation, system design framework, and resume — so when you go live on interviewing.io, you&apos;re testing polished preparation, not building it from scratch.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
