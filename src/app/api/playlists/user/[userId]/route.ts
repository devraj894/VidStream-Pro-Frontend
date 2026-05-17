import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { backendApi } from "@/lib/backendApi";
import { serverApiHandler } from "@/lib/serverApiHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    context: {params: Promise<{ userId: string }>}
) {
    try {
        const accessToken = request.cookies.get("accessToken")?.value;
        
        if (!accessToken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const{ userId } = await context.params;

        const searchParams = request.nextUrl.searchParams;

        const page = searchParams.get("page") || "1";
        const limit = searchParams.get("limit") || "10";

        const { data } = await backendApi.get(
            API_ENDPOINTS.PLAYLISTS.GET_USER_PLAYLISTS(userId),
            {
                params: {
                    page,
                    limit,
                },
        
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return NextResponse.json(data)

    } catch(err) {
        return serverApiHandler(err)
    }
}