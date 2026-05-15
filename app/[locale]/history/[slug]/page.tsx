import { notFound } from "next/navigation";
import { ContentPageLayout } from "../../../components/layout/ContentPageLayout";
import { EventHero } from "../../../components/ui/EventHero";
import { PageTitle } from "../../../components/ui/PageTitle";
import { ContentBlocks, type ContentBlock } from "../../../components/content/ContentBlocks";
import { client } from "../../../../sanity/lib/client";
import { urlFor, type SanityImage } from "../../../../sanity/lib/image";

export const revalidate = 60;

type HistoryPageDetail = {
  title: string;
  subtitle?: string;
  picture: SanityImage;
  content?: ContentBlock[];
};

async function getHistoryPage(slug: string, locale: string): Promise<HistoryPageDetail | null> {
  return client.fetch(
    `*[_type == "historyPage" && slug.current == $slug && (language == $locale || (!defined(language) && $locale == "en"))][0] {
      title,
      subtitle,
      picture,
      content
    }`,
    { slug, locale }
  );
}

export async function generateStaticParams() {
  // Slugs are shared across languages — return unique slugs from the base (English) documents
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "historyPage" && (language == "en" || !defined(language))] { "slug": slug.current }`
  );
  return slugs;
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await getHistoryPage(slug, locale);

  if (!page) notFound();

  return (
    <ContentPageLayout
      heroFullWidth
      hero={
        <EventHero
          title={page.title}
          subtitle={page.subtitle}
          pictureUrl={urlFor(page.picture).width(1512).auto("format").url()}
        />
      }
    >
      <div className="flex flex-col gap-(--space-8) py-(--space-8) pb-(--space-10)">
        {/* Title shown on mobile/tablet only — desktop sees it in the hero */}
        <div className="xl:hidden">
          <PageTitle title={page.title} subtitle={page.subtitle} />
        </div>
        {page.content && page.content.length > 0 && (
          <ContentBlocks blocks={page.content} />
        )}
      </div>
    </ContentPageLayout>
  );
}
