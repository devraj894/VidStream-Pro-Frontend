import { api } from "@/lib/api"

export const getUserSubscribers = async ({
    page = 1, 
    limit = 10, 
    channelId
} : {
    page?: number;
    limit?: number;
    channelId?: string
}) => {
    const response = await api.get(`/api/subscriptions/c/${channelId}`,
        {
            params: {
                page,
                limit,
            },
        }
    )
    
    return response.data;
}