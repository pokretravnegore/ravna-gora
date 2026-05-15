/**
 * Page-level title block: an optional subtitle in brand blue above a
 * `type-display` h1. Used at the top of detail pages (events, articles, etc.).
 */
export function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-[var(--space-2)] max-w-[900px]">
      {subtitle && <p className="type-large text-black">{subtitle}</p>}
      <h1 className="type-display text-black">{title}</h1>
    </div>
  );
}
