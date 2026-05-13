import { api } from "@/lib/api"

export const fetchVideoComments = async (
  videoId: string,
  page = 1,
  limit = 10
) => {

  const response = await api.get(
    `/api/comments/${videoId}`,
    {
      params: {
        page,
        limit,
      },
    }
  )

  return response.data
}