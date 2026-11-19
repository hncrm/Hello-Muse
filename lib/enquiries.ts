/**
 * Shared enquiry types + validation (client and server use the same rules).
 * Copy/error strings are from hhx-contact-form-redesign-2026-11-19.md §3.5.
 */

export const TOPIC_OPTIONS = [
  { value: "power-apps", label: "Power Apps — a simple app for my team" },
  { value: "dataverse", label: "Dataverse — one trusted place for our data" },
  { value: "automation", label: "Automation — Power Automate / Power BI" },
  { value: "not-sure", label: "Not sure yet — help me decide" },
] as const;

export type TopicValue = (typeof TOPIC_OPTIONS)[number]["value"];

export function topicLabel(value: string | undefined): string | undefined {
  return TOPIC_OPTIONS.find((o) => o.value === value)?.label;
}

export function isTopicValue(value: string | undefined): value is TopicValue {
  return TOPIC_OPTIONS.some((o) => o.value === value);
}

export type EnquiryInput = {
  name: string;
  email: string;
  company?: string;
  topic?: string;
  message: string;
  /** Honeypot — must stay empty; filled = bot, rejected silently server-side. */
  company_website?: string;
};

export type Enquiry = Omit<EnquiryInput, "company_website"> & {
  id: string;
  reference: string;
  receivedAt: string;
  /** Email address enquiries SHOULD be notified to once email sending is wired up. */
  notifyEmail: string;
};

export type FieldErrors = Partial<Record<"name" | "email" | "topic" | "message", string>>;

export const MESSAGE_MIN_LENGTH = 20;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(input: EnquiryInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.name || input.name.trim().length === 0) {
    errors.name = "Enter your name.";
  }
  if (!input.email || input.email.trim().length === 0) {
    errors.email = "Enter your work email address.";
  } else if (!EMAIL_RE.test(input.email.trim())) {
    errors.email = "Enter an email address in the format name@company.com.";
  }
  if (!input.topic || !isTopicValue(input.topic)) {
    errors.topic = 'Choose what you need help with — or choose "Not sure yet".';
  }
  if (!input.message || input.message.trim().length === 0) {
    errors.message = "Tell us a little about your process — even one sentence helps.";
  } else if (input.message.trim().length < MESSAGE_MIN_LENGTH) {
    errors.message = "Tell us a little more — a sentence or two about the process is enough.";
  }
  return errors;
}

/** Single source of truth for the (placeholder) contact address. */
export const CONTACT_EMAIL_PLACEHOLDER = "hello@hhxservices.example";
