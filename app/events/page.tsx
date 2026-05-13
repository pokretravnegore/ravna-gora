import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { CatalogHeader } from "../components/ui/CatalogHeader";
import { CatalogCard } from "../components/ui/CatalogCard";
import { client } from "../../sanity/lib/client";

export const revalidate = 60;

// Figma MCP asset URLs — expires 7 days after generation
const A = {
  hero: "https://www.figma.com/api/mcp/asset/43e5eb86-74a4-4930-9dc3-c44a94385265",
};

type EventData = {
  _id: string;
  slug: string;
  card: { title: string; subtitle: string; pictureUrl: string };
};

async function getEvents(): Promise<EventData[]> {
  return client.fetch(
    `*[_type == "event" && defined(card)] | order(_createdAt desc) {
      _id,
      "slug": slug.current,
      card
    }`
  );
}

export default async function Events() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 pt-[var(--space-8)] flex flex-col gap-[var(--space-8)]">

          <CatalogHeader
            imageSrc={A.hero}
            imageAlt="Events"
            title="Events"
            description="Browse our archive of past and upcoming events."
          />

          <div className="flex flex-col gap-[var(--space-9)] pb-[var(--space-8)]">
            {events.length === 0 ? (
              <p className="type-body text-gray-2">No events published yet.</p>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-[20px] gap-y-[var(--space-card-v)] w-full">
                {events.map((event) => (
                  <CatalogCard
                    key={event._id}
                    href={`/events/${event.slug}`}
                    title={event.card.title}
                    subtitle={event.card.subtitle}
                    pictureUrl={event.card.pictureUrl}
                  />
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
