import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Salary Negotiation Coach — Know Your Number, Ask With Confidence",
  description:
    "Zari's AI salary negotiation coach gives you market benchmarks, counter-offer scripts, and realistic negotiation simulations with pushback. Walk away with more money.",
  keywords: ["salary negotiation coach", "AI salary negotiation", "how to negotiate salary", "salary negotiation tips", "counter offer coach", "salary negotiation practice", "negotiate job offer"],
  alternates: { canonical: "/salary-negotiation-coach" },
  openGraph: { title: "Zari Salary Negotiation Coach — Negotiate with Confidence", description: "Market benchmarks, counter-offer scripts, and live negotiation simulation. Stop leaving money on the table.", url: "/salary-negotiation-coach" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What does a salary negotiation coach do?", answer: "A salary negotiation coach helps you research market rates for your role, craft a counter-offer, and practice the negotiation conversation until you're confident enough to have it. Zari's AI version does all of this with real market data, specific scripts, and live simulation." },
  { question: "How much can I gain from salary negotiation coaching?", answer: "Studies consistently show that professionals who negotiate receive 5–20% more than the initial offer. Zari users report an average additional $18K on their first negotiation after coaching — with some recovering $30K+ from an initial lowball offer." },
  { question: "Does Zari help with negotiating a counter-offer?", answer: "Yes. Zari generates specific counter-offer language, anticipates objections, and runs a simulation with realistic pushback — including 'we don't have room in the budget' and 'this is our best offer' scenarios — until you're ready for the real thing." },
];

export default async function SalaryNegotiationCoachPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Salary Negotiation Coach", url: `${BASE_URL}/salary-negotiation-coach` }]} />
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", left: "-8%", background: "#10B981", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">Salary Negotiation Coach · Counter-Offer Scripts · Market Data</div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">Know your number.<br /><span style={{ background: "linear-gradient(135deg,#10B981,#34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ask for it with confidence.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Zari's salary negotiation coach gives you market benchmarks, generates counter-offer language, and runs simulations with realistic pushback — until negotiating doesn't feel scary.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(16,185,129,0.4)] transition-all hover:-translate-y-0.5" style={{ background: "#10B981" }}>
              Practice negotiating free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="mt-12 inline-flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-8 py-5">
            <p className="text-[13px] text-white/50">Zari users report recovering an average of</p>
            <p className="text-[2rem] font-extrabold text-[#10B981]">$18K</p>
            <p className="text-[13px] text-white/50">on their first negotiation after coaching</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What the salary negotiation coach delivers</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { title: "Market benchmarks", body: "Compensation data for your role, level, location, and industry — so you know your number before the conversation starts." },
              { title: "Counter-offer scripts", body: "Specific language you can say out loud, not vague templates. Zari generates the exact phrase for your situation." },
              { title: "Live negotiation simulation", body: "Zari plays the hiring manager with realistic pushback: 'We don't have budget', 'This is our final offer', 'We need an answer today.'" },
              { title: "Objection handling", body: "For every objection — competing offer, timing, title vs. salary — Zari has a coached response that keeps the conversation moving toward your number." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-2 text-[15px] font-bold text-[var(--ink)]">{item.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-center text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-5">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-3 text-[15px] font-bold text-[var(--ink)]">{f.question}</h3>
                <p className="text-[14px] leading-7 text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#022b1e 0%,#0d6b47 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Stop leaving money on the table.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">Practice negotiating for free. No card required.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#0d6b47] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
