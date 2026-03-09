import { playlistDetailsTypes, playlistType } from "@/types/playlist";

export const playlists: playlistType[] = [
    {
        id: "1",
        name: "O'Romeo",
        description: "This is a newly released movie starring Shahid Kapoor.",
        previewThumbnail: "https://c.saavncdn.com/832/O-Romeo-Hindi-2026-20260213121003-500x500.jpg",
        totalVideos: 11,
        createdAt: "2023-03-15T12:00:00Z"
    },
    {
        id: "2",
        name: "O'Romeo",
        description: "This is a newly released movie starring Shahid Kapoor.",
        previewThumbnail: "https://c.saavncdn.com/832/O-Romeo-Hindi-2026-20260213121003-500x500.jpg",
        totalVideos: 11,
        createdAt: "2023-03-15T12:00:00Z"
    },
    {
        id: "3",
        name: "O'Romeo",
        description: "This is a newly released movie starring Shahid Kapoor.",
        previewThumbnail: "https://c.saavncdn.com/832/O-Romeo-Hindi-2026-20260213121003-500x500.jpg",
        totalVideos: 11,
        createdAt: "2023-03-15T12:00:00Z"
    },
    {
        id: "4",
        name: "O'Romeo",
        description: "This is a newly released movie starring Shahid Kapoor.",
        previewThumbnail: "https://c.saavncdn.com/832/O-Romeo-Hindi-2026-20260213121003-500x500.jpg",
        totalVideos: 11,
        createdAt: "2023-03-15T12:00:00Z"
    },
    {
        id: "5",
        name: "O'Romeo",
        description: "This is a newly released movie starring Shahid Kapoor.",
        previewThumbnail: "https://c.saavncdn.com/832/O-Romeo-Hindi-2026-20260213121003-500x500.jpg",
        totalVideos: 11,
        createdAt: "2023-03-15T12:00:00Z"
    },
]

export const playlistDetails: playlistDetailsTypes = {
    id: "1",
    name: "First Playlist",
    description: "This is my first playlist",
    videos: [
        {
            id: "v1",
            title: "trending video 1",
            thumbnail: {
                url: "https://c.saavncdn.com/832/O-Romeo-Hindi-2026-20260213121003-500x500.jpg",
                public_id: "sample.jpg"
            },
            duration: 5400,
            views: 1204300,
            owner: "John Doe",
            createdAt: "2023-03-15T12:00:00Z"
        },
        {
            id: "v2",
            title: "trending video 1",
            thumbnail: {
                url: "https://c.saavncdn.com/832/O-Romeo-Hindi-2026-20260213121003-500x500.jpg",
                public_id: "sample.jpg"
            },
            duration: 5400,
            views: 1204300,
            owner: "John Doe",
            createdAt: "2023-03-15T12:00:00Z"
        },
    ],
    owner: {
        avatar: {
                "url": "https://github.com/shadcn.png",
                "public_id": "awh9dlcuxgxyjt67jdtm"
            },
        id: "698b0b94c8bb784de7591afd",
        username: "devraj_ad",
        fullName: "Devraj AD"
    },
    createdAt: "2026-02-20T09:20:03.632Z",
    updatedAt: "2026-02-20T09:22:09.985Z",
}