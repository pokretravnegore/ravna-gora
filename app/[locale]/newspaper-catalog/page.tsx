import { getTranslations } from "next-intl/server";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { CatalogHeader } from "../../components/ui/CatalogHeader";
import { NewspaperDecadeFilter } from "../../components/ui/NewspaperDecadeFilter";
import type { NewsIssue } from "../../components/ui/NewspaperDecadeFilter";

const A = {
  hero: "/images/landing-hero-original/1512.avif",
};

export const revalidate = 60;

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL ?? "http://localhost:8787";

type WorkerIssue = {
  slug: string;
  issue_number: number;
  issue_date: string;
  cover_image_url: string | null;
  title: string | null;
};

async function getIssues(): Promise<NewsIssue[]> {
  try {
    const res = await fetch(`${WORKER_URL}/issues`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const { issues } = (await res.json()) as { issues: WorkerIssue[] };
    return issues.map((i) => ({
      number: i.issue_number,
      date: i.issue_date,
      imageUrl: i.cover_image_url ?? "",
      slug: i.slug,
    }));
  } catch {
    return [];
  }
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
