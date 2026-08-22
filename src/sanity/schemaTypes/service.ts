import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localizedString", validation: (r) => r.required() }),
    defineField({ name: "description", type: "localizedText" }),
    defineField({ name: "priceFrom", title: "Prix à partir de", type: "string" }),
    defineField({
      name: "highlighted",
      title: "Mettre en avant",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "features",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "title.fr", subtitle: "priceFrom" },
  },
});
