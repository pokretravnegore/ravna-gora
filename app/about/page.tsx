import { ContentPageLayout } from "../components/layout/ContentPageLayout";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ParagraphView } from "../components/ui/ParagraphView";
import { QuoteView }     from "../components/ui/QuoteView";

// Figma MCP asset URLs — expires 7 days after generation
const A = {
  hero:       "https://www.figma.com/api/mcp/asset/83407c28-2c71-42c1-9311-2f1f6072512d",
  aboutPhoto: "https://www.figma.com/api/mcp/asset/c59cfbd6-a524-433e-8cd1-99cbcc949cf9",
  photo1:     "https://www.figma.com/api/mcp/asset/7f2986c7-1193-4b3d-9951-68c6f4be9538",
  photo2:     "https://www.figma.com/api/mcp/asset/88a45a48-b796-4026-9e3f-244d45978439",
  photo3:     "https://www.figma.com/api/mcp/asset/a3c7bf1d-4c9d-4517-9bff-9e0c82a4cbce",
};

function PhotoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[18px]">
      <div className="relative h-[260px] md:h-[300px] xl:h-[380px] overflow-hidden">
        <img alt="Historical photograph 1" src={A.photo1} className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="relative h-[260px] md:h-[300px] xl:h-[380px] overflow-hidden">
        <img alt="Historical photograph 2" src={A.photo2} className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="hidden xl:block relative h-[380px] overflow-hidden">
        <img alt="Historical photograph 3" src={A.photo3} className="absolute inset-0 size-full object-cover" />
      </div>
    </div>
  );
}

const hero = (
  <section className="flex flex-col gap-[var(--space-9)]">
    <div className="flex flex-col gap-[var(--space-title-sub)] items-center text-center text-black">
      <h1 className="type-display">
        The Movement of Serbian Chetniks Ravne Gore
      </h1>
      <p className="type-h2">About the movement</p>
    </div>

    <div className="relative w-full h-[220px] md:h-[360px] xl:h-[507px] overflow-hidden">
      <img
        alt="Historical photograph of the Serbian Chetnik Movement"
        src={A.hero}
        className="absolute left-0 w-full max-w-none"
        style={{ height: "204.22%", top: "-21.82%" }}
      />
    </div>

    {/* Caption — phone only */}
    <p className="md:hidden type-caption text-gray-2 -mt-[var(--space-6)]">
      Historical photograph, Ravna Gora, 1941
    </p>
  </section>
);

