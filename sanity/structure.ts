import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singleton — always opens the same document
      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
        ),
      S.divider(),
      // All other document types (events, historyPages, …)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "homePage"
      ),
    ]);
