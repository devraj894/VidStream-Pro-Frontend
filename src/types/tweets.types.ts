import { UserBasicInfo } from "./common.types"

export interface Tweet {
    _id: string
    content: string
    owner: UserBasicInfo
    likesCount: number
    isLiked: boolean
    createdAt: string
}