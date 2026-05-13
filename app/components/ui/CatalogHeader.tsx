import { HeroImage } from "./HeroImage";

/**
 * Top section for catalog/listing pages (events, newspaper archive, etc.).
 * Renders a full-width hero image followed by a page title and description.
 * Pass optional `children` to render additional controls — e.g. a decade
 * filter bar — between the description and the catalog grid.
 */
export function CatalogHeader({
  imageSrc,
  imageAlt,
  title,
  description,
  children,
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <HeroImage src={imageSrc} alt={imageAlt} />
      <div className="flex flex-col gap-[var(--space-4)]">
        <div className="flex flex-col gap-[var(--space-2)]">
          <h1 className="type-display text-black">{title}</h1>
          <p className="type-base text-black">{description}</p>
        </div>
        {children}
      </div>
    </>
  );
}
