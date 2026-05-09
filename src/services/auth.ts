import { api } from "@/lib/api";

export const registerUser = async (formData: FormData) => {
    const response = await api.post(
        "/api/auth/register",
        formData
    )

    return response.data
}

export const loginUser = async (data: { identifier: string, password: string }) => {
    const response = await api.post(
        "/api/auth/login",
        data
    )

    return response.data
}

export const fetchCurrentUser = async () => {
    const response = await api.get(
        "/api/auth/me"
    )

    return response.data
}