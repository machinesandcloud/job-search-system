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

npm run build
