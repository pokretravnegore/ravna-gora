import { getTranslations } from "next-intl/server";
import { Link } from "../../../i18n/navigation";

// FIXME: keep in sync with Navbar.tsx HISTORY_LINKS — slug for Part 1 not yet confirmed
const EXPLORE_HREFS = ["/about", "/events", "/newspaper-catalog", "/"];
const HISTORY_HREFS = [
  "/history/serbian-national-movement-in-serbia",
  "/history/foreign-testimonies-about-chetniks-and-general-mihalovic",
  "/history/serbian-national-movement-outside-of-serbia",
  "/history/symbols-and-traditions",
  "/history/celebrations-and-commemorations",
];

export async function Footer() {
  const t = await getTranslations("footer");

  const EXPLORE_LINKS = [
    { label: t("links.aboutUs"), href: EXPLORE_HREFS[0] },
    { label: t("links.events"), href: EXPLORE_HREFS[1] },
    { label: t("links.newspaperCatalog"), href: EXPLORE_HREFS[2] },
    { label: t("links.home"), href: EXPLORE_HREFS[3] },
  ];

  const HISTORY_LINKS = [
    { label: t("links.movementInSerbia"), href: HISTORY_HREFS[0] },
    { label: t("links.testimonies"), href: HISTORY_HREFS[1] },
    { label: t("links.movementOutsideSerbia"), href: HISTORY_HREFS[2] },
    { label: t("links.symbolsAndTraditions"), href: HISTORY_HREFS[3] },
    { label: t("links.celebrations"), href: HISTORY_HREFS[4] },
  ];

  return (
    <footer className="bg-blue-2 w-full">
      <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 py-[var(--space-8)] flex flex-col gap-[var(--space-9)]">
        {/* Top: Explore + History + Contact */}
        <div className="flex flex-col xl:flex-row items-start justify-between gap-[var(--space-9)]">
          <div className="flex flex-col md:flex-row gap-[var(--space-9)] md:gap-[181px]">
            <div className="flex flex-col gap-[var(--space-5)]">
              <p className="type-h4 text-white">{t("explore")}</p>
              <div className="flex flex-col gap-[var(--space-2)]">
                {EXPLORE_LINKS.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="type-body text-white hover:underline"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[var(--space-5)]">
              <p className="type-h4 text-white">{t("history")}</p>
              <div className="flex flex-col gap-[var(--space-2)]">
                {HISTORY_LINKS.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="type-body text-white whitespace-nowrap hover:underline"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[var(--space-5)]">
            <p className="type-h4 text-white">{t("contactInfo")}</p>
            <div className="flex items-center gap-[var(--space-2)]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="2,4 12,13 22,4" />
              </svg>
              <a
                href="mailto:contact@ravnagorachetniks.org"
                className="type-body text-white hover:underline"
              >
                contact@ravnagorachetniks.org
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: divider + logo + address */}
        <div className="flex flex-col gap-[var(--space-3)]">
          <div className="w-full h-px bg-white/30" />

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-[var(--space-5)]">
            <img
              src="/logo-text-white.svg"
              alt="Ravna Gora"
              className="h-15 md:h-19 xl:h-23 w-auto"
            />

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
