// MaxMind GeoLite2 web service — same database as the downloadable mmdb,
// no file bundling required. Requires MAXMIND_ACCOUNT_ID + MAXMIND_LICENSE_KEY
// runtime env vars. Falls back gracefully when not configured.
// Free tier: 1,000 lookups/day. https://dev.maxmind.com/geoip/geolite2-free-geolocation-data

export type GeoResult = {
  city?:     string | null;
  region?:   string | null;
  country?:  string | null;
  timezone?: string | null;
};

const PRIVATE_IP = /^(127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|::1$|fc|fd)/i;

type MaxMindResponse = {
  city?:         { names?: { en?: string } };
  subdivisions?: Array<{ iso_code?: string; names?: { en?: string } }>;
  country?:      { iso_code?: string };
  location?:     { time_zone?: string };
};

export async function lookupCity(ip: string): Promise<GeoResult | null> {
  if (PRIVATE_IP.test(ip)) return null;

  const accountId  = process.env.MAXMIND_ACCOUNT_ID;
  const licenseKey = process.env.MAXMIND_LICENSE_KEY;
  if (!accountId || !licenseKey) return null;

  try {
    const auth = Buffer.from(`${accountId}:${licenseKey}`).toString("base64");
    const res = await fetch(`https://geolite.info/geoip/v2.1/city/${ip}`, {
      headers: { Authorization: `Basic ${auth}`, Accept: "application/json" },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;

    const r = await res.json() as MaxMindResponse;
    return {
      city:     r.city?.names?.en ?? null,
      region:   r.subdivisions?.[0]?.iso_code ?? r.subdivisions?.[0]?.names?.en ?? null,
      country:  r.country?.iso_code ?? null,
      timezone: r.location?.time_zone ?? null,
    };
  } catch {
    return null;
  }
}
