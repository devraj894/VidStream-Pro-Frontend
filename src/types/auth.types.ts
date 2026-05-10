import { Media } from "./common.types"

export interface User {
    _id: string
    fullName: string
    username: string
    email: string
    avatar: Media
    coverImage?: Media
    watchHistory: string[]
}

export interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    checkAuth: () => Promise<void>
}