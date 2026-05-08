export interface User {
    _id: string
    fullName: string
    username: string
    email: string
    avatar: {
        url: string
        public_id: string
    }
    coverImage?: {
        url: string
        public_id: string
    }
    watchHistory: string[]
}

export interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    checkAuth: () => Promise<void>
}