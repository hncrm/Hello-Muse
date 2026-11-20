import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL_PLACEHOLDER, isTopicValue } from "@/lib/enquiries";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact HHX Services about Microsoft Power Apps, Dataverse and Power Platform for your small business.",
};

// Reads ?topic= at request time (deep-link prefill). `instant = false`
// allows this page to render dynamically at request time instead of being
// prerendered (Next 16 cacheComponents-compatible blocking route).
export const instant = false;

const RESPONSE_TIME = "[X working days — to be confirmed]";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const params = await searchParams;
  const initialTopic = isTopicValue(params.topic) ? params.topic : undefined;
  return (
    <div className="bg-surface">
      <div className="container-x py-16 md:py-24">
        <p className="eyebrow">Microsoft Power Platform consultancy</p>
        <h1 className="hero-title max-w-[720px]" style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)" }}>
          Let&rsquo;s talk about your process
        </h1>
        <p className="text-lg text-muted max-w-[720px]">
          Tell us about one process you&rsquo;d like to simplify. We&rsquo;ll reply with the
          simplest next step — no obligation, and no sales pitch.
        </p>
        <p className="max-w-[720px]">
          <strong>What happens next:</strong> we reply by email, we book a free 15-minute
          chat if it&rsquo;s useful, and if there&rsquo;s a fit, we send a fixed proposal for
          one small first step.
        </p>

        <div className="grid gap-8 mt-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="max-w-[640px] w-full">
            <ContactForm initialTopic={initialTopic} />
          </div>

          <aside className="rounded-[20px] border border-line bg-white p-6 md:p-8 h-fit shadow-[0_8px_30px_rgba(1,10,36,0.06)]">
            <h2 className="text-navy text-xl mt-0">What happens next</h2>
            <ol className="pl-5 space-y-3">
              <li>
                <strong>You send this form</strong> — Two minutes, no commitment.
              </li>
              <li>
                <strong>We reply by email</strong> — With the simplest next step, usually
                within {RESPONSE_TIME}.
              </li>
              <li>
                <strong>A free 15-minute chat</strong> — Only if it&rsquo;s useful.
                We&rsquo;ll ask what &ldquo;done&rdquo; looks like.
              </li>
              <li>
                <strong>A fixed proposal</strong> — Scope, timeline and price for one small
                first step. No open-ended hourly billing.
              </li>
            </ol>

            <hr className="border-line my-6" />

            <h2 className="text-navy text-xl mt-0">Prefer email?</h2>
            <p>
              If you&rsquo;d rather write directly, email us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL_PLACEHOLDER}`}
                className="text-brand underline"
              >
                {CONTACT_EMAIL_PLACEHOLDER}
              </a>{" "}
              (placeholder — Huy to confirm the real address). We&rsquo;ll reply to that
              address the same way.
            </p>

            <hr className="border-line my-6" />

            <h2 className="text-navy text-xl mt-0">Still deciding?</h2>
            <p>
              <Link href="/process" className="text-brand underline">
                See how we work →
              </Link>
            </p>
            <p>
              <Link href="/services" className="text-brand underline">
                See what we do →
              </Link>
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
