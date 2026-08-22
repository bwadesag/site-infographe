import type { AboutContent, Project, Service, SiteSettings } from "./types";

export const demoSettings: SiteSettings = {
  brandName: "Kaméleon AG",
  tagline: {
    fr: "Flyers & motion qui marquent.",
    en: "Flyers & motion that stick.",
  },
  showreelUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  contactEmail: "hello@kameleon-ag.com",
  socialLinks: [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "Behance", url: "https://behance.net" },
  ],
};

export const demoProjects: Project[] = [
  {
    _id: "demo-1",
    title: { fr: "Nuit Électrique", en: "Electric Night" },
    slug: "nuit-electrique",
    type: "flyer",
    excerpt: {
      fr: "Campagne club — flyer A5 haute énergie.",
      en: "Club campaign — high-energy A5 flyer.",
    },
    description: {
      fr: "Identité visuelle punchy pour une soirée électro : typo massive, lumière cyan, composition pleine page.",
      en: "Punchy visual identity for an electro night: bold type, cyan light, full-bleed composition.",
    },
    clientBrief: {
      fr: "Attirer un public 18–30 ans avec un visuel partageable.",
      en: "Attract an 18–30 audience with a shareable visual.",
    },
    tools: ["Photoshop", "Illustrator"],
    coverUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
    ],
    featured: true,
    order: 1,
  },
  {
    _id: "demo-2",
    title: { fr: "Pulse Product Drop", en: "Pulse Product Drop" },
    slug: "pulse-product-drop",
    type: "motion",
    excerpt: {
      fr: "Teaser 15s pour un lancement produit.",
      en: "15s teaser for a product launch.",
    },
    description: {
      fr: "Motion design glass + néon pour un drop e-commerce : transitions fluides, typo cinétique.",
      en: "Glass + neon motion for an e-commerce drop: fluid transitions, kinetic type.",
    },
    clientBrief: {
      fr: "Vidéo verticale pour Reels / TikTok.",
      en: "Vertical video for Reels / TikTok.",
    },
    tools: ["After Effects", "Cinema 4D"],
    coverUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    featured: true,
    order: 2,
  },
  {
    _id: "demo-3",
    title: { fr: "Horizon Festival", en: "Horizon Festival" },
    slug: "horizon-festival",
    type: "both",
    excerpt: {
      fr: "Identité festival : flyer + aftermovie teaser.",
      en: "Festival identity: flyer + aftermovie teaser.",
    },
    description: {
      fr: "Système visuel complet — print + motion — pour un festival urbain.",
      en: "Full visual system — print + motion — for an urban festival.",
    },
    tools: ["Illustrator", "After Effects", "Figma"],
    coverUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    featured: true,
    order: 3,
  },
];

export const demoServices: Service[] = [
  {
    _id: "svc-1",
    title: { fr: "Pack Flyer", en: "Flyer Pack" },
    description: {
      fr: "1 concept + 2 révisions, fichier prêt à imprimer.",
      en: "1 concept + 2 revisions, print-ready file.",
    },
    priceFrom: "25 000 FCFA",
    features: [
      { fr: "Format au choix (A5, A6, story…)", en: "Format of choice (A5, A6, story…)" },
      { fr: "Fichiers print + WhatsApp / web", en: "Print + WhatsApp / web files" },
      { fr: "2 allers-retours", en: "2 revision rounds" },
    ],
    order: 1,
  },
  {
    _id: "svc-2",
    title: { fr: "Pack Motion", en: "Motion Pack" },
    description: {
      fr: "Teaser 10–20s pour WhatsApp, Reels et TikTok.",
      en: "10–20s teaser for WhatsApp, Reels and TikTok.",
    },
    priceFrom: "80 000 FCFA",
    features: [
      { fr: "Storyboard léger", en: "Light storyboard" },
      { fr: "Export vertical + horizontal", en: "Vertical + horizontal export" },
      { fr: "Musique libre de droits", en: "Royalty-free music" },
    ],
    order: 2,
  },
  {
    _id: "svc-3",
    title: { fr: "Pack Combo", en: "Combo Pack" },
    description: {
      fr: "Flyer + motion cohérents pour une même campagne.",
      en: "Matching flyer + motion for one campaign.",
    },
    priceFrom: "95 000 FCFA",
    highlighted: true,
    features: [
      { fr: "Identité visuelle unifiée", en: "Unified visual identity" },
      { fr: "Flyer prêt à imprimer", en: "Print-ready flyer" },
      { fr: "Teaser motion 10–20s", en: "10–20s motion teaser" },
    ],
    order: 3,
  },
];

export const demoAbout: AboutContent = {
  bio: {
    fr: "Je conçois des flyers publicitaires et du motion design pour des marques, clubs et lancements produit. Esthétique glass / néon, exécution nette, message clair.",
    en: "I craft advertising flyers and motion design for brands, clubs, and product drops. Glass / neon aesthetic, clean execution, clear message.",
  },
  trustedClients: [],
  processSteps: [
    {
      title: { fr: "Brief", en: "Brief" },
      body: {
        fr: "On clarifie objectif, public, ton et délais.",
        en: "We clarify goal, audience, tone, and deadlines.",
      },
    },
    {
      title: { fr: "Concept", en: "Concept" },
      body: {
        fr: "Direction visuelle + premières propositions.",
        en: "Visual direction + first proposals.",
      },
    },
    {
      title: { fr: "Production", en: "Production" },
      body: {
        fr: "Exécution flyer / motion, itérations ciblées.",
        en: "Flyer / motion execution, focused iterations.",
      },
    },
    {
      title: { fr: "Livraison", en: "Delivery" },
      body: {
        fr: "Fichiers prêts à publier ou imprimer.",
        en: "Files ready to publish or print.",
      },
    },
  ],
};
