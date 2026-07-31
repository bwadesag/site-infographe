import { NextResponse } from "next/server";
import { Resend } from "resend";

type BriefBody = {
  name?: string;
  email?: string;
  projectType?: string;
  deadline?: string;
  budget?: string;
  message?: string;
  locale?: string;
};

export async function POST(request: Request) {
  let body: BriefBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, projectType, deadline, budget, message, locale } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const to = process.env.BRIEF_TO_EMAIL || process.env.CONTACT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  // ponytail: without Resend keys, accept & log so UI works in local/demo
  if (!apiKey || !to) {
    console.log("[brief]", { name, email, projectType, deadline, budget, message, locale });
    return NextResponse.json({ ok: true, demo: true });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.BRIEF_FROM_EMAIL || "Brief <onboarding@resend.dev>",
    to: [to],
    replyTo: email,
    subject: `[Brief] ${projectType || "project"} — ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Locale: ${locale || "-"}`,
      `Type: ${projectType || "-"}`,
      `Deadline: ${deadline || "-"}`,
      `Budget: ${budget || "-"}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
