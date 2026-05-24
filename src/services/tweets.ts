import { api } from "@/lib/api";

export const getUserTweets = async ({ 
    page = 1, 
    limit = 10, 
    userId
} : {
    page?: number;
    limit?: number;
    userId?: string
}) => {
    const response = await api.get(`/api/tweets/user/${userId}`, 
        {
            params: {
                page,
                limit,
            },
        }
    )

    return response.data
}

export const createTweet = async ({ content }: { content: string }) => {
    const response = await api.post('/api/tweets', { content })
    return response.data
}