type LogLevel = "info" | "warn" | "error";

type LogFields = Record<string, unknown>;

function log(level: LogLevel, message: string, fields?: LogFields) {
  const entry = {
    ts:  new Date().toISOString(),
    level,
    msg: message,
    ...(fields ?? {}),
  };
  const line = JSON.stringify(entry);
  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  info:  (msg: string, fields?: LogFields) => log("info",  msg, fields),
  warn:  (msg: string, fields?: LogFields) => log("warn",  msg, fields),
  error: (msg: string, fields?: LogFields) => log("error", msg, fields),
};
