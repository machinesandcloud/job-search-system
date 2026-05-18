import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "iOS Developer Resume — Examples & ATS Keywords (2025)",
  description:
    "iOS developer resumes that get callbacks show App Store impact, performance wins, and Swift/SwiftUI depth — not just a list of Apple frameworks. Before/after examples and the ATS keyword breakdown for iOS, mobile, and Apple platform engineer roles.",
  keywords: ["iOS developer resume", "iOS engineer resume", "Swift developer resume", "mobile developer resume", "iOS resume examples", "iOS resume keywords 2025", "Apple developer resume"],
  alternates: { canonical: "/blog/ios-developer-resume" },
  openGraph: {
    title: "iOS Developer Resume — Examples & ATS Keywords (2025)",
    description: "iOS resumes that show App Store impact and performance wins — not just an Apple framework list.",
    url: "/blog/ios-developer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const HIRING_SIGNALS = [
  { signal: "App Store metrics and user impact", detail: "iOS hiring managers look for concrete product outcomes: App Store ratings maintained, crash-free session rates, DAU/MAU retention numbers, and App Store review scores. 'Maintained 4.8-star App Store rating (30K+ reviews) across 3 major iOS releases — reduced crash rate from 1.2% to 0.08% and improved app launch time from 3.1s to 0.7s' is hiring-manager language. Generic 'improved app performance' is not." },
  { signal: "Swift and SwiftUI depth signal", detail: "The iOS market has moved decisively to Swift and SwiftUI. Resumes that still lead with Objective-C signal legacy orientation, while resumes showing advanced Swift (async/await, actors, combine, generics) and SwiftUI (custom view modifiers, navigation stack, environment objects) signal current practice. Be explicit about your SwiftUI migration experience — 'migrated 40% of UIKit views to SwiftUI — reduced codebase by 8,000 lines while maintaining feature parity' shows concrete transition ownership." },
  { signal: "Architecture patterns and code quality", detail: "iOS roles at senior levels require clean architecture decisions. Resume bullets should reference the patterns you've owned: MVVM, TCA (The Composable Architecture), Clean Architecture, or VIPER. Show decisions, not just usage: 'Refactored payment flow from MVC to MVVM+Coordinator — separated view logic from business logic, enabling unit testing of the previously untestable payment state machine, and reduced bug rate in payment flow 60%.'" },
  { signal: "CI/CD and release engineering for Apple platform", detail: "The App Store review process, certificate management, provisioning profiles, and TestFlight distribution add complexity that's unique to Apple platform development. Resumes that show fastlane automation, App Store Connect integration, or CI/CD pipelines for multi-target iOS apps signal production maturity: 'Built Fastlane-based release pipeline reducing App Store submission time from 3 hours to 12 minutes — automated screenshots for 6 device sizes and 5 locales.'" },
];

const BEFORE_AFTER = [
  {
    level: "Mid-Level iOS Developer",
    before: { bullet: "Developed new features and bug fixes for the iOS app using Swift and UIKit", problems: ["No user impact or App Store metrics", "'Developed features' is table stakes, not achievement", "No scale — how many users, what app?"] },
    after: { bullet: "Built 3 major features (offline mode, push notification personalization, in-app search) for iOS app with 850K MAU — offline mode reduced error-state sessions 34%, in-app search increased session depth 28%, all features shipped on schedule with <0.1% crash rate", improvements: ["App scale named (850K MAU)", "Per-feature business outcomes quantified", "Reliability metric shows production discipline"] },
  },
  {
    level: "Senior iOS Engineer",
    before: { bullet: "Led iOS architecture improvements and worked with the team to improve app performance and reliability", problems: ["'Led improvements' without scope or outcome", "'Worked with team' buries individual contribution", "No before/after performance state"] },
    after: { bullet: "Owned architecture migration from MVVM to TCA for 4-engineer iOS team — reduced state management bugs 75%, increased unit test coverage from 12% to 71%, and established architecture decision records adopted across 3 additional iOS product teams; reduced app crash rate from 0.9% to 0.04% over 2 release cycles", improvements: ["Architecture pattern named (TCA, not vague 'architecture')", "Quantified impact: bug reduction, test coverage, crash rate", "Cross-team influence shows senior-level scope"] },
  },
];

