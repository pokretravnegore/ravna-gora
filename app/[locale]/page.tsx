import { getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ICONS } from "../components/assets";
import { client } from "../../sanity/lib/client";

export const revalidate = 60;

// Figma MCP asset URLs — expires 7 days after generation
// FIXME: images and excerpts in histArticles are static placeholders — replace with CMS data when history pages are authored
const A = {
  arrowLg: ICONS.arrowLg,
  arrowSm: ICONS.arrowSm,
  hero:     "https://www.figma.com/api/mcp/asset/f8726c09-f189-4d8c-89d3-ea3631839b0d",
  magazine: "https://www.figma.com/api/mcp/asset/bbdd735f-5579-40d2-b45d-348bef1c4ede",
  about:    "https://www.figma.com/api/mcp/asset/bea1d0ed-cac3-47c3-91b7-b6ae259519a1",
  hist1:    "https://www.figma.com/api/mcp/asset/5ac6e05d-d541-4908-8d31-373a1885e9e1",
  hist2:    "https://www.figma.com/api/mcp/asset/752ba48a-15c5-46e5-b850-7351736ec531",
  hist3:    "https://www.figma.com/api/mcp/asset/3ed95168-eb43-4ae9-a642-aef90f7e171f",
  hist4:    "https://www.figma.com/api/mcp/asset/dc5600b8-975b-4700-831d-ea38515bb9b5",
  hist5:    "https://www.figma.com/api/mcp/asset/3f3aa435-ab67-45db-93f0-2751c8cc5ff1",
};

type Chapter = { name: string; websiteUrl?: string };
type LatestIssue = { coverUrl: string; date: string; number: string };
type HomePageData = {
  pageTitle: string;
  pageSubtitle: string;
  heroImageUrl: string;
  latestIssue: LatestIssue | null;
  chapters: Chapter[];
};

const FALLBACK_CHAPTERS: Chapter[] = [
  { name: "United States" },
  { name: "Canada" },
  { name: "United Kingdom" },
  { name: "Australia" },
];

// FIXME: slug for Part 1 was not confirmed (duplicate given); verify and update once known
const HIST_HREFS = [
  "/history/serbian-national-movement-outside-of-serbia",
  "/history/foreign-testimonies-about-chetniks-and-general-mihalovic",
  "/history/serbian-national-movement-outside-of-serbia",
  "/history/symbols-and-traditions",
  "/history/celebrations-and-commemorations",
];

