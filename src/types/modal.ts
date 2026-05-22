import { studioPlaylistTypes } from "./studio";
import { tweetTypes } from "./tweet";
import { StudioVideo } from "./videos.types";

export type ModalType =
  // VIDEO
  | { type: 'upload-video' }
  | { type: 'edit-video'; data: StudioVideo }
  | { type: 'delete-video'; data: StudioVideo }

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