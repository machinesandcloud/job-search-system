import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "25 Job Search Tips That Actually Work in 2025",
  description:
    "25 job search strategies that work in 2025. Covers ATS, networking, LinkedIn, referrals, cover letters, follow-up, and the mindset mistakes that extend your search.",
  keywords: ["job search tips", "job search strategies", "how to find a job", "job search advice 2025", "job search tips 2025", "how to job search effectively", "job search help", "how to get a job faster"],
  alternates: { canonical: "/blog/job-search-tips" },
  openGraph: { title: "25 Job Search Tips That Actually Work in 2025", description: "25 specific, actionable job search strategies — covering ATS, LinkedIn, networking, referrals, and the mindset mistakes that slow you down.", url: "/blog/job-search-tips" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-01";
const MODIFIED = "2025-05-16";

const TIPS = [
  { category: "Resume and ATS", tips: [
    { n: 1, tip: "Tailor your resume for every application", detail: "Not entirely — keep the structure. But change your summary and adjust bullet emphasis to match the specific role. The top third of your resume should read like it was written for this job." },
    { n: 2, tip: "Use the job description's language in your resume", detail: "ATS systems match keywords, and recruiters pattern-match to the JD. If the JD says 'go-to-market strategy,' your resume should say 'go-to-market strategy' — not 'GTM planning.'" },
    { n: 3, tip: "Lead every bullet with impact, not activity", detail: "'Reduced customer churn by 18%' beats 'Responsible for customer retention initiatives.' Start with the outcome." },
    { n: 4, tip: "Check your ATS score before applying", detail: "Tools like Zari's ATS checker tell you your keyword match score before you submit. A score below 60% means the resume will likely be filtered before a human sees it." },
    { n: 5, tip: "Remove all tables, columns, and text boxes from your resume", detail: "ATS systems can't read text inside tables or columns. Switch to a simple, single-column format for any role where the application goes through an ATS (i.e., most corporate roles)." },
  ]},
  { category: "Networking and referrals", tips: [
    { n: 6, tip: "A referral multiplies your chances by 5-10x", detail: "Most companies prioritize referred candidates. Before applying cold, check if you have a first- or second-degree LinkedIn connection at the company. A warm intro from anyone at the company is worth more than a strong application." },
    { n: 7, tip: "Ask for referrals from past colleagues first, not strangers", detail: "People who've worked with you can vouch for you. People who only know you from LinkedIn cannot. Start with former teammates and managers." },
    { n: 8, tip: "Reconnect with your network before you need it", detail: "Starting a network from scratch when you're actively searching is harder. If you're employed, maintain your network now — you'll have more leverage and less urgency." },
    { n: 9, tip: "LinkedIn messages work better than emails for outreach", detail: "Shorter, clearer ask. 'I saw you work at Acme — I'm exploring opportunities in [your space] and would love 15 minutes to learn about your experience there' converts better than a formal cold email." },
    { n: 10, tip: "Follow up exactly once", detail: "No response after a week? One follow-up is appropriate. Two follow-ups with no response means move on. Persistence signals desperation at this stage." },
  ]},
  { category: "LinkedIn", tips: [
    { n: 11, tip: "Turn on Open to Work (recruiters-only mode)", detail: "LinkedIn's 'recruiters only' Open to Work setting flags your profile to recruiters without publicly displaying a green banner. Use it — it meaningfully increases inbound reach." },
    { n: 12, tip: "Your headline should contain your target job title", detail: "Recruiters search by job title. If your headline says 'Building the future' instead of 'Product Manager | B2B SaaS | Growth,' you're invisible in search." },
    { n: 13, tip: "Optimize your LinkedIn before you apply anywhere", detail: "Recruiters look up every candidate who applies. A weak LinkedIn profile undermines a strong resume. Get the profile right first." },
    { n: 14, tip: "Post one piece of content per week", detail: "Not required, but effective. Professionals who post consistently on LinkedIn get 2-5x more profile views from recruiters. Keep it relevant to your industry." },
  ]},
  { category: "Applications and interviews", tips: [
    { n: 15, tip: "Apply within 48 hours of a job posting", detail: "Recency matters. Applications submitted in the first 48 hours are significantly more likely to be reviewed. Set up job alerts for your target roles and apply fast." },
    { n: 16, tip: "Cover letters are optional — but use the option", detail: "Most candidates don't submit one when it's optional. A strong, specific cover letter is a free advantage. A generic one is worse than nothing." },
    { n: 17, tip: "Research the company before every interview", detail: "Not their 'About' page — their actual products, recent news, the interviewer's LinkedIn, what current employees say on Glassdoor, and what the job description reveals about their problems." },
    { n: 18, tip: "Prepare 5 stories that answer any behavioral question", detail: "A challenge you overcame, a failure you learned from, a cross-functional win, a time you disagreed and were right, and your biggest impact. These 5 stories cover 90% of behavioral questions." },
    { n: 19, tip: "Send a thank you email within 2-4 hours", detail: "Most candidates don't. A specific, brief thank you email (referencing something from the conversation) is a low-effort way to reinforce your candidacy." },
    { n: 20, tip: "Ask for feedback when you're rejected", detail: "Most companies won't give detailed feedback. But some do — and even vague feedback helps you calibrate. 'We went with someone with more [X] experience' is actionable information." },
  ]},
  { category: "Mindset and strategy", tips: [
    { n: 21, tip: "Quality over quantity for targeted roles, quantity for entry-level", detail: "If you're targeting specific senior roles at specific companies, 10 tailored applications beat 100 generic ones. At entry level, volume matters more because you're building a funnel." },
    { n: 22, tip: "Track every application in a spreadsheet", detail: "Company, role, date applied, status, next action. Without tracking, you lose visibility into your pipeline and miss follow-up moments." },
    { n: 23, tip: "Treat job searching like a part-time job", detail: "Structure your time: specific hours for applications, specific hours for networking, specific hours for interview prep. Unstructured job searching produces less output and more anxiety." },
    { n: 24, tip: "Set a target of 5-10 applications per week (senior roles) or 20+ (entry-level)", detail: "Most people apply to too few or too many. Find the right volume for your level and maintain it consistently rather than bursting and pausing." },
    { n: 25, tip: "Don't stop searching until you've signed", detail: "Verbal offers fall through. 'We're moving to offer stage' falls through. Keep applying until you have a signed offer letter and a start date." },
  ]},
];

export default async function JobSearchTipsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="25 Job Search Tips That Actually Work in 2025"
        description="25 specific, actionable job search strategies — covering ATS, LinkedIn, networking, referrals, and the mindset mistakes that slow you down."
        url={`${BASE_URL}/blog/job-search-tips`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Job Search Tips", url: `${BASE_URL}/blog/job-search-tips` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Job Search</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">25 Job Search Tips That Actually Work in 2025</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 13 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Job searching in 2025 is harder than it was in 2021 — more applicants, more ATS filtering, and more noise. The strategies that worked five years ago are table stakes. Here are 25 things that still move the needle.
            </p>

            {TIPS.map((section) => (
              <div key={section.category}>
                <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">{section.category}</h2>
                <div className="mt-5 space-y-4">
                  {section.tips.map((tip) => (
                    <div key={tip.n} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{tip.n}</div>
                      <div>
                        <p className="mb-1.5 font-bold text-[var(--ink)]">{tip.tip}</p>
                        <p className="text-[13.5px] leading-6 text-[var(--muted)]">{tip.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Get your full job search coached by AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Resume, LinkedIn, interview prep, and salary negotiation — one AI career coach for your entire job search.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start job search coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
