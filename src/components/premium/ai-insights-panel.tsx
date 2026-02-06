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

  const items = [
    {
      title: "Primary Gap",
      tone: "border-red-500/30 bg-red-500/10",
      content: insights?.primaryGap,
      detail: insights?.primaryGapExplanation,
    },
    {
      title: "Quick Win",
      tone: "border-emerald-500/30 bg-emerald-500/10",
      content: insights?.quickWin,
      detail: insights?.quickWinReasoning,
    },
    {
      title: "Hidden Strength",
      tone: "border-cyan-500/30 bg-cyan-500/10",
      content: insights?.strengthsToLeverage?.[0]?.strength,
      detail: insights?.strengthsToLeverage?.[0]?.howToUse,
    },
    {
      title: "Market Reality",
      tone: "border-amber-500/30 bg-amber-500/10",
      content: insights?.realityCheck,
      detail:
        marketIntel?.roleKeywords?.length
          ? `Based on ${marketIntel.roleKeywords.length}+ live job-skill signals.`
          : "",
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
          </div>
        ))}
      </div>
    </section>
  );
}
