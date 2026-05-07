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
      {/* Soft inner glow ring */}
      <ellipse cx="20" cy="20" rx="19" ry="14" fill="#2278FF" opacity="0.35" />

      {/* Top leaf — top bar of Z */}
      <path d="M7,8 Q20,5 31,9 Q20,13 7,8 Z" fill="white" opacity="0.92" />
      {/* Bottom leaf — bottom bar of Z */}
      <path d="M7,30 Q20,27 31,32 Q20,35 7,30 Z" fill="white" opacity="0.92" />
      {/* Diagonal stem */}
      <line x1="30" y1="9" x2="8" y2="31" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      {/* Sprout dot at top-right */}
      <circle cx="30" cy="9" r="2.2" fill="white" />
      {/* Ground bar */}
      <rect x="10" y="36" width="20" height="1.5" rx="0.75" fill="white" opacity="0.3" />

      <defs>
        <linearGradient id="zariBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A6AE8" />
          <stop offset="100%" stopColor="#1459CC" />
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
