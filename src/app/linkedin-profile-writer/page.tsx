import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "AI LinkedIn Profile Writer Free 2025 — LinkedIn Headline, About & Experience",
  description: "Zari rewrites your LinkedIn headline, About section, and experience bullets to rank higher in recruiter searches and convert profile views into interviews. Free to start.",
  keywords: ["LinkedIn profile writer", "AI LinkedIn profile writer", "LinkedIn profile optimization", "LinkedIn headline writer", "LinkedIn about section", "LinkedIn optimizer", "LinkedIn profile rewrite", "LinkedIn profile tips 2025", "optimize LinkedIn for job search", "LinkedIn keyword optimization"],
  alternates: { canonical: "/linkedin-profile-writer" },
  openGraph: { title: "AI LinkedIn Profile Writer — Headline, About & Experience Rewrites", description: "Rank higher in recruiter searches. Zari rewrites your LinkedIn headline, About section, and experience bullets.", url: "/linkedin-profile-writer" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What parts of LinkedIn matter most for recruiter searches?", answer: "LinkedIn's search algorithm weights your headline (the 220 characters under your name) most heavily, followed by your About section first 300 characters (the preview shown before 'see more'), and then your job titles. Most people's headlines say 'Software Engineer at Company' — that wastes all 220 characters. Zari rewrites your headline to pack in your specialisation, key skills, and the types of roles you want — in the same 220 characters." },
  { question: "How do I make my LinkedIn profile rank higher in recruiter searches?", answer: "Use keywords that match the specific job titles recruiters search for. LinkedIn search treats 'Senior Product Manager' and 'Sr. PM' differently — you need the exact phrase your target recruiters type. Zari analyses your target roles and writes your headline and About section to include the highest-priority search terms for your function and seniority level." },
  { question: "What should the LinkedIn About section say?", answer: "The first 300 characters are critical — they're shown without clicking 'see more'. Lead with your specialisation, not a life story. The full About section should cover: what you do, the scale or impact of your work (numbers), and what you're focused on next. Zari structures this to hook recruiters in the first two lines while packing in the keywords that drive search visibility." },
  { question: "Should I use first or third person in my LinkedIn About?", answer: "First person — it reads more authentic and is standard in 2025. 'I build machine learning models that…' outperforms 'John is a machine learning engineer who…' on both readability and perceived authenticity. Zari writes all About sections in first person by default." },
];

const SECTIONS = [
  { title: "Headline (220 characters)", desc: "The most-searched field in LinkedIn's algorithm. Zari packs in your specialisation, key skills, and role target — not just your current job title.", icon: "✏️", color: "#0A66C2" },
  { title: "About Section", desc: "First 300 characters hook the recruiter. Full section covers impact, scale, and what you want next — structured for both humans and LinkedIn search.", icon: "📝", color: "#059669" },
  { title: "Experience Bullets", desc: "Achievement-focused rewrites for every role. Each bullet leads with action + metric + context. Weak duty descriptions replaced entirely.", icon: "📋", color: "#7C3AED" },
  { title: "Skills Section", desc: "Keyword-matched to your target roles. Zari identifies the top-endorsed skills for your function and recommends which to add, pin, and prioritise.", icon: "🎯", color: "#D97706" },
  { title: "Open to Work Settings", desc: "Which job titles, locations, and seniority levels to set in your job preferences — the fields that determine who sees your 'Open to Work' signal.", icon: "🔍", color: "#EF4444" },
  { title: "Connection Request Messaging", desc: "First-message templates for cold outreach to recruiters and hiring managers — personalised by role, company, and your background.", icon: "💬", color: "#0D7182" },
];

export default async function LinkedInProfileWriterPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "LinkedIn Profile Writer", url: `${BASE_URL}/linkedin-profile-writer` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0A66C2 55%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI LinkedIn Profile Writer · Headline · About · Experience
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">
            LinkedIn profile that<br />
            <span className="text-white/50">recruiters actually find.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Zari rewrites your headline, About section, and experience bullets to rank higher in recruiter searches and turn profile views into first-round interviews.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0A66C2]">
              Rewrite my LinkedIn free
            </Link>
            <Link href="/ai-linkedin-optimizer" className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-4 text-[14px] font-semibold text-white">
              Full LinkedIn optimiser →
            </Link>
          </div>
          <p className="mt-4 text-[12px] text-white/30">Free tier. No credit card required.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={40} suffix="%" label="more recruiter messages with an optimised headline and About section" accent="#0A66C2" />
            <StatCard value={220} label="characters in your LinkedIn headline — most people waste 150 of them" accent="#0D7182" />
            <StatCard value={87} suffix="%" label="of recruiters use LinkedIn to find and vet candidates before outreach" accent="#7C3AED" />
            <StatCard value={6} label="sections Zari optimises: headline, About, experience, skills, open to work, outreach" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">What Zari rewrites on your LinkedIn</h2>
          <p className="mb-10 text-[14px] text-[var(--muted)]">Six sections, not just the headline.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map(({ title, desc, icon, color }) => (
              <div key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-xl" style={{ background: `${color}15` }}>{icon}</div>
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-[2rem] font-extrabold tracking-[-0.02em]">Before vs. after: LinkedIn headline examples</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Before (typical)</span><span className="text-[#0A66C2]">After (Zari-optimised)</span>
            </div>
            {[
              { role: "Software Engineer", before: "Software Engineer at Acme Corp", after: "Senior SWE — React, Node.js, AWS | Building fintech infra | Open to Staff/Principal roles" },
              { role: "Product Manager", before: "Product Manager | Tech", after: "Senior PM — B2C SaaS, 0→1 products | ex-Uber, ex-Stripe | Seeking Head of Product roles in fintech/AI" },
              { role: "Marketing Manager", before: "Marketing Manager at StartupXYZ", after: "Growth Marketing Manager — paid, SEO, PLG | $2M ARR pipeline generated | Open to Director opportunities" },
              { role: "Data Scientist", before: "Data Scientist", after: "ML Engineer / Data Scientist — NLP, Python, Spark | Reduced churn 23% at scale | Open to Senior/Staff DS" },
            ].map(({ role, before, after }) => (
              <div key={role} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] italic">{before}</span>
                <span className="font-semibold text-[#0A66C2]">{after}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0A66C2 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2.2rem] font-extrabold">Get found by the right recruiters.</h2>
          <p className="mb-8 text-[15px] text-white/55">Headline, About section, experience bullets — Zari rewrites your LinkedIn to rank for the roles you actually want.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0A66C2]">Rewrite my LinkedIn free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
