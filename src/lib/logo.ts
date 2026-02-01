const logoDevToken = process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY;

export const buildLogoCandidates = (domain?: string | null, name?: string | null, logoUrl?: string | null) => {
  const candidates: string[] = [];
  if (logoUrl) candidates.push(logoUrl);
  if (domain) {
    if (logoDevToken) {
      candidates.push(`https://img.logo.dev/${encodeURIComponent(domain)}?token=${logoDevToken}`);
    }
    candidates.push(`https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`);
    candidates.push(`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`);
  }
  if (!domain && name) {
    if (logoDevToken) {
      candidates.push(`https://img.logo.dev/name/${encodeURIComponent(name)}?token=${logoDevToken}`);
    }
    candidates.push(`https://www.google.com/s2/favicons?domain=${encodeURIComponent(name)}&sz=128`);
  }
  return candidates;
};

export const initialsSvg = (name: string) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "CO";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="100%" height="100%" rx="32" ry="32" fill="#0f172a"/><text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="22" fill="#e2e8f0">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
