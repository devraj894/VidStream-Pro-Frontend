import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { backendApi } from "@/lib/backendApi";
import { serverApiHandler } from "@/lib/serverApiHandler";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    try {
        const accessToken = request.cookies.get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const formData = await request.formData();

        const { data } = await backendApi.patch(
            API_ENDPOINTS.USERS.UPDATE_AVATAR,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return NextResponse.json(data);
    } catch (err) {
        return serverApiHandler(err);
    }
}