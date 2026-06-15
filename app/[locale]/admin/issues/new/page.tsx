import { Link } from "../../../../../i18n/navigation";
import { Navbar } from "../../../../components/layout/Navbar";
import { Footer } from "../../../../components/layout/Footer";
import { AdminGuard } from "../../../../components/admin/AdminGuard";
import { IssueForm } from "../../../../components/admin/IssueForm";

export default function NewIssuePage() {
  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 pt-(--space-8) pb-(--space-8) flex flex-col gap-(--space-6)">
          <div className="flex flex-col gap-2">
            <p className="type-label text-gray-2">
              <Link href="/admin" className="text-blue-2 hover:underline">
                Admin
              </Link>
              {" → New Issue"}
            </p>
            <h1 className="type-display text-black">New Issue</h1>
          </div>
          <AdminGuard>
            <IssueForm />
          </AdminGuard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
