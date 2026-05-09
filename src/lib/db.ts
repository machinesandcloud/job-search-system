import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const netlifyUrl = process.env.NETLIFY_DATABASE_URL;
if (netlifyUrl) {
  process.env.DATABASE_URL = netlifyUrl;
}

const databaseUrl = process.env.DATABASE_URL;
const hasValidProtocol =
  typeof databaseUrl === "string" &&
  (databaseUrl.startsWith("postgresql://") || databaseUrl.startsWith("postgres://"));

// Neon free-tier computes sleep after inactivity and can take 3-5s to wake.
// Inject connect_timeout=30 and pool_timeout=30 so Prisma waits long enough
// instead of failing immediately with a connection error.
function withTimeouts(url: string): string {
  try {
    const u = new URL(url);
    if (!u.searchParams.has("connect_timeout")) u.searchParams.set("connect_timeout", "30");
    if (!u.searchParams.has("pool_timeout")) u.searchParams.set("pool_timeout", "30");
    return u.toString();
  } catch {
    return url;
  }
}

const safeDatabaseUrl = hasValidProtocol ? withTimeouts(databaseUrl as string) : undefined;

const prismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    ...(safeDatabaseUrl ? { datasources: { db: { url: safeDatabaseUrl } } } : {}),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClient;

// Legacy routes still reference retired Prisma models from the old assessment product.
// Keep the runtime client intact, but export a loose type so the rebuilt MVP can deploy
// without rewriting every untouched legacy endpoint in the same change.
export const prisma = prismaClient as any;

export function isDatabaseReady() {
  return Boolean(safeDatabaseUrl);
}
