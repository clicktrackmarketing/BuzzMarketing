import { NextResponse } from "next/server";
import {
  buildAnalysisPayload,
  analysisFormSchema,
} from "@/lib/analysis-form-schema";
import { forwardToGhl, isHoneypotTriggered } from "@/lib/ghl-webhook";

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

  if (isHoneypotTriggered(body)) {
    log("warn", "Honeypot triggered; dropping submission", { requestId });
    return NextResponse.json({ ok: true as const });
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

  const result = await forwardToGhl(payload, log, requestId);
  if (!result.ok) {
    return NextResponse.json(
      {
        message:
          "We could not send your request. Please try again in a moment or call (720) 363-9754.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true as const });
}
