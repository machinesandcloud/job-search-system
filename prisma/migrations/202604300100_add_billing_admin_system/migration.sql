-- Billing + coach admin system

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'UserRole') THEN
    CREATE TYPE "UserRole" AS ENUM ('member', 'admin', 'support');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'AccountStatus') THEN
    CREATE TYPE "AccountStatus" AS ENUM ('incomplete', 'active', 'trialing', 'past_due', 'unpaid', 'canceled', 'incomplete_expired');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'SubscriptionStatus') THEN
    CREATE TYPE "SubscriptionStatus" AS ENUM ('incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'unpaid', 'canceled', 'paused');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'SupportTicketCategory') THEN
    CREATE TYPE "SupportTicketCategory" AS ENUM ('billing', 'technical', 'product', 'account', 'other');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'SupportTicketPriority') THEN
    CREATE TYPE "SupportTicketPriority" AS ENUM ('low', 'medium', 'high', 'urgent');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'SupportTicketStatus') THEN
    CREATE TYPE "SupportTicketStatus" AS ENUM ('open', 'in_progress', 'resolved', 'closed');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'StripeEventProcessingStatus') THEN
    CREATE TYPE "StripeEventProcessingStatus" AS ENUM ('pending', 'processed', 'failed', 'skipped');
  END IF;
END $$;

ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "externalAuthId" TEXT,
  ADD COLUMN IF NOT EXISTS "role" "UserRole" NOT NULL DEFAULT 'member',
  ADD COLUMN IF NOT EXISTS "accountId" UUID;

CREATE UNIQUE INDEX IF NOT EXISTS "User_externalAuthId_key" ON "User"("externalAuthId");
CREATE INDEX IF NOT EXISTS "User_accountId_idx" ON "User"("accountId");

CREATE TABLE IF NOT EXISTS "Account" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "ownerUserId" UUID NOT NULL,
  "status" "AccountStatus" NOT NULL DEFAULT 'incomplete',
  "paymentIssue" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Subscription" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "accountId" UUID NOT NULL,
  "stripeCustomerId" TEXT NOT NULL,
  "stripeSubscriptionId" TEXT NOT NULL,
  "stripePriceId" TEXT,
  "planName" TEXT,
  "status" "SubscriptionStatus" NOT NULL DEFAULT 'incomplete',
  "currentPeriodStart" TIMESTAMP(3),
  "currentPeriodEnd" TIMESTAMP(3),
  "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
  "canceledAt" TIMESTAMP(3),
  "trialEnd" TIMESTAMP(3),
  "paymentIssue" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SupportTicket" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "accountId" UUID NOT NULL,
  "userId" UUID,
  "subject" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" "SupportTicketCategory" NOT NULL DEFAULT 'other',
  "priority" "SupportTicketPriority" NOT NULL DEFAULT 'medium',
  "status" "SupportTicketStatus" NOT NULL DEFAULT 'open',
  "assignedToId" UUID,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "resolvedAt" TIMESTAMP(3),
  CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "AppEvent" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "accountId" UUID,
  "userId" UUID,
  "eventName" TEXT NOT NULL,
  "metadataJson" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AppEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "AdminNote" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "accountId" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "supportTicketId" UUID,
  "note" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AdminNote_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "StripeEvent" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "stripeEventId" TEXT NOT NULL,
  "eventType" TEXT NOT NULL,
  "status" "StripeEventProcessingStatus" NOT NULL DEFAULT 'pending',
  "accountId" UUID,
  "payload" JSONB NOT NULL,
  "errorMessage" TEXT,
  "processedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "StripeEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "AiTokenUsage" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "accountId" UUID,
  "userId" UUID,
  "provider" TEXT NOT NULL DEFAULT 'openai',
  "model" TEXT NOT NULL,
  "featureName" TEXT,
  "inputTokens" INTEGER NOT NULL DEFAULT 0,
  "outputTokens" INTEGER NOT NULL DEFAULT 0,
  "totalTokens" INTEGER NOT NULL DEFAULT 0,
  "metadataJson" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AiTokenUsage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Subscription_accountId_key" ON "Subscription"("accountId");
CREATE UNIQUE INDEX IF NOT EXISTS "Subscription_stripeCustomerId_key" ON "Subscription"("stripeCustomerId");
CREATE UNIQUE INDEX IF NOT EXISTS "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");
CREATE INDEX IF NOT EXISTS "Subscription_status_idx" ON "Subscription"("status");
CREATE INDEX IF NOT EXISTS "Subscription_currentPeriodEnd_idx" ON "Subscription"("currentPeriodEnd");

