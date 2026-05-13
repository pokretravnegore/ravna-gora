export type PicturePair      = { _key: string; pictureUrl: string; subtext?: string };
export type TwoPicturesBlock = { _type: "pictureTwoPictures"; _key: string; pictures: PicturePair[] };

export function TwoPicturesView({ block }: { block: TwoPicturesBlock }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
      {block.pictures.map((pic) => (
        <figure key={pic._key} className="flex flex-col gap-[10px]">
          <div className="relative w-full h-[260px] md:h-[380px] overflow-hidden">
            <img
              alt={pic.subtext ?? ""}
              src={pic.pictureUrl}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          {pic.subtext && (
            <figcaption className="type-caption text-gray-2">
              {pic.subtext}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
