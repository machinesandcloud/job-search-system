CREATE TABLE "LinkedInCredential" (
    "id"              TEXT NOT NULL DEFAULT 'singleton',
    "accessToken"     TEXT NOT NULL,
    "refreshToken"    TEXT,
    "expiresAt"       TIMESTAMP(3) NOT NULL,
    "organizationUrn" TEXT,
    "memberUrn"       TEXT,
    "updatedAt"       TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LinkedInCredential_pkey" PRIMARY KEY ("id")
);
