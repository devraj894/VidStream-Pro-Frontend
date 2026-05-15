import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { backendApi } from "@/lib/backendApi";
import { serverApiHandler } from "@/lib/serverApiHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const query = searchParams.get("query") || "";
    const sortBy = searchParams.get("sortBy") || "views";
    const sortType = searchParams.get("sortType") || "desc";

    const { data } = await backendApi.get(
      API_ENDPOINTS.VIDEOS.SEARCH_VIDEOS,
      {
        params: {
          page,
          limit,
          query,
          sortBy,
          sortType,
        },

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