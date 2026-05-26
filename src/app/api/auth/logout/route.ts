import { NextRequest, NextResponse } from "next/server";
import { backendApi } from "@/lib/backendApi";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { serverApiHandler } from "@/lib/serverApiHandler";

export async function POST(request: NextRequest) {
    try {
        const accessToken =
            request.cookies.get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { data } =
            await backendApi.post(
                API_ENDPOINTS.AUTH.LOGOUT,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

        const response =
            NextResponse.json(data);

        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");

        return response;

    } catch (error) {
        return serverApiHandler(error);
    }
}