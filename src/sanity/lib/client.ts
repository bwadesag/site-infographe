import { createClient } from "next-sanity";
import { apiVersion, dataset, hasSanity, projectId } from "../env";

const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN !== "false";

export const client = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null;
