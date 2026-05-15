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
  Zari_User_Id?: string;
  Zari_Account_Id?: string;
  Zari_Plan_Tier?: ZohoPlanTier;
  Zari_Lifecycle_Stage?: ZohoLifecycleStage;
  Zari_Trial_Start?: string;
  Zari_Trial_End?: string;
  Zari_Sessions_Count?: number;
  Zari_Token_Usage?: number;
  Zari_Last_Active?: string;
  Zari_Stripe_Customer_Id?: string;
  Zari_Health_Score?: number;
  Lead_Source?: string;
}

export interface ZohoLead {
  id?: string;
  First_Name?: string;
  Last_Name: string;
  Email: string;
  Lead_Source?: string;
  Lead_Status?: string;
  Cold_Email_Sequence?: string;
  Email_Opens?: number;
  Email_Clicks?: number;
  Last_Email_Opened?: string;
  Lead_Score?: number;
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
  Closing_Date?: string;
  Lead_Source?: string;
  Zari_Plan_Tier?: ZohoPlanTier;
  Zari_Account_Id?: string;
  Zari_Subscription_Id?: string;
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
  Due_Date?: string;
  Description?: string;
  Who_Id?: { id: string };
  What_Id?: { id: string };
}

// ─── Lifecycle + health scoring ───────────────────────────────────────────────

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
  if (!["active", "trialing"].includes(subscriptionStatus)) return "Churned";
  if (lastActive) {
    const days = (Date.now() - lastActive.getTime()) / 86_400_000;
    if (days > 30) return "At Risk";
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
  score += Math.min(sessionCount * 5, 25);
  score += Math.min(tokenUsage / 10000, 15);
  if (daysSinceSignup > 60) score -= 10;
  if (daysSinceSignup > 90) score -= 10;
  if (planTier === "premium" || planTier === "team") score += 10;
  if (subscriptionStatus === "past_due") score -= 30;
  if (subscriptionStatus === "canceled") score -= 50;
  return Math.max(0, Math.min(100, score));
}

// ─── Token management ─────────────────────────────────────────────────────────

let _tokenCache: { accessToken: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (_tokenCache && _tokenCache.expiresAt > now + 60_000) return _tokenCache.accessToken;

  const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_DATA_CENTER = "com" } = process.env;
  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    throw new Error("Zoho CRM credentials not configured.");
  }

  const res = await fetch(`https://accounts.zoho.${ZOHO_DATA_CENTER}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: ZOHO_REFRESH_TOKEN,
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json() as { access_token: string; expires_in: number };
  _tokenCache = { accessToken: data.access_token, expiresAt: now + data.expires_in * 1000 };
  return data.access_token;
}

// ─── HTTP helper ──────────────────────────────────────────────────────────────

async function crmFetch(path: string, init: RequestInit = {}): Promise<unknown> {
  const token = await getAccessToken();
  const dc = process.env.ZOHO_DATA_CENTER || "com";
  const res = await fetch(`https://www.zohoapis.${dc}/crm/v7${path}`, {
    ...init,
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok && res.status !== 204) {
    const text = await res.text().catch(() => "");
    throw new Error(`Zoho API ${res.status}: ${text}`);
  }
  return res.status === 204 ? null : res.json().catch(() => null);
}

// ─── Core CRM operations ───────────────────────────────────────────────────────

async function upsertRecord<T extends object>(
  module: string,
  data: T,
  searchField?: string,
  searchValue?: string
): Promise<string | null> {
  if (!process.env.ZOHO_REFRESH_TOKEN) return null;
  try {
    if (searchField && searchValue) {
      const search = await crmFetch(
        `/${module}/search?criteria=(${searchField}:equals:${encodeURIComponent(searchValue)})&fields=id`
      ) as { data?: Array<{ id: string }> } | null;
      const existing = search?.data?.[0];
      if (existing?.id) {
        await crmFetch(`/${module}/${existing.id}`, {
          method: "PUT",
          body: JSON.stringify({ data: [data] }),
        });
        return existing.id;
      }
    }
    const res = await crmFetch(`/${module}`, {
      method: "POST",
      body: JSON.stringify({ data: [data] }),
    }) as { data?: Array<{ details?: { id: string } }> } | null;
    return res?.data?.[0]?.details?.id ?? null;
  } catch (err) {
    console.error(`[zoho-crm] upsertRecord(${module}) error:`, err);
    return null;
  }
}

async function createNote(note: ZohoNote): Promise<void> {
  if (!process.env.ZOHO_REFRESH_TOKEN) return;
  try {
    await crmFetch("/Notes", { method: "POST", body: JSON.stringify({ data: [note] }) });
  } catch (err) {
    console.error("[zoho-crm] createNote error:", err);
  }
}

