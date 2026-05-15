import { Resend } from "resend";

let _client: Resend | null = null;

export function getResendClient(): Resend {
  if (!_client) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not configured");
    _client = new Resend(key);
  }
  return _client;
}

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Zari AI <coach@zaricoach.com>";
export const REPLY_TO = process.env.RESEND_REPLY_TO ?? "support@zaricoach.com";

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  unsubscribeUrl?: string;
}): Promise<void> {
  const resend = getResendClient();

  const headers: Record<string, string> = {
    // RFC 8058 one-click unsubscribe — tells Gmail this is a legitimate sender
    // and enables the one-click unsub button in Gmail header area.
    // Critical for deliverability: without it, spam filters are more aggressive.
    ...(opts.unsubscribeUrl && {
      "List-Unsubscribe": `<${opts.unsubscribeUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    }),
  };

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    replyTo: REPLY_TO,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    ...(opts.text && { text: opts.text }),
    headers,
  });
  if (error) throw new Error(`Resend error: ${error.message}`);
}
