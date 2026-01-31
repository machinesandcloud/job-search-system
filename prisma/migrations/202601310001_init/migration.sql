-- CreateEnum
CREATE TYPE "LeadRoute" AS ENUM ('DIY', 'GUIDED', 'FAST_TRACK');
CREATE TYPE "CompanySource" AS ENUM ('CLEARBIT', 'LOCAL', 'MANUAL');
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'CANCELED');

-- CreateTable
CREATE TABLE "Lead" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "email" TEXT,
  "answers" JSONB NOT NULL,
  "score" INTEGER NOT NULL,
  "subscores" JSONB NOT NULL,
  "route" "LeadRoute" NOT NULL,
  "token" TEXT NOT NULL,
  "ipHash" TEXT NOT NULL,
  "userAgent" TEXT,
  CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "domain" TEXT,
  "logoUrl" TEXT,
  "industry" TEXT,
  "sizeRange" TEXT,
  "source" "CompanySource" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadCompany" (
  "leadId" TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  CONSTRAINT "LeadCompany_pkey" PRIMARY KEY ("leadId","companyId")
);

-- CreateTable
CREATE TABLE "Purchase" (
  "id" TEXT NOT NULL,
  "leadId" TEXT NOT NULL,
  "stripeCheckoutSessionId" TEXT NOT NULL,
  "stripePaymentIntentId" TEXT,
  "amount" INTEGER NOT NULL,
  "currency" TEXT NOT NULL,
  "status" "PurchaseStatus" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
  "id" TEXT NOT NULL,
  "leadId" TEXT,
  "type" TEXT NOT NULL,
  "metadata" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminToken" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AdminToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_token_key" ON "Lead"("token");
CREATE INDEX "Company_name_idx" ON "Company"("name");
CREATE INDEX "Company_domain_idx" ON "Company"("domain");
CREATE INDEX "Event_type_idx" ON "Event"("type");
CREATE INDEX "AdminToken_email_idx" ON "AdminToken"("email");

-- AddForeignKey
ALTER TABLE "LeadCompany" ADD CONSTRAINT "LeadCompany_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LeadCompany" ADD CONSTRAINT "LeadCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Event" ADD CONSTRAINT "Event_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
