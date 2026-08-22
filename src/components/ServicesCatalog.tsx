"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

export type PackKey = "flyer" | "motion" | "combo";

export type PackView = {
  key: PackKey;
  label: string;
  title: string;
  audience: string;
  promise: string;
  priceFrom?: string;
  features: string[];
  images: string[];
  videoUrl?: string;
  exampleSlug?: string;
};

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neon-cyan)]";

function isPackKey(value: string): value is PackKey {
  return value === "flyer" || value === "motion" || value === "combo";
}

export function ServicesCatalog({ packs }: { packs: PackView[] }) {
  const t = useTranslations("services");
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<PackKey>(packs[0]?.key ?? "flyer");
  const [shot, setShot] = useState(0);

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (isPackKey(fromHash) && packs.some((p) => p.key === fromHash)) {
      setSelected(fromHash);
    }
  }, [packs]);

  useEffect(() => {
    setShot(0);
  }, [selected]);

  const pack = packs.find((p) => p.key === selected) ?? packs[0];

  if (!pack) return null;

  const images = pack.images;
  const activeImage = images[shot] ?? images[0];
  const isMotion = pack.key === "motion";

  function pick(key: PackKey) {
    setSelected(key);
    history.replaceState(null, "", `#${key}`);
    document.getElementById("offre")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {packs.map((item, i) => {
          const active = item.key === selected;
          const cover = item.images[0];
          return (
            <motion.li
              key={item.key}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <button
                type="button"
                onClick={() => pick(item.key)}
                aria-pressed={active}
                className={`group block w-full cursor-pointer text-left transition duration-150 active:scale-[0.99] ${focus} ${
                  active ? "ring-2 ring-[var(--neon-cyan)] ring-offset-2 ring-offset-[var(--bg)]" : ""
                }`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0c1018]">
                  {cover ? (
                    <Image
                      src={cover}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/35 to-black" />
                  )}
                  {item.key === "combo" ? (
                    <span className="absolute left-3 top-3 bg-[var(--neon-cyan)] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                      {t("popular")}
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--neon-cyan)]">
                  {item.label}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">{item.title}</h3>
                {item.priceFrom ? (
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {t("from")} {item.priceFrom}
                  </p>
                ) : null}
              </button>
            </motion.li>
          );
        })}
      </ul>

      <section
        id="offre"
        className="mt-16 scroll-mt-28 border-t border-white/8 pt-12"
        aria-live="polite"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0c1018]">
              {pack.videoUrl && isMotion ? (
                <iframe
                  src={pack.videoUrl}
                  title={pack.title}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media"
                />
              ) : activeImage ? (
                <Image
                  src={activeImage}
                  alt={pack.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/30 to-black" />
              )}
            </div>
            {images.length > 1 ? (
              <ul className="mt-3 grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((src, i) => (
                  <li key={src}>
                    <button
                      type="button"
                      onClick={() => setShot(i)}
                      className={`relative aspect-square w-full cursor-pointer overflow-hidden bg-[#0c1018] ${focus} ${
                        shot === i ? "ring-2 ring-[var(--neon-cyan)]" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--neon-cyan)]">
              {pack.label}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
              {pack.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--fg)]/90">
              {pack.promise}
            </p>
            {pack.priceFrom ? (
              <p className="mt-6">
                <span className="text-xs text-[var(--muted)]">{t("from")} </span>
                <span className="block font-display text-3xl font-semibold tabular-nums">
                  {pack.priceFrom}
                </span>
              </p>
            ) : null}

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              {t("idealFor")}
            </h3>
            <p className="mt-2 text-sm text-[var(--fg)]/85">{pack.audience}</p>

            {pack.features.length ? (
              <>
                <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                  {t("youGet")}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-[var(--fg)]/85">
                  {pack.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/brief"
                className={`inline-flex min-h-11 cursor-pointer items-center rounded-sm bg-[var(--neon-cyan)] px-5 text-sm font-semibold text-white transition duration-150 hover:brightness-110 active:scale-[0.98] ${focus}`}
              >
                {t("packCta")}
              </Link>
              {pack.exampleSlug ? (
                <Link
                  href={`/portfolio/${pack.exampleSlug}`}
                  className={`inline-flex min-h-11 cursor-pointer items-center rounded-sm border border-white/20 px-5 text-sm font-semibold transition duration-150 hover:border-white/40 active:scale-[0.98] ${focus}`}
                >
                  {t("seeExample")}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
