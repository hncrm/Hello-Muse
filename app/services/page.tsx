import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Power Apps, Dataverse and Power Platform services for small businesses from HHX Services.",
};

const SERVICES = [
  {
    title: "Power Apps",
    topic: "power-apps",
    icon: "◈",
    problem:
      "Approvals, job tracking or customer details live in spreadsheets, email and paper.",
    help: "We build a focused app your team can use on phone or desktop — for example, a job tracker, a leave request app, or a simple customer record.",
    result: "Less chasing, fewer errors, and everyone working from the same information.",
  },
  {
    title: "Dataverse",
    topic: "dataverse",
    icon: "▦",
    problem:
      "The same customer or job details are entered in three places, and none of them agree.",
    help: "We design a clean Dataverse data model with proper security, so your apps and reports share one trusted source.",
    result: "Reliable data, controlled access, and a foundation you can build on later.",
  },
  {
    title: "Power Platform & Automation",
    topic: "automation",
    icon: "✦",
    problem:
      "Repetitive admin — copying data, sending reminders, chasing approvals — eats up the week.",
    help: "We automate those steps with Power Automate, and add simple Power BI views so you can see jobs, sales or workloads at a glance.",
    result: "Time back for the work that actually needs a person.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="section-pale section-sm">
        <div className="container-x">
          <p className="eyebrow">Services</p>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)" }}>
            Services
          </h1>
          <p className="lead text-muted max-w-[720px]">
            Built for small businesses: practical, focused, and easy for your team to use.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container-x grid gap-6">
          {SERVICES.map((s) => (
            <article key={s.title} className="card-light">
              <span className="icon-tile" aria-hidden="true">
                {s.icon}
              </span>
              <h2 className="text-navy text-2xl font-bold mt-0">{s.title}</h2>
              <p>
                <strong>The problem:</strong> {s.problem}
              </p>
              <p>
                <strong>How we help:</strong> {s.help}
              </p>
              <p>
                <strong>Result:</strong> {s.result}
              </p>
              <p className="mb-0">
                <Link href={`/contact?topic=${s.topic}`} className="read-more">
                  Discuss a {s.title} project
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-dark section-sm">
        <div className="container-x">
          <h2 className="section-title">How pricing works</h2>
          <p className="lead max-w-[720px]">
            Every engagement starts with a short chat and a fixed proposal for the first step. No
            open-ended hourly billing without a clear scope.
          </p>
          <p className="mt-8">
            <Link href="/contact" className="btn btn-primary">
              Ask about your project
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
