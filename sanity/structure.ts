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
      S.listItem()
        .title("Current Newspaper")
        .id("currentNewspaper")
        .child(
          S.document()
            .schemaType("currentNewspaper")
            .documentId("3701ce5b-5efb-4826-96db-c19d9c18c6ef")
        ),
      S.divider(),
      // All other document types (events, historyPages, …)
      ...S.documentTypeListItems().filter(
        (item) => !["homePage", "currentNewspaper"].includes(item.getId() ?? "")
      ),
    ]);
