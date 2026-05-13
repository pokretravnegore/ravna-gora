import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/**
 * Layout for long-form content pages (about, event detail, etc.).
 * Hero spans the full container width; body content is placed in a
 * 12-column grid that occupies the first 6 columns on desktop,
 * all 3 columns on tablet, and the single column on phone.
 *
 * Set heroFullWidth to render the hero outside the container entirely —
 * use this when the hero manages its own width and padding (e.g. EventHero).
 */
export function ContentPageLayout({
  hero,
  heroFullWidth = false,
  children,
}: {
  hero: React.ReactNode;
  heroFullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        {heroFullWidth ? (
          hero
        ) : (
          <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10">
            <div className="pt-[var(--space-8)]">{hero}</div>
          </div>
        )}

        {/* Content — 12-col → first 6 on desktop, 3-of-3 on tablet, full on phone */}
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-12">
            <div className="col-span-1 md:col-span-3 xl:col-span-6">
              {children}
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
