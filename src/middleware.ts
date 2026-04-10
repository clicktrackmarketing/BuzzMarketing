import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Dev/prod: URLs pasted with percent-encoded Unicode (e.g. %E2%80%99 for ’)
 * may not match [slug] static routes built from decoded JSON keys. Rewrite to
 * the decoded pathname so the same page is served.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const prefix = "/digital-marketing-blog/";
  if (!pathname.startsWith(prefix)) {
    return NextResponse.next();
  }

  const segment = pathname.slice(prefix.length);
  if (!segment || segment.includes("/")) {
    return NextResponse.next();
  }

  if (!segment.includes("%")) {
    return NextResponse.next();
  }

  try {
    const decoded = decodeURIComponent(segment);
    if (decoded === segment) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = `${prefix}${decoded}`;
    return NextResponse.rewrite(url);
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/digital-marketing-blog/:path*"],
};
