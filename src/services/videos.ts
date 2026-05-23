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

export const searchVideos = async ({
  page = 1,
  limit = 10,
  query = "",
  sortBy = "views",
  sortType = "desc",
  userId
}: {
  page?: number;
  limit?: number;
  query?: string;
  sortBy?: string;
  sortType?: "asc" | "desc";
  userId?: string
}) => {
  const response = await api.get("/api/videos/search",
    {
      params: {
        page,
        limit,
        query,
        sortBy,
        sortType,
        userId
      },
    }
  );

  return response.data;
};

export const createVideo = async (formData: FormData) => {
  const response = await api.post('/api/videos', formData);
  return response.data
}

export const togglePublishStatus = async (videoId: string) => {
  const response = await api.patch(`/api/videos/toggle/publish/${videoId}`)
  return response.data
}

export const updateVideo = async (videoId: string, formData: FormData) => {
  const response = await api.patch(`/api/videos/${videoId}`, formData)
  return response.data
}