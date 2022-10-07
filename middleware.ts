import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (!req.cookies) {
    return NextResponse.redirect("/enter");
  }
  console.log();

  //  return NextResponse.json({ ok: true });
}
