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

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    ...(safeDatabaseUrl ? { datasources: { db: { url: safeDatabaseUrl } } } : {}),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export function isDatabaseReady() {
  return Boolean(safeDatabaseUrl);
}
