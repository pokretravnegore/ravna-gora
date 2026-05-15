import { getTranslations } from "next-intl/server";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { CatalogHeader } from "../../components/ui/CatalogHeader";
import { NewspaperDecadeFilter } from "../../components/ui/NewspaperDecadeFilter";
import { client } from "../../../sanity/lib/client";
import type { NewsIssue } from "../../components/ui/NewspaperDecadeFilter";

// Figma MCP asset URLs — expires 7 days after generation
const A = {
  hero: "/images/landing-hero-original/1512.avif",
};

export const revalidate = 60;

async function getIssues(): Promise<NewsIssue[]> {
  return client.fetch(
    `*[_type == "newspaperIssue"] | order(issueDate desc) {
      "number": issueNumber,
      "date": issueDate,
      "imageUrl": imageUrl,
      "slug": slug.current
    }`
  );
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
