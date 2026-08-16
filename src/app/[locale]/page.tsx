import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects, getSettings } from "@/sanity/lib/fetch";
import type { Locale } from "@/sanity/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const settings = await getSettings();
  const featured = await getFeaturedProjects();

  return (
    <>
      <Hero brandName={settings.brandName} showreelUrl={settings.showreelUrl} />
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          {t("featured")}
        </h2>
        <p className="mt-2 max-w-xl text-[var(--muted)]">{t("featuredSub")}</p>
        <div className="mt-10">
          <ProjectGrid
            projects={featured}
            locale={locale as Locale}
            showFilters={false}
          />
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
            className="mt-8 inline-block rounded-sm bg-[var(--neon-cyan)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {t("briefCtaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
