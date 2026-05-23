import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Remote Work Resume — How to Position Yourself for Remote Jobs (2025)",
  description:
    "Hiring managers for remote roles scan for different signals than in-office hiring: asynchronous communication evidence, timezone flexibility, self-direction, and remote tool fluency. Most resumes ignore these signals entirely. How to position your remote work experience for maximum impact.",
  keywords: ["remote work resume", "remote job resume", "how to write a resume for remote jobs", "remote resume tips 2025", "work from home resume", "remote job search", "remote position resume"],
  alternates: { canonical: "/blog/remote-work-resume" },
  openGraph: {
    title: "Remote Work Resume — How to Position Yourself for Remote Jobs (2025)",
    description: "Remote hiring scans for async communication, timezone flexibility, self-direction, and remote tool fluency. Most resumes miss all of these signals. How to fix yours.",
    url: "/blog/remote-work-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_REMOTE_HIRING_LOOKS_FOR = [
  {
    signal: "Proof of remote execution, not just remote location",
    detail: "Working remotely during COVID doesn't signal remote effectiveness — every office worker did it involuntarily. What signals remote capability: sustained remote work across multiple roles, demonstrated output ownership without daily supervision, and cross-timezone collaboration at scale. If you've worked remotely by choice, surface that framing explicitly.",
    how_to_show: "Add '(Remote)' after job title for all remote roles. In your bullets, emphasize deliverables with clear ownership: 'owned end-to-end delivery of X' rather than 'contributed to X.' Quantify output, not hours worked.",
  },
  {
    signal: "Asynchronous communication competence",
    detail: "Remote teams run on asynchronous communication — written clarity, documentation quality, and the ability to move work forward without real-time interaction. Hiring managers look for evidence that you write well, document decisions, and don't require constant synchronous check-ins to make progress.",
    how_to_show: "Mention documentation work explicitly: 'wrote technical runbooks,' 'maintained project wikis,' 'authored post-mortems.' If you've managed distributed stakeholders, say so: 'aligned 4 cross-timezone teams via async project updates.' Any writing-heavy role is a remote advantage worth naming.",
  },
  {
    signal: "Remote tool fluency",
    detail: "Remote teams have a standard technology stack. Not listing these tools makes hiring managers uncertain about your baseline. The most universal remote tools: Slack, Notion, Linear, Jira, Confluence, Loom, Zoom, Miro, Figma, and GitHub. Industry-specific tools matter too (Salesforce for sales, HubSpot for marketing, Greenhouse for recruiting).",
    how_to_show: "Maintain a dedicated Skills or Tools section. List remote collaboration tools explicitly, separate from technical skills. 'Async-first communication: Slack, Notion, Loom, Linear' reads better than burying these in a long skills list.",
  },
  {
    signal: "Time zone and schedule transparency",
    detail: "Remote employers with distributed teams need to know your working timezone and availability overlap. This is especially important for companies hiring across multiple continents where overlap windows matter. Many candidates omit timezone information — it's a simple differentiator.",
    how_to_show: "Add your timezone to your contact header: 'San Francisco, CA (PST)' or 'UTC-8, available 9am-6pm PST.' In cover letters or LinkedIn notes, mention your overlap hours with the company's primary timezone if different.",
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    context: "Software Engineer — fully remote",
    before: "Worked with cross-functional teams to deliver product features on schedule.",
    after: "Delivered 3 major product features per quarter as sole owner across distributed team of 12 (US, UK, India timezones) — wrote design docs asynchronously, ran weekly Loom video reviews instead of sync meetings, and reduced feature delivery cycle from 6 weeks to 3.5 weeks by eliminating recurring standups.",
    why: "The 'before' bullet is indistinguishable from an in-office description. The 'after' names the distributed context, async communication methods, and a concrete outcome that demonstrates remote execution without supervision — the exact signals a remote-first hiring manager is looking for.",
  },
  {
    context: "Project Manager — hybrid to fully remote transition",
    before: "Managed project timelines and communicated with stakeholders across the organization.",
    after: "Managed 8 concurrent projects for 40-person distributed team (US + EMEA) using Notion for project tracking and Slack channels as the primary communication layer — moved from 12 weekly sync meetings to 3, replacing recurring updates with async Loom walkthroughs and documented decision logs. Project on-time delivery rate: 91% over 18 months.",
    why: "This bullet demonstrates explicit knowledge of how to replace in-person norms with remote equivalents — fewer sync meetings, async video, written decision logs. That's not just 'I worked remotely' — it's 'I built the systems to make remote work at scale,' which is what remote employers actually want to hire.",
  },
  {
    context: "Customer Success Manager — remote",
    before: "Managed customer relationships and helped customers achieve success with our product.",
    after: "Managed 45-account portfolio ($2.1M ARR) across US, UK, and Australia timezones with no in-person meetings — maintained 94% retention by building async touchpoint cadences (monthly Loom product updates, quarterly written business reviews) that replaced in-person QBRs. Customer-reported NPS: +72.",
    why: "Remote customer success is harder than in-person because you can't rely on relationship warmth from face-to-face contact. Showing that you built specific async touchpoints — Loom updates, written reviews — and achieved strong retention and NPS demonstrates you solved the remote relationship problem, not just that you had remote in your title.",
  },
];

