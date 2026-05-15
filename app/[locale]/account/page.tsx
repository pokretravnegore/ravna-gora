import { getTranslations } from "next-intl/server";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { AccountContent } from "../../components/ui/AccountContent";

export default async function AccountPage() {
  const t = await getTranslations("account");

  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 pt-(--space-8) pb-(--space-8) flex flex-col gap-(--space-8)">
          <h1 className="type-display text-black">{t("title")}</h1>
          <AccountContent />
        </div>
      </main>

      <Footer />
    </div>
  );
}
