import Link from "next/link";
import type { ReactNode } from "react";
import { ZariLogo } from "@/components/zari-logo";

export function MarketingSiteShell({
  authenticated,
  children,
  minimal = false,
}: {
  authenticated: boolean;
  children: ReactNode;
  minimal?: boolean;
}) {
  return (
    <div className="min-h-screen bg-white text-[var(--ink)]">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <ZariLogo size={26} />
            <span className="text-[17px] font-black tracking-[-0.04em] text-[#0A0A0F]">Zari</span>
          </Link>

          <div className="flex items-center gap-4 md:gap-7">
            {minimal ? null : (
              <>
                <Link href="/#features" className="hidden text-[14px] font-medium text-[#68738A] transition-colors hover:text-[#0A0A0F] md:inline-flex">
                  Features
                </Link>
                <Link href="/#reviews" className="hidden text-[14px] font-medium text-[#68738A] transition-colors hover:text-[#0A0A0F] md:inline-flex">
                  Reviews
                </Link>
              </>
            )}
            <Link href="/login" className="text-[14px] font-medium text-[#68738A] transition-colors hover:text-[#0A0A0F]">
              Sign in
            </Link>
            <Link
              href={authenticated ? "/dashboard" : "/signup"}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0A0A0F] px-4 py-2.5 text-[13.5px] font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-95 md:px-5"
            >
              {authenticated ? "Dashboard" : "Get started free"}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5">
                <path d="M3 8h10M9 5l3 3-3 3" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-slate-100 bg-white px-6 py-10 md:px-8">
        <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ZariLogo size={22} />
            <span className="text-[15px] font-extrabold text-[#0A0A0F]">Zari</span>
            <span className="ml-1 text-[12px] text-[#A0AABF]">© 2026 Askia Technologies</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[13.5px] text-[#68738A]">
            <Link href="/login" className="transition-colors hover:text-[#0A0A0F]">
              Sign in
            </Link>
            <Link href="/signup" className="transition-colors hover:text-[#0A0A0F]">
              Sign up
            </Link>
            {minimal ? null : (
              <>
                <Link href="/#features" className="transition-colors hover:text-[#0A0A0F]">
                  Features
                </Link>
                <Link href="/#reviews" className="transition-colors hover:text-[#0A0A0F]">
                  Reviews
                </Link>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
