import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN !== "false";

// ponytail: always a real client so defineLive typechecks; fetch.ts still skips via hasSanity
export const client = createClient({
  projectId: projectId || "unset",
  dataset,
  apiVersion,
  useCdn,
});
