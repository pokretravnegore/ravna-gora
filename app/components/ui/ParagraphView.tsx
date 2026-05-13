export type ParagraphBlock = { _type: "paragraph"; _key: string; text: string };

export function ParagraphView({ text }: { text: string }) {
  return <p className="type-body text-black">{text}</p>;
}
