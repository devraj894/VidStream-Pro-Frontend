import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { backendApi } from "@/lib/backendApi";
import { serverApiHandler } from "@/lib/serverApiHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    context: {params: Promise<{ videoId: string }>}
) {
    try {
        const accessToken = request.cookies.get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { videoId } = await context.params;

        const { data } = await backendApi.get(
            API_ENDPOINTS.VIDEOS.GET_VIDEO(videoId),
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

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ videoId: string }> }
) {
    try {
        const accessToken = request.cookies.get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { videoId } = await context.params;

        const formData = await request.formData();

        const { data } = await backendApi.patch(
            API_ENDPOINTS.VIDEOS.UPDATE_VIDEO(videoId),
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