-- Ensure UUID generation is available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop legacy tables to align with new schema
DROP TABLE IF EXISTS "LeadCompany" CASCADE;
DROP TABLE IF EXISTS "Purchase" CASCADE;
DROP TABLE IF EXISTS "Event" CASCADE;
DROP TABLE IF EXISTS "AdminToken" CASCADE;
DROP TABLE IF EXISTS "Lead" CASCADE;
DROP TABLE IF EXISTS "Company" CASCADE;
DROP TABLE IF EXISTS "Role" CASCADE;
DROP TABLE IF EXISTS "UserSession" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "StripeWebhook" CASCADE;

-- Drop legacy enums
DROP TYPE IF EXISTS "LeadRoute";
DROP TYPE IF EXISTS "CompanySource";
DROP TYPE IF EXISTS "PurchaseStatus";

-- Create enums for new schema
CREATE TYPE "AiAnalysisStatus" AS ENUM ('pending', 'processing', 'complete', 'failed');
CREATE TYPE "RecommendedRoute" AS ENUM ('DIY', 'Guided', 'FastTrack');

-- Users
CREATE TABLE "User" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "firstName" TEXT,
  "lastName" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- User sessions
CREATE TABLE "UserSession" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "UserSession_tokenHash_key" ON "UserSession"("tokenHash");
CREATE INDEX "UserSession_userId_idx" ON "UserSession"("userId");
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Assessments
CREATE TABLE "Assessment" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "token" UUID NOT NULL DEFAULT gen_random_uuid(),
  "userId" UUID,
  "targetRoles" JSONB NOT NULL,
  "level" TEXT NOT NULL,
  "compTarget" TEXT NOT NULL,
  "timeline" TEXT NOT NULL,
  "locationPreference" TEXT NOT NULL,
  "locationCity" TEXT,
  "hoursPerWeek" INTEGER NOT NULL,
  "resumeStatus" TEXT NOT NULL,
  "linkedinStatus" TEXT NOT NULL,
  "portfolioStatus" BOOLEAN NOT NULL,
  "interviewReady" BOOLEAN NOT NULL,
  "resumeFileUrl" TEXT,
  "resumeFileName" TEXT,
  "resumeFileSize" INTEGER,
  "linkedinFileUrl" TEXT,
  "linkedinFileName" TEXT,
  "networkStrength" TEXT NOT NULL,
  "outreachComfort" TEXT NOT NULL,
  "targetCompanies" JSONB NOT NULL,
  "biggestBlocker" TEXT NOT NULL,
  "additionalContext" TEXT,
  "totalScore" INTEGER NOT NULL DEFAULT 0,
  "clarityScore" INTEGER NOT NULL DEFAULT 0,
  "assetsScore" INTEGER NOT NULL DEFAULT 0,
  "networkScore" INTEGER NOT NULL DEFAULT 0,
  "executionScore" INTEGER NOT NULL DEFAULT 0,
  "aiInsights" JSONB,
  "aiAnalysisStatus" "AiAnalysisStatus" NOT NULL DEFAULT 'pending',
  "aiProcessedAt" TIMESTAMP(3),
  "aiModel" TEXT,
  "recommendedRoute" "RecommendedRoute",
  "hasPurchasedPro" BOOLEAN NOT NULL DEFAULT false,
  "stripeSessionId" TEXT,
  "stripePaymentIntent" TEXT,
  "purchaseDate" TIMESTAMP(3),
  "purchaseAmount" INTEGER,
  "proPackData" JSONB,
  "welcomeEmailSent" BOOLEAN NOT NULL DEFAULT false,
  "resultsEmailSent" BOOLEAN NOT NULL DEFAULT false,
  "proPackEmailSent" BOOLEAN NOT NULL DEFAULT false,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "referralSource" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "completedAt" TIMESTAMP(3),
  CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Assessment_token_key" ON "Assessment"("token");
CREATE INDEX "Assessment_userId_idx" ON "Assessment"("userId");
CREATE INDEX "Assessment_aiAnalysisStatus_idx" ON "Assessment"("aiAnalysisStatus");
CREATE INDEX "Assessment_createdAt_idx" ON "Assessment"("createdAt");
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Roles
CREATE TABLE "Role" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "description" TEXT,
  "avgSalary" TEXT,
  "isPopular" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
CREATE UNIQUE INDEX "Role_slug_key" ON "Role"("slug");
CREATE INDEX "Role_isPopular_idx" ON "Role"("isPopular");
CREATE INDEX "Role_category_idx" ON "Role"("category");

-- Companies
CREATE TABLE "Company" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "logoUrl" TEXT,
  "website" TEXT,
  "category" TEXT NOT NULL,
  "employeeCount" TEXT,
  "headquarters" TEXT,
  "isPopular" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");
CREATE INDEX "Company_isPopular_idx" ON "Company"("isPopular");
CREATE INDEX "Company_category_idx" ON "Company"("category");

-- Stripe webhooks
CREATE TABLE "StripeWebhook" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "eventType" TEXT NOT NULL,
  "eventId" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "assessmentId" UUID,
  "processed" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "StripeWebhook_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "StripeWebhook_eventId_key" ON "StripeWebhook"("eventId");
CREATE INDEX "StripeWebhook_eventType_idx" ON "StripeWebhook"("eventType");
CREATE INDEX "StripeWebhook_processed_idx" ON "StripeWebhook"("processed");
