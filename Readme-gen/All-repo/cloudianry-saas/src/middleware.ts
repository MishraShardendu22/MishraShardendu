/* eslint-disable @typescript-eslint/no-unused-vars */
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/home",
]);

const isPrivateRoute = createRouteMatcher([
    "/api/videos",
]);

export default clerkMiddleware((auth, req) => {
    const { userId } = auth();
    const currURL = new URL(req.url);
    const isAcceptingDashboard = currURL.pathname === "/home";
    const isApiRequest = currURL.pathname.startsWith("/api");

    // Redirect if the user is not authenticated
    if (!userId) {
        // Handle non-API routes
        if (!isAcceptingDashboard && !isApiRequest && !isPublicRoute(req)) {
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }

        // Handle API requests that are not public
        if (isApiRequest && !isPublicRoute(req)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }

    // Allow the request if authenticated or on a public route
    return NextResponse.next();
});

export const config = {
    matcher : [
        "/((?!.*..*|_next).*)", "/", "/(api|trpc)(.*)"
    ]
};



// The purpose of this matcher is to ensure that:

// The middleware runs for most public and dynamic routes of your app, excluding static assets and internal Next.js resources.
// It runs for all API routes (/api/* or /trpc/*).
// It explicitly matches the homepage (/).