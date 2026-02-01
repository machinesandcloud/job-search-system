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
              Let AI coach your job search into a system that wins interviews.
            </h1>
            <p className="mb-6 text-lg text-slate-300">
              You bring the role, level, and constraints. We build the plan, cadence, and scripts a real coach would
              hand you after week one — tailored to your exact time budget.
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
                ["Coach read", "role + timeline calibration"],
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
              <p className="tag mb-4">System snapshot</p>
              <h2 className="mb-2 text-xl font-semibold text-slate-100">Your plan, in three layers</h2>
              <ul className="mb-6 list-disc space-y-2 pl-5 text-sm text-slate-300">
                <li>Coach read: how your role, scope, and timeline really map.</li>
                <li>Cadence: weekly actions tied to your hours and urgency.</li>
                <li>Scripts + proof: the exact messages and assets to ship.</li>
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
              body: "Turned scattered apps into 3 onsite loops in 4 weeks.",
            },
            {
              title: "Clear positioning",
              body: "Calibrated level and rewired LinkedIn to actually convert.",
            },
            {
              title: "Shorter timelines",
              body: "Cut search time in half with targeted outreach.",
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

      <section className="section-shell py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="card-shadow border-slate-700 bg-slate-900/70">
            <CardContent className="p-6">
              <p className="tag mb-3">What makes it specific</p>
              <h3 className="text-xl font-semibold text-slate-100">We calibrate to your actual reality.</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>- Role + level target drive the scripts, proof, and positioning.</li>
                <li>- Timeline + hours/week set the cadence and outreach volume.</li>
                <li>- Industry + company stage shape the proof strategy.</li>
                <li>- Constraints and blockers shape the next 14 days.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="card-shadow border-slate-700 bg-slate-900/70">
            <CardContent className="p-6">
              <p className="tag mb-3">Deliverables</p>
              <div className="grid gap-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Coach read</p>
                  <p className="mt-1">A clear summary of your positioning + fastest path to traction.</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Weekly cadence</p>
                  <p className="mt-1">A realistic plan tied to your hours + urgency.</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Scripts + proof</p>
                  <p className="mt-1">Outreach scripts, follow-ups, and proof assets to build.</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
              body: "You see your score, coach read, and first week immediately.",
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
