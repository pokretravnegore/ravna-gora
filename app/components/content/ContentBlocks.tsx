/**
 * Renders an ordered array of heterogeneous content blocks fetched from
 * Sanity. Each block's `_type` maps to one of the five supported variants:
 * sectionTitle, paragraph, quote, pictureBig, pictureTwoPictures.
 *
 * Blocks are rendered inside a vertical flex column; callers control the
 * outer width constraint.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type SectionTitleBlock  = { _type: "sectionTitle";       _key: string; text: string };
export type ParagraphBlock     = { _type: "paragraph";          _key: string; text: string };
export type QuoteBlock         = { _type: "quote";              _key: string; text: string; subtext?: string };
export type PictureBigBlock    = { _type: "pictureBig";         _key: string; pictureUrl: string; subtext?: string };
export type PicturePair        = { _key: string; pictureUrl: string; subtext?: string };
export type TwoPicturesBlock   = { _type: "pictureTwoPictures"; _key: string; pictures: PicturePair[] };

export type ContentBlock =
  | SectionTitleBlock
  | ParagraphBlock
  | QuoteBlock
  | PictureBigBlock
  | TwoPicturesBlock;

// ── Component ─────────────────────────────────────────────────────────────────

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
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
              <blockquote
                key={block._key}
                className="flex flex-col gap-[var(--space-2)] border-l-4 border-blue-2 pl-[var(--space-4)]"
              >
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
                  <figcaption className="type-caption text-gray-2">
                    {block.subtext}
                  </figcaption>
                )}
              </figure>
            );

          case "pictureTwoPictures":
            return (
              <div
                key={block._key}
                className="grid grid-cols-1 md:grid-cols-2 gap-[18px]"
              >
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
                      <figcaption className="type-caption text-gray-2">
                        {pic.subtext}
                      </figcaption>
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
