#!/usr/bin/env bash
# Netlify ignore script — runs before every build.
# Exit 0 = SKIP this build.
# Exit 1 = PROCEED with this build.
#
# Goal: production (main) builds only proceed when triggered by the
# "GitHub CI" deploy hook — meaning GitHub Actions already ran and passed
# typecheck + unit tests + build. Direct git-push triggers are cancelled.

# Non-production contexts (deploy previews, branch deploys) always build.
if [[ "${CONTEXT:-}" != "production" ]]; then
  echo "[ci-gate] Non-production context (${CONTEXT:-unknown}) — proceeding."
  exit 1
fi

# Production: only allow the deploy hook we control from GitHub Actions.
if [[ "${INCOMING_HOOK_TITLE:-}" == "GitHub CI" ]]; then
  echo "[ci-gate] Triggered by GitHub CI deploy hook — proceeding."
  exit 1
fi

# Anything else (direct git push, Netlify dashboard "Trigger deploy", etc.)
echo "[ci-gate] ⛔  Blocked: production deploys must go through GitHub Actions CI."
echo "          Push your code — GitHub Actions will run tests then trigger this hook."
echo "          CONTEXT=${CONTEXT:-} | INCOMING_HOOK_TITLE=${INCOMING_HOOK_TITLE:-}"
exit 0
