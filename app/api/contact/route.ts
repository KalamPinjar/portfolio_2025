import { NextResponse } from "next/server";
import { z } from "zod";
import { site } from "@/lib/site";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  message: z.string().min(20).max(4000),
  company: z.string().max(0).optional(),
});

/**
 * Rate limit, per instance.
 *
 * Deliberately in-memory: this resets on redeploy and is per-lambda, which is
 * the right trade for a personal contact form. It stops a script hammering
 * one instance without introducing a Redis dependency for a form that gets a
 * handful of submissions a week.
 */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: `Too many messages from here. Email me at ${site.email} instead.` },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "That request was malformed." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the highlighted fields and try again." },
      { status: 400 },
    );
  }

  // Honeypot filled means a bot. Answer 200 so it learns nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  // No mail provider configured — say so plainly rather than pretending to send.
  if (!apiKey) {
    return NextResponse.json(
      {
        error: `The form is not connected to a mail provider yet. Email me directly at ${site.email}.`,
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [site.email],
        reply_to: email,
        subject: `Portfolio enquiry — ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `The mail provider refused that. Email me at ${site.email}.` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: `Could not reach the mail provider. Email me at ${site.email}.` },
      { status: 502 },
    );
  }
}
