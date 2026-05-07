"use client";

interface ZariLogoProps {
  size?: number;
  className?: string;
}

export function ZariLogo({ size = 32, className = "" }: ZariLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-label="Zari"
      style={{ flexShrink: 0, display: "block" }}
    >
      {/* Background */}
      <rect width="40" height="40" rx="9" fill="url(#zariBg)" />

      {/* Top bar of Z — wide leaf fills upper portion */}
      <path d="M6,7.5 Q20,3.5 34,8 Q20,12.5 6,7.5 Z" fill="white" />
      {/* Bottom bar of Z — wide leaf fills lower portion */}
      <path d="M6,32 Q20,27.5 34,32 Q20,36.5 6,32 Z" fill="white" />
      {/* Diagonal stroke — thick for visibility at all sizes */}
      <line x1="32" y1="8" x2="8" y2="32" stroke="white" strokeWidth="5" strokeLinecap="round" />

      <defs>
        <linearGradient id="zariBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E72F0" />
          <stop offset="100%" stopColor="#1252C8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ZariWordmark({ height = 28, className = "" }: { height?: number; className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`} style={{ lineHeight: 1 }}>
      <ZariLogo size={height} />
      <span
        style={{
          fontSize: height * 0.72,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          background: "linear-gradient(135deg, #1459CC 0%, #1868E8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
        }}
      >
        Zari
      </span>
    </span>
  );
}
