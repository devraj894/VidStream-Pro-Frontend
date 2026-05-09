import { NextResponse } from "next/server";

const isProd =
    process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd
        ? ("none" as const)
        : ("lax" as const),
    path: "/",
};

export const setAuthCookies = (
    response: NextResponse,
    accessToken: string,
    refreshToken: string
) => {
    response.cookies.set(
        "accessToken",
        accessToken,
        cookieOptions
    );

    response.cookies.set(
        "refreshToken",
        refreshToken,
        cookieOptions
    );
};

export const clearAuthCookies = (
    response: NextResponse
) => {
    response.cookies.set(
        "accessToken",
        "",
        {
            ...cookieOptions,
            expires: new Date(0),
        }
    );

    response.cookies.set(
        "refreshToken",
        "",
        {
            ...cookieOptions,
            expires: new Date(0),
        }
    );
};