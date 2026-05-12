export type QuoteBlock = { _type: "quote"; _key: string; text: string; subtext?: string };

export function QuoteView({ block }: { block: QuoteBlock }) {
  return (
    <blockquote className="flex flex-col gap-[var(--space-2)] border-l-4 border-blue-2 pl-[var(--space-4)]">
      <p className="type-h2 text-black">{block.text}</p>
      {block.subtext && (
        <p className="type-body text-gray-2">{block.subtext}</p>
      )}
    </blockquote>
  );
}
