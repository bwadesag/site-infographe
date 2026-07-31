"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

const links = [
  { href: "/", key: "home" as const },
  { href: "/portfolio", key: "portfolio" as const },
  { href: "/services", key: "services" as const },
  { href: "/about", key: "about" as const },
  { href: "/brief", key: "brief" as const },
];

export function MobileNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
        className="glass rounded-sm px-3 py-2 text-xs font-semibold uppercase tracking-wider"
      >
        Menu
      </button>
      {open ? (
        <nav className="absolute inset-x-0 top-full border-b border-white/8 bg-[#06080f]/95 px-5 py-4 backdrop-blur-xl">
          <ul className="flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <li key={link.key}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
