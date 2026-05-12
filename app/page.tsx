import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SectionHeading } from "./components/ui/SectionHeading";
import { ICONS } from "./components/assets";

// Figma MCP asset URLs — expires 7 days after generation
const A = {
  arrowLg: ICONS.arrowLg,
  arrowSm: ICONS.arrowSm,
  // Photos
  hero:     "https://www.figma.com/api/mcp/asset/f8726c09-f189-4d8c-89d3-ea3631839b0d",
  magazine: "https://www.figma.com/api/mcp/asset/bbdd735f-5579-40d2-b45d-348bef1c4ede",
  about:    "https://www.figma.com/api/mcp/asset/bea1d0ed-cac3-47c3-91b7-b6ae259519a1",
  hist1:    "https://www.figma.com/api/mcp/asset/5ac6e05d-d541-4908-8d31-373a1885e9e1",
  hist2:    "https://www.figma.com/api/mcp/asset/752ba48a-15c5-46e5-b850-7351736ec531",
  hist3:    "https://www.figma.com/api/mcp/asset/3ed95168-eb43-4ae9-a642-aef90f7e171f",
  hist4:    "https://www.figma.com/api/mcp/asset/dc5600b8-975b-4700-831d-ea38515bb9b5",
  hist5:    "https://www.figma.com/api/mcp/asset/3f3aa435-ab67-45db-93f0-2751c8cc5ff1",
};

const histArticles = [
  {
    part: "Part 1",
    title: "General Mihailovic and the Ravna Gora Movement",
    img: A.hist1,
    excerpt:
      "In seeking to most clearly illustrate the history of the Chetnik movement, no source is perhaps as useful and as historically indicative as are the wartime records of General Mihailovic (1893–1946). Though the future will present many more opportunities to examine these records…",
  },
  {
    part: "Part 2",
    title: "Foreign Testimonies About Chetniks and General Mihalovic",
    img: A.hist2,
    excerpt:
      "General Mihailovic was a tragic hero of the Serbian people in the Second World War. Serbian people consider him a hero, but there are those who say he is a traitor. The biggest honors for one person cannot come from within his own people, but from the independent foreign observers.",
  },
  {
    part: "Part 3",
    title: "Serbian national movement outside of Serbia",
    img: A.hist3,
    excerpt:
      "Sources used in this text are from the war archives of Dinara Chetnik Division. The first call to arms in occupied Europe issued by the future leader of the Third Serbian Uprising, General Dragoljub Draža Mihailović.",
  },
  {
    part: "Part 4",
    title: "Symbols and traditions",
    img: A.hist4,
    excerpt:
      "In keeping with its commitment to the study and preservation of Serbian history and cultural heritage, the Movement honors a set of established symbols and traditions that reflect its historical identity.",
  },
  {
    part: "Part 5",
    title: "Celebrations and commemorations",
    img: A.hist5,
    excerpt:
      "Commemorations form an important part of the Movement's cultural and community life, reflecting its dedication to historical memory and Serbian tradition. Alongside the observance of the Slava Đurđevdan, members mark dates of lasting significance.",
  },
];

