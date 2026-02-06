export function MarketIntelPanel({
  marketIntel,
  aiPending,
}: {
  marketIntel: any;
  aiPending: string;
}) {
  const keywords = marketIntel?.roleKeywords || [];
  const salaryRanges = marketIntel?.salaryData?.ranges || null;
  const salarySignals = marketIntel?.salarySignals || null;
  const companyTrends = marketIntel?.companyTrends || [];

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Live Market Intelligence</h3>
        <span className="text-xs uppercase tracking-[0.2em] text-white/50">
          {marketIntel?.timestamp ? new Date(marketIntel.timestamp).toLocaleDateString() : "Live"}
        </span>
      </div>
      {keywords.length ? (
        <div className="mt-4 space-y-3">
          {keywords.slice(0, 5).map((keyword: any) => (
            <div key={keyword.keyword} className="rounded-xl border border-white/10 bg-[#0B1220] p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{keyword.keyword}</span>
                <span className="text-white/60">
                  {keyword.frequency ? `${keyword.frequency}% of postings` : keyword.notes || "Signal"}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full ${keyword.gap ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gradient-to-r from-emerald-400 to-teal-400"}`}
                  style={{ width: `${Math.min(100, Number(keyword.frequency) || 60)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-white/70">{aiPending}</p>
      )}

      <div className="mt-6 rounded-xl border border-white/10 bg-[#0B1220] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">Salary benchmark</p>
        {salaryRanges && Object.keys(salaryRanges).length ? (
          <div className="mt-2 text-sm text-white/70">
            {Object.entries(salaryRanges).map(([level, range]: any) => (
              <p key={level}>
                {level}: ${range?.min ? range.min.toLocaleString() : "—"} - ${range?.max ? range.max.toLocaleString() : "—"}
              </p>
            ))}
          </div>
        ) : salarySignals?.range ? (
          <div className="mt-2 text-sm text-white/70">
            <p>{salarySignals.range}</p>
            {salarySignals.sources?.length ? (
              <p className="mt-1 text-xs text-white/50">
                Sources: {salarySignals.sources.slice(0, 2).join(", ")}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="mt-2 text-sm text-white/70">{aiPending}</p>
        )}
      </div>

      {companyTrends.length ? (
        <div className="mt-6 rounded-xl border border-white/10 bg-[#0B1220] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Company signals</p>
          <div className="mt-2 space-y-2 text-sm text-white/70">
            {companyTrends.slice(0, 3).map((trend: any, idx: number) => (
              <p key={idx}>
                <span className="font-semibold text-white/80">{trend.company}</span>: {trend.signal}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
