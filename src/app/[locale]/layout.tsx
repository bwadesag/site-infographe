import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Syne, DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { routing } from "@/i18n/routing";
import { getSettings } from "@/sanity/lib/fetch";
import "../globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      default: t("title"),
      template: `%s · BRAND`,
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    alternates: {
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const settings = await getSettings();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${syne.variable} ${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <SiteHeader brandName={settings.brandName} />
          <main className="flex-1">{children}</main>
          <SiteFooter settings={settings} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
