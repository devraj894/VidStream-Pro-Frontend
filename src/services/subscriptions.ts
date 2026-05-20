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

export const getUserSubscriptions = async ({
    page = 1, 
    limit = 10, 
    subscriberId
} : {
    page?: number;
    limit?: number;
    subscriberId?: string
}) => {
    const response = await api.get(`/api/subscriptions/u/${subscriberId}`,
        {
            params: {
                page,
                limit,
            },
        }
    )

    return response.data;
}

export const toggleSubscriptions = async (channelId: string) => {
    const response = await api.post(`/api/subscriptions/c/${channelId}`);
    return response.data;
}