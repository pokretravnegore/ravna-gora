import { HeroImage } from "./HeroImage";

/**
 * Hero for event detail pages.
 * Mobile/tablet: full-width image (standard HeroImage).
 * Desktop: full viewport height, split 50/50 — centred title+subtitle on the
 * left, cover image on the right.
 */
export function EventHero({
  title,
  subtitle,
  pictureUrl,
}: {
  title: string;
  subtitle?: string;
  pictureUrl: string;
}) {
  return (
    <>
      {/* Mobile / tablet */}
      <div className="xl:hidden max-w-[1512px] mx-auto px-4 md:px-6 pt-[var(--space-8)]">
        <HeroImage src={pictureUrl} alt={title} />
      </div>

      {/* Desktop: full-screen split */}
      <div className="hidden xl:flex h-screen">
        {/* Left — centred text */}
        <div className="w-1/2 flex items-center justify-start pl-10 pr-10">
          <div className="flex flex-col gap-[var(--space-title-sub)]">
            {subtitle && <p className="type-large text-blue-2">{subtitle}</p>}
            <h1 className="type-display text-black">{title}</h1>
          </div>
        </div>

        {/* Right — cover image */}
        <div className="w-1/2 relative overflow-hidden">
          <img
            alt={title}
            src={pictureUrl}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
