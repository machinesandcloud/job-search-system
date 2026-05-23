import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "LinkedIn Job Search — How to Use LinkedIn to Find and Land Jobs (2025)",
  description:
    "Most people use LinkedIn to browse job postings. The professionals who consistently land roles use it completely differently — for inbound recruiter discovery, warm outreach, and social proof. How to use LinkedIn for your job search the right way.",
  keywords: ["linkedin job search", "how to use linkedin to find a job", "linkedin job search tips", "linkedin for job seekers 2025", "linkedin job alerts", "linkedin apply for jobs", "linkedin recruiter search"],
  alternates: { canonical: "/blog/linkedin-job-search" },
  openGraph: {
    title: "LinkedIn Job Search — How to Use LinkedIn to Find and Land Jobs (2025)",
    description: "Most people use LinkedIn to browse postings. The professionals who land roles use it for inbound discovery, warm outreach, and social proof. The complete job search guide.",
    url: "/blog/linkedin-job-search",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const HOW_MOST_PEOPLE_USE_IT = [
  "Browse the LinkedIn Jobs feed reactively — applying to whatever appears",
  "Upload a resume and click Easy Apply on dozens of roles",
  "Wait for recruiter messages that never come",
  "Treat their LinkedIn profile as a static resume instead of a searchable document",
];

const FIVE_STRATEGIES = [
  {
    strategy: "Optimize for search before you apply anywhere",
    what: "LinkedIn's recruiter search algorithm matches candidates based on profile content — job title, headline, skills, and keywords in the About and experience sections. Most job seekers focus on applying; the highest-leverage LinkedIn activity is making your profile findable before you open a single job listing.",
    how: "Update your headline to include the exact job title you're targeting — not your current title if they differ. Add your target keywords to the Skills section (LinkedIn allows 50 skills; use them). Rewrite your About section with the language of your next role, not a summary of your current one. Set your 'Open to Work' setting to private (visible only to recruiters) — it increases recruiter contact without signaling desperation to your current employer.",
    impact: "Candidates with optimized profiles receive 5x more recruiter messages than those with incomplete profiles, according to LinkedIn's own data. This is inbound — recruiters come to you.",
  },
  {
    strategy: "Use job alerts — not daily browsing",
    what: "Browsing the LinkedIn Jobs feed is reactive and inefficient. The most effective approach is setting specific, narrow job alerts that notify you immediately when a matching role is posted — then applying within 24–48 hours of posting.",
    how: "Create alerts for specific job titles in specific locations with specific seniority levels. Set the frequency to daily or as soon as possible. Apply within the first 48 hours of a posting — applications submitted on day 1–2 are reviewed before the applicant pool becomes competitive. For roles you're highly interested in, find the hiring manager's LinkedIn profile and send a connection request the same day you apply.",
    impact: "Applications submitted in the first 48 hours of a job posting have a 2x higher callback rate than applications submitted after 7+ days. Speed matters more than most candidates realize.",
  },
  {
    strategy: "Warm outreach — the LinkedIn message before the application",
    what: "Applying cold to a LinkedIn job posting is the least effective use of the platform. The most effective use is reaching out to the hiring manager or a team member before applying — creating familiarity before the application lands.",
    how: "Find the hiring manager's profile using the company page or LinkedIn search. Send a brief, specific connection note: 'I'm about to apply for [role] — I wanted to introduce myself first. I've been following [company's] work on [specific thing] and have [specific relevant background]. I'll submit my application today.' If accepted, send a 3-sentence follow-up with your strongest relevant qualification. Then apply through the formal channel.",
    impact: "Applications with a preceding LinkedIn touch point from a known connection are 4x more likely to be reviewed by the hiring manager directly. The message doesn't need to be impressive — the contact just needs to exist.",
  },
  {
    strategy: "Engage strategically with your target company's content",
    what: "LinkedIn's algorithm amplifies content to the connections and followers of people who engage with it. Thoughtfully engaging with content from your target company or its employees creates visibility in the feed of people who will eventually review your application.",
    how: "Follow your target companies. Follow the hiring managers and team members at those companies. When they post, leave specific, substantive comments — not 'great post!' but a 2–3 sentence observation that adds to the conversation. Do this 2–3 times per week across 5–10 target people. By the time you apply, some percentage of those people will recognize your name.",
    impact: "Profile views increase significantly when you're actively engaging on the platform. More importantly, name recognition from thoughtful comments converts a cold application into a warm one.",
  },
  {
    strategy: "Post your own content — even monthly",
    what: "One LinkedIn post per month that shares a genuine professional insight positions you as someone with expertise, not just someone seeking a job. When recruiters visit your profile (which they do before reaching out), active posters look like engaged professionals.",
    how: "Write about a problem you solved, a lesson from a recent project, or an observation about your industry. 100–300 words. No hashtag overload. First-person, specific, honest. Tag no one unless relevant. Post on Tuesday, Wednesday, or Thursday for maximum reach. Engage with the comments for 24 hours after posting.",
    impact: "Professionals who post regularly on LinkedIn receive 6x more profile views than those who don't. This is compounding — each post extends your reach slightly, and the cumulative effect over 3–6 months is significant.",
  },
];

const LINKEDIN_EASY_APPLY = {
  when_to_use: "For lower-competition roles where you have a strong match against the requirements, and where you're comfortable with the volume approach. Easy Apply is faster than going through a company's careers page — but it comes with tradeoffs.",
  when_not_to_use: "For highly competitive roles (Director+, well-known companies, hot job markets) where standing out matters more than volume. Easy Apply aggregates hundreds of applicants — your application is one of many with identical presentation.",
  how_to_use_it_well: "Never click Easy Apply with the default LinkedIn profile as your application. Either tailor your LinkedIn profile to match the specific role before applying, or download a custom resume and upload it. Include a cover note in the message field every time — even 2–3 sentences acknowledging the specific role and your strongest qualification. It takes 60 seconds and most applicants skip it.",
};

const FAQS = [
  { question: "Is LinkedIn better than job boards for finding jobs?", answer: "Depends on your career level and target role. For professional roles (especially anything with 'manager,' 'director,' 'senior,' or technical specialties), LinkedIn is the primary platform for both active job search and passive recruiter sourcing. For hourly, retail, entry-level, and trade roles, job boards like Indeed tend to have more listings. The biggest LinkedIn advantage isn't the job postings — it's the recruiter discovery and warm outreach functionality that no job board can replicate." },
  { question: "How often should you check LinkedIn when job searching?", answer: "Set up job alerts rather than checking manually — you should receive notifications immediately when matching roles are posted, which is more efficient than daily browsing. For active job searching: check recruiter messages daily (respond within 24 hours), engage with your target companies' content 3x per week, and review your job alert notifications within 48 hours of receiving them. For passive job searching: check messages 2–3x per week and ensure your profile stays updated." },
  { question: "Does LinkedIn Easy Apply actually work?", answer: "Yes — with the right approach. Easy Apply's weakness is that it produces identical application presentations for hundreds of applicants. The way to differentiate: (1) Use the cover message field every time with 2–3 specific sentences; (2) Ensure your LinkedIn profile is tailored for the role before applying — recruiters click through to your full profile, not just your Easy Apply submission; (3) Apply within 48 hours of the posting. Easy Apply used strategically outperforms most other application channels for speed and convenience — it fails when used as a mass-apply button without any personalization." },
];

export default async function LinkedInJobSearchPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="LinkedIn Job Search — How to Use LinkedIn to Find and Land Jobs (2025)"
        description="Most people use LinkedIn to browse postings. The professionals who land roles use it for inbound discovery, warm outreach, and social proof. The complete job search guide."
        url={`${BASE_URL}/blog/linkedin-job-search`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "LinkedIn Job Search", url: `${BASE_URL}/blog/linkedin-job-search` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">LinkedIn · Job Search Strategy</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">LinkedIn Job Search</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most people use LinkedIn to browse job postings and click Easy Apply. The professionals who consistently land roles use it for inbound recruiter discovery, warm outreach, and social proof — before they ever open the Jobs tab.
          </p>
        </div>
      </section>

      {/* How most people use it */}
      <section className="bg-[var(--bg)] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.4rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How most people use LinkedIn for job search</h2>
          <div className="mt-4 space-y-2">
            {HOW_MOST_PEOPLE_USE_IT.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-3">
                <span className="text-red-500 text-[14px]">✗</span>
                <p className="text-[13.5px] text-[var(--muted)]">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-[var(--muted)]">These approaches treat LinkedIn as a job board. LinkedIn is a search engine for talent — the professionals who use it that way get dramatically different results.</p>
        </div>
      </section>

      {/* Strategies */}
      <section className="bg-[var(--bg)] pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 LinkedIn job search strategies that actually work</h2>
          <div className="mt-8 space-y-5">
            {FIVE_STRATEGIES.map((item, i) => (
              <div key={item.strategy} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[14px] font-extrabold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-[var(--ink)]">{item.strategy}</h3>
                    <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.what}</p>
                    <div className="mt-3 rounded-xl bg-[var(--bg)] p-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">How to do it</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{item.how}</p>
                    </div>
                    <div className="mt-3 rounded-xl bg-emerald-50 p-3">
                      <p className="text-[12px] font-semibold text-emerald-700"><span className="font-bold">Impact: </span>{item.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Easy Apply */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">LinkedIn Easy Apply — when it works and when it doesn&apos;t</h2>
          <div className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-emerald-50 p-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">When to use Easy Apply</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{LINKEDIN_EASY_APPLY.when_to_use}</p>
              </div>
              <div className="rounded-xl bg-red-50 p-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-500">When not to use Easy Apply</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{LINKEDIN_EASY_APPLY.when_not_to_use}</p>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">How to use Easy Apply effectively</p>
              <p className="text-[13.5px] leading-6 text-[var(--muted)]">{LINKEDIN_EASY_APPLY.how_to_use_it_well}</p>
            </div>
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
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari optimizes your LinkedIn profile for recruiter search — then coaches you to land the roles that find you.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari rewrites your LinkedIn headline, About section, and skills for maximum recruiter discoverability — then coaches your resume and interview when the right role appears. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
