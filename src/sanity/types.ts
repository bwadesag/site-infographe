export type Locale = "fr" | "en";

export type ProjectType = "flyer" | "motion" | "both";

export type LocalizedString = { fr: string; en: string };

export type Project = {
  _id: string;
  title: LocalizedString;
  slug: string;
  type: ProjectType;
  excerpt: LocalizedString;
  description: LocalizedString;
  clientBrief?: LocalizedString;
  tools?: string[];
  coverUrl?: string;
  galleryUrls?: string[];
  videoUrl?: string;
  featured?: boolean;
  order?: number;
};

export type Service = {
  _id: string;
  title: LocalizedString;
  description: LocalizedString;
  priceFrom?: string;
  features?: LocalizedString[];
  order?: number;
};

export type SiteSettings = {
  brandName: string;
  tagline: LocalizedString;
  showreelUrl?: string;
  contactEmail?: string;
  socialLinks?: { label: string; url: string }[];
};

export type AboutContent = {
  bio: LocalizedString;
  processSteps: { title: LocalizedString; body: LocalizedString }[];
};

export function t(value: LocalizedString | undefined, locale: Locale): string {
  if (!value) return "";
  return value[locale] || value.fr || value.en || "";
}
