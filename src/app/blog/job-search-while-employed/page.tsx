import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Job Search While Employed — Without Getting Caught (2025)",
  description:
    "The timing problem, the privacy risks, how to manage interviews around a full-time schedule, what to say to references, and the leverage your current job actually gives you. A complete guide to a confidential job search.",
  keywords: ["job search while employed", "how to job search while working", "job hunting while employed", "searching for job while employed", "confidential job search", "how to find a new job without current employer knowing"],
  alternates: { canonical: "/blog/job-search-while-employed" },
  openGraph: {
    title: "How to Job Search While Employed — Without Getting Caught (2025)",
    description: "Managing the privacy risk, interview scheduling, references, and the leverage a current job gives you. The complete guide to searching while employed.",
    url: "/blog/job-search-while-employed",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const PRIVACY_RISKS = [
  {
    risk: "LinkedIn activity signals",
    severity: "High",
    detail: "When you update your LinkedIn profile — new headline, About section edits, skills added — your connections are notified. When you turn on 'Open to Work,' coworkers who are also recruiters see it unless you specifically hide it from your company's domain. Most candidates miss this setting.",
    fix: "Use LinkedIn's 'Share with recruiters only' setting, not the green Open to Work banner. Update your profile in incognito mode or via mobile (though notifications still fire). Turn off activity broadcasts in privacy settings before making major profile edits.",
  },
  {
    risk: "Recruiter outreach to your work email",
    severity: "Medium",
    detail: "Recruiters sometimes find work emails through LinkedIn, company directories, or Hunter.io. A cold recruiting email landing in your work inbox is not a disaster — but responding to it from your work email creates a paper trail your employer could theoretically access.",
    fix: "Never use your work email for job search activity. Create a dedicated Gmail or ProtonMail address exclusively for your search. Check it from personal devices, not work-issued laptops or phones on the company's network.",
  },
  {
    risk: "Coworkers seeing your applications",
    severity: "High",
    detail: "Many companies use shared ATS systems or have employees who work at target companies and see your name in the applicant pool. In small industries or tight-knit professional communities, 'I saw your name come through the system' is a real risk.",
    fix: "Research whether your target company has employees you know before applying. For small-industry searches, consider reaching out to the recruiter or hiring manager directly before formally applying — which lets you have a conversation without creating an official record immediately.",
  },
  {
    risk: "Interview scheduling conflicts",
    severity: "Medium",
    detail: "Disappearing for 2-hour blocks multiple times per week, especially during business hours, creates patterns. Colleagues notice. Managers notice when the pattern correlates with 'dentist appointments' or 'car trouble.'",
    fix: "Request early morning (7–8am), lunch, or late afternoon (5pm+) interview slots first. Use personal days or WFH days strategically. Don't over-explain absences — a simple 'personal appointment' is sufficient and more believable than elaborate stories.",
  },
  {
    risk: "Reference checks exposing the search",
    severity: "High",
    detail: "If a company contacts your current manager as a reference — even as an informal back-channel — you've lost control of the confidentiality. This is the most common way employed searches become known prematurely.",
    fix: "Be explicit with every employer: 'I am currently employed and my search is confidential. Please do not contact my current employer without explicit advance notice and approval from me.' Most companies respect this — and will tell you if they can't.",
  },
];

const LEVERAGE_YOUR_JOB_GIVES_YOU = [
  {
    advantage: "You negotiate from strength, not desperation",
    detail: "Employed candidates negotiate significantly better compensation. The power dynamic is fundamentally different when you don't need the offer — you're evaluating them as much as they're evaluating you. Candidates who say 'I'm currently employed and happy, but this role could be the right fit if the package is competitive' get offers that are 10–20% higher on average than unemployed candidates asking the same question.",
  },
  {
    advantage: "You can be selective without pressure",
    detail: "Taking 3 months to find the right role is only comfortable when you have income. Employed candidates can wait for the right company, the right team, the right level, without the anxiety spiral of watching runway shrink. This patience produces better outcomes — fewer accepted offers that are regretted within 6 months.",
  },
  {
    advantage: "Current role signals continued performance",
    detail: "Recruiters and interviewers interpret 'currently employed' as a positive signal — ongoing demonstration that you're performing well enough to keep your job. For candidates with gaps or uncertain recent history, being currently employed resets expectations significantly.",
  },
  {
    advantage: "Competing offer leverage if needed",
    detail: "If you get an outside offer, it can be used as leverage internally — either to get a raise, a promotion, or simply confirmation that you're underpaid. This only works if you're genuinely willing to leave, but having an external offer is the fastest path to a significant internal salary adjustment.",
  },
];

const INTERVIEW_SCHEDULING = [
  {
    scenario: "Phone screen (30–45 min)",
    strategy: "Early morning before your workday starts or end of day. Most recruiters will accommodate 7:30am or 6pm calls without asking why. If you work from home, these are even easier to manage.",
    script: "\"I&apos;m currently employed and would appreciate early morning or late afternoon slots — I want to be respectful of both my current role and the interview process.\"",
  },
  {
    scenario: "Technical screen or take-home",
    strategy: "Take-homes are the easiest — do them on personal time over a weekend. For live technical screens, same scheduling logic: push for before 9am or after 5pm. Companies that can&apos;t accommodate a 7:30am technical screen are often less flexible employers.",
    script: "\"I can make a 7am or 8am slot work, or evenings after 6. Does the team have flexibility there?\"",
  },
  {
    scenario: "Full-day onsite (4–6 hours)",
    strategy: "Use a personal day, a vacation day, or a sick day. Don&apos;t explain the reason in detail. 'I have a personal commitment' is complete. If your role is remote, schedule a WFH day and block your calendar with 'Focus time' or 'External meetings.'",
    script: "Don&apos;t over-explain. Book the time off simply: 'I need to take Thursday off as a personal day.'",
  },
  {
    scenario: "Final rounds with multiple loops",
    strategy: "Some companies run 2–3 days of interviews for senior roles. Block a two-day stretch as PTO. If pressed by your manager, 'I have some family matters I need to attend to' is honest enough and doesn't invite follow-up.",
    script: "\"I can commit to Tuesday and Wednesday if that works for the panel.\"",
  },
];

const WHAT_TO_SAY = [
  {
    situation: "\"Why are you looking?\" (Interviewer asks)",
    answer: "\"I&apos;ve built something meaningful at [current company] — [one genuine accomplishment]. But the trajectory I want — [specific role advancement or domain] — isn&apos;t available there in the timeline I&apos;m thinking about. So I&apos;m being selectively open to the right opportunity.\"",
    why: "Never badmouth your current employer. Never claim you&apos;re 'passively looking' if you&apos;re actively interviewing — it reads as dishonest. 'Selectively open' is accurate and positions you as a strong candidate.",
  },
  {
    situation: "\"What&apos;s your timeline?\" (They want to know urgency)",
    answer: "\"I&apos;m not in a rush — I&apos;m currently employed and looking for the right fit, not just the next thing. If this role is the right move, I can make it work. Is there a specific timeline you&apos;re working toward on your end?\"",
    why: "Flipping the question back signals you&apos;re evaluating them too. It also forces them to share their hiring timeline, which is useful information.",
  },
  {
    situation: "\"Can we contact your current employer as a reference?\"",
    answer: "\"My search is confidential and I haven&apos;t informed my current employer — I&apos;d appreciate keeping it that way until we have an offer. I have strong references from past managers and colleagues I can provide. Is that workable?\"",
    why: "Most companies accept this. Companies that insist on contacting your current employer before an offer are red flags for discretion generally.",
  },
  {
    situation: "\"When can you start?\"",
    answer: "\"I&apos;d give two weeks notice minimum — I want to leave professionally. Depending on the role handoff, I might offer four weeks if the transition complexity calls for it. Is there a target start date on your end?\"",
    why: "Offering more than two weeks signals professionalism and low burn-bridge risk. It also gives you negotiating room if the role doesn&apos;t materialize — you can extend your timeline.",
  },
];

const FAQS = [
  {
    question: "Is it legal to job search while employed?",
    answer: "Yes, in virtually all employment contexts in the US. Your employer cannot legally prohibit you from looking for a new job during your personal time using personal devices and resources. What your employer CAN restrict: using company time, company devices, or company resources (email, phone) for job searching; soliciting colleagues to join you at a new employer while still employed; violating non-disclosure agreements in your interviews. Read your employment agreement for any garden leave or non-compete clauses — in many states (like California) these are unenforceable anyway, but know what's there."
  },
  {
    question: "Should I tell my manager I'm looking for a new job?",
    answer: "Almost never, and especially not early in the search. The risk is asymmetric: your manager may start managing you out, reduce your project load, or remove you from high-visibility work that makes you more marketable. There is almost no upside to disclosing early. The one exception: if you have an unusually trusted relationship and are looking because of factors your manager could actually fix (compensation, level, scope), having that conversation before searching can sometimes produce the outcome you want internally. But even then, wait until you have enough information to make a concrete ask."
  },
  {
    question: "How do I explain being actively employed on my resume and in interviews?",
    answer: "You don't need to explain it at all — being currently employed is a neutral-to-positive signal, not something that needs justification. What interviewers want to know is why you're looking, not why you're employed. Answer the motivation question directly ('I'm looking for X that my current role doesn't offer') and leave it at that."
  },
  {
    question: "What do I do if my current employer finds out I'm interviewing?",
    answer: "Stay calm — being found out is awkward but rarely catastrophic. If confronted, be honest but measured: 'I've been thinking about my career trajectory and wanted to understand the market. I haven't made any decisions.' Do not lie (it makes things worse) but don't volunteer more than asked. Then accelerate your search — the relationship with your employer has changed regardless of what they say in that conversation, and the safest position is having an offer in hand soon."
  },
];

export default async function JobSearchWhileEmployedPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Job Search While Employed — Without Getting Caught (2025)"
        description="Managing the privacy risk, interview scheduling, references, and the leverage a current job gives you."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/job-search-while-employed`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Job Search While Employed", url: `${BASE_URL}/blog/job-search-while-employed` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Job Search Strategy</span>
            <span className="text-[11px] text-white/30">11 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Job search while employed<br /><span className="gradient-text-animated">without getting caught</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Being employed during a job search is a significant advantage — better negotiating power, no urgency pressure, and a positive signal to employers. The challenge is doing it without creating career damage at your current job. Here&apos;s how to manage both.
          </p>
        </div>
      </section>

      {/* Privacy risks */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 5 privacy risks — and how to neutralize each one</h2>
          <div className="mt-8 space-y-5">
            {PRIVACY_RISKS.map((item) => (
              <div key={item.risk} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{item.risk}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${item.severity === "High" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                    {item.severity} risk
                  </span>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="px-6 py-4">
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                  <div className="bg-emerald-50/40 px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Fix</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leverage */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What your current job actually gives you</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Being employed isn&apos;t just a logistical challenge — it&apos;s a strategic asset. Most candidates don&apos;t use it well.</p>
          <div className="mt-7 space-y-4">
            {LEVERAGE_YOUR_JOB_GIVES_YOU.map((item) => (
              <div key={item.advantage} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{item.advantage}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview scheduling */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Scheduling interviews around a full-time job</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Every interview type has a scheduling strategy. Here&apos;s what to request and how to ask.</p>
          <div className="mt-7 space-y-4">
            {INTERVIEW_SCHEDULING.map((item) => (
              <div key={item.scenario} className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{item.scenario}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Strategy</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.strategy}</p>
                  </div>
                  <div className="bg-[var(--brand)]/[0.04] px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">What to say</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)] italic">{item.script}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to say */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What to say in 4 sensitive situations</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Word-for-word answers — and why each one works.</p>
          <div className="mt-7 space-y-4">
            {WHAT_TO_SAY.map((item) => (
              <div key={item.situation} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] bg-white px-5 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">Situation</p>
                  <p className="font-bold text-[var(--ink)]">{item.situation}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="px-5 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">What to say</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.answer}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Why it works</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Run your job search with an AI coach in your corner.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for ATS, coaches interview prep around your schedule, and helps you negotiate the offer you deserve — without anyone at your current job finding out. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
