import { UserBasicInfo } from "./common.types";

export interface UserListItem extends UserBasicInfo {
    isSubscribed: boolean
    subscribedAt: string
}