import { notFound } from "next/navigation";
import { ContentPageLayout } from "../../../components/layout/ContentPageLayout";
import { EventHero } from "../../../components/ui/EventHero";
import { PageTitle } from "../../../components/ui/PageTitle";
import { ContentBlocks, type ContentBlock } from "../../../components/content/ContentBlocks";
import { client } from "../../../../sanity/lib/client";

export const revalidate = 60;

type HistoryPageDetail = {
  title: string;
  subtitle?: string;
  pictureUrl: string;
  content?: ContentBlock[];
};

async function getHistoryPage(slug: string): Promise<HistoryPageDetail | null> {
  return client.fetch(
    `*[_type == "historyPage" && slug.current == $slug][0] {
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
    `*[_type == "historyPage"] { "slug": slug.current }`
  );
  return slugs;
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getHistoryPage(slug);

  if (!page) notFound();

  return (
    <ContentPageLayout
      heroFullWidth
      hero={
        <EventHero
          title={page.title}
          subtitle={page.subtitle}
          pictureUrl={page.pictureUrl}
        />
      }
    >
      <div className="flex flex-col gap-[var(--space-8)] py-[var(--space-8)] pb-[var(--space-10)]">
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
