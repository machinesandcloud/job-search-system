import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job Fast — The 30-Day Playbook (2025)",
  description:
    "The specific tactics that compress a job search from months to weeks — optimized applications, warm referrals, recruiter outreach, and interview prep that moves at the speed of an urgent search.",
  keywords: ["how to get a job fast", "how to find a job fast", "get a job quickly", "fast job search", "how to job hunt fast", "get hired quickly 2025"],
  alternates: { canonical: "/blog/how-to-get-a-job-fast" },
  openGraph: {
    title: "How to Get a Job Fast — The 30-Day Playbook (2025)",
    description: "The specific actions that compress a 3-month search into 30 days — with a week-by-week plan and what not to do when urgency is high.",
    url: "/blog/how-to-get-a-job-fast",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHY_SEARCHES_TAKE_TOO_LONG = [
  { mistake: "Applying broadly to every relevant listing", impact: "Sending 50 generic applications produces fewer responses than 10 tailored ones. ATS systems filter unoptimized applications, and generic cover notes get ignored. Volume without optimization just means faster rejection." },
  { mistake: "Waiting for applications to come back before doing anything else", impact: "Application-to-response time is typically 2–6 weeks. If you only apply and wait, you're locked into a slow loop. A compressed search runs multiple tracks simultaneously — applying, networking, and doing recruiter outreach in parallel." },
  { mistake: "Ignoring the warm network until applications fail", impact: "Referrals have a 4–8× higher interview rate than cold applications. Most candidates use their network as a last resort; fast job searchers use it first. A warm introduction to a hiring manager bypasses ATS entirely." },
  { mistake: "Underprepared for the first interview", impact: "Early interviews are filters — they're not given a second chance. Candidates who get an interview and aren't prepared lose 2–4 weeks of search time while the company restarts its process or moves to other candidates." },
];

const WEEK_BY_WEEK = [
  {
    week: "Week 1 — Optimize before you apply",
    goal: "Get your assets ready to convert at high rates, not just apply at high volume.",
    actions: [
      { action: "Optimize your resume for ATS", detail: "Take your top 3 target role types and run your resume through Zari against 3 representative job descriptions. Fix the keyword gaps before you apply to anything. One hour of optimization here saves weeks of silence." },
      { action: "Update your LinkedIn for recruiter search", detail: "Change your headline to match what recruiters search for. Enable 'Open to Work' (set to recruiters only, not public). Add skills that appear in your target job descriptions. Update your About section." },
      { action: "Build a target company list of 15–20", detail: "Not just any company — companies where you have some connection (alumni, current employees you know, companies whose products you've used professionally). Warm connections multiply your speed." },
      { action: "Draft 3 outreach templates", detail: "One for recruiters on LinkedIn, one for hiring managers, one for warm connections. Test them early so you can refine before the main send volume." },
    ],
  },
  {
    week: "Week 2 — Activate all channels simultaneously",
    goal: "Don't pick one channel. Run all of them in parallel.",
    actions: [
      { action: "Apply to 10–15 roles (targeted, tailored)", detail: "Each application should have your resume tailored to the specific job description. Not every word — swap the summary and make sure the top 8 keywords from the JD appear in your resume. This alone doubles response rate." },
      { action: "Reach out to 10 warm connections at target companies", detail: "Not 'can you refer me' cold. 'I saw [Company] is hiring for [role]. I know you work there — would you be willing to share any context on the team or culture? I'm applying and want to make sure I'm a good fit.' This generates referrals naturally." },
      { action: "Message 5 recruiters directly on LinkedIn", detail: "Search for '[role] recruiter [company]' or '[role] talent acquisition [company].' Send a short, specific InMail or connection note: 'I saw [Company] is hiring for [role]. My background in [X] and [Y] is directly relevant — would love to connect.' Specific is more likely to get a response than generic." },
      { action: "Set up job alerts on 3 platforms", detail: "Indeed, LinkedIn, and one niche board for your field. Set alerts for your exact target role titles. New listings get the most applicant attention in the first 48 hours — applying fast matters." },
    ],
  },
  {
    week: "Week 3 — Accelerate what's working",
    goal: "Double down on channels generating responses. Don't throw more volume at what isn't.",
    actions: [
      { action: "Follow up on Week 1 applications (if no response)", detail: "After 10–14 business days with no response, one short follow-up is appropriate. Find the recruiter or hiring manager on LinkedIn and send a brief, professional check-in. This surfaces you from the pile and shows initiative." },
      { action: "Prepare for interviews coming from Week 2 outreach", detail: "For any screening call scheduled, do 30 minutes of company research and practice your 'tell me about yourself' answer before the call. Most candidates don't prepare for phone screens — the ones who do advance at higher rates." },
      { action: "Identify the referral gap and close it", detail: "If you applied to 10 companies and have no warm connections at 7 of them, use LinkedIn to find 2nd-degree connections who work there. Ask a mutual connection to make an introduction. One referral is worth 5–10 cold applications." },
      { action: "Apply to 10 more (with fresh tailoring)", detail: "New applications, new tailoring. Don't reuse Week 1's resume without checking the new job descriptions for different keyword priorities." },
    ],
  },
  {
    week: "Week 4 — Convert pipeline to offers",
    goal: "First interviews are in process. Focus on conversion, not sourcing more applications.",
    actions: [
      { action: "Deep interview prep for any advancing conversations", detail: "For every hiring manager interview, do company research (recent news, product launches, financials if public), prepare 3 questions that show knowledge of their specific situation, and practice your behavioral stories with the STAR method." },
      { action: "Keep the pipeline fresh", detail: "Apply to 5–8 more roles. Even if you're far along in a process, never have a single-threaded search. Processes fall through — a second or third pipeline thread prevents a restart from scratch." },
      { action: "Evaluate and negotiate any early offers thoughtfully", detail: "If an early offer comes and you have other processes in play, it's appropriate to say: 'I'm very interested. I have another process I'm committed to completing this week — can I give you a decision by [specific date]?' Most companies will accommodate 5–7 business days." },
    ],
  },
];

const FAST_TRACK_TACTICS = [
  { tactic: "Apply within 48 hours of posting", detail: "LinkedIn research shows applications submitted in the first 48 hours of a job posting are 4× more likely to advance than those submitted a week later. New postings get heavy recruiter attention; old postings get buried. Set alerts and move fast." },
  { tactic: "Email the hiring manager directly after applying", detail: "After submitting through the ATS, find the hiring manager on LinkedIn (their name is often in the job description or on the company page). Send a brief, specific note: 'I just applied for [role] and wanted to reach out directly. My [specific experience] seems like a strong match for [specific requirement].' This gets you read before the ATS screening cycle completes." },
  { tactic: "Schedule phone screens as soon as offered", detail: "Don't delay scheduling. Every day between interest and scheduling is a day another candidate could advance. When a recruiter reaches out, respond within 2 hours if possible and propose specific times for the same or next business day." },
  { tactic: "Compress the reference process", detail: "Tell your references you're in an active search and may need them to respond quickly. Give them a 2-sentence summary of the role you're interviewing for so they can contextualize their response. Reference delays can cost a week." },
];

const FAQS = [
  {
    question: "How long does it take to get a job?",
    answer: "The average job search takes 3–6 months for professional roles in the US. Entry-level roles can be faster (4–8 weeks); senior and executive searches typically run 3–6 months minimum due to longer hiring cycles and committee decisions. An optimized search — tailored applications, warm referrals, parallel channels — typically compresses to 4–8 weeks for mid-level candidates. The biggest time savings come from eliminating the weeks spent on unoptimized volume applications that never get responses."
  },
  {
    question: "What is the fastest way to get hired?",
    answer: "Warm referrals are the single fastest path. A referral from a current employee at your target company bypasses ATS screening entirely and goes directly to the hiring manager's attention — who typically reviews referrals within days, not weeks. If you have no warm connections, the next fastest path is: tailored application → direct LinkedIn message to hiring manager → recruiter outreach, all within 48 hours of finding the listing."
  },
  {
    question: "Can you get a job in 2 weeks?",
    answer: "For some roles, yes — especially if you have warm referrals, a strong match, and the company has a fast-moving hiring process (startups, urgent backfills, contract roles). For corporate roles at larger companies, 2 weeks from first application to offer is rare but not impossible if you're a direct referral or a particularly strong match. Realistically, 4–6 weeks is the fastest you should plan for in a compressed active search without referrals."
  },
  {
    question: "How many jobs should you apply to per week?",
    answer: "Quality over quantity: 8–15 tailored applications per week is optimal for most candidates. More than 20 per week usually means the applications are not tailored — which reduces response rate and wastes time. Each application should have your resume adjusted to include the top keywords from that specific job description. If you're applying to 30+ jobs per week and not tailoring, you'll get fewer responses than someone applying to 10 tailored roles."
  },
];

export default async function HowToGetAJobFastPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Get a Job Fast — The 30-Day Playbook (2025)"
        description="The specific actions that compress a 3-month search into 30 days — with a week-by-week plan."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/how-to-get-a-job-fast`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Get a Job Fast", url: `${BASE_URL}/blog/how-to-get-a-job-fast` },
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
            How to get a job fast<br /><span className="gradient-text-animated">the 30-day playbook</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most job searches take 3–6 months. They don&apos;t need to. The difference between a fast search and a slow one is almost entirely strategy — running the right channels in parallel, optimizing before applying, and not waiting for one track to fail before starting another.
          </p>
        </div>
      </section>

      {/* Why searches take too long */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 mistakes that make job searches take months instead of weeks</h2>
          <div className="mt-7 space-y-4">
            {WHY_SEARCHES_TAKE_TOO_LONG.map((item) => (
              <div key={item.mistake} className="overflow-hidden rounded-xl border border-red-100 bg-white">
                <div className="border-b border-red-100 bg-red-50/40 px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{item.mistake}</p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Week by week */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 30-day plan — week by week</h2>
          <div className="mt-7 space-y-6">
            {WEEK_BY_WEEK.map((week, wi) => (
              <div key={week.week} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] bg-white px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[13px] font-bold text-white">{wi + 1}</span>
                    <div>
                      <p className="font-extrabold text-[var(--ink)]">{week.week}</p>
                      <p className="text-[12.5px] text-[var(--muted)]">{week.goal}</p>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  {week.actions.map((action) => (
                    <div key={action.action} className="px-6 py-4">
                      <p className="font-semibold text-[var(--ink)] mb-1">{action.action}</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{action.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fast-track tactics */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 fast-track tactics most candidates skip</h2>
          <div className="mt-7 space-y-3">
            {FAST_TRACK_TACTICS.map((item, i) => (
              <div key={item.tactic} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.tactic}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Fast job search FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Compress your search with AI coaching at every step.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for ATS in minutes, coaches interview prep on your schedule, and helps you negotiate the offer — so every application converts at a higher rate. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
