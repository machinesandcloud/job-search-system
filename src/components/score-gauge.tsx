"use client";

export function ScoreGauge({ score }: { score: number }) {
  const rotation = Math.min(180, Math.max(0, score * 1.8));
  return (
    <div className="relative flex h-28 w-56 items-end justify-center">
      <div className="absolute inset-0 overflow-hidden rounded-t-full border border-slate-700 bg-slate-950/60">
        <div
          className="absolute bottom-0 left-0 h-full w-full origin-bottom rounded-t-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>
      <div className="relative z-10 mb-2 text-center">
        <p className="text-2xl font-semibold text-slate-100">{score}</p>
        <p className="text-xs uppercase tracking-wide text-slate-400">Score</p>
      </div>
    </div>
  );
}
