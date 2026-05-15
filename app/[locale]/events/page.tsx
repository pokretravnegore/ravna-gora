import { getTranslations } from "next-intl/server";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { CatalogHeader } from "../../components/ui/CatalogHeader";
import { CatalogCard } from "../../components/ui/CatalogCard";
import { client } from "../../../sanity/lib/client";

export const revalidate = 60;

const A = {
  hero: "/images/events-original/1512.avif",
};

type EventData = {
  _id: string;
  slug: string;
  card: { title: string; subtitle: string; pictureUrl: string };
};

async function getEvents(locale: string): Promise<EventData[]> {
  return client.fetch(
    `*[_type == "event" && defined(card) && (language == $locale || (!defined(language) && $locale == "en"))] | order(_createdAt desc) {
      _id,
      "slug": slug.current,
      card
    }`,
    { locale }
  );
}

export default async function Events({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("events");
  const events = await getEvents(locale);

  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 pt-[var(--space-8)] flex flex-col gap-[var(--space-8)]">

          <CatalogHeader
            imageSrc={A.hero}
            imageAlt={t("imageAlt")}
            title={t("title")}
            description={t("description")}
          />

          <div className="flex flex-col gap-[var(--space-9)] pb-[var(--space-8)]">
            {events.length === 0 ? (
              <p className="type-body text-gray-2">{t("noEvents")}</p>
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
