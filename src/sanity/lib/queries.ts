export const projectsQuery = `*[_type == "project"] | order(order asc, _createdAt desc) {
  _id,
  "title": { "fr": title.fr, "en": title.en },
  "slug": slug.current,
  type,
  "excerpt": { "fr": excerpt.fr, "en": excerpt.en },
  "description": { "fr": description.fr, "en": description.en },
  "clientBrief": { "fr": clientBrief.fr, "en": clientBrief.en },
  tools,
  "coverUrl": cover.asset->url,
  "galleryUrls": gallery[].asset->url,
  videoUrl,
  featured,
  order
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  "title": { "fr": title.fr, "en": title.en },
  "slug": slug.current,
  type,
  "excerpt": { "fr": excerpt.fr, "en": excerpt.en },
  "description": { "fr": description.fr, "en": description.en },
  "clientBrief": { "fr": clientBrief.fr, "en": clientBrief.en },
  tools,
  "coverUrl": cover.asset->url,
  "galleryUrls": gallery[].asset->url,
  videoUrl,
  featured,
  order
}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(order asc)[0...6] {
  _id,
  "title": { "fr": title.fr, "en": title.en },
  "slug": slug.current,
  type,
  "excerpt": { "fr": excerpt.fr, "en": excerpt.en },
  "description": { "fr": description.fr, "en": description.en },
  "coverUrl": cover.asset->url,
  videoUrl,
  featured,
  order
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  "title": { "fr": title.fr, "en": title.en },
  "description": { "fr": description.fr, "en": description.en },
  priceFrom,
  "features": features[]{ "fr": fr, "en": en },
  order
}`;

export const settingsQuery = `*[_type == "siteSettings"][0] {
  brandName,
  "tagline": { "fr": tagline.fr, "en": tagline.en },
  showreelUrl,
  contactEmail,
  socialLinks
}`;

export const aboutQuery = `*[_type == "about"][0] {
  "bio": { "fr": bio.fr, "en": bio.en },
  "processSteps": processSteps[]{
    "title": { "fr": title.fr, "en": title.en },
    "body": { "fr": body.fr, "en": body.en }
  },
  "trustedClients": coalesce(trustedClients[]{
    name,
    "logoUrl": logo.asset->url,
    url
  }, [])
}`;
