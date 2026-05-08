import Link from "next/link";
import { LogoBlack } from "./Logo";

const NAV_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Events", href: "#" },
  { label: "Newspaper Catalog", href: "#" },
  { label: "Membership", href: "#" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-offwhite-1 border-b border-blue-2 w-full">
      <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 flex items-center justify-between pb-5 pt-1">
        <Link href="/">
          <LogoBlack />
        </Link>

        <div className="flex items-center gap-[var(--space-3)]">
          <div className="hidden md:flex items-center gap-[var(--space-3)]">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className="type-large text-black whitespace-nowrap">
                {label}
              </Link>
            ))}
          </div>

          <Link
            href="#"
            className="bg-blue-2 text-white type-large whitespace-nowrap py-[var(--btn-v)] px-[var(--btn-h)]"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
