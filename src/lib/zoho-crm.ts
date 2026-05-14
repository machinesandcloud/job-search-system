import axios, { AxiosInstance } from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ZohoPlanTier = "Free" | "Search" | "Growth" | "Executive";
export type ZohoLifecycleStage =
  | "Lead"
  | "Trial"
  | "Active"
  | "At Risk"
  | "Churned"
  | "Win-Back";

export interface ZohoContact {
  id?: string;
  First_Name: string;
  Last_Name: string;
  Email: string;
  // Askia Coach custom fields
  Askia_User_Id?: string;
  Askia_Account_Id?: string;
  Askia_Plan_Tier?: ZohoPlanTier;
  Askia_Lifecycle_Stage?: ZohoLifecycleStage;
  Askia_Trial_Start?: string; // ISO date
  Askia_Trial_End?: string; // ISO date
  Askia_Sessions_Count?: number;
  Askia_Token_Usage?: number;
  Askia_Last_Active?: string; // ISO date
  Askia_Stripe_Customer_Id?: string;
  Askia_Health_Score?: number; // 0-100
  Lead_Source?: string;
}

export interface ZohoLead {
  id?: string;
  First_Name?: string;
  Last_Name: string;
  Email: string;
  Lead_Source?: string;
  Lead_Status?: string;
  // Cold email tracking fields
  Cold_Email_Sequence?: string;
  Email_Opens?: number;
  Email_Clicks?: number;
  Last_Email_Opened?: string; // ISO date
  Lead_Score?: number; // 0-100
  Company?: string;
  Description?: string;
}

export interface ZohoDeal {
  id?: string;
  Deal_Name: string;
  Stage: string;
  Account_Name?: string;
  Contact_Name?: string;
  Amount?: number;
  Closing_Date?: string; // YYYY-MM-DD
  Lead_Source?: string;
  // Askia Coach fields
  Askia_Plan_Tier?: ZohoPlanTier;
  Askia_Account_Id?: string;
  Askia_Subscription_Id?: string;
  Probability?: number;
}

export interface ZohoNote {
  Note_Title: string;
  Note_Content: string;
  Parent_Id: string;
  $se_module: "Contacts" | "Leads" | "Deals" | "Accounts";
}

export interface ZohoActivity {
  Subject: string;
  Activity_Type?: "Call" | "Meeting" | "Task";
  Status?: "Not Started" | "Deferred" | "In Progress" | "Completed" | "Waiting for Input";
  Due_Date?: string; // YYYY-MM-DD
  Description?: string;
  Who_Id?: { id: string };
  What_Id?: { id: string };
}

// ─── Lifecycle stage mapping ───────────────────────────────────────────────────

export function computeLifecycleStage(opts: {
  planTier: string;
  subscriptionStatus: string;
  trialEnd?: Date | null;
  lastActive?: Date | null;
  sessionCount?: number;
}): ZohoLifecycleStage {
  const { planTier, subscriptionStatus, trialEnd, lastActive, sessionCount } = opts;

  if (planTier === "free" && subscriptionStatus !== "trialing") return "Lead";
  if (subscriptionStatus === "trialing") return "Trial";

  const active = ["active", "trialing"].includes(subscriptionStatus);
  if (!active) return "Churned";

  if (lastActive) {
    const daysSinceActive = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceActive > 30) return "At Risk";
  }
  if ((sessionCount ?? 0) < 2) return "At Risk";

  return "Active";
}

export function computeHealthScore(opts: {
  sessionCount: number;
  tokenUsage: number;
  daysSinceSignup: number;
  subscriptionStatus: string;
  planTier: string;
}): number {
  const { sessionCount, tokenUsage, daysSinceSignup, subscriptionStatus, planTier } = opts;

  let score = 50;

  // Engagement signals
  score += Math.min(sessionCount * 5, 25);
  score += Math.min(tokenUsage / 10000, 15);

  // Recency penalty
  if (daysSinceSignup > 60) score -= 10;
  if (daysSinceSignup > 90) score -= 10;

  // Plan signals
  if (planTier === "premium" || planTier === "team") score += 10;

  // Subscription health
  if (subscriptionStatus === "past_due") score -= 30;
  if (subscriptionStatus === "canceled") score -= 50;

  return Math.max(0, Math.min(100, score));
}

