export async function register() {
  if (process.env.NODE_ENV !== "production") return;

  // Hard required — app cannot function at all without these
  const critical = ["DATABASE_URL", "APP_SECRET", "OPENAI_API_KEY"];

  const missing = critical.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `[startup] Missing required environment variables: ${missing.join(", ")}\n` +
      "See .env.example for documentation."
    );
  }

  if ((process.env.APP_SECRET?.length ?? 0) < 32) {
    throw new Error("[startup] APP_SECRET must be at least 32 characters.");
  }

  // Optional integrations — warn but do not crash
  const optional = [
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "RESEND_API_KEY",
    "NEXT_PUBLIC_BASE_URL",
  ];
  const missingOptional = optional.filter(key => !process.env[key]);
  if (missingOptional.length > 0) {
    console.warn(
      `[startup] Optional env vars not set: ${missingOptional.join(", ")} — related features will be disabled.`
    );
  }
}
