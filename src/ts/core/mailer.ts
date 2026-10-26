// SERVICE LAYER — pengiriman pesan "Hire me?" ke inbox lewat FormSubmit (tanpa backend sendiri).
// Kiriman pertama memicu email aktivasi ke alamat tujuan; setelah link "Activate Form" diklik,
// semua pesan berikutnya langsung masuk inbox.
import { t } from "./i18n.js";

export interface HireMessage {
  name: string;
  email: string;
  message: string;
  /** honeypot anti-spam: manusia tidak pernah mengisinya */
  trap?: string;
}

export type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "activation" | "rejected" | "network"; detail: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(msg: HireMessage): FieldErrors {
  const errors: FieldErrors = {};
  if (msg.name.trim().length < 2) errors.name = t("hire.err.name");
  if (!EMAIL_RE.test(msg.email.trim())) errors.email = t("hire.err.email");
  if (msg.message.trim().length < 10) errors.message = t("hire.err.message");
  return errors;
}

export async function sendHireMessage(to: string, msg: HireMessage, signal?: AbortSignal): Promise<SendResult> {
  // bot mengisi honeypot -> pura-pura sukses, tidak dikirim
  if (msg.trap) return { ok: true };

  const name = msg.name.trim();
  const email = msg.email.trim();
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURI(to.trim())}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name,
        email,
        message: msg.message.trim(),
        _subject: `Hire me? — pesan baru dari ${name}`,
        _replyto: email,
        _template: "table",
        _captcha: "false",
      }),
      signal,
    });
    const body: { success?: string | boolean; message?: string } = await res.json().catch(() => ({}));
    if (res.ok && String(body.success) === "true") return { ok: true };

    const detail = String(body.message ?? `HTTP ${res.status}`);
    if (/activat/i.test(detail)) return { ok: false, reason: "activation", detail };
    return { ok: false, reason: "rejected", detail };
  } catch (err) {
    return { ok: false, reason: "network", detail: String(err) };
  }
}
