import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Designers — Portfolio, Resume & Interview Coaching",
  description:
    "Zari is the AI career coach for designers. UX resume optimization, portfolio positioning, design system interview prep, creative director coaching, and design salary negotiation.",
  keywords: ["career coach for designers", "UX designer career coach", "design career coach", "AI career coach UX designer", "UX designer resume help", "product designer career coach", "graphic designer career coach", "design director coaching", "designer salary negotiation"],
  alternates: { canonical: "/career-coach-for-designers" },
  openGraph: { title: "AI Career Coach for Designers", description: "UX resume optimization, portfolio positioning, design interview prep, and designer salary negotiation.", url: "/career-coach-for-designers" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari help UX and product designers with their resume?", answer: "Design resumes are different: they need to signal impact (not just craft), show business thinking (not just aesthetics), and pass ATS keyword matching while remaining readable. Zari rewrites design resume bullets to quantify user impact (task completion rates, usability test improvements, NPS changes, conversion lifts), optimizes for ATS keywords (Figma, design systems, user research, accessibility), and frames your design work in terms that product and engineering hiring managers can evaluate." },
  { question: "Does Zari help with portfolio presentation coaching?", answer: "Yes. Most design portfolio mistakes aren't visual — they're in the narrative: too much process, not enough problem definition; too little context about constraints; no mention of impact. Zari coaches you on how to present your portfolio case studies: what to include, how to frame the problem, how to talk about your decisions under uncertainty, and how to end each case study with measurable outcome." },
  { question: "Can Zari help designers transition to design leadership?", answer: "Yes — the IC-to-lead transition in design is one of the most common coaching scenarios. Moving from senior designer to design lead, head of design, or VP Design requires shifting from portfolio-based hiring to leadership-based hiring: team management, design ops, cross-functional influence, and org design. Zari prepares designers for these conversations and helps them reframe IC craft achievements as organizational and business impact." },
];

export default async function CareerCoachForDesignersPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach for Designers", url: `${BASE_URL}/career-coach-for-designers` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", right: "-8%", background: "#7a8dff", opacity: 0.08, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Design · IC → Lead → VP Design
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            AI career coaching<br />
            <span style={{ background: "linear-gradient(135deg,#7a8dff,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>built for designers.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            From ATS-optimized UX resumes to portfolio presentation coaching and VP Design interview prep — Zari understands the business impact language and leadership signals that advance design careers.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(122,141,255,0.4)] transition-all hover:-translate-y-0.5" style={{ background: "#7a8dff" }}>
              Start design coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari delivers for designers</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#7a8dff", title: "Design resume optimization", body: "Figma, design systems, user research, accessibility, prototyping — the keywords ATS systems filter for, plus impact metrics hiring managers scan for. Zari rewrites your bullets to quantify user and business impact alongside craft." },
              { accent: "#0D7182", title: "UX portfolio coaching", body: "Case study structure, problem framing, decision rationale, constraint navigation, and outcome measurement — the narrative skills that determine whether your portfolio shows craft or business thinking. Zari coaches you on what to include and how to present it." },
              { accent: "#EC4899", title: "Product and UX interview prep", body: "Design critiques, whiteboard challenges, system design for UI, and the 'walk me through your portfolio' deep dives that define product design interviews. Zari preps you for the full design interview loop." },
              { accent: "#F97316", title: "Design leadership coaching", body: "Design lead, head of design, VP Design, CDO — leadership design interviews focus on team management, design ops, hiring and growing designers, and cross-functional strategy. Zari shifts your preparation from portfolio-based to leadership-based." },
              { accent: "#10B981", title: "Designer salary negotiation", body: "Design comp varies enormously by specialization and company stage. Zari gives you market benchmarks for UX, product design, brand, and design leadership roles — and scripts for negotiating base, equity, and title." },
              { accent: "#4ca7e6", title: "LinkedIn for designers", body: "Your LinkedIn headline and About section determine whether recruiters find you. Zari rebuilds your profile for search visibility with the right UX and design system keywords — and positions your work in terms that non-design stakeholders understand." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${item.accent}18` }}>
                  <div className="h-2 w-2 rounded-full" style={{ background: item.accent }} />
                </div>
                <h3 className="mb-2 text-[14.5px] font-bold text-[var(--ink)]">{item.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6 space-y-4">
          {FAQS.map((f) => (
            <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-2 text-[14px] font-bold text-[var(--ink)]">{f.question}</h3>
              <p className="text-[13.5px] leading-6 text-[var(--muted)]">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#0d0a2e 0%,#7a8dff 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your next design role or level-up — free to start.</h2>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#7a8dff] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
