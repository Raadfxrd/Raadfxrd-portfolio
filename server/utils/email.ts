import nodemailer from "nodemailer";
import crypto from "crypto";

/**
 * Get configured email transporter
 */
export function getEmailTransporter() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return nodemailer.createTransport({
    host: isDevelopment ? "127.0.0.1" : process.env.SMTP_HOST || "127.0.0.1",
    port: isDevelopment ? 2525 : parseInt(process.env.SMTP_PORT || "587"),
    secure: isDevelopment ? false : process.env.SMTP_SECURE === "true",
    auth: isDevelopment
      ? undefined
      : {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
  });
}

/**
 * Generate unsubscribe token for an email
 */
export function generateUnsubscribeToken(email: string): string {
  const config = useRuntimeConfig();
  const secret = config.jwtSecret || "your-secret-key";
  const hash = crypto
    .createHmac("sha256", secret)
    .update(email.toLowerCase())
    .digest("hex");
  return Buffer.from(`${email}:${hash}`).toString("base64url");
}

/**
 * Verify and decode unsubscribe token
 */
export function verifyUnsubscribeToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const [email, hash] = decoded.split(":");

    if (!email || !hash) return null;

    const config = useRuntimeConfig();
    const secret = config.jwtSecret || "your-secret-key";
    const expectedHash = crypto
      .createHmac("sha256", secret)
      .update(email.toLowerCase())
      .digest("hex");

    if (hash === expectedHash) {
      return email;
    }

    return null;
  } catch (e) {
    return null;
  }
}

/**
 * Generate unsubscribe URL
 */
export function getUnsubscribeUrl(email: string): string {
  const token = generateUnsubscribeToken(email);
  const isDevelopment = process.env.NODE_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:3000"
    : "https://borysbabas.dev";
  return `${baseUrl}/newsletter/unsubscribe?token=${token}`;
}

/**
 * Send email using configured transporter
 */
export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const transporter = getEmailTransporter();
  const isDevelopment = process.env.NODE_ENV === "development";

  await transporter.sendMail({
    from: isDevelopment
      ? "noreply@localhost"
      : process.env.SMTP_FROM || "noreply@borysbabas.dev",
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
}
