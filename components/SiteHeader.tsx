"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="bg-white text-navy sticky top-0 z-10 shadow-[0_2px_16px_rgba(1,10,36,0.08)]">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 min-h-16">
        <Link href="/" className="font-extrabold text-xl text-navy no-underline">
          HHX <span className="text-brand">Services</span>
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
                className={`px-3 py-2 rounded-full text-navy no-underline hover:text-brand ${
                  current ? "text-brand font-bold" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/contact" className="btn btn-primary btn-no-arrow hidden md:inline-flex text-sm px-5 py-2.5 min-h-11">
          Book a free 15-minute chat
        </Link>
      </div>
    </header>
  );
}
