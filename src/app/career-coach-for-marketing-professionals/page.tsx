import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Marketing Professionals — Resume, Interviews & Strategy",
  description:
    "Zari is the AI career coach for marketers. Marketing resume optimization, performance marketing and brand strategy interview prep, CMO coaching, and marketing salary negotiation.",
  keywords: ["career coach for marketing professionals", "marketing career coach", "AI career coach marketer", "marketing resume help", "CMO coaching", "marketing director career coach", "digital marketing career coaching", "brand marketing career coach"],
  alternates: { canonical: "/career-coach-for-marketing-professionals" },
  openGraph: { title: "AI Career Coach for Marketing Professionals", description: "Marketing resume optimization, interview prep for brand and growth roles, and marketing salary negotiation.", url: "/career-coach-for-marketing-professionals" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari optimize marketing resumes?", answer: "Marketing resumes require different signals depending on the specialization: performance marketers need ROAS, CAC, and channel-specific metrics; brand marketers need brand recall and positioning wins; content marketers need traffic and conversion data; growth marketers need activation and retention numbers. Zari identifies which metrics matter for your target role and rewrites your resume bullets to lead with the right numbers in the right language." },
  { question: "Does Zari help with marketing director and CMO interviews?", answer: "Yes. Senior marketing interviews focus on strategy: how you've built and led teams, how you've allocated budget, what your approach to brand positioning is, and how you measure marketing ROI. Zari preps marketing leaders for the strategic questions that distinguish director and VP candidates from senior manager candidates — and for the board-level questions that CMO interviews involve." },
  { question: "Can Zari help marketers transition between specializations?", answer: "Yes. Moving from brand to growth, from agency to in-house, from B2C to B2B, or from generalist to specialist — each transition requires reframing your experience for the target audience. Zari identifies the transferable skills and rewrites your narrative for the specialization you're targeting." },
];

export default async function CareerCoachForMarketingPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach for Marketing Professionals", url: `${BASE_URL}/career-coach-for-marketing-professionals` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", right: "-8%", background: "#EC4899", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Marketing · Specialist → Director → CMO
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            AI career coaching<br />
            <span style={{ background: "linear-gradient(135deg,#EC4899,#F9A8D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>built for marketers.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            From ATS-optimized marketing resumes to CMO-level interview prep — Zari knows the specific metrics, frameworks, and signals that advance marketing careers across every specialization.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(236,72,153,0.4)] transition-all hover:-translate-y-0.5" style={{ background: "#EC4899" }}>
              Start marketing coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari delivers for marketers</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#EC4899", title: "Marketing resume optimization", body: "ROAS, CAC, MQL, pipeline contribution, brand recall — the specific metrics and keywords that marketing hiring managers and ATS systems need to see, by specialization. Not generic bullets; role-specific language for growth, brand, content, and performance." },
              { accent: "#0D7182", title: "Performance marketing coaching", body: "Paid acquisition, SEO, email, and lifecycle — interviews for performance roles go deep on attribution, channel ROI, and testing methodology. Zari preps you for the analytical questions that separate strong performance marketers." },
              { accent: "#7a8dff", title: "Brand strategy interview prep", body: "Positioning, brand architecture, campaign strategy, creative briefing — brand marketing interviews test strategic thinking more than metrics. Zari preps you for the qualitative judgment calls that define brand roles at senior levels." },
              { accent: "#F97316", title: "Marketing leadership coaching", body: "Head of Marketing, VP Marketing, CMO — the interview questions change dramatically at senior levels: team building, budget ownership, board-level reporting, and org design. Zari coaches marketing leaders for every stage of these conversations." },
              { accent: "#10B981", title: "Marketing salary negotiation", body: "Base, bonus, equity, and agency-to-in-house comp translation. Marketing comp varies enormously by specialization and company stage — Zari gives you market benchmarks and negotiation scripts by role." },
              { accent: "#4ca7e6", title: "LinkedIn for marketers", body: "Marketing professionals should have the best LinkedIn profiles — but most don't. Zari rebuilds your headline and About for recruiter search, specialization signals, and the category keywords that get inbound right." },
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

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#2e0018 0%,#EC4899 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your next marketing role or level-up — free to start.</h2>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#EC4899] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
