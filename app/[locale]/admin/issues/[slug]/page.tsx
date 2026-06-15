import { Link } from "../../../../../i18n/navigation";
import { Navbar } from "../../../../components/layout/Navbar";
import { Footer } from "../../../../components/layout/Footer";
import { AdminGuard } from "../../../../components/admin/AdminGuard";
import { IssueEditLoader } from "../../../../components/admin/IssueEditLoader";

export default async function IssueEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-378 mx-auto px-4 md:px-6 xl:px-10 pt-(--space-8) pb-(--space-8) flex flex-col gap-(--space-6)">
          <div className="flex flex-col gap-2">
            <p className="type-label text-gray-2">
              <Link href="/admin" className="text-blue-2 hover:underline">
                Admin
              </Link>
              {` → ${slug}`}
            </p>
            <h1 className="type-display text-black">Edit Issue</h1>
          </div>
          <AdminGuard>
            <IssueEditLoader slug={slug} />
          </AdminGuard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
