import { Media, VideoOwner } from "./common.types"

export interface FeedVideo {
  _id: string
  thumbnail: Media
  title: string
  description: string
  duration: number
  views: number
  Owner: VideoOwner
  createdAt: string
}

export interface FeedSection {
  title: string
  videos: FeedVideo[]
}

export interface FeedData {
  featured: FeedVideo
  sections: FeedSection[]
}