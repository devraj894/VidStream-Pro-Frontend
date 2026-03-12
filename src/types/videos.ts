export interface avatarFileType {
    url: string
    public_id: string
}

export interface videoFileType {
    url: string
    public_id: string
}

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

export interface videoDetailsTypes {
    id: string
    videoFile: videoFileType
    thumbnail: thumbnailType
    title: string
    description: string
    duration: number
    views: number
    likes: number
    isPublished: boolean
    owner: {
        id: string
        avatar: avatarFileType
        username: string
        subscribers: number
    }
    createdAt: string
    updatedAt: string
}