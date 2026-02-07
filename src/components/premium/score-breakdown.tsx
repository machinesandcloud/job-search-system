export function ScoreBreakdown({ assessment, aiPending }: { assessment: any; aiPending: string }) {
  const resumeScore = (assessment.resumeAnalysis as any)?.overallScore;
  const linkedinScore = (assessment.linkedinAnalysis as any)?.overallScore;
  const skillsScore = (assessment.skillMatchData as any)?.overallScore ?? null;
  const networkScore = assessment.networkScore ?? null;
  const atsScore =
    (assessment.skillMatchData as any)?.atsAnalysis?.score ??
    (assessment.skillMatchData as any)?.atsScore ??
    (typeof skillsScore === "number" ? skillsScore : null);
  const atsPass =
    typeof atsScore === "number" ? atsScore >= 70 : (assessment.skillMatchData as any)?.atsPass;

  const cards = [
    { label: "Resume", score: resumeScore, color: "from-cyan-500 to-sky-500" },
    { label: "LinkedIn", score: linkedinScore, color: "from-indigo-500 to-purple-500" },
    { label: "ATS Match", score: atsScore, color: "from-emerald-500 to-teal-500" },
    { label: "Network", score: networkScore, color: "from-amber-500 to-orange-500" },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Score Breakdown</h2>
        <p className="text-xs uppercase tracking-[0.2em] text-white/40">Week 1 focus</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">ATS screening</p>
        <p className="mt-2 text-sm text-white/90">
          {atsPass === true
            ? "Your resume clears ATS keyword screening. Next: hiring manager alignment."
            : atsPass === false
              ? "Your resume risks ATS rejection. Close missing keyword gaps first."
              : aiPending}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">{card.label}</p>
            {typeof card.score === "number" ? (
              <>
                <p className="mt-3 text-3xl font-semibold text-white">{card.score}/100</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full bg-gradient-to-r ${card.color}`}
                    style={{ width: `${Math.min(100, Math.max(0, card.score))}%` }}
                  />
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-white/60">{aiPending}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
