import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ICONS } from "../components/assets";
import { client } from "../../sanity/lib/client";
import Link from "next/link";

// Figma MCP asset URLs — expires 7 days after generation
const A = {
  arrowLg: ICONS.arrowLg,
  hero:    "https://www.figma.com/api/mcp/asset/43e5eb86-74a4-4930-9dc3-c44a94385265",
};

type EventSummary = {
  _id: string;
  title: string;
  subtitle?: string;
  pictureUrl: string;
  slug: string;
};

async function getEvents(): Promise<EventSummary[]> {
  return client.fetch(
    `*[_type == "event"] | order(_createdAt desc) {
      _id,
      title,
      subtitle,
      pictureUrl,
      "slug": slug.current
    }`
  );
}

function EventCard({ title, subtitle, pictureUrl, slug }: EventSummary) {
  return (
    <Link href={`/events/${slug}`}>
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
            {subtitle && <p className="type-large text-blue-2">{subtitle}</p>}
            <p className="type-h3 text-black">{title}</p>
          </div>
          <img alt="Open event" src={A.arrowLg} className="size-[45px] shrink-0 ml-2" />
        </div>
      </article>
    </Link>
  );
}

export default async function Events() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 pt-[var(--space-8)] flex flex-col gap-[var(--space-8)]">

          {/* Hero image */}
          <div className="relative w-full h-[300px] md:h-[507px] overflow-hidden">
            <img
              alt="Events"
              src={A.hero}
              className="absolute inset-0 size-full object-cover"
            />
          </div>

          {/* Header + catalog */}
          <div className="flex flex-col gap-[var(--space-9)] pb-[var(--space-8)]">

            <div className="flex flex-col gap-[var(--space-2)]">
              <h1 className="type-display text-black">Events</h1>
              <p className="type-base text-black">Browse our archive of past and upcoming events.</p>
            </div>

            {events.length === 0 ? (
              <p className="type-body text-gray-2">No events published yet.</p>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-[20px] gap-y-[var(--space-card-v)] w-full">
                {events.map((event) => (
                  <EventCard key={event._id} {...event} />
                ))}
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
