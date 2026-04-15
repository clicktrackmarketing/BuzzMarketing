import { NextResponse } from "next/server";
import {
  buildAnalysisPayload,
  analysisFormSchema,
} from "@/lib/analysis-form-schema";

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/A4GV6zKNQKT5XMvVrKIu/webhook-trigger/8900d39e-111d-4117-b898-31d8b13ff3d6";

function log(
  level: "info" | "warn" | "error",
  message: string,
  data?: Record<string, unknown>,
) {
  const entry = {
    ts: new Date().toISOString(),
    route: "POST /api/free-analysis",
    level,
    message,
    ...data,
  };
  const json = JSON.stringify(entry);
  if (level === "error") console.error(json);
  else if (level === "warn") console.warn(json);
  else console.log(json);
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID().slice(0, 8);

  log("info", "Incoming free analysis submission", { requestId });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    log("warn", "Invalid JSON body", { requestId });
    return NextResponse.json(
      { message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = analysisFormSchema.safeParse(body);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({
      path: i.path,
      message: i.message,
    }));
    log("warn", "Validation failed", { requestId, issues });
    return NextResponse.json(
      {
        message: parsed.error.issues[0]?.message ?? "Validation failed",
        issues,
      },
      { status: 400 },
    );
  }

  log("info", "Validation passed", {
    requestId,
    email: parsed.data.email,
  });

  const payload = buildAnalysisPayload(parsed.data);

  log("info", "Built GHL payload, sending to webhook", {
    requestId,
    payloadKeys: Object.keys(payload),
  });

  try {
    const res = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text().catch(() => "<unreadable>");

    if (!res.ok) {
      log("error", "GHL webhook returned error", {
        requestId,
        status: res.status,
        response: responseText.slice(0, 500),
      });
      return NextResponse.json(
        {
          message:
            "We could not send your request. Please try again in a moment or call (720) 363-9754.",
        },
        { status: 502 },
      );
    }

    log("info", "GHL webhook accepted", {
      requestId,
      status: res.status,
      response: responseText.slice(0, 300),
    });

    return NextResponse.json({ ok: true as const });
  } catch (err) {
    log("error", "GHL webhook request failed (network)", {
      requestId,
      error: String(err),
    });
    return NextResponse.json(
      {
        message:
          "We could not send your request. Please try again in a moment or call (720) 363-9754.",
      },
      { status: 502 },
    );
  }
}
