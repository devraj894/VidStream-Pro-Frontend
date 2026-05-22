import { Media } from "./common.types"

export interface Channel {
  _id: string
  username: string
  email: string
  fullName: string
  avatar: Media
  coverImage: Media
  subscribersCount: number
  channelsSubscribedToCount: number
  isSubscribed: boolean
}