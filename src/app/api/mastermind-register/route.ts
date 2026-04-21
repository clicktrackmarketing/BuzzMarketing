import { NextResponse } from "next/server";
import {
  buildMastermindPayload,
  mastermindFormSchema,
} from "@/lib/mastermind-form-schema";
import { forwardToGhl, isHoneypotTriggered } from "@/lib/ghl-webhook";

function log(
  level: "info" | "warn" | "error",
  message: string,
  data?: Record<string, unknown>,
) {
  const entry = {
    ts: new Date().toISOString(),
    route: "POST /api/mastermind-register",
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
  log("info", "Incoming mastermind registration", { requestId });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (isHoneypotTriggered(body)) {
    log("warn", "Honeypot triggered; dropping", { requestId });
    return NextResponse.json({ ok: true as const });
  }

  const parsed = mastermindFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: parsed.error.issues[0]?.message ?? "Validation failed",
      },
      { status: 400 },
    );
  }

  const payload = buildMastermindPayload(parsed.data);
  const result = await forwardToGhl(payload, log, requestId);

  if (!result.ok) {
    return NextResponse.json(
      {
        message:
          "We could not submit your registration. Please try again or call (720) 363-9754.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true as const });
}
