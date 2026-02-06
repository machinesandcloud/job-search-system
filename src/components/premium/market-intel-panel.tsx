export function MarketIntelPanel({
  marketIntel,
  aiPending,
}: {
  marketIntel: any;
  aiPending: string;
}) {
  const keywords = marketIntel?.roleKeywords || [];
  const salary = marketIntel?.salaryData?.ranges || {};

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
                <span className="text-white/60">{keyword.frequency}% of postings</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full ${keyword.gap ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gradient-to-r from-emerald-400 to-teal-400"}`}
                  style={{ width: `${Math.min(100, keyword.frequency)}%` }}
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
        {salary && Object.keys(salary).length ? (
          <div className="mt-2 text-sm text-white/70">
            {Object.entries(salary).map(([level, range]: any) => (
              <p key={level}>
                {level}: ${range?.min ? range.min.toLocaleString() : "—"} - ${range?.max ? range.max.toLocaleString() : "—"}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-white/70">{aiPending}</p>
        )}
      </div>
    </section>
  );
}
