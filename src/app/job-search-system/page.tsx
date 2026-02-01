import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function JobSearchLanding() {
  return (
    <main>
      <section className="section-shell pb-16 pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Badge className="mb-4">AI Job Search System Builder</Badge>
            <h1 className="mb-4 text-4xl font-semibold text-slate-100 md:text-5xl">
              Build a job search system that reads like it was coached by a human.
            </h1>
            <p className="mb-6 text-lg text-slate-300">
              This isn&apos;t a generic checklist. We turn your role, level, timeline, and constraints into a real
              execution plan — the exact moves a coach would give you in week one.
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
                ["4 subscores", "clarity + assets + network + execution"],
                ["No account", "results delivered by link"],
              ].map(([value, label]) => (
                <div key={value} className="rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3">
                  <p className="text-lg font-semibold text-slate-100">{value}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <Card className="card-shadow border-slate-700 bg-slate-900/70 text-slate-100">
            <CardContent className="p-6">
              <p className="tag mb-4">Live preview</p>
              <h2 className="mb-2 text-xl font-semibold text-slate-100">What you get for free</h2>
              <ul className="mb-6 list-disc space-y-2 pl-5 text-sm text-slate-300">
                <li>Personalized score + coach-style read</li>
                <li>Weekly cadence tied to your hours and urgency</li>
                <li>Role-specific scripts + proof strategy</li>
              </ul>
              <div className="rounded-2xl bg-slate-950/70 px-5 py-4 text-slate-200">
                <p className="text-xs uppercase tracking-wide text-slate-400">Example coach note</p>
                <p className="mt-2 text-sm">
                  With a 30-day timeline and 5 hrs/week, you need high-signal intros before volume applications.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Offer momentum",
              body: "Went from scattered apps to 3 onsite loops in 4 weeks.",
            },
            {
              title: "Clear positioning",
              body: "The plan nailed my level and made my LinkedIn actually convert.",
            },
            {
              title: "Shorter timelines",
              body: "Cut my search time in half by focusing on targeted outreach.",
            },
          ].map((item) => (
            <Card key={item.title} className="card-shadow border-slate-700 bg-slate-900/70">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wide text-slate-400">Outcome</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="how" className="section-shell py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "1. Answer focused prompts",
              body: "We capture role, level, constraints, and the reality of your time budget.",
            },
            {
              title: "2. Get a coach-style preview",
              body: "You see your score and the first week of your plan immediately.",
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

      <section className="section-shell py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-100">Who this is for</h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>- You want a clear, realistic plan — not generic advice.</li>
              <li>- You have a target role/level and want faster traction.</li>
              <li>- You want a coach-style system you can execute weekly.</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-100">Not for you if</h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>- You&apos;re not ready to commit any weekly time.</li>
              <li>- You want a fully automated job search.</li>
              <li>- You&apos;re still deciding on your target role.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell pb-20 pt-8">
        <Card className="card-shadow border-slate-700 bg-slate-900/70">
          <CardContent className="flex flex-col items-start gap-4 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="tag mb-2">Ready?</p>
              <h3 className="text-2xl font-semibold text-slate-100">
                Start free and build your system today.
              </h3>
            </div>
            <Link
              href="/job-search-system/start"
              className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Start free
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
