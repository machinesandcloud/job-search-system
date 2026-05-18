import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Site Reliability Engineer Resume — Examples & ATS Keywords (2025)",
  description:
    "SRE resumes that get callbacks show reliability metrics, toil elimination, and SLO ownership — not just a list of tools. Before/after examples and the ATS keyword breakdown for platform, DevOps, and SRE roles in 2025.",
  keywords: ["site reliability engineer resume", "SRE resume", "SRE resume examples", "platform engineer resume", "DevOps resume 2025", "SRE resume keywords", "reliability engineering resume"],
  alternates: { canonical: "/blog/site-reliability-engineer-resume" },
  openGraph: {
    title: "Site Reliability Engineer Resume — Examples & ATS Keywords (2025)",
    description: "SRE resumes that show reliability metrics, toil elimination, and SLO ownership — not just tool lists.",
    url: "/blog/site-reliability-engineer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const HIRING_SIGNALS = [
  { signal: "SLO/SLA ownership and reliability metrics", detail: "SRE hiring managers scan for concrete reliability numbers: uptime SLAs you maintained, error budgets you managed, incident rates you reduced. 'Improved system reliability' is too vague. 'Owned SLO for payment processing service (99.95% monthly uptime) — reduced P99 latency from 800ms to 120ms and brought error rate from 0.8% to 0.04% over two quarters' shows you understand reliability engineering in operational terms." },
  { signal: "Toil reduction and automation", detail: "A core SRE principle is reducing toil — repetitive manual operational work that scales linearly with system size. Your resume should quantify toil eliminated: 'Automated deployment pipeline (Jenkins → Argo CD) eliminating 8 hours/week of manual deploy work across 4 teams' or 'Wrote runbook automation for top-5 alert types — reduced mean time to resolve by 65%.' This signals the engineering mindset that distinguishes SRE from sysadmin." },
  { signal: "Incident management and postmortem culture", detail: "SREs own incidents. Resume language that shows incident ownership — response, root cause analysis, blameless postmortem facilitation, and follow-through on action items — signals production-grade experience. Specific incidents are powerful: 'Led response to P0 database corruption incident (2.3hr outage) — coordinated 8-engineer war room, implemented point-in-time recovery, completed postmortem identifying 3 infrastructure improvements.' The combination of response competence and learning discipline is the SRE signal." },
  { signal: "Platform and developer experience contribution", detail: "Senior SREs improve the platform that engineers build on — internal tools, deployment infrastructure, observability tooling, and developer experience improvements. Resume bullets that show this: 'Built internal deployment platform (Backstage, Helm, ArgoCD) reducing new service onboarding from 3 weeks to 2 days — adopted by 60+ services across 12 teams.' This kind of leverage signal is what differentiates SRE leadership candidates from individual SREs." },
];

const BEFORE_AFTER = [
  {
    level: "Mid-Level SRE",
    before: { bullet: "Managed on-call rotation and helped improve system reliability for production services", problems: ["'Managed on-call' is table stakes, not an achievement", "'Helped improve' — what specifically? By how much?", "No systems named, no metrics"] },
    after: { bullet: "Owned 24/7 on-call for 15 microservices (200K RPM peak) — reduced MTTR from 45min to 12min through automated runbooks and alert deduplication; brought P0 incident frequency from 4/month to 0.8/month over 6 months", improvements: ["Scale named (200K RPM, 15 services)", "MTTR improvement quantified (45min → 12min)", "P0 trend line shows systematic improvement"] },
  },
  {
    level: "Senior SRE",
    before: { bullet: "Built monitoring and alerting systems and led reliability improvements across the platform", problems: ["'Built monitoring' — which tools? What scale?", "'Led reliability improvements' — with what measurable outcome?", "Platform scope undefined"] },
    after: { bullet: "Designed observability platform (Prometheus, Grafana, OpenTelemetry) used by 35 engineers across 8 teams — standardized SLO definitions for 45 services, reduced alert noise 70% through signal-to-noise optimization, enabled 4 teams to achieve their first month at SLO target", improvements: ["Adoption scope named (35 engineers, 8 teams, 45 services)", "Alert noise reduction quantified (70%)", "Business outcome: teams hitting SLO targets for first time"] },
  },
];

const ATS_KEYWORDS = [
  { tier: "Reliability & Operations", keywords: ["SLO", "SLA", "error budget", "toil", "MTTR", "MTTD", "incident management", "blameless postmortem", "chaos engineering"] },
  { tier: "Infrastructure & Cloud", keywords: ["Kubernetes", "Terraform", "Helm", "AWS", "GCP", "Azure", "Docker", "Ansible", "Pulumi"] },
  { tier: "Observability", keywords: ["Prometheus", "Grafana", "Datadog", "OpenTelemetry", "Jaeger", "Zipkin", "ELK stack", "Loki", "Splunk"] },
  { tier: "CI/CD & Deployment", keywords: ["ArgoCD", "Flux", "Jenkins", "GitHub Actions", "GitOps", "canary deployments", "blue/green", "feature flags"] },
  { tier: "Languages & Scripting", keywords: ["Python", "Go", "Bash", "Golang", "shell scripting", "automation"] },
  { tier: "Databases & Networking", keywords: ["Redis", "PostgreSQL", "load balancing", "service mesh", "Istio", "Envoy", "DNS", "TCP/IP"] },
];

