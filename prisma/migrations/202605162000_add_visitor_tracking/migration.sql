-- CreateTable
CREATE TABLE "VisitorSession" (
    "id" UUID NOT NULL,
    "visitorId" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "device" TEXT,
    "country" TEXT,
    "referrer" TEXT,
    "landingPage" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "language" TEXT,
    "screenWidth" INTEGER,
    "screenHeight" INTEGER,
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitorSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorPageView" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "page" TEXT NOT NULL,
    "title" TEXT,
    "referrer" TEXT,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitorPageView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VisitorSession_visitorId_idx" ON "VisitorSession"("visitorId");

-- CreateIndex
CREATE INDEX "VisitorSession_firstSeenAt_idx" ON "VisitorSession"("firstSeenAt");

-- CreateIndex
CREATE INDEX "VisitorSession_lastSeenAt_idx" ON "VisitorSession"("lastSeenAt");

-- CreateIndex
CREATE INDEX "VisitorPageView_sessionId_createdAt_idx" ON "VisitorPageView"("sessionId", "createdAt");

-- CreateIndex
CREATE INDEX "VisitorPageView_page_createdAt_idx" ON "VisitorPageView"("page", "createdAt");

-- CreateIndex
CREATE INDEX "VisitorPageView_createdAt_idx" ON "VisitorPageView"("createdAt");

-- AddForeignKey
ALTER TABLE "VisitorPageView" ADD CONSTRAINT "VisitorPageView_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "VisitorSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
