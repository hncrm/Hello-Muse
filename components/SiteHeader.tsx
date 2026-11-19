"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="bg-navy text-white sticky top-0 z-10">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 min-h-16">
        <Link href="/" className="font-extrabold text-xl text-white no-underline">
          HHX Services
        </Link>
        <nav className="flex flex-wrap gap-x-1 gap-y-1" aria-label="Main navigation">
          {NAV.map((item) => {
            const current =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`px-2 py-2 rounded text-[#dbeafe] no-underline hover:text-white hover:underline ${
                  current ? "text-white font-bold underline" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          className="hidden md:inline-block bg-brand text-white px-4 py-2.5 rounded-lg no-underline font-bold text-sm hover:bg-brand-dark min-h-11"
        >
          Book a free 15-minute chat
        </Link>
      </div>
    </header>
  );
}
