export type PictureBigBlock = { _type: "pictureBig"; _key: string; pictureUrl: string; subtext?: string };

export function PictureBigView({ block }: { block: PictureBigBlock }) {
  return (
    <figure className="flex flex-col gap-[10px]">
      <div className="relative w-full h-[300px] md:h-[500px] xl:h-[640px] overflow-hidden">
        <img
          alt={block.subtext ?? ""}
          src={block.pictureUrl}
          className="absolute inset-0 size-full object-cover"
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
