import { NextRequest, NextResponse } from "next/server";
import { backendApi } from "@/lib/backendApi";
import { serverApiHandler } from "@/lib/serverApiHandler";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export async function POST(request: NextRequest) {
    try {
        const accessToken = request.cookies.get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();

        const { data } = await backendApi.post(
            API_ENDPOINTS.USERS.CHANGE_PASSWORD,
            body,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return NextResponse.json(data);

    } catch (error) {
        return serverApiHandler(error);
    }
}