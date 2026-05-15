import { getTranslations } from "next-intl/server";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { CatalogHeader } from "../../components/ui/CatalogHeader";
import { NewspaperDecadeFilter } from "../../components/ui/NewspaperDecadeFilter";
import { client } from "../../../sanity/lib/client";
import { urlFor, type SanityImage } from "../../../sanity/lib/image";
import type { NewsIssue } from "../../components/ui/NewspaperDecadeFilter";

const A = {
  hero: "/images/landing-hero-original/1512.avif",
};

export const revalidate = 60;

type RawIssue = { number: number; date: string; image: SanityImage; slug: string };

async function getIssues(): Promise<NewsIssue[]> {
  const raw: RawIssue[] = await client.fetch(
    `*[_type == "newspaperIssue"] | order(issueDate desc) {
      "number": issueNumber,
      "date": issueDate,
      image,
      "slug": slug.current
    }`
  );
  return raw.map((r) => ({
    number: r.number,
    date: r.date,
    imageUrl: urlFor(r.image).width(700).auto("format").url(),
    slug: r.slug,
  }));
}

export default async function NewspaperCatalog() {
  const [t, issues] = await Promise.all([
    getTranslations("newspaperCatalog"),
    getIssues(),
  ]);

  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-378 mx-auto px-4 md:px-6 xl:px-10 pt-(--space-8) flex flex-col gap-(--space-8)">

          <CatalogHeader
            imageSrc={A.hero}
            imageAlt={t("imageAlt")}
            title={t("title")}
            description={t("description")}
          />

          <NewspaperDecadeFilter issues={issues} noIssuesLabel={t("noIssues")} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
