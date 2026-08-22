import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServices } from "@/sanity/lib/fetch";
import { t as loc, type Locale } from "@/sanity/types";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const services = await getServices();
  const L = locale as Locale;
  const audiences = t.raw("audiences") as string[];
  const included = t.raw("included") as string[];
  const excluded = t.raw("excluded") as string[];
  const faq = t.raw("faq") as { q: string; a: string }[];

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-28">
        <h1 className="max-w-3xl font-display text-4xl font-semibold md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">{t("sub")}</p>
        <Link
          href="/brief"
          className="mt-8 inline-block rounded-sm bg-[var(--neon-cyan)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          {t("cta")}
        </Link>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <li
              key={service._id}
              className={`glass relative flex flex-col p-6 transition hover:border-[var(--neon-cyan)]/30 ${
                service.highlighted ? "border-[var(--neon-cyan)]/50" : ""
              }`}
            >
              {service.highlighted ? (
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--neon-cyan)]">
                  {t("featured")}
                </p>
              ) : null}
              <h2 className="font-display text-2xl font-semibold">
                {loc(service.title, L)}
              </h2>
              <p className="mt-3 flex-1 text-sm text-[var(--muted)]">
                {loc(service.description, L)}
              </p>
              {service.priceFrom ? (
                <p className="mt-6 text-sm">
                  <span className="text-[var(--muted)]">{t("from")} </span>
                  <span className="text-lg font-semibold text-[var(--neon-cyan)]">
                    {service.priceFrom}
                  </span>
                </p>
              ) : null}
              {service.features?.length ? (
                <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-[var(--fg)]/80">
                  {service.features.map((f, i) => (
                    <li key={i}>• {loc(f, L)}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            {t("forWhomTitle")}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {audiences.map((item) => (
              <li key={item} className="glass p-5 text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              {t("includedTitle")}
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-[var(--fg)]/85">
              {included.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">
              {t("excludedTitle")}
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-[var(--muted)]">
              {excluded.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            {t("faqTitle")}
          </h2>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {faq.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="cursor-pointer font-medium">
                  {item.q}
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>

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
