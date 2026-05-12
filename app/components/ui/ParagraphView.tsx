export type ParagraphBlock = { _type: "paragraph"; _key: string; text: string };

export function ParagraphView({ block }: { block: ParagraphBlock }) {
  return <p className="type-body text-black">{block.text}</p>;
}
