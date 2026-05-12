import Link from "next/link";
import { ICONS } from "../assets";

/**
 * Clickable card for an event on the /events listing page.
 * Displays the card preview image, subtitle, and title, and links
 * to the full event detail page at /events/[slug].
 */
export function EventCard({
  slug,
  card,
}: {
  slug: string;
  card: { title: string; subtitle: string; pictureUrl: string };
}) {
  return (
    <Link href={`/events/${slug}`}>
      <article className="flex flex-col gap-[10px]">
        <div className="relative w-full h-[300px] md:h-[516px] overflow-hidden">
          <img
            alt={card.title}
            src={card.pictureUrl}
            className="absolute inset-0 size-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[4px] flex-1 min-w-0">
            <p className="type-large text-blue-2">{card.subtitle}</p>
            <p className="type-h3 text-black">{card.title}</p>
          </div>
          <img alt="Open event" src={ICONS.arrowLg} className="size-[45px] shrink-0 ml-2" />
        </div>
      </article>
    </Link>
  );
}
