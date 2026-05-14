import { notFound } from "next/navigation";
import { ContentPageLayout } from "../../../components/layout/ContentPageLayout";
import { EventHero } from "../../../components/ui/EventHero";
import { PageTitle } from "../../../components/ui/PageTitle";
import { ContentBlocks, type ContentBlock } from "../../../components/content/ContentBlocks";
import { client } from "../../../../sanity/lib/client";

export const revalidate = 60;

type EventDetail = {
  title: string;
  subtitle?: string;
  pictureUrl: string;
  content?: ContentBlock[];
};

async function getEvent(slug: string, locale: string): Promise<EventDetail | null> {
  return client.fetch(
    `*[_type == "event" && slug.current == $slug && (language == $locale || (!defined(language) && $locale == "en"))][0] {
      title,
      subtitle,
      pictureUrl,
      content
    }`,
    { slug, locale }
  );
}

export async function generateStaticParams() {
  // Slugs are shared across languages — return unique slugs from the base (English) documents
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "event" && (language == "en" || !defined(language))] { "slug": slug.current }`
  );
  return slugs;
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const event = await getEvent(slug, locale);

  if (!event) notFound();

  return (
    <ContentPageLayout
      heroFullWidth
      hero={
        <EventHero
          title={event.title}
          subtitle={event.subtitle}
          pictureUrl={event.pictureUrl}
        />
      }
    >
      <div className="flex flex-col gap-[var(--space-8)] py-[var(--space-8)] pb-[var(--space-10)]">
        {/* Title shown on mobile/tablet only — desktop sees it in the hero */}
        <div className="xl:hidden">
          <PageTitle title={event.title} subtitle={event.subtitle} />
        </div>
        {event.content && event.content.length > 0 && (
          <ContentBlocks blocks={event.content} />
        )}
      </div>
    </ContentPageLayout>
  );
}
