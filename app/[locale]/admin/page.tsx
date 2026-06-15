import { Link } from "../../../i18n/navigation";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { AdminGuard } from "../../components/admin/AdminGuard";
import { DevTokenPanel } from "../../components/admin/DevTokenPanel";
import { IssuesList } from "../../components/admin/IssuesList";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 pt-(--space-8) pb-(--space-8) flex flex-col gap-(--space-6)">
          <h1 className="type-display text-black">Admin</h1>
          <AdminGuard>
            <div className="flex flex-col gap-6">
              <DevTokenPanel />
              <p className="type-body text-gray-2">Admin tools for managing site content.</p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="type-label text-gray-2 uppercase tracking-widest">Newspaper Issues</p>
                  <Link
                    href="/admin/issues/new"
                    className="inline-block bg-blue-2 text-white type-ui-medium px-5 py-2 hover:opacity-90 transition-opacity"
                  >
                    + Add New
                  </Link>
                </div>
                <IssuesList />
              </div>
            </div>
          </AdminGuard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
