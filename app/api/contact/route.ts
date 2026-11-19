import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  validateEnquiry,
  CONTACT_EMAIL_PLACEHOLDER,
  type Enquiry,
  type EnquiryInput,
} from "@/lib/enquiries";

/**
 * Interim enquiry store (local only).
 *
 * Submissions are appended to data/enquiries.json on the server running this
 * app. No email is sent yet — the address enquiries should be notified to is
 * recorded on each record as `notifyEmail` (from CONTACT_NOTIFY_EMAIL, default
 * "hello@hhxservices.example", which is a PLACEHOLDER — Huy to confirm the
 * real address before go-live).
 *
 * Future destination: save to Dataverse via Power Pages / Dataverse Web API,
 * or send email via a transactional provider. See README.md.
 *
 * Spam: a honeypot field (`company_website`) is rejected silently — the
 * response still looks like success so a bot learns nothing.
 * Rate limit: 10 submissions per IP per minute (in-memory, best effort).
 */
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "enquiries.json");

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function notifyEmail(): string {
  return process.env.CONTACT_NOTIFY_EMAIL ?? CONTACT_EMAIL_PLACEHOLDER;
}

async function readAll(): Promise<Enquiry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Enquiry[]) : [];
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many enquiries from this address. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const input = (body ?? {}) as EnquiryInput;

  // Honeypot: filled => bot. Pretend success, store nothing.
  if (input.company_website && input.company_website.trim() !== "") {
    return NextResponse.json(
      { ok: true, reference: `HHX-${Date.now().toString(36).toUpperCase()}`, id: "honeypot" },
      { status: 201 },
    );
  }

  const errors = validateEnquiry({
    name: input.name ?? "",
    email: input.email ?? "",
    company: input.company ?? "",
    topic: input.topic ?? "",
    message: input.message ?? "",
  });
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const enquiry: Enquiry = {
    id: randomUUID(),
    reference: `HHX-${Date.now().toString(36).toUpperCase()}`,
    receivedAt: new Date().toISOString(),
    name: input.name.trim(),
    email: input.email.trim(),
    company: input.company?.trim() || undefined,
    topic: input.topic!.trim(),
    message: input.message.trim(),
    notifyEmail: notifyEmail(),
  };

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const all = await readAll();
    all.push(enquiry);
    await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2) + "\n", "utf-8");
  } catch (err) {
    console.error("Failed to store enquiry:", err);
    return NextResponse.json(
      { error: "We couldn't save your enquiry. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { ok: true, reference: enquiry.reference, id: enquiry.id },
    { status: 201 },
  );
}
