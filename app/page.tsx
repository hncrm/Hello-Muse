import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HHX Services — Microsoft Power Apps, Dataverse & Power Platform for Small Businesses",
  description:
    "HHX Services helps small businesses build practical apps with Microsoft Power Apps, Dataverse and Power Platform.",
};

const MARQUEE_ITEMS = [
  "Power Apps",
  "Dataverse",
  "Power Automate",
  "Power BI",
  "Power Platform",
];

export default function HomePage() {
  return (
    <>
      {/* Hero — dark, dotted texture + teal glow, left text, right CSS visual panel */}
      <section className="section-dark relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container-x relative grid gap-12 lg:grid-cols-2 items-center py-8">
          <div>
            <p className="eyebrow eyebrow-on-dark">
              Microsoft Power Platform consultancy for small businesses
            </p>
            <h1 className="hero-title">
              Practical Microsoft apps, built for how your small business actually works.
            </h1>
            <p className="lead">
              HHX Services helps small businesses replace spreadsheets and manual work with Power
              Apps, Dataverse and Power Platform — without a big IT project.
            </p>
            <p className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="btn btn-primary">
                See our services
              </Link>
              <Link href="/contact" className="btn btn-ghost-dark">
                Book a chat
              </Link>
            </p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <span className="orb" />
            <div className="hero-panel">
              <h3>One place for your jobs, approvals &amp; customers</h3>
              <div className="hero-row">
                <span>Job tracker</span>
                <span className="pill">Power Apps</span>
              </div>
              <div className="hero-row">
                <span>Approvals</span>
                <span className="pill">Power Automate</span>
              </div>
              <div className="hero-row">
                <span>Customer records</span>
                <span className="pill">Dataverse</span>
              </div>
              <div className="hero-row">
                <span>Jobs &amp; sales at a glance</span>
                <span className="pill">Power BI</span>
              </div>
            </div>
            <div className="hero-chips">
              <span>Power Apps</span>
              <span>Dataverse</span>
              <span>Power Automate</span>
              <span>Power BI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <span key={copy}>
              {MARQUEE_ITEMS.map((item) => (
                <span key={`${copy}-${item}`}>{item} ·</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* What we do — dark service cards */}
      <section className="section-dark">
        <div className="container-x">
          <p className="eyebrow eyebrow-on-dark">What we do</p>
          <h2 className="section-title">
            Simple apps and clean data,
            <br />
            built around your team.
          </h2>
          <div className="grid gap-6 md:grid-cols-3 mt-10">
            {[
              {
                icon: "◈",
                title: "Power Apps",
                body: "Simple, focused apps for approvals, jobs, customers and field work — built around your team, not the other way around.",
              },
              {
                icon: "▦",
                title: "Dataverse",
                body: "One clean, secure place for your business data, so your apps, reports and automations all work from the same source of truth.",
              },
              {
                icon: "✦",
                title: "Power Platform",
                body: "Automate the repetitive bits with Power Automate, and see what matters with Power BI — starting small, then scaling what works.",
              },
            ].map((card) => (
              <article key={card.title} className="card-dark">
                <span className="icon-tile" aria-hidden="true">
                  {card.icon}
                </span>
                <h3 className="text-xl font-bold mt-0 mb-3">{card.title}</h3>
                <p>{card.body}</p>
                <p className="mt-5 mb-0">
                  <Link href="/services" className="read-more">
                    Read More
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How we work — pale section, numbered light cards */}
      <section className="section section-pale">
        <div className="container-x">
          <p className="eyebrow">How we work</p>
          <h2 className="section-title">
            Four steps to a working app,
            <br />
            no big IT project.
          </h2>
          {/* Numbers are hard-coded in the item text ("1. Chat"), so the list
              itself must not add its own numbering (was rendering "1. 1. Chat"). */}
          <ol className="list-none p-0 mt-10 grid gap-6 md:grid-cols-2">
            <li className="card-light">
              <strong className="text-brand text-lg">1. Chat</strong> — a short call to understand
              the problem and what “done” looks like.
            </li>
            <li className="card-light">
              <strong className="text-brand text-lg">2. Review</strong> — we look at your current
              process and data, and agree on a small first step.
            </li>
            <li className="card-light">
              <strong className="text-brand text-lg">3. Proposal</strong> — a clear scope,
              timeline and price for that first step.
            </li>
            <li className="card-light">
              <strong className="text-brand text-lg">4. Build</strong> — we build it, test it
              with your team, and hand it over with training.
            </li>
          </ol>
          <p className="mt-8">
            <Link href="/process" className="read-more">
              See the full process
            </Link>
          </p>
        </div>
      </section>

      {/* CTA — dark gradient */}
      <section className="section-dark">
        <div className="container-x text-center max-w-[760px]">
          <p className="eyebrow eyebrow-on-dark">Not sure where to start?</p>
          <h2 className="section-title">Tell us about one manual process that takes too much time.</h2>
          <p className="lead">
            We’ll suggest the simplest Microsoft option to fix it.
          </p>
          <p className="mt-8">
            <Link href="/contact" className="btn btn-primary">
              Contact HHX Services
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
