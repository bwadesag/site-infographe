import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

const id = projectId || "placeholder";

export default defineConfig({
  name: "brand-portfolio",
  title: "BRAND Portfolio",
  projectId: id,
  dataset,
  basePath: "/studio",
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
