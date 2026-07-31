import { getTranslations, setRequestLocale } from "next-intl/server";
import { BriefForm } from "@/components/BriefForm";

export default async function BriefPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("brief");

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28">
      <h1 className="font-display text-4xl font-semibold md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-xl text-[var(--muted)]">{t("sub")}</p>
      <div className="mt-12">
        <BriefForm />
      </div>
    </div>
  );
}
