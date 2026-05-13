"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoBlack } from "./Logo";

const NAV_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Newspaper", href: "/newspaper-catalog" },
  { label: "Membership", href: "#" },
];

const EXPLORE_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Newspaper Catalog", href: "/newspaper-catalog" },
  { label: "Home", href: "/" },
];

// FIXME: keep in sync with Footer.tsx HISTORY_LINKS — slug for Part 1 not yet confirmed
const HISTORY_LINKS = [
  {
    label: "Movement in Serbia",
    href: "/history/serbian-national-movement-outside-of-serbia",
  },
  {
    label: "Testimonies",
    href: "/history/foreign-testimonies-about-chetniks-and-general-mihalovic",
  },
  {
    label: "Movement Outside of Serbia",
    href: "/history/serbian-national-movement-outside-of-serbia",
  },
  { label: "Symbols & Traditions", href: "/history/symbols-and-traditions" },
  { label: "Celebrations", href: "/history/celebrations-and-commemorations" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-offwhite-1 border-b border-blue-2 w-full">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 flex items-center justify-between pb-5 pt-1">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <LogoBlack />
          </Link>

          <div className="flex items-center">
            {/* Desktop: nav links + Login in one row with vertical dividers */}
            <div className="hidden xl:flex items-center">
              {[...NAV_LINKS, { label: "Login", href: "#" }].map(({ label, href }, i) => (
                <div key={label} className="flex items-center">
                  {i > 0 && <div className="w-px h-[18px] bg-black mx-[var(--space-3)]" />}
                  <Link href={href} className="type-ui-medium font-bold text-black whitespace-nowrap">
                    {label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Phone / tablet: hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="xl:hidden p-1"
              aria-label="Open menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="3"
                  y1="18"
                  x2="21"
                  y2="18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Phone / tablet: full-screen dropdown overlay */}
      {menuOpen && (
        <div className="xl:hidden fixed inset-0 z-[100] flex flex-col">
          {/* Mirror the navbar bar with X instead of hamburger */}
          <div className="bg-offwhite-1 border-b border-blue-2 shrink-0">
            <div className="max-w-[1512px] mx-auto px-4 md:px-6 flex items-center justify-between pb-5 pt-1">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <LogoBlack />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1"
                aria-label="Close menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    stroke="#153c8c"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    stroke="#153c8c"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Dropdown content */}
          <div className="bg-offwhite-2 flex-1 overflow-y-auto py-[22px] px-4 md:px-6">
            <div className="flex flex-col gap-[var(--space-4)]">
              {/* Explore */}
              <div className="flex flex-col gap-[var(--space-5)]">
                <p className="type-h4 text-gray-1">Explore</p>
                <div className="flex flex-col gap-[var(--space-2)]">
                  {EXPLORE_LINKS.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="type-small-medium text-gray-1"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-black/15 w-full" />

              {/* History */}
              <div className="flex flex-col gap-[var(--space-5)]">
                <p className="type-h4 text-gray-1">History</p>
                <div className="flex flex-col gap-[var(--space-2)]">
                  {HISTORY_LINKS.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="type-small-medium text-gray-1 whitespace-nowrap"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-black/15 w-full" />

              {/* Login */}
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="type-h4 text-gray-1"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
