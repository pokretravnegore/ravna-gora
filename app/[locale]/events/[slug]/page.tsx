import { notFound } from "next/navigation";
import { ContentPageLayout } from "../../../components/layout/ContentPageLayout";
import { EventHero } from "../../../components/ui/EventHero";
import { PageTitle } from "../../../components/ui/PageTitle";
import { ContentBlocks, type ContentBlock } from "../../../components/content/ContentBlocks";
import { client } from "../../../../sanity/lib/client";
import { urlFor, type SanityImage } from "../../../../sanity/lib/image";

export const revalidate = 60;

type EventDetail = {
  title: string;
  subtitle?: string;
  picture: SanityImage;
  content?: ContentBlock[];
};

async function getEvent(slug: string, locale: string): Promise<EventDetail | null> {
  return client.fetch(
    `*[_type == "event" && slug.current == $slug && (language == $locale || (!defined(language) && $locale == "en"))][0] {
      title,
      subtitle,
      picture,
      content
    }`,
    { slug, locale }
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const event = await getEvent(slug, locale);
  if (!event) return {};

  const imageUrl = urlFor(event.picture).width(1200).height(630).fit("crop").auto("format").url();

  return {
    title: event.title,
    description: event.subtitle,
    openGraph: {
      title: event.title,
      description: event.subtitle ?? undefined,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: event.title,
      description: event.subtitle ?? undefined,
      images: [imageUrl],
    },
  };
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
          pictureUrl={urlFor(event.picture).width(1512).auto("format").url()}
        />
      }
    >
      <div className="flex flex-col gap-(--space-8) py-(--space-8) pb-(--space-10)">
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
