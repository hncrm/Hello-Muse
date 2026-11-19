"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CONTACT_EMAIL_PLACEHOLDER,
  MESSAGE_MIN_LENGTH,
  TOPIC_OPTIONS,
  isTopicValue,
  topicLabel,
  validateEnquiry,
  type EnquiryInput,
  type FieldErrors,
} from "@/lib/enquiries";

/**
 * Contact form — redesign spec hhx-contact-form-redesign-2026-11-19.md.
 * 5 fields, validation on blur + submit, inline errors, error summary,
 * honeypot (no CAPTCHA), confirmation replaces the form in place.
 * Submits to POST /api/contact, which records the enquiry in
 * data/enquiries.json. Never shows a success state unless the server
 * confirms the enquiry was stored.
 */

type Values = EnquiryInput;

const EMPTY: Values = {
  name: "",
  email: "",
  company: "",
  topic: "",
  message: "",
  company_website: "",
};

const FIELD_ORDER: (keyof FieldErrors)[] = ["name", "email", "topic", "message"];
const ERROR_SUMMARY_LABELS: Record<keyof FieldErrors, string> = {
  name: "Enter your name",
  email: "Enter a work email address",
  topic: 'Choose what you need help with',
  message: "Tell us about your process",
};

const RESPONSE_TIME = "[X working days — to be confirmed]";

function firstName(name: string): string {
  const first = name.trim().split(/\s+/)[0];
  return first || "";
}