export default function AboutPage() {
  return (
    <ContentPageLayout hero={hero}>
      <div className="flex flex-col gap-[var(--space-10)] py-[var(--space-10)] pb-[var(--space-8)]">

        {/* ── About the Movement ── */}
        <section className="flex flex-col gap-[var(--space-text-tp)]">
          <SectionHeading title="About the Movement" />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text="The Movement of Serbian Chetniks Ravne Gore traces its origins to the mountainous terrain of Serbia, where General Dragoljub Mihailović led the first resistance movement against the Axis occupation of Yugoslavia during the Second World War. Founded on the principles of freedom, faith, and the defense of the Serbian people, the movement represented a continuation of centuries-old Serbian resistance traditions." />
            <ParagraphView text="In the decades following the war, veterans of the movement who found themselves in exile worked tirelessly to preserve its memory and ideals. Under the leadership of Duke Momčilo Đujić and others, formal chapters were established across the diaspora—in the United States, Canada, Australia, and the United Kingdom—to maintain the bonds of community and ensure the historical record was not lost." />
          </div>

          <QuoteView text="The Ravna Gora movement stands as a testament to the enduring spirit of the Serbian people—their courage in the face of occupation, their faith in justice, and their commitment to freedom." />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text="Today, the Movement continues to serve as a guardian of this legacy. Its membership comprises descendants of original Chetniks, veterans, historians, and all those who recognize the importance of preserving this chapter of history with accuracy and dignity." />
            <ParagraphView text="Through its chapters, publications, and community events, the Movement works to transmit this heritage to younger generations, ensuring that the sacrifices and ideals of Ravna Gora are never forgotten." />
          </div>

          {/* Photo + caption */}
          <div className="flex flex-col gap-[10px]">
            <div className="relative w-full h-[320px] md:h-[480px] overflow-hidden">
              <img
                alt="Historical photograph of the movement"
                src={A.aboutPhoto}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="type-body text-black">Photograph</p>
              <p className="type-caption text-gray-2">Archive</p>
            </div>
          </div>
        </section>

        {/* ── Origins ── */}
        <section className="flex flex-col gap-[var(--space-text-tp)]">
          <SectionHeading title="Origins" />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text="The Ravna Gora movement took its name from the plateau in western Serbia where General Mihailović and his officers gathered in the spring of 1941, refusing to accept the German occupation. From this mountain refuge, they organized the first armed resistance movement in occupied Europe, sending dispatches to the Royal Yugoslav Government in exile and coordinating with Allied forces." />
            <ParagraphView text="The movement drew its strength from the Serbian countryside, uniting peasants, officers, clergy, and intellectuals in a common cause. Its guiding principles were rooted in Serbian Orthodox Christian tradition, the memory of the Karadjordjevic dynasty, and a fierce commitment to national independence." />
          </div>

          <PhotoGrid />
        </section>

        {/* ── The Newspaper's Role ── */}
        <section className="flex flex-col gap-[var(--space-text-tp)]">
          <SectionHeading title="The Newspaper's Role" />

          <QuoteView text="Srbija has served not merely as a newspaper but as the living memory of our movement—a bridge between those who fought for Ravna Gora and those who carry that legacy today." />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text="The journal Srbija (Serbia) has been published continuously since the early years of the movement's exile. Through its pages, the movement has documented historical records, shared testimony from veterans, and maintained cultural continuity across generations and continents. The newspaper represents an irreplaceable archive of primary sources and personal accounts that supplement the official historical record." />
            <ParagraphView text="Each issue is a product of the community's collective memory—compiled by members, contributed to by historians, and distributed to subscribers across four continents. The catalog of past issues, spanning decades, constitutes one of the richest continuous documentary sources for the history of the Ravna Gora movement in exile." />
          </div>
        </section>

        {/* ── The Movement Today ── */}
        <section className="flex flex-col gap-[var(--space-text-tp)]">
          <SectionHeading title="The Movement Today" />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text="The Movement of Serbian Chetniks Ravne Gore today operates through its established chapters across the United States, Canada, Australia, and the United Kingdom. Each chapter maintains its own cultural and commemorative calendar while participating in the broader work of the global organization." />
            <ParagraphView text="Contemporary membership draws largely from the descendants of original members and from individuals who share a dedication to Serbian history and cultural heritage. Annual gatherings, memorial services, and cultural events provide opportunities for the community to come together, strengthen bonds, and renew their commitment to the movement's ideals." />
          </div>

          <PhotoGrid />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text="In recent years, the Movement has undertaken significant efforts to digitize and preserve its historical archives, making primary sources more accessible to researchers, historians, and the broader public." />
            <ParagraphView text="Collaboration with academic institutions, Serbian Orthodox Church communities, and cultural organizations has strengthened the movement's ability to fulfill its historical and educational mission." />
            <ParagraphView text="Through its membership programs, the Movement continues to welcome new members who wish to engage with this history and contribute to its preservation for future generations." />
          </div>
        </section>

        {/* ── Preservation & Digital Future ── */}
        <section className="flex flex-col gap-[var(--space-text-tp)]">
          <SectionHeading title="Preservation & Digital Future" />

          <div className="flex flex-col gap-[var(--space-text-p)]">
            <ParagraphView text="The Movement of Serbian Chetniks Ravne Gore recognizes that the preservation of its historical record is among its most pressing responsibilities. Decades of documents, photographs, correspondence, and personal testimonies represent an irreplaceable archive that must be safeguarded for future generations." />
            <ParagraphView text="A central pillar of this effort is the digitization of the movement's archives. By converting physical documents and photographs into digital formats, the Movement aims to ensure their long-term preservation and to make them accessible to researchers and members worldwide through a developing digital platform." />
            <ParagraphView text="In the coming years, the Movement envisions a comprehensive online archive that will serve as a definitive resource for the history of the Ravna Gora movement—one that is both rigorously maintained and openly accessible, fulfilling the organization's commitment to historical truth and responsible stewardship of Serbian heritage." />
          </div>
        </section>

      </div>
    </ContentPageLayout>
  );
}
