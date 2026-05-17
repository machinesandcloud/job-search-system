import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Cybersecurity Resume — Examples, Certifications & ATS Tips (2025)",
  description:
    "Cybersecurity hiring managers scan for certifications first, then specific threat types and tools, then operational scope. Most security resumes list tools without context. Here's how to write a cybersecurity resume that shows what you've actually defended — with before/after examples by specialization.",
  keywords: ["cybersecurity resume", "cybersecurity resume examples", "information security resume", "SOC analyst resume", "penetration tester resume", "CISSP resume", "cybersecurity ATS keywords 2025", "security engineer resume"],
  alternates: { canonical: "/blog/cybersecurity-resume" },
  openGraph: {
    title: "Cybersecurity Resume — Examples, Certifications & ATS Tips (2025)",
    description: "Cybersecurity hiring managers scan certifications first, then threat types and tools, then operational scope. Before/after examples by specialization and ATS keyword strategy.",
    url: "/blog/cybersecurity-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Should I list all my certifications or just the top ones?",
    answer: "List certifications in reverse chronological order (most recent or most advanced first), and lead with the ones that are most relevant to the role you're targeting. CISSP, CISM, OSCP, CEH, CompTIA Security+, GIAC certs, and AWS/Azure security specializations are the most recognized. If you have 8+ certifications and some are clearly foundational (CompTIA A+, Network+) while others are advanced, you can group them: 'Advanced: OSCP, GIAC GPEN | Foundation: CompTIA Security+, Network+.' Don't drop the foundational certs entirely — some ATS systems specifically search for them.",
  },
  {
    question: "What's the difference between a SOC analyst resume and a security engineer resume?",
    answer: "SOC analyst resumes emphasize detection, triage, and response: SIEM tools, alert volumes, MTTR metrics, incident playbooks, and threat intelligence. Security engineer resumes emphasize architecture, tooling, and implementation: security frameworks, infrastructure hardening, vulnerability management programs, and secure SDLC. The skills overlap but the framing should match the role you're targeting — a SOC background applying to an engineering role needs to foreground any build/deploy work they've done.",
  },
  {
    question: "Is it okay to mention specific tools even if they're from a previous employer?",
    answer: "Yes — listing tools you've used in prior roles is standard. The distinction is whether you're claiming current proficiency. If you used Splunk heavily two jobs ago and haven't touched it since, you can list it but might note 'proficient' vs. 'currently using.' For tools central to your target role, hiring managers often ask about them in technical screens — only list tools you can speak to in an interview.",
  },
  {
    question: "How do I handle classified work on a security resume?",
    answer: "Describe the scope without disclosing classified details. Common approaches: describe the threat category ('APT threat hunting' or 'nation-state threat actor detection') rather than specific actor names, reference the organizational scale ('agency with 40,000+ endpoints') rather than the organization, and note your clearance level prominently (TS/SCI, TS, SECRET). Active clearances are valuable and should be listed in your header or skills section, not buried. A clearance significantly narrows the competitive pool in your favor.",
  },
];

