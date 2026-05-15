import { getTranslations } from "next-intl/server";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { CatalogHeader } from "../../components/ui/CatalogHeader";
import { CatalogCard }   from "../../components/ui/CatalogCard";
import { client } from "../../../sanity/lib/client";

// Figma MCP asset URLs — expires 7 days after generation
const A = {
  hero: "https://www.figma.com/api/mcp/asset/2680efc6-31d7-4801-875d-84373d1f8081",
};

export const revalidate = 60;

const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

function formatIssueDate(isoDate: string): string {
  const [year, month] = isoDate.split("-");
  return `${MONTHS[parseInt(month, 10) - 1]} ${year}`;
}

type Issue = {
  number: number;
  date: string;
  imageUrl: string;
  slug: string;
};

async function getIssues(): Promise<Issue[]> {
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

          <div className="flex flex-col gap-[var(--space-9)] pb-[var(--space-8)]">
            {issues.length === 0 ? (
              <p className="type-body text-gray-1 text-center py-(--space-8)">
                {t("noIssues")}
              </p>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-5 gap-y-(--space-card-v) w-full">
                {issues.map((issue) => (
                  <CatalogCard
                    key={issue.slug}
                    subtitle={`#${issue.number}`}
                    title={formatIssueDate(issue.date)}
                    pictureUrl={issue.imageUrl}
                    href={`/newspaper/${issue.slug}`}
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