const FAQS = [
  { question: "What's the difference between an SRE resume and a DevOps resume?", answer: "SRE resumes emphasize reliability engineering principles: SLOs, error budgets, toil reduction, and systematic incident management. DevOps resumes tend to emphasize CI/CD pipeline work, deployment automation, and developer tooling. There's significant overlap — many job postings use the titles interchangeably. Read each JD carefully: if it mentions error budgets, SLOs, on-call, and reliability, frame as SRE. If it leads with CI/CD, platform automation, and developer experience, frame as DevOps or Platform Engineer." },
  { question: "How do I show SRE experience without Google SRE-specific terminology?", answer: "The SRE principles apply universally, even if your company didn't use Google's specific vocabulary. Map your experience: 'maintained system availability' → 'owned SLO for X service (Y uptime SLA).' 'On-call work' → 'led incident response, facilitated postmortems.' 'Infrastructure automation' → 'reduced toil X hours/week through Y automation.' Translate your experience into the reliability engineering vocabulary that hiring managers search for, without misrepresenting what you did." },
  { question: "What's the most important thing for an entry-level SRE resume?", answer: "Production experience — even if it's limited. Any evidence of real production systems: an internship where you were on-call, a side project with real traffic and an uptime requirement, or open-source contributions to infrastructure tooling. Second most important: genuine depth in 2-3 core SRE tools (Kubernetes, Prometheus/Grafana, one cloud provider) rather than surface familiarity with many. Entry-level SRE hiring looks for the mindset (reliability over features, systematic problem-solving) as much as specific experience." },
];

export default async function SiteReliabilityEngineerResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Site Reliability Engineer Resume — Examples & ATS Keywords (2025)" description="SRE resumes that show reliability metrics, toil elimination, and SLO ownership — not just tool lists." url={`${BASE_URL}/blog/site-reliability-engineer-resume`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "SRE Resume", url: `${BASE_URL}/blog/site-reliability-engineer-resume` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · SRE / Platform</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Site Reliability Engineer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">SLO ownership, toil eliminated, and incidents owned — what SRE hiring managers scan for, with before/after bullets and a 6-tier keyword breakdown for SRE, DevOps, and platform roles.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={4} label="Hiring signals SRE managers look for beyond tool lists" accent="#0D7182" />
            <StatCard value={68} suffix="%" label="Of SRE resumes list tools without reliability metrics — the main screen-out" accent="#DC2626" />
            <StatCard value={6} label="ATS keyword tiers for SRE, DevOps, and platform engineering roles" accent="#7C3AED" />
            <StatCard value={45} suffix="%" label="Higher callback rate when SLO targets and MTTR improvements are named" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What SRE hiring managers scan for</h2>
          <div className="mt-6 space-y-4">
            {HIRING_SIGNALS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[13px] font-bold text-[var(--brand)]">{i + 1}</span>
                <div><p className="font-bold text-[var(--ink)]">{item.signal}</p><p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after resume bullets</h2>
          <div className="mt-6 space-y-6">
            {BEFORE_AFTER.map((item) => (
              <div key={item.level} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-3"><p className="font-bold text-[var(--brand)]">{item.level}</p></div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5 bg-red-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-3">Before</p>
                    <p className="text-[13px] leading-6 text-[var(--ink)] mb-3 font-mono bg-white border border-red-100 rounded-lg p-3">{item.before.bullet}</p>
                    <ul className="space-y-1">{item.before.problems.map((p) => <li key={p} className="flex gap-2 text-[12px] text-red-600"><span>✗</span>{p}</li>)}</ul>
                  </div>
                  <div className="p-5 bg-emerald-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-3">After</p>
                    <p className="text-[13px] leading-6 text-[var(--ink)] mb-3 font-mono bg-white border border-emerald-100 rounded-lg p-3">{item.after.bullet}</p>
                    <ul className="space-y-1">{item.after.improvements.map((imp) => <li key={imp} className="flex gap-2 text-[12px] text-emerald-700"><span>✓</span>{imp}</li>)}</ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords for SRE and platform engineering roles</h2>
          <div className="mt-6 space-y-3">
            {ATS_KEYWORDS.map((tier) => (
              <div key={tier.tier} className="rounded-xl border border-[var(--border)] p-4">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">{tier.tier}</p>
                <div className="flex flex-wrap gap-1.5">{tier.keywords.map((kw) => <span key={kw} className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-0.5 text-[12px] font-medium text-[var(--ink)]">{kw}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (<div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5"><p className="font-bold text-[var(--ink)]">{faq.question}</p><p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p></div>))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your SRE resume reviewed by Zari.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste your resume and target JD — Zari rewrites your bullets to show SLO ownership, toil reduction, and incident management in the specific language that SRE hiring managers scan for.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
