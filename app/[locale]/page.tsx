import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { client } from "../../sanity/lib/client";

export const revalidate = 60;

// Figma MCP asset URLs — expires 7 days after generation
// FIXME: images and excerpts in histArticles are static placeholders — replace with CMS data when history pages are authored
const A = {
  hero:     "/images/landing-hero-original/1512.avif",
  magazine: "/images/preview-next-newspaper/464.avif",
  about:    "/images/about-us-section-original/1512.avif",
  hist1:    "/images/history-page-1-original/400.avif",
  hist2:    "/images/history-page-2-original/544.avif",
  hist3:    "/images/history-page-3-original/500.avif",
  hist4:    "/images/history-page-4-original/1024.avif",
  hist5:    "/images/history-page-5-original/1024.avif",
};

type Chapter = { name: string; websiteUrl?: string };
type LatestIssue = { date: string; number: string };
type HomePageData = {
  pageTitle: string;
  pageSubtitle: string;
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
      latestIssue,
      chapters
    }`,
    { locale }
  );

  const pageTitle    = homePage?.pageTitle    ?? t("fallbackTitle");
  const pageSubtitle = homePage?.pageSubtitle ?? t("fallbackSubtitle");
  const latestIssue  = homePage?.latestIssue  ?? { date: "March 2026", number: "#764" };
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
              <Image
                alt={t("heroImageAlt")}
                src={A.hero}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 640px, (max-width: 1280px) 1024px, 1512px"
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
              <Link href="/newspaper-catalog" className="group flex flex-col gap-(--space-3) w-full max-w-116">
                <div className="relative h-[300px] md:h-[360px] xl:h-[420px] overflow-hidden">
                  <img
                    alt={t("latestIssueAlt")}
                    src={A.magazine}
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="flex flex-col gap-[var(--space-3)]">
                  <div className="flex flex-col gap-[4px]">
                    <p className="type-large text-black">{latestIssue.date}</p>
                    <h3 className="type-h3 text-black group-hover:underline">{t("latestIssueHeading", { number: latestIssue.number })}</h3>
                  </div>

                  <p className="type-body text-black">{t("latestIssueDesc")}</p>
                </div>
              </Link>
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

                <Link href="/about" className="type-h4 text-black text-center hover:underline">{t("loadMore")}</Link>
              </div>

              <div className="flex flex-col gap-[10px] w-full xl:w-[716px] p-[10px]">
                <div className="relative h-[280px] md:h-[380px] xl:h-[489px] w-full">
                  <Image
                    alt="Historical photograph"
                    src={A.about}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 640px, (max-width: 1280px) 1024px, 716px"
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
                  <Link key={part} href={href} className="group">
                    <article className="flex flex-col gap-[var(--space-text-p)]">
                      <div className="relative h-[260px] md:h-[320px] xl:h-[421px] overflow-hidden">
                        <Image
                          alt={title}
                          src={img}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      </div>

                      <div className="flex flex-col gap-[var(--space-text-p)]">
                        <div className="flex flex-col gap-1">
                          <p className="type-large text-black">{part}</p>
                          <h3 className="type-h3 text-black group-hover:underline">{title}</h3>
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
                          <a href={websiteUrl} className="type-body text-black">
                            {t("visit")}
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
