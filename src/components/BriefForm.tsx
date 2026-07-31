"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

export function BriefForm() {
  const t = useTranslations("brief");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  const field =
    "w-full rounded-sm border border-white/12 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-[var(--neon-cyan)]";

  return (
    <form onSubmit={onSubmit} className="mx-auto grid max-w-xl gap-4">
      <label className="grid gap-1.5 text-sm">
        <span>{t("name")}</span>
        <input name="name" required className={field} />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span>{t("email")}</span>
        <input name="email" type="email" required className={field} />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span>{t("projectType")}</span>
        <select name="projectType" required className={field}>
          <option value="flyer">{t("typeFlyer")}</option>
          <option value="motion">{t("typeMotion")}</option>
          <option value="both">{t("typeBoth")}</option>
          <option value="other">{t("typeOther")}</option>
        </select>
      </label>
      <label className="grid gap-1.5 text-sm">
        <span>{t("deadline")}</span>
        <input name="deadline" className={field} />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span>{t("budget")}</span>
        <input name="budget" className={field} />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span>{t("message")}</span>
        <textarea name="message" required rows={5} className={field} />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-sm bg-[var(--neon-cyan)] px-5 py-3 text-sm font-semibold text-[#041016] transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
      {status === "ok" ? (
        <p className="text-sm text-[var(--neon-cyan)]">{t("success")}</p>
      ) : null}
      {status === "err" ? (
        <p className="text-sm text-[var(--neon-magenta)]">{t("error")}</p>
      ) : null}
    </form>
  );
}
