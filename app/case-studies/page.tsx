import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Example engagements from HHX Services — real client stories will be added here once confirmed.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="section-pale section-sm">
        <div className="container-x">
          <p className="eyebrow">Case studies &amp; testimonials</p>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)" }}>
            Real work, real small businesses.
          </h1>
          <p className="lead text-muted max-w-[760px]">
            This page will hold short case studies from HHX engagements — the problem, what was
            built, and what changed. No client names or results are published until the client
            agrees.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container-x">
          <div className="border border-dashed border-[#cbd5e1] rounded-[20px] p-8 bg-surface">
            <p className="font-bold text-navy mt-0">Placeholder — case studies to be added</p>
            <p>Each case study will follow this shape:</p>
            <ul className="space-y-1">
              <li>
                <strong>Client (type of business):</strong> e.g. “a small trades business” —
                named only with permission.
              </li>
              <li>
                <strong>The problem:</strong> the manual process that was costing time.
              </li>
              <li>
                <strong>What we built:</strong> the Power App, Dataverse model or automation.
              </li>
              <li>
                <strong>What changed:</strong> the result, in the client’s own words where
                possible.
              </li>
            </ul>
            <p className="text-muted text-sm mb-0">
              No client names, testimonials or results have been invented here — this page is a
              template until real, approved stories are supplied.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="section-title">What clients can expect</h2>
            <p className="max-w-[720px]">
              Every engagement starts with a short chat and a fixed proposal for the first step,
              and ends with training so your team can run what we built. See{" "}
              <Link href="/process" className="read-more">
                how we work
              </Link>
              .
            </p>
            <p className="mt-8">
              <Link href="/contact" className="btn btn-primary">
                Become our next case study
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
