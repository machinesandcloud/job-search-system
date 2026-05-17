import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "What to Wear to an Interview — Dress Code Guide by Industry (2025)",
  description:
    "Interview attire mistakes are usually not 'too formal' — they're wearing the wrong signal for the specific company culture. What to wear to a job interview by industry, role level, and company type, with specific guidance for remote video interviews.",
  keywords: ["what to wear to an interview", "job interview outfit", "interview dress code", "business casual interview", "what to wear to a job interview 2025", "interview attire", "interview outfit men", "interview outfit women"],
  alternates: { canonical: "/blog/what-to-wear-to-an-interview" },
  openGraph: {
    title: "What to Wear to an Interview — Dress Code Guide by Industry (2025)",
    description: "Interview attire mistakes are usually not 'too formal' — they're wearing the wrong signal for the company culture. Dress code by industry, role level, and video interviews.",
    url: "/blog/what-to-wear-to-an-interview",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const THE_CORE_PRINCIPLE = "The goal of interview attire is to look like a slightly more polished version of the people who already work there. Overdressing for a startup signals cultural mismatch. Underdressing for a law firm signals lack of preparation. Research the company's culture before choosing your outfit — not the other way around.";

const DRESS_CODES_EXPLAINED = [
  {
    level: "Business Formal",
    description: "Full suit (jacket + trousers/skirt) in a neutral color, dress shirt or blouse, conservative tie, polished closed-toe shoes. Minimal jewelry.",
    when_appropriate: "Investment banking, law firms (BigLaw), management consulting (first round), C-suite interviews, government and public sector leadership roles, client-facing financial services",
    mistake: "Wearing business formal to a startup, creative agency, or technology company reads as culturally out of touch — even if your qualifications are perfect.",
  },
  {
    level: "Business Professional",
    description: "Coordinated separates — blazer with dress trousers or skirt, collared shirt or blouse. No tie required but appropriate. Clean, pressed, and polished.",
    when_appropriate: "Corporate finance, accounting firms (mid-tier), HR leadership, traditional corporate (non-tech), healthcare administration, university administration",
    mistake: "Treating 'business professional' as an excuse to skip the blazer — an untucked shirt or casual knit top undercuts an otherwise professional look at companies that operate in this register.",
  },
  {
    level: "Business Casual",
    description: "Blazer optional but elevating. Dress trousers or chinos (not jeans), collared shirt, blouse, or modest sweater. Clean shoes — not sneakers unless you're certain.",
    when_appropriate: "Mid-size tech companies, product management roles, marketing, operations, healthcare non-clinical, education administration, most corporate roles that say 'casual Fridays'",
    mistake: "Business casual is the most misread dress code — most people interpret it too casually. When in doubt, add the blazer: it can always come off, but you can't put one on if you didn't bring it.",
  },
  {
    level: "Smart Casual",
    description: "Well-fitted clothes in neutral colors. Dark jeans are acceptable. Minimal logo-wear. Clean shoes including simple sneakers in some cases.",
    when_appropriate: "Tech startups, product design, media companies, creative agencies, consumer tech, some fintech and SaaS companies, any company where the office culture is casual and you've confirmed it",
    mistake: "Smart casual requires the 'smart' — clean, intentional, well-fitted. Athletic wear, graphic tees, visible wear, or wrinkled clothes misread as lack of effort even in the most casual offices.",
  },
];

const BY_COMPANY_TYPE = [
  {
    company_type: "Law firms and financial services",
    guidance: "Always business formal for a first interview unless explicitly told otherwise. For second or subsequent rounds at creative or boutique firms, you may scale to business professional. The risk of underdressing is higher than the risk of overdressing in these industries.",
    research_tip: "Look at the firm's website and LinkedIn profiles of attorneys or bankers at your seniority level. If everyone is in suits, you're in suits.",
  },
  {
    company_type: "Management consulting",
    guidance: "Business formal for first rounds at McKinsey, BCG, Bain, and comparable firms. For boutique consulting firms, business professional is typically appropriate. Research the specific firm's culture — some boutiques are notably more casual.",
    research_tip: "MBB firms have a well-established formal culture. For any consulting firm, Glassdoor interview reviews often include dress code observations from recent candidates.",
  },
  {
    company_type: "Large tech companies (FAANG and equivalent)",
    guidance: "Business casual to smart casual depending on the role. Engineering and product roles tend toward smart casual. Sales, finance, and legal roles within tech companies often still expect business casual or professional. Always avoid: graphic tees, athletic wear, and visibly casual brands.",
    research_tip: "Look at LinkedIn photos and company culture photos. Most large tech companies photograph their offices and teams — the attire visible in those photos is your baseline.",
  },
  {
    company_type: "Startups (Seed to Series B)",
    guidance: "Smart casual is almost always appropriate. If the company's Glassdoor photos show hoodies and jeans, business formal reads as tone-deaf. The goal is to look intentional and clean without looking like you don't understand the culture.",
    research_tip: "Scroll the company's Instagram, LinkedIn page, and any press features for photos of employees. This is the most reliable signal — companies stage the photos they want to project.",
  },
  {
    company_type: "Healthcare (clinical roles)",
    guidance: "If the interview will be on a clinical floor, scrubs or clinical attire may be appropriate — but confirm with the recruiter. For administrative interviews in healthcare settings, business casual to business professional. For hospital leadership or C-suite interviews, business formal.",
    research_tip: "Always ask the recruiter or HR contact what to wear if clinical vs. administrative is unclear. This is a normal question and demonstrates self-awareness.",
  },
];

const VIDEO_INTERVIEW_GUIDE = [
  { rule: "Dress as if it's in-person", detail: "The same dress code rules apply to video interviews. Your attire signals the same things on camera that it does in person. Dress from head to toe — standing up unexpectedly happens, and a 'business casual from the waist up, sweatpants below' setup has torpedoed real interviews." },
  { rule: "Solid colors, not patterns", detail: "Fine patterns and stripes create visual distortion on compressed video. Solid mid-tone colors (navy, burgundy, forest green, grey) read best on camera. Avoid white (blows out in certain lighting), black against dark backgrounds, and busy prints." },
  { rule: "Check your background before anything else", detail: "What's behind you on camera matters as much as what you're wearing. A cluttered, dim, or distracting background pulls attention from you. Use a plain wall, a subtle virtual background if the platform supports it well, or a clean, organized visible space." },
  { rule: "Test your setup 24 hours before", detail: "Open the video platform the day before and see how you look. Check lighting (front-facing natural light or a desk lamp is ideal), audio quality, camera angle (eye level, not looking up at your face from below), and background. Fix issues before the interview, not 5 minutes before." },
];

const FAQS = [
  { question: "Is it ever okay to ask what to wear to an interview?", answer: "Yes — and it's often a good idea for situations where the dress code is genuinely ambiguous. The most natural way to ask: when confirming interview logistics with the recruiter, add 'One quick question — what's the typical dress code for your office? I want to make sure I'm appropriately dressed.' This is a professional question that signals preparation, not insecurity. Most recruiters appreciate it because it prevents the awkward scenarios where a candidate shows up visibly over- or under-dressed." },
  { question: "Should you dress one level up from the company's daily culture?", answer: "This is a common rule of thumb — and it's mostly right. If employees wear business casual, you dress business professional. If employees wear smart casual, you dress business casual. The upper bound: if employees wear business formal, you match it (not 'one level up,' which would mean something more formal than business formal — there is no such thing). The logic behind dressing slightly more formally than the culture: it signals that you're taking the opportunity seriously. The exception: in very casual startup cultures, overdressing by two levels can signal cultural misalignment more than it signals effort." },
  { question: "Does interview attire matter less than qualifications?", answer: "Qualifications get you an interview. Attire shapes the hiring manager's first impression before you say a word. First impressions are formed in 7–17 seconds, and visual appearance is a significant component of that first read. Interview attire mistakes are rarely the reason someone doesn't get an offer — but a sharp, appropriate outfit removes a variable that could otherwise introduce doubt. Think of it as removing a negative rather than creating a positive: correct attire doesn't win you the offer, but incorrect attire can create an obstacle your qualifications then have to overcome." },
];

export default async function WhatToWearToAnInterviewPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="What to Wear to an Interview — Dress Code Guide by Industry (2025)"
        description="Interview attire mistakes are usually not 'too formal' — they're wearing the wrong signal for the company culture. Dress code by industry, role level, and video interviews."
        url={`${BASE_URL}/blog/what-to-wear-to-an-interview`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "What to Wear to an Interview", url: `${BASE_URL}/blog/what-to-wear-to-an-interview` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Attire Guide</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">What to Wear to an Interview</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Interview attire mistakes are usually not &ldquo;too formal.&rdquo; They&apos;re wearing the wrong signal for the specific company culture — overdressing for a startup or underdressing for a law firm. Here&apos;s how to read the room before you&apos;re in it.
          </p>
        </div>
      </section>

      {/* Core principle */}
      <section className="bg-[var(--bg)] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-2">The principle</p>
            <p className="text-[15px] font-semibold leading-7 text-[var(--ink)]">{THE_CORE_PRINCIPLE}</p>
          </div>
        </div>
      </section>

      {/* Dress codes */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 4 dress codes — what each actually means</h2>
          <div className="mt-6 space-y-4">
            {DRESS_CODES_EXPLAINED.map((code) => (
              <div key={code.level} className="rounded-2xl border border-[var(--border)] p-6">
                <p className="font-bold text-[var(--ink)] text-[16px]">{code.level}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{code.description}</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-emerald-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">When appropriate</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{code.when_appropriate}</p>
                  </div>
                  <div className="rounded-xl bg-red-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Common mistake</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{code.mistake}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By company type */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">By company type</h2>
          <div className="mt-6 space-y-4">
            {BY_COMPANY_TYPE.map((item) => (
              <div key={item.company_type} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <p className="font-bold text-[var(--ink)]">{item.company_type}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.guidance}</p>
                <div className="mt-3 rounded-xl bg-[var(--bg)] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">Research tip</p>
                  <p className="text-[12.5px] text-[var(--muted)]">{item.research_tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video interview guide */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Video interview — specific guidance</h2>
          <div className="mt-6 space-y-3">
            {VIDEO_INTERVIEW_GUIDE.map((item) => (
              <div key={item.rule} className="rounded-xl border border-[var(--border)] p-5">
                <p className="font-bold text-[var(--ink)]">{item.rule}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
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
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari coaches your interview from first impression to final offer.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari generates role-specific interview questions, coaches your STAR answers, and prepares you for every stage of the process — from first screen to final round. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
