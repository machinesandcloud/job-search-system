import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const metadata: Metadata = {
  title: "Promotion Coach — Build Your Case, Land Your Next Level",
  description:
    "Zari's AI promotion coach helps you build a promotion case with evidence, practice your manager pitch, and close the gaps your performance review will surface. Get promoted faster.",
  keywords: ["promotion coach", "AI promotion coaching", "how to get promoted", "promotion strategy", "promotion pitch coach", "career advancement coach", "level up coaching", "performance review help"],
  alternates: { canonical: "/promotion-coach" },
  openGraph: { title: "Zari Promotion Coach — Make the Case for Your Next Level", description: "Build your promotion narrative, practice your pitch, and close the gaps before your review.", url: "/promotion-coach" },
};

export default async function PromotionCoachPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", right: "-8%", background: "#EC4899", opacity: 0.06, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">Promotion Coach · Manager Pitch · Level-Up Strategy</div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">You're already performing<br /><span style={{ background: "linear-gradient(135deg,#EC4899,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>at the next level.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Zari's promotion coach helps you build your case with evidence, practice your manager conversation, and close the specific gaps your performance review will surface — before it does.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(236,72,153,0.35)] transition-all hover:-translate-y-0.5" style={{ background: "#EC4899" }}>
              Build my promotion case free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari's promotion coach delivers</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { title: "Build your case with evidence", body: "Zari helps you extract the right evidence from your work — scope, scale, cross-functional impact, business outcomes — and structures it as a coherent promotion narrative." },
              { title: "Manager conversation simulation", body: "Practice the actual conversation with your manager. Zari plays the skeptical manager who asks 'why now?' and 'what's the business impact?' — and coaches your answers." },
              { title: "Gap analysis vs. next-level rubric", body: "Zari identifies the specific gaps between your current performance signals and the bar for your next level — with an actionable plan to close each one before your review cycle." },
              { title: "Performance review prep", body: "Structure your self-review for maximum impact. Zari helps you quantify contributions, frame leadership signals, and write the version of your review that makes the case for you." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-2 text-[15px] font-bold text-[var(--ink)]">{item.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#2d0a1a 0%,#9d1562 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">The promotion you've been working toward — let's close it.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">Free to start. No credit card. First session in 5 minutes.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#9d1562] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
