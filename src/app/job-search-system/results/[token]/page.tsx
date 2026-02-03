import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { buildResults } from "@/lib/results";
import { buildProPack } from "@/lib/pro-pack";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScoreGauge } from "@/components/score-gauge";
import { UpgradeButton } from "@/components/upgrade-button";
import { ProPackActions } from "@/components/pro-pack-actions";
import { ResultsViewLogger } from "@/components/results-view-logger";
import { CompanyLogo } from "@/components/company-logo";
import { EmailGate } from "@/components/email-gate";

export default async function ResultsPage({ params }: { params: { token: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { token: params.token },
    include: {
      purchases: true,
      companies: { include: { company: true } },
    },
  });
  if (!lead) return notFound();
  const answers = lead.answers as any;
  const results = buildResults(answers);

  if (!lead.email) {
    return (
      <main className="cmd-shell pb-20 pt-12">
        <ResultsViewLogger leadId={lead.id} />
        <Link href="/job-search-system" className="text-sm text-slate-400">
          Back to landing
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="cmd-panel rounded-3xl p-6">
            <p className="tag mb-3">Preview</p>
            <h1 className="text-3xl font-semibold text-slate-100">Your Career System Preview</h1>
            <p className="mt-2 text-slate-300">
              Here’s a short preview. Enter your email to unlock the full plan and templates.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <ScoreGauge score={results.score} />
              <div>
                <p className="text-2xl font-semibold text-slate-100">{results.score}/100</p>
                <p className="text-sm text-slate-400">Full score breakdown unlocked after email.</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              {results.insights.slice(0, 2).map((insight) => (
                <p key={insight}>- {insight}</p>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm">
              <p className="text-xs uppercase tracking-wide text-slate-400">Week 1 cadence</p>
              <ul className="mt-2 space-y-1 text-slate-200">
                {(results.cadence[0]?.actions || []).slice(0, 3).map((action) => (
                  <li key={action}>- {action}</li>
                ))}
              </ul>
            </div>
          </div>
          <EmailGate leadId={lead.id} />
        </div>
      </main>
    );
  }

  const purchased = lead.purchases.some((purchase) => purchase.status === "SUCCEEDED");
  const companies = lead.companies.map((link) => link.company);
  const proPack = buildProPack(answers);

  const proEligible = results.score >= 70 && (answers.timeline === "ASAP" || answers.timeline === "30");
  const timelineLabel =
    answers.timeline === "ASAP"
      ? "ASAP (0-14 days)"
      : answers.timeline === "30"
      ? "30 days"
      : answers.timeline === "60"
      ? "60 days"
      : "90+ days";
  return (
    <main className="cmd-shell pb-20 pt-12">
      <ResultsViewLogger leadId={lead.id} />
      <Link href="/job-search-system" className="text-sm text-slate-400">
        Back to landing
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge>Results</Badge>
            <span className="text-sm text-slate-400">Private report</span>
          </div>
          <h1 className="mb-2 text-3xl font-semibold text-slate-100">Your Job Search System</h1>
          <p className="mb-6 text-slate-300">
            Here's the plan I'd run with you based on your timeline, constraints, and available hours. It's focused,
            realistic, and built to generate traction fast.
          </p>
          <div className="mb-6 grid gap-4 lg:grid-cols-2">
            <Card className="card-shadow">
              <CardContent className="p-6">
                <p className="tag mb-3">Coach summary</p>
                <p className="text-sm text-slate-300">{results.coachRead}</p>
                {results.coachFeedback && (
                  <p className="mt-3 text-sm text-slate-300">{results.coachFeedback}</p>
                )}
                <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
                  <p className="text-xs uppercase tracking-wide text-slate-400">What I heard</p>
                  <ul className="mt-2 space-y-1">
                    <li>- Target role: {answers.level} {answers.roles?.[0]}</li>
                    <li>- Timeline: {timelineLabel}</li>
                    <li>- Hours/week: {answers.hoursPerWeek}</li>
                    <li>- Constraints: {answers.constraints?.length ? answers.constraints.join(", ") : "None"}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            <Card className="card-shadow">
              <CardContent className="p-6">
                <p className="tag mb-3">Recommended route</p>
                <p className="text-2xl font-semibold text-slate-100">{results.route.replace("_", " ")}</p>
                <p className="mt-2 text-sm text-slate-300">
                  This route fits your urgency and current assets. We'll scale it up once the first week lands.
                </p>
                {results.planOverview?.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {results.planOverview.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="card-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Score</p>
                  <p className="text-2xl font-semibold text-slate-100">{results.score}/100</p>
                </div>
                <ScoreGauge score={results.score} />
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Clarity</p>
                <p className="text-lg font-semibold text-slate-100">{results.subscores.clarity}/25</p>
              </div>
              <div className="rounded-2xl bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Assets</p>
                <p className="text-lg font-semibold text-slate-100">{results.subscores.assets}/25</p>
              </div>
              <div className="rounded-2xl bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Network</p>
                <p className="text-lg font-semibold text-slate-100">{results.subscores.network}/25</p>
              </div>
              <div className="rounded-2xl bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Execution</p>
                <p className="text-lg font-semibold text-slate-100">{results.subscores.execution}/25</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 grid gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="tag mb-3">Insights</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  {results.insights.map((insight) => (
                    <li key={insight}>- {insight}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="tag mb-3">Weekly cadence</p>
                <div className="space-y-4">
                  {results.cadence.map((week) => (
                    <div key={week.week} className="rounded-2xl border border-slate-700 p-4">
                      <p className="text-sm font-semibold text-slate-100">
                        {week.week} - {week.focus}
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-slate-300">
                        {week.actions.map((action) => (
                          <li key={action}>- {action}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="tag mb-3">14-day execution checklist</p>
                <ul className="grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                  {results.checklist.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="tag mb-3">Role-specific scripts</p>
                <div className="space-y-3 text-sm text-slate-300">
                  <p><strong>Referral ask:</strong> {results.scripts.referral}</p>
                  <p><strong>Recruiter opener:</strong> {results.scripts.recruiter}</p>
                  <div>
                    <p className="font-semibold text-slate-100">Follow-up sequence</p>
                    <ul className="mt-2 space-y-1">
                      {results.scripts.followup.map((line) => (
                        <li key={line}>- {line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="tag mb-3">Proof strategy</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  {results.proofStrategy.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="space-y-6">
          <Card className="card-shadow">
            <CardContent className="p-6">
              <p className="tag mb-4">Your inputs</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><strong>Role:</strong> {answers.roles?.[0]}</li>
                <li><strong>Level:</strong> {answers.level}</li>
                <li><strong>Comp target:</strong> {answers.compTarget}</li>
                <li><strong>Timeline:</strong> {timelineLabel}</li>
                <li><strong>Location:</strong> {answers.locationType}{answers.city ? ` - ${answers.city}` : ""}</li>
                <li><strong>Hours/week:</strong> {answers.hoursPerWeek}</li>
                <li><strong>Biggest blocker:</strong> {answers.biggestBlocker}</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="p-6">
              <p className="tag mb-4">Company targets</p>
              <div className="space-y-3">
                {companies.length > 0 ? (
                  companies.map((company) => (
                    <div key={company.id} className="flex items-center gap-3">
                      <CompanyLogo
                        name={company.name}
                        domain={company.domain}
                        logoUrl={company.logoUrl}
                        size={40}
                        className="h-10 w-10 rounded-full border border-slate-700 bg-slate-950"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{company.name}</p>
                        <p className="text-xs text-slate-400">
                          {company.domain} {company.industry ? `- ${company.industry}` : ""}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No companies selected yet.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <p className="tag mb-4">Upgrade</p>
              <h3 className="text-xl font-semibold text-slate-100">Unlock the Pro Pack ($49)</h3>
              <p className="mt-2 text-sm text-slate-300">
                Get a 10-company shortlist, ATS keyword map, outreach script pack, interview prep route, and
                negotiation scripts.
              </p>
              {!purchased ? (
                <div className="mt-4">
                  <UpgradeButton leadId={lead.id} token={lead.token} />
                </div>
              ) : (
                <p className="mt-4 text-sm text-emerald-200">Pro Pack unlocked.</p>
              )}
            </CardContent>
          </Card>

          {purchased && (
            <Card className="card-shadow">
              <CardContent className="p-6">
                <p className="tag mb-4">Pro Pack</p>
                <div className="space-y-4 text-sm text-slate-300">
                  <div>
                    <p className="font-semibold text-slate-100">10-company shortlist</p>
                    <ul className="mt-2 space-y-1">
                      {proPack.shortlist.map((company) => (
                        <li key={company.name}>- {company.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">ATS keyword map</p>
                    <div className="mt-2 grid gap-2 text-xs text-slate-300">
                      {proPack.keywordMap.map((item) => (
                        <div key={item.keyword} className="flex items-center justify-between rounded-full bg-slate-800 px-3 py-1">
                          <span>{item.keyword}</span>
                          <span className="text-slate-400">{item.priority}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-slate-400">Missing keywords to add:</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {proPack.missingKeywords.map((keyword) => (
                        <li key={keyword} className="rounded-full bg-slate-800 px-3 py-1 text-xs">
                          {keyword}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">Outreach Script Pack</p>
                    <ul className="mt-2 space-y-1">
                      {proPack.outreachScripts.map((script) => (
                        <li key={script}>- {script}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">Interview Prep Route</p>
                    <ul className="mt-2 space-y-1">
                      {proPack.interviewPrep.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">Negotiation scripts</p>
                    <ul className="mt-2 space-y-1">
                      {proPack.negotiationScripts.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <ProPackActions token={lead.token} results={results} leadId={lead.id} />
                </div>
              </CardContent>
            </Card>
          )}

          {proEligible &&
            (process.env.NEXT_PUBLIC_ENABLE_RAPID_REVIEW === "true" ||
              process.env.NEXT_PUBLIC_ENABLE_COACHING_APPLY === "true") && (
              <Card>
                <CardContent className="p-6">
                  <p className="tag mb-4">Next step</p>
                  <p className="text-sm text-slate-300">
                    Based on your score and timeline, you may be a fit for higher-touch support.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {process.env.NEXT_PUBLIC_ENABLE_RAPID_REVIEW === "true" && (
                      <Link
                        href="/job-search-system/rapid-review"
                        className="rounded-full border border-slate-500 px-4 py-2 text-xs font-semibold text-slate-100"
                      >
                        Rapid Review ($99)
                      </Link>
                    )}
                    {process.env.NEXT_PUBLIC_ENABLE_COACHING_APPLY === "true" && (
                      <Link
                        href="/job-search-system/coaching-apply"
                        className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-900"
                      >
                        Apply for Coaching
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
      </div>
    </main>
  );
}
