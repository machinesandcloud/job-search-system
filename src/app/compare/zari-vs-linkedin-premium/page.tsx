import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Is LinkedIn Premium Worth It for Job Seekers? Zari vs Premium (2025)",
  description:
    "LinkedIn Premium Career costs $40/month and gives you InMail, profile views, and applicant insights. Zari costs less and coaches your resume, interview skills, and salary negotiation. Which moves the needle more?",
  keywords: ["is LinkedIn Premium worth it", "LinkedIn Premium Career review", "Zari vs LinkedIn Premium", "LinkedIn Premium for job seekers 2025", "LinkedIn Premium alternative", "should I get LinkedIn Premium"],
  alternates: { canonical: "/compare/zari-vs-linkedin-premium" },
  openGraph: {
    title: "Is LinkedIn Premium Worth It for Job Seekers? (2025)",
    description: "LinkedIn Premium improves your visibility and outreach reach. Zari improves the quality of your candidacy. Here's which one drives more interviews.",
    url: "/compare/zari-vs-linkedin-premium",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What do you get with LinkedIn Premium Career?",
    answer: "LinkedIn Premium Career (~$40/month) includes: 5 InMail credits per month to message anyone outside your network, full 90-day list of who viewed your profile (free accounts see only 5), Applicant Insights showing how you rank against other applicants on skills and experience, access to LinkedIn Learning courses, the Open to Work badge, and an AI-powered Interview Prep feature (newer addition) with practice questions. There's also a Featured Applicant badge on jobs you apply to.",
  },
  {
    question: "Is LinkedIn Premium actually worth $40/month for job seekers?",
    answer: "Depends what your bottleneck is. If you're applying through LinkedIn and want visibility into how competitive your applications are — Applicant Insights, who viewed your profile — Premium has real value. If you're getting views but not callbacks, Premium gives you more data about the problem without fixing it. Paying $40/month to see that you're 'below average among applicants' isn't useful unless you also have a tool to improve your candidacy.",
  },
  {
    question: "What does Zari do that LinkedIn Premium doesn't?",
    answer: "LinkedIn Premium improves visibility and outreach — InMail, applicant ranking data. Zari improves your underlying competitiveness: rewriting your resume for specific JDs, optimizing your LinkedIn profile for recruiter search keywords, coaching your interview answers with STAR feedback, and preparing you for salary negotiation. These are different problems. Premium helps you reach more of the process. Zari helps you win more of it.",
  },
  {
    question: "Which should I prioritize if I can only afford one?",
    answer: "If you're below average in applicant rankings and need to figure out why — Premium's Applicant Insights can diagnose the gap. But knowing the gap and closing it are different. Zari closes the gap: it rewrites the resume, optimizes the LinkedIn profile, and coaches the interview. For most job seekers, the coaching investment drives more actual interviews than the visibility investment.",
  },
  {
    question: "Does LinkedIn Premium include interview coaching?",
    answer: "LinkedIn Premium has an Interview Prep feature with AI-generated practice questions by role and video recording capability. It's a newer addition to the product. It doesn't offer conversational mock interviews, STAR framework evaluation, or real-time answer coaching — it's more of a question bank with recording. Zari's interview coaching is a primary product, not a supplementary feature.",
  },
  {
    question: "Should I use both?",
    answer: "Yes, if your search strategy involves active LinkedIn networking. Use Premium for InMail outreach and applicant visibility data. Use Zari for making your LinkedIn profile actually searchable (headline optimization, About section, experience keywords), coaching your interview answers, and negotiation prep. They serve different parts of the job search.",
  },
];

