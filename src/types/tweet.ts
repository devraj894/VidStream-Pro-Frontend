import { avatarTypes } from "./playlist";

export interface tweetTypes{
    id: string,
    avatar: avatarTypes,
    fullName: string,
    content: string,
    likes: number,
    createdAt: string,
}