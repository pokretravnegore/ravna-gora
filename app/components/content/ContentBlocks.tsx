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

function renderBlock(block: ContentBlock) {
  switch (block._type) {
    case "sectionTitle":       return <SectionHeading title={block.text} />;
    case "paragraph":          return <ParagraphView text={block.text} />;
    case "quote":              return <QuoteView text={block.text} subtext={block.subtext} />;
    case "pictureBig":         return <PictureBigView block={block} />;
    case "pictureTwoPictures": return <TwoPicturesView block={block} />;
  }
}

// Returns the CSS gap to place above `curr` given the block that precedes it.
function gapAbove(prev: ContentBlock, curr: ContentBlock): string {
  if (prev._type === "sectionTitle") return "var(--space-text-tp)";
  if (prev._type === "paragraph" && curr._type === "paragraph") return "var(--space-text-p)";
  return "var(--space-big)";
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  // Split into sections; a new section begins at each sectionTitle.
  const sections: ContentBlock[][] = [];
  let current: ContentBlock[] = [];
  for (const block of blocks) {
    if (block._type === "sectionTitle" && current.length > 0) {
      sections.push(current);
      current = [block];
    } else {
      current.push(block);
    }
  }
  if (current.length > 0) sections.push(current);

  return (
    <div className="flex flex-col gap-[var(--space-9)]">
      {sections.map((section) => (
        <div key={section[0]._key}>
          {section.map((block, i) => (
            <div
              key={block._key}
              style={i > 0 ? { marginTop: gapAbove(section[i - 1], block) } : undefined}
            >
              {renderBlock(block)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
