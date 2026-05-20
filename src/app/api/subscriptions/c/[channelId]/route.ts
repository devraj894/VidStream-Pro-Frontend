import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { backendApi } from "@/lib/backendApi";
import { serverApiHandler } from "@/lib/serverApiHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    context: {params: Promise<{ channelId: string }>}
) {
    try {
        const accessToken = request.cookies.get("accessToken")?.value;
        
        if (!accessToken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const{ channelId } = await context.params;

        const searchParams = request.nextUrl.searchParams;

        const page = searchParams.get("page") || "1";
        const limit = searchParams.get("limit") || "10";

        const { data } = await backendApi.get(
            API_ENDPOINTS.SUBSCRIPTIONS.GET_USER_SUBSCRIBERS(channelId),
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

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ channelId: string }> }
) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { channelId } = await context.params;

    const { data } = await backendApi.post(
      API_ENDPOINTS.SUBSCRIPTIONS.TOGGLE_SUBSCRIPTIONS(channelId),
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }
    )

    return NextResponse.json(data);

  } catch(err) {
    return serverApiHandler(err);
  }
}