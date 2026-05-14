import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const supportedLanguages = [
  { id: "en",      title: "English" },
  { id: "sr-cyrl", title: "Serbian (Cyrillic)" },
  { id: "sr-latn", title: "Serbian (Latin)" },
];

export default defineConfig({
  name: "ravna-gora",
  title: "Ravna Gora",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({ structure }),
    documentInternationalization({
      supportedLanguages,
      schemaTypes: ["event", "historyPage", "homePage"],
    }),
  ],
  schema: { types: schemaTypes },
  basePath: "/studio",
});
