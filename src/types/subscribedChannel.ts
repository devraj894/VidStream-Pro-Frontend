import { avatarTypes } from "./playlist";

export interface subscribedChannelTypes{
    id: string,
    avatar: avatarTypes,
    fullName: string,
    subscribers: number,
}