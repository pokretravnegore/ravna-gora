import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ICONS } from "../components/assets";

// Figma MCP asset URLs — expires 7 days after generation
const A = {
  arrowLg:    ICONS.arrowLg,
  hero:       "https://www.figma.com/api/mcp/asset/43e5eb86-74a4-4930-9dc3-c44a94385265",
  eventImage: "https://www.figma.com/api/mcp/asset/89095d23-b13e-4661-93b7-0bb8bbcd98b0",
};

// Dummy data — will be replaced by CMS feed
type Event = { date: string; title: string; image: string };

const EVENTS: Event[] = [
  { date: "2025 September 14th", title: "Annual Commemoration at Ravna Gora",        image: A.eventImage },
  { date: "2025 November 11th",  title: "Day of Remembrance and Reflection",          image: A.eventImage },
  { date: "2026 April 23rd",     title: "Đurđevdan Slava Celebration",               image: A.eventImage },
  { date: "2026 June 19th",      title: "Spring Gathering of the Movement",           image: A.eventImage },
  { date: "2026 October 4th",    title: "Diaspora Cultural Evening",                  image: A.eventImage },
];

function EventCard({ date, title, image }: Event) {
  return (
    <article className="flex flex-col gap-[10px]">
      <div className="relative w-full h-[300px] md:h-[516px] overflow-hidden">
        <img
          alt={title}
          src={image}
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[4px] flex-1 min-w-0">
          <p className="type-large text-blue-2">{date}</p>
          <p className="type-h3 text-black">{title}</p>
        </div>
        <img alt="Open event" src={A.arrowLg} className="size-[45px] shrink-0 ml-2" />
      </div>
    </article>
  );
}

export default function Events() {
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

            {/* Header */}
            <div className="flex flex-col gap-[var(--space-2)]">
              <h1 className="type-display text-black">Events</h1>
              <p className="type-base text-black">Browse our archive of past and upcoming events.</p>
            </div>

            {/* Event grid + Load More */}
            <div className="flex flex-col items-center gap-[var(--space-9)]">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-[20px] gap-y-[var(--space-card-v)] w-full">
                {EVENTS.map((event) => (
                  <EventCard key={event.date} {...event} />
                ))}
              </div>

              <p className="type-h4 text-black text-center">Load More →</p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
