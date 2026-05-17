-- Add geo + title columns to VisitorSession
ALTER TABLE "VisitorSession" ADD COLUMN IF NOT EXISTS "landingPageTitle" TEXT;
ALTER TABLE "VisitorSession" ADD COLUMN IF NOT EXISTS "city"             TEXT;
ALTER TABLE "VisitorSession" ADD COLUMN IF NOT EXISTS "region"           TEXT;
ALTER TABLE "VisitorSession" ADD COLUMN IF NOT EXISTS "timezone"         TEXT;

-- CreateTable: granular visitor events (clicks, scroll, forms, etc.)
CREATE TABLE "VisitorEvent" (
    "id"         UUID         NOT NULL,
    "sessionId"  UUID         NOT NULL,
    "pageViewId" UUID,
    "type"       TEXT         NOT NULL,
    "page"       TEXT         NOT NULL,
    "data"       JSONB,
    "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitorEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VisitorEvent_sessionId_createdAt_idx" ON "VisitorEvent"("sessionId", "createdAt");
CREATE INDEX "VisitorEvent_type_createdAt_idx"      ON "VisitorEvent"("type", "createdAt");

-- AddForeignKey
ALTER TABLE "VisitorEvent" ADD CONSTRAINT "VisitorEvent_sessionId_fkey"
    FOREIGN KEY ("sessionId") REFERENCES "VisitorSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
