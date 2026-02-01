import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const logoKey = process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY;

const logoCompanies = [
  ["Google", "google.com"],
  ["Amazon", "amazon.com"],
  ["Microsoft", "microsoft.com"],
  ["Meta", "meta.com"],
  ["Apple", "apple.com"],
  ["Netflix", "netflix.com"],
  ["Stripe", "stripe.com"],
  ["Shopify", "shopify.com"],
  ["Salesforce", "salesforce.com"],
  ["Datadog", "datadoghq.com"],
  ["Cloudflare", "cloudflare.com"],
  ["Snowflake", "snowflake.com"],
];

export default function JobSearchLanding() {
  return (
    <main>
      <section className="section-shell pb-12 pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Badge className="mb-4">AI Job Search System Builder</Badge>
            <h1 className="mb-4 text-4xl font-semibold text-slate-100 md:text-5xl">
              A job search system that feels like a real coach built it with you.
            </h1>
            <p className="mb-6 text-lg text-slate-300">
              Tell me your role, timeline, and constraints. I’ll translate that into a clear weekly plan, scripts,
              proof strategy, and a realistic cadence — so you always know what to do next.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/job-search-system/start"
                className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg"
              >
                Start free assessment
              </Link>
              <Link
                href="#how"
                className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200"
              >
                See how it works
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["10 minutes", "to finish"],
                ["Coach read", "tailored to your inputs"],
                ["Resume + LinkedIn", "optional upload for sharper feedback"],
              ].map(([value, label]) => (
                <div key={value} className="rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3">
                  <p className="text-lg font-semibold text-slate-100">{value}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-3xl border border-slate-700 bg-slate-900/70 p-6 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-wide text-slate-400">Outcomes people care about</p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {[
                  ["3 onsite loops", "in 4 weeks"],
                  ["2x reply rate", "from targeted outreach"],
                  ["Faster clarity", "on level + comp targets"],
                ].map(([value, label]) => (
                  <div key={value} className="rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3">
                    <p className="text-lg font-semibold text-slate-100">{value}</p>
                    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Card className="card-shadow border-slate-700 bg-slate-900/70 text-slate-100">
            <CardContent className="p-6 space-y-6">
              <div>
                <p className="tag mb-3">System snapshot</p>
                <h2 className="mb-2 text-xl font-semibold text-slate-100">What you get, instantly</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
                  <li>Coach read: how your role, scope, and timeline map.</li>
                  <li>Cadence: weekly actions tied to your hours and urgency.</li>
                  <li>Scripts + proof: the exact messages and assets to ship.</li>
                  <li>Company targets + ATS keywords tied to your role.</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-slate-950/70 px-5 py-4 text-slate-200">
                <p className="text-xs uppercase tracking-wide text-slate-400">Example coach note</p>
                <p className="mt-2 text-sm">
                  With a 30‑day timeline and 5 hrs/week, you need warm intros + proof before volume applications.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-wide text-slate-400">Why this works</p>
                <p className="mt-2">
                  We translate your constraints into an execution plan that’s focused and sustainable — no wasted
                  effort, no guesswork.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 px-6 py-4">
          <p className="mb-3 text-xs uppercase tracking-wide text-slate-400">Companies people landed at</p>
          <div className="flex flex-wrap items-center gap-3">
            {logoCompanies.map(([name, domain]) => (
              <div key={name} className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-3 py-2">
                {logoKey ? (
                  <img
                    src={`https://img.logo.dev/${domain}?token=${logoKey}`}
                    alt=""
                    className="h-5 w-5"
                    loading="lazy"
                  />
                ) : (
                  <span className="h-5 w-5 rounded-full bg-slate-700" />
                )}
                <span className="text-xs font-semibold text-slate-200">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="section-shell py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "1. Answer focused prompts",
              body: "We capture your role, level, constraints, and the reality of your time budget.",
            },
            {
              title: "2. Get a coach‑style preview",
              body: "You see your score, coach read, and first‑week plan immediately.",
            },
            {
              title: "3. Unlock the full system",
              body: "Full plan, scripts, and execution checklist delivered by link.",
            },
          ].map((item) => (
            <Card key={item.title} className="card-shadow border-slate-700 bg-slate-900/70">
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-slate-100">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6 text-sm text-slate-300">
            <p className="tag mb-3">Visual preview</p>
            <h3 className="text-xl font-semibold text-slate-100">What the system looks like</h3>
            <p className="mt-2">
              You’ll see a coach summary, your 4‑week cadence, and the exact scripts we’d run for your role.
            </p>
            <ul className="mt-4 space-y-2">
              <li>- Snapshot of your role positioning and scope.</li>
              <li>- Weekly plan tied to your hours and timeline.</li>
              <li>- Outreach scripts + proof asset prompts.</li>
            </ul>
          </div>
          <div className="image-frame">Image placeholder: Coach system preview (imagegen)</div>
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8">
          <p className="tag mb-4">Program‑style timeline</p>
          <h2 className="text-2xl font-semibold text-slate-100">Your 5‑week career plan (example)</h2>
          <p className="mt-2 text-sm text-slate-300">
            Inspired by our coaching program cadence — adapted to your role, level, and hours/week.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Week 1", "Targeting & job search strategy", ["Define role + comp guardrails", "Build smart company list", "Set outreach cadence"]],
              ["Week 2", "Resume strategy that wins interviews", ["Refine bullets + impact", "Align ATS keywords", "Polish formatting"]],
              ["Week 3", "LinkedIn that gets you noticed", ["Upgrade headline + summary", "Add proof assets", "Craft connection scripts"]],
              ["Week 4", "Interview & negotiation strategy", ["Practice stories + pitch", "Mock interview drill", "Negotiation prep"]],
              ["Week 5", "Final review + mock interview", ["Plan review + next steps", "Mock interview session", "Execution handoff"]],
            ].map(([week, title, items]) => (
              <div key={week as string} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">{week}</p>
                <p className="mt-1 text-sm font-semibold text-slate-100">{title}</p>
                <ul className="mt-2 space-y-1 text-xs text-slate-300">
                  {(items as string[]).map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="card-shadow border-slate-700 bg-slate-900/70">
            <CardContent className="p-6">
              <p className="tag mb-3">About your coach</p>
              <h3 className="text-xl font-semibold text-slate-100">Coaching + recruiting + agentic AI</h3>
              <p className="mt-2 text-sm text-slate-300">
                I’ve coached candidates through high‑stakes transitions, partnered with recruiters on role clarity,
                and built AI systems that turn messy search inputs into clean execution plans.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>- Experience aligning role narratives with hiring managers.</li>
                <li>- Focus on signal, not volume.</li>
                <li>- Systems built to be realistic and repeatable.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="card-shadow border-slate-700 bg-slate-900/70">
            <CardContent className="p-6">
              <p className="tag mb-3">What this fixes</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>- “I’m applying everywhere but getting no traction.”</li>
                <li>- “I’m not sure which roles match my level.”</li>
                <li>- “My resume and LinkedIn don’t reflect my impact.”</li>
                <li>- “I don’t have a weekly plan I can stick to.”</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="card-shadow border-slate-700 bg-slate-900/70">
            <CardContent className="p-6">
              <p className="tag mb-3">FAQ</p>
              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <p className="font-semibold text-slate-100">How long does this take?</p>
                  <p>About 10 minutes. You’ll see the preview instantly and the full plan after email.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Do I need an account?</p>
                  <p>No. You get a tokenized link to your plan.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Will the plan match my constraints?</p>
                  <p>Yes — we calibrate to your hours/week, timeline, and non‑negotiables.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow border-slate-700 bg-slate-900/70">
            <CardContent className="p-6">
              <p className="tag mb-3">Ready?</p>
              <h3 className="text-2xl font-semibold text-slate-100">Start free and build your system today.</h3>
              <p className="mt-2 text-sm text-slate-300">No fluff. Just a clear, coach‑led execution plan.</p>
              <Link
                href="/job-search-system/start"
                className="mt-4 inline-flex rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Start free assessment
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
