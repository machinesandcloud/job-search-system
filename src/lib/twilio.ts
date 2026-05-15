import twilio from "twilio";

let _client: ReturnType<typeof twilio> | null = null;

function getTwilioClient() {
  if (!_client) {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (!sid || !token) throw new Error("Twilio credentials not configured");
    _client = twilio(sid, token);
  }
  return _client;
}

export async function sendSmsOtp(to: string, code: string) {
  const from = process.env.TWILIO_PHONE_NUMBER;
  if (!from) throw new Error("TWILIO_PHONE_NUMBER not configured");
  await getTwilioClient().messages.create({
    to,
    from,
    body: `Your Zari verification code is: ${code}. It expires in 10 minutes.`,
  });
}
