import { NextResponse } from "next/server";

import { backendApi } from "@/lib/backendApi";
import { setAuthCookies } from "@/lib/authCookies";
import { serverApiHandler } from "@/lib/serverApiHandler";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export async function POST(request: Request) {
    try {
        const body = await request.formData();

        const { data } =
            await backendApi.post(
                API_ENDPOINTS.AUTH.REGISTER,
                body
            );

        const response =
            NextResponse.json(data);

        setAuthCookies(
            response,
            data.data.accessToken,
            data.data.refreshToken
        );

        return response;

    } catch (error) {
        return serverApiHandler(error);
    }
}