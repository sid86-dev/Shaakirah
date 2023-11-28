import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest, res: NextResponse) {
  const id = getCookie("id", { req, res });
  const unregisteredEmail = getCookie("unregisteredEmail", { req, res });
  let url = new URL(req.url);

  if (unregisteredEmail && id)
    return NextResponse.redirect(url.origin + "/signup");
  if (id === undefined) return NextResponse.redirect(url.origin + "/public");

  // get user Data
  const response = await fetch(url.origin + "/api/user/find", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  let data = await response.json();

  if (data.user && data.user.isloggedin === true) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(url.origin + "/public");
  }
}

export const config = {
  matcher: "/",
};
