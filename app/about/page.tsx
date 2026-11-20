import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About HHX Services — a Microsoft Power Platform consultancy for small businesses.",
};

export default function AboutPage() {
  return (
    <>
      <section className="section-pale section-sm">
        <div className="container-x">
          <p className="eyebrow">About HHX Services</p>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)" }}>
            Small-business specialists, not a big IT firm.
          </h1>
          <p className="lead text-muted max-w-[760px]">
            HHX Services is a Microsoft Power Apps, Dataverse and Power Platform consultancy built
            for small businesses — the kind of business where one person wears several hats and
            there is no IT department down the hall.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container-x">
          <h2 className="section-title">What we believe</h2>
          <div className="grid gap-6 md:grid-cols-3 mt-10">
            <article className="card-light">
              <span className="icon-tile" aria-hidden="true">
                1
              </span>
              <h3 className="text-navy text-xl font-bold mt-0">Start small.</h3>
              <p>
                Fix one painful process well, then decide what comes next. No big-bang projects.
              </p>
            </article>
            <article className="card-light">
              <span className="icon-tile" aria-hidden="true">
                2
              </span>
              <h3 className="text-navy text-xl font-bold mt-0">Use what you already have.</h3>
              <p>
                If your business runs on Microsoft 365, Power Platform is often the shortest path
                to a working app.
              </p>
            </article>
            <article className="card-light">
              <span className="icon-tile" aria-hidden="true">
                3
              </span>
              <h3 className="text-navy text-xl font-bold mt-0">Hand it over properly.</h3>
              <p>
                Your team should be able to run, change and understand what we built — with
                training, not a black box.
              </p>
            </article>
          </div>

          <div className="grid gap-10 md:grid-cols-2 mt-16">
            <section>
              <h2 className="text-navy text-2xl font-bold">What we do — and what we don’t</h2>
              <p>
                We build focused Power Apps, clean Dataverse data models, Power Automate flows and
                simple Power BI views. We don’t sell licences you don’t need, and we don’t take on
                work where a spreadsheet is genuinely the right answer — we’ll tell you so.
              </p>
            </section>
            <section>
              <h2 className="text-navy text-2xl font-bold">Who this is for</h2>
              <p>
                Small businesses that track jobs, customers, approvals or stock in spreadsheets
                and email, and want one simple system their team will actually use.
              </p>
              <p className="text-sm text-muted">
                Founder and team details are placeholders — to be added once confirmed.
              </p>
            </section>
          </div>

          <p className="mt-12">
            <Link href="/contact" className="btn btn-primary">
              Talk to us about your business
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
