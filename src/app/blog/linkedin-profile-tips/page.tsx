import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "LinkedIn Profile Tips 2025 — Optimize Your Profile for Recruiters",
  description:
    "22 actionable LinkedIn profile tips to increase recruiter visibility, improve your SSI score, and get more inbound messages. Covers headline, About, experience, skills, and creator mode.",
  keywords: [
    "LinkedIn profile tips",
    "how to optimize LinkedIn profile",
    "LinkedIn profile tips 2025",
    "LinkedIn headline tips",
    "LinkedIn profile for job seekers",
    "LinkedIn About section tips",
    "LinkedIn profile optimization",
    "LinkedIn recruiter visibility",
    "LinkedIn SSI score",
    "improve LinkedIn profile",
  ],
  alternates: { canonical: "/blog/linkedin-profile-tips" },
  openGraph: {
    title: "LinkedIn Profile Tips 2025 — 22 Tactics to Get Recruiter Visibility",
    description: "22 LinkedIn profile optimisation tips that increase recruiter visibility and inbound messages. Headline, About, experience, skills, and more.",
    url: "/blog/linkedin-profile-tips",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What's the most important part of a LinkedIn profile?",
    answer: "The headline is the single highest-leverage element. It appears in every search result, every connection notification, every comment you make. Most people write their job title — which is exactly what everyone else writes. A differentiated headline with keywords, specialisation, and a value signal dramatically increases both click-through from search results and recruiter outreach.",
  },
  {
    question: "How long should a LinkedIn About section be?",
    answer: "300–400 words is the sweet spot. Long enough to include the key keywords recruiters search, short enough that recruiters with 3 seconds actually read it. The first 2 lines are the most critical — they're visible before the 'see more' cutoff. Lead with a value statement or specific claim, not 'I am a passionate professional'.",
  },
  {
    question: "Should I use 'Open to Work' on LinkedIn?",
    answer: "Use the private 'Share with recruiters' option, not the public green banner. The public banner is visible to your current employer and to everyone in your network — which can be problematic if you're in a confidential job search. The private option shares your status only with LinkedIn recruiters (including those using LinkedIn Recruiter) without the public indicator.",
  },
  {
    question: "Do LinkedIn skills and endorsements matter?",
    answer: "Yes, but specifically for search. LinkedIn's algorithm uses the skills section as a major keyword source for recruiter search results. Add 30–50 skills that match the roles you're targeting. The number of endorsements matters less than the presence of the skill keyword itself — though 10+ endorsements on a skill signals legitimacy.",
  },
  {
    question: "How often should I post on LinkedIn to help my job search?",
    answer: "Posting 1–2 times per week is enough to increase profile views by 3–5× compared to a dormant profile. You don't need to post original insights every time — sharing an article with a short personal take, commenting thoughtfully on industry leaders' posts, or sharing a work milestone all increase your visibility with recruiters and connections in your target space.",
  },
];

const TIPS = [
  { num: "01", section: "Headline", tip: "Don't write your job title. Write your value + specialization + keywords.", example: "Bad: \"Software Engineer at Acme\"\nGood: \"Senior Software Engineer | Backend Systems & Distributed Infra | Golang · AWS · Kafka\"", color: "#0A66C2" },
  { num: "02", section: "Headline", tip: "Include the exact keywords recruiters search for your target role.", example: "Use LinkedIn's typeahead to see what terms auto-complete for your role. Those are the keywords recruiters are using.", color: "#0A66C2" },
  { num: "03", section: "Profile Photo", tip: "Use a high-contrast, forward-facing, professional photo. Profiles with photos get 21× more views.", example: "Face takes up 60% of the frame. Plain or light background. Smile or neutral expression.", color: "#7C3AED" },
  { num: "04", section: "Background Image", tip: "Replace the default blue banner with something relevant to your work.", example: "A city skyline if you're location-specific, a code screenshot if you're technical, your company's product. Anything is better than the default.", color: "#7C3AED" },
  { num: "05", section: "About Section", tip: "Lead with a 1-sentence value claim, not 'I am passionate about...'", example: "\"I build backend systems that process 50M+ events/day. Currently focused on distributed data pipelines and real-time analytics at scale.\"", color: "#059669" },
  { num: "06", section: "About Section", tip: "Include the keyword phrase 'open to opportunities' if you're job searching — recruiters search for it.", example: "Add it naturally: '...and open to new opportunities in fintech infrastructure and payments engineering.'", color: "#059669" },
  { num: "07", section: "Experience", tip: "Rewrite every bullet to start with an action verb and end with a metric.", example: "Bad: \"Responsible for backend development\"\nGood: \"Redesigned the data ingestion layer, reducing p99 latency from 2.1s to 340ms for 8M daily active users.\"", color: "#DC2626" },
  { num: "08", section: "Experience", tip: "Each role should have 3–5 bullets. Recruiters don't read paragraphs.", example: "Use bullets, not prose. Each bullet = one accomplishment with a number. If you can't add a number, use a concrete qualifier: 'cross-functional', 'org-wide', 'customer-facing'.", color: "#DC2626" },
  { num: "09", section: "Skills", tip: "Add 30–50 skills. The skills section is a major keyword source for LinkedIn's search algorithm.", example: "Include both technical skills (Python, AWS, SQL) and soft skills that appear in job descriptions (cross-functional leadership, stakeholder management).", color: "#D97706" },
  { num: "10", section: "Recommendations", tip: "3+ recommendations dramatically increases credibility signals.", example: "Ask your 3 most recent managers or closest collaborators. Give them a template: what project to mention, what skill to highlight. Make it easy for them.", color: "#0A66C2" },
];

