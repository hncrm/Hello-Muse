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
          className="inline-block bg-brand text-white px-[18px] py-3 rounded-lg no-underline font-bold hover:bg-brand-dark"
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
