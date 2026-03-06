import { formatDistanceToNow } from "date-fns"

export const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)

    if (h > 0) return `${h}h ${m}m`
    return `${m}m`
}

export const formatViews = (views: number) => {
  if (views >= 1000000) return (views / 1000000).toFixed(1) + "M"
  if (views >= 1000) return (views / 1000).toFixed(1) + "K"
  return views
}

export const formatTimeAgo = (createdAt: string) => {
  return formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  })
}