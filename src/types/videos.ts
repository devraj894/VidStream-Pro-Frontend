export interface thumbnailType {
    url: string
    public_id: string
}

export interface featuredVideoType {
    id: string
    title: string
    description: string
    thumbnail: thumbnailType
    duration: number
    views: number
}

export interface homeVideoType {
    id: string
    title: string
    thumbnail: thumbnailType
    duration: number
    views: number
    owner: string
    createdAt: string
}