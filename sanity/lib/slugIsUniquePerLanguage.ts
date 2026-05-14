import type { SlugValidationContext } from "sanity";

export async function slugIsUniquePerLanguage(
  slug: string,
  context: SlugValidationContext
): Promise<boolean> {
  const { document, getClient } = context;
  if (!document) return true;

  const client = getClient({ apiVersion: "2024-01-01" });
  const docId = document._id.replace(/^drafts\./, "");

  // Find all docs of this type with the same slug (excluding self and its draft)
  const conflicts = await client.fetch<Array<{ _id: string; language?: string }>>(
    `*[_type == $type && slug.current == $slug && !(_id in [$id, "drafts." + $id])]{_id, language}`,
    { type: document._type, slug, id: docId }
  );

  if (conflicts.length === 0) return true;

  // Look up the translation.metadata document that links all siblings.
  // It stores refs like: translations[].value._ref → the published document _id.
  // We query for metadata that references any of the conflicting docs OR the current doc.
  const allIds = [docId, ...conflicts.map((c) => c._id.replace(/^drafts\./, ""))];

  const metadata = await client.fetch<{ translations: Array<{ value: { _ref: string } }> } | null>(
    `*[_type == "translation.metadata" && count(translations[value._ref in $ids]) > 0][0]{
      translations[]{value{_ref}}
    }`,
    { ids: allIds }
  );

  if (metadata) {
    // We have a metadata doc — all conflicting docs that are siblings are in this family.
    const familySet = new Set(
      metadata.translations.map((t) => t.value._ref.replace(/^drafts\./, ""))
    );
    familySet.add(docId);
    // Valid if every conflict is a known sibling in the same translation family
    return conflicts.every((c) => familySet.has(c._id.replace(/^drafts\./, "")));
  }

  // No metadata yet (first translation being created) — fall back to language comparison.
  // Allow if every conflict has a different language than the current document's language.
  const lang = (document as Record<string, unknown>).language as string | undefined;
  if (!lang) return true;
  return conflicts.every((c) => c.language !== lang);
}