export default async function CybersecurityResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Cybersecurity Resume — Examples, Certifications & ATS Tips (2025)"
        description="Before/after examples by cybersecurity specialization — SOC analyst, penetration tester, security engineer, and cloud security — with ATS keyword strategy."
        url={`${BASE_URL}/blog/cybersecurity-resume`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Cybersecurity Resume", url: `${BASE_URL}/blog/cybersecurity-resume` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">Cybersecurity Resume</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">Hiring managers scan certifications first, then threat types and specific tools, then operational scope. Most security resumes list tools without context — here&apos;s how to write one that shows what you&apos;ve actually defended.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>12 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">What cybersecurity hiring managers actually read for</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Cybersecurity roles vary more than almost any other technical field — SOC analyst, penetration tester, security engineer, cloud security architect, and GRC specialist all require different signals on a resume. But most security hiring managers follow the same initial scan pattern:
            </p>
            <div className="mt-4 space-y-3">
              {[
                { step: "Certifications", detail: "Certifications are the first filter for most security hiring managers and ATS systems. CISSP, OSCP, CISM, CEH, GIAC certs, and cloud security specializations tell the reader your validated knowledge base at a glance. They should be prominent — in your header or a dedicated certifications section, not buried in your skills list." },
                { step: "Threat environment and tools", detail: "What types of threats have you defended against, and with what tools? 'Managed SIEM' is weak. 'Investigated 200+ Splunk alerts per week, triaging advanced persistent threats including credential stuffing and lateral movement' is specific and credible. The threat type (APT, ransomware, insider threat, phishing infrastructure) tells the reader what environment you've operated in." },
                { step: "Operational scope", detail: "Scale matters. 'Monitored network activity' vs. 'Monitored network activity across 14,000-endpoint hybrid environment supporting 8 global data centers.' The second tells the reader how complex the environment was — which is how they calibrate whether your experience translates to their environment." },
                { step: "Incident metrics", detail: "For SOC and IR roles: Mean Time to Detect (MTTD), Mean Time to Respond (MTTR), alert volumes, incidents investigated, false positive rates. For pentest roles: CVEs found, systems scoped, report quality. For engineering roles: vulnerabilities remediated, security program maturity improvements." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[11px] font-bold text-[var(--brand)]">{i + 1}</div>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.step}</p>
                    <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Before and after: by cybersecurity specialization</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The weakest security resume bullets describe activities. Strong bullets describe the threat environment, the tools used, and what changed because of your work.
            </p>

            <div className="mt-6 space-y-6">
              {[
                {
                  role: "SOC Analyst (Tier 2)",
                  color: "#0D7182",
                  before: "Analyzed security alerts and escalated incidents to the appropriate teams.",
                  after: "Triaged 150–220 Splunk alerts daily across a 22,000-endpoint financial services environment — reduced false positive rate from 34% to 11% by refining detection rules, and led investigation of 3 confirmed APT intrusions resulting in zero data exfiltration.",
                  insight: "SOC analysts need to show alert volume, environment scale, and outcomes — not just 'investigated alerts.' False positive rates and MTTR improvements are the metrics that signal operational maturity.",
                },
                {
                  role: "Penetration Tester",
                  color: "#7C3AED",
                  before: "Conducted penetration tests and provided remediation recommendations.",
                  after: "Performed external network, web application, and social engineering assessments for 18 clients across financial services, healthcare, and government verticals — discovered 4 critical zero-day vulnerabilities (2 CVEs filed), all remediated within client SLAs; average critical finding remediation rate 94%.",
                  insight: "Pentest resumes should show client verticals (which industries you understand), finding severity, CVE contributions if applicable, and remediation follow-through — not just 'conducted assessments.'",
                },
                {
                  role: "Security Engineer",
                  color: "#059669",
                  before: "Implemented security controls to improve the company's security posture.",
                  after: "Designed and deployed a zero-trust network architecture for a 3,500-employee SaaS company migrating to cloud — implemented identity-aware proxy, micro-segmentation, and device trust policies; reduced attack surface by 68% (Tenable scan data) and achieved SOC 2 Type II certification on first audit.",
                  insight: "Security engineering bullets need specificity on the architecture decision (zero-trust, defense-in-depth, etc.), the scale (company size, network scope), and a measurable outcome (audit results, vulnerability count reduction, compliance achievement).",
                },
                {
                  role: "Cloud Security / CISO Track",
                  color: "#DC2626",
                  before: "Led the security team and oversaw compliance efforts.",
                  after: "Built the security function from scratch for a Series C fintech ($120M ARR) — hired 6-person team, implemented SIEM/SOAR, achieved PCI DSS Level 1 and SOC 2 Type II, and reduced critical/high vulnerabilities from 340 open to <12 within 18 months; company raised Series D without any security-related due diligence concerns.",
                  insight: "CISO and senior security leadership resumes need program-building evidence (what you built, the team you scaled) and business-connected outcomes (due diligence passed, audit results, risk reduction with numbers). 'Oversaw compliance' is invisible.",
                },
              ].map(item => (
                <div key={item.role} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4" style={{ borderLeft: `4px solid ${item.color}` }}>
                    <h3 className="font-bold text-[var(--ink)]">{item.role}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-red-400">Before</p>
                      <div className="rounded-lg border border-red-100 bg-red-50/30 px-5 py-3 text-[14px] leading-7 text-[var(--ink)]">&ldquo;{item.before}&rdquo;</div>
                    </div>
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-500">After</p>
                      <div className="rounded-lg border border-emerald-100 bg-emerald-50/30 px-5 py-3 text-[14px] leading-7 text-[var(--ink)]">&ldquo;{item.after}&rdquo;</div>
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Why it works: </span>{item.insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">ATS keywords by cybersecurity role</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Use keywords from the specific job posting — these are the most commonly required terms by ATS systems and recruiters for each security specialization:
            </p>

            <div className="mt-5 space-y-4">
              {[
                {
                  category: "Certifications (include all you hold)",
                  keywords: ["CISSP", "CISM", "OSCP", "CEH", "GIAC (GPEN, GWAPT, GCIH, GCFE)", "CompTIA Security+", "CompTIA CySA+", "CompTIA CASP+", "AWS Security Specialty", "Azure Security Engineer", "GCP Security Engineer", "CCSP"],
                },
                {
                  category: "SOC & Incident Response",
                  keywords: ["SIEM", "Splunk", "QRadar", "Microsoft Sentinel", "SOAR", "CrowdStrike", "Carbon Black", "SentinelOne", "Threat hunting", "Incident response", "MTTR", "MTTD", "Malware analysis", "Threat intelligence", "IOC", "MITRE ATT&CK"],
                },
                {
                  category: "Penetration Testing",
                  keywords: ["Penetration testing", "Vulnerability assessment", "Burp Suite", "Metasploit", "Nmap", "Nessus", "Cobalt Strike", "Red team", "OWASP", "CVSS", "CVE", "Exploit development", "Social engineering"],
                },
                {
                  category: "Security Engineering & Cloud",
                  keywords: ["Zero trust", "IAM", "SASE", "Firewall", "IDS/IPS", "CASB", "DLP", "PKI", "Encryption", "AWS Security", "Azure Security", "GCP security", "Terraform", "Kubernetes security", "DevSecOps", "CI/CD security"],
                },
                {
                  category: "GRC & Compliance",
                  keywords: ["NIST CSF", "ISO 27001", "SOC 2", "PCI DSS", "HIPAA", "GDPR", "Risk assessment", "Vendor risk management", "Third-party risk", "Audit", "Policy development", "Security awareness training"],
                },
              ].map(group => (
                <div key={group.category} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.keywords.map(kw => (
                      <span key={kw} className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[12px] text-[var(--ink)]">{kw}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Common questions</h2>
            <div className="mt-4 space-y-4">
              {FAQS.map(faq => (
                <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Get your cybersecurity resume ATS-optimized</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari analyzes your security resume against the specific job description — identifies missing certification keywords, flags weak bullets, rewrites them to show threat context and operational scope. Plus interview prep for technical security interviews.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Optimize my security resume →
            </Link>
          </section>
        </div>
      </article>
    </PageFrame>
  );
}
