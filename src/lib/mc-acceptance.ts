// Temporary, owner-controlled acceptance page. No coaching account or customer data.
export const acceptancePath = "/mc-front-desk-acceptance-20261023";
export const acceptancePhase = "hosted-onboarding-zaricoach-20261023-v1";
export const acceptanceExpiresAt = "2026-10-24T23:59:59Z";
export const acceptancePlatform = "https://machinesandcloud.com";

export const acceptanceHeaders = [
  { key: "Content-Type", value: "text/html; charset=utf-8" },
  { key: "Cache-Control", value: "private, no-store, max-age=0" },
  { key: "X-Robots-Tag", value: "noindex, nofollow, nosnippet, noarchive" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'none'",
      `script-src ${acceptancePlatform}`,
      "style-src 'unsafe-inline'",
      `connect-src ${acceptancePlatform}`,
      "img-src 'none'",
      "font-src 'none'",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'none'",
      "form-action 'none'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

export function acceptanceResponse(url: string, now = Date.now(), configuredClient = process.env.MC_ACCEPTANCE_CLIENT_SLUG): Response {
  const params = new URL(url).searchParams;
  const slug = params.get("client") || "";
  const expired = now >= Date.parse(acceptanceExpiresAt);
  const valid = !expired
    && params.size === 2
    && params.getAll("client").length === 1
    && params.getAll("phase").length === 1
    && params.get("phase") === acceptancePhase
    && /^mc-acceptance-zari-[a-f0-9]{4}$/.test(slug)
    && slug === configuredClient;
  const heading = expired ? "This acceptance page has ended." : valid
    ? "Machines & Cloud installation check" : "This check is not configured.";
  const description = expired
    ? "The temporary chat installation has expired. Return to Machines & Cloud for the saved result."
    : valid
      ? "Internal acceptance only. Use synthetic customer details. This page checks the installed front desk; it does not contact the coaching team."
      : "Open the exact website-check address from the controlled Machines & Cloud workspace.";
  // The validated slug is public. Never put owner sessions or sign-in tokens here.
  const embed = valid
    ? `<script src="${acceptancePlatform}/embed.js" data-client="${slug}" async></script>` : "";
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,nosnippet,noarchive"><title>Internal installation check</title><style>html{font:16px/1.6 system-ui,sans-serif;color:#182940;background:#f5f7fb}body{margin:0;padding:8vh 24px}main{max-width:640px;margin:auto;padding:32px;border:1px solid #d7dfec;border-radius:20px;background:white}h1{font-size:clamp(1.5rem,4vw,2rem);line-height:1.2}p{color:#52637a}small{color:#52637a}</style></head><body><main><small>INTERNAL ACCEPTANCE · ZARI COACH</small><h1>${heading}</h1><p>${description}</p><p>No real coaching inquiry should be entered here.</p></main>${embed}</body></html>`, {
    status: expired ? 410 : valid ? 200 : 400,
    headers: Object.fromEntries(acceptanceHeaders.map(({ key, value }) => [key, value])),
  });
}