export default function ContactForm({ initialTopic }: { initialTopic?: string }) {
  // Deep-link prefill: /contact?topic=power-apps (etc.) pre-selects the
  // dropdown. Passed in from the server component (no useSearchParams, so
  // the form renders in the initial HTML).
  const [values, setValues] = useState<Values>(() =>
    initialTopic && isTopicValue(initialTopic) ? { ...EMPTY, topic: initialTopic } : EMPTY,
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ name: string; email: string; topic?: string } | null>(null);

  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function validateField(field: keyof FieldErrors, next: Values): string | undefined {
    return validateEnquiry(next)[field];
  }

  function handleChange(field: keyof Values, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    // Once a field has shown an error, re-validate on every change so the
    // error clears the moment it is fixed.
    if (touched[field]) {
      setErrors((prev) => {
        const err = validateField(field as keyof FieldErrors, next);
        const copy = { ...prev };
        if (err) copy[field as keyof FieldErrors] = err;
        else delete copy[field as keyof FieldErrors];
        return copy;
      });
    }
  }

  function handleBlur(field: keyof Values) {
    setTouched((t) => ({ ...t, [field]: true }));
    const err = validateField(field as keyof FieldErrors, values);
    setErrors((prev) => {
      const copy = { ...prev };
      if (err) copy[field as keyof FieldErrors] = err;
      else delete copy[field as keyof FieldErrors];
      return copy;
    });
  }

  function focusField(field: string) {
    fieldRefs.current[field]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateEnquiry(values);
    setTouched({ name: true, email: true, topic: true, message: true });
    setErrors(errs);
    setSubmitError(null);
    if (Object.keys(errs).length > 0) {
      const first = FIELD_ORDER.find((f) => errs[f]);
      if (first) {
        // Let the summary render, then focus the first invalid field.
        requestAnimationFrame(() => focusField(first));
      }
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        const serverErrors =
          data && typeof data === "object" && "errors" in data
            ? (data as { errors: FieldErrors }).errors
            : null;
        if (serverErrors && Object.keys(serverErrors).length > 0) {
          setErrors(serverErrors);
          setTouched({ name: true, email: true, topic: true, message: true });
          const first = FIELD_ORDER.find((f) => serverErrors[f]);
          if (first) requestAnimationFrame(() => focusField(first));
        } else {
          setSubmitError(
            `Sorry — your message didn't send. Please check your connection and try again, or email us directly at ${CONTACT_EMAIL_PLACEHOLDER}.`,
          );
        }
        setStatus("error");
        return;
      }
      const ref =
        data && typeof data === "object" && "reference" in data
          ? String((data as { reference: string }).reference)
          : null;
      setReference(ref);
      setConfirmed({
        name: values.name.trim(),
        email: values.email.trim(),
        topic: topicLabel(values.topic),
      });
      setStatus("success");
    } catch {
      setSubmitError(
        `Sorry — your message didn't send. Please check your connection and try again, or email us directly at ${CONTACT_EMAIL_PLACEHOLDER}.`,
      );
      setStatus("error");
    }
  }

  // ---- Confirmation (replaces the form in place) ----
  if (status === "success" && confirmed) {
    const first = firstName(confirmed.name);
    return (
      <div className="rounded-xl border border-line bg-white p-8 shadow-[0_1px_3px_rgba(15,42,68,0.08)] border-l-4 border-l-teal-accent">
        <div role="status">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            aria-hidden="true"
            className="mb-3"
          >
            <circle cx="16" cy="16" r="15" fill="#0e7490" />
            <path
              d="M9 16.5l4.5 4.5L23 11"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2
            ref={successRef}
            tabIndex={-1}
            className="text-navy text-2xl mt-0 focus:outline-none"
          >
            {first
              ? `Thank you, ${first} — we've got your message.`
              : "Thank you — we've got your message."}
          </h2>
          {confirmed.topic && (
            <p>
              <strong>You asked about:</strong> {confirmed.topic}
            </p>
          )}
          <p>
            We&rsquo;ll reply to <strong>{confirmed.email}</strong> within{" "}
            {RESPONSE_TIME}. Your reply will come from a person, not an automated
            sequence, and it will suggest the simplest next step — usually a free
            15-minute chat.
          </p>
          <ol className="pl-5 space-y-1.5">
            <li>We read your message and check the simplest Microsoft option.</li>
            <li>We reply by email.</li>
            <li>If it&rsquo;s useful, we book a free 15-minute chat.</li>
          </ol>
          {reference && (
            <p className="text-sm text-muted">
              Your enquiry reference: <strong>{reference}</strong>
            </p>
          )}
          <p>
            Need to add something? Reply to our email when it arrives, or write to
            us now at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL_PLACEHOLDER}`}
              className="text-brand underline"
            >
              {CONTACT_EMAIL_PLACEHOLDER}
            </a>
            .
          </p>
          <p className="mt-6">
            <Link
              href="/process"
              className="inline-block bg-brand text-white px-6 py-3.5 rounded-lg no-underline font-bold hover:bg-brand-dark min-h-12"
            >
              See how we work →
            </Link>{" "}
            <Link href="/" className="text-brand underline ml-3">
              Back to home →
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const errorFields = FIELD_ORDER.filter((f) => errors[f]);

  return (
    <div className="rounded-xl border border-line bg-white p-5 md:p-8 shadow-[0_1px_3px_rgba(15,42,68,0.08)]">
      {submitError && (
        <div role="alert" className="rounded-lg border border-[#dc2626] bg-[#fef2f2] px-4 py-3 mb-5">
          <p className="mt-0 mb-0 text-[#b91c1c]">{submitError}</p>
        </div>
      )}

      {errorFields.length > 0 && (
        <div
          ref={summaryRef}
          role="alert"
          className="rounded-lg border border-[#dc2626] bg-[#fef2f2] px-4 py-3 mb-5"
        >
          <h2 className="text-[#b91c1c] text-base mt-0 mb-2">There is a problem</h2>
          <ul className="m-0 pl-5">
            {errorFields.map((f) => (
              <li key={f}>
                <a
                  href={`#${f}`}
                  className="text-[#b91c1c] underline"
                  onClick={(e) => {
                    e.preventDefault();
                    focusField(f);
                  }}
                >
                  {ERROR_SUMMARY_LABELS[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-sm text-muted mt-0">Fields marked * are required.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="field-label">
              Your name *
            </label>
            <input
              ref={(el) => {
                fieldRefs.current["name"] = el;
              }}
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={100}
              required
              className="field-input"
              placeholder="Alex Morgan"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="field-error">
                <span aria-hidden="true">! </span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Work email */}
          <div>
            <label htmlFor="email" className="field-label">
              Work email *
            </label>
            <p id="email-helper" className="field-hint">
              We&rsquo;ll only use this to reply to you.
            </p>
            <input
              ref={(el) => {
                fieldRefs.current["email"] = el;
              }}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              maxLength={254}
              required
              className="field-input"
              placeholder="alex@company.com"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : "email-helper"}
            />
            {errors.email && (
              <p id="email-error" className="field-error">
                <span aria-hidden="true">! </span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Company (optional) */}
          <div>
            <label htmlFor="company" className="field-label">
              Company <span className="optional">(optional)</span>
            </label>
            <p id="company-helper" className="field-hint">
              So we can understand the size and shape of your team.
            </p>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={100}
              className="field-input"
              placeholder="Morgan Plumbing Ltd"
              value={values.company ?? ""}
              onChange={(e) => handleChange("company", e.target.value)}
              aria-describedby="company-helper"
            />
          </div>

          {/* Topic dropdown */}
          <div>
            <label htmlFor="topic" className="field-label">
              What do you need help with? *
            </label>
            <p id="topic-helper" className="field-hint">
              Choose the closest match — you can explain more below.
            </p>
            <select
              ref={(el) => {
                fieldRefs.current["topic"] = el;
              }}
              id="topic"
              name="topic"
              required
              className="field-input"
              value={values.topic ?? ""}
              onChange={(e) => handleChange("topic", e.target.value)}
              onBlur={() => handleBlur("topic")}
              aria-invalid={errors.topic ? true : undefined}
              aria-describedby={errors.topic ? "topic-error" : "topic-helper"}
            >
              <option value="" disabled>
                Choose one…
              </option>
              {TOPIC_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {errors.topic && (
              <p id="topic-error" className="field-error">
                <span aria-hidden="true">! </span>
                {errors.topic}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="field-label">
              Tell us about your process *
            </label>
            <p id="message-helper" className="field-hint">
              One or two sentences is enough. What takes too much time today, and who
              does it?
            </p>
            <textarea
              ref={(el) => {
                fieldRefs.current["message"] = el;
              }}
              id="message"
              name="message"
              rows={5}
              required
              minLength={MESSAGE_MIN_LENGTH}
              maxLength={2000}
              className="field-input resize-y"
              placeholder="We track jobs in spreadsheets and want a simple app for our team."
              value={values.message}
              onChange={(e) => handleChange("message", e.target.value)}
              onBlur={() => handleBlur("message")}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "message-error" : "message-helper"}
            />
            <p className="field-hint text-right" aria-hidden="true">
              {values.message.length} / 2000
            </p>
            {errors.message && (
              <p id="message-error" className="field-error">
                <span aria-hidden="true">! </span>
                {errors.message}
              </p>
            )}
          </div>

          {/* Honeypot — visually hidden (not display:none), invisible to
              humans, no CAPTCHA. Spec §3.5: visually hidden, not removed
              from the DOM, so bots can still fill it. */}
          <div aria-hidden="true" className="sr-only">
            <label htmlFor="company_website">Leave this field empty</label>
            <input
              id="company_website"
              name="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.company_website ?? ""}
              onChange={(e) => handleChange("company_website", e.target.value)}
            />
          </div>

          <div className="mt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full md:w-auto md:min-w-[220px] min-h-12 bg-brand text-white font-bold text-base px-6 py-3.5 rounded-lg border-0 cursor-pointer hover:bg-brand-dark disabled:opacity-65 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending…" : "Send my enquiry"}
            </button>
            <p className="text-sm text-muted mt-2">
              We only use your details to reply to your enquiry. We never share them.
            </p>
            <p className="text-sm text-muted">
              No obligation · Fixed proposal before any build · We reply within{" "}
              {RESPONSE_TIME}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
