import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ICONS } from "../components/assets";
import { CatalogHeader } from "../components/ui/CatalogHeader";

// Figma MCP asset URLs — expires 7 days after generation
const A = {
  arrowLg:    ICONS.arrowLg,
  hero:       "https://www.figma.com/api/mcp/asset/2680efc6-31d7-4801-875d-84373d1f8081",
  issueCover: "https://www.figma.com/api/mcp/asset/a808d36b-dc83-418d-b3dc-6df3bd249bb3",
};

const DECADES = ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];

// Dummy data — will be replaced by CMS feed
type Issue = { number: string; date: string; coverImage: string };

const ISSUES: Issue[] = [
  { number: "#760", date: "NOVEMBER 2025", coverImage: A.issueCover },
  { number: "#761", date: "DECEMBER 2025", coverImage: A.issueCover },
  { number: "#762", date: "JANUARY 2026",  coverImage: A.issueCover },
  { number: "#763", date: "FEBRUARY 2026", coverImage: A.issueCover },
  { number: "#764", date: "MARCH 2026",    coverImage: A.issueCover },
];

function IssueCard({ number, date, coverImage }: Issue) {
  return (
    <article className="flex flex-col gap-[10px]">
      <div className="relative w-full h-[300px] md:h-[516px] overflow-hidden">
        <img
          alt={`Issue ${number} — ${date}`}
          src={coverImage}
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[4px] flex-1 min-w-0">
          <p className="type-large text-blue-2">{number}</p>
          <p className="type-h3 text-black">{date}</p>
        </div>
        <img alt="Open issue" src={A.arrowLg} className="size-[45px] shrink-0 ml-2" />
      </div>
    </article>
  );
}

export default function NewspaperCatalog() {
  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 pt-[var(--space-8)] flex flex-col gap-[var(--space-8)]">

          <CatalogHeader
            imageSrc={A.hero}
            imageAlt="Historical photograph"
            title="Newspaper Archive"
            description="Browse all issues since 1965"
          >
            {/* Decade filter bar — horizontally scrollable */}
            <div className="flex items-center gap-[var(--space-list-h)] overflow-x-auto pb-1">
              <button className="bg-black text-white type-large whitespace-nowrap shrink-0 px-[var(--btn-big-h)] py-[var(--btn-big-v)]">
                All
              </button>
              {DECADES.map((decade) => (
                <button
                  key={decade}
                  className="border border-black text-black type-large whitespace-nowrap shrink-0 px-[var(--btn-h)] py-[var(--btn-v)]"
                >
                  {decade}
                </button>
              ))}
            </div>
          </CatalogHeader>

          <div className="flex flex-col gap-[var(--space-9)] pb-[var(--space-8)]">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-[20px] gap-y-[var(--space-card-v)] w-full">
              {ISSUES.map((issue) => (
                <IssueCard key={issue.number} {...issue} />
              ))}
            </div>

            <p className="type-h4 text-black text-center">Load More →</p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
