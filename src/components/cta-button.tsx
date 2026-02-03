"use client";

import { useState } from "react";

type CTAButtonProps = {
  href: string;
  label: string;
  ariaLabel: string;
  dataCta?: string;
  className?: string;
};

export function CTAButton({ href, label, ariaLabel, dataCta, className }: CTAButtonProps) {
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    if (loading) return;
    setLoading(true);
    window.location.href = href;
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      data-cta={dataCta}
      className={`${className || ""} ${loading ? "is-loading" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