const RESUME_SECTIONS_FOR_REMOTE = [
  { section: "Headline / Summary", remote_optimization: "Include 'remote' or 'distributed team' in your headline if actively targeting remote roles: 'Senior Product Manager | 4+ years remote-first teams | B2B SaaS.' This signals intent and surfaces for remote-specific recruiter searches.", mistake: "Using the same generic summary as an office job application without any remote-specific signals." },
  { section: "Location Line", remote_optimization: "List your city/timezone, not just 'Remote.' 'Austin, TX (CST) | Open to fully remote' tells employers your timezone for overlap planning and signals flexibility. For fully location-agnostic roles: 'Available globally | UTC-6.' Omitting location entirely creates uncertainty.", mistake: "Writing just 'Remote' as your location with no timezone or location context." },
  { section: "Experience Bullets", remote_optimization: "Tag every remote or distributed work experience. Add '(Remote)' after company name or job title. Prioritize bullets that demonstrate autonomous output, async communication, and cross-timezone collaboration over bullets about in-person activities.", mistake: "Listing the same bullets you'd write for an in-office version of the role, with no mention of remote context." },
  { section: "Skills / Tools", remote_optimization: "Create a dedicated 'Remote Work Tools' or 'Collaboration Tools' subsection: async communication (Slack, Loom, Notion), project management (Linear, Asana, Monday), video (Zoom, Gather), and role-specific remote tools (Figma for design, Miro for workshops).", mistake: "Burying remote tool experience in a long general skills list where it has no impact." },
];

const FAQS = [
  { question: "How should you indicate that a job was remote on your resume?", answer: "Two places: after the company name/location in your experience header ('Acme Corp — Remote' or 'Acme Corp — San Francisco, CA [Remote]'), and in your bullets when the remote context is relevant to the work. Don't just add '(Remote)' to every role and call it done — the signal that matters to remote employers is what you did remotely, not just that you had the status. Surface the asynchronous communication, distributed team scale, and self-directed delivery that made the remote work successful." },
  { question: "Do remote employers care about your location?", answer: "It depends on the company and role. Fully distributed companies often don't care about your location at all — they hire globally. Companies with a primary hub (US headquarters, for example) often need overlap hours with a specific timezone, even for remote roles. Some roles have legal restrictions (can only hire US-based for security clearance, state-specific for certain regulated roles). Always check the job posting for location requirements. When applying to a company with location flexibility, include your timezone explicitly so they don't have to guess — it removes a friction point from the decision." },
  { question: "What's the most common mistake on remote job applications?", answer: "The most common mistake: using an in-office resume for a remote application without any modification. Remote employers are screening for different signals — they want evidence of async communication, output ownership, and distributed team management. A resume that says 'collaborated with teams' and 'managed projects' without any remote-specific context looks exactly like every other applicant. The fix: go through every experience bullet and ask, 'Does this show that I can work effectively without in-person supervision?' If the answer is no, rewrite it to show how you actually worked — the tools you used, the async cadences you built, the autonomous decisions you made." },
];

export default async function RemoteWorkResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Remote Work Resume — How to Position Yourself for Remote Jobs (2025)"
        description="Remote hiring scans for async communication, timezone flexibility, self-direction, and remote tool fluency. Most resumes miss all of these signals. How to fix yours."
        url={`${BASE_URL}/blog/remote-work-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Remote Work Resume", url: `${BASE_URL}/blog/remote-work-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Remote Jobs</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Remote Work Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Remote hiring scans for different signals than office hiring: async communication evidence, self-directed output, timezone transparency, and distributed team experience. Most resumes are written for in-office roles and miss all of them.
          </p>
        </div>
      </section>

      {/* What remote hiring looks for */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What remote hiring managers actually look for</h2>
          <div className="mt-6 space-y-4">
            {WHAT_REMOTE_HIRING_LOOKS_FOR.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                <div className="mt-3 rounded-xl bg-[var(--bg)] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#4361EE] mb-1">How to show it</p>
                  <p className="text-[12.5px] text-[var(--muted)]">{item.how_to_show}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet transformations */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before and after — remote resume rewrites</h2>
          <div className="mt-6 space-y-6">
            {BULLET_TRANSFORMATIONS.map((item) => (
              <div key={item.context} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="bg-[var(--dark)] px-5 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/50">{item.context}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="p-5 bg-red-50/30">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-2">Before</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)] italic">&ldquo;{item.before}&rdquo;</p>
                  </div>
                  <div className="p-5 bg-emerald-50/30">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">After</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">&ldquo;{item.after}&rdquo;</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] px-5 py-3 bg-[var(--bg)]">
                  <p className="text-[12px] leading-5 text-[var(--muted)]"><span className="font-bold text-[var(--ink)]">Why it works: </span>{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume sections */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Section-by-section remote optimization</h2>
          <div className="mt-6 space-y-4">
            {RESUME_SECTIONS_FOR_REMOTE.map((item) => (
              <div key={item.section} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{item.section}</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-emerald-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">Remote optimization</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{item.remote_optimization}</p>
                  </div>
                  <div className="rounded-xl bg-red-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Common mistake</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{item.mistake}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari rewrites your resume for remote job applications — then coaches your interview.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your resume against the remote job description — identifying async communication gaps, rewriting bullets to surface distributed work experience, and validating ATS formatting. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
