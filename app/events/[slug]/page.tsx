import { notFound } from "next/navigation";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { HeroImage } from "../../components/ui/HeroImage";
import { PageTitle } from "../../components/ui/PageTitle";
import { ContentBlocks, type ContentBlock } from "../../components/content/ContentBlocks";
import { client } from "../../../sanity/lib/client";

export const revalidate = 60;

type EventDetail = {
  title: string;
  subtitle?: string;
  pictureUrl: string;
  content?: ContentBlock[];
};

async function getEvent(slug: string): Promise<EventDetail | null> {
  return client.fetch(
    `*[_type == "event" && slug.current == $slug][0] {
      title,
      subtitle,
      pictureUrl,
      content
    }`,
    { slug }
  );
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "event"] { "slug": slug.current }`
  );
  return slugs;
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) notFound();

  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 pt-[var(--space-8)] flex flex-col gap-[var(--space-8)] pb-[var(--space-10)]">

          <HeroImage src={event.pictureUrl} alt={event.title} />

          <PageTitle title={event.title} subtitle={event.subtitle} />

          {event.content && event.content.length > 0 && (
            <div className="max-w-[900px]">
              <ContentBlocks blocks={event.content} />
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
