"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale, Project, ProjectType } from "@/sanity/types";
import { t as loc } from "@/sanity/types";

type Filter = "all" | ProjectType;

export function ProjectGrid({
  projects,
  locale,
  showFilters = true,
}: {
  projects: Project[];
  locale: Locale;
  showFilters?: boolean;
}) {
  const t = useTranslations("portfolio");
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.type === filter || p.type === "both");
  }, [filter, projects]);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t("filterAll") },
    { id: "flyer", label: t("filterFlyer") },
    { id: "motion", label: t("filterMotion") },
  ];

  return (
    <div>
      {showFilters ? (
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-sm px-4 py-2 text-sm transition ${
                filter === f.id
                  ? "bg-[var(--neon-cyan)] text-[#041016]"
                  : "glass text-[var(--muted)] hover:text-[var(--fg)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="text-[var(--muted)]">{t("empty")}</p>
      ) : (
        <ul className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <motion.li
              key={project._id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative min-h-[280px] overflow-hidden bg-[#06080f]"
            >
              <Link href={`/portfolio/${project.slug}`} className="block h-full">
                {project.coverUrl ? (
                  <Image
                    src={project.coverUrl}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-fuchsia-900/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative flex h-full min-h-[280px] flex-col justify-end p-5">
                  <span className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--neon-cyan)]">
                    {project.type}
                  </span>
                  <h3 className="font-display text-xl font-semibold">
                    {loc(project.title, locale)}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/70">
                    {loc(project.excerpt, locale)}
                  </p>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
