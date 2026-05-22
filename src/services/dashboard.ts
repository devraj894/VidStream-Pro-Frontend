import { api } from "@/lib/api"

export const getChannelStats = async () => {
    const response = await api.get('/api/dashboard/stats')
    return response.data
}