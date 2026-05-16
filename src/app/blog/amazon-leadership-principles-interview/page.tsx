import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Amazon Leadership Principles Interview — How to Answer All 16 (2025)",
  description:
    "How to answer Amazon's 16 leadership principles in interviews. Word-for-word STAR examples, the most common LP questions asked, and what Amazon interviewers are actually evaluating.",
  keywords: ["amazon leadership principles interview", "amazon leadership principles examples", "amazon interview leadership principles", "amazon LP interview", "amazon behavioral interview", "amazon leadership principles answers", "amazon interview prep", "amazon interview questions leadership principles"],
  alternates: { canonical: "/blog/amazon-leadership-principles-interview" },
  openGraph: {
    title: "Amazon Leadership Principles Interview — How to Answer All 16 (2025)",
    description: "Word-for-word STAR examples for Amazon's 16 leadership principles — plus the most common questions and what interviewers are really evaluating.",
    url: "/blog/amazon-leadership-principles-interview",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-16";
const MODIFIED = "2025-05-16";

const PRINCIPLES = [
  {
    lp: "Customer Obsession",
    what: "Amazon wants to see that you start with the customer and work backwards — not just that you're nice to customers, but that you prioritize their long-term outcome even when it creates short-term friction internally.",
    commonQ: "Tell me about a time you went above and beyond for a customer.",
    trap: "Don't describe being reactive to a customer complaint. They want proactive customer advocacy — when you identified a problem before the customer did, or pushed back internally to protect the customer experience.",
    example: "At [Company], our analytics showed that 23% of users abandoned checkout at the shipping estimate step. The business team wanted to ship a new feature first. I made the case that we were losing $400K/month in revenue at this step and pushed to pause the feature for two weeks while we fixed shipping estimate accuracy. After the fix, checkout abandonment dropped 18%. It was uncomfortable to push back, but it was the right call for customers.",
  },
  {
    lp: "Ownership",
    what: "Amazon wants leaders who act beyond their job description — who see a problem and own it even if it's not 'their' problem. The opposite of 'that's not my job.'",
    commonQ: "Tell me about a time you took ownership of something that wasn't your responsibility.",
    trap: "Avoid examples where you just did extra work. They want examples where you identified a gap no one else was addressing and took accountability for fixing it — including if it went wrong.",
    example: "During a platform migration, I noticed that the data team's cutover plan would cause a 48-hour gap in reporting that the business hadn't accounted for. This wasn't my workstream. I spent a weekend building a bridge table that preserved historical reporting continuity through the migration. No one asked me to — but a 48-hour reporting blackout during quarter-end would have been a serious problem, and I was the one who saw it.",
  },
  {
    lp: "Invent and Simplify",
    what: "Amazon rewards finding novel, simpler solutions to existing problems. They're especially interested in simplification — removing complexity from processes, products, and decisions.",
    commonQ: "Tell me about a time you found a simpler or more innovative approach to an existing problem.",
    trap: "Don't describe adopting a tool that already existed elsewhere. Innovation at Amazon means inventing a solution specific to your context, or significantly simplifying something that was unnecessarily complex.",
    example: "Our customer support team was spending 40% of their time on a manual report that required pulling from five different systems. I built a one-click dashboard that automated the entire process. It took me three days to build and saved approximately 20 person-hours per week across the team — roughly $60K annually. The team lead said it was the most impactful non-product change in two years.",
  },
  {
    lp: "Are Right, A Lot",
    what: "Amazon wants people with strong judgment who make good decisions with incomplete information. They also want people who know how to update their views when new data arrives.",
    commonQ: "Tell me about a time you made a decision with limited information and it turned out to be correct.",
    trap: "Don't pick a story where you just got lucky. They want to see your decision-making process — how you framed the problem, what data you used, and what you did to mitigate risk under uncertainty.",
    example: "We had to decide whether to delay a product launch by two weeks or ship with a known but low-severity bug. We had no direct data on customer impact. I analyzed our support ticket history for similar bugs, concluded the impact rate would be under 0.3% of users, and recommended shipping on time with a fix queued for the next sprint. We launched. Impact was 0.2%. More importantly, the decision framework I used became the team's standard for future launch-or-delay tradeoff decisions.",
  },
  {
    lp: "Learn and Be Curious",
    what: "Amazon wants people who are genuinely interested in learning — not just completing their job requirements. They look for examples of self-directed learning, curiosity applied to business problems, and intellectual humility.",
    commonQ: "Tell me about a time you learned something new outside your area of expertise to solve a problem.",
    trap: "Don't describe taking a required training or getting a certification your company paid for. They want self-directed learning driven by curiosity or a specific problem you cared about.",
    example: "I noticed our growth rate in the APAC market was lagging our other regions but our data didn't explain why. I spent three weeks reading about regional e-commerce behavior patterns, reached out to two founders building in the market, and learned that our checkout flow had friction points that were specific to how users in the region trusted payment systems. I wrote a recommendation memo with three proposed changes. It wasn't my domain, but nobody else was asking the question.",
  },
  {
    lp: "Hire and Develop the Best",
    what: "Amazon is serious about talent density. They want leaders who set a high bar for hiring, actively develop their team members, and are willing to lose a short-term deadline to protect team quality.",
    commonQ: "Tell me about a time you helped someone on your team develop a new skill or reach a career goal.",
    trap: "Don't describe a formal review cycle. They want specific examples of you investing in a team member's growth in a way that went beyond what was required.",
    example: "One of my junior analysts wanted to move toward a data science role but had no ML background. We agreed she'd take on a project where she'd build a basic churn prediction model with my support. I blocked time every Friday for four months to review her work and explain the gaps. She shipped the model to production — the first ML model our team had ever owned — and was promoted to senior analyst six months later with a clear path to data science. I lost some of my own capacity for those four months. Worth it.",
  },
  {
    lp: "Insist on the Highest Standards",
    what: "Amazon wants leaders who refuse to accept 'good enough' — who push back on work that doesn't meet a high bar even when it's uncomfortable. The question is not whether you have standards but whether you enforce them when there's pressure not to.",
    commonQ: "Tell me about a time you refused to compromise on quality, even under pressure.",
    trap: "Don't describe enforcing your own quality standards. They want examples of pushing back on someone else's work — a peer, a vendor, or a superior — even when it created friction.",
    example: "A vendor delivered an API integration two days before our launch window. The documentation was incomplete and the error handling was inadequate for our use case. The business team wanted to accept it and launch. I declined — I told them we'd need 10 more days to either fix the integration ourselves or get the vendor to do it properly. There was a tense conversation. We took the 10 days. The integration has been running for 14 months without a production incident.",
  },
  {
    lp: "Think Big",
    what: "Amazon wants leaders who reject constraints that don't actually exist. They want examples of you proposing or executing a direction that was larger in ambition than what the situation seemed to call for.",
    commonQ: "Tell me about a time you proposed or pursued a bold idea that others were skeptical of.",
    trap: "Small-scale examples don't work here. The story needs to show a genuine change in scope or ambition — not just doing your current job well.",
    example: "Our team was tasked with improving user onboarding completion by 10%. I came back with a proposal to rebuild the entire onboarding flow from scratch based on a jobs-to-be-done framework, which I estimated would improve completion by 40%+ and set up a platform for personalized onboarding in year two. Leadership pushed back on the scope. I built a one-page case for why the incremental approach would leave 80% of the opportunity on the table. We got approval for the full rebuild. Completion improved by 44%.",
  },
];

const PREP_FRAMEWORK = [
  { step: "Map your experience to the 16 principles before the interview", detail: "For each LP, identify one strong story from your experience. You won't use all 16, but having them ready means you can choose the strongest example when a question is asked." },
  { step: "Write out each story using STAR — and cut it in half", detail: "Amazon interviewers have 30–45 minutes and ask 4–6 LP questions per loop. Your answers should take 2–3 minutes, not 5. Write the full STAR story, then cut the setup and get to the action faster." },
  { step: "Have 'failure' stories ready for each core LP", detail: "Amazon often asks 'tell me about a time you failed' or 'tell me about a time a decision you made didn't go as planned' for several of the LPs. Prepare an honest failure story for at least: Ownership, Are Right A Lot, and Highest Standards." },
  { step: "Prepare the 'I disagreed' stories", detail: "Multiple LPs test your willingness to disagree constructively — Have Backbone; Disagree and Commit, Customer Obsession, Highest Standards. Have at least two stories where you pushed back on someone with more authority and were either right or demonstrated judgment in how you handled it." },
];

export default async function AmazonLeadershipPrinciplesPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Amazon Leadership Principles Interview — How to Answer All 16 (2025)"
        description="Word-for-word STAR examples for Amazon's 16 leadership principles — plus the most common questions and what interviewers are really evaluating."
        url={`${BASE_URL}/blog/amazon-leadership-principles-interview`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Amazon Leadership Principles Interview", url: `${BASE_URL}/blog/amazon-leadership-principles-interview` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Interviews</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">Amazon Leadership Principles Interview — How to Answer All 16 (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 15 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Amazon&apos;s 16 Leadership Principles aren&apos;t a values statement — they&apos;re the interview rubric. Every behavioral question in an Amazon loop is mapped to one or more LPs, and interviewers are scoring your answers against specific criteria. Here&apos;s the inside view on 8 of the most commonly tested LPs, with word-for-word examples and the traps most candidates fall into.
            </p>

            <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50/40 p-5">
              <p className="font-bold text-[var(--ink)]">How Amazon LP interviews work</p>
              <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">Each interviewer in your loop is assigned 2–3 LPs to evaluate. They ask behavioral questions and probe your answers with follow-up questions ('why did you make that decision?', 'what would you do differently?', 'tell me more about your role specifically'). They&apos;re scoring on specific behavioral anchors — not on whether your story sounds good.</p>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 8 most commonly tested LPs — with examples</h2>

            <div className="mt-6 space-y-8">
              {PRINCIPLES.map((p, i) => (
                <div key={p.lp} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-5 py-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">{i + 1}</div>
                    <p className="font-bold text-[var(--ink)]">{p.lp}</p>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">What they&apos;re evaluating</p>
                      <p className="text-[13.5px] leading-6 text-[var(--muted)]">{p.what}</p>
                    </div>
                    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
                      <p className="text-[11.5px] font-semibold text-[var(--ink)]">Most common question: <span className="font-normal italic">&ldquo;{p.commonQ}&rdquo;</span></p>
                    </div>
                    <div className="rounded-lg border border-red-100 bg-red-50/30 px-4 py-3">
                      <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-red-600">Common trap: </span>{p.trap}</p>
                    </div>
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strong answer example</p>
                      <div className="rounded-xl bg-[var(--bg)] p-4">
                        <p className="text-[13.5px] italic leading-7 text-[var(--muted)]">&ldquo;{p.example}&rdquo;</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to prepare for an Amazon LP interview</h2>
            <div className="mt-5 space-y-3">
              {PREP_FRAMEWORK.map((item, i) => (
                <div key={item.step} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">{i + 1}</div>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.step}</p>
                    <p className="mt-1 text-[13px] leading-5 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <p className="font-bold text-[var(--ink)] mb-2">The remaining 8 LPs</p>
              <p className="text-[13.5px] leading-6 text-[var(--muted)] mb-3">The 16 Amazon Leadership Principles include: Customer Obsession, Ownership, Invent and Simplify, Are Right A Lot, Learn and Be Curious, Hire and Develop the Best, Insist on the Highest Standards, Think Big, Bias for Action, Frugality, Earn Trust, Dive Deep, Have Backbone; Disagree and Commit, Deliver Results, Strive to be Earth&apos;s Best Employer, and Success and Scale Bring Broad Responsibility.</p>
              <p className="text-[13.5px] leading-6 text-[var(--muted)]">The remaining 8 — Bias for Action, Frugality, Earn Trust, Dive Deep, Have Backbone, Deliver Results, and the two newer additions — follow the same pattern: each has specific behavioral anchors, common traps, and questions that probe for genuine depth vs. surface-level examples.</p>
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice Amazon LP questions with AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Zari&apos;s AI interview coach evaluates your LP answers in real time — flagging weak STAR structure, missing specificity, and the common traps that get candidates screened out.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start interview prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