export default async function LinkedinProfileTipsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="LinkedIn Profile Tips 2025"
        description="22 actionable LinkedIn profile tips to increase recruiter visibility and inbound messages."
        url={`${BASE_URL}/blog/linkedin-profile-tips`}
        datePublished="2025-05-20"
        dateModified="2025-05-20"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: "LinkedIn Profile Tips", url: `${BASE_URL}/blog/linkedin-profile-tips` },
        ]}
      />

      <section
        className="relative overflow-hidden pb-16 pt-14 text-white"
        style={{ background: "linear-gradient(135deg, #0A66C2 0%, #004182 50%, #001e41 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">LinkedIn</span>
            <span className="text-[12px] text-white/35">14 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            22 LinkedIn Profile Tips<br /><span className="text-white/50">to Get Recruiter Visibility in 2025</span>
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">
            Most LinkedIn profiles are invisible to recruiters — not because the person is unqualified, but because the profile isn&apos;t written for LinkedIn&apos;s search algorithm. These 22 changes fix that.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={21} suffix="×" label="more views for profiles with photos vs without" accent="#0A66C2" />
            <StatCard value={40} suffix="%" label="of job seekers found their role through LinkedIn" accent="#7C3AED" />
            <StatCard value={87} suffix="%" label="of recruiters use LinkedIn as a primary sourcing tool" accent="#059669" />
            <StatCard value={54} label="→ 91 average visibility score improvement with Zari" accent="#DC2626" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-8 text-[1.7rem] font-extrabold tracking-[-0.02em]">10 highest-impact LinkedIn profile tips</h2>

          <div className="mb-14 space-y-4">
            {TIPS.map(({ num, section, tip, example, color }) => (
              <div key={num} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
                  <span className="text-[24px] font-extrabold" style={{ color, opacity: 0.3 }}>{num}</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: color }}>{section}</span>
                  <p className="text-[14px] font-bold">{tip}</p>
                </div>
                <div className="px-4 py-3">
                  <pre className="whitespace-pre-wrap text-[12px] leading-5 text-[var(--muted)] font-sans">{example}</pre>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">The 5 sections recruiters actually look at</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Eye-tracking research on recruiter LinkedIn behaviour shows a consistent pattern. Here&apos;s where they spend time and what they&apos;re looking for.</p>

          <div className="mb-12 overflow-hidden rounded-2xl border border-[var(--border)]">
            {[
              { section: "1. Headline", time: "3–5 sec", looks: "Role fit signal, keywords, level", fix: "Write for the job you want, not the job you have" },
              { section: "2. Profile photo", time: "2 sec", looks: "Credibility, professionalism", fix: "Good photo increases click-through by 21×" },
              { section: "3. Current / recent role", time: "5–8 sec", looks: "Company, title, tenure, impact", fix: "Make first bullet the strongest one" },
              { section: "4. About section", time: "3–6 sec", looks: "Narrative, keywords, seniority", fix: "First 2 lines must hook — visible before 'see more'" },
              { section: "5. Skills section", time: "2 sec", looks: "Keyword match for search", fix: "Must include 30+ keywords for search algorithm" },
            ].map(({ section, time, looks, fix }, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_1.5fr_1.5fr] border-b border-[var(--border)] p-3 text-[13px] last:border-0 items-start">
                <span className="font-bold">{section}</span>
                <span className="text-[var(--muted)] px-3">{time}</span>
                <span className="text-[var(--muted)]">{looks}</span>
                <span className="font-semibold text-[#0A66C2]">{fix}</span>
              </div>
            ))}
          </div>

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">The LinkedIn headline formula</h2>
          <div className="mb-12 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-4">
            <p className="text-[14px] font-bold text-[#0A66C2]">Formula: [Seniority] [Role] | [Specialization 1] & [Specialization 2] | [Keywords]</p>
            <div className="space-y-3">
              {[
                { role: "Engineering", headline: "Senior Software Engineer | Distributed Systems & Real-Time Data | Go · Kafka · AWS" },
                { role: "Product", headline: "Senior Product Manager | Growth & Monetisation | B2B SaaS · Fintech · PLG" },
                { role: "Data", headline: "Data Scientist | NLP & Recommendation Systems | Python · TensorFlow · Causal Inference" },
                { role: "Finance", headline: "VP Finance | Strategic FP&A & Fundraising | Series A–C · SaaS Metrics · Investor Relations" },
              ].map(({ role, headline }) => (
                <div key={role} className="rounded-lg bg-white border border-[var(--border)] p-3">
                  <div className="text-[10px] font-bold uppercase text-[var(--muted)] mb-1">{role}</div>
                  <div className="text-[13px] font-semibold">{headline}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold tracking-[-0.02em]">FAQ</h2>
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

      <section style={{ background: "linear-gradient(135deg, #0A66C2 0%, #004182 100%)" }} className="py-16 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">Let Zari optimise your LinkedIn profile.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari rewrites your headline, About section, and experience bullets for maximum recruiter search visibility — with a visibility score before and after. Most profiles improve from 54 to 91.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#0A66C2]">Optimize my profile free</Link>
            <Link href="/ai-linkedin-optimizer" className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3 text-[14px] font-semibold text-white">LinkedIn Optimizer →</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
