import { getTranslations, setRequestLocale } from "next-intl/server";
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

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28">
      <h1 className="font-display text-4xl font-semibold md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-xl text-[var(--muted)]">{t("sub")}</p>
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <li
            key={service._id}
            className="glass flex flex-col p-6 transition hover:border-[var(--neon-cyan)]/30"
          >
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
    </div>
  );
}
