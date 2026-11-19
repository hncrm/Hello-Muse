import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About HHX Services — a Microsoft Power Platform consultancy for small businesses.",
};

export default function AboutPage() {
  return (
    <div className="container-x py-10">
      <p className="eyebrow">About HHX Services</p>
      <h1 className="text-4xl text-navy">Small-business specialists, not a big IT firm.</h1>
      <p className="text-lg text-muted">
        HHX Services is a Microsoft Power Apps, Dataverse and Power Platform consultancy built for
        small businesses — the kind of business where one person wears several hats and there is no
        IT department down the hall.
      </p>

      <section className="py-6">
        <h2 className="text-navy text-2xl">What we believe</h2>
        <ul className="space-y-2 mt-3">
          <li>
            <strong>Start small.</strong> Fix one painful process well, then decide what comes
            next. No big-bang projects.
          </li>
          <li>
            <strong>Use what you already have.</strong> If your business runs on Microsoft 365,
            Power Platform is often the shortest path to a working app.
          </li>
          <li>
            <strong>Hand it over properly.</strong> Your team should be able to run, change and
            understand what we built — with training, not a black box.
          </li>
        </ul>
      </section>

      <section className="py-6 border-t border-line">
        <h2 className="text-navy text-2xl">What we do — and what we don’t</h2>
        <p>
          We build focused Power Apps, clean Dataverse data models, Power Automate flows and simple
          Power BI views. We don’t sell licences you don’t need, and we don’t take on work where a
          spreadsheet is genuinely the right answer — we’ll tell you so.
        </p>
      </section>

      <section className="py-6 border-t border-line">
        <h2 className="text-navy text-2xl">Who this is for</h2>
        <p>
          Small businesses that track jobs, customers, approvals or stock in spreadsheets and
          email, and want one simple system their team will actually use.
        </p>
        <p className="text-sm text-muted">
          Founder and team details are placeholders — to be added once confirmed.
        </p>
      </section>

      <p className="mt-6">
        <Link
          href="/contact"
          className="inline-block bg-brand text-white px-[18px] py-3 rounded-lg no-underline font-bold hover:bg-brand-dark"
        >
          Talk to us about your business
        </Link>
      </p>
    </div>
  );
}
