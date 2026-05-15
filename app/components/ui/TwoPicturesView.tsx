import Image from "next/image";
import { urlFor, type SanityImage } from "../../../sanity/lib/image";

export type PicturePair      = { _key: string; picture: SanityImage; subtext?: string };
export type TwoPicturesBlock = { _type: "pictureTwoPictures"; _key: string; pictures: PicturePair[] };

export function TwoPicturesView({ block }: { block: TwoPicturesBlock }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
      {block.pictures.map((pic) => {
        const src = urlFor(pic.picture).width(700).auto("format").url();
        return (
          <figure key={pic._key} className="flex flex-col gap-[10px]">
            <div className="relative w-full h-[260px] md:h-[380px] overflow-hidden">
              <Image
                alt={pic.subtext ?? ""}
                src={src}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {pic.subtext && (
              <figcaption className="type-caption text-gray-2">
                {pic.subtext}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}
