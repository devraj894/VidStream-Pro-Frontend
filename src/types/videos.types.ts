import { Media, UserBasicInfo } from "./common.types"

export interface Video {
    _id: string
    videoFile: Media
    thumbnail: Media
    title: string
    description: string
    duration: number
    views: number
    isPublished: boolean
    owner: UserBasicInfo
    createdAt: string
}

export interface VideoDetails extends Video {
    likesCount: number
    isLiked: boolean
    isOwner: boolean
    owner: UserBasicInfo & {
        subscribersCount: number
        isSubscribed: boolean
    }
}

export interface StudioVideo extends Pick<
   Video,
    | "_id"
    | "thumbnail"
    | "title"
    | "description"
    | "duration"
    | "views"
    | "isPublished"
    | "createdAt"
> {
    updatedAt: string
    likes: number
}