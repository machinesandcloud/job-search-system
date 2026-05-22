import path from "path";
import type { CityResponse, Reader } from "maxmind";

const DB_PATH = path.join(process.cwd(), "data", "GeoLite2-City.mmdb");

// Singleton — loaded once per cold start, reused across warm invocations.
let _promise: Promise<Reader<CityResponse> | null> | null = null;

async function getReader(): Promise<Reader<CityResponse> | null> {
  if (_promise) return _promise;
  _promise = (async () => {
    try {
      const { default: maxmind } = await import("maxmind");
      return await maxmind.open<CityResponse>(DB_PATH);
    } catch {
      return null;
    }
  })();
  return _promise;
}

export type GeoResult = {
  city?:     string | null;
  region?:   string | null;
  country?:  string | null;
  timezone?: string | null;
};

const PRIVATE_IP = /^(127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|::1$|fc|fd)/i;

export async function lookupCity(ip: string): Promise<GeoResult | null> {
  if (PRIVATE_IP.test(ip)) return null;
  const reader = await getReader();
  if (!reader) return null;
  try {
    const r = reader.get(ip);
    if (!r) return null;
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
