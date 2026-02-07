"use client";

import { useMemo, useState } from "react";
import { buildLogoCandidates } from "@/lib/logo";

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
  const candidates = useMemo(() => buildLogoCandidates(domain, name), [domain, name]);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (failed || !candidates.length) {
    return (
      <div className="company-logo logo-fallback flex items-center justify-center text-[11px] font-semibold text-white/80">
        {initials}
      </div>
    );
  }

  const url = candidates[index];
  return (
    <img
      src={url}
      alt={`${name} logo`}
      className="company-logo object-contain"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => {
        if (index < candidates.length - 1) {
          setIndex((prev) => prev + 1);
          return;
        }
        setFailed(true);
      }}
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
