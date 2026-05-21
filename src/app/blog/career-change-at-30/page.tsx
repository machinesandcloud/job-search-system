import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Change at 30 — How to Switch Careers Successfully (2025)",
  description: "A realistic guide to changing careers at 30. Covers how to identify transferable skills, reframe your resume, handle the 'why switching?' question, and land a first role in a new field.",
  keywords: ["career change at 30", "how to change careers at 30", "career switch at 30", "career change in your 30s", "is 30 too old to change careers", "switching careers at 30", "career change advice 30s", "new career at 30", "start over at 30 career", "mid career change 30s"],
  alternates: { canonical: "/blog/career-change-at-30" },
  openGraph: { title: "Career Change at 30 — How to Switch Successfully", description: "Identify transferable skills, reframe your resume, and land a first role in a new field — a realistic guide for career changers in their 30s.", url: "/blog/career-change-at-30" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const FAQS = [
  { question: "Is 30 too old to change careers?", answer: "No. 30 is arguably the ideal time for a career change — you have enough professional experience to bring genuine transferable skills to a new field, but you're early enough in your career that the new trajectory has 30+ years to compound. The average person changes careers 5–7 times in their life. At 30, you likely have one or two more major changes ahead of you regardless." },
  { question: "What are the best careers to transition into at 30?", answer: "The highest-ROI transitions at 30 are roles where domain expertise from your previous career adds unique value. Tech (especially PM and data roles where business context matters), healthcare administration, management consulting, UX design, and financial planning all see strong transitions from adjacent fields. The goal is to identify the intersection of your existing skills and growing demand — not to start completely from zero." },
  { question: "How do I explain a career change in an interview?", answer: "The best framing is intentional evolution, not retreat. 'I've been moving toward this for the past 18 months — here's what I did, what I learned, and why this role is the natural next step.' Avoid: 'I just needed a change' or 'I was unhappy in my old career.' Show that the new direction makes sense in retrospect even if it wasn't the original plan." },
  { question: "How long does a career change take at 30?", answer: "For moves within a field (e.g., marketing manager to product marketing): 1–4 months. For adjacent pivots (e.g., financial analyst to startup CFO path): 4–12 months. For field changes with skill gaps to close (e.g., teacher to software engineer): 10–24 months. The timeline is largely determined by how much new skill development is required and how aggressively you network." },
];

export default async function CareerChangeAt30Page() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Career Change at 30" description="A realistic guide to changing careers at 30 — transferable skills, resume reframing, interview narrative, and realistic timelines." url={`${BASE_URL}/blog/career-change-at-30`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Career Change at 30", url: `${BASE_URL}/blog/career-change-at-30` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #7C3AED 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Career Change</span>
            <span className="text-[12px] text-white/35">16 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Career Change at 30</h1>
          <p className="mt-4 text-[14px] font-bold uppercase tracking-wider text-white/40">The Realistic Guide — What Actually Works in 2025</p>
          <p className="mt-3 text-[15px] leading-7 text-white/50">30 is not a deadline. It&apos;s a leverage point. You have enough experience to bring real skills to a new field — and enough runway to build something great. Here&apos;s how to use it.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">Why 30 is actually the best time to change careers</h2>
          <p className="mb-6 text-[14px] leading-7 text-[var(--muted)]">Career change anxiety at 30 is driven by a false premise: that you&apos;re already &ldquo;too far in&rdquo; to change direction. In reality, most of what made you valuable in your previous career transfers to the new one — you just need to reframe it.</p>
          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            {[
              { pro: "You have real professional skills", desc: "Project management, communication, analysis, client relationships — all of this transfers. You're not starting from zero." },
              { pro: "You have 30+ years of career ahead", desc: "A pivot at 30 has just as long to compound as starting fresh at 22. The opportunity cost of not switching is higher than you think." },
              { pro: "Domain expertise is a differentiator", desc: "A 30-year-old PM who spent 5 years in healthcare brings something that a 22-year-old CS grad never can: deep domain knowledge." },
              { pro: "You know yourself better", desc: "Career changes at 30 are typically more intentional and better-reasoned than ones at 22 — and employers can sense that maturity." },
            ].map(({ pro, desc }) => (
              <div key={pro} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 font-bold text-[14px] text-[#7C3AED]">✓ {pro}</div>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">The 5-step career change framework</h2>
          <div className="mb-12 space-y-3">
            {[
              { step: "1", title: "Map your transferable skills", body: "List everything you're genuinely good at — not your job titles. Then match those skills to the new field. A teacher who's exceptional at explaining complex things has PM, technical writing, and curriculum design skills. Name them explicitly." },
              { step: "2", title: "Identify your target role and sector", body: "Be specific. 'I want to work in tech' is not a target. 'I want to be a product manager at a Series B health tech company using my nursing background' is. Specificity enables a specific job search strategy." },
              { step: "3", title: "Close the skill gap before you apply", body: "Most career changes require one or two targeted skills to close. Identify the gap and close it through a course, project, certification, or part-time freelance work. Don't apply before this — you'll get filtered." },
              { step: "4", title: "Rewrite your resume for the new role", body: "Your resume must speak to the new role, not your old one. Every bullet should show relevance to the target role — even if it came from a different context. ATS systems don't grade effort; they grade keyword match." },
              { step: "5", title: "Build the interview narrative", body: "Interviewers will ask why you're changing. Your answer needs to be: intentional, forward-looking, and specific. Not 'I needed a change' — 'I've been building toward this for 18 months, and here's the evidence.'" },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/10 text-[14px] font-extrabold text-[#7C3AED]">{step}</div>
                <div>
                  <div className="mb-1 font-bold text-[14px]">{title}</div>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Best career pivots for 30-somethings</h2>
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            {[
              { from: "Finance / Banking", to: "FinTech PM or Startup CFO", why: "Domain expertise is the moat — fintech products need people who understand money" },
              { from: "Teaching / Education", to: "Instructional Design, PM, Curriculum Tech", why: "Deep communication and learning design skills transfer directly" },
              { from: "Healthcare / Nursing", to: "Health Tech PM, Clinical Data, Sales", why: "Health tech is the fastest-growing vertical and desperately needs domain expertise" },
              { from: "Journalism / Media", to: "Content Strategy, UX Writing, Product Marketing", why: "Writing, research, and audience empathy are immediately transferable" },
              { from: "Military / Government", to: "Project Management, Consulting, Operations", why: "Leadership, decision-making under pressure, logistics — premium in every sector" },
            ].map(({ from, to, why }, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_1.5fr] border-b border-[var(--border)] p-3 text-[13px] last:border-0 items-start gap-3">
                <div><span className="text-[10px] font-bold uppercase text-[var(--muted)]">From</span><div className="font-semibold">{from}</div></div>
                <div><span className="text-[10px] font-bold uppercase text-[#7C3AED]">To</span><div className="font-semibold text-[#7C3AED]">{to}</div></div>
                <div className="text-[12px] text-[var(--muted)]">{why}</div>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #7C3AED 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold">30 is a leverage point. Use it.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari builds a career-change resume that reframes your background for the new field, coaches you through the &ldquo;why switching?&rdquo; interview question, and maps your transferable skills to roles that value them.</p>
          <Link href="/career-change-coach" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#7C3AED]">Start career change coaching free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
