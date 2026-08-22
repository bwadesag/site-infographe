import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServices } from "@/sanity/lib/fetch";
import { t as loc, type Locale } from "@/sanity/types";

type Audience = { title: string; body: string };
type Faq = { q: string; a: string };
type PackCopy = { kicker: string; promise: string };
type PackKey = "flyer" | "motion" | "combo";

function packKey(title: string): PackKey | null {
  const n = title.toLowerCase();
  if (n.includes("combo")) return "combo";
  if (n.includes("motion")) return "motion";
  if (n.includes("flyer")) return "flyer";
  return null;
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
  const proof = t.raw("proof") as string[];
  const packCopy = t.raw("packCopy") as Record<PackKey, PackCopy>;
  const audiences = t.raw("audiences") as Audience[];
  const includedItems = t.raw("includedItems") as string[];
  const extraItems = t.raw("extraItems") as string[];
  const faqs = t.raw("faqs") as Faq[];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 md:pb-24 md:pt-36">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--neon-cyan)]">
            {t("kicker")}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.1] md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
            {t("sub")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/brief"
              className="inline-flex min-h-11 items-center rounded-sm bg-[var(--neon-cyan)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {t("cta")}
            </Link>
            <a
              href="#packs"
              className="glass inline-flex min-h-11 items-center rounded-sm px-5 py-3 text-sm font-semibold transition hover:border-white/30"
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

      <section id="packs" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:py-20">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          {t("packsTitle")}
        </h2>
        <p className="mt-3 max-w-xl text-[var(--muted)]">{t("packsSub")}</p>

        <ul className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {services.map((service) => {
            const title = loc(service.title, L);
            const key = packKey(title);
            const copy = key ? packCopy[key] : null;
            const featured = key === "combo";
            return (
              <li
                key={service._id}
                className={`glass relative flex flex-col p-7 transition hover:border-[var(--neon-cyan)]/40 ${
                  featured
                    ? "border-[var(--neon-cyan)]/70 shadow-[0_0_48px_rgba(225,6,0,0.18)] lg:-translate-y-2"
                    : ""
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neon-cyan)]">
                  {featured ? t("popular") : copy?.kicker}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                  {title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-[var(--fg)]/90">
                  {copy?.promise ?? loc(service.description, L)}
                </p>
                {service.priceFrom ? (
                  <p className="mt-8">
                    <span className="block text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                      {t("from")}
                    </span>
                    <span className="mt-1 block font-display text-3xl font-semibold text-[var(--neon-cyan)]">
                      {service.priceFrom}
                    </span>
                  </p>
                ) : null}
                {service.features?.length ? (
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm text-[var(--fg)]/75">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-[var(--neon-cyan)]" aria-hidden />
                        {loc(f, L)}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Link
                  href="/brief"
                  className={`mt-6 inline-flex min-h-11 items-center justify-center rounded-sm px-4 py-3 text-sm font-semibold transition ${
                    featured
                      ? "bg-[var(--neon-cyan)] text-white hover:brightness-110"
                      : "glass hover:border-white/30"
                  }`}
                >
                  {t("packCta")}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-y border-white/8 bg-[var(--bg-elevated)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            {t("audiencesTitle")}
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {audiences.map((item, i) => (
              <li key={item.title}>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--neon-cyan)]">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass p-7">
            <h2 className="font-display text-2xl font-semibold">
              {t("includedTitle")}
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--fg)]/90">
              {includedItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-[var(--neon-cyan)]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass p-7">
            <h2 className="font-display text-2xl font-semibold">{t("extraTitle")}</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
              {extraItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-white/30" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="mt-20 font-display text-3xl font-semibold md:text-4xl">
          {t("faqTitle")}
        </h2>
        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="cursor-pointer list-none font-display text-xl font-semibold marker:content-none">
                <span className="flex min-h-11 items-center justify-between gap-4">
                  {faq.q}
                  <span
                    className="text-[var(--neon-cyan)] transition group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--fg)]/80">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/8">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-24">
          <h2 className="max-w-2xl font-display text-3xl font-semibold md:text-5xl">
            {t("briefCtaTitle")}
          </h2>
          <p className="mt-4 max-w-lg text-base text-[var(--fg)]/80 md:text-lg">
            {t("briefCtaSub")}
          </p>
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
