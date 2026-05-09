import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const serverApiHandler = (
    error: unknown
) => {
    if (error instanceof AxiosError) {
        return NextResponse.json(
            {
                message:
                    error.response?.data?.message ||
                    "Something went wrong",
            },
            {
                status:
                    error.response?.status || 500,
            }
        );
    }

    return NextResponse.json(
        {
            message: "Internal server error",
        },
        {
            status: 500,
        }
    );
};