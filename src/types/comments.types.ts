import { Media } from "./common.types"

export interface commentOwner {
    _id: string
    username: string    
    avatar: Media
}

export interface Comment {
    _id: string
    content: string
    likes: number
    ownerInfo: commentOwner
    createdAt: string
}