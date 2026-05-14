import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Home Page — shows all language versions; the plugin adds a language tab inside
      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(
          S.documentList()
            .title("Home Page")
            .schemaType("homePage")
            .filter('_type == "homePage"')
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
      // Events and History Pages — the plugin adds a language tab inside each document
      ...S.documentTypeListItems().filter(
        (item) => !["homePage", "currentNewspaper"].includes(item.getId() ?? "")
      ),
    ]);
