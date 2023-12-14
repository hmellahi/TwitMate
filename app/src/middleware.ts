import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/api/clerk/webhooks", "/api/uploadthing", "/demo-login"],
  debug: false,
  afterAuth: (auth, request) => {
    const { isPublicRoute, userId } = auth;
    const { NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_CLERK_SIGN_IN_URL } = process.env;
    if (!userId) {
      if (isPublicRoute) {
        return;
      }

      // Redirect to the login page 
      // if he tries to access public page while being unauthenicated
      return NextResponse.redirect(`${NEXT_PUBLIC_BASE_URL}${NEXT_PUBLIC_CLERK_SIGN_IN_URL}`);
    }

    request.headers.append("Cookie", `currentUserClerkId=${userId}`);
    return NextResponse.rewrite(request.url.toString(), { request });
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
