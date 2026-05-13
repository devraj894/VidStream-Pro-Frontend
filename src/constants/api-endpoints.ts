export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/users/register',
        LOGIN: '/users/login',
        CURRENT_USER: '/users/current-user',
    },
    VIDEOS: {
        FEED: '/feed',
        USER_HISTORY: '/users/history',
        GET_VIDEO: (videoId: string) => `/videos/${videoId}`,
        GET_SUGGESTED_VIDEOS: (videoId: string) => `/videos/suggested/${videoId}`,
    },  
    CHANNELS: {
        PROFILE: (username: string) => `/users/c/${username}`,
    },
    COMMENTS: {
        GET_COMMENTS: (videoId: string) => `/comments/${videoId}`,
    }
}   