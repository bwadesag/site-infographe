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
  ],
});
