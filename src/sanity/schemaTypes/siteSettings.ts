import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "brandName", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "localizedString" }),
    defineField({
      name: "showreelUrl",
      title: "Showreel embed URL",
      type: "url",
    }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "url", type: "url" }),
          ],
        },
      ],
    }),
  ],
});
