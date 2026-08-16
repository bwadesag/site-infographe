"use client";

import { useLocale, useTranslations } from "next-intl";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileNav } from "@/components/MobileNav";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const links = [
  { href: "/", key: "home" as const },
  { href: "/portfolio", key: "portfolio" as const },
  { href: "/services", key: "services" as const },
  { href: "/about", key: "about" as const },
  { href: "/brief", key: "brief" as const },
];

export function SiteHeader({ brandName }: { brandName: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-[#06080f]/70 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <BrandLogo brandName={brandName} size="nav" />
        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                className={
                  active
                    ? "text-[var(--neon-cyan)]"
                    : "transition-colors hover:text-[var(--fg)]"
                }
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 text-xs font-medium">
          <MobileNav />
          {routing.locales.map((l) => (
            <Link
              key={l}
              href={pathname}
              locale={l}
              className={
                l === locale
                  ? "text-[var(--neon-cyan)]"
                  : "text-[var(--muted)] hover:text-[var(--fg)]"
              }
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
