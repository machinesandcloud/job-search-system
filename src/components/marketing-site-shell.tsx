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
        <div className={`mx-auto flex max-w-[1380px] items-center justify-between px-6 md:px-8 ${minimal ? "py-6" : "py-5"}`}>
          <Link href="/" className={`no-underline ${minimal ? "flex items-center gap-3" : "flex items-center gap-3"}`}>
            <ZariLogo size={minimal ? 48 : 42} />
            <span className={`${minimal ? "text-[34px]" : "text-[30px]"} font-black tracking-[-0.045em] text-[#0A0A0F] leading-none`}>Zari</span>
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
            {minimal ? null : (
              <Link
                href={authenticated ? "/dashboard" : "/signup"}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0A0A0F] px-4 py-2.5 text-[13.5px] font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-95 md:px-5"
                style={primaryCtaStyle}
              >
                {authenticated ? "Dashboard" : "Get started free"}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5">
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
        <div style={{ maxWidth: 1380, margin: "0 auto", padding: "64px 40px 48px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40 }}>
          <div style={{ maxWidth: 480 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <ZariLogo size={52} />
              <span style={{ fontSize: 40, fontWeight: 900, color: "white", letterSpacing: "-0.045em", lineHeight: 1 }}>Zari</span>
            </div>
            <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.48)", lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
              AI career coaching that gets you hired — resume reviews, LinkedIn optimization, interview prep, and salary negotiation, all in one place.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
            <Link href="/login"  style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Sign in</Link>
            <Link href="/signup" style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Get started</Link>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ maxWidth: 1380, margin: "0 auto", padding: "20px 40px 28px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 28, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            <Link href="/terms"   style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Terms of Service</Link>
            <Link href="/privacy" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Privacy</Link>
          </div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© 2026 Askia Technologies. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
