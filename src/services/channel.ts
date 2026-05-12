import { api } from "@/lib/api"

export const fetchChannel = async (username: string) => {
    const response = await api.get(`/api/channel/profile/${username}`)
    return response.data
}