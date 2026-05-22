import { studioPlaylistTypes } from "./studio";
import { tweetTypes } from "./tweet";
import { Video } from "./videos.types";

export type ModalType =
  // VIDEO
  | { type: 'upload-video' }
  | { type: 'edit-video'; data: Video }
  | { type: 'delete-video'; data: Video }

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