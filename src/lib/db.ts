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

export const prisma = prismaClient;

// Legacy routes reference models removed from the schema (assessment, userSession,
// taskCompletion, appliedFix). Import legacyPrisma in those routes only — never use
// it in new code. This isolates the any-cast to its call sites.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const legacyPrisma = prismaClient as any;

export function isDatabaseReady() {
  return Boolean(safeDatabaseUrl);
}