const chapters = [
  { name: "United States", hasLink: false },
  { name: "Canada", hasLink: true },
  { name: "United Kingdom", hasLink: true },
  { name: "Australia", hasLink: true },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-offwhite-1 flex flex-col">

      <Navbar />

      <main className="flex-1">
        <div className="max-w-[1512px] mx-auto px-4 md:px-6 xl:px-10 pt-[var(--space-8)] flex flex-col gap-[var(--space-10)]">

          {/* ── Hero ── */}
          <section className="flex flex-col gap-[var(--space-9)]">
            <div className="flex flex-col gap-[var(--space-title-sub)] items-center text-center text-black">
              <h1 className="type-display">
                Movement of Serbian Chetniks Ravne Gore
              </h1>
              <p className="type-h2">
                Guardians of the Ravna Gora ideals—past, present, and future.
              </p>
            </div>

            <div className="w-full h-[220px] md:h-[360px] xl:h-[507px] overflow-hidden relative">
              <img
                alt="Historical photograph of the Serbian Chetnik Movement"
                src={A.hero}
                className="absolute left-0 w-full max-w-none"
                style={{ height: "204.22%", top: "-21.82%" }}
              />
            </div>
          </section>

          {/* ── All content sections ── */}
          <div className="flex flex-col gap-[var(--space-10)]">

            {/* ── Welcome quote ── */}
            <div className="flex items-center gap-4 xl:gap-[73px]">
              <div className="hidden xl:block w-[51px] border-t-2 border-black shrink-0" />
              <p className="type-h1 text-black text-center flex-1">
                Welcome to the official website of the Movement of Serbian Chetniks Ravne
                Gore. Founded more than seventy years ago, the Movement was established to
                safeguard the Ravna Gora ideals forged in the struggle for the survival of
                the Serbian people during World War II.
              </p>
              <div className="hidden xl:block w-[51px] border-t-2 border-black shrink-0" />
            </div>

            {/* ── Latest newspaper card ── */}
            <div className="flex justify-center">
              <div className="flex flex-col gap-[var(--space-3)] w-full max-w-[464px]">
                <div className="relative h-[300px] md:h-[360px] xl:h-[420px] overflow-hidden">
                  <img
                    alt="Latest issue of Srbija newspaper"
                    src={A.magazine}
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="flex flex-col gap-[var(--space-3)]">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                      <p className="type-large text-black">March 2026</p>
                      <h3 className="type-h3 text-black">Latest Issue (#764)</h3>
                    </div>
                    <img alt="Open issue" src={A.arrowLg} className="size-[45px] shrink-0 ml-2" />
                  </div>

                  <p className="type-body text-black">
                    Read the latest newspaper issue. Stay up to date with the most recent news.
                  </p>
                </div>
              </div>
            </div>

            {/* ── About ── */}
            <section className="flex flex-col xl:flex-row items-start justify-between gap-[var(--space-10)] xl:gap-[73px]">
              <div className="flex flex-col gap-[var(--space-big)] w-full xl:w-[586px] shrink-0">
                <div className="flex flex-col gap-[var(--space-text-tp)]">
                  <SectionHeading title="About" />

                  <div className="flex flex-col gap-[var(--space-text-p)]">
                    <p className="type-body text-black">
                      The Movement of Serbian Chetniks Ravne Gore exists to preserve and uphold
                      the ideals associated with Ravna Gora and Dinara and the legacy of those
                      who fought for the Serbian people and their Allies during the Second World
                      War. The organization was founded seventy years ago by Duke Momčilo Đujić
                      and his men. In the difficult years that followed the war, many of them
                      endured prolonged stays in Allied Displacement Camps before being permitted
                      to emigrate to the free world, including the United States, Canada,
                      Australia, and Great Britain.
                    </p>
                    <p className="type-body text-black">
                      Today, the Movement represents a global community united by historical
                      memory, shared heritage, and a commitment to preserving the traditions,
                      experiences, and perspectives that shaped its origins.
                    </p>
                  </div>
                </div>

                <p className="type-h4 text-black text-center">Load More   →</p>
              </div>

              <div className="flex flex-col gap-[10px] w-full xl:w-[716px] p-[10px]">
                <div className="relative h-[280px] md:h-[380px] xl:h-[489px] w-full">
                  <img
                    alt="Historical photograph"
                    src={A.about}
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="type-body text-black">Photograph</p>
                  <p className="type-caption text-gray-2">1940</p>
                </div>
              </div>
            </section>

            {/* ── Historical Introduction ── */}
            <section className="flex flex-col gap-[var(--space-text-tp)]">
              <SectionHeading title="Historical Introduction" />

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-[18px] gap-y-[var(--space-card-v)]">
                {histArticles.map(({ part, title, img, excerpt }) => (
                  <article key={part} className="flex flex-col gap-[var(--space-text-p)]">
                    <div className="relative h-[260px] md:h-[320px] xl:h-[421px] overflow-hidden">
                      <img
                        alt={title}
                        src={img}
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-[var(--space-text-p)]">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                          <p className="type-large text-black">{part}</p>
                          <h3 className="type-h3 text-black">{title}</h3>
                        </div>
                        <img
                          alt="Open article"
                          src={A.arrowLg}
                          className="size-[45px] shrink-0 ml-2 mt-1"
                        />
                      </div>

                      <p className="type-body text-black line-clamp-3">{excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ── Chapters ── */}
            <section className="flex flex-col gap-[var(--space-text-tp)]">
              <SectionHeading title="Chapters" />

              <div className="flex justify-center">
                <div className="w-full max-w-[949px] flex flex-col gap-[var(--space-4)]">
                  {chapters.map(({ name, hasLink }) => (
                    <div key={name} className="flex flex-col gap-[var(--space-4)]">
                      <div className="h-px bg-black/20 w-full" />
                      <div className="flex items-center justify-between">
                        <p className="type-h2 text-black">{name}</p>
                        {hasLink && (
                          <a href="#" className="flex items-center gap-[var(--space-2)]">
                            <p className="type-body text-black">Visit</p>
                            <img alt="Visit" src={A.arrowSm} className="size-[23px]" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="h-px bg-black/20 w-full" />
                </div>
              </div>
            </section>

            {/* ── Membership ── */}
            <section className="pb-[var(--space-8)]">
              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-[var(--space-10)] xl:gap-[141px]">
                <div className="flex flex-col gap-[var(--space-text-tp)] w-full xl:w-[706px]">
                  <SectionHeading title="Membership" />

                  <div className="flex flex-col gap-[var(--space-text-p)]">
                    <p className="type-body text-black">
                      Membership in the Movement represents a commitment to historical memory,
                      cultural continuity, and the preservation of Serbian heritage. By joining,
                      members support ongoing efforts to safeguard archival materials, preserve
                      historical records, and contribute to the responsible transmission of
                      history to future generations. Membership also provides a meaningful way
                      for descendants and family members to remain connected to their roots and
                      to the historical experiences that shaped earlier generations.
                    </p>
                    <p className="type-body text-black">
                      Members receive the journal Srbija, access to developing digital archives
                      and historical resources, and invitations to annual gatherings,
                      commemorative events, and community activities. For families and younger
                      generations, participation offers opportunities to engage with history,
                      community, and shared cultural traditions. Above all, membership affirms
                      participation in a tradition rooted in remembrance, identity, and shared
                      heritage.
                    </p>
                  </div>
                </div>

                <a
                  href="#"
                  className="bg-blue-2 text-white type-h4 text-center w-full xl:w-[464px] py-[26px] px-5 flex items-center justify-center shrink-0"
                >
                  Join the Movement   →
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
