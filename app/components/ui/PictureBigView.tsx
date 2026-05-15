import Image from "next/image";
import { urlFor, type SanityImage } from "../../../sanity/lib/image";

export type PictureBigBlock = { _type: "pictureBig"; _key: string; picture: SanityImage; subtext?: string };

export function PictureBigView({ block }: { block: PictureBigBlock }) {
  const src = urlFor(block.picture).width(1200).auto("format").url();

  return (
    <figure className="flex flex-col gap-[10px]">
      <div className="relative w-full h-[300px] md:h-[500px] xl:h-[640px] overflow-hidden">
        <Image
          alt={block.subtext ?? ""}
          src={src}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 640px, (max-width: 1280px) 1024px, 1200px"
        />
      </div>
      {block.subtext && (
        <figcaption className="type-caption text-gray-2">
          {block.subtext}
        </figcaption>
      )}
    </figure>
  );
}
