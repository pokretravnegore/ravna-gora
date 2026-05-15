import Image from "next/image";

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
      <Image
        alt={alt}
        src={src}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 640px, (max-width: 1280px) 1024px, 1512px"
      />
    </div>
  );
}
