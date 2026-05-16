import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Teachers — Resume, Interview & Career Transition",
  description:
    "Zari is the AI career coach for teachers and educators. Teaching resume optimization, education interview prep, teacher-to-corporate transition coaching, and administrator career strategy.",
  keywords: ["career coach for teachers", "teacher career coach", "AI career coach educators", "teaching resume help", "teacher career transition", "teacher to corporate", "education career coaching", "school administrator career coach", "teacher salary negotiation"],
  alternates: { canonical: "/career-coach-for-teachers" },
  openGraph: { title: "AI Career Coach for Teachers", description: "Teaching resume optimization, education interview prep, teacher career transitions, and administrator coaching.", url: "/career-coach-for-teachers" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari help teachers with their resume?", answer: "Teacher resumes require a specific format: certifications and licensure, grade levels and subjects taught, curriculum development, student outcomes, and district-specific keywords. Zari optimizes teaching resumes for ATS systems used by school districts and rewrites bullet points to quantify student impact — test score improvements, class sizes, curriculum scope — rather than just listing responsibilities." },
  { question: "Can Zari help teachers transition to corporate or non-teaching roles?", answer: "Yes — teacher-to-corporate is one of the most common career transitions Zari coaches. Teachers have highly transferable skills: curriculum development maps to instructional design and L&D, classroom management maps to project and people management, student performance tracking maps to data analysis and reporting. Zari reframes teaching experience in corporate language and helps teachers position their background for roles in training, EdTech, operations, HR, and consulting." },
  { question: "Does Zari help with administrator and leadership roles in education?", answer: "Yes. Moving from teacher to department head, curriculum coordinator, assistant principal, or principal requires a different resume narrative and a different interview approach. Zari helps educators document their leadership experience, build the case for administrative roles, and prepare for the leadership-focused interviews that school districts use for administrator positions." },
];

export default async function CareerCoachForTeachersPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach for Teachers", url: `${BASE_URL}/career-coach-for-teachers` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", left: "-8%", background: "#F97316", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Teachers · Education → Leadership → Corporate
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            AI career coaching<br />
            <span style={{ background: "linear-gradient(135deg,#F97316,#FB923C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>built for educators.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            From ATS-optimized teaching resumes to teacher-to-corporate transition coaching and administrator interview prep — Zari understands how to translate education experience into career momentum.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(249,115,22,0.4)] transition-all hover:-translate-y-0.5" style={{ background: "#F97316" }}>
              Start educator coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari delivers for educators</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#F97316", title: "Teaching resume optimization", body: "Certifications, licensure, grade levels, subject areas, student outcomes — formatted for district ATS and hiring committees. Bullet rewrites that quantify impact: test score gains, curriculum scope, class sizes served." },
              { accent: "#0D7182", title: "Teacher-to-corporate transition", body: "Instructional design, L&D, EdTech, operations, project management — Zari translates teaching skills into corporate language and rebuilds your resume for the private sector role you're targeting." },
              { accent: "#7a8dff", title: "Education interview prep", body: "Teaching interviews use scenario-based questions unique to education: classroom management, differentiated instruction, parent communication, IEP collaboration. Zari preps you with education-specific question banks and STAR coaching." },
              { accent: "#EC4899", title: "Administrator coaching", body: "From teacher to department head, curriculum coordinator, assistant principal, or principal — Zari helps you document leadership experience and prepare the narrative and interview answers for education administration." },
              { accent: "#10B981", title: "Salary negotiation for teachers", body: "District pay scales, step increases, longevity pay, signing bonuses in high-need districts, and the negotiation tactics that work within education hiring constraints." },
              { accent: "#4ca7e6", title: "EdTech and adjacent career coaching", body: "Customer success at EdTech companies, instructional design, corporate training, curriculum development — roles where teaching experience is a direct advantage. Zari positions your background for maximum impact." },
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

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#2e1400 0%,#F97316 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your next role in education or beyond — free to start.</h2>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#F97316] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
