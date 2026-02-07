type ATSKeyword = {
  keyword: string;
  category?: string;
  importance?: "critical" | "important" | "nice-to-have";
  frequency?: number;
};

export function ATSKeywordPanel({
  atsAnalysis,
  aiPending,
}: {
  atsAnalysis: any;
  aiPending: string;
}) {
  if (!atsAnalysis) {
    return (
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold">ATS Screening Analysis</h3>
        <p className="mt-3 text-sm text-white/70">{aiPending}</p>
      </section>
    );
  }

  const matched = (atsAnalysis.matchedKeywords || []) as ATSKeyword[];
  const missing = (atsAnalysis.missingKeywords || []) as ATSKeyword[];
  const criticalMissing = missing.filter((item) => item.importance === "critical");
  const importantMissing = missing.filter((item) => item.importance === "important");

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">ATS Screening Analysis</h3>
        <span className="text-xs uppercase tracking-[0.2em] text-white/50">Keyword match</span>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-[#0B1220] p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">ATS Match Score</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {atsAnalysis.score}/100
            </p>
          </div>
          <div className="text-right text-xs text-white/60">
            <p>
              {matched.length} / {atsAnalysis.totalKeywords || matched.length + missing.length} keywords matched
            </p>
            <p className="mt-1 text-emerald-300">{atsAnalysis.matchPercentage}% match</p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            style={{ width: `${Math.min(100, Math.max(0, atsAnalysis.matchPercentage || 0))}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Keywords you have</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {matched.length ? (
              matched.slice(0, 18).map((item, index) => (
                <span
                  key={`${item.keyword}-${index}`}
                  className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200"
                >
                  {item.keyword}
                </span>
              ))
            ) : (
              <p className="text-sm text-white/60">{aiPending}</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Missing keywords</p>
          <div className="mt-3 space-y-3">
            {criticalMissing.length ? (
              <div>
                <p className="text-xs font-semibold text-red-300 uppercase tracking-[0.2em]">Critical</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {criticalMissing.slice(0, 8).map((item, index) => (
                    <span
                      key={`critical-${item.keyword}-${index}`}
                      className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-200"
                    >
                      {item.keyword}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {importantMissing.length ? (
              <div>
                <p className="text-xs font-semibold text-amber-300 uppercase tracking-[0.2em]">Important</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {importantMissing.slice(0, 10).map((item, index) => (
                    <span
                      key={`important-${item.keyword}-${index}`}
                      className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200"
                    >
                      {item.keyword}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {!criticalMissing.length && !importantMissing.length && missing.length ? (
              <div className="flex flex-wrap gap-2">
                {missing.slice(0, 10).map((item, index) => (
                  <span
                    key={`missing-${item.keyword}-${index}`}
                    className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200"
                  >
                    {item.keyword}
                  </span>
                ))}
              </div>
            ) : null}
            {!missing.length ? <p className="text-sm text-white/60">{aiPending}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
