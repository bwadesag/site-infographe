import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

const id = projectId || "rc7se525";

export default defineConfig({
  name: "kameleon-ag",
  title: "Kaméleon AG",
  projectId: "rc7se525",
  dataset,
  basePath: "/studio",
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
