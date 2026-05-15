import { defineField, defineType } from "sanity";

export const newspaperIssueType = defineType({
  name: "newspaperIssue",
  title: "Newspaper Issue",
  type: "document",
  fields: [
    defineField({
      name: "issueNumber",
      title: "Issue Number",
      type: "number",
      validation: (r) => r.required().positive().integer(),
    }),
    defineField({
      name: "issueDate",
      title: "Issue Date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "imageUrl",
      title: "Cover Image URL",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "issueNumber",
        slugify: (value: unknown) => String(value),
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "pdfFile",
      title: "PDF File",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { issueNumber: "issueNumber", issueDate: "issueDate" },
    prepare: ({ issueNumber, issueDate }) => ({
      title: `#${issueNumber}`,
      subtitle: issueDate,
    }),
  },
});
