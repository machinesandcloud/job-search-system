"use client";

export function ScoreGauge({ score }: { score: number }) {
  const rotation = Math.min(180, Math.max(0, score * 1.8));
  return (
    <div className="relative flex h-28 w-56 items-end justify-center">
      <div className="absolute inset-0 overflow-hidden rounded-t-full border border-slate-200 bg-white">
        <div
          className="absolute bottom-0 left-0 h-full w-full origin-bottom rounded-t-full bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>
      <div className="relative z-10 mb-2 text-center">
        <p className="text-2xl font-semibold text-slate-900">{score}</p>
        <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
      </div>
    </div>
  );
}
