import { homeVideoType } from "./videos"

export interface playlistType{
    id: string,
    name: string,
    description: string,
    previewThumbnail: string
    totalVideos: number,
    createdAt: string
}

export interface avatarTypes{
    url: string,
    public_id: string
}

export interface ownerTypes{
    id: string,
    avatar: avatarTypes,
    username: string,
    fullName: string
}

export interface playlistDetailsTypes{
    id: string,
    name: string,
    description: string,
    videos: homeVideoType[],
    owner: ownerTypes,
    createdAt: string
    updatedAt: string
}