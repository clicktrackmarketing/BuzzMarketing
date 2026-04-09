import { NextResponse } from "next/server";
import {
  buildContactPayload,
  contactFormSchema,
} from "@/lib/contact-form-schema";

/** GoHighLevel (LeadConnector) inbound webhook — server-side only. */
const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/A4GV6zKNQKT5XMvVrKIu/webhook-trigger/8900d39e-111d-4117-b898-31d8b13ff3d6";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Validation failed";
    return NextResponse.json({ message, issues: parsed.error.issues }, { status: 400 });
  }

  const payload = buildContactPayload(parsed.data);

  try {
    const res = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("GHL webhook error", res.status, text);
      return NextResponse.json(
        {
          message:
            "We could not send your message. Please try again in a moment or call (720) 363-9754.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true as const });
  } catch (err) {
    console.error("Contact webhook request failed", err);
    return NextResponse.json(
      {
        message:
          "We could not send your message. Please try again in a moment or call (720) 363-9754.",
      },
      { status: 502 },
    );
  }
}
