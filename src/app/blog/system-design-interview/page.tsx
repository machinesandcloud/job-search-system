import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "System Design Interview — How to Prepare & What Interviewers Score (2025)",
  description:
    "How system design interviews are actually scored — scalability, trade-offs, API design, data modeling, and the component-level thinking that separates senior from mid-level candidates. With a framework for approaching any system design question.",
  keywords: ["system design interview", "system design interview prep", "how to prepare for system design interview", "system design interview questions", "system design interview tips", "senior software engineer interview"],
  alternates: { canonical: "/blog/system-design-interview" },
  openGraph: {
    title: "System Design Interview — How to Prepare & What Interviewers Score (2025)",
    description: "The scoring dimensions, common failure modes, and a repeatable framework for any system design question. For mid-to-senior engineers targeting FAANG and top-tier companies.",
    url: "/blog/system-design-interview",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const SCORING_DIMENSIONS = [
  {
    dimension: "Problem scoping & requirements",
    weight: "High",
    weightColor: "#DC2626",
    whatTheyLookFor: "Do you ask clarifying questions before diving in? Most candidates skip this and design the wrong system. Interviewers want to see you define functional vs. non-functional requirements, establish scale (DAU, QPS, storage), and explicitly agree on scope before drawing a single box.",
    commonFail: "Jumping straight to components without asking about scale, feature boundaries, or consistency requirements. You then spend 30 minutes designing something that doesn't match what they asked for.",
    zariCoaches: "Zari drills the requirements phase — practicing opening frameworks that surface the 5–7 questions you must ask before any system design begins.",
  },
  {
    dimension: "High-level architecture",
    weight: "High",
    weightColor: "#DC2626",
    whatTheyLookFor: "A clear component diagram: clients, load balancers, services, databases, caches, queues, CDN. Not perfect — correct direction. Senior engineers draw clean boundaries between services, state what each owns, and explain why services are split the way they are.",
    commonFail: "A single monolith with arrows pointing everywhere. Or over-engineering with microservices when the scale doesn't call for it. Interviewers evaluate whether your architecture matches the stated scale.",
    zariCoaches: "Practice translating scale requirements into architecture decisions. Zari asks follow-up questions that surface whether your architecture matches your requirements.",
  },
  {
    dimension: "Data modeling & storage",
    weight: "High",
    weightColor: "#DC2626",
    whatTheyLookFor: "Schema design, access patterns, database selection rationale. Should this be SQL or NoSQL — and why? How do you store user events at 10M/day? What does the entity-relationship model look like? Senior candidates name their tables, define primary keys, and explain indexing strategy.",
    commonFail: "Vague 'just use a database' answers without naming the engine, explaining schema, or justifying the choice against alternatives. Interviewers flag this as operating below senior level.",
    zariCoaches: "Zari covers the SQL vs NoSQL decision matrix and schema design patterns for common system types — feeds, messaging, analytics, and user profiles.",
  },
  {
    dimension: "Scalability & bottlenecks",
    weight: "High",
    weightColor: "#DC2626",
    whatTheyLookFor: "Where does the system break at 10x current load? Proactively identifying bottlenecks — write throughput, single-point-of-failure services, hot partitions — and proposing solutions. Caching strategy, horizontal scaling, database sharding, read replicas.",
    commonFail: "Designing the happy path without discussing failure modes or scale limits. The interviewer will push: 'This has 100M users — now what?' Candidates who haven't pre-thought this visibly struggle.",
    zariCoaches: "Zari runs scale-up scenarios — given a baseline design, coaches you through identifying and resolving the next three bottlenecks.",
  },
  {
    dimension: "API design",
    weight: "Medium",
    weightColor: "#F97316",
    whatTheyLookFor: "REST vs. GraphQL rationale, endpoint definitions, request/response shape, pagination strategy, authentication mechanism. Senior candidates can articulate why their API contract is designed the way it is — not just list endpoints.",
    commonFail: "Listing endpoints without specifying methods, response shape, or pagination. Or defaulting to REST without considering whether the client's access patterns favor GraphQL.",
    zariCoaches: "Zari covers API design trade-offs and how to communicate API decisions clearly in a 45-minute interview window.",
  },
  {
    dimension: "Trade-off communication",
    weight: "High",
    weightColor: "#DC2626",
    whatTheyLookFor: "The ability to name a trade-off, explain both sides, and make a reasoned choice — rather than presenting your design as the only valid answer. Eventual vs. strong consistency, latency vs. throughput, normalization vs. denormalization. Senior engineers make these choices explicitly.",
    commonFail: "Presenting one approach as if it's obviously correct. Interviewers probe trade-offs specifically — if you don't surface them, they will, and you'll look like you hadn't considered them.",
    zariCoaches: "Zari coaches the trade-off framing habit: for every major decision, articulate what you're optimizing for and what you're giving up.",
  },
];

const FRAMEWORK = [
  {
    step: "Clarify requirements (5 min)",
    actions: [
      "Who are the users? What are they doing?",
      "Define scale: daily active users, peak QPS, data volume per day",
      "Functional requirements: what the system must do",
      "Non-functional requirements: latency SLA, consistency, availability",
      "Explicitly scope what's in and out for this interview",
    ],
    whyItMatters: "Requirements define everything downstream. A messaging system optimized for 1K users looks nothing like one optimized for 1B users. Get this wrong and you design the wrong system.",
  },
  {
    step: "Estimate scale (3 min)",
    actions: [
      "DAU × actions per user = daily writes",
      "Reads are usually 10–100× writes — establish read/write ratio",
      "Storage: daily data size × retention period",
      "Bandwidth: data transferred in/out per second at peak",
      "State your assumptions out loud and write numbers on the whiteboard",
    ],
    whyItMatters: "Scale numbers determine architecture. 1K QPS vs. 1M QPS requires completely different storage engines, caching strategies, and service topology. Most candidates skip this and their architecture has no justification.",
  },
  {
    step: "High-level design (10 min)",
    actions: [
      "Draw the major components: client, load balancer, services, DB, cache, queue",
      "Name each component and state what it owns",
      "Explain the data flow through the system end-to-end",
      "Keep it simple — don't over-engineer before you've agreed on the shape",
      "Get explicit signal from the interviewer before going deep",
    ],
    whyItMatters: "The HLD is your contract with the interviewer. It sets what you'll deep-dive next and ensures you're both looking at the same system.",
  },
  {
    step: "Deep dive: 2–3 components (15 min)",
    actions: [
      "Pick the most interesting or risky components to go deep on",
      "Data schema: tables, keys, indices",
      "Caching layer: what goes in cache, TTL, eviction policy, invalidation",
      "Asynchronous processing: queues, consumers, retry/dead-letter strategy",
      "Database choice: SQL vs. NoSQL — justified by access patterns",
    ],
    whyItMatters: "This is where you demonstrate senior-level thinking. Interviewers evaluate whether your depth matches your claimed experience. Vague answers here are the most common senior-level failure mode.",
  },
  {
    step: "Scale & edge cases (7 min)",
    actions: [
      "Identify the top 3 bottlenecks in your current design",
      "Propose horizontal scaling, sharding, or read replicas where appropriate",
      "Discuss failure modes: what happens when service X goes down?",
      "State consistency/availability trade-off for each major component",
      "Summarize what you'd do with more time",
    ],
    whyItMatters: "Senior candidates proactively scale their designs. If you wait for the interviewer to ask 'but what about scale?' you've missed the signal they were waiting for.",
  },
];

const COMMON_SYSTEMS = [
  {
    system: "URL Shortener",
    keyDecisions: ["Read-heavy (10:1 read/write ratio)", "Hash generation strategy (MD5 prefix vs. counter)", "Redirect type: 301 vs. 302", "Analytics: sync vs. async event tracking"],
    storageEngine: "SQL or wide-column (Cassandra) for URL mappings; Cache heavily on read path",
    seniorSignals: ["Custom base-62 encoding for shorter URLs", "Bloom filter to detect hash collisions before DB lookup", "Geographically distributed caching"],
  },
  {
    system: "Design Twitter / News Feed",
    keyDecisions: ["Fan-out on write vs. fan-out on read", "Timeline storage: precomputed vs. computed at request time", "Celebrity problem: users with 10M followers"],
    storageEngine: "User graph in Redis; Posts in SQL; Feed in Redis sorted sets or precomputed in Cassandra",
    seniorSignals: ["Hybrid fan-out: precompute for non-celebrity, merge at read time for celebrities", "Sharding strategy for hot users", "CDN for media assets"],
  },
  {
    system: "Design a Chat System",
    keyDecisions: ["Connection: WebSocket vs. long polling vs. SSE", "Message delivery: at-least-once vs. exactly-once", "Online presence detection"],
    storageEngine: "Message history in Cassandra (append-optimized); Session state in Redis; Fan-out via message queue",
    seniorSignals: ["Message ID ordering with Snowflake-style IDs", "Presence heartbeat design", "Read receipts as separate write path"],
  },
  {
    system: "Rate Limiter",
    keyDecisions: ["Token bucket vs. sliding window vs. fixed window", "Where to apply: API gateway vs. service level", "Distributed rate limiting across nodes"],
    storageEngine: "Redis with INCR + EXPIRE for counters; Lua scripts for atomic operations",
    seniorSignals: ["Sliding window log vs. sliding window counter trade-offs", "Header response design (X-RateLimit-*)", "Graceful degradation when Redis is down"],
  },
];

const FAQS = [
  {
    question: "How long should a system design interview be?",
    answer: "Most system design interviews run 45–60 minutes. The split roughly follows: 5 minutes for requirements, 3 minutes for scale estimation, 10 minutes for high-level design, 15 minutes for deep dives on 2–3 components, and 7–10 minutes for scaling discussion and edge cases. The biggest mistake is spending the entire interview on the high-level design and never reaching the component-level depth that separates senior candidates."
  },
  {
    question: "What level does system design start appearing in interviews?",
    answer: "System design interviews typically begin at mid-level (L4 at FAANG-equivalent companies) and become a major signal at senior (L5) and above. At junior level, you're evaluated on coding; at senior, architecture and trade-off thinking become the primary signal. At staff and principal level, the scope expands to cross-system design and org-level technical strategy."
  },
  {
    question: "Should I use SQL or NoSQL in a system design interview?",
    answer: "Neither is universally correct — the answer depends on your access patterns, consistency requirements, and scale. SQL wins when: you need ACID transactions, your access patterns are well-defined, and your data is relational. NoSQL wins when: you need massive horizontal scale, your schema evolves frequently, or you're doing key-value or document lookups with simple access patterns. The wrong answer is choosing one without justifying it — interviewers want to hear the trade-off reasoning, not just the decision."
  },
  {
    question: "How much should I memorize for system design vs. understand?",
    answer: "Memorizing specific numbers (Cassandra throughput, Redis latency) helps with estimation and credibility, but interviewers care far more about whether you can reason about trade-offs than whether you've memorized specific benchmarks. Understand the principles: when to use caching and what to cache, when to denormalize, when fan-out on write beats fan-out on read, how horizontal sharding works. The frameworks transfer to any system; memorized facts only help with the system you memorized."
  },
];

export default async function SystemDesignInterviewPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="System Design Interview — How to Prepare & What Interviewers Score (2025)"
        description="The scoring dimensions, common failure modes, and a repeatable framework for any system design question."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/system-design-interview`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "System Design Interview", url: `${BASE_URL}/blog/system-design-interview` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Interviews</span>
            <span className="text-[11px] text-white/30">14 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            System design interview<br /><span className="gradient-text-animated">what they actually score</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most candidates prepare by memorizing system architectures. Interviewers care about whether you can scope requirements, identify bottlenecks, and communicate trade-offs. Different skills. Here&apos;s what they&apos;re actually evaluating — and how to prepare for it.
          </p>
        </div>
      </section>

      {/* Scoring dimensions */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 6 dimensions interviewers score</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Most interviewers use a rubric. Here&apos;s what&apos;s actually on it — and the most common failure mode at each.</p>
          <div className="mt-8 space-y-5">
            {SCORING_DIMENSIONS.map((dim) => (
              <div key={dim.dimension} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.dimension}</p>
                  <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${dim.weightColor}14`, color: dim.weightColor }}>
                    {dim.weight} signal
                  </span>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">What they&apos;re looking for</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.whatTheyLookFor}</p>
                  </div>
                  <div className="bg-red-50/40 px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-600">Most common fail</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.commonFail}</p>
                  </div>
                  <div className="bg-[var(--brand)]/[0.03] px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">How Zari coaches this</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.zariCoaches}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 5-step framework for any system design question</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">A repeatable structure that works for 90% of system design prompts — and prevents the most common failure modes.</p>
          <div className="mt-7 space-y-4">
            {FRAMEWORK.map((item, i) => (
              <div key={item.step} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-center gap-4 border-b border-[var(--border)] bg-white px-6 py-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[13px] font-bold text-white">{i + 1}</span>
                  <p className="font-bold text-[var(--ink)]">{item.step}</p>
                </div>
                <div className="px-6 py-5">
                  <ul className="mb-4 space-y-1.5">
                    {item.actions.map((action) => (
                      <li key={action} className="flex items-start gap-2 text-[13.5px] text-[var(--muted)]">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand)]" />
                        {action}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-xl bg-[var(--brand)]/[0.06] px-4 py-3">
                    <p className="text-[12px] font-bold uppercase tracking-wider text-[#4361EE] mb-1">Why it matters</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.whyItMatters}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common systems */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 systems you&apos;ll almost certainly be asked to design</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The key decisions, storage choices, and senior-level signals for each common prompt.</p>
          <div className="mt-7 space-y-5">
            {COMMON_SYSTEMS.map((sys) => (
              <div key={sys.system} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4">
                  <p className="font-extrabold text-[var(--ink)]">Design: {sys.system}</p>
                </div>
                <div className="grid gap-0 divide-y divide-[var(--border)] md:grid-cols-3 md:divide-y-0 md:divide-x">
                  <div className="px-5 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Key decisions</p>
                    <ul className="space-y-1.5">
                      {sys.keyDecisions.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-[12.5px] text-[var(--muted)]">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--muted)]" />{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-5 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Storage choice</p>
                    <p className="text-[12.5px] leading-6 text-[var(--muted)]">{sys.storageEngine}</p>
                  </div>
                  <div className="bg-[var(--brand)]/[0.03] px-5 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">Senior signals</p>
                    <ul className="space-y-1.5">
                      {sys.seniorSignals.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-[12.5px] text-[var(--muted)]">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">System design interview FAQs</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Practice system design with an AI coach that pushes back.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari asks the clarifying questions interviewers use, probes your trade-offs, and tells you exactly where your design breaks down. Start your first session free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Practice free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
