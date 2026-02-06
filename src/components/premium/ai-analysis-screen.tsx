"use client";

import { useEffect, useState } from "react";

const STAGES = [
  {
    title: "Analyzing your resume",
    detail: "Extracting skills, impact metrics, and recent wins.",
  },
  {
    title: "Parsing LinkedIn signal",
    detail: "Mapping headline, About, and role keywords.",
  },
  {
    title: "Researching job market",
    detail: "Scanning current postings for required skills.",
  },
  {
    title: "Benchmarking compensation",
    detail: "Estimating market bands for your target level.",
  },
  {
    title: "Generating Week 1 plan",
    detail: "Building your personalized 7-day execution plan.",
  },
  {
    title: "Finalizing dashboard",
    detail: "Packaging insights, tasks, and company strategy.",
  },
];

export function AIAnalysisScreen({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timers: number[] = [];
    STAGES.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setStage(index);
          setProgress(Math.min(100, 10 + index * 18));
        }, 800 + index * 1400)
      );
    });
    timers.push(
      window.setTimeout(() => {
        setProgress(100);
        if (onComplete) onComplete();
      }, 9400)
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [onComplete]);

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-[#0B1220] p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_50%)]" />
      <div className="relative z-10 space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl">
            🤖
          </div>
          <h2 className="text-3xl font-semibold text-white">AI is generating your command center</h2>
          <p className="mt-2 text-white/70">
            Stay on this page while we tailor every section to your data.
          </p>
        </div>

        <div className="space-y-3">
          {STAGES.map((stageItem, index) => {
            const isActive = index === stage;
            const isDone = index < stage;
            return (
              <div
                key={stageItem.title}
                className={`flex items-start gap-4 rounded-2xl border px-4 py-3 transition ${
                  isActive
                    ? "border-[#06B6D4]/60 bg-[#06B6D4]/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div
                  className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                    isDone ? "bg-emerald-500/20 text-emerald-200" : "bg-white/10 text-white/60"
                  }`}
                >
                  {isDone ? "✓" : index + 1}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isActive ? "text-white" : "text-white/70"}`}>
                    {stageItem.title}
                  </p>
                  <p className="text-xs text-white/50">{stageItem.detail}</p>
                </div>
                {isActive && (
                  <div className="ml-auto h-2 w-16 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-full animate-progress bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#06B6D4] via-[#8B5CF6] to-[#EC4899] transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