const DIMENSIONS = [
  {
    category: "Who Viewed Your Profile",
    li: "Premium unlocks the full 90-day list of who viewed your profile. Free accounts see only 5 recent viewers. Useful for identifying recruiters who found you organically and following up proactively.",
    zari: "Zari doesn't track LinkedIn profile views. That's LinkedIn's data and it stays in LinkedIn's ecosystem.",
    winner: "li",
    winnerNote: "Profile view data is genuinely useful for identifying warm recruiting interest.",
  },
  {
    category: "LinkedIn Profile Optimization",
    li: "Premium includes some profile completion suggestions and tips. The underlying optimization — how to rewrite your headline and About section so recruiters actually find you — isn't the product. You get visibility into who viewed the profile you have, not coaching on how to make it more findable.",
    zari: "Rewrites your headline, About section, and experience bullets with the specific keywords recruiters use when searching for your role. The goal is showing up in searches, not just being seen by people who accidentally found you.",
    winner: "zari",
    winnerNote: "Visibility data and profile optimization address different parts of the recruiter search problem.",
  },
  {
    category: "InMail Credits",
    li: "5 InMail credits per month to message anyone on LinkedIn regardless of connection status. Useful for cold outreach to hiring managers, recruiters, and referral requests. Most people don't use all 5 per month.",
    zari: "Zari doesn't help with InMail or direct LinkedIn messaging. It's a coaching tool, not an outreach tool.",
    winner: "li",
    winnerNote: "For outbound networking strategy, InMail is a genuine lever. Unused credits don't roll over.",
  },
  {
    category: "Applicant Insights",
    li: "When you apply through LinkedIn, Premium shows you how you compare to other applicants on education, skills, years of experience, and connection level. You can see whether you're 'above average,' 'average,' or 'below average' in each category.",
    zari: "Zari doesn't access LinkedIn's applicant comparison data. But it takes a different approach: instead of showing you where you rank, it actively improves the ranking by optimizing your resume and LinkedIn profile for the specific role.",
    winner: "tie",
    winnerNote: "Applicant Insights diagnoses the gap. Zari closes it. Both have value.",
  },
  {
    category: "Interview Preparation",
    li: "LinkedIn Premium has an Interview Prep feature with AI-generated practice questions by role and video recording. It's a useful addition but not a primary product — you get a question bank and self-review capability, not a conversational mock interview with live feedback.",
    zari: "Full AI mock interview coach — behavioral questions with STAR evaluation, role-specific prep, and real-time feedback on clarity, specificity, and where answers lose the interviewer. Session memory means Zari knows your background and asks follow-up questions relevant to your actual experience.",
    winner: "zari",
    winnerNote: "Interview Prep is a supplementary LinkedIn Premium feature. Interview coaching is Zari's core product.",
  },
  {
    category: "Resume Coaching",
    li: "Not included in LinkedIn Premium. Premium is a LinkedIn-layer product — it doesn't touch your resume.",
    zari: "ATS analysis against specific job descriptions, keyword gap identification, and bullet rewrites. If your resume is why you're scoring 'below average' in Applicant Insights, Zari is the tool that fixes it.",
    winner: "zari",
    winnerNote: "LinkedIn Premium shows the symptom. Zari addresses the cause.",
  },
  {
    category: "Salary Negotiation",
    li: "LinkedIn Premium includes salary insights for job listings — average compensation ranges by role, level, and location. Useful for benchmarking and knowing whether an offer is competitive.",
    zari: "Salary simulation coaching — practicing the actual negotiation conversation with scripts, counter-offer strategy, and responses to standard pushbacks. The salary data is the research; the coaching is how you act on it.",
    winner: "tie",
    winnerNote: "Premium gives you the data. Zari gives you the conversation. Both are useful at the offer stage.",
  },
  {
    category: "Price",
    li: "$39.99/month. No free tier for the Premium Career plan — LinkedIn offers a 1-month free trial but full access requires subscription. Annual pricing reduces the monthly cost somewhat.",
    zari: "Free first session on every coaching surface. Paid plans start lower than LinkedIn Premium and cover resume coaching, LinkedIn optimization, interview prep, and negotiation in one subscription.",
    winner: "zari",
    winnerNote: "For candidates on a budget, Zari delivers more active coaching per dollar.",
  },
];

export default async function ZariVsLinkedInPremiumPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs LinkedIn Premium", url: `${BASE_URL}/compare/zari-vs-linkedin-premium` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs LinkedIn Premium</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            LinkedIn Premium at $40/month gives you data about your search — who viewed your profile, how you rank against other applicants, InMail credits. Zari gives you coaching that improves the numbers behind that data. Here&apos;s the honest comparison.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">LinkedIn Premium is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Seeing who viewed your profile (the full 90-day list)",
                  "InMail credits for cold outreach to recruiters and hiring managers",
                  "Applicant Insights showing how you rank against other applicants",
                  "Salary data for specific roles and locations",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/70">
                    <span className="mt-0.5 text-white/40">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#4361EE]/70">Zari is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Making your LinkedIn profile actually appear in recruiter searches",
                  "Improving the resume that Applicant Insights says ranks 'below average'",
                  "Interview coaching that turns callbacks into offers",
                  "Salary negotiation practice when the offer comes in",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/80">
                    <span className="mt-0.5 text-[#4361EE]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The visibility vs. quality framing */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Visibility vs. competitiveness — which problem do you have?</h2>
          <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
            Most job search problems fall into one of two categories. LinkedIn Premium addresses the first. Zari addresses the second.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] bg-white p-5">
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-500 mb-3">Visibility problem</p>
              <p className="text-[14px] leading-6 text-[var(--muted)] mb-3">
                Recruiters aren&apos;t finding you. You&apos;re not getting enough eyeballs on your profile. You want to reach more hiring managers proactively.
              </p>
              <p className="text-[12px] font-semibold text-slate-600">Premium helps here: profile view data, InMail outreach, higher applicant placement.</p>
            </div>
            <div className="rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-5">
              <p className="text-[12px] font-bold uppercase tracking-wider text-[#4361EE] mb-3">Competitiveness problem</p>
              <p className="text-[14px] leading-6 text-[var(--muted)] mb-3">
                People see your profile but don&apos;t reach out. You apply but don&apos;t get callbacks. You get interviews but not offers. Your materials or preparation aren&apos;t strong enough.
              </p>
              <p className="text-[12px] font-semibold text-[#4361EE]">Zari helps here: profile optimization, resume rewrites, interview coaching.</p>
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50/50 p-5">
            <p className="text-[14px] leading-7 text-[var(--ink)]">
              <span className="font-bold">The common mistake:</span> Paying for visibility when the problem is quality. If you&apos;re ranking &ldquo;below average&rdquo; in Applicant Insights, more InMail credits won&apos;t help. You need better materials first.
            </p>
          </div>
        </div>
      </section>

      {/* Dimension breakdown */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Where LinkedIn Premium genuinely wins, where Zari wins, and where they serve different goals entirely.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[#4361EE]" :
                    dim.winner === "li" ? "bg-blue-50 text-blue-600" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {dim.winner === "zari" ? "Zari wins" : dim.winner === "li" ? "Premium wins" : "Both useful"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-blue-500">LinkedIn Premium</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.li}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.zari}</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Bottom line: </span>{dim.winnerNote}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-amber-100 bg-amber-50/40 p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">The honest verdict</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              LinkedIn Premium Career is worth the $40/month if your job search strategy centers on active outreach and networking — using InMail to reach hiring managers, tracking who&apos;s paying attention to your profile, and understanding where you rank against the competition.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              But visibility and quality are different problems. If Applicant Insights tells you you&apos;re &ldquo;below average&rdquo; among applicants on skills, that&apos;s information without a solution. Zari is the solution layer: it optimizes your LinkedIn profile so you appear in more recruiter searches, rewrites the resume so you rank higher against the JD, and coaches you for the interviews you land.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              For most active job seekers with limited budgets: invest in coaching first. Once your materials and skills are sharp, the visibility tools compound. Using Premium on a below-average application is paying to be seen as uncompetitive faster.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-8 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">Stop diagnosing. Start improving.</h2>
          <p className="mx-auto mt-4 text-[16px] text-white/55">Resume coaching, LinkedIn optimization, interview prep, and salary negotiation — free to start.</p>
          <div className="mt-8">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[#4361EE] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
