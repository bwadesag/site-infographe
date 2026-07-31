import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localizedString", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title.fr" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Flyer", value: "flyer" },
          { title: "Motion", value: "motion" },
          { title: "Both", value: "both" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", type: "localizedText" }),
    defineField({ name: "description", type: "localizedText" }),
    defineField({ name: "clientBrief", type: "localizedText" }),
    defineField({
      name: "tools",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "cover", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "videoUrl",
      title: "Video embed URL",
      type: "url",
      description: "YouTube / Vimeo embed URL",
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "title.fr", media: "cover", type: "type" },
    prepare({ title, media, type }) {
      return { title: title || "Untitled", subtitle: type, media };
    },
  },
});
