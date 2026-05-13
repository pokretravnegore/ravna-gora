import Link from "next/link";
import { ICONS } from "../assets";

export function CatalogCard({
  title,
  subtitle,
  pictureUrl,
  href,
}: {
  title: string;
  subtitle: string;
  pictureUrl: string;
  href?: string;
}) {
  const inner = (
    <article className="flex flex-col gap-[10px]">
      <div className="relative w-full h-[300px] md:h-[516px] overflow-hidden">
        <img
          alt={title}
          src={pictureUrl}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[4px] flex-1 min-w-0">
          <p className="type-large text-blue-2">{subtitle}</p>
          <p className="type-h3 text-black">{title}</p>
        </div>
        <img alt="" src={ICONS.arrowLg} className="size-[45px] shrink-0 ml-2" />
      </div>
    </article>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
}