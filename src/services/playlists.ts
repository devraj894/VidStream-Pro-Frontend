import { api } from "@/lib/api"

export const getUserPlaylists = async ({ 
    page = 1, 
    limit = 10, 
    userId
} : {
    page?: number;
    limit?: number;
    userId?: string
}) => {
    const response = await api.get(`/api/playlists/user/${userId}`, 
        {
            params: {
                page,
                limit,
            },
        }
    )

    return response.data
}

export const getPlaylistDetails = async (playlistId: string) => {
    const response = await api.get(`/api/playlists/playlist/${playlistId}`)
    return response.data
}

export const createPlaylist = async ({
    name, 
    description 
} : {
    name: string; 
    description: string;    
}) => {
    const response = await api.post(`/api/playlists/playlist`, { name, description })
    return response.data
}