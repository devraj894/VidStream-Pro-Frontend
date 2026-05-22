import { api } from "@/lib/api"

export const getChannelStats = async () => {
    const response = await api.get('/api/dashboard/stats')
    return response.data
}

export const getChannelVideos = async (
  page = 1,
  limit = 10
) => {

  const response = await api.get(
    `/api/dashboard/videos`,
    {
      params: {
        page,
        limit,
      },
    }
  )

  return response.data
}