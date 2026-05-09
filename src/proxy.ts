import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
    "/home",
    "/history",
    "/playlists",
    "/profile",
    "/settings",
    "/studio",
    "/video",
];

const authRoutes = [
    "/login",
    "/register",
];

export function proxy(
    request: NextRequest
) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("accessToken")?.value;
    console.log("Proxy Middleware - Access Token: ", accessToken);

    const isLoggedIn = !!accessToken;

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!isLoggedIn) {
            return NextResponse.redirect(
                new URL(
                    "/login",
                    request.url
                )
            );
        }
    }

    if (authRoutes.some((route) => pathname.startsWith(route))) {
        if (isLoggedIn) {
            return NextResponse.redirect(
                new URL(
                    "/home",
                    request.url
                )
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/home/:path*",
        "/history/:path*",
        "/playlists/:path*",
        "/profile/:path*",
        "/settings/:path*",
        "/studio/:path*",
        "/video/:path*",
        "/login",
        "/register",
    ],
};