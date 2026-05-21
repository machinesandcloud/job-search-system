import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
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
  const primaryCtaStyle: CSSProperties = {
    background: "#0A0A0F",
    color: "#FFFFFF",
    boxShadow: "0 4px 20px rgba(10,10,20,0.12)",
  };

  return (
    <div className="min-h-screen bg-white text-[var(--ink)]">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className={`mx-auto flex max-w-[1380px] items-center justify-between px-5 md:px-8 ${minimal ? "py-5" : "py-4 md:py-5"}`}>
          <Link href="/" className="flex items-center gap-2 no-underline md:gap-3">
            <ZariLogo size={minimal ? 40 : 36} />
            <span className={`${minimal ? "text-[28px] md:text-[34px]" : "text-[24px] md:text-[30px]"} font-black tracking-[-0.045em] text-[#0A0A0F] leading-none`}>Zari</span>
          </Link>

          <div className="flex items-center gap-3 md:gap-7">
            {minimal ? null : (
              <>
                <Link href="/#features" className="text-[13px] font-medium text-[#68738A] transition-colors hover:text-[#0A0A0F] md:text-[14px]">
                  Features
                </Link>
                <Link href="/#reviews" className="hidden text-[13px] font-medium text-[#68738A] transition-colors hover:text-[#0A0A0F] sm:inline-flex md:text-[14px]">
                  Reviews
                </Link>
              </>
            )}
            <Link href="/login" className="text-[13px] font-medium text-[#68738A] transition-colors hover:text-[#0A0A0F] md:text-[14px]">
              Sign in
            </Link>
            {minimal ? null : (
              <Link
                href={authenticated ? "/dashboard" : "/signup"}
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-3 text-[12px] font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-95 md:gap-2 md:px-5 md:py-2.5 md:text-[13.5px]"
                style={primaryCtaStyle}
              >
                <span className="hidden sm:inline">{authenticated ? "Dashboard" : "Get started free"}</span>
                <span className="sm:hidden">{authenticated ? "Dashboard" : "Start free"}</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3 w-3 md:h-3.5 md:w-3.5">
                  <path d="M3 8h10M9 5l3 3-3 3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </header>

      {children}

      <footer style={{ background: "linear-gradient(180deg, #060810 0%, #0C1022 100%)" }}>
        {/* Main footer body */}
        <div className="mx-auto flex flex-wrap items-start justify-between gap-6 px-5 pb-12 pt-12 md:gap-10 md:px-10 md:pb-12 md:pt-16" style={{ maxWidth: 1380 }}>
          <div style={{ maxWidth: 480 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <ZariLogo size={40} />
              <span style={{ fontSize: 32, fontWeight: 900, color: "white", letterSpacing: "-0.045em", lineHeight: 1 }}>Zari</span>
            </div>
            <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.48)", lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
              AI career coaching that gets you hired — resume reviews, LinkedIn optimization, interview prep, and salary negotiation, all in one place.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 20 }}>
            <Link href="/login"  style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Sign in</Link>
            <Link href="/signup" style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Get started</Link>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] px-5 py-5 md:px-10" style={{ maxWidth: 1380 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            <Link href="/terms"    style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Terms of Service</Link>
            <Link href="/privacy"  style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Privacy</Link>
            <Link href="/security" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Security</Link>
          </div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© 2026 Zari. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
