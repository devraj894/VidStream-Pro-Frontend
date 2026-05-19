import { avatarTypes } from "./playlist";

export interface subscribedChannelTypes{
    id: string,
    avatar: avatarTypes,
    username: string,
    fullName: string,
    subscribers: number,
}