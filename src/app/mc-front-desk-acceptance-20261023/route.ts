import { acceptanceResponse } from "@/lib/mc-acceptance";

// A raw Route Handler deliberately avoids the root layout and its analytics.
export const dynamic = "force-dynamic";

export function GET(request: Request): Response {
  return acceptanceResponse(request.url);
}
