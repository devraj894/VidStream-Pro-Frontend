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
        SEARCH_VIDEOS: '/videos'
    },  
    CHANNELS: {
        PROFILE: (username: string) => `/users/c/${username}`,
    },
    COMMENTS: {
        GET_COMMENTS: (videoId: string) => `/comments/${videoId}`,
        ADD_COMMENT: (videoId: string) => `/comments/${videoId}`,
        UPDATE_COMMENT: (commentId: string) => `/comments/c/${commentId}`,
        DELETE_COMMENT: (commentId: string) => `/comments/c/${commentId}`
    },
    PLAYLISTS: {
        GET_USER_PLAYLISTS: (userId: string) => `/playlist/user/${userId}`
    },
    TWEETS: {
        GET_USER_TWEETS: (userId: string) => `/tweets/user/${userId}`
    },
    LIKES: {
        TOGGLE_TWEET_LIKE: (tweetId: string) => `/likes/toggle/t/${tweetId}`
    },
    SUBSCRIPTIONS: {
        GET_USER_SUBSCRIBERS: (channelId: string) => `subscriptions/c/${channelId}`
    }
}   