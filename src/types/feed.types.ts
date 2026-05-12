import { Video } from "./videos.types"

export interface FeedSection {
  title: string
  videos: Video[]
}

export interface FeedData {
  featured: Video
  sections: FeedSection[]
}