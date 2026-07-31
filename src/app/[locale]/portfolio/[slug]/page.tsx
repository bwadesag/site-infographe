import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug, getProjects } from "@/sanity/lib/fetch";
import { t as loc, type Locale } from "@/sanity/types";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.flatMap((p) =>
    ["fr", "en"].map((locale) => ({ locale, slug: p.slug })),
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const L = locale as Locale;

  return (
    <article className="mx-auto max-w-4xl px-5 pb-20 pt-28">
      <Link
        href="/portfolio"
        className="text-sm text-[var(--muted)] hover:text-[var(--neon-cyan)]"
      >
        ← {t("back")}
      </Link>
      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[var(--neon-cyan)]">
        {project.type}
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
        {loc(project.title, L)}
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">
        {loc(project.excerpt, L)}
      </p>

      {project.coverUrl ? (
        <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden">
          <Image
            src={project.coverUrl}
            alt=""
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      ) : null}

      {project.videoUrl ? (
        <div className="mt-6 aspect-video w-full overflow-hidden border border-white/10">
          <iframe
            src={project.videoUrl}
            title={loc(project.title, L)}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}

      <div className="prose-invert mt-10 space-y-6 text-[var(--fg)]/90">
        <p className="whitespace-pre-line leading-relaxed">
          {loc(project.description, L)}
        </p>
        {project.clientBrief ? (
          <div>
            <h2 className="font-display text-xl font-semibold">
              {t("clientBrief")}
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              {loc(project.clientBrief, L)}
            </p>
          </div>
        ) : null}
        {project.tools?.length ? (
          <div>
            <h2 className="font-display text-xl font-semibold">{t("tools")}</h2>
            <p className="mt-2 text-[var(--muted)]">{project.tools.join(" · ")}</p>
          </div>
        ) : null}
      </div>

      {project.galleryUrls?.length ? (
        <div className="mt-12 grid gap-4">
          {project.galleryUrls.map((url) => (
            <div key={url} className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={url}
                alt=""
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
