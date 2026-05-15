import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContentPageLayout } from "../../components/layout/ContentPageLayout";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { ParagraphView } from "../../components/ui/ParagraphView";
import { QuoteView }     from "../../components/ui/QuoteView";

const A = {
  hero: "/images/about-us-section-original/1512.avif",
  // aboutPhoto: "https://www.figma.com/api/mcp/asset/c59cfbd6-a524-433e-8cd1-99cbcc949cf9",
  // photo1:     "https://www.figma.com/api/mcp/asset/7f2986c7-1193-4b3d-9951-68c6f4be9538",
  // photo2:     "https://www.figma.com/api/mcp/asset/88a45a48-b796-4026-9e3f-244d45978439",
  // photo3:     "https://www.figma.com/api/mcp/asset/a3c7bf1d-4c9d-4517-9bff-9e0c82a4cbce",
};

export default async function AboutPage() {
  const t = await getTranslations("about");

  // function PhotoGrid() {
  //   return (
  //     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[18px]">
  //       <div className="relative h-[260px] md:h-[300px] xl:h-[380px] overflow-hidden">
  //         <img alt={t("photoAlt1")} src={A.photo1} className="absolute inset-0 size-full object-cover" />
  //       </div>
  //       <div className="relative h-[260px] md:h-[300px] xl:h-[380px] overflow-hidden">
  //         <img alt={t("photoAlt2")} src={A.photo2} className="absolute inset-0 size-full object-cover" />
  //       </div>
  //       <div className="hidden xl:block relative h-[380px] overflow-hidden">
  //         <img alt={t("photoAlt3")} src={A.photo3} className="absolute inset-0 size-full object-cover" />
  //       </div>
  //     </div>
  //   );
  // }

  const hero = (
    <section className="flex flex-col gap-[var(--space-9)]">
      <div className="flex flex-col gap-[var(--space-title-sub)] items-center text-center text-black">
        <h1 className="type-display">{t("heroTitle")}</h1>
        <p className="type-h2">{t("heroSubtitle")}</p>
      </div>

      <div className="relative w-full h-[220px] md:h-[360px] xl:h-[507px] overflow-hidden">
        <Image
          alt={t("heroImageAlt")}
          src={A.hero}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 640px, (max-width: 1280px) 1024px, 1512px"
        />
      </div>

      {/* Caption — phone only */}
      <p className="md:hidden type-caption text-gray-2 -mt-[var(--space-6)]">
        {t("heroCaption")}
      </p>
    </section>
  );

  return (
    <ContentPageLayout hero={hero}>
      <div className="flex flex-col gap-[var(--space-10)] py-[var(--space-10)] pb-[var(--space-8)]">

        {/* ── About the Movement ── */}
        <section className="flex flex-col gap-[var(--space-text-tp)]">
          <SectionHeading title={t("aboutMovementHeading")} />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text={t("aboutMovementP1")} />
            <ParagraphView text={t("aboutMovementP2")} />
          </div>

          <QuoteView text={t("aboutMovementQuote")} />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text={t("aboutMovementP3")} />
            <ParagraphView text={t("aboutMovementP4")} />
          </div>

          {/* Photo + caption — commented out until real images are provided */}
          {/* <div className="flex flex-col gap-[10px]">
            <div className="relative w-full h-[320px] md:h-[480px] overflow-hidden">
              <img
                alt={t("photoAlt")}
                src={A.aboutPhoto}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="type-body text-black">{t("photoCaption")}</p>
              <p className="type-caption text-gray-2">{t("photoArchive")}</p>
            </div>
          </div> */}
        </section>

        {/* ── Origins ── */}
        <section className="flex flex-col gap-[var(--space-text-tp)]">
          <SectionHeading title={t("originsHeading")} />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text={t("originsP1")} />
            <ParagraphView text={t("originsP2")} />
          </div>

          {/* <PhotoGrid /> */}
        </section>

        {/* ── The Newspaper's Role ── */}
        <section className="flex flex-col gap-[var(--space-text-tp)]">
          <SectionHeading title={t("newspaperHeading")} />

          <QuoteView text={t("newspaperQuote")} />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text={t("newspaperP1")} />
            <ParagraphView text={t("newspaperP2")} />
          </div>
        </section>

        {/* ── The Movement Today ── */}
        <section className="flex flex-col gap-[var(--space-text-tp)]">
          <SectionHeading title={t("todayHeading")} />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text={t("todayP1")} />
            <ParagraphView text={t("todayP2")} />
          </div>

          {/* <PhotoGrid /> */}

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text={t("todayP3")} />
            <ParagraphView text={t("todayP4")} />
            <ParagraphView text={t("todayP5")} />
          </div>
        </section>

        {/* ── Preservation & Digital Future ── */}
        <section className="flex flex-col gap-[var(--space-text-tp)]">
          <SectionHeading title={t("digitalHeading")} />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text={t("digitalP1")} />
            <ParagraphView text={t("digitalP2")} />
            <ParagraphView text={t("digitalP3")} />
          </div>
        </section>

      </div>
    </ContentPageLayout>
  );
}
