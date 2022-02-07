import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { userOnlyList } from "../settings/navlists";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  const { cookies } = req;

  if (userOnlyList.includes(pathname) && !cookies.userInfo) {
    return NextResponse.redirect("/");
  }
  return NextResponse.next();
}
