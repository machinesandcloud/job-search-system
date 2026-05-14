// Zoho Campaigns API — email list management + automation sequences
//
// Requires additional OAuth scopes (re-authorize at api-console.zoho.com):
//   ZohoCampaigns.contact.ALL
//   ZohoCampaigns.campaign.ALL
//
// List keys come from Zoho Campaigns UI → Lists → (each list) → API name.
// Autoresponder keys come from Campaigns → Autoresponders → Edit → URL.
// Store them as env vars (see .env.example for the full list).

const CAMPAIGNS_BASE = "https://campaigns.zoho.com/api/v1.1";

// ─── Sequence names (set up these autoresponders in Zoho Campaigns UI) ────────

export type ZariSequence =
  | "lead_nurture"        // Cold/organic lead → push toward trial signup (7 emails / 21 days)
  | "trial_onboarding"    // New free signup → drive first session + upgrade (5 emails / 14 days)
  | "trial_ending"        // 3 days before trial ends → urgency to upgrade (2 emails)
  | "paid_welcome"        // New paying customer → celebrate + onboarding tips (3 emails / 7 days)
  | "milestone_1"         // After 1st coaching session → positive reinforcement (1 email)
  | "milestone_5"         // After 5th session → upsell if on lower tier (1 email)
  | "upsell_limit"        // User hitting plan token limit → upgrade prompt (2 emails)
  | "at_risk"             // No session in 14 days → re-engagement (3 emails / 14 days)
  | "win_back_30"         // 30 days after churn → "what's new" (1 email)
  | "win_back_60"         // 60 days after churn → special offer (1 email)
  | "win_back_90"         // 90 days after churn → final attempt (1 email)
  | "nps_survey";         // After 30 days active → NPS survey (1 email)

// Map sequence names → env var holding the Zoho autoresponder key
const SEQUENCE_KEY_MAP: Record<ZariSequence, string> = {
  lead_nurture:      "ZOHO_SEQ_LEAD_NURTURE",
  trial_onboarding:  "ZOHO_SEQ_TRIAL_ONBOARDING",
  trial_ending:      "ZOHO_SEQ_TRIAL_ENDING",
  paid_welcome:      "ZOHO_SEQ_PAID_WELCOME",
  milestone_1:       "ZOHO_SEQ_MILESTONE_1",
  milestone_5:       "ZOHO_SEQ_MILESTONE_5",
  upsell_limit:      "ZOHO_SEQ_UPSELL_LIMIT",
  at_risk:           "ZOHO_SEQ_AT_RISK",
  win_back_30:       "ZOHO_SEQ_WIN_BACK_30",
  win_back_60:       "ZOHO_SEQ_WIN_BACK_60",
  win_back_90:       "ZOHO_SEQ_WIN_BACK_90",
  nps_survey:        "ZOHO_SEQ_NPS_SURVEY",
};

// Map sequence names → list key env var (contacts must be on the list first)
const LIST_KEY_MAP: Partial<Record<ZariSequence, string>> = {
  lead_nurture:     "ZOHO_LIST_LEADS",
  trial_onboarding: "ZOHO_LIST_TRIAL",
  trial_ending:     "ZOHO_LIST_TRIAL",
  paid_welcome:     "ZOHO_LIST_CUSTOMERS",
  milestone_1:      "ZOHO_LIST_CUSTOMERS",
  milestone_5:      "ZOHO_LIST_CUSTOMERS",
  upsell_limit:     "ZOHO_LIST_CUSTOMERS",
  at_risk:          "ZOHO_LIST_AT_RISK",
  win_back_30:      "ZOHO_LIST_WIN_BACK",
  win_back_60:      "ZOHO_LIST_WIN_BACK",
  win_back_90:      "ZOHO_LIST_WIN_BACK",
  nps_survey:       "ZOHO_LIST_CUSTOMERS",
};

// ─── Token (shared with zoho-crm.ts via env) ──────────────────────────────────

let _campaignsToken: { token: string; exp: number } | null = null;

