import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Example engagements from HHX Services — real client stories will be added here once confirmed.",
};

export default function CaseStudiesPage() {
  return (
    <div className="container-x py-10">
      <p className="eyebrow">Case studies &amp; testimonials</p>
      <h1 className="text-4xl text-navy">Real work, real small businesses.</h1>
      <p className="text-lg text-muted">
        This page will hold short case studies from HHX engagements — the problem, what was built,
        and what changed. No client names or results are published until the client agrees.
      </p>

      <div className="border border-dashed border-[#cbd5e1] rounded-xl p-6 bg-surface mt-8">
        <p className="font-bold text-navy mt-0">
          Placeholder — case studies to be added
        </p>
        <p>
          Each case study will follow this shape:
        </p>
        <ul className="space-y-1">
          <li>
            <strong>Client (type of business):</strong> e.g. “a small trades business” — named
            only with permission.
          </li>
          <li>
            <strong>The problem:</strong> the manual process that was costing time.
          </li>
          <li>
            <strong>What we built:</strong> the Power App, Dataverse model or automation.
          </li>
          <li>
            <strong>What changed:</strong> the result, in the client’s own words where possible.
          </li>
        </ul>
        <p className="text-muted text-sm">
          No client names, testimonials or results have been invented here — this page is a
          template until real, approved stories are supplied.
        </p>
      </div>

      <section className="py-8">
        <h2 className="text-navy text-2xl">What clients can expect</h2>
        <p>
          Every engagement starts with a short chat and a fixed proposal for the first step, and
          ends with training so your team can run what we built. See{" "}
          <Link href="/process" className="text-brand underline">
            how we work
          </Link>
          .
        </p>
      </section>

      <p>
        <Link
          href="/contact"
          className="inline-block bg-brand text-white px-[18px] py-3 rounded-lg no-underline font-bold hover:bg-brand-dark"
        >
          Become our next case study
        </Link>
      </p>
    </div>
  );
}
