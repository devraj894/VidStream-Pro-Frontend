import { thumbnailType } from "./videos"

export interface studioStatsTypes {
    id: string
    totalViews: number
    totalSubscribers: number
    totalLiks: number
}

export interface studioVideosTypes {
    id: string
    thumbnail: thumbnailType
    title: string
    status: boolean
    views: number
    likes: number
    createdAt: string
}
export interface studioPlaylistTypes {
    id: string
    thumbnail: thumbnailType
    title: string
    videos: number
    views: number
    likes: number
    createdAt: string
}