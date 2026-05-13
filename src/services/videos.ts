import { api } from "@/lib/api"

export const fetchFeedData = async () => {
    const response = await api.get("/api/videos/feed")
    return response.data
}

export const fetchUserHistory = async () => {
    const response = await api.get("/api/videos/history")
    return response.data
}

export const fetchVideoDetails = async (videoId: string) => {
    const response = await api.get(`/api/videos/${videoId}`)
    return response.data
}

export const fetchSuggestedVideos = async (videoId: string) => {
    const response = await api.get(`/api/videos/suggestions/${videoId}`)
    return response.data
}