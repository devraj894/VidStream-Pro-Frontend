import { studioPlaylistTypes, studioVideosTypes } from "./studio";
import { tweetTypes } from "./tweet";

export type ModalType =
  // VIDEO
  | { type: 'upload-video' }
  | { type: 'edit-video'; data: studioVideosTypes }
  | { type: 'delete-video'; data: studioVideosTypes }

  // PLAYLIST
  | { type: 'upload-playlist' }
  | { type: 'edit-playlist'; data: studioPlaylistTypes }
  | { type: 'delete-playlist'; data: studioPlaylistTypes }

  // PLAYLIST VIDEOS
  | { type: 'add-video-to-playlist'; data: { playlistId: string } }
  | { type: 'remove-video-from-playlist'; data: { playlistId: string; videoId: string } }

  // TWEET
  | { type: 'upload-tweet' }
  | { type: 'edit-tweet'; data: tweetTypes }
  | { type: 'delete-tweet'; data: tweetTypes }