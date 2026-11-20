import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-16">
      <p className="eyebrow">Page not found</p>
      <h1 className="text-4xl text-navy">That page doesn&rsquo;t exist.</h1>
      <p className="text-lg text-muted">
        The link may be out of date, or the page may have moved.
      </p>
      <p>
        <Link
          href="/"
          className="btn btn-primary"
        >
          Back to home
        </Link>{" "}
        <Link href="/contact" className="text-brand underline ml-2">
          Contact HHX Services →
        </Link>
      </p>
    </div>
  );
}