async function createActivity(activity: ZohoActivity): Promise<void> {
  if (!process.env.ZOHO_REFRESH_TOKEN) return;
  try {
    await crmFetch("/Activities", { method: "POST", body: JSON.stringify({ data: [activity] }) });
  } catch (err) {
    console.error("[zoho-crm] createActivity error:", err);
  }
}

// ─── Public API ────────────────────────────────────────────────────────────────

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
    Zari_User_Id: opts.userId,
    Zari_Account_Id: opts.accountId,
    Zari_Plan_Tier: "Free",
    Zari_Lifecycle_Stage: "Lead",
    Lead_Source: opts.source || "Direct",
    Zari_Sessions_Count: 0,
    Zari_Token_Usage: 0,
    Zari_Health_Score: 50,
  };

  const contactId = await upsertRecord<ZohoContact>("Contacts", contact, "Email", opts.email);

  if (contactId) {
    await createNote({
      Note_Title: "User Signed Up",
      Note_Content: `New user registered on Zari.\nUser ID: ${opts.userId}\nAccount ID: ${opts.accountId}`,
      Parent_Id: contactId,
      $se_module: "Contacts",
    });
  }

  return contactId;
}

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

  const lifecycle = computeLifecycleStage({ planTier, subscriptionStatus, trialEnd });
  const zohoPlan = ({ free: "Free", pro: "Search", premium: "Growth", team: "Executive" } as Record<string, ZohoPlanTier>)[planTier] ?? "Free";

  const contactId = await upsertRecord<ZohoContact>(
    "Contacts",
    {
      First_Name: firstName,
      Last_Name: lastName,
      Email: email,
      Zari_User_Id: userId,
      Zari_Account_Id: accountId,
      Zari_Plan_Tier: zohoPlan,
      Zari_Lifecycle_Stage: lifecycle,
      Zari_Trial_Start: subscriptionStatus === "trialing" ? new Date().toISOString() : undefined,
      Zari_Trial_End: trialEnd ? trialEnd.toISOString() : undefined,
      Zari_Stripe_Customer_Id: stripeCustomerId,
    },
    "Email",
    email
  );

  if (!contactId) return;

  const stage = ({ trialing: "Trial Started", active: "Customer Won", past_due: "Payment Issue", canceled: "Churned", unpaid: "Payment Issue" } as Record<string, string>)[subscriptionStatus] ?? "Prospect";

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
      Zari_Plan_Tier: zohoPlan,
      Zari_Account_Id: accountId,
      Zari_Subscription_Id: stripeSubscriptionId,
      Lead_Source: "Organic",
    },
    "Zari_Subscription_Id",
    stripeSubscriptionId ?? accountId
  );

  await createNote({
    Note_Title: `Subscription ${subscriptionStatus}`,
    Note_Content: `Plan: ${planName} (${planTier})\nStatus: ${subscriptionStatus}\nStripe Sub: ${stripeSubscriptionId ?? "N/A"}`,
    Parent_Id: contactId,
    $se_module: "Contacts",
  });
}

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
  const { email, sessionId, sessionMode, sessionCount, totalTokenUsage, planTier, subscriptionStatus, daysSinceSignup } = opts;

  const healthScore = computeHealthScore({ sessionCount, tokenUsage: totalTokenUsage, daysSinceSignup, subscriptionStatus, planTier });

  const contactId = await upsertRecord<Partial<ZohoContact>>(
    "Contacts",
    { Email: email, Zari_Sessions_Count: sessionCount, Zari_Token_Usage: totalTokenUsage, Zari_Last_Active: new Date().toISOString(), Zari_Health_Score: healthScore },
    "Email",
    email
  );

  if (!contactId) return;

  await createActivity({
    Subject: `Zari Coaching Session — ${sessionMode}`,
    Activity_Type: "Meeting",
    Status: "Completed",
    Due_Date: new Date().toISOString().split("T")[0],
    Description: `Session ID: ${sessionId}\nMode: ${sessionMode}\nTotal sessions: ${sessionCount}\nHealth score: ${healthScore}`,
    Who_Id: { id: contactId },
  });
}

export async function syncSupportTicket(opts: {
  email: string;
  ticketId: string;
  subject: string;
  category: string;
  priority: string;
  description: string;
}): Promise<void> {
  const { email, ticketId, subject, category, priority, description } = opts;
  if (!process.env.ZOHO_REFRESH_TOKEN) return;
  try {
    const res = await crmFetch(
      `/Contacts/search?criteria=(Email:equals:${encodeURIComponent(email)})&fields=id`
    ) as { data?: Array<{ id: string }> } | null;
    const contactId = res?.data?.[0]?.id;
    if (!contactId) return;
    await createNote({
      Note_Title: `Support Ticket: ${subject}`,
      Note_Content: `Ticket ID: ${ticketId}\nCategory: ${category}\nPriority: ${priority}\n\n${description}`,
      Parent_Id: contactId,
      $se_module: "Contacts",
    });
  } catch (err) {
    console.error("[zoho-crm] syncSupportTicket error:", err);
  }
}

