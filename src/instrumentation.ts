export async function register() {
  if (process.env.NODE_ENV !== "production") return;

  const required = [
    "DATABASE_URL",
    "APP_SECRET",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "OPENAI_API_KEY",
    "RESEND_API_KEY",
    "NEXT_PUBLIC_BASE_URL",
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `[startup] Missing required environment variables: ${missing.join(", ")}\n` +
      "See .env.example for documentation."
    );
  }

  if ((process.env.APP_SECRET?.length ?? 0) < 32) {
    throw new Error("[startup] APP_SECRET must be at least 32 characters.");
  }
}
