export interface Media {
  url: string
  public_id: string
}

export interface VideoOwner {
  _id: string
  fullName: string
  username: string
  avatar: Media
}