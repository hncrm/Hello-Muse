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
    problem:
      "Approvals, job tracking or customer details live in spreadsheets, email and paper.",
    help: "We build a focused app your team can use on phone or desktop — for example, a job tracker, a leave request app, or a simple customer record.",
    result: "Less chasing, fewer errors, and everyone working from the same information.",
  },
  {
    title: "Dataverse",
    topic: "dataverse",
    problem:
      "The same customer or job details are entered in three places, and none of them agree.",
    help: "We design a clean Dataverse data model with proper security, so your apps and reports share one trusted source.",
    result: "Reliable data, controlled access, and a foundation you can build on later.",
  },
  {
    title: "Power Platform & Automation",
    topic: "automation",
    problem:
      "Repetitive admin — copying data, sending reminders, chasing approvals — eats up the week.",
    help: "We automate those steps with Power Automate, and add simple Power BI views so you can see jobs, sales or workloads at a glance.",
    result: "Time back for the work that actually needs a person.",
  },
];

export default function ServicesPage() {
  return (
    <div className="container-x py-10">
      <h1 className="text-4xl text-navy">Services</h1>
      <p className="text-lg text-muted">
        Built for small businesses: practical, focused, and easy for your team to use.
      </p>

      {SERVICES.map((s) => (
        <section key={s.title} className="border-t border-line py-6">
          <h2 className="text-navy text-2xl">{s.title}</h2>
          <p>
            <strong>The problem:</strong> {s.problem}
          </p>
          <p>
            <strong>How we help:</strong> {s.help}
          </p>
          <p>
            <strong>Result:</strong> {s.result}
          </p>
          <p>
            <Link href={`/contact?topic=${s.topic}`} className="text-brand underline">
              Discuss a {s.title} project →
            </Link>
          </p>
        </section>
      ))}

      <section className="bg-surface border border-line rounded-xl p-6 mt-6">
        <h2 className="text-navy text-2xl mt-0">How pricing works</h2>
        <p>
          Every engagement starts with a short chat and a fixed proposal for the first step. No
          open-ended hourly billing without a clear scope.
        </p>
        <p>
          <Link
            href="/contact"
            className="inline-block bg-brand text-white px-[18px] py-3 rounded-lg no-underline font-bold hover:bg-brand-dark"
          >
            Ask about your project
          </Link>
        </p>
      </section>
    </div>
  );
}
