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
const safeDatabaseUrl = hasValidProtocol ? databaseUrl : undefined;

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
