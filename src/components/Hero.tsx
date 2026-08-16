"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BrandLogo } from "@/components/BrandLogo";
import { Link } from "@/i18n/navigation";

type HeroProps = {
  brandName: string;
  showreelUrl?: string;
};

export function Hero({ brandName, showreelUrl }: HeroProps) {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      {showreelUrl ? (
        <div className="absolute inset-0 opacity-35">
          <iframe
            src={`${showreelUrl}${showreelUrl.includes("?") ? "&" : "?"}autoplay=1&mute=1&controls=0&loop=1`}
            title="Showreel"
            className="h-full w-full scale-110 object-cover"
            allow="autoplay; encrypted-media"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-[#06080f]/70 to-[#06080f]/40" />
        </div>
      ) : null}

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:pb-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandLogo brandName={brandName} size="hero" link={false} />
        </motion.div>
        <motion.h1
          className="mt-6 max-w-2xl font-display text-2xl font-semibold leading-tight text-[var(--fg)] md:text-4xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("headline")}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-xl text-base text-[var(--muted)] md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("sub")}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/portfolio"
            className="rounded-sm bg-[var(--neon-cyan)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {t("ctaPrimary")}
          </Link>
          <Link
            href="/brief"
            className="glass rounded-sm px-5 py-3 text-sm font-semibold text-[var(--fg)] transition hover:border-white/30"
          >
            {t("ctaSecondary")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
