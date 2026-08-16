import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
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
  const clients = about.trustedClients?.filter((c) => c.logoUrl) ?? [];

  return (
    <>
      <div className="mx-auto max-w-3xl px-5 pb-16 pt-28">
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
            <li
              key={i}
              className="flex gap-4 border-l border-[var(--neon-cyan)]/40 pl-5"
            >
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

      {/* Layout calqué sur la référence : fond clair, grille 4 col, logos grayscale */}
      <section className="w-full bg-white text-[#111]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <h2 className="relative inline-block font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {t("trusted")}
            <span
              className="absolute -bottom-3 left-0 h-[4px] w-14 bg-[#f59a1a]"
              aria-hidden
            />
          </h2>

          {clients.length === 0 ? (
            <p className="mt-12 text-sm text-[#666]">{t("trustedEmpty")}</p>
          ) : (
            <ul className="mt-14 flex flex-wrap items-center justify-start gap-x-12 gap-y-10 md:gap-x-16 md:gap-y-12">
              {clients.map((client) => {
                const logo = (
                  <Image
                    src={client.logoUrl!}
                    alt={client.name}
                    width={360}
                    height={160}
                    className="h-auto max-h-28 w-auto max-w-[280px] object-contain grayscale transition duration-300 hover:grayscale-0 md:max-h-36 md:max-w-[340px]"
                  />
                );
                return (
                  <li
                    key={`${client.name}-${client.logoUrl}`}
                    className="flex items-center justify-center"
                  >
                    {client.url ? (
                      <a
                        href={client.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={client.name}
                        className="flex items-center justify-center"
                      >
                        {logo}
                      </a>
                    ) : (
                      logo
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
