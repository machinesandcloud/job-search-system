"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AccountGate } from "@/components/account-gate";
import { AIAnalysisScreen } from "@/components/premium/ai-analysis-screen";

type PreviewData = {
  assessmentId: string;
  assessment: any;
};

const STATUS_LABELS = [
  { min: 0, label: "Foundation Phase" },
  { min: 45, label: "Growth Ready" },
  { min: 70, label: "Fast Track" },
];

export default function PreviewClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [data, setData] = useState<PreviewData | null>(null);
  const [loadingPhase, setLoadingPhase] = useState(true);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!token) return;
    let active = true;
    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/results/${token}`, { cache: "no-store" });
        const payload = await res.json();
        if (!active) return false;
        setData(payload);
      } catch (_err) {
        // ignore
      }
      return false;
    };

    fetchResults();

    return () => {
      active = false;
    };
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingPhase(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!data || loadingPhase) return;
    const target = data.assessment?.totalScore || 0;
    let current = 0;
    const duration = 1200;
    const step = Math.max(1, Math.round(target / (duration / 16)));
    const tick = () => {
      current += step;
      if (current >= target) {
        setDisplayScore(target);
        return;
      }
      setDisplayScore(current);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [data, loadingPhase]);

  const score = data?.assessment?.totalScore || 0;
  const statusLabel = useMemo(() => {
    const match = STATUS_LABELS.filter((item) => score >= item.min).pop();
    return match?.label || "Growth Ready";
  }, [score]);

  const insights = data?.assessment?.aiInsights || {};
  const actionPlan = data?.assessment?.actionPlan || null;
  const week1 = data?.assessment?.week1Plan?.week1?.tasks || actionPlan?.week1?.tasks || [];

  const ring = 240;
  const radius = ring / 2 - 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * score) / 100;

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, index) => ({
        id: index,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 5,
        duration: 18 + Math.random() * 10,
      })),
    []
  );

  if (!token) {
    return (
      <main className="min-h-screen bg-[#0A0E27] px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold">Preview unavailable</h1>
          <p className="mt-3 text-white/70">Return to the assessment to generate a preview.</p>
          <Link href="/job-search-system/start" className="mt-6 inline-flex rounded-full bg-white/10 px-6 py-3 text-sm">
            Back to assessment
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0E27] px-6 pb-24 pt-12 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <Link href="/job-search-system" className="text-sm text-white/50">
          Back to landing
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0B1220] p-8">
            <div className="absolute inset-0 opacity-50">
              {particles.map((dot) => (
                <span
                  key={dot.id}
                  className="absolute rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]"
                  style={{
                    top: `${dot.top}%`,
                    left: `${dot.left}%`,
                    width: `${dot.size}px`,
                    height: `${dot.size}px`,
                    opacity: 0.4,
                    animation: `float ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
                  }}
                />
              ))}
            </div>

            {loadingPhase || !data ? (
              <div className="relative z-10">
                <AIAnalysisScreen />
              </div>
            ) : (
              <div className="relative z-10">
                <div className="flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <svg width={ring} height={ring}>
                      <circle
                        cx={ring / 2}
                        cy={ring / 2}
                        r={radius}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="16"
                        fill="none"
                      />
                      <circle
                        cx={ring / 2}
                        cy={ring / 2}
                        r={radius}
                        stroke="url(#grad)"
                        strokeWidth="16"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.22,1,0.36,1)" }}
                      />
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06B6D4" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-6xl font-black text-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text">
                        {displayScore}
                      </span>
                      <span className="text-xl text-white/60">/100</span>
                    </div>
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#06B6D4]">Career Readiness</p>
                  <div className="mt-3 h-[2px] w-20 bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]" />
                  <span className="mt-4 rounded-full border border-[#06B6D4]/50 bg-[#06B6D4]/15 px-6 py-2 text-base font-semibold text-white">
                    {statusLabel}
                  </span>
                </div>

                <div className="mt-10 grid gap-5">
                  <div className="rounded-2xl border border-[#06B6D4]/40 bg-[#0F172A]/60 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">Your Primary Gap</p>
                    <p className="mt-3 text-base text-white/90">{insights.primaryGap || "Your profile is being analyzed."}</p>
                  </div>
                  <div className="rounded-2xl border border-[#8B5CF6]/40 bg-[#0F172A]/60 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">Quick Win This Week</p>
                    <p className="mt-3 text-base text-white/90">{insights.quickWin || "We’ll surface your fastest win next."}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#0F172A]/60 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Week 1 cadence</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/80">
                      {week1.slice(0, 3).map((item: any) => (
                        <li key={item.id || item.task}>
                          <span className="text-[#06B6D4]">-</span> {item.task || item}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => router.push(`/job-search-system/results/${token}`)}
                      className="mt-4 text-sm font-semibold text-[#06B6D4]"
                    >
                      View full 14-day plan →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          <aside className="sticky top-28 h-fit">
            <AccountGate assessmentId={data?.assessmentId || ""} onSuccess={() => router.push(`/job-search-system/results/${token}`)} />
          </aside>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(0px); }
        }
        @keyframes progress {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-progress {
          animation: progress 3s ease-in-out forwards;
        }
      `}</style>
    </main>
  );
}
