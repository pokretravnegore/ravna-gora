/**
 * Full-width hero image with consistent overflow cropping.
 * Use `heightClass` to override the default responsive height when the
 * design calls for a taller or shorter crop (e.g. inside content blocks).
 */
export function HeroImage({
  src,
  alt,
  heightClass = "h-[300px] md:h-[507px]",
}: {
  src: string;
  alt: string;
  heightClass?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${heightClass}`}>
      <img
        alt={alt}
        src={src}
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  );
}
