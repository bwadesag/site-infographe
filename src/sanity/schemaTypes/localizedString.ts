import { defineField, defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "Français", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "Français", type: "text" }),
    defineField({ name: "en", title: "English", type: "text" }),
  ],
});
