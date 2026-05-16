import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job at Google — The Complete Guide (2025)",
  description:
    "How Google actually hires: the application funnel, recruiter screen, technical and behavioral rounds, hiring committee, and the level-setting that determines your comp. What most candidates don't know — and why they don't pass.",
  keywords: ["how to get a job at google", "google hiring process", "google job application", "working at google", "google interview process", "how to get hired at google"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-google" },
  openGraph: {
    title: "How to Get a Job at Google — The Complete Guide (2025)",
    description: "The full Google hiring funnel — application to offer. What most candidates don't know, and why they don't pass.",
    url: "/blog/how-to-get-a-job-at-google",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const APPLICATION_PATHS = [
  {
    path: "Internal referral",
    accent: "#059669",
    likelihood: "3–5× more likely to get a screen",
    how: "A Googler submitting a referral pushes your application directly into the recruiter queue with a warm signal. The referral doesn't guarantee an interview, but it dramatically increases the chance your resume is read by a human. LinkedIn is the best way to find Googlers — search for people at Google with your target role title and ask for an informational interview first.",
    preparation: "Before asking for a referral, have a 1-page tailored resume and a clear pitch for why you're a fit for the specific role. Referrers are putting their credibility on the line — make it easy for them to say yes.",
  },
  {
    path: "Direct application (careers.google.com)",
    accent: "#7C3AED",
    likelihood: "~1% application-to-screen rate at most roles",
    how: "Applications go through an ATS before a recruiter sees them. Your resume needs to match the job description's language closely. Google's ATS is particularly sensitive to role-specific terminology — 'SWE' vs 'Software Engineer', 'PM' vs 'Product Manager' can affect matching.",
    preparation: "Tailor your resume for each specific Google role, not a generic Google application. The same person applying to 3 different Google roles should have 3 different resumes.",
  },
  {
    path: "LinkedIn InMail from Google recruiter",
    accent: "#D97706",
    likelihood: "High if recruiter reaches out — respond same or next business day",
    how: "Google has a large internal sourcing team that actively searches LinkedIn for candidates matching open roles. If a Google recruiter reaches out, treat it as a high-priority application. Reply promptly with your interest and availability for a call.",
    preparation: "This is why LinkedIn optimization matters. Recruiters use LinkedIn Recruiter with specific filters — if your profile matches their searches, you get found without applying.",
  },
];

const FUNNEL_STAGES = [
  {
    stage: "Recruiter screen (30 min)",
    accent: "#0D7182",
    what: "Conversational call — your background, interest in Google, what roles and teams you're targeting, availability, and a high-level sense of whether you're worth advancing. Google recruiters are assessing communication, articulation, and whether your experience maps to the open position.",
    howToPass: "Research the specific team and product area. Know why you want this role at this company specifically — 'I want to work at Google' isn't enough. Have your career narrative tight: who you are, what you've built, why this, why now.",
    dontDo: "Go vague about which roles you're interested in. Come without knowledge of what the team does. Treat it as an informational conversation — it's a screen.",
  },
  {
    stage: "Technical phone screen (45–60 min)",
    accent: "#7C3AED",
    what: "For SWE roles: a coding problem in a shared doc or Google's internal coding tool — algorithm and data structure focus, clean code, communication throughout. For PM roles: a product design question or case. For other roles: role-specific assessment.",
    howToPass: "Think out loud throughout. Google explicitly trains interviewers to assess communication, not just code correctness. Ask clarifying questions before diving in. Walk through your approach before writing code. Test your solution before submitting.",
    dontDo: "Code in silence. Assume the first solution is the only solution — Google interviewers expect you to discuss tradeoffs and improvements. Submit unreviewed code with obvious bugs.",
  },
  {
    stage: "Virtual on-site (4–6 rounds, usually 1 day)",
    accent: "#DC2626",
    what: "Multiple consecutive interviews covering: coding (2–3 for SWE), system design (1 for senior roles), behavioral/'Googleyness' (1–2 rounds). Each interviewer writes an independent evaluation — there's no real-time calibration between interviewers during the day.",
    howToPass: "Each round is independent — one bad round doesn't disqualify you, and one great round doesn't guarantee you. Treat each 45-minute slot as a fresh start. The Googleyness round specifically evaluates: collaboration, ambiguity comfort, impact, intellectual humility.",
    dontDo: "Carry anxiety from a previous round into the next. Skip the behavioral prep because you're focused on coding — Googleyness rounds have eliminated otherwise-qualified candidates.",
  },
  {
    stage: "Hiring committee review",
    accent: "#D97706",
    what: "Your interviewer feedback packets are reviewed by a committee that didn't interview you. They make the hire/no-hire decision — your recruiter and the interviewers don't make it themselves. The committee can and does override strong recommendations in either direction.",
    howToPass: "You don't directly control this stage. But: write strong code with clear comments, communicate your thinking in every round (interviewers document what you said, not just what you wrote), and give specific examples in behavioral rounds — vague answers don't write up well in feedback packets.",
    dontDo: "Think the recruiter's enthusiasm means you have the job — HC decisions are independent and sometimes surprising.",
  },
  {
    stage: "Team matching & compensation",
    accent: "#059669",
    what: "After an HC approval, you match with specific teams. Teams interview you separately (these are usually conversational, not technical). Your level (L3–L7 for SWE) is set during this process and directly determines your comp band.",
    howToPass: "Express clear preferences for specific product areas or team types — it helps matching. Don't undersell your experience during level discussion: the level you're set at is often negotiable within a band, and lowballing costs real money.",
    dontDo: "Accept the first team that extends interest without understanding what you'd be working on. Forget that level is negotiable.",
  },
];

const GOOGLEYNESS_SIGNALS = [
  { signal: "Cognitive humility", example: "Describing times you were wrong, changed your mind based on data, or deferred to someone with more context — with genuine specificity, not performed humility." },
  { signal: "Collaboration over credit", example: "Stories where the team outcome mattered more than your individual contribution — but where you can still clearly articulate what you personally did." },
  { signal: "Comfort with ambiguity", example: "Examples of making good decisions with incomplete information, setting direction without full clarity, or recovering from unexpected changes gracefully." },
  { signal: "Impact mindset", example: "Everything you describe should connect to an outcome. Google doesn't care that you worked on something — they care what happened as a result of you working on it." },
];

const FAQS = [
  { question: "How hard is it to get a job at Google?", answer: "Very selective — acceptance rates are around 0.2% of applicants across all roles, though this varies significantly by role type and team. The filter operates at every stage: only a fraction of applications result in a recruiter screen, only a fraction of screens advance to on-site, and only around 15–25% of on-site candidates receive HC approval. The candidates who pass consistently are well-prepared for the specific format — not necessarily more talented than those who don't." },
  { question: "Do I need a computer science degree to get a job at Google?", answer: "No — Google removed the degree requirement for most roles several years ago. What matters is demonstrated ability: a portfolio of relevant work, strong performance in technical screens, and evidence of the competencies they're evaluating. That said, the technical bar for SWE roles is high regardless of credential path. Many non-CS-degree candidates have passed by building deep technical skills through alternative paths." },
  { question: "How long does the Google hiring process take?", answer: "Typically 4–12 weeks from first recruiter contact to offer. The variability is primarily in scheduling (getting interview slots, assembling the committee) and team matching (which can take several weeks if your first team options don't materialize). If you have a competing offer deadline, tell your recruiter early — Google can sometimes accelerate for genuine deadline pressure." },
  { question: "Can I apply to Google multiple times?", answer: "Yes, and many people do. If you're rejected after an on-site, there's typically a 6-month or 12-month cooldown period for the same role type. You can apply for different roles or teams before that period ends. Keep notes on which rounds you struggled with — that's the specific gap to close before your next application." },
];

export default async function HowToGetAJobAtGooglePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Get a Job at Google — The Complete Guide (2025)"
        description="The full Google hiring funnel — application to offer. What most candidates don't know, and why they don't pass."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/how-to-get-a-job-at-google`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Get a Job at Google", url: `${BASE_URL}/blog/how-to-get-a-job-at-google` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Interviews</span>
            <span className="text-[11px] text-white/30">14 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            How to get a job at Google<br /><span className="gradient-text-animated">the real funnel — application to offer</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most Google interview guides cover coding prep. This guide covers the full process — how applications actually get seen, what happens between each stage, what the hiring committee is evaluating that interviewers don&apos;t tell you, and why qualified candidates don&apos;t pass.
          </p>
        </div>
      </section>

      {/* Application paths */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">3 ways to get into Google&apos;s interview pipeline</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Not all entry points are equal. Here&apos;s what each looks like and how to make the most of each.</p>
          <div className="mt-8 space-y-5">
            {APPLICATION_PATHS.map((p) => (
              <div key={p.path} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: p.accent, borderLeftWidth: 4 }}>
                  <p className="font-extrabold text-[var(--ink)]">{p.path}</p>
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold" style={{ background: `${p.accent}14`, color: p.accent }}>{p.likelihood}</span>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="px-5 py-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">How it works</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{p.how}</p>
                  </div>
                  <div className="bg-[var(--bg)] px-5 py-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: p.accent }}>How to prepare</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{p.preparation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funnel stages */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Every stage of the Google hiring process</h2>
          <div className="mt-8 space-y-5">
            {FUNNEL_STAGES.map((s, i) => (
              <div key={s.stage} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-center gap-3 border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: s.accent, borderLeftWidth: 4 }}>
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: s.accent }}>{i + 1}</span>
                  <p className="font-extrabold text-[var(--ink)]">{s.stage}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <p className="px-6 py-4 text-[13.5px] leading-6 text-[var(--muted)]">{s.what}</p>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                    <div className="bg-emerald-50/40 px-5 py-4">
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">How to pass</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{s.howToPass}</p>
                    </div>
                    <div className="bg-red-50/30 px-5 py-4">
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-red-600">Don&apos;t do this</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{s.dontDo}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Googleyness */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What &ldquo;Googleyness&rdquo; actually means in practice</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Googleyness is a real evaluation criterion, not just a buzzword. Here&apos;s what interviewers are actually listening for in those behavioral rounds.</p>
          <div className="mt-7 space-y-3">
            {GOOGLEYNESS_SIGNALS.map((item, i) => (
              <div key={item.signal} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Google job FAQs</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Preparing for Google? Zari coaches every round.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume tailored to Google&apos;s ATS, mock interviews for each round type, Googleyness coaching, and salary negotiation strategy for the offer — all in one AI coach.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
