import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({ name: "bio", type: "localizedText" }),
    defineField({
      name: "processSteps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "localizedString" }),
            defineField({ name: "body", type: "localizedText" }),
          ],
        },
      ],
    }),
    defineField({
      name: "trustedClients",
      title: "Ils nous font confiance",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Nom entreprise",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "url",
              title: "Site web (optionnel)",
              type: "url",
            }),
          ],
          preview: {
            select: { title: "name", media: "logo" },
          },
        },
      ],
    }),
  ],
});
