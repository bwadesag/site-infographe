import { getTranslations } from "next-intl/server";
import type { SiteSettings } from "@/sanity/types";

export async function SiteFooter({ settings }: { settings: SiteSettings }) {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {settings.brandName}. {t("rights")}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {settings.socialLinks?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--neon-cyan)]"
            >
              {link.label}
            </a>
          ))}
          <a href="/studio" className="hover:text-[var(--neon-cyan)]">
            {t("studio")}
          </a>
        </div>
      </div>
    </footer>
  );
}
