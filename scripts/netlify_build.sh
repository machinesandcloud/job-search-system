#!/usr/bin/env bash
set -euo pipefail

# Prefer unpooled Neon URL for migrations/seed to avoid pgbouncer issues.
if [[ -n "${NETLIFY_DATABASE_URL_UNPOOLED:-}" ]]; then
  DIRECT_URL="${NETLIFY_DATABASE_URL_UNPOOLED}"
elif [[ -n "${NETLIFY_DATABASE_URL:-}" ]]; then
  DIRECT_URL="${NETLIFY_DATABASE_URL/-pooler./.}"
else
  DIRECT_URL="${DIRECT_URL:-${DATABASE_URL:-}}"
fi

export DIRECT_URL
export DATABASE_URL="$DIRECT_URL"

# Download MaxMind GeoLite2-City database for accurate IP geolocation.
# Requires MAXMIND_LICENSE_KEY env var set in Netlify build environment.
# Without it, the app falls back to ipapi.co at runtime (less accurate).
if [[ -n "${MAXMIND_LICENSE_KEY:-}" ]]; then
  echo "Downloading GeoLite2-City database..."
  mkdir -p data
  curl -fsSL \
    "https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=${MAXMIND_LICENSE_KEY}&suffix=tar.gz" \
    -o /tmp/GeoLite2-City.tar.gz
  tar -xzf /tmp/GeoLite2-City.tar.gz -C /tmp
  mv /tmp/GeoLite2-City_*/GeoLite2-City.mmdb data/GeoLite2-City.mmdb
  echo "GeoLite2-City downloaded: $(du -sh data/GeoLite2-City.mmdb | cut -f1)"
else
  echo "ℹ️  MAXMIND_LICENSE_KEY not set — skipping GeoLite2 download (ipapi.co fallback active)"
fi

npm run prisma:generate

# Migrate and seed are best-effort — the DB may be suspended or unreachable
# on a cold Neon free-tier compute. The app falls back to the file-based
# MVP store so the build must not fail if the DB is temporarily unavailable.
npm run prisma:migrate || echo "⚠️  prisma migrate skipped (DB unreachable)"
npm run prisma:seed    || echo "⚠️  prisma seed skipped (DB unreachable)"

# Restore pooled URL for runtime build if available.
if [[ -n "${NETLIFY_DATABASE_URL:-}" ]]; then
  export DATABASE_URL="${NETLIFY_DATABASE_URL}"
fi

# Clear TypeScript incremental cache so tsc re-reads regenerated Prisma types.
# Without this, a cached .tsbuildinfo (from before a schema change) can make
# tsc report "property X does not exist" even though prisma generate just added it.
rm -rf .next/cache/tsbuildinfo/ 2>/dev/null || true

npm run typecheck
npm test
npm run build
