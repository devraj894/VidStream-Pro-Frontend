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

export const addComment = async (
  videoId: string,
  content: string
) => {

  const response = await api.post(
    `/api/comments/${videoId}`,
    { content }
  )

  return response.data
}

export const updateComment = async (
  commentId: string,
  newContent: string
) => {

  const response = await api.patch(
    `/api/comments/c/${commentId}`,
    { newContent }
  )

  return response.data
}

export const deleteComment = async (
  commentId: string
) => {

  const response = await api.delete(
    `/api/comments/c/${commentId}`
  )

  return response.data
}