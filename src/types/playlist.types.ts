import { UserBasicInfo } from "./common.types"
import { Video } from "./videos.types"

export interface Playlist {
    _id: string
    name: string
    totalVideos: number
    previewThumbnail: string
    createdAt: string
}

export interface PlaylistDetails {
    _id: string
    name: string
    description: string
    videos: Video[]
    owner: UserBasicInfo
    createdAt: string
}