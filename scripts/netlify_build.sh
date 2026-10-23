#!/usr/bin/env bash
set -euo pipefail

# The temporary M&C acceptance page does not need database maintenance. Opting
# into this one build requires the exact reviewed commit, never a boolean flag.
# A malformed/stale selection fails before npm or any database command runs.
acceptance_build=false
if [[ -n "${MC_ACCEPTANCE_BUILD_COMMIT:-}" ]]; then
  if [[ ! "$MC_ACCEPTANCE_BUILD_COMMIT" =~ ^[a-f0-9]{40}$ ]] ||
     [[ "${COMMIT_REF:-}" != "$MC_ACCEPTANCE_BUILD_COMMIT" ]] ||
     [[ "$(git rev-parse HEAD)" != "$MC_ACCEPTANCE_BUILD_COMMIT" ]]; then
    echo "Acceptance build commit does not match the reviewed source." >&2
    exit 1
  fi
  # Pinned from the currently published 421f1c2 source: complete Prisma tree
  # (schema, all migrations, seed files) and both imported seed-data modules.
  for entry in \
    'prisma:3f02c968b97dd532e3b280f499968c126ee5ab80' \
    'src/lib/roles.ts:7e72fab939a07a2910830a420fe1006b5e5eff0b' \
    'src/lib/company-data.ts:5aca932e4408af464d3928f650499901c4895aa2'; do
    protected_path="${entry%:*}"
    expected_object="${entry##*:}"
    if [[ "$(git rev-parse "$MC_ACCEPTANCE_BUILD_COMMIT:$protected_path")" != "$expected_object" ]]; then
      echo "Acceptance build changed a protected database input." >&2
      exit 1
    fi
  done
  acceptance_build=true
fi

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
if [[ "$acceptance_build" == true ]]; then
  echo "Acceptance-only build: database migrations and seed are intentionally skipped."
else
  npm run prisma:migrate || echo "⚠️  prisma migrate skipped (DB unreachable)"
  npm run prisma:seed    || echo "⚠️  prisma seed skipped (DB unreachable)"
fi

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
