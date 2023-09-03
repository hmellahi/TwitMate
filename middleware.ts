import { authMiddleware, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { fetchUser } from "./lib/actions/user.actions";
import { AuthObject } from "@clerk/nextjs/server";

// AuthMiddleware
// const afterAuthMiddleware = (auth: AuthObject) => {
//   // const user = await currentUser();
//   // if (!user) return null;
//   // const userInfos = await fetchUser(user.id);
//   // if (!userInfos) return null;

//   // if (!userInfos.onboarded && request.nextUrl.pathname.startsWith("/")) {
//   //   return NextResponse.redirect(new URL("/onboarding", request.url));
//   // }
//   const user =
// };

async function ms(auth: AuthObject) {
  const user = auth.user
  if (!user) return null
  const userInfos = await fetchUser(user.id);
  if (!userInfos) return null;
  console.log({on : userInfos.onboarded})
  if (!userInfos.onboarded){
    return NextResponse.redirect(new URL("/onboarding"));
  }
  throw 's'

  // if (!userInfos.onboarded && request.nextUrl.pathname.startsWith("/")) {
  //   return NextResponse.redirect(new URL("/onboarding", request.url));
  // }
  // // const user =
  // return NextResponse.next();
}
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/api/clerk/webhooks"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// isPublicRoute
// isApiRoute
