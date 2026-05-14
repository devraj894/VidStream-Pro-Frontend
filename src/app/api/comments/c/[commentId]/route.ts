import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { backendApi } from "@/lib/backendApi";
import { serverApiHandler } from "@/lib/serverApiHandler";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    context: {params: Promise<{ commentId: string }>}
) {
    try {
        const accessToken = request.cookies.get("accessToken")?.value;
    
        if(!accessToken){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }
    
        const { commentId } = await context.params;
    
        const body = await request.json();
    
        const { newContent } = body;
    
        if (!newContent || newContent.trim() === "") {
          return NextResponse.json(
            { message: "Comment content cannot be empty" },
            { status: 400 }
          );
        }

        const { data } = await backendApi.patch(
            API_ENDPOINTS.COMMENTS.UPDATE_COMMENT(commentId),
            { newContent },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return NextResponse.json(data);

    } catch(err) {
        return serverApiHandler(err);
    }
}

export async function DELETE(
    request: NextRequest,
    context: {params: Promise<{ commentId: string }>}
) {
    try{
        const accessToken = request.cookies.get("accessToken")?.value;
    
        if(!accessToken){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const { commentId } = await context.params;

        const { data } = await backendApi.delete(
            API_ENDPOINTS.COMMENTS.DELETE_COMMENT(commentId),
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return NextResponse.json(data)
    } catch(err){
        return serverApiHandler(err)
    }
}