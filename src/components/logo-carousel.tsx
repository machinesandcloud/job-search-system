"use client";

import { useState } from "react";

type LogoCompany = {
  name: string;
  domain?: string;
};

function LogoBadge({
  name,
  domain,
}: {
  name: string;
  domain?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (!domain || failed) {
    return (
      <div className="company-logo flex items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-white/70">
        {initials}
      </div>
    );
  }

  const url = `https://logo.clearbit.com/${domain}`;
  return (
    <img
      src={`${url}?size=96`}
      alt={`${name} logo`}
      className="company-logo object-contain"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

export function LogoCarousel({ companies }: { companies: LogoCompany[] }) {
  const items = companies.concat(companies);
  return (
    <div className="logo-carousel">
      <div className="logo-track">
        {items.map((company, index) => (
          <LogoBadge key={`${company.name}-${index}`} name={company.name} domain={company.domain} />
        ))}
      </div>
    </div>
  );
}
