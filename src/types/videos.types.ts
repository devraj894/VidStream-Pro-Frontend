import { Media, VideoOwner } from "./common.types"

export interface Video {
    _id: string
    videoFile: Media
    thumbnail: Media
    title: string
    description: string
    duration: number
    views: number
    owner: VideoOwner
    createdAt: string
}

export interface VideoDetails extends Video {
    likes: number
    owner: VideoOwner & {
        subscribers: number
    }
}