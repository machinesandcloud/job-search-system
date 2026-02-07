export function FiveWeekPlan({ plan }: { plan: any }) {
  if (!plan?.weeks?.length) {
    return null;
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{plan.title || "Your 5-Week Career Plan"}</h2>
        <span className="text-xs uppercase tracking-[0.2em] text-white/50">5 weeks</span>
      </div>
      <div className="mt-4 space-y-4">
        {plan.weeks.map((week: any) => (
          <div key={week.week} className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Week {week.week}</p>
            <p className="mt-2 text-base font-semibold text-white">{week.title}</p>
            <ul className="mt-3 space-y-1 text-sm text-white/70">
              {(week.bullets || []).map((item: string, index: number) => (
                <li key={`${week.week}-${index}`}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
