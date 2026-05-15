import { getTranslations } from "next-intl/server";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { CatalogHeader } from "../../components/ui/CatalogHeader";
import { MembershipContent } from "../../components/ui/MembershipContent";

const A = {
  hero: "/images/about-us-section-original/1512.avif",
};

export default async function MembershipPage() {
  const t = await getTranslations("membership");

  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 pt-(--space-8) flex flex-col gap-(--space-8)">

          <CatalogHeader
            imageSrc={A.hero}
            imageAlt={t("imageAlt")}
            title={t("title")}
            description={t("description")}
          />

          <MembershipContent />

        </div>
      </main>

      <Footer />
    </div>
  );
}
