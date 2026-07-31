import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getProjects } from "@/sanity/lib/fetch";
import type { Locale } from "@/sanity/types";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28">
      <h1 className="font-display text-4xl font-semibold md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-xl text-[var(--muted)]">{t("sub")}</p>
      <div className="mt-10">
        <ProjectGrid projects={projects} locale={locale as Locale} />
      </div>
    </div>
  );
}
