import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HHX Services — Microsoft Power Apps, Dataverse & Power Platform for Small Businesses",
  description:
    "HHX Services helps small businesses build practical apps with Microsoft Power Apps, Dataverse and Power Platform.",
};

const buttonPrimary =
  "inline-block bg-brand text-white px-[18px] py-3 rounded-lg no-underline font-bold hover:bg-brand-dark";
const buttonSecondary =
  "inline-block bg-white text-navy border border-navy px-[18px] py-3 rounded-lg no-underline font-bold ml-2";

export default function HomePage() {
  return (
    <>
      <section className="bg-surface border-b border-line py-14">
        <div className="container-x">
          <p className="eyebrow">Microsoft Power Platform consultancy for small businesses</p>
          <h1 className="text-4xl leading-tight text-navy m-0 mb-4">
            Practical Microsoft apps, built for how your small business actually works.
          </h1>
          <p className="text-lg text-muted">
            HHX Services helps small businesses replace spreadsheets and manual work with Power
            Apps, Dataverse and Power Platform — without a big IT project.
          </p>
          <p className="mt-6">
            <Link href="/services" className={buttonPrimary}>
              See our services
            </Link>
            <Link href="/contact" className={buttonSecondary}>
              Book a chat
            </Link>
          </p>
        </div>
      </section>

      <section className="container-x py-10">
        <h2 className="text-navy text-2xl">What we do</h2>
        <div className="grid gap-4 md:grid-cols-3 mt-4">
          {[
            {
              title: "Power Apps",
              body: "Simple, focused apps for approvals, jobs, customers and field work — built around your team, not the other way around.",
            },
            {
              title: "Dataverse",
              body: "One clean, secure place for your business data, so your apps, reports and automations all work from the same source of truth.",
            },
            {
              title: "Power Platform",
              body: "Automate the repetitive bits with Power Automate, and see what matters with Power BI — starting small, then scaling what works.",
            },
          ].map((card) => (
            <article key={card.title} className="border border-line rounded-xl p-5 bg-white">
              <h3 className="text-navy text-lg mt-0">{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x py-10">
        <h2 className="text-navy text-2xl">How we work</h2>
        {/* Numbers are hard-coded in the item text ("1. Chat"), so the list
            itself must not add its own numbering (was rendering "1. 1. Chat"). */}
        <ol className="list-none p-0 mt-4 space-y-2.5">
          <li>
            <strong>1. Chat</strong> — a short call to understand the problem and what “done” looks
            like.
          </li>
          <li>
            <strong>2. Review</strong> — we look at your current process and data, and agree on a
            small first step.
          </li>
          <li>
            <strong>3. Proposal</strong> — a clear scope, timeline and price for that first step.
          </li>
          <li>
            <strong>4. Build</strong> — we build it, test it with your team, and hand it over with
            training.
          </li>
        </ol>
        <p className="mt-4">
          <Link href="/process" className="text-brand underline">
            See the full process →
          </Link>
        </p>
      </section>

      <section className="container-x py-10">
        <div className="bg-surface border border-line rounded-xl p-6">
          <h2 className="text-navy text-2xl mt-0">Not sure where to start?</h2>
          <p>
            Tell us about one manual process that takes too much time. We’ll suggest the simplest
            Microsoft option to fix it.
          </p>
          <p>
            <Link href="/contact" className={buttonPrimary}>
              Contact HHX Services
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
