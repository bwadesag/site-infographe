import {
  demoAbout,
  demoProjects,
  demoServices,
  demoSettings,
} from "../demo-data";
import type { AboutContent, Project, Service, SiteSettings } from "../types";
import { hasSanity } from "../env";
import { client } from "./client";
import {
  aboutQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  projectsQuery,
  servicesQuery,
  settingsQuery,
} from "./queries";

async function fetchOrDemo<T>(
  query: string,
  params: Record<string, unknown>,
  demo: T,
): Promise<T> {
  if (!hasSanity || !client) return demo;
  try {
    const data = await client.fetch<T>(query, params, {
      next: { revalidate: 0 },
      perspective: "published",
    });
    return data ?? demo;
  } catch {
    return demo;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  return fetchOrDemo(settingsQuery, {}, demoSettings);
}

export async function getProjects(): Promise<Project[]> {
  return fetchOrDemo(projectsQuery, {}, demoProjects);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const featured = demoProjects.filter((p) => p.featured);
  return fetchOrDemo(featuredProjectsQuery, {}, featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const demo = demoProjects.find((p) => p.slug === slug) ?? null;
  return fetchOrDemo(projectBySlugQuery, { slug }, demo);
}

export async function getServices(): Promise<Service[]> {
  return fetchOrDemo(servicesQuery, {}, demoServices);
}

export async function getAbout(): Promise<AboutContent> {
  const data = await fetchOrDemo(aboutQuery, {}, demoAbout);
  // ponytail: older About docs may miss the new field
  return {
    ...demoAbout,
    ...data,
    processSteps: data.processSteps?.length ? data.processSteps : demoAbout.processSteps,
    trustedClients: data.trustedClients ?? [],
  };
}
