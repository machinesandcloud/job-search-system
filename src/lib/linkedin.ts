import { prisma } from "@/lib/db";

const LINKEDIN_API = "https://api.linkedin.com/v2";
const TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization";

export interface LinkedInCreds {
  accessToken: string;
  refreshToken?: string | null;
  expiresAt: Date;
  organizationUrn?: string | null;
  memberUrn?: string | null;
}

// ─── Token storage ────────────────────────────────────────────────────────────

export async function getCredentials(): Promise<LinkedInCreds | null> {
  return prisma.linkedInCredential.findUnique({ where: { id: "singleton" } });
}

export async function saveCredentials(data: Omit<LinkedInCreds, "updatedAt">) {
  return prisma.linkedInCredential.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });
}

// ─── OAuth helpers ────────────────────────────────────────────────────────────

export function getAuthorizationUrl(state: string): string {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  if (!clientId) throw new Error("LINKEDIN_CLIENT_ID not set");

  const redirectUri =
    process.env.LINKEDIN_REDIRECT_URI ??
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/linkedin/callback`;

  const scope = [
    "w_organization_social",
    "r_organization_social",
    "openid",
    "profile",
  ].join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope,
  });

  return `${AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string): Promise<{
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}> {
  const redirectUri =
    process.env.LINKEDIN_REDIRECT_URI ??
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/linkedin/callback`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    }).toString(),
  });

  if (!res.ok) throw new Error(`LinkedIn token exchange failed: ${await res.text()}`);
  return res.json();
}

async function doRefresh(refreshToken: string) {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    }).toString(),
  });

  if (!res.ok) throw new Error(`LinkedIn token refresh failed: ${await res.text()}`);
  return res.json() as Promise<{ access_token: string; refresh_token?: string; expires_in: number }>;
}

/** Returns a valid access token, refreshing if within 5 minutes of expiry. */
export async function getValidToken(): Promise<string> {
  let cred = await getCredentials();
  if (!cred) throw new Error("LinkedIn not connected — visit /coach-admin to connect");

  if (cred.expiresAt.getTime() - Date.now() < 5 * 60 * 1000) {
    if (!cred.refreshToken) throw new Error("LinkedIn token expired and no refresh token available");
    const refreshed = await doRefresh(cred.refreshToken);
    cred = await saveCredentials({
      accessToken: refreshed.access_token,
      refreshToken: refreshed.refresh_token ?? cred.refreshToken,
      expiresAt: new Date(Date.now() + refreshed.expires_in * 1000),
      organizationUrn: cred.organizationUrn,
      memberUrn: cred.memberUrn,
    });
    if (!cred) throw new Error("Failed to persist refreshed LinkedIn credentials");
  }

  return cred.accessToken;
}

// ─── User / org info ──────────────────────────────────────────────────────────

export async function fetchMemberInfo(accessToken: string): Promise<{ sub: string; name: string }> {
  const res = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch member info: ${await res.text()}`);
  const data = await res.json();
  return { sub: data.sub as string, name: (data.name ?? data.given_name ?? "") as string };
}

export async function fetchAdminOrganizations(accessToken: string): Promise<Array<{ id: string; name: string }>> {
  const res = await fetch(
    `${LINKEDIN_API}/organizationAcls?q=roleAssignee&role=ADMINISTRATOR&projection=(elements*(organization~(id,localizedName)))`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
      },
    }
  );

  if (!res.ok) return [];

  const data = await res.json();
  const elements = (data.elements ?? []) as Array<{
    "organization~"?: { id: number; localizedName: string };
  }>;

  return elements
    .filter((e) => e["organization~"])
    .map((e) => ({
      id: `urn:li:organization:${e["organization~"]!.id}`,
      name: e["organization~"]!.localizedName,
    }));
}

// ─── Posting ──────────────────────────────────────────────────────────────────

export async function registerImageUpload(
  accessToken: string,
  authorUrn: string
): Promise<{ uploadUrl: string; assetUrn: string }> {
  const res = await fetch(`${LINKEDIN_API}/assets?action=registerUpload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      registerUploadRequest: {
        recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
        owner: authorUrn,
        serviceRelationships: [
          { relationshipType: "OWNER", identifier: "urn:li:userGeneratedContent" },
        ],
      },
    }),
  });

  if (!res.ok) throw new Error(`Image registration failed: ${await res.text()}`);

  const data = await res.json();
  const uploadMechanism =
    data.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"];
  return {
    uploadUrl: uploadMechanism.uploadUrl as string,
    assetUrn: data.value.asset as string,
  };
}

export async function uploadImage(uploadUrl: string, imageBuffer: Buffer): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "image/png" },
    body: new Uint8Array(imageBuffer),
  });
  if (!res.ok) throw new Error(`Image upload failed: ${await res.text()}`);
}

export interface PostOptions {
  authorUrn: string;
  text: string;
  imageBuffer?: Buffer;
  imageTitle?: string;
}

/** Creates a LinkedIn UGC post. Returns the post URN from the response header. */
export async function createPost(accessToken: string, opts: PostOptions): Promise<string> {
  let assetUrn: string | undefined;

  if (opts.imageBuffer) {
    const { uploadUrl, assetUrn: urn } = await registerImageUpload(accessToken, opts.authorUrn);
    await uploadImage(uploadUrl, opts.imageBuffer);
    assetUrn = urn;

    // LinkedIn requires a brief wait after upload before referencing the asset
    await new Promise((r) => setTimeout(r, 3000));
  }

  const body = {
    author: opts.authorUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text: opts.text },
        shareMediaCategory: assetUrn ? "IMAGE" : "NONE",
        ...(assetUrn
          ? {
              media: [
                {
                  status: "READY",
                  description: { text: "Zari — AI Career Coach" },
                  media: assetUrn,
                  title: { text: opts.imageTitle ?? "Zari Career Insight" },
                },
              ],
            }
          : {}),
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  const res = await fetch(`${LINKEDIN_API}/ugcPosts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Post creation failed: ${await res.text()}`);

  return res.headers.get("x-restli-id") ?? "";
}

/** Returns the author URN to use: org URN if available, else member URN. */
export function resolveAuthorUrn(cred: LinkedInCreds): string {
  if (cred.organizationUrn) return cred.organizationUrn;
  if (cred.memberUrn) return `urn:li:person:${cred.memberUrn}`;
  throw new Error("No author URN available — reconnect LinkedIn");
}