const HIST_IMGS = [A.hist1, A.hist2, A.hist3, A.hist4, A.hist5];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");

  const homePage: HomePageData | null = await client.fetch(
    `*[_type == "homePage" && (language == $locale || (!defined(language) && $locale == "en"))][0] {
      pageTitle,
      pageSubtitle,
      heroImageUrl,
      latestIssue,
      chapters
    }`,
    { locale }
  );

  const pageTitle    = homePage?.pageTitle    ?? t("fallbackTitle");
  const pageSubtitle = homePage?.pageSubtitle ?? t("fallbackSubtitle");
  const heroImageUrl = homePage?.heroImageUrl ?? A.hero;
  const latestIssue  = homePage?.latestIssue  ?? { coverUrl: A.magazine, date: "March 2026", number: "#764" };
  const chapters     = homePage?.chapters?.length ? homePage.chapters : FALLBACK_CHAPTERS;

  const histArticles = (["1", "2", "3", "4", "5"] as const).map((n, i) => ({
    part:    t(`hist${n}Part`   as `hist${typeof n}Part`),
    title:   t(`hist${n}Title`  as `hist${typeof n}Title`),
    excerpt: t(`hist${n}Excerpt`as `hist${typeof n}Excerpt`),
    img:     HIST_IMGS[i],
    href:    HIST_HREFS[i],
  }));

  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">

      <Navbar />

      <main className="flex-1">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 pt-[var(--space-8)] flex flex-col gap-[var(--space-10)]">

          {/* ── Hero ── */}
          <section className="flex flex-col gap-[var(--space-9)]">
            <div className="flex flex-col gap-[var(--space-title-sub)] items-center text-center text-black">
              <h1 className="type-display">{pageTitle}</h1>
              <p className="type-h2">{pageSubtitle}</p>
            </div>

            <div className="w-full h-[220px] md:h-[360px] xl:h-[507px] overflow-hidden relative">
              <img
                alt={t("heroImageAlt")}
                src={heroImageUrl}
                className="absolute left-0 w-full max-w-none"
                style={{ height: "204.22%", top: "-21.82%" }}
              />
            </div>
          </section>

          {/* ── All content sections ── */}
          <div className="flex flex-col gap-[var(--space-10)]">

            {/* ── Welcome quote ── */}
            <div className="flex items-center gap-4 xl:gap-[73px]">
              <div className="hidden xl:block w-[51px] border-t-2 border-black shrink-0" />
              <p className="type-h1 text-black text-center flex-1">{t("welcomeQuote")}</p>
              <div className="hidden xl:block w-[51px] border-t-2 border-black shrink-0" />
            </div>

            {/* ── Latest newspaper card ── */}
            <div className="flex justify-center">
              <div className="flex flex-col gap-[var(--space-3)] w-full max-w-[464px]">
                <div className="relative h-[300px] md:h-[360px] xl:h-[420px] overflow-hidden">
                  <img
                    alt={t("latestIssueAlt")}
                    src={latestIssue.coverUrl}
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="flex flex-col gap-[var(--space-3)]">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                      <p className="type-large text-black">{latestIssue.date}</p>
                      <h3 className="type-h3 text-black">{t("latestIssueHeading", { number: latestIssue.number })}</h3>
                    </div>
                    <img alt={t("openIssueAlt")} src={A.arrowLg} className="size-[45px] shrink-0 ml-2" />
                  </div>

                  <p className="type-body text-black">{t("latestIssueDesc")}</p>
                </div>
              </div>
            </div>

            {/* ── About ── */}
            <section className="flex flex-col xl:flex-row items-start justify-between gap-[var(--space-10)] xl:gap-[73px]">
              <div className="flex flex-col gap-[var(--space-big)] w-full xl:w-[586px] shrink-0">
                <div className="flex flex-col gap-[var(--space-text-tp)]">
                  <SectionHeading title={t("aboutHeading")} />

                  <div className="flex flex-col gap-[var(--space-text-p)]">
                    <p className="type-body text-black">{t("aboutP1")}</p>
                    <p className="type-body text-black">{t("aboutP2")}</p>
                  </div>
                </div>

                <p className="type-h4 text-black text-center">{t("loadMore")}</p>
              </div>

              <div className="flex flex-col gap-[10px] w-full xl:w-[716px] p-[10px]">
                <div className="relative h-[280px] md:h-[380px] xl:h-[489px] w-full">
                  <img
                    alt="Historical photograph"
                    src={A.about}
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="type-body text-black">{t("photograph")}</p>
                  <p className="type-caption text-gray-2">{t("photoYear")}</p>
                </div>
              </div>
            </section>

            {/* ── Historical Introduction ── */}
            <section className="flex flex-col gap-[var(--space-text-tp)]">
              <SectionHeading title={t("historicalIntroHeading")} />

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-[18px] gap-y-[var(--space-card-v)]">
                {histArticles.map(({ part, title, img, href, excerpt }) => (
                  <Link key={part} href={href}>
                    <article className="flex flex-col gap-[var(--space-text-p)]">
                      <div className="relative h-[260px] md:h-[320px] xl:h-[421px] overflow-hidden">
                        <img
                          alt={title}
                          src={img}
                          className="absolute inset-0 size-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col gap-[var(--space-text-p)]">
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                            <p className="type-large text-black">{part}</p>
                            <h3 className="type-h3 text-black">{title}</h3>
                          </div>
                          <img
                            alt={t("openArticleAlt")}
                            src={A.arrowLg}
                            className="size-[45px] shrink-0 ml-2 mt-1"
                          />
                        </div>

                        <p className="type-body text-black line-clamp-3">{excerpt}</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>

            {/* ── Chapters ── */}
            <section className="flex flex-col gap-[var(--space-text-tp)]">
              <SectionHeading title={t("chaptersHeading")} />

              <div className="flex justify-center">
                <div className="w-full max-w-[949px] flex flex-col gap-[var(--space-4)]">
                  {chapters.map(({ name, websiteUrl }) => (
                    <div key={name} className="flex flex-col gap-[var(--space-4)]">
                      <div className="h-px bg-black/20 w-full" />
                      <div className="flex items-center justify-between">
                        <p className="type-h2 text-black">{name}</p>
                        {websiteUrl && (
                          <a href={websiteUrl} className="flex items-center gap-[var(--space-2)]">
                            <p className="type-body text-black">{t("visit")}</p>
                            <img alt={t("visitAlt")} src={A.arrowSm} className="size-[23px]" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="h-px bg-black/20 w-full" />
                </div>
              </div>
            </section>

            {/* ── Membership ── */}
            <section className="pb-[var(--space-8)]">
              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-[var(--space-10)] xl:gap-[141px]">
                <div className="flex flex-col gap-[var(--space-text-tp)] w-full xl:w-[706px]">
                  <SectionHeading title={t("membershipHeading")} />

                  <div className="flex flex-col gap-[var(--space-text-p)]">
                    <p className="type-body text-black">{t("membershipP1")}</p>
                    <p className="type-body text-black">{t("membershipP2")}</p>
                  </div>
                </div>

                <a
                  href="#"
                  className="bg-blue-2 text-white type-h4 text-center w-full xl:w-[464px] py-[26px] px-5 flex items-center justify-center shrink-0"
                >
                  {t("joinCTA")}
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
