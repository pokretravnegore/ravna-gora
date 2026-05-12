import { SectionHeading }  from "../ui/SectionHeading";
import { ParagraphView }   from "../ui/ParagraphView";
import { QuoteView }       from "../ui/QuoteView";
import { PictureBigView }  from "../ui/PictureBigView";
import { TwoPicturesView } from "../ui/TwoPicturesView";

import type { ParagraphBlock }   from "../ui/ParagraphView";
import type { QuoteBlock }       from "../ui/QuoteView";
import type { PictureBigBlock }  from "../ui/PictureBigView";
import type { TwoPicturesBlock } from "../ui/TwoPicturesView";

export type SectionTitleBlock = { _type: "sectionTitle"; _key: string; text: string };

export type { ParagraphBlock }                from "../ui/ParagraphView";
export type { QuoteBlock }                    from "../ui/QuoteView";
export type { PictureBigBlock }               from "../ui/PictureBigView";
export type { TwoPicturesBlock, PicturePair } from "../ui/TwoPicturesView";

export type ContentBlock =
  | SectionTitleBlock
  | ParagraphBlock
  | QuoteBlock
  | PictureBigBlock
  | TwoPicturesBlock;

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-[var(--space-9)]">
      {blocks.map((block) => {
        switch (block._type) {
          case "sectionTitle":
            return <SectionHeading key={block._key} title={block.text} />;
          case "paragraph":
            return <ParagraphView key={block._key} block={block} />;
          case "quote":
            return <QuoteView key={block._key} block={block} />;
          case "pictureBig":
            return <PictureBigView key={block._key} block={block} />;
          case "pictureTwoPictures":
            return <TwoPicturesView key={block._key} block={block} />;
        }
      })}
    </div>
  );
}
