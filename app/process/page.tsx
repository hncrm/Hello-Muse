import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How HHX Services works with small businesses — from first chat to handover and support.",
};

const STEPS = [
  {
    title: "1. Chat",
    body: "A short call to understand the problem, who is affected by it, and what “done” looks like. No preparation needed — just bring the pain point.",
    outcome: "You leave knowing whether Power Platform is the right fit, and what the next step would cost.",
  },
  {
    title: "2. Review",
    body: "We look at your current process and data — spreadsheets, emails, paper forms — and map where time is lost and errors creep in.",
    outcome: "A short summary of what we found and the smallest useful first step.",
  },
  {
    title: "3. Proposal",
    body: "A clear, fixed-scope proposal for that first step: what will be built, how long it takes, and what it costs. No open-ended hourly billing without a clear scope.",
    outcome: "A written proposal you can approve, change, or walk away from — no obligation.",
  },
  {
    title: "4. Build",
    body: "We build the app, data model or automation, testing it with your team as we go so there are no surprises at the end.",
    outcome: "A working solution your team has already tried and shaped.",
  },
  {
    title: "5. Handover & training",
    body: "We hand over the solution with training for your team and simple documentation, so you can run it without us.",
    outcome: "Your team confident to use it day to day — and to ask for changes later.",
  },
  {
    title: "6. Support & improve",
    body: "Small fixes, tweaks and new steps as your business changes. Start small, then scale what works.",
    outcome: "A system that grows with the business instead of going stale.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="section-pale section-sm">
        <div className="container-x">
          <p className="eyebrow">How we work</p>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)" }}>
            A simple process, no big IT project.
          </h1>
          <p className="lead text-muted max-w-[720px]">
            Six steps, starting with a chat. You can stop after any step — the review and proposal
            cost you nothing but the conversation.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container-x">
          <ol className="list-none p-0 m-0 grid gap-6 md:grid-cols-2">
            {STEPS.map((s, i) => (
              <li key={s.title} className="card-light">
                <span className="icon-tile" aria-hidden="true">
                  {i + 1}
                </span>
                <h2 className="text-navy text-xl font-bold mt-0">{s.title}</h2>
                <p>{s.body}</p>
                <p className="text-muted text-sm mb-0">
                  <strong className="text-ink">Outcome:</strong> {s.outcome}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-12">
            <Link href="/contact" className="btn btn-primary">
              Start with step 1 — book a chat
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
