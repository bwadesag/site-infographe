import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAbout } from "@/sanity/lib/fetch";
import { t as loc, type Locale } from "@/sanity/types";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const about = await getAbout();
  const L = locale as Locale;

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-28">
      <h1 className="font-display text-4xl font-semibold md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-8 text-lg leading-relaxed text-[var(--fg)]/90">
        {loc(about.bio, L)}
      </p>
      <h2 className="mt-16 font-display text-2xl font-semibold">
        {t("process")}
      </h2>
      <ol className="mt-8 space-y-6">
        {about.processSteps.map((step, i) => (
          <li key={i} className="flex gap-4 border-l border-[var(--neon-cyan)]/40 pl-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--neon-cyan)]">
                0{i + 1}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold">
                {loc(step.title, L)}
              </h3>
              <p className="mt-2 text-[var(--muted)]">{loc(step.body, L)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
