import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/api/clerk/webhooks", "/api/uploadthing"],
  debug: false,
  afterAuth: (auth, request) => {
    if (auth.isPublicRoute || !auth?.userId) return;
    request.headers.append("Cookie", `currentUserClerkId=${auth.userId}`);
    return NextResponse.rewrite(request.url.toString(), { request });
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
