import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ServicesCatalog, type PackKey, type PackView } from "@/components/ServicesCatalog";
import { getProjects, getServices } from "@/sanity/lib/fetch";
import { t as loc, type Locale, type Project, type Service } from "@/sanity/types";

type Faq = { q: string; a: string };
type PackCopy = { audience: string; promise: string };

const PACK_ORDER: PackKey[] = ["flyer", "motion", "combo"];
const PROJECT_TYPE: Record<PackKey, Project["type"]> = {
  flyer: "flyer",
  motion: "motion",
  combo: "both",
};

function guessKey(title: string): PackKey | null {
  const n = title.toLowerCase();
  if (n.includes("combo")) return "combo";
  if (n.includes("motion")) return "motion";
  if (n.includes("flyer")) return "flyer";
  return null;
}

function imagesFor(project?: Project) {
  return [project?.coverUrl, ...(project?.galleryUrls ?? [])].filter(
    (url): url is string => Boolean(url),
  );
}

function toPacks(
  services: Service[],
  projects: Project[],
  locale: Locale,
  copy: Record<PackKey, PackCopy>,
  labels: Record<PackKey, string>,
): PackView[] {
  const byKey = new Map<PackKey, Service>();
  for (const service of services) {
    const key = guessKey(loc(service.title, locale));
    if (key) byKey.set(key, service);
  }

  return PACK_ORDER.map((key) => {
    const service = byKey.get(key);
    const project =
      projects.find((p) => p.type === PROJECT_TYPE[key]) ?? projects[0];
    return {
      key,
      label: labels[key],
      title: service ? loc(service.title, locale) : labels[key],
      audience: copy[key].audience,
      promise: copy[key].promise,
      priceFrom: service?.priceFrom,
      features: service?.features?.map((f) => loc(f, locale)) ?? [],
      images: imagesFor(project),
      videoUrl: project?.videoUrl,
      exampleSlug: project?.slug,
    };
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const L = locale as Locale;
  const [services, projects] = await Promise.all([getServices(), getProjects()]);
  const packs = toPacks(
    services,
    projects,
    L,
    t.raw("packCopy") as Record<PackKey, PackCopy>,
    t.raw("jump") as Record<PackKey, string>,
  );
  const includedItems = t.raw("includedItems") as string[];
  const extraItems = t.raw("extraItems") as string[];
  const faqs = t.raw("faqs") as Faq[];
  const proof = t.raw("proof") as string[];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 md:min-h-[88svh] md:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--neon-cyan)]">
            {t("kicker")}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
            {t("sub")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/brief"
              className="inline-flex min-h-11 cursor-pointer items-center rounded-sm bg-[var(--neon-cyan)] px-5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {t("cta")}
            </Link>
            <a
              href="#packs"
              className="glass inline-flex min-h-11 cursor-pointer items-center rounded-sm px-5 text-sm font-semibold transition hover:border-white/30"
            >
              {t("ctaPacks")}
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {proof.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-[var(--fg)]/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div id="packs" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-8 pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--neon-cyan)]">
          {t("pick")}
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">{t("pickSub")}</p>
        <div className="mt-8">
          <ServicesCatalog packs={packs} />
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              {t("includedTitle")}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-[var(--fg)]/85">
              {includedItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">{t("extraTitle")}</h2>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              {extraItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold">{t("faqTitle")}</h2>
        <div className="mt-6 max-w-2xl divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-4">
              <summary className="cursor-pointer list-none text-[15px] font-medium marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neon-cyan)]">
                <span className="flex min-h-11 items-center justify-between gap-4">
                  {faq.q}
                  <span className="text-[var(--muted)]" aria-hidden>
                    +
                  </span>
                </span>
              </summary>
              <p className="pb-2 text-sm leading-relaxed text-[var(--muted)]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/8">
        <div
          className="absolute inset-0 opacity-80"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            {t("briefCtaTitle")}
          </h2>
          <p className="mt-3 max-w-lg text-[var(--muted)]">{t("briefCtaSub")}</p>
          <Link
            href="/brief"
            className="mt-8 inline-flex min-h-11 cursor-pointer items-center rounded-sm bg-[var(--neon-cyan)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {t("briefCtaButton")}
          </Link>
        </div>
      </section>
    </div>
  );
}
