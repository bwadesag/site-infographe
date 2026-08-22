import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServices } from "@/sanity/lib/fetch";
import { t as loc, type Locale } from "@/sanity/types";

type Audience = { title: string; body: string };
type Faq = { q: string; a: string };

function isCombo(title: string) {
  return title.toLowerCase().includes("combo");
}

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
  const audiences = t.raw("audiences") as Audience[];
  const includedItems = t.raw("includedItems") as string[];
  const extraItems = t.raw("extraItems") as string[];
  const faqs = t.raw("faqs") as Faq[];

  return (
    <div className="pb-0">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-28">
        <h1 className="max-w-3xl font-display text-4xl font-semibold md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-xl text-[var(--muted)]">{t("sub")}</p>
        <Link
          href="/brief"
          className="mt-8 inline-flex min-h-11 items-center rounded-sm bg-[var(--neon-cyan)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          {t("cta")}
        </Link>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const title = loc(service.title, L);
            const featured = isCombo(title);
            return (
              <li
                key={service._id}
                className={`glass relative flex flex-col p-6 transition hover:border-[var(--neon-cyan)]/30 ${
                  featured ? "border-[var(--neon-cyan)]/50" : ""
                }`}
              >
                {featured ? (
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neon-cyan)]">
                    {t("popular")}
                  </p>
                ) : null}
                <h2 className="font-display text-2xl font-semibold">{title}</h2>
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
            );
          })}
        </ul>

        <h2 className="mt-20 font-display text-3xl font-semibold">
          {t("audiencesTitle")}
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {audiences.map((item) => (
            <li key={item.title} className="border-l border-[var(--neon-cyan)]/40 pl-5">
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              {t("includedTitle")}
            </h2>
            <ul className="mt-5 space-y-2 text-sm text-[var(--fg)]/85">
              {includedItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">{t("extraTitle")}</h2>
            <ul className="mt-5 space-y-2 text-sm text-[var(--muted)]">
              {extraItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="mt-20 font-display text-3xl font-semibold">
          {t("faqTitle")}
        </h2>
        <div className="mt-8 max-w-3xl divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-4">
              <summary className="cursor-pointer list-none font-display text-lg font-semibold marker:content-none">
                <span className="flex min-h-11 items-center justify-between gap-4">
                  {faq.q}
                  <span
                    className="text-[var(--muted)] transition group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
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
            className="mt-8 inline-flex min-h-11 items-center rounded-sm bg-[var(--neon-cyan)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {t("briefCtaButton")}
          </Link>
        </div>
      </section>
    </div>
  );
}
