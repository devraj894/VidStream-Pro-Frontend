import { api } from "@/lib/api"

export const toggleTweetLike = async (tweetId: string) => {
    const response = await api.post(`/api/likes/toggle/t/${tweetId}`)
    return response.data
}