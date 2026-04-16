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
      aria-label="Zari AI Coach"
    >
      {/* Background rounded rect */}
      <rect width="40" height="40" rx="11" fill="url(#zariBg)" />

      {/* Subtle inner glow overlay */}
      <rect width="40" height="40" rx="11" fill="url(#zariInnerGlow)" opacity="0.6" />

      {/* Z letterform — diagonal slash */}
      <path
        d="M11 13h18L11 27h18"
        stroke="url(#zariStroke)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Neural connection dots at Z endpoints */}
      <circle cx="11" cy="13" r="2.4" fill="#22D3EE" opacity="0.95" />
      <circle cx="29" cy="13" r="2.4" fill="#A78BFA" opacity="0.90" />
      <circle cx="11" cy="27" r="2.4" fill="#A78BFA" opacity="0.90" />
      <circle cx="29" cy="27" r="2.4" fill="#22D3EE" opacity="0.95" />

      {/* Tiny center spark */}
      <circle cx="20" cy="20" r="1.2" fill="white" opacity="0.4" />

      <defs>
        <linearGradient id="zariBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2D0B6B" />
          <stop offset="100%" stopColor="#0A0A1C" />
        </linearGradient>
        <radialGradient id="zariInnerGlow" cx="50%" cy="40%" r="55%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="zariStroke" x1="11" y1="13" x2="29" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="50%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* Wordmark variant for the nav */
export function ZariWordmark({ height = 28, className = "" }: { height?: number; className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <ZariLogo size={height} />
      <span
        style={{
          fontSize: height * 0.6,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #A78BFA 0%, #22D3EE 100%)",
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
