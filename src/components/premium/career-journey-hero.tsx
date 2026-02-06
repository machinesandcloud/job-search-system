const getFirstName = (fullName?: string | null) => {
  if (!fullName) return "there";
  return fullName.split(" ")[0];
};

export function CareerJourneyHero({ assessment }: { assessment: any }) {
  const resume = assessment.resumeParsedData as any;
  const linkedinManual = assessment.linkedinManualData as any;
  const linkedinParsed = assessment.linkedinParsedData as any;
  const headline =
    linkedinManual?.headline ||
    linkedinParsed?.headline ||
    linkedinParsed?.profileBasics?.headline ||
    "";
  const headlineRole = typeof headline === "string" && headline.includes("|")
    ? headline.split("|")[0].trim()
    : headline;
  const fullName =
    resume?.contact?.fullName || resume?.personalInfo?.fullName || resume?.fullName || "";
  const firstName = getFirstName(fullName);
  const currentRole =
    resume?.currentRole?.title ||
    resume?.currentRole ||
    linkedinManual?.currentRole ||
    linkedinParsed?.experience?.[0]?.title ||
    headlineRole ||
    "your current role";
  const currentCompany =
    resume?.currentRole?.company ||
    resume?.currentCompany ||
    linkedinManual?.currentCompany ||
    linkedinParsed?.experience?.[0]?.company ||
    "your company";
  const targetRole = assessment.targetRoles?.[0]?.name || "your target role";
  const targetCompany = assessment.targetCompanies?.[0]?.name || "your target company";
  const readinessScore = assessment.totalScore ?? 0;

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0B1220] via-[#142244] to-[#0B1220] p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />
      <div className="relative z-10 space-y-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl">
            👋
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Career Command Center</p>
            <h1 className="text-4xl font-semibold text-white">
              Welcome back, {firstName}!
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Here is your AI-personalized journey from today to your next role.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Where you are</p>
            <p className="mt-3 text-lg font-semibold text-white">{currentRole}</p>
            <p className="text-sm text-[#06B6D4]">@ {currentCompany}</p>
          </div>
          <div className="rounded-2xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#1B1B3A] to-[#0B1220] p-5 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8B5CF6]/80">The journey</p>
            <div className="mt-4 text-4xl">→</div>
            <p className="mt-3 text-sm text-white/70">{assessment.timeline || "Timeline"} to land it</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Where you're going</p>
            <p className="mt-3 text-lg font-semibold text-white">{targetRole}</p>
            <p className="text-sm text-emerald-300">@ {targetCompany}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Overall readiness</p>
              <p className="mt-2 text-5xl font-semibold text-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text">
                {readinessScore}/100
              </p>
              <p className="mt-2 text-sm text-white/60">
                This score updates as you complete your Week 1 tasks.
              </p>
            </div>
            <div className="relative h-32 w-32">
              <svg className="h-32 w-32 -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="url(#heroGrad)"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 54}
                  strokeDashoffset={(2 * Math.PI * 54) * (1 - readinessScore / 100)}
                  style={{ transition: "stroke-dashoffset 0.8s ease" }}
                />
                <defs>
                  <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-sm text-white/60">
                <span className="text-lg font-semibold text-white">{readinessScore}</span>
                <span>Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
