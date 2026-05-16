import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Veterans — Military to Civilian Career Transition (2025)",
  description:
    "Career coaching for veterans and transitioning service members. How to translate military experience into civilian resume language, which civilian roles map to your MOS, LinkedIn for veterans, and interview prep for military-to-civilian transitions.",
  keywords: ["career coach for veterans", "military to civilian career transition", "veteran career coaching", "military resume translation", "veteran job search help", "transitioning military career coach", "MOS to civilian career", "military skills civilian jobs"],
  alternates: { canonical: "/career-coach-for-veterans" },
  openGraph: {
    title: "AI Career Coach for Veterans — Military to Civilian Career Transition (2025)",
    description: "Military experience translation, resume coaching, interview prep, and career path guidance for transitioning veterans.",
    url: "/career-coach-for-veterans",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TRANSLATION_PROBLEMS = [
  {
    problem: "Military titles mean nothing to civilian HR",
    example: "Staff Sergeant, E-6, MOS 11B — this is a complete profile to anyone in the military and completely opaque to a civilian recruiter.",
    fix: "Translate rank to scope: 'Led a 12-person infantry team responsible for $2.4M in equipment and personnel safety across 3 combat deployments.' The rank matters less than the accountability level and scale. Translate MOS to functional role: 11B (Infantry) maps to leadership, security operations, and physical operations roles. Zari coaches the specific translation from your MOS to civilian job categories.",
  },
  {
    problem: "Military impact is hard to quantify in business terms",
    example: "Operational excellence in a combat environment doesn't naturally produce revenue figures or customer metrics.",
    fix: "Use operational metrics: personnel managed, equipment value accountable for, mission success rates, readiness scores, training completion rates, cost-per-operation figures where available. A logistics officer who managed a $50M supply chain has a highly translatable achievement — it just requires civilian framing.",
  },
  {
    problem: "Civilian ATS systems don't recognize military vocabulary",
    example: "Terms like 'NCO,' 'OPORD,' 'sortie,' 'ROE,' 'AAR' are unknown to ATS keyword matching systems.",
    fix: "Use parallel civilian vocabulary throughout: 'After Action Review' → 'debrief and performance review process'; 'OPORD' → 'operational plan'; 'platoon leader' → 'team lead responsible for 40 personnel.' Zari's ATS scoring against specific job descriptions identifies which military terms to translate and what civilian equivalents to use.",
  },
  {
    problem: "Security clearances aren't prominently featured",
    example: "Many veterans with active clearances don't lead with this — even though it dramatically expands their hiring pool.",
    fix: "Feature your clearance level prominently: in your resume header or summary, and explicitly in LinkedIn. Active Top Secret/SCI clearance commands a significant hiring premium in defense, intelligence, tech, and federal contracting roles. Hundreds of companies have clearance requirements they struggle to fill.",
  },
];

const CIVILIAN_PATHS = [
  {
    path: "Defense and federal contracting",
    accent: "#7C3AED",
    whyFits: "Direct continuation of military skills in a civilian context. Defense contractors (Lockheed Martin, Raytheon, Booz Allen Hamilton, SAIC, Leidos) specifically recruit veterans for operations, program management, intelligence, and technical roles. Security clearances are a major hiring advantage.",
    roles: "Program Manager, Operations Manager, Intelligence Analyst, Security Specialist, Technical Advisor",
    compensation: "Competitive — GS-11 to GS-14 equivalent ($70K–$150K+). Defense contractor roles often include generous benefits and clearance maintenance.",
  },
  {
    path: "Corporate operations and logistics",
    accent: "#0891B2",
    whyFits: "Military logistics, supply chain management, and operations experience maps directly to corporate roles. Amazon, Walmart, UPS, FedEx, and manufacturing companies actively recruit veterans for operations leadership.",
    roles: "Operations Manager, Supply Chain Manager, Logistics Coordinator, Warehouse Director, Fleet Manager",
    compensation: "Operations Director at large company: $120K–$200K. Supply chain leadership scales to $250K+ at senior levels.",
  },
  {
    path: "Leadership and management (cross-industry)",
    accent: "#059669",
    whyFits: "Military leadership training — leading teams under pressure, making decisions with incomplete information, developing people in high-stakes environments — is genuinely rare in the civilian workforce. Companies that value operational discipline specifically seek military backgrounds.",
    roles: "General Manager, Operations Director, Plant Manager, Regional Manager, Chief of Staff",
    compensation: "GM roles: $100K–$300K depending on company size and industry.",
  },
  {
    path: "Technology and cybersecurity",
    accent: "#DC2626",
    whyFits: "Military technology specialties (signals, cyber, intelligence systems, avionics) translate directly to civilian tech roles. Cybersecurity is particularly strong — military cyber experience is valued at a premium, and clearances open government and contractor roles unavailable to civilians.",
    roles: "Cybersecurity Analyst, Network Engineer, Systems Administrator, IT Manager, CISO (at smaller companies)",
    compensation: "Cybersecurity roles: $90K–$200K+. With clearance: 20–30% premium over non-cleared equivalent roles.",
  },
  {
    path: "Financial services and banking",
    accent: "#D97706",
    whyFits: "Veterans are recruited by banks and financial institutions specifically for leadership, discipline, and decision-making under pressure. Goldman Sachs, JPMorgan, and Citi have dedicated veteran hiring programs. Financial planning and insurance are strong entry points.",
    roles: "Financial Advisor, Branch Manager, Operations Analyst, Risk Manager, Corporate Development",
    compensation: "Financial advisor commission-based roles can reach $150K–$300K with established book of business. Corporate roles $80K–$200K+ depending on level.",
  },
];

const INTERVIEW_DIFFERENCES = [
  { challenge: "Civilian interviewers don't understand military context", solution: "Don't assume any military reference will land. Every achievement needs to be explained for someone who has never served. When you say 'I led a platoon,' follow it with what that means: '40 soldiers, $3M in equipment, responsible for their training, deployment readiness, and performance evaluations.'" },
  { challenge: "Military culture values collective credit; civilian interviews require individual credit", solution: "In civilian behavioral interviews, saying 'we accomplished X' is a weak answer. They need to know what you specifically did. Practice translating 'the team did Y' into 'I directed/planned/executed/coached Y.' You're not taking credit from teammates — you're accurately describing your role." },
  { challenge: "Military bearing can read as rigid in civilian interviews", solution: "Some interviewers interpret military formality (crisp answers, formal posture, minimal personal disclosure) as inflexibility or low EQ. Bring in personal context: what motivated you, what you found most meaningful, what you'd do differently. Showing nuance and self-reflection addresses this directly." },
  { challenge: "Explaining your reason for leaving the military", solution: "The civilian version of 'I completed my service commitment' is: 'I spent X years serving and reached the natural transition point to apply my leadership skills in a new environment.' Avoid framing it as leaving — frame it as beginning. Most civilian interviewers respond well to veterans who express pride in their service and clarity about what they want next." },
];

const FAQS = [
  { question: "When should veterans start their civilian job search?", answer: "12 months before your ETS/separation date is ideal. Most federal and defense contractor processes take 3–6 months. Corporate processes take 2–4 months. The earlier you start, the more options you have and the less pressure you're under. TAP (Transition Assistance Program) is a useful resource but is insufficient on its own — supplement it with targeted preparation for the specific civilian roles you're targeting." },
  { question: "Should veterans use their GI Bill to go back to school before transitioning?", answer: "Depends on the target role. For tech and cybersecurity: certifications (CompTIA, CISSP, AWS) often produce a better ROI than a degree. For business leadership and consulting: an MBA can significantly accelerate the path if you have strong GMAT and a compelling application. For roles where the military experience itself is the credential — defense contracting, federal roles, operations management — a degree adds less. Don't default to school; evaluate whether it actually opens a door the military credential doesn't." },
  { question: "Do companies have veteran hiring preferences?", answer: "Many large employers have formal veteran hiring programs — Amazon, Microsoft, JPMorgan Chase, Lockheed Martin, Home Depot, and hundreds of others. Veterans' preference applies to federal government hiring (5 or 10 point preference on competitive examinations depending on disability status). In private sector hiring, veteran status isn't a legal preference but many companies explicitly recruit veterans. Use Hire Heroes USA, American Corporate Partners (ACP), and company-specific veteran programs to access these channels." },
  { question: "How do I translate my military rank to civilian job level?", answer: "The translation isn't exact, but general equivalencies: E-4 to E-6 (Specialist/Sergeant) → Individual Contributor; E-7 to E-9 (Staff Sergeant/Sergeant Major) → Senior IC or Manager; O-1 to O-3 (Lieutenant/Captain) → Manager to Senior Manager; O-4 to O-5 (Major/Lieutenant Colonel) → Director level; O-6+ (Colonel and above) → VP or C-suite. Apply for roles at the level your responsibilities map to — not the level your rank sounds like to a civilian." },
];

export default async function CareerCoachForVeteransPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "AI Career Coach for Veterans", url: `${BASE_URL}/career-coach-for-veterans` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
            For Veterans & Transitioning Service Members
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.5rem]">
            AI Career Coach<br />for <span className="gradient-text-animated">Veterans</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            Military experience represents some of the most intensive leadership, operations, and decision-making training available anywhere. The challenge is translation — converting that experience into language civilian employers recognize and value. Zari coaches veterans through every step of that transition.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_24px_rgba(13,113,130,0.4)] transition-all hover:-translate-y-0.5">
              Start free coaching <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/ai-career-coach" className="inline-flex h-12 items-center rounded-xl border border-white/15 px-7 text-[14px] font-semibold text-white/70 transition-all hover:border-white/30 hover:text-white">
              How Zari works
            </Link>
          </div>
        </div>
      </section>

      {/* Translation problems */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Why military resumes get filtered out — and how to fix it</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The experience is strong. The translation is the problem. These are the four specific issues that cause veteran resumes to underperform.</p>
          <div className="mt-10 space-y-5">
            {TRANSLATION_PROBLEMS.map((rp, i) => (
              <div key={rp.problem} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="mb-1 font-bold text-[var(--ink)]">{rp.problem}</p>
                  <p className="mb-3 text-[13px] italic text-[var(--muted)]">{rp.example}</p>
                  <div className="rounded-lg bg-[var(--brand)]/[0.06] p-3">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">The fix</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{rp.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Civilian career paths */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Civilian career paths for veterans</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Military experience maps to civilian roles in multiple sectors. These are the strongest transitions with compensation context.</p>
          <div className="mt-10 space-y-5">
            {CIVILIAN_PATHS.map((path) => (
              <div key={path.path} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: path.accent, borderLeftWidth: 4 }}>
                  <p className="font-bold text-[var(--ink)]">{path.path}</p>
                  <p className="mt-1 text-[12px] font-medium" style={{ color: path.accent }}>Key roles: {path.roles}</p>
                </div>
                <div className="grid sm:grid-cols-2">
                  <div className="border-b border-[var(--border)] p-5 sm:border-b-0 sm:border-r">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Why your background fits</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{path.whyFits}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: path.accent }}>Compensation context</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{path.compensation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview differences */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Military-to-civilian interview challenges</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {INTERVIEW_DIFFERENCES.map((item) => (
              <div key={item.challenge} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.challenge}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Veteran career transition FAQs</h2>
          <div className="mt-8 space-y-4">
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
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Veteran career coaching — start free</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Military experience translation, ATS-optimized resume coaching, civilian interview prep, and LinkedIn strategy — purpose-built for transitioning veterans at every rank and MOS.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
