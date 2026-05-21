import { api } from "@/lib/api"

export const toggleVideoLike = async (videoId: string) => {
    const response = await api.post(`/api/likes/toggle/v/${videoId}`)
    return response.data
}

export const toggleTweetLike = async (tweetId: string) => {
    const response = await api.post(`/api/likes/toggle/t/${tweetId}`)
    return response.data
}

export const getLikedVideos = async ({
    page = 1,
    limit = 10
} : {
    page?: number;
    limit?: number;
} = {}) => {
    const response = await api.get('/api/likes/videos', 
        {
            params: {
                page,
                limit
            }
        }
    )

    return response.data
}