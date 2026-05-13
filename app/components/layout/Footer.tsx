import Link from "next/link";
import { LogoWhite } from "./Logo";
import { ICONS } from "../assets";

const EXPLORE_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Newspaper Catalog", href: "/newspaper-catalog" },
  { label: "Home", href: "/" },
];

const HISTORY_LINKS = [
  // FIXME: slug for Part 1 ("General Mihailovic and the Ravna Gora Movement") was not confirmed — verify and update
  { label: "Movement in Serbia", href: "/history/serbian-national-movement-outside-of-serbia" },
  { label: "Testimonies", href: "/history/foreign-testimonies-about-chetniks-and-general-mihalovic" },
  { label: "Movement Outside of Serbia", href: "/history/serbian-national-movement-outside-of-serbia" },
  { label: "Symbols & Traditions", href: "/history/symbols-and-traditions" },
  { label: "Celebrations", href: "/history/celebrations-and-commemorations" },
];

export function Footer() {
  return (
    <footer className="bg-blue-2 w-full">
      <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 py-[var(--space-8)] flex flex-col gap-[var(--space-9)]">

        {/* Top: Explore + History + Contact */}
        <div className="flex flex-col xl:flex-row items-start justify-between gap-[var(--space-9)]">
          <div className="flex flex-col md:flex-row gap-[var(--space-9)] md:gap-[181px]">
            <div className="flex flex-col gap-[var(--space-5)]">
              <p className="type-h4 text-white">Explore</p>
              <div className="flex flex-col gap-[var(--space-2)]">
                {EXPLORE_LINKS.map(({ label, href }) => (
                  <Link key={label} href={href} className="type-body text-white">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[var(--space-5)]">
              <p className="type-h4 text-white">History</p>
              <div className="flex flex-col gap-[var(--space-2)]">
                {HISTORY_LINKS.map(({ label, href }) => (
                  <Link key={label} href={href} className="type-body text-white whitespace-nowrap">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[var(--space-5)]">
            <p className="type-h4 text-white">Contact Information</p>
            <div className="flex items-center gap-[var(--space-2)]">
              <img alt="Email" src={ICONS.mail} className="size-[24px] shrink-0" />
              <p className="type-body text-white">contact@ravnagorachetniks.org</p>
            </div>
          </div>
        </div>

        {/* Bottom: divider + logo + address */}
        <div className="flex flex-col gap-[var(--space-3)]">
          <div className="w-full h-px bg-white/30" />

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-[var(--space-5)]">
            <div className="flex items-start gap-[var(--space-4)]">
              <LogoWhite />
              <div className="flex flex-col text-white">
                <p className="type-caption">USA CHAPTER</p>
                <p className="type-h4">The Movement of Serbian Chetniks Ravne Gore</p>
              </div>
            </div>

            <div className="flex flex-col gap-[var(--space-1)] type-base text-white">
              <p>1350 Woodview Drive</p>
              <p>Crown Point, Indiana</p>
              <p>46307</p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