CREATE INDEX IF NOT EXISTS "Account_ownerUserId_idx" ON "Account"("ownerUserId");
CREATE INDEX IF NOT EXISTS "Account_status_idx" ON "Account"("status");

CREATE INDEX IF NOT EXISTS "SupportTicket_accountId_createdAt_idx" ON "SupportTicket"("accountId", "createdAt");
CREATE INDEX IF NOT EXISTS "SupportTicket_status_priority_idx" ON "SupportTicket"("status", "priority");
CREATE INDEX IF NOT EXISTS "SupportTicket_assignedToId_idx" ON "SupportTicket"("assignedToId");

CREATE INDEX IF NOT EXISTS "AppEvent_accountId_createdAt_idx" ON "AppEvent"("accountId", "createdAt");
CREATE INDEX IF NOT EXISTS "AppEvent_eventName_createdAt_idx" ON "AppEvent"("eventName", "createdAt");

CREATE INDEX IF NOT EXISTS "AdminNote_accountId_createdAt_idx" ON "AdminNote"("accountId", "createdAt");
CREATE INDEX IF NOT EXISTS "AdminNote_supportTicketId_createdAt_idx" ON "AdminNote"("supportTicketId", "createdAt");

CREATE UNIQUE INDEX IF NOT EXISTS "StripeEvent_stripeEventId_key" ON "StripeEvent"("stripeEventId");
CREATE INDEX IF NOT EXISTS "StripeEvent_eventType_createdAt_idx" ON "StripeEvent"("eventType", "createdAt");
CREATE INDEX IF NOT EXISTS "StripeEvent_status_createdAt_idx" ON "StripeEvent"("status", "createdAt");
CREATE INDEX IF NOT EXISTS "AiTokenUsage_accountId_createdAt_idx" ON "AiTokenUsage"("accountId", "createdAt");
CREATE INDEX IF NOT EXISTS "AiTokenUsage_userId_createdAt_idx" ON "AiTokenUsage"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "AiTokenUsage_model_createdAt_idx" ON "AiTokenUsage"("model", "createdAt");

DO $$
BEGIN
  BEGIN
    ALTER TABLE "User"
      ADD CONSTRAINT "User_accountId_fkey"
      FOREIGN KEY ("accountId") REFERENCES "Account"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "Account"
      ADD CONSTRAINT "Account_ownerUserId_fkey"
      FOREIGN KEY ("ownerUserId") REFERENCES "User"("id")
      ON DELETE RESTRICT ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "Subscription"
      ADD CONSTRAINT "Subscription_accountId_fkey"
      FOREIGN KEY ("accountId") REFERENCES "Account"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "SupportTicket"
      ADD CONSTRAINT "SupportTicket_accountId_fkey"
      FOREIGN KEY ("accountId") REFERENCES "Account"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "SupportTicket"
      ADD CONSTRAINT "SupportTicket_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "SupportTicket"
      ADD CONSTRAINT "SupportTicket_assignedToId_fkey"
      FOREIGN KEY ("assignedToId") REFERENCES "User"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "AppEvent"
      ADD CONSTRAINT "AppEvent_accountId_fkey"
      FOREIGN KEY ("accountId") REFERENCES "Account"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "AppEvent"
      ADD CONSTRAINT "AppEvent_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "AdminNote"
      ADD CONSTRAINT "AdminNote_accountId_fkey"
      FOREIGN KEY ("accountId") REFERENCES "Account"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "AdminNote"
      ADD CONSTRAINT "AdminNote_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "AdminNote"
      ADD CONSTRAINT "AdminNote_supportTicketId_fkey"
      FOREIGN KEY ("supportTicketId") REFERENCES "SupportTicket"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "StripeEvent"
      ADD CONSTRAINT "StripeEvent_accountId_fkey"
      FOREIGN KEY ("accountId") REFERENCES "Account"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "AiTokenUsage"
      ADD CONSTRAINT "AiTokenUsage_accountId_fkey"
      FOREIGN KEY ("accountId") REFERENCES "Account"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER TABLE "AiTokenUsage"
      ADD CONSTRAINT "AiTokenUsage_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;
END $$;