const ATS_KEYWORDS = [
  { tier: "Core Languages & Frameworks", keywords: ["Swift", "SwiftUI", "Objective-C", "UIKit", "Foundation", "Combine", "async/await", "Swift Concurrency", "Xcode"] },
  { tier: "Architecture & Patterns", keywords: ["MVVM", "TCA", "Clean Architecture", "VIPER", "MVC", "Coordinator pattern", "dependency injection", "protocol-oriented programming"] },
  { tier: "Platform & System", keywords: ["Core Data", "CloudKit", "CoreLocation", "ARKit", "CoreML", "HealthKit", "WatchKit", "tvOS", "iPadOS", "App Extensions"] },
  { tier: "Networking & Data", keywords: ["URLSession", "Alamofire", "REST API", "GraphQL", "JSON", "Codable", "WebSocket", "Core Data", "Realm", "SQLite"] },
  { tier: "Testing & Quality", keywords: ["XCTest", "XCUITest", "Unit Testing", "UI Testing", "TestFlight", "crash-free sessions", "Instruments", "memory management", "ARC"] },
  { tier: "Release & CI/CD", keywords: ["App Store Connect", "Fastlane", "CI/CD", "Xcode Cloud", "Bitrise", "GitHub Actions", "code signing", "provisioning profiles", "TestFlight"] },
];

const FAQS = [
  { question: "Should I still list Objective-C on my iOS resume?", answer: "Yes, but position it as legacy depth, not your primary technology. 'Swift (primary), Objective-C (maintenance and bridging)' is accurate and useful — many iOS codebases still have Objective-C components, and showing you can work with legacy code is genuinely valuable. However, if Swift isn't prominent and primary, you'll be screened out for most modern iOS roles. Lead with Swift and SwiftUI; include Objective-C as additional context." },
  { question: "How important is App Store experience for iOS developer jobs?", answer: "For consumer app companies, App Store experience (managing submissions, handling rejection reviews, optimizing metadata) is a meaningful signal. For enterprise iOS development (internal apps distributed via MDM), it matters less. More universally important: crash rate metrics, App Store rating maintenance, and performance profiling with Instruments. Even if you haven't personally managed App Store submissions, include any metrics about the apps you've worked on — rating, user count, crash rate — to show your work reached real users." },
  { question: "Is SwiftUI experience required for iOS roles in 2025?", answer: "Increasingly yes for greenfield and startup roles; less so for established enterprise codebases. SwiftUI proficiency is a strong signal for companies building new products or modernizing existing apps. UIKit knowledge remains essential — SwiftUI doesn't replace UIKit for complex custom UI, and most production apps use both. The ideal iOS resume in 2025 shows deep UIKit knowledge with active SwiftUI adoption, not one or the other." },
];

export default async function IosDeveloperResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="iOS Developer Resume — Examples & ATS Keywords (2025)" description="iOS resumes that show App Store impact and performance wins — not just an Apple framework list." url={`${BASE_URL}/blog/ios-developer-resume`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "iOS Developer Resume", url: `${BASE_URL}/blog/ios-developer-resume` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · iOS / Mobile</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">iOS Developer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">App Store metrics, Swift/SwiftUI depth, and architecture ownership — what iOS hiring managers scan for, with before/after bullets and the complete ATS keyword breakdown.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={4} label="Hiring signals iOS managers look for beyond a Swift framework list" accent="#007AFF" />
            <StatCard value={68} suffix="%" label="Of iOS resumes list UIKit without a single App Store metric — main screen-out" accent="#DC2626" />
            <StatCard value={6} label="ATS keyword tiers for iOS, SwiftUI, and mobile engineer roles" accent="#7C3AED" />
            <StatCard value={2} suffix="B+" label="Apple devices globally — the platform context for your resume" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What iOS hiring managers scan for</h2>
          <div className="mt-6 space-y-4">
            {HIRING_SIGNALS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#007AFF]/10 text-[13px] font-bold text-[#007AFF]">{i + 1}</span>
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
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords for iOS and Apple platform roles</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your iOS resume reviewed by Zari.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste your resume and target JD — Zari rewrites your bullets to show App Store metrics, Swift/SwiftUI depth, and architecture ownership in the specific language iOS hiring managers scan for.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
