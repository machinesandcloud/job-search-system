export function Week2Preview({
  preview,
  aiPending,
  targetCompanies,
}: {
  preview: any;
  aiPending: string;
  targetCompanies: string[];
}) {
  const tasks = preview?.previewTasks || [];

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-70 blur-[2px]" />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Week 2 Preview</h3>
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">Execution Week</span>
        </div>
        <p className="mt-2 text-sm text-white/70">{preview?.summary || aiPending}</p>
        <div className="mt-4 space-y-3">
          {(tasks.length ? tasks : ["Personalized applications", "Outreach sequences", "Interview prep loops"]).map(
            (task: string, index: number) => (
              <div key={index} className="rounded-xl border border-white/10 bg-[#0B1220] p-4 opacity-60 blur-[1.5px]">
                <p className="text-sm font-semibold">{task}</p>
              </div>
            )
          )}
        </div>
        <div className="mt-4 rounded-xl border border-[#06B6D4]/30 bg-[#06B6D4]/10 p-4 text-sm text-white/80">
          {preview?.upgradeMessage ||
            `Upgrade to unlock the full 14-day plan, company strategy for ${targetCompanies.join(", ")}, and interview prep.`}
        </div>
      </div>
    </section>
  );
}