export async function syncChurn(opts: { email: string; reason?: string; planTier: string }): Promise<void> {
  const { email, reason } = opts;
  const contactId = await upsertRecord<Partial<ZohoContact>>(
    "Contacts",
    { Email: email, Zari_Lifecycle_Stage: "Churned", Zari_Health_Score: 0 },
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

export async function convertLeadToContact(opts: {
  email: string;
  firstName?: string;
  lastName?: string;
  userId: string;
  accountId: string;
}): Promise<void> {
  if (!process.env.ZOHO_REFRESH_TOKEN) return;
  try {
    const res = await crmFetch(
      `/Leads/search?criteria=(Email:equals:${encodeURIComponent(opts.email)})&fields=id`
    ) as { data?: Array<{ id: string }> } | null;
    const leadId = res?.data?.[0]?.id;
    if (leadId) {
      await crmFetch(`/Leads/${leadId}`, {
        method: "PUT",
        body: JSON.stringify({ data: [{ id: leadId, Lead_Status: "Converted" }] }),
      });
    }
  } catch {
    // Lead may not exist — fine
  }

  await syncNewUser({
    userId: opts.userId,
    accountId: opts.accountId,
    email: opts.email,
    firstName: opts.firstName ?? "",
    lastName: opts.lastName ?? "Unknown",
    source: "Cold Email",
  });
}

// ─── Zoho Books HTTP helper ────────────────────────────────────────────────────

async function booksFetch(path: string, init: RequestInit = {}): Promise<unknown> {
  const token = await getAccessToken();
  const dc = process.env.ZOHO_DATA_CENTER || "com";
  const orgId = process.env.ZOHO_BOOKS_ORG_ID;
  if (!orgId) return null; // Books not configured — skip silently
  const url = new URL(`https://www.zohoapis.${dc}/books/v3${path}`);
  url.searchParams.set("organization_id", orgId);
  const res = await fetch(url.toString(), {
    ...init,
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Zoho Books API ${res.status}: ${text}`);
  }
  return res.json().catch(() => null);
}

// ─── Books: ensure a customer record exists for a Zari subscriber ──────────────

async function ensureBooksCustomer(opts: { email: string; firstName: string; lastName: string }): Promise<string | null> {
  try {
    const search = await booksFetch(`/contacts?email=${encodeURIComponent(opts.email)}&contact_type=customer`) as {
      contacts?: Array<{ contact_id: string }>;
    } | null;
    if (search?.contacts?.[0]?.contact_id) return search.contacts[0].contact_id;

    const res = await booksFetch("/contacts", {
      method: "POST",
      body: JSON.stringify({
        contact_name: `${opts.firstName} ${opts.lastName}`.trim() || opts.email,
        contact_type: "customer",
        contact_persons: [{ first_name: opts.firstName, last_name: opts.lastName, email: opts.email, is_primary_contact: true }],
      }),
    }) as { contact?: { contact_id: string } } | null;
    return res?.contact?.contact_id ?? null;
  } catch (err) {
    console.error("[zoho-crm] ensureBooksCustomer error:", err);
    return null;
  }
}

/**
 * Record a paid subscription activation in Zoho Books.
 * Creates an invoice + payment so revenue is tracked without manual entry.
 */
export async function syncPaymentToBooks(opts: {
  email: string;
  firstName: string;
  lastName: string;
  planName: string;
  amount: number;             // in cents
  stripeInvoiceId?: string;
  stripeSubscriptionId?: string;
  periodEnd?: Date | null;
}): Promise<void> {
  if (!process.env.ZOHO_REFRESH_TOKEN || !process.env.ZOHO_BOOKS_ORG_ID) return;
  try {
    const customerId = await ensureBooksCustomer({ email: opts.email, firstName: opts.firstName, lastName: opts.lastName });
    if (!customerId) return;

    const amountDollars = opts.amount / 100;
    const today = new Date().toISOString().split("T")[0];
    const dueDate = opts.periodEnd ? opts.periodEnd.toISOString().split("T")[0] : today;

    // Create the invoice
    const invoiceRes = await booksFetch("/invoices", {
      method: "POST",
      body: JSON.stringify({
        customer_id: customerId,
        invoice_date: today,
        due_date: dueDate,
        reference_number: opts.stripeInvoiceId ?? opts.stripeSubscriptionId,
        line_items: [{
          name: opts.planName,
          description: `Zari ${opts.planName} subscription`,
          quantity: 1,
          rate: amountDollars,
        }],
      }),
    }) as { invoice?: { invoice_id: string } } | null;

    const invoiceId = invoiceRes?.invoice?.invoice_id;
    if (!invoiceId) return;

    // Immediately record the payment (Stripe already charged them)
    await booksFetch("/customerpayments", {
      method: "POST",
      body: JSON.stringify({
        customer_id: customerId,
        payment_mode: "creditcard",
        amount: amountDollars,
        date: today,
        reference_number: opts.stripeInvoiceId ?? "stripe",
        invoices: [{ invoice_id: invoiceId, amount_applied: amountDollars }],
      }),
    });
  } catch (err) {
    console.error("[zoho-crm] syncPaymentToBooks error:", err);
  }
}

// ─── CRM Tasks ────────────────────────────────────────────────────────────────

async function createCrmTask(opts: {
  subject: string;
  description?: string;
  priority?: "High" | "Medium" | "Low";
  contactEmail?: string;
  dueOffsetDays?: number;
}): Promise<void> {
  if (!process.env.ZOHO_REFRESH_TOKEN) return;
  try {
    let contactId: string | undefined;
    if (opts.contactEmail) {
      const res = await crmFetch(
        `/Contacts/search?criteria=(Email:equals:${encodeURIComponent(opts.contactEmail)})&fields=id`
      ) as { data?: Array<{ id: string }> } | null;
      contactId = res?.data?.[0]?.id;
    }

    const dueDate = new Date(Date.now() + (opts.dueOffsetDays ?? 1) * 86_400_000).toISOString().split("T")[0];

    await crmFetch("/Tasks", {
      method: "POST",
      body: JSON.stringify({
        data: [{
          Subject: opts.subject,
          Status: "Not Started",
          Priority: opts.priority ?? "High",
          Due_Date: dueDate,
          Description: opts.description,
          ...(contactId ? { Who_Id: { id: contactId } } : {}),
        }],
      }),
    });
  } catch (err) {
    console.error("[zoho-crm] createCrmTask error:", err);
  }
}

/**
 * Log an NPS score to the CRM contact record and create a task for detractors.
 */
export async function syncNpsScore(opts: {
  email: string;
  score: number;
  comment?: string;
  planTier: string;
}): Promise<void> {
  if (!process.env.ZOHO_REFRESH_TOKEN) return;
  try {
    const contactId = await upsertRecord<Partial<ZohoContact>>(
      "Contacts",
      { Email: opts.email },
      "Email",
      opts.email
    );

    const category = opts.score >= 9 ? "Promoter 🟢" : opts.score >= 7 ? "Passive 🟡" : "Detractor 🔴";

    if (contactId) {
      await createNote({
        Note_Title: `NPS Score: ${opts.score}/10 (${category})`,
        Note_Content: `Score: ${opts.score}/10\nCategory: ${category}\nPlan: ${opts.planTier}${opts.comment ? `\n\nComment:\n${opts.comment}` : ""}`,
        Parent_Id: contactId,
        $se_module: "Contacts",
      });
    }

    // Detractors (0-6): personal follow-up task due in 1 day
    if (opts.score <= 6) {
      await createCrmTask({
        subject: `🔴 NPS Detractor follow-up — score ${opts.score} from ${opts.email}`,
        description: `User rated Zari ${opts.score}/10.\n\nComment: ${opts.comment ?? "none"}\n\nPlan: ${opts.planTier}\n\nPersonal outreach required within 24h to understand the issue and save the account.`,
        priority: "High",
        contactEmail: opts.email,
        dueOffsetDays: 1,
      });
    }

    // Promoters (9-10): referral ask task (lower priority, 3 days)
    if (opts.score >= 9) {
      await createCrmTask({
        subject: `🟢 Promoter referral ask — ${opts.email} rated ${opts.score}/10`,
        description: `User is a promoter (${opts.score}/10). Consider reaching out to ask for a testimonial or referral.`,
        priority: "Low",
        contactEmail: opts.email,
        dueOffsetDays: 3,
      });
    }
  } catch (err) {
    console.error("[zoho-crm] syncNpsScore error:", err);
  }
}

/**
 * Create a high-priority follow-up task for enterprise/team signups.
 * These are high-value accounts worth personal outreach.
 */
export async function flagHighValueSignup(opts: {
  email: string;
  firstName: string;
  lastName: string;
  planTier: string;
}): Promise<void> {
  if (!process.env.ZOHO_REFRESH_TOKEN) return;
  if (!["team", "premium"].includes(opts.planTier)) return;

  const label = opts.planTier === "team" ? "Executive" : "Growth";
  await createCrmTask({
    subject: `⭐ High-value ${label} signup — ${opts.firstName} ${opts.lastName} (${opts.email})`,
    description: `New ${label} plan subscriber.\nEmail: ${opts.email}\n\nPersonally welcome them within 24h — these accounts have the highest LTV and churn risk.`,
    priority: "High",
    contactEmail: opts.email,
    dueOffsetDays: 1,
  });
}
