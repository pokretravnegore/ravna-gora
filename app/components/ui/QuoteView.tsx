export type QuoteBlock = { _type: "quote"; _key: string; text: string; subtext?: string };

export function QuoteView({ text, subtext }: { text: string; subtext?: string }) {
  return (
    <blockquote className="flex flex-col gap-[var(--space-2)] border-l-4 border-blue-2 pl-[var(--space-4)]">
      <p className="type-h2 text-black">{text}</p>
      {subtext && (
        <p className="type-body text-gray-2">{subtext}</p>
      )}
    </blockquote>
  );
}
