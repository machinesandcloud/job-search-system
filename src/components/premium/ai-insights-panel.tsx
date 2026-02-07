export function AIInsightsPanel({
  assessment,
  aiPending,
}: {
  assessment: any;
  aiPending: string;
}) {
  const insights = assessment.aiInsights as any;
  const resume = assessment.resumeParsedData as any;
  const marketIntel = assessment.marketIntelligence as any;
  const skillMatch = assessment.skillMatchData as any;
  const linkedin = assessment.linkedinParsedData as any;

  const items = [
    {
      title: "Primary Gap",
      tone: "border-red-500/30 bg-red-500/10",
      content: insights?.primaryGap,
      detail: insights?.primaryGapExplanation,
      evidence: insights?.primaryGapEvidence,
    },
    {
      title: "Quick Win",
      tone: "border-emerald-500/30 bg-emerald-500/10",
      content: insights?.quickWin,
      detail: insights?.quickWinReasoning,
      evidence: insights?.quickWinEvidence,
    },
    {
      title: "Hidden Strength",
      tone: "border-cyan-500/30 bg-cyan-500/10",
      content: insights?.strengthsToLeverage?.[0]?.strength,
      detail: insights?.strengthsToLeverage?.[0]?.howToUse,
      evidence: insights?.strengthsToLeverage?.[0]?.evidence
        ? [insights.strengthsToLeverage[0].evidence]
        : null,
    },
    {
      title: "Market Reality",
      tone: "border-amber-500/30 bg-amber-500/10",
      content: insights?.realityCheck,
      detail:
        marketIntel?.roleKeywords?.length
          ? `Based on ${marketIntel.roleKeywords.length}+ live job-skill signals.`
          : "",
      evidence: marketIntel?.roleKeywords?.slice(0, 2)?.map((item: any) =>
        `${item.keyword}: ${item.frequency}% of postings`
      ),
    },
    {
      title: "Hiring Manager Check",
      tone: "border-blue-500/30 bg-blue-500/10",
      content: skillMatch?.educationMet === false
        ? `Education requirement isn't verified yet.`
        : "Minimum requirements look aligned. Next: proof + role alignment.",
      detail: skillMatch?.requiredEducation
        ? `Job description mentions: "${skillMatch.requiredEducation}"`
        : "",
      evidence: [
        skillMatch?.roleAlignmentScore
          ? `Role alignment score: ${skillMatch.roleAlignmentScore}/100`
          : "Role alignment based on resume + LinkedIn titles.",
      ],
    },
    {
      title: "LinkedIn Consistency",
      tone: "border-fuchsia-500/30 bg-fuchsia-500/10",
      content: linkedin?.headline
        ? "Your LinkedIn headline should match your target role and resume."
        : "LinkedIn headline missing. Recruiters validate role fit here.",
      detail: linkedin?.headline ? `Current headline: ${linkedin.headline}` : "Add a headline that mirrors your target role.",
      evidence: [
        resume?.currentRole ? `Resume role: ${resume.currentRole?.title || resume.currentRole}` : "Resume role not detected.",
      ],
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">AI Insights</h2>
        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
          Personalized to {resume?.personalInfo?.fullName || "your profile"}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className={`rounded-2xl border p-5 ${item.tone}`}>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">{item.title}</p>
            <p className="mt-3 text-sm text-white/90">{item.content || aiPending}</p>
            {item.detail ? (
              <p className="mt-2 text-xs text-white/60">{item.detail}</p>
            ) : null}
            {item.evidence && item.evidence.length ? (
              <ul className="mt-3 space-y-1 text-xs text-white/60">
                {item.evidence.map((line: string, index: number) => (
                  <li key={`${item.title}-evidence-${index}`}>• {line}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
