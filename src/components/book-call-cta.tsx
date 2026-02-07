"use client";

import Link from "next/link";

const fallbackUrl = "/job-search-system/coaching-apply";

export function BookCallCTA({ className = "" }: { className?: string }) {
  const href = process.env.NEXT_PUBLIC_BOOK_CALL_URL || fallbackUrl;

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Link
        href={href}
        className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_rgba(8,145,178,0.35)] transition hover:scale-[1.02]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-base">📞</span>
        Book a call
      </Link>
    </div>
  );
}
