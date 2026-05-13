import { defineField, defineType } from "sanity";

export const currentNewspaperType = defineType({
  name: "currentNewspaper",
  title: "Current Newspaper",
  type: "document",
  fields: [
    defineField({
      name: "pdfFile",
      title: "PDF File",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (r) => r.required(),
    }),
  ],
});
