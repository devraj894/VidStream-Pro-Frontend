import { api } from "@/lib/api"

export const fetchFeedData = async () => {
    const response = await api.get("/api/videos/feed")
    return response.data
}