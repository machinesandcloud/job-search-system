"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function NpsContent() {
  const searchParams = useSearchParams();
  const scoreParam = searchParams.get("score");
  const email = searchParams.get("email") ?? "";
  const step = searchParams.get("step");

  const [score, setScore] = useState<number | null>(scoreParam !== null ? parseInt(scoreParam) : null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Auto-submit if score came from email link (skip manual selection)
  const hasPreselectedScore = scoreParam !== null && step === "comment";

  async function submit() {
    if (score === null) return;
    setSubmitting(true);
    try {
      await fetch("/api/nps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, comment, email }),
      });
      setSubmitted(true);
    } catch {
      setSubmitting(false);
    }
  }

  const scoreLabel = score === null ? "" : score >= 9 ? "😍 Extremely likely" : score >= 7 ? "🙂 Somewhat likely" : "😕 Not very likely";

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
          🙏
        </div>
        <h1 className="text-xl font-bold text-slate-900">Thank you for your feedback!</h1>
        <p className="mt-2 text-sm text-slate-500">
          It genuinely helps us make Zari better.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
        >
          Back to Zari
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 text-center">
        How likely are you to recommend Zari?
      </h1>
      <p className="mt-1 text-sm text-slate-500 text-center">0 = not at all likely · 10 = extremely likely</p>

      {/* Score selector */}
      <div className="mt-6 flex justify-center gap-1.5 flex-wrap">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            onClick={() => setScore(i)}
            className={`h-10 w-10 rounded-lg text-sm font-semibold transition-all ${
              score === i
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      {score !== null && (
        <p className="mt-2 text-center text-sm text-slate-500">{scoreLabel}</p>
      )}

      {/* Comment */}
      {(hasPreselectedScore || score !== null) && (
        <div className="mt-5">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            What&apos;s the main reason for your score? <span className="text-slate-400">(optional)</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Tell us what's working or what could be better..."
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          />
        </div>
      )}

      <button
        onClick={submit}
        disabled={score === null || submitting}
        className="mt-4 w-full rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Submit feedback"}
      </button>
    </div>
  );
}

export default function NpsPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#F4F7FF_0%,#F8FAFC_38%,#EEF2FF_100%)] text-slate-900 flex flex-col">
      <header className="flex items-center px-8 py-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span className="text-[18px] font-black tracking-[-0.04em] text-[#0A0A0F]">Zari</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <Suspense fallback={<div className="h-40 animate-pulse rounded-lg bg-slate-100" />}>
            <NpsContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
