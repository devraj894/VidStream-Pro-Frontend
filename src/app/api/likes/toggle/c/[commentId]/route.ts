import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { backendApi } from "@/lib/backendApi";
import { serverApiHandler } from "@/lib/serverApiHandler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ commentId: string }> }
) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { commentId } = await context.params;

    const { data } = await backendApi.post(
      API_ENDPOINTS.LIKES.TOGGLE_COMMENT_LIKE(commentId),
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