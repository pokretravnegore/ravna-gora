import { notFound } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { client } from "../../../sanity/lib/client";

// ── Types ────────────────────────────────────────────────────────────────────

type SectionTitleBlock  = { _type: "sectionTitle";       _key: string; text: string };
type ParagraphBlock     = { _type: "paragraph";          _key: string; text: string };
type QuoteBlock         = { _type: "quote";              _key: string; text: string; subtext?: string };
type PictureBigBlock    = { _type: "pictureBig";         _key: string; pictureUrl: string; subtext?: string };
type PicturePair        = { _key: string; pictureUrl: string; subtext?: string };
type TwoPicturesBlock   = { _type: "pictureTwoPictures"; _key: string; pictures: PicturePair[] };

type ContentBlock =
  | SectionTitleBlock
  | ParagraphBlock
  | QuoteBlock
  | PictureBigBlock
  | TwoPicturesBlock;

type EventDetail = {
  title: string;
  subtitle?: string;
  pictureUrl: string;
  content?: ContentBlock[];
};

// ── Data fetching ─────────────────────────────────────────────────────────────

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

// ── Content block renderers ───────────────────────────────────────────────────

function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-[var(--space-9)]">
      {blocks.map((block) => {
        switch (block._type) {
          case "sectionTitle":
            return (
              <h2 key={block._key} className="type-h1 text-black">
                {block.text}
              </h2>
            );

          case "paragraph":
            return (
              <p key={block._key} className="type-body text-black">
                {block.text}
              </p>
            );

          case "quote":
            return (
              <blockquote key={block._key} className="flex flex-col gap-[var(--space-2)] border-l-4 border-blue-2 pl-[var(--space-4)]">
                <p className="type-h2 text-black">{block.text}</p>
                {block.subtext && (
                  <p className="type-body text-gray-2">{block.subtext}</p>
                )}
              </blockquote>
            );

          case "pictureBig":
            return (
              <figure key={block._key} className="flex flex-col gap-[10px]">
                <div className="relative w-full h-[300px] md:h-[500px] xl:h-[640px] overflow-hidden">
                  <img
                    alt={block.subtext ?? ""}
                    src={block.pictureUrl}
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                {block.subtext && (
                  <figcaption className="type-caption text-gray-2">{block.subtext}</figcaption>
                )}
              </figure>
            );

          case "pictureTwoPictures":
            return (
              <div key={block._key} className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                {block.pictures.map((pic) => (
                  <figure key={pic._key} className="flex flex-col gap-[10px]">
                    <div className="relative w-full h-[260px] md:h-[380px] overflow-hidden">
                      <img
                        alt={pic.subtext ?? ""}
                        src={pic.pictureUrl}
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                    {pic.subtext && (
                      <figcaption className="type-caption text-gray-2">{pic.subtext}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

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

          {/* Hero image */}
          <div className="relative w-full h-[300px] md:h-[507px] overflow-hidden">
            <img
              alt={event.title}
              src={event.pictureUrl}
              className="absolute inset-0 size-full object-cover"
            />
          </div>

          {/* Title block */}
          <div className="flex flex-col gap-[var(--space-2)] max-w-[900px]">
            {event.subtitle && (
              <p className="type-large text-blue-2">{event.subtitle}</p>
            )}
            <h1 className="type-display text-black">{event.title}</h1>
          </div>

          {/* Body content */}
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