async function getCampaignsToken(): Promise<string | null> {
  const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_DATA_CENTER = "com" } = process.env;
  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) return null;

  const now = Date.now();
  if (_campaignsToken && _campaignsToken.exp > now + 60_000) return _campaignsToken.token;

  try {
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
    const data = await res.json() as { access_token?: string; expires_in?: number; error?: string };
    if (!data.access_token) return null;
    _campaignsToken = { token: data.access_token, exp: now + (data.expires_in ?? 3600) * 1000 };
    return _campaignsToken.token;
  } catch {
    return null;
  }
}

async function campaignsFetch(path: string, params: Record<string, string>): Promise<unknown> {
  const token = await getCampaignsToken();
  if (!token) return null;

  const qs = new URLSearchParams({ ...params, resfmt: "JSON", authtoken: "" });
  const res = await fetch(`${CAMPAIGNS_BASE}${path}?${qs}`, {
    headers: { Authorization: `Zoho-oauthtoken ${token}` },
  });
  return res.json().catch(() => null);
}

// ─── Core operations ──────────────────────────────────────────────────────────

export interface CampaignsContact {
  email: string;
  firstName?: string;
  lastName?: string;
  planTier?: string;
  lifecycleStage?: string;
}

/** Add a contact to a Zoho Campaigns list */
export async function subscribeToList(
  listEnvKey: string,
  contact: CampaignsContact
): Promise<void> {
  const listKey = process.env[listEnvKey];
  if (!listKey) return; // list not configured yet

  const contactInfo = JSON.stringify({
    "Contact Email": contact.email,
    "First Name": contact.firstName ?? "",
    "Last Name": contact.lastName ?? "",
    "Plan Tier": contact.planTier ?? "",
    "Lifecycle Stage": contact.lifecycleStage ?? "",
  });

  try {
    await campaignsFetch("/json/listsubscribe", {
      listkey: listKey,
      contactinfo: contactInfo,
    });
  } catch (err) {
    console.error("[zoho-campaigns] subscribeToList error:", err);
  }
}

/** Remove a contact from a Zoho Campaigns list */
export async function unsubscribeFromList(listEnvKey: string, email: string): Promise<void> {
  const listKey = process.env[listEnvKey];
  if (!listKey) return;
  try {
    await campaignsFetch("/json/listunsubscribe", { listkey: listKey, emailids: email });
  } catch {}
}

/** Trigger a specific automation sequence for a contact */
export async function triggerSequence(sequence: ZariSequence, contact: CampaignsContact): Promise<void> {
  const seqEnvKey = SEQUENCE_KEY_MAP[sequence];
  const listEnvKey = LIST_KEY_MAP[sequence];
  const seqKey = process.env[seqEnvKey];

  if (!seqKey) {
    // Sequence not configured yet — log so it's visible during setup
    console.log(`[zoho-campaigns] sequence "${sequence}" not configured (set ${seqEnvKey})`);
    return;
  }

  // Ensure contact is on the appropriate list first
  if (listEnvKey) {
    await subscribeToList(listEnvKey, contact);
  }

  try {
    await campaignsFetch("/json/addautoresponder", {
      rekey: seqKey,
      emailids: contact.email,
    });
  } catch (err) {
    console.error(`[zoho-campaigns] triggerSequence(${sequence}) error:`, err);
  }
}

/** Stop a running sequence (e.g. remove from trial_onboarding when they upgrade) */
export async function stopSequence(sequence: ZariSequence, email: string): Promise<void> {
  const seqKey = process.env[SEQUENCE_KEY_MAP[sequence]];
  if (!seqKey) return;
  try {
    await campaignsFetch("/json/removeautoresponder", { rekey: seqKey, emailids: email });
  } catch {}
}

/** Move contact from one list to another (e.g. trial → customers on upgrade) */
export async function moveToList(
  fromEnvKey: string | null,
  toEnvKey: string,
  contact: CampaignsContact
): Promise<void> {
  if (fromEnvKey) await unsubscribeFromList(fromEnvKey, contact.email);
  await subscribeToList(toEnvKey, contact);
}