// ─── Token management ─────────────────────────────────────────────────────────

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

let _tokenCache: TokenCache | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (_tokenCache && _tokenCache.expiresAt > now + 60_000) {
    return _tokenCache.accessToken;
  }

  const {
    ZOHO_CLIENT_ID,
    ZOHO_CLIENT_SECRET,
    ZOHO_REFRESH_TOKEN,
    ZOHO_DATA_CENTER = "com",
  } = process.env;

  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    throw new Error("Zoho CRM credentials not configured. Set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN.");
  }

  const res = await axios.post(
    `https://accounts.zoho.${ZOHO_DATA_CENTER}/oauth/v2/token`,
    new URLSearchParams({
      refresh_token: ZOHO_REFRESH_TOKEN,
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      grant_type: "refresh_token",
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const { access_token, expires_in } = res.data;
  _tokenCache = { accessToken: access_token, expiresAt: now + expires_in * 1000 };
  return access_token;
}

// ─── HTTP client factory ───────────────────────────────────────────────────────

async function crmClient(): Promise<AxiosInstance> {
  const token = await getAccessToken();
  const dc = process.env.ZOHO_DATA_CENTER || "com";
  return axios.create({
    baseURL: `https://www.zohoapis.${dc}/crm/v7`,
    headers: { Authorization: `Zoho-oauthtoken ${token}` },
  });
}

// ─── Core CRM operations ───────────────────────────────────────────────────────

async function upsertRecord<T extends object>(
  module: string,
  data: T,
  searchField?: string,
  searchValue?: string
): Promise<string | null> {
  if (!process.env.ZOHO_REFRESH_TOKEN) return null; // graceful no-op when unconfigured

  try {
    const client = await crmClient();

    // Try to find existing record
    if (searchField && searchValue) {
      const search = await client.get(`/${module}/search`, {
        params: { criteria: `(${searchField}:equals:${searchValue})`, fields: "id" },
      });
      const existing = search.data?.data?.[0];
      if (existing?.id) {
        await client.put(`/${module}/${existing.id}`, { data: [data] });
        return existing.id;
      }
    }

    // Create new record
    const res = await client.post(`/${module}`, { data: [data] });
    return res.data?.data?.[0]?.details?.id ?? null;
  } catch (err) {
    console.error(`[zoho-crm] upsertRecord(${module}) error:`, err);
    return null;
  }
}

async function updateRecord(module: string, id: string, data: object): Promise<void> {
  if (!process.env.ZOHO_REFRESH_TOKEN) return;
  try {
    const client = await crmClient();
    await client.put(`/${module}/${id}`, { data: [{ id, ...data }] });
  } catch (err) {
    console.error(`[zoho-crm] updateRecord(${module}/${id}) error:`, err);
  }
}

async function createNote(note: ZohoNote): Promise<void> {
  if (!process.env.ZOHO_REFRESH_TOKEN) return;
  try {
    const client = await crmClient();
    await client.post("/Notes", { data: [note] });
  } catch (err) {
    console.error("[zoho-crm] createNote error:", err);
  }
}

async function createActivity(activity: ZohoActivity): Promise<void> {
  if (!process.env.ZOHO_REFRESH_TOKEN) return;
  try {
    const client = await crmClient();
    await client.post("/Activities", { data: [activity] });
  } catch (err) {
    console.error("[zoho-crm] createActivity error:", err);
  }
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Called when a new user signs up via /api/auth/signup or Google OAuth.
 * Creates a Contact in Zoho CRM and returns the Zoho contact ID.
 */
export async function syncNewUser(opts: {
  userId: string;
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;
  source?: string;
}): Promise<string | null> {
  const contact: ZohoContact = {
    First_Name: opts.firstName,
    Last_Name: opts.lastName,
    Email: opts.email,
    Askia_User_Id: opts.userId,
    Askia_Account_Id: opts.accountId,
    Askia_Plan_Tier: "Free",
    Askia_Lifecycle_Stage: "Lead",
    Lead_Source: opts.source || "Direct",
    Askia_Sessions_Count: 0,
    Askia_Token_Usage: 0,
    Askia_Health_Score: 50,
  };

  const contactId = await upsertRecord<ZohoContact>("Contacts", contact, "Email", opts.email);

  if (contactId) {
    await createNote({
      Note_Title: "User Signed Up",
      Note_Content: `New user registered on Askia Coach.\nUser ID: ${opts.userId}\nAccount ID: ${opts.accountId}`,
      Parent_Id: contactId,
      $se_module: "Contacts",
    });
  }

  return contactId;
}

/**
 * Called by Stripe webhook when a trial starts, subscription activates,
 * or any subscription status changes.
 */
export async function syncSubscriptionChange(opts: {
  userId: string;
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;
  planName: string;
  planTier: string;
  subscriptionStatus: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  trialEnd?: Date | null;
  currentPeriodEnd?: Date | null;
  amount?: number;
}): Promise<void> {
  const {
    userId, accountId, email, firstName, lastName,
    planName, planTier, subscriptionStatus,
    stripeCustomerId, stripeSubscriptionId, trialEnd, currentPeriodEnd, amount,
  } = opts;

  const lifecycle = computeLifecycleStage({
    planTier,
    subscriptionStatus,
    trialEnd,
  });

  const zohoPlan = ({
    free: "Free",
    pro: "Search",
    premium: "Growth",
    team: "Executive",
  } as Record<string, ZohoPlanTier>)[planTier] ?? "Free";

  // Upsert contact
  const contactId = await upsertRecord<ZohoContact>(
    "Contacts",
    {
      First_Name: firstName,
      Last_Name: lastName,
      Email: email,
      Askia_User_Id: userId,
      Askia_Account_Id: accountId,
      Askia_Plan_Tier: zohoPlan,
      Askia_Lifecycle_Stage: lifecycle,
      Askia_Trial_Start: subscriptionStatus === "trialing" ? new Date().toISOString() : undefined,
      Askia_Trial_End: trialEnd ? trialEnd.toISOString() : undefined,
      Askia_Stripe_Customer_Id: stripeCustomerId,
    },
    "Email",
    email
  );

  if (!contactId) return;

  // Upsert Deal (trial → conversion pipeline)
  const stage = {
    trialing: "Trial Started",
    active: "Customer Won",
    past_due: "Payment Issue",
    canceled: "Churned",
    unpaid: "Payment Issue",
  }[subscriptionStatus] ?? "Prospect";

  await upsertRecord<ZohoDeal>(
    "Deals",
    {
      Deal_Name: `${firstName} ${lastName} — ${planName}`,
      Stage: stage,
      Contact_Name: `${firstName} ${lastName}`,
      Amount: amount,
      Closing_Date: currentPeriodEnd
        ? currentPeriodEnd.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      Askia_Plan_Tier: zohoPlan,
      Askia_Account_Id: accountId,
      Askia_Subscription_Id: stripeSubscriptionId,
      Lead_Source: "Organic",
    },
    "Askia_Subscription_Id",
    stripeSubscriptionId ?? accountId
  );

  // Log note
  await createNote({
    Note_Title: `Subscription ${subscriptionStatus}`,
    Note_Content: `Plan: ${planName} (${planTier})\nStatus: ${subscriptionStatus}\nStripe Sub: ${stripeSubscriptionId ?? "N/A"}`,
    Parent_Id: contactId,
    $se_module: "Contacts",
  });
}

/**
 * Called when a coaching session completes. Updates engagement signals.
 */
export async function syncSessionComplete(opts: {
  userId: string;
  email: string;
  sessionId: string;
  sessionMode: string;
  sessionCount: number;
  totalTokenUsage: number;
  planTier: string;
  subscriptionStatus: string;
  daysSinceSignup: number;
}): Promise<void> {
  const {
    email, sessionId, sessionMode, sessionCount,
    totalTokenUsage, planTier, subscriptionStatus, daysSinceSignup,
  } = opts;

  const healthScore = computeHealthScore({
    sessionCount,
    tokenUsage: totalTokenUsage,
    daysSinceSignup,
    subscriptionStatus,
    planTier,
  });

  const contactId = await upsertRecord<Partial<ZohoContact>>(
    "Contacts",
    {
      Email: email,
      Askia_Sessions_Count: sessionCount,
      Askia_Token_Usage: totalTokenUsage,
      Askia_Last_Active: new Date().toISOString(),
      Askia_Health_Score: healthScore,
    },
    "Email",
    email
  );

  if (!contactId) return;

  await createActivity({
    Subject: `Askia Coaching Session — ${sessionMode}`,
    Activity_Type: "Meeting",
    Status: "Completed",
    Due_Date: new Date().toISOString().split("T")[0],
    Description: `Session ID: ${sessionId}\nMode: ${sessionMode}\nTotal sessions: ${sessionCount}\nHealth score: ${healthScore}`,
    Who_Id: { id: contactId },
  });
}

/**
 * Called when a support ticket is created. Logs it as an activity in CRM.
 */
export async function syncSupportTicket(opts: {
  email: string;
  ticketId: string;
  subject: string;
  category: string;
  priority: string;
  description: string;
}): Promise<void> {
  const { email, ticketId, subject, category, priority, description } = opts;

  const res = await (await crmClient()).get("/Contacts/search", {
    params: { criteria: `(Email:equals:${email})`, fields: "id" },
  }).catch(() => null);

  const contactId = res?.data?.data?.[0]?.id;
  if (!contactId) return;

  await createNote({
    Note_Title: `Support Ticket: ${subject}`,
    Note_Content: `Ticket ID: ${ticketId}\nCategory: ${category}\nPriority: ${priority}\n\n${description}`,
    Parent_Id: contactId,
    $se_module: "Contacts",
  });
}

/**
 * Called when a user churns. Moves lifecycle to Churned and logs reason.
 */
export async function syncChurn(opts: {
  email: string;
  reason?: string;
  planTier: string;
}): Promise<void> {
  const { email, reason } = opts;

  const contactId = await upsertRecord<Partial<ZohoContact>>(
    "Contacts",
    {
      Email: email,
      Askia_Lifecycle_Stage: "Churned",
      Askia_Health_Score: 0,
    },
    "Email",
    email
  );

  if (!contactId) return;

  await createNote({
    Note_Title: "User Churned",
    Note_Content: `Subscription canceled.\nReason: ${reason ?? "Not provided"}\nTriggered win-back automation.`,
    Parent_Id: contactId,
    $se_module: "Contacts",
  });
}

/**
 * Upserts an inbound lead from the cold email platform.
 * Call this when a cold-email contact signs up via the landing page.
 */
export async function convertLeadToContact(opts: {
  email: string;
  firstName?: string;
  lastName?: string;
  userId: string;
  accountId: string;
}): Promise<void> {
  // First, close out any existing Lead record
  try {
    const client = await crmClient();
    const search = await client.get("/Leads/search", {
      params: { criteria: `(Email:equals:${opts.email})`, fields: "id" },
    });
    const leadId = search.data?.data?.[0]?.id;
    if (leadId) {
      await client.put(`/Leads/${leadId}`, {
        data: [{ id: leadId, Lead_Status: "Converted" }],
      });
    }
  } catch {
    // Lead may not exist — that's fine
  }

  // Create/update Contact
  await syncNewUser({
    userId: opts.userId,
    accountId: opts.accountId,
    email: opts.email,
    firstName: opts.firstName ?? "",
    lastName: opts.lastName ?? "Unknown",
    source: "Cold Email",
  });
}
